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

const colorways = (prefix: string, overrides: Partial<Record<string, ImageAsset>> = {}): Variant[] => [
  { id: `${prefix}-midnight`, title: "Midnight", swatch: "#1C1C1B", available: true, image: overrides.midnight },
  { id: `${prefix}-stone`, title: "Stone", swatch: "#8A8680", available: true, image: overrides.stone },
  { id: `${prefix}-sand`, title: "Sand", swatch: "#C9B89F", available: true, image: overrides.sand },
];

const single = (prefix: string): Variant[] => [
  { id: `${prefix}-default`, title: "Default", swatch: "#1C1C1B", available: true },
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
    variants: colorways("mask", {
      midnight: images.sleepMask,
      stone: images.sleepMaskStone,
      sand: images.sleepMaskSand,
    }),
  },
  {
    id: "travel-pouch",
    handle: "travel-sleep-pouch",
    index: "02",
    name: "Travel Pouch",
    benefit: "A dedicated home for your mask and earplugs, ready in any carry-on.",
    price: 14.99,
    image: images.travelPouch,
    variants: colorways("pouch"),
  },
  {
    id: "earplugs",
    handle: "noise-reducing-earplugs",
    index: "03",
    name: "Earplugs",
    benefit: "Soft, reusable earplugs that quiet cabin and hallway noise.",
    price: 12.99,
    image: images.earplugs,
    variants: single("earplugs"),
  },
  {
    id: "tech-organizer",
    handle: "tech-organizer",
    index: "04",
    name: "Tech Organizer",
    benefit: "Keep chargers, cables and essentials exactly where you need them.",
    price: 24.99,
    image: images.techOrganizer,
    variants: colorways("tech"),
  },
  {
    id: "packing-cube",
    handle: "packing-organizer",
    index: "05",
    name: "Packing Cube",
    benefit: "Make every inch of your luggage count.",
    price: 19.99,
    image: images.packingCubes,
    variants: colorways("cube"),
  },
  {
    id: "toiletry-bag",
    handle: "toiletry-pouch",
    index: "06",
    name: "Toiletry Bag",
    benefit: "Overnight essentials, contained and easy to reach.",
    price: 22.99,
    image: images.toiletryBag,
    variants: colorways("toiletry"),
  },
  {
    id: "luggage-tag",
    handle: "luggage-tag",
    index: "07",
    name: "Luggage Tag",
    benefit: "A quiet, understated finish to every bag you carry.",
    price: 9.99,
    image: images.luggageTag,
    variants: colorways("tag"),
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
    "Everything you need to build your personal travel sleep routine — a weighted blackout mask, earplugs and five organizers — in one considered set.",

  /**
   * PRICING — edit freely.
   *  price:              what the customer pays.
   *  compareAtPrice:     the crossed-out price. Set to null to hide it.
   *  savingsDisplay:     "percent" → "Save 33%", "amount" → "Save $40", "none" → hidden.
   *
   *  ⚠️  A compare-at price should reflect a real reference price (e.g. the
   *      combined price of the items sold separately). Keep it honest.
   */
  pricing: {
    price: 79.99,
    compareAtPrice: 119.99 as number | null,
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
  gallery: [images.travelSystem, images.sleepMask, images.packingCubes, images.techOrganizer, images.toiletryBag] as ImageAsset[],

  variants: colorways("system", {
    midnight: images.travelSystem,
    stone: images.sleepMaskStone,
    sand: images.sleepMaskSand,
  }),
};

export type Bundle = typeof bundle;

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
