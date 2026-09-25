import Image from "next/image";
import { images } from "@/config/images";
import { organizationItems } from "@/data/content";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckIcon } from "@/components/ui/Icons";

export function OrganizationSection() {
  return (
    <section id="organize" aria-labelledby="organize-title" className="py-24 md:py-36">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-14 px-4 md:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12">
        <div className="lg:col-span-5">
          <SectionHeading
            id="organize-title"
            eyebrow="Organization"
            title={
              <>
                Pack smart.
                <br />
                Travel light.
              </>
            }
            body="Everything has its place, so you can spend less time searching and more time enjoying the journey."
          />
          <Reveal delay={120}>
            <ul className="mt-10 divide-y divide-charcoal/10 border-y border-charcoal/10">
              {organizationItems.map((item) => (
                <li key={item} className="flex items-center gap-4 py-4 text-sm font-medium">
                  <span className="grid size-6 place-items-center rounded-full bg-sand/30 text-sand-deep">
                    <CheckIcon size={13} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <ButtonLink href="/#system" arrow className="mt-10">
              Shop the System
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal delay={80} className="relative lg:col-span-7">
          <div className="group relative aspect-[3/2] overflow-hidden rounded-[1.75rem] bg-linen">
            <Image
              src={images.suitcaseOrganized.src}
              alt={images.suitcaseOrganized.alt}
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover transition-transform duration-[1600ms] ease-out-soft group-hover:scale-[1.03]"
            />
          </div>
          <div className="absolute -bottom-8 -left-2 hidden aspect-square w-44 overflow-hidden rounded-2xl border-4 border-ivory bg-linen shadow-xl md:block lg:-left-8">
            <Image
              src={images.techOrganizer.src}
              alt={images.techOrganizer.alt}
              fill
              sizes="176px"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
