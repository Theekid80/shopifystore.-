import Image from "next/image";
import { images } from "@/config/images";
import { products } from "@/data/products";
import { ButtonLink } from "@/components/ui/Button";
import { ProductCard } from "@/components/ui/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ProductShowcase() {
  return (
    <section id="collection" aria-labelledby="collection-title" className="py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="collection-title"
            eyebrow="Seven pieces · One system"
            title={
              <>
                The Complete
                <br />
                Travel Sleep System
              </>
            }
          />
          <Reveal delay={120}>
            <ButtonLink href="/#system" variant="secondary" arrow className="self-start">
              Shop the System
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal className="mt-14 md:mt-20">
          <div className="group relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-linen md:aspect-[16/9]">
            <Image
              src={images.travelSystem.src}
              alt={images.travelSystem.alt}
              fill
              sizes="(min-width: 1440px) 1340px, 100vw"
              className="object-cover transition-transform duration-[1600ms] ease-out-soft group-hover:scale-[1.02]"
            />
          </div>
        </Reveal>
      </div>

      {/* Horizontal scroller on mobile/tablet, grid on desktop. */}
      <div className="mt-14 md:mt-20">
        <ul
          aria-label="Pieces in the system"
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 md:gap-6 md:scroll-px-8 md:px-8 xl:mx-auto xl:grid xl:max-w-[1440px] xl:grid-cols-4 xl:gap-x-6 xl:gap-y-14 xl:overflow-visible xl:px-12"
        >
          {products.map((p, i) => (
            <li key={p.id} className="w-[72vw] shrink-0 snap-start sm:w-[44vw] md:w-[32vw] xl:w-auto">
              <Reveal delay={(i % 4) * 90} className="h-full">
                <ProductCard product={p} />
              </Reveal>
            </li>
          ))}
          <li className="w-[72vw] shrink-0 snap-start sm:w-[44vw] md:w-[32vw] xl:w-auto">
            <Reveal delay={270} className="h-full">
              <div className="flex aspect-[4/5] flex-col justify-between rounded-[1.25rem] bg-charcoal p-7 text-ivory on-dark">
                <p className="eyebrow text-sand">All seven, together</p>
                <div>
                  <p className="text-3xl font-medium uppercase leading-[1.05] tracking-tight">
                    One system.
                    <br />
                    Every journey.
                  </p>
                  <ButtonLink href="/#system" variant="light" arrow className="mt-8">
                    Shop the System
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          </li>
        </ul>
      </div>
    </section>
  );
}
