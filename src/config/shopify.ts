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
  "system-midnight": "",
  "system-stone": "",
  "system-sand": "",

  // Individual pieces
  "mask-midnight": "",
  "mask-stone": "",
  "mask-sand": "",
  "pouch-midnight": "",
  "pouch-stone": "",
  "pouch-sand": "",
  "earplugs-default": "",
  "tech-midnight": "",
  "tech-stone": "",
  "tech-sand": "",
  "cube-midnight": "",
  "cube-stone": "",
  "cube-sand": "",
  "toiletry-midnight": "",
  "toiletry-stone": "",
  "toiletry-sand": "",
  "tag-midnight": "",
  "tag-stone": "",
  "tag-sand": "",
};
