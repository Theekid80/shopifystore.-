import { images } from "@/config/images";
import { site } from "@/config/site";
import { bundle } from "@/data/products";
import { Hero } from "@/components/sections/Hero";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { FeaturedProduct } from "@/components/sections/FeaturedProduct";
import { LifestyleSection } from "@/components/sections/LifestyleSection";
import { OrganizationSection } from "@/components/sections/OrganizationSection";
import { BundleSection } from "@/components/sections/BundleSection";
import { WhyVelara } from "@/components/sections/WhyVelara";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { Newsletter } from "@/components/sections/Newsletter";

/** Product structured data — deliberately no ratings/reviews until real ones exist. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: site.name,
      url: site.url,
      slogan: site.tagline,
      logo: new URL(images.ogImage.src, site.url).toString(),
    },
    {
      "@type": "Product",
      name: bundle.name,
      description: bundle.description,
      brand: { "@type": "Brand", name: site.name },
      image: bundle.gallery.map((g) => new URL(g.src, site.url).toString()),
      sku: bundle.handle,
      offers: {
        "@type": "Offer",
        url: `${site.url}/#system`,
        priceCurrency: site.currency,
        price: bundle.pricing.price.toFixed(2),
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <ProductShowcase />
      <FeaturedProduct />
      <LifestyleSection />
      <OrganizationSection />
      <BundleSection />
      <WhyVelara />
      <Testimonials />
      <FAQ />
      <Newsletter />
    </>
  );
}
