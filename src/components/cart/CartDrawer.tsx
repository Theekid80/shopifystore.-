"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { site } from "@/config/site";
import { productHref, systemPieces, VELARA_TRAVEL_SLEEP_SYSTEM as SYSTEM } from "@/config/products";
import { useStore } from "@/lib/commerce/cart";
import { formatMoney } from "@/lib/commerce/money";
import { Sheet } from "@/components/ui/Sheet";
import { Button, ButtonLink } from "@/components/ui/Button";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { SiteImage } from "@/components/ui/SiteImage";
import { CloseIcon } from "@/components/ui/Icons";
import { StorePromises } from "@/components/product/Assurances";

function FreeShippingProgress() {
  const { subtotal, freeShippingRemaining } = useStore();
  const threshold = site.shipping.freeThreshold;
  if (threshold == null || freeShippingRemaining == null) return null;
  const pct = Math.min(100, (subtotal / threshold) * 100);
  const reached = freeShippingRemaining === 0;
  return (
    <div className="border-b border-charcoal/10 px-6 py-4">
      <p className="text-xs text-charcoal" role="status">
        {reached ? (
          <>You&apos;ve unlocked free {site.shipping.region} shipping.</>
        ) : (
          <>
            You&apos;re <strong className="font-semibold">{formatMoney(freeShippingRemaining)}</strong> away from free{" "}
            {site.shipping.region} shipping.
          </>
        )}
      </p>
      <div
        className="mt-2.5 h-1 overflow-hidden rounded-full bg-mist"
        role="progressbar"
        aria-label="Progress toward free shipping"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pct)}
      >
        <div className="h-full rounded-full bg-charcoal transition-[width] duration-700 ease-out-soft" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

/** Offer to swap pieces already in the bag for the complete system, with the true price difference. */
function SystemUpgrade() {
  const { lines, upgradeToSystem } = useStore();
  if (lines.some((l) => l.productId === SYSTEM.id)) return null;
  const pieceIds = new Set(SYSTEM.includes);
  const inBag = [...new Map(lines.filter((l) => pieceIds.has(l.productId)).map((l) => [l.productId, l])).values()];
  if (!inBag.length) return null;

  const value = inBag.reduce((sum, l) => sum + l.product.price, 0);
  const delta = Math.round((SYSTEM.price - value) * 100) / 100;
  const missing = systemPieces.length - inBag.length;

  return (
    <div className="mx-6 mb-3 rounded-2xl bg-linen p-4">
      <p className="text-sm font-semibold text-charcoal">Complete the system</p>
      <p className="mt-1 text-xs leading-relaxed text-stone">
        {delta > 0
          ? `Add the other ${missing} ${missing === 1 ? "piece" : "pieces"} for ${formatMoney(delta)} more — all ${systemPieces.length} for ${formatMoney(SYSTEM.price)}.`
          : `All ${systemPieces.length} pieces for ${formatMoney(SYSTEM.price)} — ${formatMoney(-delta)} less than the ${inBag.length} in your bag.`}
      </p>
      <Button
        className="mt-3 h-10! w-full"
        onClick={upgradeToSystem}
        aria-label={`Upgrade: replace ${inBag.length === 1 ? "this piece" : "these pieces"} with the ${SYSTEM.name} for ${formatMoney(SYSTEM.price)}`}
      >
        Upgrade · {delta > 0 ? `+${formatMoney(delta)}` : `Save ${formatMoney(-delta)}`}
      </Button>
    </div>
  );
}

export function CartDrawer() {
  const router = useRouter();
  const { lines, count, subtotal, isCartOpen, closeCart, setQuantity, removeItem, checkoutConnected } = useStore();

  const goToCheckout = () => {
    closeCart();
    router.push("/checkout?auto=1");
  };

  return (
    <Sheet open={isCartOpen} onClose={closeCart} label="Shopping bag">
      <header className="flex h-16 items-center justify-between border-b border-charcoal/10 px-6 md:h-20">
        <h2 className="eyebrow text-charcoal">
          Your Bag <span className="ml-1 text-stone">({count})</span>
        </h2>
        <button
          type="button"
          onClick={closeCart}
          aria-label="Close bag"
          className="-mr-2.5 grid size-11 place-items-center rounded-full hover:bg-charcoal/5"
        >
          <CloseIcon size={22} />
        </button>
      </header>

      {lines.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
          <p className="font-display text-title">Your bag is empty</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-stone">
            Start with the complete system — everything you need to rest on the road.
          </p>
          <ButtonLink href="/#offer" onClick={closeCart} arrow className="mt-8">
            Shop the System
          </ButtonLink>
        </div>
      ) : (
        <>
          <FreeShippingProgress />
          <ul className="flex-1 divide-y divide-charcoal/10 overflow-y-auto px-6" aria-label="Items in your bag">
            {lines.map((line) => (
              <li key={line.key} className="flex gap-4 py-6">
                <Link
                  href={productHref(line.product)}
                  onClick={closeCart}
                  tabIndex={-1}
                  aria-hidden="true"
                  className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-linen"
                >
                  <SiteImage image={line.variant.image ?? line.product.images[0]} alt="" fill sizes="96px" className="object-cover" />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <Link href={productHref(line.product)} onClick={closeCart} className="text-sm font-semibold leading-snug hover:underline">
                        {line.product.name}
                      </Link>
                      <p className="mt-1 text-xs text-stone">
                        {line.variant.title} · {formatMoney(line.product.price)}
                      </p>
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
                      aria-label={`Remove ${line.product.name} from bag`}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <SystemUpgrade />

          <footer className="border-t border-charcoal/10 px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-5">
            <div className="flex items-baseline justify-between">
              <span className="eyebrow text-stone">Subtotal</span>
              <span className="text-lg font-medium tabular-nums">{formatMoney(subtotal)}</span>
            </div>
            <p className="mt-1 text-xs text-stone">Taxes and shipping calculated at checkout.</p>
            <Button size="lg" className="mt-5 w-full" onClick={goToCheckout}>
              Checkout
            </Button>
            {!checkoutConnected && (
              <p className="mt-3 text-center text-xs leading-relaxed text-stone">Preview mode — checkout is not connected yet.</p>
            )}
            <div className="mt-4">
              <StorePromises compact />
            </div>
          </footer>
        </>
      )}
    </Sheet>
  );
}
