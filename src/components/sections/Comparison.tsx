import { comparison } from "@/config/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckIcon, MinusIcon } from "@/components/ui/Icons";

export function Comparison() {
  const [separate, system] = comparison.columns;
  return (
    <section aria-labelledby="compare-title" className="py-24 md:py-36">
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <SectionHeading id="compare-title" eyebrow={comparison.eyebrow} title={comparison.headline} align="center" />

        <Reveal className="mt-14 grid gap-4 md:mt-20 md:grid-cols-2 md:gap-5">
          <div className="rounded-[1.5rem] border border-charcoal/12 p-7 md:p-10">
            <h3 className="eyebrow text-stone">{separate.title}</h3>
            <ul className="mt-8 space-y-5">
              {separate.points.map((p) => (
                <li key={p} className="flex items-center gap-4 text-base text-stone">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full border border-charcoal/15">
                    <MinusIcon size={13} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="on-dark rounded-[1.5rem] bg-charcoal p-7 text-ivory md:p-10">
            <h3 className="eyebrow text-sand">{system.title}</h3>
            <ul className="mt-8 space-y-5">
              {system.points.map((p) => (
                <li key={p} className="flex items-center gap-4 text-base">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-sand/20 text-sand">
                    <CheckIcon size={14} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
