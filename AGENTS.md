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

## Permanent workflow: one continuous theme

The branch `claude/shopify-website-rbdqm0` of `Theekid80/shopifystore.-` is
connected to the Shopify theme **"shopifystore.-/claude designer"** through
Shopify's GitHub integration. That theme is the single source of truth for
the storefront code. A push to the branch updates the theme within about a
minute; edits made in the Shopify theme editor are committed back to the
branch by Shopify.

For every storefront request, unless the owner explicitly says "Start a new
theme":

1. `git pull` the branch first (Shopify may have committed editor changes).
2. Read the existing implementation and make the smallest change that
   builds on it. Preserve everything that already works; don't duplicate
   components or replace unrelated systems.
3. Test the affected pages (Theme Check, plus a browser check of the flow).
4. Commit only the relevant work with a clear message, and push to the same
   branch. Don't create other branches, and don't upload zips or create
   separate themes.
5. Confirm the connected theme picked up the commit (compare file checksums
   through the Admin API when available).
6. The connected theme is the **published, live** theme on wedra.co, so
   every push to this branch goes live within about a minute. Test fully
   before pushing, and push only finished, verified work. The owner turns
   the store password on (Online Store → Preferences) when they want to
   make changes privately; the theme itself stays published. Never
   publish or unpublish themes. wedra.co stays on Shopify; GitHub only
   holds the theme code.

After each edit, report: what changed, files changed, what was preserved,
bugs fixed, new functionality, the commit SHA, confirmation that the live
theme picked it up, and anything that still needs Shopify-side setup.
