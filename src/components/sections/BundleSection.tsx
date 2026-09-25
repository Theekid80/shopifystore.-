"use client";

import Image from "next/image";
import { useState } from "react";
import { site } from "@/config/site";
import type { ImageAsset } from "@/config/images";
import { bundle, bundleCompareAtPrice, bundleItems, bundleItemsTotal } from "@/data/products";
import { useStore } from "@/lib/commerce/cart";
import { Button } from "@/components/ui/Button";
import { Price } from "@/components/ui/Price";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { Reveal } from "@/components/ui/Reveal";
import { VariantSelector } from "@/components/ui/VariantSelector";
import { WishlistButton } from "@/components/ui/WishlistButton";
import { CheckIcon } from "@/components/ui/Icons";


function Gallery({ activeVariantImage }: { activeVariantImage?: ImageAsset }) {
  const gallery = activeVariantImage
    ? [activeVariantImage, ...bundle.gallery.filter((g) => g.src !== activeVariantImage.src)]
    : bundle.gallery;
  const [index, setIndex] = useState(0);
  const active = gallery[Math.min(index, gallery.length - 1)];

  return (
    <div className="lg:sticky lg:top-28">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-linen">
        <Image
          key={active.src}
          src={active.src}
          alt={active.alt}
          fill
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="animate-rise object-cover [animation-duration:600ms]"
        />
        <WishlistButton productId={bundle.id} name={bundle.name} className="absolute right-4 top-4" />
      </div>
      <div role="group" aria-label="Product images" className="no-scrollbar -mx-1 mt-3 flex gap-3 overflow-x-auto p-1">
        {gallery.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show image ${i + 1} of ${gallery.length}: ${img.alt}`}
            aria-current={i === index}
            className={`relative aspect-square w-20 shrink-0 overflow-hidden rounded-xl bg-linen transition-opacity md:w-24 ${
              i === index ? "ring-2 ring-charcoal ring-offset-2 ring-offset-ivory" : "opacity-60 hover:opacity-100"
            }`}
          >
            <Image src={img.src} alt="" fill sizes="96px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

export function BundleSection() {
  const { addItem } = useStore();
  const [variantId, setVariantId] = useState(bundle.variants[0].id);
  const [quantity, setQuantity] = useState(1);
  const variant = bundle.variants.find((v) => v.id === variantId) ?? bundle.variants[0];
  const promises = site.storePromises.filter((p) => p.enabled);

  return (
    <section id="system" aria-labelledby="system-title" className="bg-ivory py-24 md:py-36">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-start gap-12 px-4 md:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12">
        <Reveal className="lg:col-span-7">
          {/* Keyed so the gallery resets to the chosen colorway's image. */}
          <Gallery key={variant.id} activeVariantImage={variant.image} />
        </Reveal>

        <Reveal delay={100} className="lg:col-span-5">
          <p className="eyebrow text-sand-deep">{bundle.eyebrow}</p>
          <h2 id="system-title" className="mt-5 text-4xl font-medium uppercase leading-[1.02] tracking-[-0.03em] md:text-5xl">
            {bundle.name}
          </h2>
          <div className="mt-6">
            <Price
              price={bundle.pricing.price}
              compareAt={bundleCompareAtPrice}
              savings={bundle.pricing.savingsDisplay}
              size="lg"
              compareLabel={bundleCompareAtPrice === bundleItemsTotal ? "if bought separately" : undefined}
            />
          </div>
          <p className="mt-6 text-base leading-relaxed text-stone">{bundle.description}</p>

          <div className="mt-8 space-y-8 border-t border-charcoal/10 pt-8">
            <VariantSelector variants={bundle.variants} value={variantId} onChange={setVariantId} name="system-colorway" />

            <div className="flex gap-3">
              <QuantitySelector value={quantity} onChange={setQuantity} label="Quantity" />
              <Button
                size="lg"
                className="flex-1"
                onClick={() => {
                  addItem(bundle.id, variant.id, quantity);
                  setQuantity(1);
                }}
                disabled={!variant.available}
              >
                {variant.available ? "Add to Cart" : "Sold Out"}
              </Button>
            </div>

            {promises.length > 0 && (
              <ul className="grid grid-cols-3 gap-2 text-center">
                {promises.map((p) => (
                  <li key={p.id} className="flex flex-col items-center gap-2 rounded-2xl bg-linen px-2 py-4">
                    <CheckIcon size={16} className="text-sand-deep" />
                    <span className="text-[0.625rem] font-semibold uppercase leading-tight tracking-[0.16em] text-charcoal">
                      {p.label}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-10">
            <h3 className="eyebrow text-stone">What&apos;s included</h3>
            <ul className="mt-4 divide-y divide-charcoal/10">
              {bundleItems.map((p) => (
                <li key={p.id} className="flex items-center gap-4 py-3">
                  <span className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-linen">
                    <Image src={p.image.src} alt="" fill sizes="48px" className="object-cover" />
                  </span>
                  <span className="flex-1 text-sm font-medium">{p.name}</span>
                  <span className="eyebrow text-stone">{p.index}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
