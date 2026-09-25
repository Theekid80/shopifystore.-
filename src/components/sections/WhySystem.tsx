import { productImages as img } from "@/config/images";
import { whySystem } from "@/config/content";
import { Reveal } from "@/components/ui/Reveal";
import { SiteImage } from "@/components/ui/SiteImage";

export function WhySystem() {
  return (
    <section id="why" aria-labelledby="why-title" className="bg-linen py-24 md:py-36">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-14 px-4 md:px-8 lg:grid-cols-12 lg:gap-20 lg:px-12">
        <Reveal className="relative lg:col-span-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-mist">
            <SiteImage image={img.lifestyle} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
          <div className="absolute -bottom-8 -right-2 hidden aspect-square w-40 overflow-hidden rounded-2xl border-4 border-linen bg-mist shadow-xl md:block lg:-right-8">
            <SiteImage image={img.sleepMask} fill sizes="160px" className="object-cover" />
          </div>
        </Reveal>

        <div className="lg:col-span-6">
          <Reveal>
            <p className="eyebrow text-sand-deep">{whySystem.eyebrow}</p>
            <h2 id="why-title" className="font-display text-headline mt-5">
              {whySystem.headline}
            </h2>
            <p className="font-display mt-8 text-2xl leading-snug text-charcoal md:text-[1.75rem]">{whySystem.lead}</p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-stone">{whySystem.body}</p>
          </Reveal>
          <ul className="mt-10 grid gap-3 sm:grid-cols-3">
            {whySystem.points.map((pt, i) => (
              <Reveal as="li" key={pt.title} delay={i * 80} className="rounded-2xl bg-ivory p-5">
                <h3 className="eyebrow text-charcoal">{pt.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone">{pt.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
