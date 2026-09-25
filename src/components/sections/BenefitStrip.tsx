import { benefits } from "@/config/content";
import { Reveal } from "@/components/ui/Reveal";
import { LayersIcon, MoonIcon, PlaneIcon, SparkIcon } from "@/components/ui/Icons";

const icons = [MoonIcon, LayersIcon, SparkIcon, PlaneIcon];

export function BenefitStrip() {
  return (
    <section aria-label="Why travelers choose VELARA" className="border-b border-charcoal/10 bg-ivory">
      <ul className="mx-auto grid max-w-[1440px] grid-cols-2 gap-x-6 gap-y-10 px-4 py-12 md:px-8 md:py-16 lg:grid-cols-4 lg:px-12">
        {benefits.map((b, i) => {
          const Icon = icons[i % icons.length];
          return (
            <Reveal as="li" key={b.title} delay={i * 80}>
              <Icon size={22} className="text-sand-deep" />
              <h2 className="eyebrow mt-4 text-charcoal">{b.title}</h2>
              <p className="mt-2 max-w-60 text-sm leading-relaxed text-stone">{b.body}</p>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
