"use client";

import type { Variant } from "@/data/products";

/** Accessible colorway picker (radio group semantics). */
export function VariantSelector({
  variants,
  value,
  onChange,
  name,
}: {
  variants: Variant[];
  value: string;
  onChange: (id: string) => void;
  name: string;
}) {
  if (variants.length < 2) return null;
  const selected = variants.find((v) => v.id === value);

  return (
    <fieldset>
      <legend className="eyebrow mb-3 text-stone">
        Colorway <span className="ml-2 font-medium normal-case tracking-normal text-charcoal">{selected?.title}</span>
      </legend>
      <div className="flex gap-3">
        {variants.map((v) => (
          <label key={v.id} className="relative cursor-pointer">
            <input
              type="radio"
              name={name}
              value={v.id}
              checked={v.id === value}
              disabled={!v.available}
              onChange={() => onChange(v.id)}
              className="peer sr-only"
            />
            <span
              className="block size-9 rounded-full ring-1 ring-charcoal/15 ring-offset-[3px] ring-offset-ivory transition-shadow peer-checked:ring-2 peer-checked:ring-charcoal peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-sand-deep peer-disabled:opacity-30"
              style={{ backgroundColor: v.swatch }}
            />
            <span className="sr-only">
              {v.title}
              {!v.available && " (sold out)"}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
