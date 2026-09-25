import type { Metadata } from "next";
import { products, productHref, systemPieces, SLEEP_TRAVEL_KIT, VELARA_TRAVEL_SLEEP_SYSTEM as SYSTEM } from "@/config/products";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductPrice } from "@/components/ui/Price";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SiteImage } from "@/components/ui/SiteImage";

export const metadata: Metadata = {
  title: "Shop",
  description: "The VELARA Travel Sleep System, the Sleep + Travel Kit, and every piece sold individually.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  const pieces = products
    .filter((p) => p.kind === "piece")
    .sort((a, b) => (a.index ?? "99").localeCompare(b.index ?? "99"));

  return (
    <>
      {/* The hero product, featured first. */}
      <section aria-labelledby="shop-title" className="mx-auto max-w-[1440px] px-4 pb-20 pt-32 md:px-8 md:pt-40 lg:px-12">
        <p className="eyebrow text-sand-deep">Shop</p>
        <h1 id="shop-title" className="font-display text-headline mt-4">
          Travel, refined.
        </h1>

        <Reveal className="mt-12 grid grid-cols-1 items-center gap-10 overflow-hidden rounded-[1.75rem] bg-linen md:grid-cols-2">
          <div className="relative aspect-[8/7]">
            <SiteImage image={SYSTEM.images[0]} fill preload sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="px-6 pb-10 md:px-4 md:py-10 md:pr-12">
            <p className="eyebrow text-sand-deep">{SYSTEM.badge} · {systemPieces.length} pieces</p>
            <h2 className="font-display mt-4 text-4xl md:text-5xl">{SYSTEM.name}</h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-stone">{SYSTEM.tagline}</p>
            <div className="mt-6">
              <ProductPrice product={SYSTEM} size="lg" />
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={productHref(SYSTEM)} size="lg" arrow>
                Shop the System
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </section>

      <section aria-labelledby="sets-title" className="mx-auto max-w-[1440px] px-4 pb-20 md:px-8 lg:px-12">
        <h2 id="sets-title" className="eyebrow text-stone">
          Sets
        </h2>
        <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {[SYSTEM, SLEEP_TRAVEL_KIT].map((p) => (
            <li key={p.id}>
              <ProductCard product={p} showIndex={false} />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="pieces-title" className="mx-auto max-w-[1440px] px-4 pb-28 md:px-8 lg:px-12">
        <h2 id="pieces-title" className="eyebrow text-stone">
          Individual pieces
        </h2>
        <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {pieces.map((p) => (
            <li key={p.id}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
