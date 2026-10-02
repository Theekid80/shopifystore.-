# WEDRA colour cards

Tools for making the WEDRA colour-option photos (one per product variant) and
linking them in Shopify. Not part of the theme; Shopify ignores this folder.

- `jobs.json`: the variants that need a colour card, one entry per variant
  (empty until the next product needs cards). Keep supplier URLs out of it.
- `color.html` + `ad.css`: the card design (ivory, product photo on top,
  small product name, colour name in Cormorant, colour dot).
- `render.mjs`: renders `photos/<n>.<ext>` into `out/`.

Rules: show the real product exactly as supplied (no recolouring), no WEDRA
wordmark on product images, no prices or claims. Hide any supplier text,
logos or watermarks printed on a photo (crop or cover with ivory).
