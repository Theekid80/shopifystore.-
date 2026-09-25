import { newsletter } from "@/config/content";
import { Reveal } from "@/components/ui/Reveal";
import { NewsletterForm } from "@/components/newsletter/NewsletterForm";

export function Newsletter() {
  return (
    <section aria-labelledby="newsletter-title" className="py-24 md:py-32">
      <Reveal className="mx-auto max-w-2xl px-4 text-center md:px-8">
        <p className="eyebrow text-sand-deep">{newsletter.eyebrow}</p>
        <h2 id="newsletter-title" className="font-display text-headline mt-5">
          {newsletter.headline}
        </h2>
        <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-stone">{newsletter.body}</p>
        <div className="mx-auto mt-10 max-w-md">
          <NewsletterForm cta={newsletter.cta} />
          <p className="text-xs text-stone/90">No spam. Unsubscribe anytime.</p>
        </div>
      </Reveal>
    </section>
  );
}
