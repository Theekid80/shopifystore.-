"use client";

import { useState } from "react";
import { offers, VELARA_TRAVEL_SLEEP_SYSTEM as SYSTEM, type Product } from "@/config/products";
import { ProductGallery } from "@/components/product/ProductGallery";
import { PurchasePanel } from "@/components/product/PurchasePanel";
import { Reveal } from "@/components/ui/Reveal";

/** The main conversion module: gallery + tier selector + buy box (sticky on desktop). */
export function OfferSection() {
  const [selected, setSelected] = useState<Product>(SYSTEM);

  return (
    <section id="offer" aria-labelledby="offer-title" className="bg-ivory py-24 md:py-32">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-start gap-12 px-4 md:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12">
        <Reveal className="lg:sticky lg:top-28 lg:col-span-7">
          <ProductGallery key={selected.id} images={selected.images} />
        </Reveal>
        <div className="lg:col-span-5">
          <PurchasePanel offers={offers} initialId={SYSTEM.id} onSelect={setSelected} headingId="offer-title" />
        </div>
      </div>
    </section>
  );
}
