/**
 * ─────────────────────────────────────────────────────────────────────────
 *  PRODUCT CATALOG — names, copy, prices, variants and images.
 * ─────────────────────────────────────────────────────────────────────────
 *  Prices are in major units (79.99 = $79.99).
 *
 *  Shopify: link variants to your store in src/config/shopify.ts.
 *  See README → "Connecting to Shopify".
 *
 *  Copy guideline: lifestyle language only. Do not describe any product as
 *  treating or improving a medical condition (insomnia, anxiety, etc.).
 */
import { images, type ImageAsset } from "@/config/images";

export type Variant = {
  id: string;
  title: string;
  /** CSS color for the swatch button. */
  swatch: string;
  available: boolean;
  /** Optional image override shown when this variant is selected. */
  image?: ImageAsset;
};

export type Product = {
  id: string;
  handle: string;
  /** Display order label, e.g. "01". */
  index: string;
  name: string;
  benefit: string;
  price: number;
  image: ImageAsset;
  variants: Variant[];
};

/**
 * Every piece currently ships in black. To add a colorway later, append a
 * variant (e.g. { id: "mask-stone", title: "Stone", swatch: "#8A8680", ... })
 * and the colorway picker appears automatically once there are two or more.
 */
const black = (prefix: string, image?: ImageAsset): Variant[] => [
  { id: `${prefix}-black`, title: "Black", swatch: "#1C1C1B", available: true, image },
];

export const products: Product[] = [
  {
    id: "sleep-mask",
    handle: "weighted-sleep-mask",
    index: "01",
    name: "Weighted Sleep Mask",
    benefit: "Total blackout. Gentle pressure. Travel-ready comfort.",
    price: 39.99,
    image: images.sleepMask,
    variants: black("mask"),
  },
  {
    id: "travel-pouch",
    handle: "travel-sleep-pouch",
    index: "02",
    name: "Travel Pouch",
    benefit: "Keep your sleep essentials organized and within reach.",
    price: 14.99,
    image: images.travelPouch,
    variants: black("pouch"),
  },
  {
    id: "earplugs",
    handle: "noise-reducing-earplugs",
    index: "03",
    name: "Noise-Reducing Earplugs",
    benefit: "Peace and quiet, wherever you are. Stored in a compact carry case.",
    price: 12.99,
    image: images.earplugs,
    variants: black("earplugs"),
  },
  {
    id: "tech-organizer",
    handle: "tech-organizer",
    index: "04",
    name: "Tech Organizer",
    benefit: "Keep chargers, cables and essentials exactly where you need them.",
    price: 24.99,
    image: images.techOrganizer,
    variants: black("tech"),
  },
  {
    id: "packing-cube",
    handle: "packing-organizer",
    index: "05",
    name: "Packing Cube",
    benefit: "Make every inch of your luggage count.",
    price: 19.99,
    image: images.packingCubes,
    variants: black("cube"),
  },
  {
    id: "toiletry-bag",
    handle: "toiletry-pouch",
    index: "06",
    name: "Toiletry Bag",
    benefit: "Keep your essentials fresh, clean and easy to find.",
    price: 22.99,
    image: images.toiletryBag,
    variants: black("toiletry"),
  },
  {
    id: "luggage-tag",
    handle: "luggage-tag",
    index: "07",
    name: "Luggage Tag",
    benefit: "Travel with style. Always easy to spot.",
    price: 9.99,
    image: images.luggageTag,
    variants: black("tag"),
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);

/* ───────────────────────────── THE BUNDLE ───────────────────────────── */

export type SavingsDisplay = "percent" | "amount" | "none";

export const bundle = {
  id: "travel-sleep-system",
  handle: "velara-travel-sleep-system",
  eyebrow: "The Complete System",
  name: "The Velara Travel Sleep System",
  description:
    "Everything you need to build your personal travel sleep routine — a weighted blackout mask, earplugs in a carry case and five organizers — in one considered set.",

  /**
   * PRICING — edit freely.
   *  price:           what the customer pays.
   *  compareAtPrice:  the crossed-out price.
   *                   "items" (recommended) → the real total of the included
   *                   pieces at their individual prices above, so the saving
   *                   shown is always true. Or a number, or null to hide it.
   *  savingsDisplay:  "percent" → "Save 45%", "amount" → "Save $65.94", "none" → hidden.
   *
   *  ⚠️  If you type a number, it must be a genuine reference price (e.g. a
   *      price the set has actually sold at). Inflated "was" prices can break
   *      consumer-protection law.
   */
  pricing: {
    price: 79.99,
    compareAtPrice: "items" as number | "items" | null,
    savingsDisplay: "percent" as SavingsDisplay,
  },

  /** Product ids included in the bundle, in display order. */
  includes: [
    "sleep-mask",
    "travel-pouch",
    "earplugs",
    "tech-organizer",
    "packing-cube",
    "toiletry-bag",
    "luggage-tag",
  ],

  /** Gallery on the bundle section (first image is the default). */
  gallery: [
    images.travelSystem,
    images.whatsIncluded,
    images.sleepMask,
    images.earplugs,
    images.techOrganizer,
    images.packingCubes,
    images.toiletryBag,
  ] as ImageAsset[],

  variants: black("system"),
};

export type Bundle = typeof bundle;

/** The included pieces, in display order. */
export const bundleItems: Product[] = bundle.includes.map((id) => getProduct(id)).filter((p): p is Product => Boolean(p));

/** Combined price of the included pieces bought separately. */
export const bundleItemsTotal = Math.round(bundleItems.reduce((sum, p) => sum + p.price, 0) * 100) / 100;

/** The crossed-out price actually shown for the bundle (null = hidden). */
export const bundleCompareAtPrice: number | null =
  bundle.pricing.compareAtPrice === "items" ? bundleItemsTotal : bundle.pricing.compareAtPrice;

/** Everything purchasable, keyed by id, for the cart and search. */
export type Purchasable = {
  id: string;
  name: string;
  price: number;
  image: ImageAsset;
  variants: Variant[];
};

export const purchasables: Purchasable[] = [
  { id: bundle.id, name: bundle.name, price: bundle.pricing.price, image: images.travelSystem, variants: bundle.variants },
  ...products,
];
