import { productImages as img } from "@/config/images";
import { hotel } from "@/config/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SiteImage } from "@/components/ui/SiteImage";

export function HotelSection() {
  return (
    <section aria-labelledby="hotel-title" className="py-24 md:py-36">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-14 px-4 md:px-8 lg:grid-cols-12 lg:gap-20 lg:px-12">
        <div className="lg:order-2 lg:col-span-7">
          <Reveal className="grid grid-cols-5 gap-3">
            <div className="relative col-span-3 aspect-[3/4] overflow-hidden rounded-[1.5rem] bg-linen">
              <SiteImage image={img.bundleBoxed} fill sizes="(min-width: 1024px) 34vw, 60vw" className="object-cover object-[35%_center]" />
            </div>
            <div className="col-span-2 flex flex-col gap-3">
              <div className="relative flex-1 overflow-hidden rounded-[1.5rem] bg-linen">
                <SiteImage image={img.hotel} fill sizes="(min-width: 1024px) 22vw, 40vw" className="object-cover" />
              </div>
              <div className="relative flex-1 overflow-hidden rounded-[1.5rem] bg-linen">
                <SiteImage image={img.techOrganizer} fill sizes="(min-width: 1024px) 22vw, 40vw" className="object-cover" />
              </div>
            </div>
          </Reveal>
        </div>

        <div className="lg:order-1 lg:col-span-5">
          <SectionHeading id="hotel-title" eyebrow={hotel.eyebrow} title={hotel.headline} body={hotel.body} />
          <ol className="mt-10 space-y-6">
            {hotel.steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 90} className="flex gap-5">
                <span className="font-display text-2xl leading-none text-sand-deep">0{i + 1}</span>
                <div>
                  <h3 className="eyebrow text-charcoal">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
