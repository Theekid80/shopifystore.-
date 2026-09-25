"use client";

import { useStore } from "@/lib/commerce/cart";
import { HeartIcon } from "./Icons";

/**
 * Wishlist heart. Saves to this browser only (localStorage).
 * TODO (optional): sync with a Shopify customer metafield or a wishlist app.
 */
export function WishlistButton({ productId, name, className = "" }: { productId: string; name: string; className?: string }) {
  const { wishlist, toggleWishlist } = useStore();
  const saved = wishlist.includes(productId);
  return (
    <button
      type="button"
      onClick={() => toggleWishlist(productId)}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${name} from wishlist` : `Save ${name} to wishlist`}
      className={`grid size-10 place-items-center rounded-full bg-ivory/85 text-charcoal backdrop-blur transition-transform duration-300 hover:scale-105 active:scale-95 ${className}`}
    >
      <HeartIcon size={18} filled={saved} className={saved ? "text-charcoal" : ""} />
    </button>
  );
}
