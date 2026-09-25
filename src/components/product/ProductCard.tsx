"use client";

import Link from "next/link";
import { isPurchasable, productHref, type Product } from "@/config/products";
import { useStore } from "@/lib/commerce/cart";
import { formatMoney } from "@/lib/commerce/money";
import { SiteImage } from "@/components/ui/SiteImage";
import { PlusIcon } from "@/components/ui/Icons";

/** Card for one purchasable product. The image and name link to its own page. */
export function ProductCard({
  product,
  showIndex = true,
  priority = false,
}: {
  product: Product;
  showIndex?: boolean;
  priority?: boolean;
}) {
  const { addItem } = useStore();
  const href = productHref(product);

  return (
    <article className="group relative flex h-full flex-col">
      <div className="relative aspect-square overflow-hidden rounded-[1.25rem] bg-linen">
        <Link href={href} tabIndex={-1} aria-hidden="true" className="absolute inset-0">
          <SiteImage
            image={product.images[0]}
            fill
            preload={priority}
            sizes="(min-width: 1280px) 30vw, (min-width: 768px) 32vw, 72vw"
            className="object-cover transition-transform duration-[1200ms] ease-out-soft group-hover:scale-[1.04]"
          />
        </Link>
        {showIndex && product.index && (
          <span className="eyebrow absolute left-3 top-3 rounded-full bg-ivory/85 px-3 py-1.5 text-charcoal backdrop-blur">
            {product.index}
          </span>
        )}
        {product.badge && (
          <span className="eyebrow absolute right-3 top-3 rounded-full bg-charcoal/85 px-3 py-1.5 text-[0.625rem] text-ivory backdrop-blur">
            {product.badge}
          </span>
        )}
        {isPurchasable(product) && (
          <button
            type="button"
            onClick={() => addItem(product)}
            aria-label={`Add ${product.name} to cart`}
            className="eyebrow absolute inset-x-3 bottom-3 flex h-11 items-center justify-center gap-2 rounded-full bg-ivory/90 text-charcoal backdrop-blur transition-all duration-500 ease-out-soft hover:bg-ivory md:translate-y-3 md:opacity-0 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100 md:group-hover:translate-y-0 md:group-hover:opacity-100"
          >
            <PlusIcon size={14} /> Add to cart
          </button>
        )}
      </div>
      <div className="mt-5 flex flex-1 flex-col">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-[0.95rem] font-semibold tracking-tight text-charcoal">
            <Link href={href} className="hover:underline hover:underline-offset-4">
              {product.name}
            </Link>
          </h3>
          <span className="shrink-0 text-sm text-stone">{formatMoney(product.price)}</span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-stone">{product.tagline}</p>
        {product.stock === "out_of_stock" && <p className="eyebrow mt-3 text-stone">Sold out</p>}
      </div>
    </article>
  );
}
