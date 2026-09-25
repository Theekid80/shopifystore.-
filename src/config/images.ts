/**
 * ─────────────────────────────────────────────────────────────────────────
 *  PRODUCT & LIFESTYLE IMAGES — every image on the site is defined here.
 * ─────────────────────────────────────────────────────────────────────────
 *
 *  To replace an image:
 *    1. Put the new photo in /public/images (keep the filename, or change
 *       `src` below). Remote URLs work too — add the host to
 *       `images.remotePatterns` in next.config.ts (cdn.shopify.com already is).
 *    2. Update `width`/`height` to the new photo's pixel size.
 *    3. Rewrite `alt` so it describes the new photo.
 *    4. Set `final: true`.
 *
 *  While `final` is false, development builds (`npm run dev`) show a small
 *  "Replace: filename" tag on the image so nothing is forgotten. Production
 *  builds never show the tag.
 *
 *  Current files are cropped from the Velara design boards in /design by
 *  `npm run photos`. They're low resolution — see README → "Images".
 */

export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** true once this is the final, full-resolution photograph. */
  final?: boolean;
};

const img = (src: string, alt: string, width: number, height: number, final = false): ImageAsset => ({
  src,
  alt,
  width,
  height,
  final,
});

export const productImages = {
  /* ── Campaign ─────────────────────────────────────────────────────────── */
  hero: img(
    "/images/hero-travel.jpg",
    "The black Velara travel sleep system with a carry-on at an airport window at sunset",
    1680,
    1224,
  ),
  /** The six system pieces laid out and numbered. */
  bundle: img(
    "/images/whats-included.jpg",
    "The six pieces of the Velara Travel Sleep System laid out and numbered: sleep mask, earplugs with case, travel pouch, toiletry organizer, tech organizer and packing cube",
    846,
    746,
  ),
  /** The system in front of its box on a hotel bed. Also shows a luggage tag. */
  bundleBoxed: img(
    "/images/travel-system.jpg",
    "Velara travel pieces arranged in front of a Velara box on a hotel bed",
    1084,
    702,
  ),

  /* ── Individual pieces ───────────────────────────────────────────────── */
  sleepMask: img("/images/sleep-mask.jpg", "Velara weighted blackout sleep mask in black with an adjustable strap", 444, 402),
  sleepMaskDetail: img("/images/sleep-mask-detail.jpg", "Close-up of the Velara logo on the soft black sleep mask", 288, 261),
  travelPouch: img("/images/travel-pouch.jpg", "Black Velara travel pouch with a carry handle", 360, 402),
  earplugs: img("/images/earplugs.jpg", "Velara earplugs in their round black carry case", 318, 402),
  organizer: img("/images/toiletry-bag.jpg", "Black Velara toiletry organizer with a carry handle", 309, 317),
  packingCube: img("/images/packing-cubes.jpg", "Black Velara packing cube with a mesh top panel", 337, 317),
  techOrganizer: img("/images/tech-organizer.jpg", "Open Velara tech organizer holding earbuds, cables and a charger", 377, 402),
  luggageTag: img("/images/luggage-tag.jpg", "Black Velara luggage tag with a buckle strap", 303, 317),

  /* ── Lifestyle ───────────────────────────────────────────────────────── */
  lifestyle: img(
    "/images/suitcase-organized.jpg",
    "An open suitcase packed with Velara organizers beside a passport",
    662,
    406,
  ),
  airplane: img(
    "/images/airplane-lifestyle.jpg",
    "A traveler resting in an airplane seat wearing the Velara sleep mask",
    975,
    636,
  ),
  airplaneSeat: img(
    "/images/flights-lifestyle.jpg",
    "Velara sleep mask and earplug case on a lie-flat airplane seat",
    532,
    386,
  ),
  hotel: img("/images/hotel-lifestyle.jpg", "Velara toiletry organizer on a hotel bathroom counter", 618, 634),
  road: img("/images/road-trip-lifestyle.jpg", "Velara travel pouch by a window overlooking the mountains", 720, 804),
  weekend: img(
    "/images/business-lifestyle.jpg",
    "A traveler with a backpack and Velara luggage tag walking toward a plane",
    442,
    532,
  ),

  /* ── Social share — exactly 1200×630 ─────────────────────────────────── */
  ogImage: img("/images/og-image.jpg", "VELARA — Better Sleep. Smoother Journeys.", 1200, 630),
} satisfies Record<string, ImageAsset>;

export type ImageKey = keyof typeof productImages;
