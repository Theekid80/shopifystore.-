import { formatMoney, savingsLabel } from "@/lib/commerce/money";
import type { SavingsDisplay } from "@/data/products";

export function Price({
  price,
  compareAt = null,
  savings = "none",
  size = "md",
}: {
  price: number;
  compareAt?: number | null;
  savings?: SavingsDisplay;
  size?: "sm" | "md" | "lg";
}) {
  const showCompare = compareAt != null && compareAt > price;
  const label = savingsLabel(price, compareAt, savings);
  const priceSize = { sm: "text-sm", md: "text-base", lg: "text-3xl md:text-4xl" }[size];

  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <span className={`${priceSize} font-medium tracking-tight text-charcoal`}>
        <span className="sr-only">Price: </span>
        {formatMoney(price)}
      </span>
      {showCompare && (
        <s className={`${size === "lg" ? "text-lg" : "text-sm"} text-stone`}>
          <span className="sr-only">Regular price: </span>
          {formatMoney(compareAt)}
        </s>
      )}
      {label && (
        <span className="eyebrow rounded-full bg-sand/25 px-3 py-1 text-[0.625rem] text-sand-deep">{label}</span>
      )}
    </div>
  );
}
