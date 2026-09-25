import { whyVelara } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LayersIcon, MoonIcon, SparkIcon, CircleIcon } from "@/components/ui/Icons";

const icons = [MoonIcon, LayersIcon, CircleIcon, SparkIcon];

export function WhyVelara() {
  return (
    <section id="story" aria-labelledby="story-title" className="bg-linen py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading id="story-title" eyebrow="Why Velara" title="Travel should feel this good." />
          </div>
          <Reveal delay={120} className="lg:col-span-5 lg:pt-12">
            {/* TODO: replace with your founder story. */}
            <p className="text-base leading-relaxed text-stone md:text-lg">
              Velara began with a simple idea: the few hours of rest you get on the road matter. So we designed one quiet,
              considered system — for the flight, the hotel and everything in between — and left out everything that
              doesn&apos;t earn its place in your bag.
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-3 sm:grid-cols-2 md:mt-20 md:gap-5 lg:grid-cols-4">
          {whyVelara.map((f, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal
                as="li"
                key={f.title}
                delay={i * 90}
                className="group rounded-[1.25rem] bg-ivory p-7 transition-[transform,box-shadow] duration-500 ease-out-soft hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(28,28,27,0.3)] md:p-8"
              >
                <div className="flex items-start justify-between">
                  <Icon size={26} className="text-sand-deep" />
                  <span className="eyebrow text-stone/70">0{i + 1}</span>
                </div>
                <h3 className="mt-14 text-xl font-medium uppercase tracking-tight md:mt-20">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone">{f.body}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
