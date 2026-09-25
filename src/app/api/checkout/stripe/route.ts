/**
 * Stripe Checkout integration point.
 *
 * Active when NEXT_PUBLIC_CHECKOUT_PROVIDER=stripe and STRIPE_SECRET_KEY is
 * set. Creates a Stripe Checkout Session and returns its URL. Prices come
 * from src/config/products.ts on the server — never from the browser.
 *
 * Optional env:
 *   STRIPE_SHIPPING_RATE_CENTS  flat U.S. shipping for orders under the
 *                               free-shipping threshold (e.g. 595 = $5.95)
 *
 * Apple Pay and Google Pay appear automatically in Stripe Checkout once
 * enabled in the Stripe dashboard (Settings → Payment methods).
 * This route has not been exercised against a live Stripe account —
 * test in Stripe test mode before launch.
 */
import { site } from "@/config/site";
import { getProduct } from "@/config/products";

const MAX_QTY = 10;

export async function POST(request: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (process.env.NEXT_PUBLIC_CHECKOUT_PROVIDER !== "stripe" || !key) {
    return Response.json({ error: "Stripe checkout is not configured." }, { status: 501 });
  }

  let body: { lines?: { productId?: string; quantity?: number }[] };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const lines = (body.lines ?? []).flatMap((l) => {
    const product = l.productId ? getProduct(l.productId) : undefined;
    const quantity = Math.floor(Number(l.quantity));
    if (!product || product.stock === "out_of_stock" || !(quantity >= 1 && quantity <= MAX_QTY)) return [];
    return [{ product, quantity }];
  });
  if (!lines.length) return Response.json({ error: "No valid items." }, { status: 400 });

  const origin = new URL(request.url).origin;
  const form = new URLSearchParams({
    mode: "payment",
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/checkout`,
    "shipping_address_collection[allowed_countries][0]": "US",
  });

  lines.forEach(({ product, quantity }, i) => {
    form.set(`line_items[${i}][quantity]`, String(quantity));
    form.set(`line_items[${i}][price_data][currency]`, site.currency.toLowerCase());
    form.set(`line_items[${i}][price_data][unit_amount]`, String(Math.round(product.price * 100)));
    form.set(`line_items[${i}][price_data][product_data][name]`, product.name);
    form.set(`line_items[${i}][price_data][product_data][metadata][sku]`, product.sku);
  });

  const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.quantity, 0);
  const threshold = site.shipping.freeThreshold;
  const flatCents = Number(process.env.STRIPE_SHIPPING_RATE_CENTS ?? 0);
  const free = threshold != null && subtotal >= threshold;
  form.set("shipping_options[0][shipping_rate_data][type]", "fixed_amount");
  form.set("shipping_options[0][shipping_rate_data][fixed_amount][amount]", String(free ? 0 : flatCents));
  form.set("shipping_options[0][shipping_rate_data][fixed_amount][currency]", site.currency.toLowerCase());
  form.set("shipping_options[0][shipping_rate_data][display_name]", free || !flatCents ? "Free U.S. shipping" : "Standard U.S. shipping");

  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: form,
  });
  const session = (await res.json()) as { url?: string; error?: { message?: string } };
  if (!res.ok || !session.url) {
    console.error("Stripe error", session.error);
    return Response.json({ error: "Could not start checkout." }, { status: 502 });
  }
  return Response.json({ url: session.url });
}
