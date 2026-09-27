# WEDRA ad bank

Renders the hook-testing creatives for a discovery from one file,
`bank.json`: every hook (with angle, status and compliance note), every ad
(hook × opening visual × format × CTA) and the verified facts used in
supporting lines. The playbook for testing them is
[`docs/ad-testing-bank.md`](../../docs/ad-testing-bank.md).

| Output | Command |
| --- | --- |
| 9:16 videos (FAST 12 s, PREMIUM 15 s, NATIVE 10 s) | `node render.mjs videos` |
| Only some ads (ID contains a string) | `node render.mjs videos H01` |
| Parallel runs | `node render.mjs videos "" 0/4` … `3/4` |
| Statics A–J (4:5 + 9:16) and the 5-slide carousel | `node render.mjs statics` |

Files land in `out/` (git-ignored), named by their test cell, e.g.
`WD01-CUR-H01-LIFE-FAST-C1.mp4`.

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
