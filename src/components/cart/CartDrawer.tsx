"use client";

import Image from "next/image";
import { useState } from "react";
import { site } from "@/config/site";
import { bundle } from "@/data/products";
import { useStore } from "@/lib/commerce/cart";
import { formatMoney } from "@/lib/commerce/money";
import { Sheet } from "@/components/ui/Sheet";
import { Button, ButtonLink } from "@/components/ui/Button";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { CloseIcon } from "@/components/ui/Icons";

export function CartDrawer() {
  const { lines, count, subtotal, isCartOpen, closeCart, setQuantity, removeItem, checkout, checkoutConnected, upgradeToBundle } =
    useStore();
  const [notice, setNotice] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const hasBundle = lines.some((l) => l.productId === bundle.id);

  // Upgrade offer: one of each included piece already in the cart vs. the system.
  const piecesInCart = [...new Map(lines.filter((l) => bundle.includes.includes(l.productId)).map((l) => [l.productId, l])).values()];
  const piecesValue = piecesInCart.reduce((sum, l) => sum + l.product.price, 0);
  const missingCount = bundle.includes.length - piecesInCart.length;
  const upgradeDelta = Math.round((bundle.pricing.price - piecesValue) * 100) / 100;
  const showUpgrade = !hasBundle && piecesInCart.length > 0;
  const promises = site.storePromises.filter((p) => p.enabled);

  const onCheckout = async () => {
    setPending(true);
    setNotice(null);
    const result = await checkout();
    if (!result.ok) setNotice(result.message);
    setPending(false);
  };

  const close = () => {
    setNotice(null);
    closeCart();
  };

  return (
    <Sheet open={isCartOpen} onClose={close} label="Shopping cart">
      <header className="flex h-16 items-center justify-between border-b border-charcoal/10 px-6 md:h-20">
        <h2 className="eyebrow text-charcoal">
          Your Cart <span className="ml-1 text-stone">({count})</span>
        </h2>
        <button
          type="button"
          onClick={close}
          aria-label="Close cart"
          className="-mr-2.5 grid size-11 place-items-center rounded-full hover:bg-charcoal/5"
        >
          <CloseIcon size={22} />
        </button>
      </header>

      {lines.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
          <p className="text-2xl font-medium uppercase tracking-tight">Your cart is empty</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-stone">
            Start with the complete system — everything you need for rest and order on the road.
          </p>
          <ButtonLink href="/#system" onClick={close} arrow className="mt-8">
            Shop the System
          </ButtonLink>
        </div>
      ) : (
        <>
          <ul className="flex-1 divide-y divide-charcoal/10 overflow-y-auto px-6" aria-label="Cart items">
            {lines.map((line) => (
              <li key={line.key} className="flex gap-4 py-6">
                <div className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-linen">
                  <Image
                    src={(line.variant.image ?? line.product.image).src}
                    alt={(line.variant.image ?? line.product.image).alt}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold leading-snug">{line.product.name}</p>
                      {line.variant.title !== "Default" && (
                        <p className="mt-1 text-xs text-stone">{line.variant.title}</p>
                      )}
                    </div>
                    <p className="text-sm tabular-nums">{formatMoney(line.lineTotal)}</p>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <QuantitySelector
                      size="sm"
                      value={line.quantity}
                      onChange={(q) => setQuantity(line.key, q)}
                      label={`Quantity for ${line.product.name}`}
                    />
                    <button
                      type="button"
                      onClick={() => removeItem(line.key)}
                      className="text-xs text-stone underline-offset-4 hover:text-charcoal hover:underline"
                      aria-label={`Remove ${line.product.name} from cart`}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {showUpgrade && (
            <div className="mx-6 mb-3 rounded-2xl bg-linen p-4">
              <p className="text-sm font-semibold text-charcoal">Upgrade to the complete system</p>
              <p className="mt-1 text-xs leading-relaxed text-stone">
                {upgradeDelta > 0
                  ? `Get the other ${missingCount} ${missingCount === 1 ? "piece" : "pieces"} for just ${formatMoney(upgradeDelta)} more — all seven for ${formatMoney(bundle.pricing.price)}.`
                  : `All seven pieces for ${formatMoney(bundle.pricing.price)} — ${formatMoney(-upgradeDelta)} less than the ${piecesInCart.length} in your cart.`}
              </p>
              <Button
                className="mt-3 h-10! w-full"
                onClick={upgradeToBundle}
                aria-label={`Upgrade: replace ${piecesInCart.length === 1 ? "this piece" : "these pieces"} with ${bundle.name} for ${formatMoney(bundle.pricing.price)}`}
              >
                Upgrade · {upgradeDelta > 0 ? `+${formatMoney(upgradeDelta)}` : `Save ${formatMoney(-upgradeDelta)}`}
              </Button>
            </div>
          )}

          <footer className="border-t border-charcoal/10 px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-5">
            <div className="flex items-baseline justify-between">
              <span className="eyebrow text-stone">Subtotal</span>
              <span className="text-lg font-medium tabular-nums">{formatMoney(subtotal)}</span>
            </div>
            <p className="mt-1 text-xs text-stone">Shipping and taxes calculated at checkout.</p>

            <Button size="lg" className="mt-5 w-full" onClick={onCheckout} disabled={pending} aria-describedby="checkout-notice">
              {pending ? "Starting checkout…" : "Checkout"}
            </Button>

            <p id="checkout-notice" role="status" className="mt-3 text-center text-xs leading-relaxed text-stone empty:hidden">
              {notice ?? (!checkoutConnected ? "Preview mode — checkout is not connected yet." : "")}
            </p>

            {promises.length > 0 && (
              <ul className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1 text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-stone">
                {promises.map((p) => (
                  <li key={p.id} className="whitespace-nowrap">
                    {p.label}
                  </li>
                ))}
              </ul>
            )}
          </footer>
        </>
      )}
    </Sheet>
  );
}
