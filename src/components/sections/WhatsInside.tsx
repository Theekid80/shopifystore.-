import { whatsInside } from "@/config/content";
import { systemPieces } from "@/config/products";
import { ProductCard } from "@/components/product/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Six cards — one per piece — each also purchasable on its own. */
export function WhatsInside() {
  return (
    <section id="inside" aria-labelledby="inside-title" className="bg-linen py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-12">
        <SectionHeading id="inside-title" eyebrow={whatsInside.eyebrow} title={whatsInside.headline} />
      </div>

      <ul
        aria-label="The six pieces"
        className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 md:mt-20 md:gap-6 md:scroll-px-8 md:px-8 lg:mx-auto lg:grid lg:max-w-[1440px] lg:grid-cols-3 lg:gap-x-6 lg:gap-y-14 lg:overflow-visible lg:px-12"
      >
        {systemPieces.map((p, i) => (
          <li key={p.id} className="w-[72vw] shrink-0 snap-start sm:w-[44vw] md:w-[36vw] lg:w-auto">
            <Reveal delay={(i % 3) * 90} className="h-full">
              <ProductCard product={p} />
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal className="mx-auto mt-20 max-w-[1440px] px-4 text-center md:mt-28 md:px-8">
        <p className="font-display text-headline">
          {whatsInside.closing.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
      </Reveal>
    </section>
  );
}
