/**
 * ─────────────────────────────────────────────────────────────────────────
 *  SHOPIFY VARIANT IDS — the only file you edit to link products to Shopify.
 * ─────────────────────────────────────────────────────────────────────────
 *  Left: the site's variant id (see src/data/products.ts).
 *  Right: the Shopify variant GID, e.g. "gid://shopify/ProductVariant/44781234567890".
 *
 *  Find a variant's number in Shopify admin → Products → (product) → click
 *  the variant; the URL ends in /variants/<number>. Leave "" for anything
 *  you don't sell — checkout will say which items aren't linked yet.
 */
export const shopifyVariantIds: Record<string, string> = {
  // The Velara Travel Sleep System (bundle)
  "system-black": "",

  // Individual pieces
  "mask-black": "",
  "pouch-black": "",
  "earplugs-black": "",
  "tech-black": "",
  "cube-black": "",
  "toiletry-black": "",
  "tag-black": "",
};
