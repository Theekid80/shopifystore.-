/**
 * ─────────────────────────────────────────────────────────────────────────
 *  IMAGE CONFIGURATION — every image on the site is defined here.
 * ─────────────────────────────────────────────────────────────────────────
 *
 *  To replace an image, either:
 *   1. Drop a new file with the SAME filename into /public/images, or
 *   2. Change `src` below (a local path like "/images/my-photo.jpg", or a
 *      remote URL — remote hosts must also be added to `images.remotePatterns`
 *      in next.config.ts, e.g. cdn.shopify.com).
 *
 *  Keep `width`/`height` roughly in line with the real photo's aspect ratio,
 *  and always write a descriptive `alt` for accessibility and SEO.
 */

export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const images = {
  /* Hero — cinematic, dark. Recommended 2400×1500+, subject on the right. */
  hero: {
    src: "/images/hero-travel.jpg",
    alt: "A traveler resting in a quiet airport lounge at dusk with the Velara sleep mask",
    width: 2400,
    height: 1500,
  },

  /* Full-system flat lay. Recommended 2000×1400, light background. */
  travelSystem: {
    src: "/images/travel-system.jpg",
    alt: "The complete Velara Travel Sleep System laid out on a warm linen surface",
    width: 2000,
    height: 1400,
  },

  /* Featured sleep mask — square studio shots, one per colorway. */
  sleepMask: {
    src: "/images/sleep-mask.jpg",
    alt: "Velara weighted sleep mask in Midnight, photographed on a warm white background",
    width: 1600,
    height: 1600,
  },
  sleepMaskDetail: {
    src: "/images/sleep-mask-detail.jpg",
    alt: "Close-up of the Velara sleep mask's contoured shape and soft finish",
    width: 1600,
    height: 1600,
  },
  sleepMaskStone: {
    src: "/images/sleep-mask-stone.jpg",
    alt: "Velara weighted sleep mask in Stone",
    width: 1600,
    height: 1600,
  },
  sleepMaskSand: {
    src: "/images/sleep-mask-sand.jpg",
    alt: "Velara weighted sleep mask in Sand",
    width: 1600,
    height: 1600,
  },

  /* Individual products — portrait 4:5, recommended 1200×1500. */
  travelPouch: {
    src: "/images/travel-pouch.jpg",
    alt: "Velara travel sleep pouch with a tan zip pull",
    width: 1200,
    height: 1500,
  },
  earplugs: {
    src: "/images/earplugs.jpg",
    alt: "A pair of Velara noise-reducing earplugs",
    width: 1200,
    height: 1500,
  },
  techOrganizer: {
    src: "/images/tech-organizer.jpg",
    alt: "Velara tech organizer holding a charger and coiled cables",
    width: 1200,
    height: 1500,
  },
  packingCubes: {
    src: "/images/packing-cubes.jpg",
    alt: "Velara packing organizer cube in charcoal",
    width: 1200,
    height: 1500,
  },
  toiletryBag: {
    src: "/images/toiletry-bag.jpg",
    alt: "Velara toiletry and overnight pouch with carry loop",
    width: 1200,
    height: 1500,
  },
  luggageTag: {
    src: "/images/luggage-tag.jpg",
    alt: "Velara luggage tag in tan with a black strap",
    width: 1200,
    height: 1500,
  },

  /* Lifestyle — dark, cinematic. */
  airplaneLifestyle: {
    src: "/images/airplane-lifestyle.jpg",
    alt: "A passenger resting on a night flight wearing the Velara sleep mask",
    width: 2400,
    height: 1350,
  },
  flightsLifestyle: {
    src: "/images/flights-lifestyle.jpg",
    alt: "Window seat on a long-haul flight at night",
    width: 1000,
    height: 1250,
  },
  hotelLifestyle: {
    src: "/images/hotel-lifestyle.jpg",
    alt: "A calm hotel room with soft evening light",
    width: 1000,
    height: 1250,
  },
  roadTripLifestyle: {
    src: "/images/road-trip-lifestyle.jpg",
    alt: "The passenger seat of a car on a quiet road trip at dusk",
    width: 1000,
    height: 1250,
  },
  businessLifestyle: {
    src: "/images/business-lifestyle.jpg",
    alt: "A business traveler's carry-on beside an airport window",
    width: 1000,
    height: 1250,
  },

  /* Organization before/after — identical framing, 2000×1400. */
  suitcaseBefore: {
    src: "/images/suitcase-before.jpg",
    alt: "An open suitcase with loose, unorganized travel items",
    width: 2000,
    height: 1400,
  },
  suitcaseAfter: {
    src: "/images/suitcase-after.jpg",
    alt: "The same suitcase neatly organized with Velara packing cubes, tech organizer, toiletry bag and sleep mask",
    width: 2000,
    height: 1400,
  },

  /* Social share image — exactly 1200×630. */
  ogImage: {
    src: "/images/og-image.jpg",
    alt: "Velara — Better Sleep. Smoother Journeys.",
    width: 1200,
    height: 630,
  },
} as const satisfies Record<string, ImageAsset>;

export type ImageKey = keyof typeof images;
