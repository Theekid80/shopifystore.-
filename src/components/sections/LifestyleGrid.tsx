import { productImages } from "@/config/images";
import { lifestyle } from "@/config/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SiteImage } from "@/components/ui/SiteImage";

export function LifestyleGrid() {
  return (
    <section id="journey" aria-labelledby="journey-title" className="on-dark bg-ink py-24 text-ivory md:py-36">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-12">
        <SectionHeading id="journey-title" eyebrow={lifestyle.eyebrow} title={lifestyle.headline} tone="dark" />
        <ul className="mt-14 grid grid-cols-2 gap-3 md:mt-20 md:gap-5 lg:grid-cols-4">
          {lifestyle.items.map((item, i) => {
            const image = productImages[item.image];
            return (
              <Reveal as="li" key={item.title} delay={i * 90} className="group">
                <div className="relative aspect-[3/4] overflow-hidden rounded-[1.25rem] bg-graphite">
                  <SiteImage
                    image={image}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    tagPosition="top-left"
                    className="object-cover opacity-85 transition-[transform,opacity] duration-[1200ms] ease-out-soft group-hover:scale-[1.05] group-hover:opacity-100"
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
                    <h3 className="font-display text-3xl md:text-4xl">{item.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-ivory/75 md:text-sm">{item.body}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
