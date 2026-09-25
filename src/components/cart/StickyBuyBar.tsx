"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { images } from "@/config/images";
import { bundle, bundleCompareAtPrice } from "@/data/products";
import { useStore } from "@/lib/commerce/cart";
import { formatMoney } from "@/lib/commerce/money";

/**
 * Mobile/tablet buy bar for the system. Appears once the hero is scrolled
 * past, and hides while the buy box or footer is on screen, or the cart is open.
 */
export function StickyBuyBar() {
  const { addItem, isCartOpen } = useStore();
  const [pastHero, setPastHero] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const targets = [document.getElementById("system"), document.querySelector("footer")].filter(Boolean) as Element[];
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
  }, []);

  const show = pastHero && !blocked && !isCartOpen;
  const compare = bundleCompareAtPrice != null && bundleCompareAtPrice > bundle.pricing.price ? bundleCompareAtPrice : null;

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
          <Image src={images.travelSystem.src} alt="" fill sizes="48px" className="object-cover" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">Travel Sleep System</p>
          <p className="text-sm">
            {formatMoney(bundle.pricing.price)}
            {compare && (
              <s className="ml-2 text-xs text-stone">
                <span className="sr-only">Price if bought separately: </span>
                {formatMoney(compare)}
              </s>
            )}
          </p>
        </div>
        <button
          type="button"
          onClick={() => addItem(bundle.id, bundle.variants[0].id)}
          aria-label={`Add ${bundle.name} to cart`}
          className="eyebrow h-12 shrink-0 rounded-full bg-charcoal px-6 text-ivory transition-colors active:scale-[0.98] hover:bg-ink"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
