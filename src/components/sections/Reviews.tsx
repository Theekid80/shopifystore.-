import { reviews } from "@/config/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const DEV = process.env.NODE_ENV === "development";

/**
 * Reviews come only from src/config/content.ts → reviews.items.
 * - With real reviews: shows them (and stars only when a rating was given).
 * - With none, in development: clearly marked placeholder slots.
 * - With none, in production: the section is hidden (an empty reviews block
 *   reads as unfinished). Never invented reviews.
 */
export function Reviews() {
  const { items } = reviews;
  if (!items.length && !DEV && !reviews.showEmptyMessage) return null;

  return (
    <section aria-labelledby="reviews-title" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-12">
        <SectionHeading id="reviews-title" eyebrow={reviews.eyebrow} title={reviews.headline} align="center" />

        {items.length > 0 ? (
          <ul className="no-scrollbar -mx-4 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 md:mx-0 md:mt-20 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0">
            {items.map((r, i) => (
              <Reveal as="li" key={i} delay={i * 90} className="flex w-[82vw] shrink-0 snap-start flex-col rounded-[1.25rem] border border-charcoal/10 p-7 sm:w-[60vw] md:w-auto md:p-9">
                {r.rating && (
                  <p className="mb-6 text-sm tracking-[0.2em] text-charcoal" aria-label={`Rated ${r.rating} out of 5`}>
                    {"★".repeat(r.rating)}
                    <span className="text-mist">{"★".repeat(5 - r.rating)}</span>
                  </p>
                )}
                <blockquote className="flex-1">
                  <p className="font-display text-2xl leading-snug">&ldquo;{r.quote}&rdquo;</p>
                </blockquote>
                <p className="mt-8 border-t border-charcoal/10 pt-5 text-sm">
                  <span className="font-semibold">{r.name}</span>
                  {(r.location || r.product) && (
                    <span className="mt-1 block text-xs text-stone">{[r.location, r.product].filter(Boolean).join(" · ")}</span>
                  )}
                </p>
              </Reveal>
            ))}
          </ul>
        ) : DEV ? (
          <ul className="mt-14 grid gap-4 md:mt-20 md:grid-cols-3 md:gap-5">
            {[1, 2, 3].map((n) => (
              <li key={n} className="flex min-h-56 flex-col items-center justify-center rounded-[1.25rem] border-2 border-dashed border-sand-deep/40 p-8 text-center">
                <p className="eyebrow text-sand-deep">Placeholder · dev only</p>
                <p className="font-display mt-4 text-2xl">Your customer review here</p>
                <p className="mt-3 text-xs text-stone">Add real reviews in src/config/content.ts → reviews.items</p>
              </li>
            ))}
          </ul>
        ) : (
          <Reveal className="mx-auto mt-10 max-w-md text-center">
            <p className="text-base leading-relaxed text-stone">{reviews.emptyMessage}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
