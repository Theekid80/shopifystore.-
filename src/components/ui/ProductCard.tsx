"use client";

import Image from "next/image";
import type { Product } from "@/data/products";
import { useStore } from "@/lib/commerce/cart";
import { formatMoney } from "@/lib/commerce/money";
import { WishlistButton } from "./WishlistButton";
import { PlusIcon } from "./Icons";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useStore();
  const defaultVariant = product.variants.find((v) => v.available) ?? product.variants[0];

  return (
    <article id={`product-${product.handle}`} className="group relative flex h-full flex-col">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-linen">
        <Image
          src={product.image.src}
          alt={product.image.alt}
          fill
          sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 72vw"
          className="object-cover transition-transform duration-[1200ms] ease-out-soft group-hover:scale-[1.04]"
        />
        <span className="eyebrow absolute left-4 top-4 text-charcoal/60">{product.index}</span>
        <WishlistButton productId={product.id} name={product.name} className="absolute right-3 top-3" />
        <button
          type="button"
          onClick={() => addItem(product.id, defaultVariant.id)}
          aria-label={`Add ${product.name} to cart`}
          className="eyebrow absolute inset-x-3 bottom-3 flex h-11 translate-y-0 items-center justify-center gap-2 rounded-full bg-ivory/90 text-charcoal opacity-100 backdrop-blur transition-all duration-500 ease-out-soft hover:bg-ivory md:translate-y-3 md:opacity-0 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100 md:group-hover:translate-y-0 md:group-hover:opacity-100"
        >
          <PlusIcon size={14} /> Add to cart
        </button>
      </div>
      <div className="mt-5 flex flex-1 flex-col">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-[0.95rem] font-semibold tracking-tight text-charcoal">{product.name}</h3>
          <span className="text-sm text-stone">{formatMoney(product.price)}</span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-stone">{product.benefit}</p>
      </div>
    </article>
  );
}
