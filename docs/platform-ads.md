# WEDRA platform ads — Instagram, Facebook, TikTok, Reels

Ready-to-upload video and photo ads for WEDRA Discovery #01, rendered by
`tools/ad-bank` and organised by format. The copy for every ad is in
`tools/ad-bank/ad-copy.csv`, keyed by ad ID. How to test them is in
`docs/ad-testing-bank.md`.

## 1. What to upload where

| Folder | Size | Upload to |
| --- | --- | --- |
| `video/9x16/` (all 63) | 1080 × 1920, 10–15 s | **TikTok** (In-Feed, Spark), **Instagram Reels + Stories**, **Facebook Reels + Stories** |
| `video/4x5/` (16, round 1) | 1080 × 1350 | **Instagram feed**, **Facebook feed** |
| `video/1x1/` (16, round 1) | 1080 × 1080 | **Facebook feed + Marketplace**, Instagram feed, Messenger |
| `static/9x16/` (A–J) | 1080 × 1920 | Instagram + Facebook **Stories**, TikTok (image ads / photo mode where available) |
| `static/4x5/` (A–J) | 1080 × 1350 | **Instagram + Facebook feed** |
| `static/1x1/` (A–J) | 1080 × 1080 | Facebook feed + Marketplace, right column |
| `static/191x1/` (A–J) | 1200 × 628 | Facebook **link ads**, Audience Network |
| `carousel/4x5/` (5 slides) | 1080 × 1350 | **Instagram carousel** |
| `carousel/1x1/` (5 slides) | 1080 × 1080 | **Facebook carousel** |

In Meta Ads Manager, upload the 9:16, 4:5 and 1:1 versions of the same ad
together and use **placement asset customisation**: each placement then
gets its own format automatically.

## 2. Safe zones (already built in)

The 9:16 files keep all text and the product clear of each app's buttons
and captions:

- top 12 % (status bar, "Following / For You", Stories header)
- bottom 26 % (caption, username, music, CTA button)
- right 14 % (like, comment, share icons)

Feed formats (4:5, 1:1, 1.91:1) have no overlay and use the full frame.

## 3. Copy per platform

All from `ad-copy.csv`: one row per ad, same ad ID as the file name.

| Field | Where | Limit used |
| --- | --- | --- |
| `meta_primary_text` | Facebook + Instagram "Primary text" | ≤ 125 characters (no "See more" cut) |
| `meta_headline` | "Headline" | ≤ 40 |
| `meta_description` | "Description" (feed link ads) | Product name |
| `meta_button` | Call-to-action button | Learn more / Shop now |
| `tiktok_ad_text` | TikTok "Ad text" | ≤ 100, with hashtags only if they fit |
| `tiktok_cta` | TikTok CTA button | Learn more / Shop now |
| `url` + `url_parameters` | Destination + URL parameters | UTMs carry the ad ID as `utm_content` |

The on-video CTA (Discover it, See the find, …) is part of the creative
test; the platform button stays **Learn more**, or **Shop now** for the
"Shop the discovery" variants.

Organic posts (not ads): use the same video and the TikTok text as the
caption, plus up to four hashtags (`#WEDRA #WEDRADiscovery
#productsworthdiscovering #smoothie`).

## 4. Before running any ad

- [ ] The product is live on Shopify at the URL in the CSV (import via
      Zendrop, handle `portable-electric-juicer-blender`, password removed).
- [ ] Meta pixel and Conversions API connected (Facebook & Instagram app in
      Shopify); TikTok pixel connected (TikTok app in Shopify).
- [ ] Cookie banner set up (Settings → Customer privacy).
- [ ] Refund, shipping, privacy and terms policies published.
- [ ] Ad account in the brand name WEDRA, with a WEDRA Instagram and TikTok
      profile.

## 5. Rules for every ad

No prices, reviews, ratings, sales numbers, countdowns or "limited stock".
No health, weight or energy claims. No battery-life, ice or frozen-fruit
claims. Never "viral". Never the supplier's name. WEDRA is the finder, not
the maker. First-person hooks only with a real creator who uses the product.

## 6. Re-rendering

```
cd tools/ad-bank
node render.mjs videos --format=9x16                    # all ads, vertical
node render.mjs videos --format=4x5 --set=round1        # feed video, round 1
node render.mjs videos --format=1x1 --set=round1        # square video, round 1
node render.mjs videos --format=4x5 --only=H59          # one ad in one format
node render.mjs statics                                 # photos + carousels, all sizes
```
