import type { Metadata } from "next";
import { CheckoutView } from "@/components/checkout/CheckoutView";

export const metadata: Metadata = { title: "Checkout", robots: { index: false } };

export default function CheckoutPage() {
  return (
    <section aria-labelledby="checkout-title" className="mx-auto max-w-[1200px] px-4 pb-28 pt-32 md:px-8 md:pt-40">
      <p className="eyebrow text-sand-deep">Checkout</p>
      <h1 id="checkout-title" className="font-display text-headline mb-12 mt-4">
        Review your bag.
      </h1>
      <CheckoutView />
    </section>
  );
}
