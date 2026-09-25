"use client";

import { useState } from "react";
import type { ImageAsset } from "@/config/images";
import { SiteImage } from "@/components/ui/SiteImage";

export function ProductGallery({ images, priority = false }: { images: ImageAsset[]; priority?: boolean }) {
  const [index, setIndex] = useState(0);
  const active = images[Math.min(index, images.length - 1)];

  return (
    <div>
      <div className="relative aspect-[8/7] overflow-hidden rounded-[1.75rem] bg-linen">
        <SiteImage
          key={active.src}
          image={active}
          fill
          preload={priority && index === 0}
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="animate-rise object-cover [animation-duration:600ms]"
        />
      </div>
      {images.length > 1 && (
        <div role="group" aria-label="Product images" className="no-scrollbar -mx-1 mt-3 flex gap-3 overflow-x-auto p-1">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show image ${i + 1} of ${images.length}: ${img.alt}`}
              aria-current={i === index}
              className={`relative aspect-square w-16 shrink-0 overflow-hidden rounded-xl bg-linen transition-opacity md:w-20 ${
                i === index ? "ring-2 ring-charcoal ring-offset-2 ring-offset-ivory" : "opacity-60 hover:opacity-100"
              }`}
            >
              <SiteImage image={img} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
