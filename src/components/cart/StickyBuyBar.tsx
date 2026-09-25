"use client";

import { useEffect, useState } from "react";
import { compareAt, isPurchasable, type Product } from "@/config/products";
import { useStore } from "@/lib/commerce/cart";
import { formatMoney } from "@/lib/commerce/money";
import { SiteImage } from "@/components/ui/SiteImage";

/**
 * Mobile/tablet sticky Add to Cart. Appears once the shopper scrolls past
 * `showAfterId` (or one screen), and hides while the main buy box
 * (`buyBoxId`) or the footer is visible, or the cart is open.
 */
export function StickyBuyBar({
  product,
  buyBoxId,
  showAfterId,
  immediate = false,
  label,
}: {
  product: Product;
  buyBoxId: string;
  showAfterId?: string;
  /** Show from the top of the page (product pages), hiding only while the buy box is visible. */
  immediate?: boolean;
  label?: string;
}) {
  const { addItem, isCartOpen } = useStore();
  const [past, setPast] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const marker = showAfterId ? document.getElementById(showAfterId) : null;
    const onScroll = () => {
      if (immediate) return setPast(true);
      const limit = marker ? marker.offsetTop + marker.offsetHeight : window.innerHeight * 0.85;
      setPast(window.scrollY > limit - window.innerHeight * 0.3);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const targets = [document.getElementById(buyBoxId), document.querySelector("footer")].filter(Boolean) as Element[];
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
      setBlocked(visible.size > 0);
    });
    targets.forEach((t) => io.observe(t));
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, [buyBoxId, showAfterId, immediate]);

  if (!isPurchasable(product)) return null;
  const show = past && !blocked && !isCartOpen;
  const compare = compareAt(product);

  return (
    <div
      aria-hidden={!show}
      inert={!show}
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-charcoal/10 bg-ivory/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl transition-transform duration-500 ease-out-soft lg:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-xl items-center gap-3">
        <span className="relative size-12 shrink-0 overflow-hidden rounded-xl bg-linen">
          <SiteImage image={product.images[0]} alt="" fill sizes="48px" className="object-cover" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{label ?? product.name}</p>
          <p className="text-sm">
            {formatMoney(product.price)}
            {compare && (
              <s className="ml-2 text-xs text-stone">
                <span className="sr-only">Price if bought separately: </span>
                {formatMoney(compare.amount)}
              </s>
            )}
          </p>
        </div>
        <button
          type="button"
          onClick={() => addItem(product)}
          aria-label={`Add ${product.name} to cart`}
          className="eyebrow h-12 shrink-0 rounded-full bg-charcoal px-6 text-ivory transition-colors hover:bg-ink active:scale-[0.98]"
        >
          {product.cta.addToCart}
        </button>
      </div>
    </div>
  );
}
