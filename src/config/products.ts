/**
 * ─────────────────────────────────────────────────────────────────────────
 *  PRODUCT CATALOG — the single source of truth for everything you sell.
 * ─────────────────────────────────────────────────────────────────────────
 *
 *  Edit names, prices, descriptions, SKUs, images, contents, stock and
 *  button text here. The whole site (home page, /shop, product pages, cart,
 *  search, structured data) reads from this file.
 *
 *  Prices are in dollars (79.99 = $79.99).
 *
 *  compareAtPrice (the crossed-out price):
 *    "items" → the real total of the included pieces at their individual
 *              prices below, labelled "if bought separately". Recommended:
 *              the saving shown is always true, even after price changes.
 *    number  → a fixed reference price. It must be genuine (a price the
 *              product has actually sold at). Inflated "was" prices can
 *              breach consumer-protection law.
 *    null    → no crossed-out price.
 *
 *  Copy rules: lifestyle language only — no medical or sleep-outcome
 *  claims, and no material claims (e.g. "mulberry silk") until confirmed.
 *  Never mention suppliers here; supplier data lives in
 *  src/config/fulfillment.server.ts, which never reaches the browser.
 *
 *  Shopify variant IDs: src/config/shopify.ts.
 */
import { productImages as img, type ImageAsset } from "./images";

export type StockStatus = "in_stock" | "low_stock" | "out_of_stock" | "preorder";
export type SavingsDisplay = "percent" | "amount" | "none";
export type ProductKind = "system" | "kit" | "piece";

export type Variant = {
  id: string;
  title: string;
  /** CSS color for a swatch (shown only when a product has 2+ variants). */
  swatch: string;
  image?: ImageAsset;
};

export type Product = {
  id: string;
  /** URL: /products/<handle> */
  handle: string;
  sku: string;
  kind: ProductKind;
  /** Position label within the system, e.g. "01". */
  index?: string;
  name: string;
  /** One-line benefit used on cards. */
  tagline: string;
  description: string;
  price: number;
  compareAtPrice: number | "items" | null;
  savingsDisplay: SavingsDisplay;
  /** First image is the primary image. */
  images: ImageAsset[];
  /** For systems and kits: ids of the included pieces, in order. */
  includes?: string[];
  /** Spec rows shown on the product page. [Brackets] = fill in before launch. */
  details: { label: string; value: string }[];
  stock: StockStatus;
  cta: { addToCart: string; buyNow: string };
  /** Small factual label, e.g. "Most complete". Never "Best seller" unless true. */
  badge?: string;
  variants: Variant[];
};

const black = (id: string): Variant[] => [{ id: `${id}-black`, title: "Black", swatch: "#1C1C1B" }];
const cta = { addToCart: "Add to Cart", buyNow: "Buy Now" };

/* ───────────────────────────── INDIVIDUAL PIECES ─────────────────────────── */

const pieces: Product[] = [
  {
    id: "sleep-mask",
    handle: "velara-travel-sleep-mask",
    sku: "VEL-MASK-BLK",
    kind: "piece",
    index: "01",
    name: "The Sleep Mask",
    tagline: "Weighted blackout comfort designed for travel.",
    description:
      "A contoured, softly weighted mask that blocks out light for a darker, more comfortable place to rest — on a flight, in a hotel or anywhere in between.",
    price: 39.99,
    compareAtPrice: null,
    savingsDisplay: "none",
    images: [img.sleepMask, img.sleepMaskDetail, img.airplane],
    details: [
      { label: "Fit", value: "Adjustable strap" },
      { label: "Materials", value: "[Add final materials]" },
      { label: "Weight", value: "[Add final weight]" },
      { label: "Care", value: "[Add care instructions]" },
    ],
    stock: "in_stock",
    cta,
    variants: black("mask"),
  },
  {
    id: "travel-pouch",
    handle: "velara-travel-pouch",
    sku: "VEL-POUCH-BLK",
    kind: "piece",
    index: "03",
    name: "The Travel Pouch",
    tagline: "Keeps your sleep essentials together.",
    description: "A structured pouch with a carry handle that keeps your mask, earplugs and small essentials in one place.",
    price: 14.99,
    compareAtPrice: null,
    savingsDisplay: "none",
    images: [img.travelPouch, img.road],
    details: [
      { label: "Dimensions", value: "[Add final dimensions]" },
      { label: "Materials", value: "[Add final materials]" },
    ],
    stock: "in_stock",
    cta,
    variants: black("pouch"),
  },
  {
    id: "organizer",
    handle: "velara-toiletry-organizer",
    sku: "VEL-TOIL-BLK",
    kind: "piece",
    index: "04",
    name: "The Organizer",
    tagline: "Keeps your personal essentials organized.",
    description: "A compact toiletry and overnight organizer with a carry handle, sized to sit neatly in a carry-on.",
    price: 19.99,
    compareAtPrice: null,
    savingsDisplay: "none",
    images: [img.organizer, img.hotel],
    details: [
      { label: "Dimensions", value: "[Add final dimensions]" },
      { label: "Materials", value: "[Add final materials]" },
    ],
    stock: "in_stock",
    cta,
    variants: black("organizer"),
  },
  {
    id: "packing-cube",
    handle: "velara-packing-cube",
    sku: "VEL-CUBE-BLK",
    kind: "piece",
    index: "06",
    name: "The Packing Cube",
    tagline: "Creates more order inside your luggage.",
    description: "A zip packing cube with a mesh panel, so you can see what's inside and keep clothing folded and together.",
    price: 17.99,
    compareAtPrice: null,
    savingsDisplay: "none",
    images: [img.packingCube, img.lifestyle],
    details: [
      { label: "Dimensions", value: "[Add final dimensions]" },
      { label: "Materials", value: "[Add final materials]" },
    ],
    stock: "in_stock",
    cta,
    variants: black("cube"),
  },
  {
    id: "tech-organizer",
    handle: "velara-tech-organizer",
    sku: "VEL-TECH-BLK",
    kind: "piece",
    index: "05",
    name: "The Tech Pouch",
    tagline: "Keeps cables and small electronics organized.",
    description: "Elastic loops and mesh pockets hold chargers, cables and earbuds exactly where you expect them.",
    price: 16.99,
    compareAtPrice: null,
    savingsDisplay: "none",
    images: [img.techOrganizer, img.lifestyle],
    details: [
      { label: "Dimensions", value: "[Add final dimensions]" },
      { label: "Materials", value: "[Add final materials]" },
    ],
    stock: "in_stock",
    cta,
    variants: black("tech"),
  },
  {
    id: "earplugs",
    handle: "velara-travel-earplugs",
    sku: "VEL-PLUG-BLK",
    kind: "piece",
    index: "02",
    name: "The Earplugs",
    tagline: "Soft earplugs in a compact case — the finishing piece.",
    description: "Soft, reusable earplugs that live in their own compact case, ready for the cabin or the hotel.",
    price: 9.99,
    compareAtPrice: null,
    savingsDisplay: "none",
    images: [img.earplugs, img.airplaneSeat],
    details: [
      { label: "Includes", value: "[Number of pairs] + carry case" },
      { label: "Materials", value: "[Add final materials]" },
    ],
    stock: "in_stock",
    cta,
    variants: black("earplugs"),
  },
  {
    id: "luggage-tag",
    handle: "velara-luggage-tag",
    sku: "VEL-TAG-BLK",
    kind: "piece",
    name: "The Luggage Tag",
    tagline: "A quiet finishing touch for every bag.",
    description: "A minimal luggage tag with a buckle strap and a discreet Velara mark.",
    price: 9.99,
    compareAtPrice: null,
    savingsDisplay: "none",
    images: [img.luggageTag, img.weekend],
    details: [{ label: "Materials", value: "[Add final materials]" }],
    stock: "in_stock",
    cta,
    variants: black("tag"),
  },
];

/* ─────────────────────────────── SETS & SYSTEM ───────────────────────────── */

export const VELARA_TRAVEL_SLEEP_SYSTEM: Product = {
  id: "travel-sleep-system",
  handle: "velara-travel-sleep-system",
  sku: "VEL-SYSTEM-BLK",
  kind: "system",
  name: "VELARA Travel Sleep System",
  tagline: "Everything you need to rest, reset and stay organized while traveling.",
  description:
    "Six coordinated essentials — a weighted blackout sleep mask, earplugs, a travel pouch, a toiletry organizer, a tech pouch and a packing cube — in one travel-ready system.",
  price: 79.99,
  compareAtPrice: "items",
  savingsDisplay: "percent",
  images: [img.bundle, img.sleepMask, img.earplugs, img.travelPouch, img.organizer, img.techOrganizer, img.packingCube],
  includes: ["sleep-mask", "earplugs", "travel-pouch", "organizer", "tech-organizer", "packing-cube"],
  details: [
    { label: "Includes", value: "6 pieces" },
    { label: "Colour", value: "Black" },
    { label: "Carry-on friendly", value: "[Confirm with final dimensions]" },
  ],
  stock: "in_stock",
  cta: { addToCart: "Add to Cart", buyNow: "Buy Now" },
  badge: "Most complete",
  variants: black("system"),
};

export const SLEEP_TRAVEL_KIT: Product = {
  id: "sleep-travel-kit",
  handle: "velara-sleep-travel-kit",
  sku: "VEL-KIT-BLK",
  kind: "kit",
  name: "Sleep + Travel Kit",
  tagline: "The sleep essentials, plus a place for your personal things.",
  description: "The weighted blackout sleep mask, earplugs and travel pouch, with the toiletry organizer for everything else.",
  price: 59.99,
  compareAtPrice: "items",
  savingsDisplay: "percent",
  images: [img.sleepMask, img.earplugs, img.travelPouch, img.organizer],
  includes: ["sleep-mask", "earplugs", "travel-pouch", "organizer"],
  details: [
    { label: "Includes", value: "4 pieces" },
    { label: "Colour", value: "Black" },
  ],
  stock: "in_stock",
  cta,
  variants: black("kit"),
};

/* ───────────────────────────────── EXPORTS ───────────────────────────────── */

/** Everything purchasable. Order = order on /shop. */
export const products: Product[] = [VELARA_TRAVEL_SLEEP_SYSTEM, SLEEP_TRAVEL_KIT, ...pieces];

/** The three offers shown in the offer selector (good → better → best, best first). */
export const offers: Product[] = [VELARA_TRAVEL_SLEEP_SYSTEM, SLEEP_TRAVEL_KIT, pieces[0]];

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const getProductByHandle = (handle: string) => products.find((p) => p.handle === handle);
export const productHref = (p: Product) => `/products/${p.handle}`;

/** The individual pieces inside a system or kit. */
export const includedPieces = (p: Product): Product[] =>
  (p.includes ?? []).map((id) => getProduct(id)).filter((x): x is Product => Boolean(x));

/** The six pieces of the hero system, in order. */
export const systemPieces = includedPieces(VELARA_TRAVEL_SLEEP_SYSTEM);

const round = (n: number) => Math.round(n * 100) / 100;

/** Combined price of a set's pieces bought separately. */
export const separateTotal = (p: Product) => round(includedPieces(p).reduce((sum, x) => sum + x.price, 0));

/** The crossed-out price actually shown (null = none). */
export function compareAt(p: Product): { amount: number; label?: string } | null {
  if (p.compareAtPrice === null) return null;
  const amount = p.compareAtPrice === "items" ? separateTotal(p) : p.compareAtPrice;
  if (!(amount > p.price)) return null;
  return { amount, label: p.compareAtPrice === "items" ? "if bought separately" : undefined };
}

export const isPurchasable = (p: Product) => p.stock !== "out_of_stock";

/**
 * Catalog sanity checks. Called at build time (see the product page's
 * generateStaticParams), so a misconfigured catalog fails the build instead
 * of shipping a broken store.
 */
export function validateCatalog(): string[] {
  const errors: string[] = [];
  const seen = new Set<string>();
  for (const p of products) {
    for (const key of [p.id, p.handle, p.sku]) {
      if (seen.has(key)) errors.push(`Duplicate id/handle/sku: ${key}`);
      seen.add(key);
    }
    if (!(p.price > 0)) errors.push(`${p.id}: price must be > 0`);
    if (!p.images.length) errors.push(`${p.id}: needs at least one image`);
    if (!p.variants.length) errors.push(`${p.id}: needs at least one variant`);
    for (const id of p.includes ?? []) if (!getProduct(id)) errors.push(`${p.id}: includes unknown piece "${id}"`);
    if (p.compareAtPrice === "items" && !p.includes?.length) errors.push(`${p.id}: compareAtPrice "items" needs includes`);
    if (typeof p.compareAtPrice === "number" && p.compareAtPrice <= p.price)
      errors.push(`${p.id}: compareAtPrice must be higher than price`);
  }
  return errors;
}
