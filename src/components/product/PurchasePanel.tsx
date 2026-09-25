"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { policies } from "@/config/policies";
import { site } from "@/config/site";
import { compareAt, includedPieces, isPurchasable, type Product } from "@/config/products";
import { toAnalyticsItem, useStore } from "@/lib/commerce/cart";
import { track } from "@/lib/analytics";
import { formatMoney } from "@/lib/commerce/money";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { ProductPrice } from "@/components/ui/Price";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { PaymentMethods, StorePromises } from "./Assurances";

/** Tier picker: e.g. System / Kit / Mask. Radio-group semantics. */
function OfferSelector({ offers, value, onChange }: { offers: Product[]; value: string; onChange: (id: string) => void }) {
  const name = useId();
  return (
    <fieldset>
      <legend className="eyebrow mb-3 text-stone">Choose your set</legend>
      <div className="space-y-2.5">
        {offers.map((o) => {
          const pieces = includedPieces(o).length;
          const compare = compareAt(o);
          return (
            <label
              key={o.id}
              className="relative flex cursor-pointer items-center gap-4 rounded-2xl border border-charcoal/15 bg-ivory p-4 transition-colors has-[:checked]:border-charcoal has-[:checked]:bg-linen has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-sand-deep"
            >
              <input
                type="radio"
                name={name}
                value={o.id}
                checked={o.id === value}
                onChange={() => onChange(o.id)}
                disabled={!isPurchasable(o)}
                className="peer sr-only"
              />
              <span
                aria-hidden="true"
                className="grid size-5 shrink-0 place-items-center rounded-full border border-charcoal/30 peer-checked:border-charcoal peer-checked:[&>span]:scale-100"
              >
                <span className="size-2.5 scale-0 rounded-full bg-charcoal transition-transform" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="text-sm font-semibold">{o.name}</span>
                  {o.badge && (
                    <span className="eyebrow rounded-full bg-charcoal px-2 py-0.5 text-[0.5625rem] text-ivory">{o.badge}</span>
                  )}
                </span>
                <span className="mt-0.5 block text-xs text-stone">
                  {pieces ? `${pieces} pieces` : "Single piece"}
                  {!isPurchasable(o) && " · Sold out"}
                </span>
              </span>
              <span className="text-right">
                <span className="block text-sm font-medium">{formatMoney(o.price)}</span>
                {compare && <s className="block text-xs text-stone">{formatMoney(compare.amount)}</s>}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export function PurchasePanel({
  offers,
  initialId,
  onSelect,
  headingLevel = "h2",
  headingId,
  buyActionsId,
}: {
  /** One product = plain buy box. Several = tier selector. */
  offers: Product[];
  initialId?: string;
  onSelect?: (p: Product) => void;
  headingLevel?: "h1" | "h2";
  headingId?: string;
  /** id on the Add to Cart row, so a sticky bar can hide while it's visible. */
  buyActionsId?: string;
}) {
  const router = useRouter();
  const { addItem } = useStore();
  const [selectedId, setSelectedId] = useState(initialId ?? offers[0].id);
  const [quantity, setQuantity] = useState(1);
  const product = offers.find((o) => o.id === selectedId) ?? offers[0];
  const pieces = includedPieces(product);
  const Heading = headingLevel;
  const available = isPurchasable(product);

  // ViewContent fires once the buy box is actually on screen, and again when
  // the shopper switches to a different set.
  const rootRef = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = rootRef.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);
  useEffect(() => {
    if (seen) track({ name: "ViewContent", item: toAnalyticsItem(product) });
  }, [seen, product]);

  const select = (id: string) => {
    setSelectedId(id);
    const next = offers.find((o) => o.id === id);
    if (next) onSelect?.(next);
  };

  const buyNow = () => {
    addItem(product, { quantity, openCart: false });
    router.push("/checkout");
  };

  const accordion = [
    {
      q: pieces.length ? "What's included" : "Details",
      a: pieces.length ? (
        <ul className="space-y-1.5">
          {pieces.map((p) => (
            <li key={p.id} className="flex gap-3">
              <span className="eyebrow w-6 pt-0.5 text-sand-deep">{p.index}</span>
              <span>
                <span className="font-medium text-charcoal">{p.name}</span> — {p.tagline}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <dl className="space-y-1.5">
          {product.details.map((d) => (
            <div key={d.label} className="flex gap-3">
              <dt className="w-24 shrink-0 font-medium text-charcoal">{d.label}</dt>
              <dd>{d.value}</dd>
            </div>
          ))}
        </dl>
      ),
    },
    { q: "Shipping", a: policies.shipping.join(" ") },
    { q: "Returns", a: policies.returns.join(" ") },
    { q: "Care instructions", a: policies.care.join(" ") },
  ];

  return (
    <div ref={rootRef}>
      <p className="eyebrow text-sand-deep">
        {pieces.length ? `${pieces.length} pieces` : product.index ? `Piece ${product.index} of the system` : "Accessory"}
      </p>
      <Heading id={headingId} className="font-display mt-3 text-[2rem] leading-[1.05] md:text-5xl">
        {product.name}
      </Heading>
      <div className="mt-5">
        <ProductPrice product={product} size="lg" />
      </div>
      <p className="mt-5 text-base leading-relaxed text-stone">{product.tagline}</p>

      <div className="mt-8 space-y-6 border-t border-charcoal/10 pt-8">
        {offers.length > 1 && <OfferSelector offers={offers} value={product.id} onChange={select} />}

        <div id={buyActionsId} className="flex gap-3">
          <QuantitySelector value={quantity} onChange={setQuantity} label="Quantity" />
          <Button
            size="lg"
            className="flex-1"
            disabled={!available}
            onClick={() => {
              addItem(product, { quantity });
              setQuantity(1);
            }}
          >
            {!available ? "Sold Out" : product.stock === "preorder" ? "Pre-order" : product.cta.addToCart}
          </Button>
        </div>
        {available && (
          <Button size="lg" variant="secondary" className="w-full" onClick={buyNow}>
            {product.cta.buyNow}
          </Button>
        )}

        <p className="text-center text-xs text-stone">{site.shipping.summary}</p>
        <PaymentMethods />
        <StorePromises />
      </div>

      <div className="mt-8">
        <Accordion items={accordion} size="sm" />
      </div>
    </div>
  );
}
