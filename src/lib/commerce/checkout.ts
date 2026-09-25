/**
 * ─────────────────────────────────────────────────────────────────────────
 *  CHECKOUT PROVIDERS
 * ─────────────────────────────────────────────────────────────────────────
 *  NEXT_PUBLIC_CHECKOUT_PROVIDER picks where "Checkout" sends the shopper:
 *
 *    shopify → Shopify's hosted checkout (recommended). Shop Pay, Apple Pay,
 *              Google Pay and cards are handled by Shopify Payments once
 *              enabled in your Shopify admin. See ./shopify.ts.
 *    stripe  → Stripe Checkout via /api/checkout/stripe. Apple Pay and
 *              Google Pay appear automatically when enabled in the Stripe
 *              dashboard. (No Shop Pay.)
 *    none    → (default) preview mode. Nothing is charged; the checkout page
 *              says checkout isn't connected yet.
 *
 *  Prices are never trusted from the browser: Shopify uses its own product
 *  prices, and the Stripe route looks prices up on the server.
 */
import { shopifyVariantIds } from "@/config/shopify";
import { createShopifyCheckout, shopifyConfigured } from "./shopify";

export type CheckoutProvider = "shopify" | "stripe" | "none";

const requested = (process.env.NEXT_PUBLIC_CHECKOUT_PROVIDER ?? "none") as CheckoutProvider;

export const checkoutProvider: CheckoutProvider =
  requested === "shopify" && !shopifyConfigured ? "none" : requested === "stripe" || requested === "shopify" ? requested : "none";

export const checkoutConnected = checkoutProvider !== "none";

export type CheckoutLine = { productId: string; variantId: string; quantity: number; name: string };

export type CheckoutResult = { ok: true; url: string } | { ok: false; message: string };

export async function startCheckout(lines: CheckoutLine[]): Promise<CheckoutResult> {
  if (!lines.length) return { ok: false, message: "Your bag is empty." };

  if (checkoutProvider === "none") {
    return {
      ok: false,
      message: "Checkout isn't connected yet. This store is in preview mode — no order has been placed and nothing was charged.",
    };
  }

  try {
    if (checkoutProvider === "shopify") {
      const missing = lines.filter((l) => !shopifyVariantIds[l.variantId]);
      if (missing.length) {
        return { ok: false, message: `Some items aren't linked to Shopify yet: ${missing.map((l) => l.name).join(", ")}.` };
      }
      const url = await createShopifyCheckout(
        lines.map((l) => ({ merchandiseId: shopifyVariantIds[l.variantId], quantity: l.quantity })),
      );
      return { ok: true, url };
    }

    // Stripe
    const res = await fetch("/api/checkout/stripe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lines: lines.map(({ productId, quantity }) => ({ productId, quantity })) }),
    });
    const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
    if (!res.ok || !data.url) throw new Error(data.error ?? `Checkout failed (${res.status})`);
    return { ok: true, url: data.url };
  } catch (err) {
    console.error(err);
    return { ok: false, message: "We couldn't start checkout. Please try again in a moment." };
  }
}
