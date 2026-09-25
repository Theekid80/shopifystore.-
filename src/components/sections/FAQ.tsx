import { Accordion, type AccordionItem } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Two-column accordion section, used for both "Product details" and the FAQ. */
export function FAQ({
  id,
  eyebrow,
  title,
  items,
  tone = "linen",
}: {
  id: string;
  eyebrow: string;
  title: string;
  items: AccordionItem[];
  tone?: "linen" | "ivory";
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`${tone === "linen" ? "bg-linen" : "bg-ivory"} py-24 md:py-32`}>
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-4 md:px-8 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-4">
          <SectionHeading id={`${id}-title`} eyebrow={eyebrow} title={title} />
        </div>
        <Reveal className="lg:col-span-8">
          <Accordion items={items} defaultOpen={0} />
        </Reveal>
      </div>
    </section>
  );
}
