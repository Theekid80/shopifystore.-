import Image from "next/image";
import { images } from "@/config/images";
import { site } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="on-dark relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-ivory">
      <Image
        src={images.hero.src}
        alt={images.hero.alt}
        fill
        preload
        sizes="100vw"
        className="animate-settle -z-20 object-cover object-[70%_center]"
      />
      {/* Readability gradients: stronger at the bottom-left where the copy sits. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/45 to-ink/30" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/70 via-ink/20 to-transparent" />

      <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-end px-4 pb-10 pt-32 md:px-8 md:pb-14 lg:px-12">
        <p className="eyebrow animate-rise text-sand">The Travel Sleep System</p>
        <h1 id="hero-title" className="text-display animate-rise mt-6 font-medium uppercase [animation-delay:120ms]">
          Better Sleep.
          <br />
          <span className="text-ivory/75">Smoother Journeys.</span>
        </h1>
        <p className="animate-rise mt-7 max-w-md text-base leading-relaxed text-ivory/80 [animation-delay:240ms] md:text-lg">
          Your personal sleep environment, designed for wherever you go.
        </p>
        <div className="animate-rise mt-10 flex flex-col gap-3 [animation-delay:360ms] sm:flex-row">
          <ButtonLink href="/#system" variant="light" size="lg" arrow>
            Shop the Travel System
          </ButtonLink>
          <ButtonLink href="/#collection" variant="ghost-light" size="lg">
            Explore the Collection
          </ButtonLink>
        </div>

        <ul
          aria-label="Why travelers choose Velara"
          className="animate-rise mt-16 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-white/15 pt-6 [animation-delay:520ms] md:mt-20 md:grid-cols-4"
        >
          {site.heroBenefits.map((b) => (
            <li key={b} className="eyebrow flex items-center gap-3 text-ivory/75">
              <span aria-hidden="true" className="size-1 rounded-full bg-sand" />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
