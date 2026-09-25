import { site } from "@/config/site";
import type { SavingsDisplay } from "@/data/products";

const formatter = new Intl.NumberFormat(site.locale, {
  style: "currency",
  currency: site.currency,
});

export const formatMoney = (amount: number) => formatter.format(amount);

/** Returns e.g. "Save 33%" / "Save $40.00", or null when hidden or not a discount. */
export function savingsLabel(price: number, compareAt: number | null, mode: SavingsDisplay): string | null {
  if (mode === "none" || compareAt == null || compareAt <= price) return null;
  if (mode === "percent") return `Save ${Math.round(((compareAt - price) / compareAt) * 100)}%`;
  return `Save ${formatMoney(compareAt - price)}`;
}
