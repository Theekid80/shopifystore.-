import { productImages as img } from "@/config/images";
import { airplane } from "@/config/content";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SiteImage } from "@/components/ui/SiteImage";

export function AirplaneSection() {
  return (
    <section aria-labelledby="air-title" className="on-dark relative isolate flex min-h-[80svh] items-end overflow-hidden bg-ink text-ivory">
      <SiteImage image={img.airplane} fill sizes="100vw" tagPosition="top-left" className="-z-20 object-cover object-[60%_center]" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/45 to-ink/10" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/70 to-transparent" />
      <div className="mx-auto w-full max-w-[1440px] px-4 pb-16 pt-40 md:px-8 md:pb-24 lg:px-12">
        <Reveal className="max-w-xl">
          <p className="eyebrow text-sand">{airplane.eyebrow}</p>
          <h2 id="air-title" className="font-display text-headline mt-5">
            {airplane.headline}
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ivory/80 md:text-lg">{airplane.body}</p>
          <ButtonLink href={airplane.cta.href} variant="light" size="lg" arrow className="mt-9">
            {airplane.cta.label}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
