import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { productImages as img } from "@/config/images";
import { faq, productDetails } from "@/config/content";
import {
  getProductByHandle,
  includedPieces,
  productHref,
  products,
  validateCatalog,
  VELARA_TRAVEL_SLEEP_SYSTEM as SYSTEM,
  type Product,
} from "@/config/products";
import { formatMoney } from "@/lib/commerce/money";
import { JsonLd, productJsonLd } from "@/lib/seo";
import { PurchasePanel } from "@/components/product/PurchasePanel";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductCard } from "@/components/product/ProductCard";
import { StickyBuyBar } from "@/components/cart/StickyBuyBar";
import { ButtonLink } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { SiteImage } from "@/components/ui/SiteImage";

export const dynamicParams = false;

export function generateStaticParams() {
  // Fail the build loudly if the catalog is misconfigured.
  const errors = validateCatalog();
  if (errors.length) throw new Error(`Product catalog errors:\n- ${errors.join("\n- ")}`);
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: PageProps<"/products/[handle]">): Promise<Metadata> {
  const { handle } = await params;
  const p = getProductByHandle(handle);
  if (!p) return {};
  const image = p.images[0];
  return {
    title: p.name,
    description: p.description,
    alternates: { canonical: productHref(p) },
    openGraph: {
      type: "website",
      title: p.name,
      description: p.description,
      url: productHref(p),
      images: [{ url: image.src, width: image.width, height: image.height, alt: image.alt }],
    },
  };
}

function related(p: Product): Product[] {
  if (p.kind === "system") return includedPieces(p).slice(0, 3);
  const others = products.filter((x) => x.id !== p.id && x.id !== SYSTEM.id);
  return [SYSTEM, ...others].slice(0, 3);
}

export default async function ProductPage({ params }: PageProps<"/products/[handle]">) {
  const { handle } = await params;
  const product = getProductByHandle(handle);
  if (!product) notFound();

  const pieces = includedPieces(product);
  const inSystem = product.kind === "piece" && SYSTEM.includes?.includes(product.id);

  return (
    <>
      <JsonLd data={productJsonLd(product)} />

      <div className="mx-auto max-w-[1440px] px-4 pb-20 pt-32 md:px-8 md:pt-40 lg:px-12">
        <nav aria-label="Breadcrumb" className="mb-8 text-xs text-stone">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-charcoal">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/shop" className="hover:text-charcoal">
                Shop
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-charcoal">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:col-span-7">
            <ProductGallery images={product.images} priority />
          </div>
          <div id="buy" className="lg:col-span-5">
            <PurchasePanel offers={[product]} headingLevel="h1" buyActionsId="buy-actions" />
            <p className="mt-6 text-sm leading-relaxed text-stone">{product.description}</p>
            {product.details.length > 0 && (
              <dl className="mt-6 divide-y divide-charcoal/10 border-y border-charcoal/10 text-sm">
                {product.details.map((d) => (
                  <div key={d.label} className="flex justify-between gap-6 py-3">
                    <dt className="text-stone">{d.label}</dt>
                    <dd className="text-right font-medium">{d.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>
      </div>

      {/* What's included (sets) or the system upsell (single pieces). */}
      {pieces.length > 0 ? (
        <section aria-labelledby="included-title" className="bg-linen py-20 md:py-28">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-12">
            <p className="eyebrow text-sand-deep">What&apos;s included</p>
            <h2 id="included-title" className="font-display text-headline mt-4">
              {pieces.length} essentials, one set.
            </h2>
            <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-6">
              {pieces.map((p) => (
                <li key={p.id}>
                  <Link href={productHref(p)} className="group block">
                    <span className="relative block aspect-square overflow-hidden rounded-2xl bg-ivory">
                      <SiteImage image={p.images[0]} alt="" fill sizes="(min-width: 1024px) 16vw, 45vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                    </span>
                    <span className="eyebrow mt-4 block text-sand-deep">{p.index}</span>
                    <span className="mt-1 block text-sm font-semibold">{p.name}</span>
                    <span className="mt-1 block text-xs leading-relaxed text-stone">{p.tagline}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : inSystem ? (
        <section aria-labelledby="system-upsell-title" className="bg-linen py-20 md:py-24">
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-10 px-4 md:grid-cols-2 md:px-8 lg:px-12">
            <div className="relative aspect-[8/7] overflow-hidden rounded-[1.5rem] bg-ivory">
              <SiteImage image={img.bundle} fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
            </div>
            <div>
              <p className="eyebrow text-sand-deep">Part of the system</p>
              <h2 id="system-upsell-title" className="font-display text-headline mt-4">
                Better together.
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-stone">
                {product.name} is one of {includedPieces(SYSTEM).length} pieces in the {SYSTEM.name} — all{" "}
                {includedPieces(SYSTEM).length} for {formatMoney(SYSTEM.price)}.
              </p>
              <ButtonLink href={productHref(SYSTEM)} arrow className="mt-8">
                View the System
              </ButtonLink>
            </div>
          </div>
        </section>
      ) : null}

      {/* Lifestyle */}
      <section aria-label="In use" className="py-20 md:py-28">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-4 px-4 md:grid-cols-2 md:gap-5 md:px-8 lg:px-12">
          {[
            { image: img.airplane, title: "In the air", body: "Long flights and early departures, on your terms." },
            { image: img.hotel, title: "At the hotel", body: "Arrive, unpack and reset — everything in its place." },
          ].map((item) => (
            <Reveal key={item.title} className="on-dark relative isolate aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-ink text-ivory">
              <SiteImage image={item.image} fill sizes="(min-width: 768px) 50vw, 100vw" tagPosition="top-left" className="-z-10 object-cover" />
              <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <h2 className="font-display text-3xl md:text-4xl">{item.title}</h2>
                <p className="mt-2 text-sm text-ivory/80">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Details / FAQ */}
      <section aria-labelledby="pdp-faq-title" className="bg-linen py-20 md:py-28">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-4 md:px-8 lg:grid-cols-12 lg:px-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-sand-deep">FAQ</p>
            <h2 id="pdp-faq-title" className="font-display text-headline mt-4">
              Good to know.
            </h2>
          </div>
          <div className="lg:col-span-8">
            <Accordion items={product.kind === "system" ? productDetails : faq} />
          </div>
        </div>
      </section>

      {/* Related */}
      <section aria-labelledby="related-title" className="py-20 md:py-28">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-12">
          <h2 id="related-title" className="font-display text-headline">
            {product.kind === "system" ? "Also sold individually." : "You may also like."}
          </h2>
          <ul className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related(product).map((p) => (
              <li key={p.id}>
                <ProductCard product={p} showIndex={false} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <StickyBuyBar product={product} buyBoxId="buy-actions" immediate />
    </>
  );
}
