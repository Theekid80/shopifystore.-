import Image from "next/image";
import { images } from "@/config/images";
import { travelMoments } from "@/data/content";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { BedIcon, BriefcaseIcon, CarIcon, PlaneIcon } from "@/components/ui/Icons";

const momentIcons = [PlaneIcon, BedIcon, CarIcon, BriefcaseIcon];

export function LifestyleSection() {
  return (
    <section id="travel" aria-labelledby="travel-title" className="on-dark bg-ink text-ivory">
      <div className="relative isolate flex min-h-[85svh] items-end overflow-hidden">
        <Image
          src={images.airplaneLifestyle.src}
          alt={images.airplaneLifestyle.alt}
          fill
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />
        <div className="mx-auto w-full max-w-[1440px] px-4 pb-16 pt-40 md:px-8 md:pb-24 lg:px-12">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-sand">Wherever the journey goes</p>
            <h2 id="travel-title" className="text-display mt-6 font-medium uppercase">
              Rest anywhere.
            </h2>
            <p className="mt-7 max-w-lg text-base leading-relaxed text-ivory/80 md:text-lg">
              Airports. Airplanes. Hotels. Road trips. Wherever the journey takes you, bring your own comfort with you.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-4 pb-24 pt-4 md:px-8 md:pb-32 lg:px-12">
        <ul className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
          {travelMoments.map((m, i) => {
            const Icon = momentIcons[i];
            const img = images[m.image];
            return (
              <Reveal as="li" key={m.title} delay={i * 90} className="group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-graphite">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover opacity-80 transition-[transform,opacity] duration-[1200ms] ease-out-soft group-hover:scale-[1.05] group-hover:opacity-100"
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
                    <Icon size={20} className="text-sand" />
                    <h3 className="eyebrow mt-3 text-ivory">{m.title}</h3>
                    <p className="mt-2 hidden text-sm leading-relaxed text-ivory/70 md:block">{m.body}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>
        <Reveal className="mt-12 flex justify-center md:mt-16">
          <ButtonLink href="/#organize" variant="ghost-light" size="lg" arrow>
            Explore Travel Essentials
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
