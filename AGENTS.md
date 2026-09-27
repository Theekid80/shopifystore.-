# WEDRA storefront — notes for coding agents

This repository is a **Shopify Online Store 2.0 theme** (Liquid, JSON
templates, one CSS file, one dependency-free JS file). There is no Next.js
app, build step or package manager; the old headless prototype was removed.

- Shopify is the source of truth for products, prices, variants, inventory,
  cart and checkout. Never hard-code product data, prices or claims in the
  theme; read them from Shopify objects and product metafields.
- Sections must hide themselves when they have no real content. Never add
  placeholder or invented products, reviews, ratings, counts or scarcity.
- WEDRA is the finder and curator, not the maker. Never label a product as
  WEDRA-made, and never show a supplier's name.
- Brand, voice and creative rules: `docs/brand-system.md`,
  `docs/ai-creative-system.md`. Product facts: `docs/discovery-*.md`.
- Lint with `shopify theme check`; preview with `shopify theme dev`.
