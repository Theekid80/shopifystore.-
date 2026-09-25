"use client";

import Link from "next/link";
import { useState } from "react";
import { productHref, products } from "@/config/products";
import { useStore } from "@/lib/commerce/cart";
import { formatMoney } from "@/lib/commerce/money";
import { Sheet } from "@/components/ui/Sheet";
import { SiteImage } from "@/components/ui/SiteImage";
import { CloseIcon, SearchIcon } from "@/components/ui/Icons";

/**
 * Lightweight client-side search over the catalog.
 * TODO (Shopify): swap for the Storefront API `predictiveSearch` query.
 */
const index = products.map((p) => ({
  id: p.id,
  name: p.name,
  text: `${p.tagline} ${p.description}`,
  price: p.price,
  image: p.images[0],
  href: productHref(p),
}));

export function SearchDialog() {
  const { isSearchOpen, setSearchOpen } = useStore();
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const results = q ? index.filter((i) => `${i.name} ${i.text}`.toLowerCase().includes(q)) : index.slice(0, 4);

  const close = () => {
    setSearchOpen(false);
    setQuery("");
  };

  return (
    <Sheet open={isSearchOpen} onClose={close} side="top" label="Search">
      <div className="mx-auto max-w-3xl px-4 pb-8 pt-4 md:px-8 md:pb-12 md:pt-8">
        <div className="flex items-center gap-3 border-b border-charcoal/20 pb-3">
          <SearchIcon size={22} className="shrink-0 text-stone" />
          <label htmlFor="site-search" className="sr-only">
            Search products
          </label>
          <input
            id="site-search"
            type="search"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search VELARA"
            autoComplete="off"
            className="h-12 flex-1 bg-transparent text-xl font-medium tracking-tight outline-none placeholder:text-stone/70 md:text-2xl"
          />
          <button
            type="button"
            onClick={close}
            aria-label="Close search"
            className="grid size-11 place-items-center rounded-full hover:bg-charcoal/5"
          >
            <CloseIcon size={22} />
          </button>
        </div>

        <p className="eyebrow mt-6 text-stone" aria-live="polite">
          {q ? `${results.length} ${results.length === 1 ? "result" : "results"}` : "Popular"}
        </p>
        <ul className="mt-3 grid gap-1 sm:grid-cols-2">
          {results.map((r) => (
            <li key={r.id}>
              <Link href={r.href} onClick={close} className="flex items-center gap-4 rounded-2xl p-2 transition-colors hover:bg-linen">
                <span className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-linen">
                  <SiteImage image={r.image} alt="" fill sizes="64px" className="object-cover" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold">{r.name}</span>
                  <span className="block text-sm text-stone">{formatMoney(r.price)}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        {q && results.length === 0 && (
          <p className="mt-2 text-sm text-stone">Nothing matches “{query}”. Try “mask” or “organizer”.</p>
        )}
      </div>
    </Sheet>
  );
}
