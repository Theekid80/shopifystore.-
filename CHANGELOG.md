# WEDRA storefront — edit log

Every storefront edit gets a number and a name here. This log (with the git
history) is the record of changes; nothing is named or copied in Shopify.
Newest first. Each edit goes live on wedra.co when its commit is pushed.

| # | Name | Date | Commit(s) | What changed |
| --- | --- | --- | --- | --- |
| 6 | Remove archived bag sealer from homepage | 2026-09-28 | `ab0f964` | The Mini Bag Sealer is archived in Shopify, so its hero slide (a dead link) is removed and the "In everyday use" video section now shows the spin scrubber. |
| 5 | Sold-out fix (shipping locations) | 2026-09-28 | — (Shopify setting, no code) | Added the Zendrop location to the five "WEDRA — … Shipping" profiles, so the storefront sees the stock and products are no longer shown as Sold Out. Rates unchanged. |
| 4 | Connected-theme workflow | 2026-09-27/28 | `de35061`, `7010a74` | Branch ↔ "shopifystore.-/claude designer" theme; pushes go live; this log. |
| 3 | Launch build | 2026-09-27 | `2cc54db` | Variant picker and colour swatches fixed (clean labels, real colours), homepage restructured, accessibility and mobile polish, SEO, unused legacy images removed. |
| 2 | All-products carousels | 2026-09-27 | `c461e37`, `c167306`, `85c1660` | Hero carousel shows every product; "The discoveries" row on the homepage; "More discoveries" carousel on product pages. |
| 1 | Four new discoveries media | 2026-09-27 | `c461e37` | WEDRA images, slides and videos for the oil sprayer, measuring spoon, bag sealer and spin scrubber (renderer in `tools/ad-bank/discoveries.mjs`). |

Earlier history (brand, theme foundation, blender Discovery #01): see
`git log`.
