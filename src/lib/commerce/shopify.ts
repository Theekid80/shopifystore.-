/**
 * ─────────────────────────────────────────────────────────────────────────
 *  SHOPIFY STOREFRONT API ADAPTER
 * ─────────────────────────────────────────────────────────────────────────
 *  Inactive until these environment variables are set (see .env.example):
 *
 *    NEXT_PUBLIC_COMMERCE_PROVIDER=shopify
 *    NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
 *    NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=<public Storefront API access token>
 *    NEXT_PUBLIC_SHOPIFY_API_VERSION=2025-10   (optional)
 *
 *  The Storefront *public* token is designed to be used in the browser.
 *  Never put an Admin API token in a NEXT_PUBLIC_ variable.
 *
 *  Flow: the cart lives on the site; at checkout we create a Shopify cart
 *  with every line and redirect to Shopify's hosted checkout, which is the
 *  source of truth for prices, taxes, shipping and payment.
 */

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ?? "";
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN ?? "";
const apiVersion = process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION ?? "2025-10";

export const shopifyEnabled =
  process.env.NEXT_PUBLIC_COMMERCE_PROVIDER === "shopify" && Boolean(domain && token);

const CART_CREATE = /* GraphQL */ `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart { id checkoutUrl }
      userErrors { field message }
    }
  }
`;

export type ShopifyLineInput = { merchandiseId: string; quantity: number };

export async function createShopifyCheckout(lines: ShopifyLineInput[]): Promise<string> {
  const res = await fetch(`https://${domain}/api/${apiVersion}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query: CART_CREATE, variables: { input: { lines } } }),
  });

  if (!res.ok) throw new Error(`Shopify responded with ${res.status}`);

  const json = await res.json();
  const payload = json?.data?.cartCreate;
  const error = json?.errors?.[0]?.message ?? payload?.userErrors?.[0]?.message;
  if (error) throw new Error(error);
  if (!payload?.cart?.checkoutUrl) throw new Error("Shopify did not return a checkout URL");

  return payload.cart.checkoutUrl as string;
}
