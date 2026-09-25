/**
 * ─────────────────────────────────────────────────────────────────────────
 *  SHOPIFY VARIANT IDS — the only file you edit to link products to Shopify.
 * ─────────────────────────────────────────────────────────────────────────
 *  Left: the site's variant id (see src/config/products.ts).
 *  Right: the Shopify variant GID, e.g. "gid://shopify/ProductVariant/44781234567890".
 *
 *  Find a variant's number in Shopify admin → Products → (product) → click
 *  the variant; the URL ends in /variants/<number>. Leave "" for anything
 *  you don't sell — checkout will say which items aren't linked yet.
 */
export const shopifyVariantIds: Record<string, string> = {
  // Sets
  "system-black": "",
  "kit-black": "",

  // Individual pieces
  "mask-black": "",
  "pouch-black": "",
  "organizer-black": "",
  "cube-black": "",
  "tech-black": "",
  "earplugs-black": "",
  "tag-black": "",
};
