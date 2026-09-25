import { site } from "@/config/site";
import { faq, productDetails } from "@/config/content";
import { VELARA_TRAVEL_SLEEP_SYSTEM as SYSTEM } from "@/config/products";
import { organizationJsonLd, productJsonLd, JsonLd } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { BenefitStrip } from "@/components/sections/BenefitStrip";
import { SystemShowcase } from "@/components/sections/SystemShowcase";
import { WhySystem } from "@/components/sections/WhySystem";
import { AirplaneSection } from "@/components/sections/AirplaneSection";
import { HotelSection } from "@/components/sections/HotelSection";
import { WhatsInside } from "@/components/sections/WhatsInside";
import { OfferSection } from "@/components/sections/OfferSection";
import { Comparison } from "@/components/sections/Comparison";
import { LifestyleGrid } from "@/components/sections/LifestyleGrid";
import { FAQ } from "@/components/sections/FAQ";
import { Reviews } from "@/components/sections/Reviews";
import { Newsletter } from "@/components/sections/Newsletter";
import { StickyBuyBar } from "@/components/cart/StickyBuyBar";

/**
 * Home page, ordered for the ad → purchase journey:
 * what is it → why want it → what's included → why different → proof → FAQ → buy.
 */
export default function Home() {
  return (
    <>
      <JsonLd data={[organizationJsonLd(), productJsonLd(SYSTEM)]} />
      <Hero />
      <BenefitStrip />
      <SystemShowcase />
      <WhySystem />
      <AirplaneSection />
      <HotelSection />
      <WhatsInside />
      <OfferSection />
      <Comparison />
      <LifestyleGrid />
      <FAQ id="details" eyebrow="Product details" title="The details." items={productDetails} tone="ivory" />
      <Reviews />
      <Newsletter />
      <FAQ id="faq" eyebrow="FAQ" title="Questions, answered." items={faq} />
      <StickyBuyBar product={SYSTEM} buyBoxId="offer" label={`${site.name} Travel Sleep System`} />
    </>
  );
}
