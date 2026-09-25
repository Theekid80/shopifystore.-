import { site } from "@/config/site";
import { CheckIcon } from "@/components/ui/Icons";

/** Store promises (free shipping, returns, secure checkout) — from src/config/site.ts. */
export function StorePromises({ compact = false }: { compact?: boolean }) {
  const promises = site.storePromises.filter((p) => p.enabled);
  if (!promises.length) return null;
  if (compact) {
    return (
      <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-stone">
        {promises.map((p) => (
          <li key={p.id} className="whitespace-nowrap">
            {p.label}
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ul className="grid grid-cols-3 gap-2 text-center">
      {promises.map((p) => (
        <li key={p.id} className="flex flex-col items-center gap-2 rounded-2xl bg-linen px-2 py-4">
          <CheckIcon size={16} className="text-sand-deep" />
          <span className="text-[0.625rem] font-semibold uppercase leading-tight tracking-[0.14em] text-charcoal">{p.label}</span>
        </li>
      ))}
    </ul>
  );
}

/** Accepted payment methods as quiet text chips (no borrowed logos). */
export function PaymentMethods() {
  if (!site.paymentMethods.length) return null;
  return (
    <div>
      <p className="sr-only">Accepted payment methods:</p>
      <ul className="flex flex-wrap justify-center gap-1.5" aria-label="Accepted payment methods">
        {site.paymentMethods.map((m) => (
          <li key={m} className="rounded-md border border-charcoal/12 px-2 py-1 text-[0.625rem] font-medium tracking-wide text-stone">
            {m}
          </li>
        ))}
      </ul>
    </div>
  );
}
