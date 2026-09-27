# WEDRA Discovery film

Renders the reusable **"WEDRA Discovery"** short video (concept 7 in
`docs/ai-creative-system.md`) from a product's approved photos. Every
discovery gets the same film; only the job file changes.

| Scene | Share of length | Content |
| --- | --- | --- |
| Hook | 16% | Charcoal. "We found something worth showing you." |
| Reveal | 27% | Warm white. Product photo, "WEDRA Discovery #NN", product name |
| In use | 35% | Up to three lifestyle photos, one short verified fact each |
| End frame | 22% | Charcoal. WEDRA, "Products worth discovering.", discovery label, wedra.co |

Formats: `9x16` (1080 × 1920, the social default), `4x5`, `1x1`, `16x9`.
Length: 6–15 seconds (default 15), 30 fps, H.264. No prices, no claims beyond
the captions you write.

## Use

1. Put approved photos in `photos/` (ignored by git): one product photo
   (studio, ideally on white) and up to three lifestyle photos. Use only real
   product photos or AI images that passed the QA checklist.
2. Copy `job.example.json` to `job.json` and edit it. Captions must be
   verified facts or plain use cases (see the product's fact sheet in `docs/`).
3. Install once: `npm i -D playwright && npx playwright install chromium`,
   and have `ffmpeg` on your PATH.
4. Run `node render.mjs job.json` (all formats in the job) or
   `node render.mjs job.json 9x16` (one format). Videos land in `out/`.

Environment overrides: `FFMPEG` (ffmpeg path), `CHROMIUM_PATH` (browser
binary), `PLAYWRIGHT_MODULE` (Playwright import path).

## Job fields

| Field | Meaning |
| --- | --- |
| `slug` | Output file name prefix |
| `discovery` | Label, e.g. `WEDRA Discovery #01` |
| `product` | Product name as in Shopify |
| `hook` | Opening line (default "We found something worth showing you.") |
| `productImage` | Path to the product photo, relative to the job file |
| `productImageOnWhite` | `true` blends a white background into the warm white scene |
| `lifestyle` | Up to 3 `{ image, caption, focus }`; `focus` is a CSS object-position |
| `endLine` | End-frame line (default "Products worth discovering.") |
| `url` | Small line under the end frame, e.g. `wedra.co` |
| `duration` | Seconds, 6–15 |
| `formats` | Any of `9x16`, `4x5`, `1x1`, `16x9` |
