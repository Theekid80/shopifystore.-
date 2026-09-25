"use client";

import { useId, useState, type ReactNode } from "react";
import { PlusIcon } from "./Icons";

export type AccordionItem = { q: string; a: ReactNode };

/** Accessible accordion (WAI-ARIA disclosure pattern). One panel open at a time. */
export function Accordion({
  items,
  defaultOpen = null,
  size = "lg",
}: {
  items: AccordionItem[];
  defaultOpen?: number | null;
  size?: "sm" | "lg";
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const baseId = useId();
  const small = size === "sm";

  return (
    <ul className="border-t border-charcoal/15">
      {items.map((item, i) => {
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
                className={`flex w-full items-center justify-between gap-6 text-left font-medium tracking-tight ${
                  small ? "py-4 text-sm" : "py-6 text-base md:py-7 md:text-lg"
                }`}
              >
                {item.q}
                <span
                  aria-hidden="true"
                  className={`grid shrink-0 place-items-center rounded-full border border-charcoal/15 transition-transform duration-500 ease-out-soft ${
                    small ? "size-7" : "size-9"
                  } ${isOpen ? "rotate-45 bg-charcoal text-ivory" : ""}`}
                >
                  <PlusIcon size={small ? 13 : 16} />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              inert={!isOpen}
              className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out-soft ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className={`max-w-2xl pr-10 leading-relaxed text-stone ${small ? "pb-5 text-sm" : "pb-7 text-[0.95rem]"}`}>
                  {item.a}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
