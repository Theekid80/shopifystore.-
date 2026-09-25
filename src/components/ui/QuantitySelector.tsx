"use client";

import { MAX_QUANTITY } from "@/lib/commerce/cart";
import { MinusIcon, PlusIcon } from "./Icons";

export function QuantitySelector({
  value,
  onChange,
  label,
  min = 1,
  size = "md",
}: {
  value: number;
  onChange: (next: number) => void;
  label: string;
  min?: number;
  size?: "sm" | "md";
}) {
  const h = size === "sm" ? "h-9" : "h-14";
  const w = size === "sm" ? "w-9" : "w-12";
  return (
    <div role="group" aria-label={label} className={`inline-flex ${h} items-center rounded-full border border-charcoal/15`}>
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className={`grid ${h} ${w} place-items-center rounded-full text-charcoal transition-opacity disabled:opacity-30`}
      >
        <MinusIcon size={14} />
      </button>
      <output aria-live="polite" className="min-w-6 text-center text-sm font-medium tabular-nums">
        {value}
      </output>
      <button
        type="button"
        onClick={() => onChange(Math.min(MAX_QUANTITY, value + 1))}
        disabled={value >= MAX_QUANTITY}
        aria-label="Increase quantity"
        className={`grid ${h} ${w} place-items-center rounded-full text-charcoal transition-opacity disabled:opacity-30`}
      >
        <PlusIcon size={14} />
      </button>
    </div>
  );
}
