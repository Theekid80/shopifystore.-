"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { site } from "@/config/site";
import { productHref } from "@/config/products";
import { useStore } from "@/lib/commerce/cart";
import { checkoutProvider } from "@/lib/commerce/checkout";
import { formatMoney } from "@/lib/commerce/money";
import { Button, ButtonLink } from "@/components/ui/Button";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { SiteImage } from "@/components/ui/SiteImage";
import { PaymentMethods, StorePromises } from "@/components/product/Assurances";

const providerNote: Record<typeof checkoutProvider, string> = {
  shopify: "You'll complete your purchase on our secure Shopify checkout — Shop Pay, Apple Pay, Google Pay and cards.",
  stripe: "You'll complete your purchase on our secure Stripe checkout — cards, Apple Pay and Google Pay.",
  none: "Preview mode — checkout is not connected yet. No order will be placed and nothing will be charged.",
};

/**
 * Order review + hand-off to the payment provider. Payment itself always
 * happens on the provider's hosted checkout — never on this site.
 */
export function CheckoutView() {
  const { lines, subtotal, freeShippingRemaining, setQuantity, removeItem, checkout, checkoutConnected } = useStore();
  const [pending, setPending] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const autoStarted = useRef(false);

  const start = async () => {
    setPending(true);
    setNotice(null);
    const result = await checkout();
    if (!result.ok) {
      setNotice(result.message);
      setPending(false);
    }
  };

  // Coming from "Checkout" / "Buy Now" with a connected provider: go straight on.
  useEffect(() => {
    if (autoStarted.current || !checkoutConnected || !lines.length) return;
    if (new URLSearchParams(window.location.search).get("auto") !== "1") return;
    const t = setTimeout(() => {
      autoStarted.current = true;
      void start();
    }, 0);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines.length, checkoutConnected]);

  if (!lines.length) {
    return (
      <div className="py-16 text-center">
        <p className="font-display text-title">Your bag is empty</p>
        <ButtonLink href="/#offer" arrow className="mt-8">
          Shop the System
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
      <ul className="divide-y divide-charcoal/10 border-y border-charcoal/10 lg:col-span-7" aria-label="Order items">
        {lines.map((l) => (
          <li key={l.key} className="flex gap-4 py-6">
            <span className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-linen">
              <SiteImage image={l.product.images[0]} alt="" fill sizes="96px" className="object-cover" />
            </span>
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Link href={productHref(l.product)} className="text-sm font-semibold hover:underline">
                    {l.product.name}
                  </Link>
                  <p className="mt-1 text-xs text-stone">
                    {l.variant.title} · {formatMoney(l.product.price)}
                  </p>
                </div>
                <p className="text-sm tabular-nums">{formatMoney(l.lineTotal)}</p>
              </div>
              <div className="mt-auto flex items-center justify-between pt-3">
                <QuantitySelector size="sm" value={l.quantity} onChange={(q) => setQuantity(l.key, q)} label={`Quantity for ${l.product.name}`} />
                <button type="button" onClick={() => removeItem(l.key)} className="text-xs text-stone hover:text-charcoal hover:underline">
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <aside className="h-fit rounded-[1.5rem] bg-linen p-6 md:p-8 lg:sticky lg:top-28 lg:col-span-5" aria-label="Order summary">
        <h2 className="eyebrow text-stone">Order summary</h2>
        <dl className="mt-6 space-y-3 text-sm">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd className="tabular-nums">{formatMoney(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Shipping</dt>
            <dd className="text-right text-stone">
              {freeShippingRemaining === 0 ? `Free ${site.shipping.region} shipping` : "Calculated at checkout"}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt>Taxes</dt>
            <dd className="text-stone">Calculated at checkout</dd>
          </div>
        </dl>
        {freeShippingRemaining != null && freeShippingRemaining > 0 && (
          <p className="mt-4 text-xs text-stone">
            You&apos;re {formatMoney(freeShippingRemaining)} away from free {site.shipping.region} shipping.
          </p>
        )}
        <Button size="lg" className="mt-8 w-full" onClick={start} disabled={pending}>
          {pending ? "Opening secure checkout…" : "Continue to Secure Checkout"}
        </Button>
        <p role="status" className="mt-3 text-center text-xs leading-relaxed text-stone">
          {notice ?? providerNote[checkoutProvider]}
        </p>
        <div className="mt-6 space-y-4">
          <PaymentMethods />
          <StorePromises compact />
        </div>
      </aside>
    </div>
  );
}
