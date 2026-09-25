import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { PurchaseComplete } from "@/components/checkout/PurchaseComplete";

export const metadata: Metadata = { title: "Thank you", robots: { index: false } };

type StripeSession = {
  id: string;
  payment_status?: string;
  amount_total?: number;
  customer_details?: { email?: string };
  line_items?: { data: { description: string; quantity: number; amount_total: number; price?: { unit_amount?: number } }[] };
};

/** Looks the Stripe session up server-side so the confirmation can't be faked by URL. */
async function getPaidStripeSession(id: string): Promise<StripeSession | null> {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || !/^cs_[A-Za-z0-9_]+$/.test(id)) return null;
  const res = await fetch(`https://api.stripe.com/v1/checkout/sessions/${id}?expand[]=line_items`, {
    headers: { Authorization: `Bearer ${key}` },
    cache: "no-store",
  });
  if (!res.ok) return null;
  const session = (await res.json()) as StripeSession;
  return session.payment_status === "paid" ? session : null;
}

/**
 * Stripe returns shoppers here after paying. (Shopify's hosted checkout
 * shows its own order-status page instead — see README for Shopify tracking.)
 */
export default async function CheckoutSuccessPage({ searchParams }: PageProps<"/checkout/success">) {
  const { session_id } = await searchParams;
  const session = typeof session_id === "string" ? await getPaidStripeSession(session_id) : null;

  return (
    <section className="mx-auto flex min-h-[70svh] max-w-2xl flex-col items-center justify-center px-4 pb-24 pt-36 text-center">
      {session ? (
        <>
          <PurchaseComplete
            orderId={session.id}
            value={(session.amount_total ?? 0) / 100}
            items={(session.line_items?.data ?? []).map((li) => ({
              id: li.description,
              name: li.description,
              price: (li.price?.unit_amount ?? 0) / 100,
              quantity: li.quantity,
            }))}
          />
          <p className="eyebrow text-sand-deep">Order confirmed</p>
          <h1 className="font-display text-headline mt-5">Thank you.</h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-stone">
            Your order is confirmed{session.customer_details?.email ? ` and a receipt is on its way to ${session.customer_details.email}` : ""}. We&apos;ll email tracking details as soon as it ships.
          </p>
        </>
      ) : (
        <>
          <p className="eyebrow text-sand-deep">Checkout</p>
          <h1 className="font-display text-headline mt-5">We couldn&apos;t find that order.</h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-stone">
            If you completed a payment, you&apos;ll receive a confirmation email shortly. Otherwise, your bag is still saved.
          </p>
        </>
      )}
      <ButtonLink href="/" variant="secondary" className="mt-10">
        Back to home
      </ButtonLink>
    </section>
  );
}
