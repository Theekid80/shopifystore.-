# WEDRA ad bank

Renders the hook-testing creatives for a discovery from one file,
`bank.json`: every hook (with angle, status and compliance note), every ad
(hook × opening visual × format × CTA) and the verified facts used in
supporting lines. The playbook for testing them is
[`docs/ad-testing-bank.md`](../../docs/ad-testing-bank.md).

| Output | Command |
| --- | --- |
| 9:16 videos with TikTok / Reels / Stories safe zones | `node render.mjs videos --format=9x16` |
| 4:5 or 1:1 feed videos for the round-1 set | `node render.mjs videos --format=4x5 --set=round1` |
| Only some ads (ID contains a string) | `node render.mjs videos --only=H01` |
| Parallel runs | add `--shard=0/4` … `--shard=3/4` |
| Photo ads A–J (4:5, 9:16, 1:1, 1.91:1) and carousels (4:5, 1:1) | `node render.mjs statics` |

Files land in `out/<kind>/<format>/` (git-ignored), named by their test
cell and format, e.g. `WD01-CUR-H01-LIFE-FAST-C1-9x16.mp4`. Per-ad
platform copy (Meta primary text, headline, button; TikTok ad text; UTM
parameters) is in `ad-copy.csv`; see `docs/platform-ads.md`.

Photos go in `photos/` (git-ignored): `life.jpg`, `studio.jpg`,
`studio-tall.jpg`, `pink.jpg`, `charge.jpg`. Use only real product photos or
AI images that passed the QA checklist in `docs/ai-creative-system.md`.

Needs Node 18+, Playwright (`npm i -D playwright && npx playwright install
chromium`) and ffmpeg. Overrides: `FFMPEG`, `CHROMIUM_PATH`,
`PLAYWRIGHT_MODULE`.

Rules baked in: no prices, no reviews or numbers, no health claims, no
battery-life or ice claims, WEDRA shown as the finder, never the maker.
Hooks marked `footage`, `creator` or `hold` in `bank.json` are never
rendered.
