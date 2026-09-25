"use client";

import { useId, useState } from "react";
import { faq } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { PlusIcon } from "@/components/ui/Icons";

/** Accessible accordion (WAI-ARIA disclosure pattern). One panel open at a time. */
export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-linen py-24 md:py-36">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-4 md:px-8 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-4">
          <SectionHeading id="faq-title" eyebrow="FAQ" title="Questions, answered." />
        </div>
        <Reveal className="lg:col-span-8">
          <ul className="border-t border-charcoal/15">
            {faq.map((item, i) => {
              const isOpen = open === i;
              const btnId = `${baseId}-q${i}`;
              const panelId = `${baseId}-a${i}`;
              return (
                <li key={item.q} className="border-b border-charcoal/15">
                  <h3>
                    <button
                      id={btnId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left text-base font-medium tracking-tight md:py-7 md:text-lg"
                    >
                      {item.q}
                      <span
                        aria-hidden="true"
                        className={`grid size-9 shrink-0 place-items-center rounded-full border border-charcoal/15 transition-transform duration-500 ease-out-soft ${
                          isOpen ? "rotate-45 bg-charcoal text-ivory" : ""
                        }`}
                      >
                        <PlusIcon size={16} />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out-soft ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                    inert={!isOpen}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pb-7 pr-12 text-[0.95rem] leading-relaxed text-stone">{item.a}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
