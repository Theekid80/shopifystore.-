import { testimonials } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Testimonials — content lives in src/data/content.ts.
 * While `testimonials.isPlaceholder` is true every card is visibly labeled
 * as a placeholder so nothing reads as a real customer review.
 */
export function Testimonials() {
  const { isPlaceholder, items } = testimonials;
  return (
    <section aria-labelledby="reviews-title" className="py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-12">
        <SectionHeading id="reviews-title" eyebrow="From the journey" title="In their words." align="center" />

        <ul className="no-scrollbar -mx-4 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 md:mx-0 md:mt-20 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0">
          {items.map((t, i) => (
            <Reveal
              as="li"
              key={i}
              delay={i * 90}
              className="flex w-[82vw] shrink-0 snap-start flex-col rounded-[1.25rem] border border-charcoal/10 p-7 sm:w-[60vw] md:w-auto md:p-9"
            >
              {isPlaceholder && (
                <p className="eyebrow mb-8 self-start rounded-full border border-dashed border-sand-deep/50 px-3 py-1 text-[0.625rem] text-sand-deep">
                  Placeholder testimonial
                </p>
              )}
              <blockquote className="flex-1">
                <p className="text-xl font-medium leading-snug tracking-tight md:text-2xl">&ldquo;{t.quote}&rdquo;</p>
              </blockquote>
              <p className="mt-10 border-t border-charcoal/10 pt-5 text-sm">
                <span className="font-semibold uppercase tracking-[0.14em]">— {t.name}</span>
                <span className="mt-1 block text-xs text-stone">{t.detail}</span>
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
