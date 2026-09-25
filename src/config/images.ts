/**
 * ─────────────────────────────────────────────────────────────────────────
 *  IMAGE CONFIGURATION — every image on the site is defined here.
 * ─────────────────────────────────────────────────────────────────────────
 *
 *  All files currently come from the Velara design boards in /design,
 *  cut out by `npm run photos` (scripts/crop-photos.mjs).
 *
 *  To replace an image, either:
 *   1. Drop a new file with the SAME filename into /public/images, or
 *   2. Change `src` below (a local path like "/images/my-photo.jpg", or a
 *      remote URL — remote hosts must also be added to `images.remotePatterns`
 *      in next.config.ts, e.g. cdn.shopify.com).
 *
 *  Keep `width`/`height` in line with the real photo's pixel size, and
 *  always write a descriptive `alt` for accessibility and SEO.
 */

export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const images = {
  /* Hero — the full system at an airport window at sunset. */
  hero: {
    src: "/images/hero-travel.jpg",
    alt: "The black Velara travel system — sleep mask, organizers, earplug case and a carry-on — at an airport window at sunset",
    width: 1680,
    height: 1224,
  },

  /* The complete system in front of its box. */
  travelSystem: {
    src: "/images/travel-system.jpg",
    alt: "The complete Velara Travel Sleep System in black, arranged in front of a Velara box on a hotel bed",
    width: 1084,
    height: 702,
  },
  /* Numbered flat lay of all seven pieces. */
  whatsIncluded: {
    src: "/images/whats-included.jpg",
    alt: "Flat lay of all seven Velara pieces, numbered: sleep mask, earplugs and case, travel pouch, toiletry bag, tech organizer, packing cube and luggage tag",
    width: 1010,
    height: 746,
  },

  /* Featured sleep mask. */
  sleepMask: {
    src: "/images/sleep-mask.jpg",
    alt: "Velara premium weighted sleep mask in black with an adjustable strap",
    width: 444,
    height: 402,
  },
  sleepMaskDetail: {
    src: "/images/sleep-mask-detail.jpg",
    alt: "Close-up of the Velara logo on the soft black sleep mask",
    width: 288,
    height: 261,
  },

  /* Individual products — shown in square frames. */
  travelPouch: {
    src: "/images/travel-pouch.jpg",
    alt: "Black Velara travel pouch with a carry handle beside a window",
    width: 360,
    height: 402,
  },
  earplugs: {
    src: "/images/earplugs.jpg",
    alt: "Velara noise-reducing earplugs in their round black carry case by an airplane window",
    width: 318,
    height: 402,
  },
  techOrganizer: {
    src: "/images/tech-organizer.jpg",
    alt: "Open Velara tech organizer holding earbuds, cables and a charger",
    width: 377,
    height: 402,
  },
  packingCubes: {
    src: "/images/packing-cubes.jpg",
    alt: "Black Velara packing cube with a mesh top panel on a bed",
    width: 337,
    height: 317,
  },
  toiletryBag: {
    src: "/images/toiletry-bag.jpg",
    alt: "Black Velara toiletry bag with a carry handle on a bathroom counter",
    width: 309,
    height: 317,
  },
  luggageTag: {
    src: "/images/luggage-tag.jpg",
    alt: "Black Velara luggage tag with buckle strap on a leather bag",
    width: 303,
    height: 317,
  },

  /* Lifestyle. */
  airplaneLifestyle: {
    src: "/images/airplane-lifestyle.jpg",
    alt: "A traveler resting in an airplane seat wearing the Velara sleep mask",
    width: 975,
    height: 636,
  },
  flightsLifestyle: {
    src: "/images/flights-lifestyle.jpg",
    alt: "Velara sleep mask and earplug case on a lie-flat airplane seat",
    width: 532,
    height: 386,
  },
  hotelLifestyle: {
    src: "/images/hotel-lifestyle.jpg",
    alt: "Velara toiletry bag on a hotel bathroom counter",
    width: 618,
    height: 634,
  },
  roadTripLifestyle: {
    src: "/images/road-trip-lifestyle.jpg",
    alt: "Velara travel pouch by a window overlooking the mountains",
    width: 720,
    height: 804,
  },
  businessLifestyle: {
    src: "/images/business-lifestyle.jpg",
    alt: "A business traveler with a backpack and Velara luggage tag walking toward a plane",
    width: 442,
    height: 532,
  },

  /* Organization — an open suitcase packed with Velara organizers. */
  suitcaseOrganized: {
    src: "/images/suitcase-organized.jpg",
    alt: "An open suitcase neatly packed with Velara packing cubes, tech organizer, toiletry bag and travel pouch, beside a passport",
    width: 662,
    height: 406,
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
