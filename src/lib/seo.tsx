import { productImages } from "@/config/images";
import { site } from "@/config/site";
import { compareAt, productHref, type Product } from "@/config/products";

const abs = (path: string) => new URL(path, site.url).toString();

const availability: Record<Product["stock"], string> = {
  in_stock: "https://schema.org/InStock",
  low_stock: "https://schema.org/LimitedAvailability",
  out_of_stock: "https://schema.org/OutOfStock",
  preorder: "https://schema.org/PreOrder",
};

/** Product structured data. Deliberately no ratings/reviews until real ones exist. */
export function productJsonLd(p: Product) {
  const compare = compareAt(p);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    sku: p.sku,
    brand: { "@type": "Brand", name: site.name },
    image: p.images.map((i) => abs(i.src)),
    url: abs(productHref(p)),
    offers: {
      "@type": "Offer",
      url: abs(productHref(p)),
      priceCurrency: site.currency,
      price: p.price.toFixed(2),
      availability: availability[p.stock],
      itemCondition: "https://schema.org/NewCondition",
      ...(compare && typeof p.compareAtPrice === "number"
        ? { priceSpecification: { "@type": "UnitPriceSpecification", priceType: "https://schema.org/ListPrice", price: compare.amount.toFixed(2), priceCurrency: site.currency } }
        : {}),
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    slogan: site.tagline,
    logo: abs(productImages.ogImage.src),
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // Escape "<" so no string in the data can close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
