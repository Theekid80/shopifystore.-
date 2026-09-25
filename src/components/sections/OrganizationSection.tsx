"use client";

import Image from "next/image";
import { useState } from "react";
import { images } from "@/config/images";
import { organizationItems } from "@/data/content";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckIcon } from "@/components/ui/Icons";

/** Before/after comparison: drag (or use arrow keys on) the handle. */
function BeforeAfter() {
  const [pos, setPos] = useState(50);
  return (
    <div className="relative aspect-[4/3] select-none overflow-hidden rounded-[1.75rem] bg-linen md:aspect-[10/7]">
      <Image
        src={images.suitcaseAfter.src}
        alt={images.suitcaseAfter.alt}
        fill
        sizes="(min-width: 1024px) 55vw, 100vw"
        className="object-cover"
      />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image
          src={images.suitcaseBefore.src}
          alt={images.suitcaseBefore.alt}
          fill
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="object-cover"
        />
      </div>

      <span className="eyebrow pointer-events-none absolute left-4 top-4 rounded-full bg-ivory/85 px-3 py-1.5 text-charcoal backdrop-blur">
        Before
      </span>
      <span className="eyebrow pointer-events-none absolute right-4 top-4 rounded-full bg-charcoal/85 px-3 py-1.5 text-ivory backdrop-blur">
        With Velara
      </span>

      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-px bg-ivory" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 left-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ivory text-charcoal shadow-lg">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
          </svg>
        </div>
      </div>

      <label htmlFor="before-after" className="sr-only">
        Compare packing before and after Velara organizers
      </label>
      <input
        id="before-after"
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-valuetext={`${pos}% before`}
        className="absolute inset-0 size-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}

export function OrganizationSection() {
  return (
    <section id="organize" aria-labelledby="organize-title" className="py-24 md:py-36">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-14 px-4 md:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12">
        <div className="lg:col-span-5">
          <SectionHeading
            id="organize-title"
            eyebrow="Organization"
            title={
              <>
                Pack smart.
                <br />
                Travel light.
              </>
            }
            body="Everything has its place, so you can spend less time searching and more time enjoying the journey."
          />
          <Reveal delay={120}>
            <ul className="mt-10 divide-y divide-charcoal/10 border-y border-charcoal/10">
              {organizationItems.map((item) => (
                <li key={item} className="flex items-center gap-4 py-4 text-sm font-medium">
                  <span className="grid size-6 place-items-center rounded-full bg-sand/30 text-sand-deep">
                    <CheckIcon size={13} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <ButtonLink href="/#system" arrow className="mt-10">
              Shop the System
            </ButtonLink>
          </Reveal>
        </div>
        <Reveal delay={80} className="lg:col-span-7">
          <BeforeAfter />
          <p className="mt-4 text-center text-xs text-stone">Drag to compare</p>
        </Reveal>
      </div>
    </section>
  );
}
