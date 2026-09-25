"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { images } from "@/config/images";
import { maskFeatures } from "@/data/content";
import { bundle, bundleItems, getProduct } from "@/data/products";
import { useStore } from "@/lib/commerce/cart";
import { formatMoney } from "@/lib/commerce/money";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VariantSelector } from "@/components/ui/VariantSelector";
import { CircleIcon, LayersIcon, MoonIcon, PlaneIcon } from "@/components/ui/Icons";

const featureIcons = [MoonIcon, LayersIcon, CircleIcon, PlaneIcon];
const mask = getProduct("sleep-mask")!;

export function FeaturedProduct() {
  const { addItem } = useStore();
  const [variantId, setVariantId] = useState(mask.variants[0].id);
  const variant = mask.variants.find((v) => v.id === variantId) ?? mask.variants[0];
  const image = variant.image ?? mask.image;

  return (
    <section id="mask" aria-labelledby="mask-title" className="bg-linen py-24 md:py-36">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-14 px-4 md:px-8 lg:grid-cols-2 lg:gap-20 lg:px-12">
        <Reveal className="relative">
          <div className="relative aspect-square overflow-hidden rounded-[1.75rem] bg-mist">
            {/* Keyed so each colorway fades in. */}
            <Image
              key={image.src}
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="animate-rise object-cover [animation-duration:700ms]"
            />
          </div>
          <div className="absolute -bottom-6 right-6 hidden aspect-square w-40 overflow-hidden rounded-2xl border-4 border-linen bg-mist shadow-xl md:block lg:-right-6">
            <Image src={images.sleepMaskDetail.src} alt={images.sleepMaskDetail.alt} fill sizes="160px" className="object-cover" />
          </div>
        </Reveal>

        <div>
          <SectionHeading
            id="mask-title"
            eyebrow="The Hero Piece · 01"
            title="The mask you'll pack every time."
            body="Designed to block out distractions and create a more comfortable environment for rest."
          />

          <ul className="mt-12 grid grid-cols-2 gap-3 md:gap-4">
            {maskFeatures.map((f, i) => {
              const Icon = featureIcons[i % featureIcons.length];
              return (
                <Reveal as="li" key={f.title} delay={i * 80} className="rounded-2xl bg-ivory p-5 md:p-6">
                  <Icon size={22} className="text-sand-deep" />
                  <h3 className="eyebrow mt-6 text-charcoal">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone">{f.body}</p>
                </Reveal>
              );
            })}
          </ul>

          <Reveal delay={200} className="mt-10 space-y-8">
            <VariantSelector variants={mask.variants} value={variantId} onChange={setVariantId} name="mask-colorway" />
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button size="lg" arrow onClick={() => addItem(mask.id, variant.id)}>
                Add Mask to Cart · {formatMoney(mask.price)}
              </Button>
              <Link href="/#system" className="text-sm text-stone underline-offset-4 hover:text-charcoal hover:underline">
                Or get all {bundleItems.length} pieces for {formatMoney(bundle.pricing.price)} →
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
