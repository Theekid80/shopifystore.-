import Link from "next/link";
import { productImages as img } from "@/config/images";
import { hero } from "@/config/content";
import { compareAt, systemPieces, VELARA_TRAVEL_SLEEP_SYSTEM as SYSTEM } from "@/config/products";
import { formatMoney } from "@/lib/commerce/money";
import { ButtonLink } from "@/components/ui/Button";
import { SiteImage } from "@/components/ui/SiteImage";
import { ArrowRightIcon } from "@/components/ui/Icons";

export function Hero() {
  const compare = compareAt(SYSTEM);
  return (
    <section aria-labelledby="hero-title" className="on-dark relative isolate flex min-h-[92svh] flex-col overflow-hidden bg-ink text-ivory md:min-h-[100svh]">
      <SiteImage
        image={img.hero}
        fill
        preload
        sizes="100vw"
        tagPosition="top-left"
        className="animate-settle -z-20 object-cover object-[65%_center]"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/55 to-ink/35" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/75 via-ink/25 to-transparent" />

      <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-end px-4 pb-10 pt-36 md:px-8 md:pb-14 lg:px-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="eyebrow animate-rise text-sand">{hero.eyebrow}</p>
            <h1 id="hero-title" className="font-display text-display animate-rise mt-5 [animation-delay:120ms]">
              {hero.headline[0]}
              <br />
              <span className="text-ivory/80">{hero.headline[1]}</span>
            </h1>
            <p className="animate-rise mt-6 max-w-md text-base leading-relaxed text-ivory/80 [animation-delay:240ms] md:text-lg">
              {hero.subheadline}
            </p>
            <div className="animate-rise mt-8 flex flex-col gap-3 [animation-delay:360ms] sm:flex-row sm:items-center">
              <ButtonLink href={hero.primaryCta.href} variant="light" size="lg" arrow>
                {hero.primaryCta.label}
              </ButtonLink>
              <ButtonLink href={hero.secondaryCta.href} variant="ghost-light" size="lg">
                {hero.secondaryCta.label}
              </ButtonLink>
            </div>
            <p className="animate-rise mt-5 text-sm text-ivory/75 [animation-delay:420ms] lg:hidden">
              {SYSTEM.name} · {systemPieces.length} pieces ·{" "}
              <span className="font-semibold text-ivory">{formatMoney(SYSTEM.price)}</span>
            </p>
          </div>

          {/* Subtle bundle card (desktop). */}
          <Link
            href="/#offer"
            className="group animate-rise hidden w-80 shrink-0 items-center gap-4 rounded-2xl border border-white/15 bg-white/[0.07] p-3 pr-5 backdrop-blur-md transition-colors [animation-delay:520ms] hover:bg-white/[0.12] lg:flex"
          >
            <span className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-linen">
              <SiteImage image={img.bundle} alt="" fill sizes="80px" className="object-cover" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="eyebrow block text-[0.625rem] text-sand">{systemPieces.length} essentials</span>
              <span className="mt-1 block text-sm font-semibold leading-snug">{SYSTEM.name}</span>
              <span className="mt-1 block text-sm">
                {formatMoney(SYSTEM.price)}
                {compare && <s className="ml-2 text-xs text-ivory/60">{formatMoney(compare.amount)}</s>}
              </span>
            </span>
            <ArrowRightIcon size={16} className="text-ivory/70 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
