import Link from "next/link";
import { productImages as img } from "@/config/images";
import { showcase } from "@/config/content";
import { productHref, systemPieces } from "@/config/products";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SiteImage } from "@/components/ui/SiteImage";
import { ArrowRightIcon } from "@/components/ui/Icons";

/** Editorial breakdown: the numbered flat lay beside a numbered list of the six pieces. */
export function SystemShowcase() {
  return (
    <section id="system" aria-labelledby="system-title" className="py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-12">
        <SectionHeading id="system-title" eyebrow={showcase.eyebrow} title={showcase.headline} />

        <div className="mt-14 grid grid-cols-1 items-start gap-10 md:mt-20 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:sticky lg:top-28 lg:col-span-7">
            <div className="relative aspect-[8/7] overflow-hidden rounded-[1.75rem] bg-linen">
              <SiteImage image={img.bundle} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
            </div>
          </Reveal>

          <div className="lg:col-span-5">
          <ol>
            {systemPieces.map((p, i) => (
              <Reveal as="li" key={p.id} delay={i * 60} className="border-b border-charcoal/10 first:border-t">
                <Link href={productHref(p)} className="group flex items-center gap-5 py-5 md:py-6">
                  <span className="font-display w-10 shrink-0 text-3xl text-sand-deep">{p.index}</span>
                  <span className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-linen">
                    <SiteImage image={p.images[0]} alt="" fill sizes="64px" className="object-cover" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="eyebrow block text-charcoal">{p.name}</span>
                    <span className="mt-1.5 block text-sm leading-relaxed text-stone">{p.tagline}</span>
                  </span>
                  <ArrowRightIcon size={16} className="shrink-0 text-stone transition-transform group-hover:translate-x-1 group-hover:text-charcoal" />
                </Link>
              </Reveal>
            ))}
          </ol>
          <Reveal className="pt-8">
            <ButtonLink href="/#offer" arrow>
              Shop the System
            </ButtonLink>
          </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
