import { compareAt, type Product } from "@/config/products";
import { formatMoney, savingsLabel } from "@/lib/commerce/money";

/** Price with the configured crossed-out price and savings badge. */
export function ProductPrice({ product, size = "md", showSavings = true }: { product: Product; size?: "sm" | "md" | "lg"; showSavings?: boolean }) {
  const compare = compareAt(product);
  const badge = showSavings ? savingsLabel(product.price, compare?.amount, product.savingsDisplay) : null;
  const priceSize = { sm: "text-sm", md: "text-lg", lg: "text-3xl md:text-4xl" }[size];

  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <span className={`${priceSize} font-medium tracking-tight text-charcoal`}>
        <span className="sr-only">Price: </span>
        {formatMoney(product.price)}
      </span>
      {compare && (
        <span className={`${size === "lg" ? "text-base" : "text-sm"} text-stone`}>
          <s>
            <span className="sr-only">{compare.label ? "Price" : "Regular price"}: </span>
            {formatMoney(compare.amount)}
          </s>
          {compare.label && size !== "sm" && <span className="ml-1.5 text-xs">{compare.label}</span>}
        </span>
      )}
      {badge && <span className="eyebrow rounded-full bg-sand/25 px-3 py-1 text-[0.625rem] text-sand-deep">{badge}</span>}
    </div>
  );
}
