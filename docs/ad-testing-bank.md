# WEDRA ad hook & creative testing bank — Discovery #01

**Goal:** let the market decide. These creatives exist to find which
**hook + visual + format** combination earns clicks and purchases, not to
prove the product is a winner. Launch, measure, then make more of what works.

Product: Portable Electric Juicer Blender (WEDRA Discovery #01). WEDRA found
it; WEDRA did not make it. Every asset uses the real product photos as the
source of truth.

## 1. What's in the bank

| Asset | Count | Where |
| --- | --- | --- |
| 9:16 video ads (safe zones for TikTok, Reels, Stories) | 63 (16 Fast · 21 Premium · 26 Native text-over-video) | `tools/ad-bank/out/video/` |
| 4:5 and 1:1 feed videos | 16 each (round-1 set) | `tools/ad-bank/out/video/4x5/`, `/1x1/` |
| Static ads (concepts A–J) | 10 × 4 sizes (4:5, 9:16, 1:1, 1.91:1) | `tools/ad-bank/out/static/` |
| Carousel | 5 slides, 4:5 and 1:1 | `tools/ad-bank/out/carousel/` |
| Hooks catalogued | 90 | this document + `tools/ad-bank/bank.json` |

Hook status: 62 rendered · 1 reworded and rendered ·
19 need footage · 7 creator-only · 1 on hold.

Renders are made from the photos available today (white studio, pink render
with base close-up, white on a sunny balcony table). Hooks that promise a
place the photos don't show (kitchen, office, gym, several locations) are
**not** faked: they wait for footage (section 7).

## 2. Naming = the test variables

Every file name is its test cell. Use the same ID as the ad name and as
`utm_content`, so results can be grouped by any variable.

```
WD01 - ANGLE - HOOK - OPENING VISUAL - FORMAT - CTA
WD01-CUR-H01-LIFE-FAST-C1
```

| Variable | Values |
| --- | --- |
| Angle | CUR curiosity · CONV convenience · PORT portability · MORN morning · WORK office · GYM gym · PS problem/solution · REVEAL product reveal · MIN minimalism · FOUND “I found this” · WEDRA brand · GIFT gift |
| Opening visual | LIFE lifestyle · STUDIO white studio · PINK pink product · (later: KITCHEN, OFFICE, GYM, DESK, DAYOUT, HAND, CLOSE) |
| Format | FAST (12 s) · PREM premium (15 s) · NATV native text-over-video (10 s) · UGC (creator) · STATIC · CAROUSEL |
| CTA | C1 Discover it · C2 See the find · C3 Explore the discovery · C4 Meet the latest WEDRA find · C5 Shop the discovery · C6 Discover WEDRA · C7 See why we found it · C8 Explore the product |

## 3. Video structures

| Structure | Timing | Scenes |
| --- | --- | --- |
| **A · FAST** (12 s) | 0–1.3 hook · 1.3–3.2 reveal · 3.2–7 use + detail · 7–9.8 finished drink · 9.8–12 CTA | Hook caption on the opening visual → product with “WEDRA Discovery #01” → lifestyle “350 ml. Rechargeable.” → base close-up “Charges by cable.” → drink “Your drink, ready.” → end card |
| **B · UGC** (15 s) | 0–2 person + hook · 2–5 reveal · 5–9 demo · 9–12 product · 12–15 CTA | Creator-made only (section 8). Never simulated with AI people presented as real customers. |
| **C · PREMIUM** (15 s) | 0–2.4 close-up + hook · 2.4–5.4 lifestyle · 5.4–8.8 product pair · 8.8–12 drink · 12–15 logo | Lid close-up with serif hook → “Small format. Everyday use.” → white + pink with “350 ml · Rechargeable · 50 W” → “Your smoothie. Your routine.” → end card |
| **N · NATIVE** (10 s) | 0–2.6 hook · 2.6–7.4 three quick cuts · 7.4–10 CTA | Phone-style caption hook → “Compact. About 22 cm tall.” → “Make one drink at a time.” → “350 ml. Rechargeable.” → end card |

Every end card: WEDRA · “Products worth discovering.” · the CTA · “WEDRA
Discovery #01”. No prices on any ad.

Supporting lines use only verified facts (350 ml, rechargeable, 50 W, dual
stainless-steel blades, about 22 cm / 82 × 82 × 218 mm) or plain use cases.

## 4. Static and carousel concepts

| ID | Headline | Visual |
| --- | --- | --- |
| A | Your routine. Made portable. | White studio hero |
| B | Discover something better. | Balcony lifestyle |
| C | Smoothie. Wherever. | Balcony lifestyle |
| D | WEDRA Discovery #01 (+ product name) | Large product |
| E | Small format. Everyday convenience. | Base close-up |
| F | The little blender that goes with you. | White + pink pair *(gym/office version needs footage)* |
| G | Found for your everyday. | Pink product |
| H | Less setup. More routine. | Drink close-up |
| I | Why didn’t we find this sooner? | Phone-style caption on lifestyle |
| J | One of our latest finds. | White product on stone |

Carousel (4:5): 1 WEDRA Discovery #01 → 2 Small enough to take along → 3
Made for everyday routines *(uses the product pair until kitchen/office/gym
photos exist)* → 4 A simple way to make your drink → 5 Discover it at WEDRA.

## 5. Test plan

Don't launch everything at once and don't pick winners by taste.

**Round 1 — hooks (the biggest lever).** Hold visual and format steady and
vary only the hook: pick the NATIVE version of 2 hooks per angle
(about 20 ads). Equal budget per ad, broad audience, one ad set per angle or
a single ad set with dynamic distribution.

**Round 2 — format.** Take the top 3–5 hooks and run each as FAST, PREMIUM and
NATIVE (and a static A–J match). Keep the CTA constant.

**Round 3 — visual and CTA.** For the winning hook + format, test opening
visual (LIFE vs STUDIO vs PINK, then new footage) and rotate the 8 CTAs.

**Round 4 — scale and iterate.** Put more budget behind winners; make 3–5
fresh variations of each winner (new first second, same idea) before fatigue.

### What to measure

| Stage | Metric | Read it as |
| --- | --- | --- |
| Stop | 3-second view rate / thumb-stop | Is the first second working? |
| Hold | Average watch time, % watched to the end | Is the story working? |
| Click | Outbound CTR, CPC | Does the promise make people want more? |
| Buy | Add to cart rate, cost per purchase, ROAS | Does it sell? |

### Decision rules

- Judge only after each ad has had a fair, similar amount of spend and
  impressions; don't call a winner after a few hours.
- A hook wins on **purchases or cost per purchase** first; CTR and view rate
  are tie-breakers and early signals, not the verdict.
- Kill: well below the round average on 3-second views **and** CTR after a
  fair spend.
- Iterate: strong stop/CTR but weak purchases → the hook works, the landing
  or offer doesn't. Check the product page before killing the hook.
- Record every result against the ad ID in the tracking sheet (section 6).

## 6. Tracking sheet columns

`Ad ID · Angle · Hook · Visual · Format · CTA · Platform · Start date · Spend ·
Impressions · 3s views · Avg watch · CTR · CPC · Add to carts · Purchases ·
Cost per purchase · ROAS · Decision (kill / keep / iterate / scale) · Notes`

Link every ad to the product with `utm_source={platform}&utm_medium=paid_social&utm_campaign=wd01&utm_content={ad ID}`.

## 7. Footage to shoot or generate next (unlocks 19 hooks)

Use real footage or AI shots that pass the QA checklist in
`docs/ai-creative-system.md` (exact product, white or pink only).

| Shot | Unlocks |
| --- | --- |
| Full-size blender cluttering a counter (1 s), then this product | H12, H51 (stronger), H55 |
| Kitchen counter in morning light, ingredients going in | H23, H29, H33, H38 |
| Desk with laptop and notebook, product beside it | H24, H39, H40, H42, H43, H44 |
| Open gym bag with towel and bottle, product going in | H24, H45, H47, H48, H49, H50 |
| Day out: park bench, car cup holder, picnic | H25, H26, H29, H30 |
| Hand carrying the product by its ring loop | H17, H22, H27 (stronger) |

Safety rules for every shot: no fingers near the blades, never submerged, no
ice or frozen fruit, no impossible blending.

## 8. Creator (UGC) brief — Version B

Only with a real person who has the product. Their words must be their own
experience; no scripted testimonials.

- **Hooks for creators:** H02, H06, H31, H37, H41, H73, H74 (first-person, so they
  must be true for that creator).
- **Structure:** 0–2 s face or hands + hook → 2–5 s show the product →
  5–9 s make one simple drink → 9–12 s the drink / reaction → 12–15 s
  WEDRA end card added in the edit.
- **Must:** show the real product, say it's a WEDRA discovery, disclose the
  paid partnership (#ad) where required.
- **Must not:** health, weight or energy claims; battery life; ice or frozen
  fruit; “viral”; mention of the supplier; invented numbers.

## 9. Hook bank

### Angle 01 Curiosity

| Hook | Copy | Status | Ad ID / note |
| --- | --- | --- | --- |
| H01 | Okay… why did nobody show me this sooner? | ✅ Rendered | `WD01-CUR-H01-LIFE-FAST-C1` |
| H02 | I just found something I actually want to use every day. | 🧑 Creator only | First-person usage claim: only with a real creator who uses it. |
| H03 | This might be one of the most useful things I found this week. | ✅ Rendered | `WD01-CUR-H03-LIFE-NATV-C2` |
| H04 | I wasn’t looking for a blender. Then I found this. | ✅ Rendered | `WD01-CUR-H04-STUDIO-NATV-C3` |
| H05 | Wait until you see what this little thing does. | ✅ Rendered | `WD01-CUR-H05-LIFE-FAST-C4` · Needs the product shown doing its job; ready version shows the blended drink, a demo clip makes it stronger. |
| H06 | I didn’t expect this to be this convenient. | 🧑 Creator only | Implies personal experience: creator-only. |
| H07 | Found something worth putting on your radar. | ✅ Rendered | `WD01-CUR-H07-LIFE-PREM-C5` |
| H08 | This is exactly the kind of product WEDRA looks for. | ✅ Rendered | `WD01-CUR-H08-STUDIO-PREM-C6` |
| H09 | Here’s today’s WEDRA discovery. | ✅ Rendered | `WD01-CUR-H09-STUDIO-PREM-C7` |
| H10 | Another product we think is worth knowing about. | ✅ Rendered | `WD01-CUR-H10-PINK-NATV-C8` |

### Angle 02 Convenience

| Hook | Copy | Status | Ad ID / note |
| --- | --- | --- | --- |
| H11 | Your blender doesn’t have to live on your countertop. | ✅ Rendered | `WD01-CONV-H11-STUDIO-FAST-C1` |
| H12 | Big blender. Small routine problem. | 🎬 Needs footage | Needs a shot of a full-size blender setup. |
| H13 | Why use a full-size blender for one drink? | ✅ Rendered | `WD01-CONV-H13-STUDIO-NATV-C2` |
| H14 | One drink. One compact blender. | ✅ Rendered | `WD01-CONV-H14-LIFE-PREM-C3` |
| H15 | Your smoothie routine just got a lot simpler. | ✅ Rendered | `WD01-CONV-H15-LIFE-NATV-C4` |
| H16 | Less setup. More smoothie. | ✅ Rendered | `WD01-CONV-H16-LIFE-FAST-C5` |
| H17 | Small enough to take with you. | ✅ Rendered | `WD01-CONV-H17-LIFE-FAST-C6` |
| H18 | Your morning routine doesn’t need more equipment. | ✅ Rendered | `WD01-CONV-H18-LIFE-NATV-C7` |
| H19 | For the person who hates pulling out the big blender. | ✅ Rendered | `WD01-CONV-H19-STUDIO-NATV-C7` |
| H20 | Sometimes simpler is better. | ✅ Rendered | `WD01-CONV-H20-LIFE-PREM-C8` |

### Angle 03 Portability

| Hook | Copy | Status | Ad ID / note |
| --- | --- | --- | --- |
| H21 | Your smoothie doesn’t have to stay home. | ✅ Rendered | `WD01-PORT-H21-LIFE-NATV-C1` |
| H22 | Take your routine with you. | ✅ Rendered | `WD01-PORT-H22-LIFE-PREM-C2` |
| H23 | From kitchen to office. | 🎬 Needs footage | Needs kitchen and office shots. |
| H24 | From desk to gym bag. | 🎬 Needs footage | Needs desk and gym-bag shots. |
| H25 | Made for routines that don’t stay in one place. | 🎬 Needs footage | Needs two or more locations. |
| H26 | Your routine moves. Your blender can too. | 🎬 Needs footage | Needs two or more locations. |
| H27 | Small enough to bring along. | ✅ Rendered | `WD01-PORT-H27-LIFE-FAST-C3` |
| H28 | Why leave your smoothie routine at home? | ✅ Rendered | `WD01-PORT-H28-LIFE-NATV-C4` |
| H29 | Morning kitchen → workday → wherever. | 🎬 Needs footage | Needs kitchen, office and outdoor shots. |
| H30 | Meet the little blender that travels with your routine. | 🎬 Needs footage | Needs a location change. |

### Angle 04 Morning routine

| Hook | Copy | Status | Ad ID / note |
| --- | --- | --- | --- |
| H31 | My morning starts with this. | 🧑 Creator only | First-person routine claim: creator-only. |
| H32 | A simpler way to start the morning. | ✅ Rendered | `WD01-MORN-H32-LIFE-PREM-C5` |
| H33 | POV: you finally simplified your morning smoothie. | 🎬 Needs footage | POV format needs hands-on footage. |
| H34 | Five minutes to make the morning feel easier. | ✏️ Reworded + rendered | `WD01-MORN-H34-LIFE-PREM-C6` · Time claim not verified. Use: “A few quiet minutes to make the morning feel easier.” |
| H35 | Your morning routine, but simpler. | ✅ Rendered | `WD01-MORN-H35-LIFE-NATV-C7` |
| H36 | Coffee isn’t the only thing you can make part of your morning ritual. | ✅ Rendered | `WD01-MORN-H36-LIFE-NATV-C8` |
| H37 | Here’s what my morning setup looks like now. | 🧑 Creator only | First-person: creator-only. |
| H38 | Minimal kitchen. Simple routine. | 🎬 Needs footage | Needs a kitchen shot. |

### Angle 05 Office / work

| Hook | Copy | Status | Ad ID / note |
| --- | --- | --- | --- |
| H39 | Working from home just got a little more convenient. | 🎬 Needs footage | Needs a desk or office shot. |
| H40 | Desk setup upgrade. | 🎬 Needs footage | Needs a desk or office shot. |
| H41 | My favorite thing sitting next to my laptop. | 🧑 Creator only | First-person + desk footage: creator-only. |
| H42 | Because lunch isn’t the only thing you can make at your desk. | 🎬 Needs footage | Needs a desk or office shot. |
| H43 | For busy days when you still want your routine. | 🎬 Needs footage | Needs a desk or office shot. |
| H44 | Your workday doesn’t have to interrupt your routine. | 🎬 Needs footage | Needs a desk or office shot. |

### Angle 06 Gym / active

| Hook | Copy | Status | Ad ID / note |
| --- | --- | --- | --- |
| H45 | Gym bag essential? | 🎬 Needs footage | Needs gym or gym-bag footage. No body or health claims. |
| H46 | This takes up way less space than you think. | ✅ Rendered | `WD01-GYM-H46-STUDIO-FAST-C1` · Backed by size: approx. 82 × 82 × 218 mm. |
| H47 | For routines that start before you get home. | 🎬 Needs footage | Needs gym or gym-bag footage. No body or health claims. |
| H48 | Your post-workout routine just got more portable. | 🎬 Needs footage | Needs gym or gym-bag footage. No body or health claims. |
| H49 | Small enough for the gym bag. | 🎬 Needs footage | Needs gym or gym-bag footage. No body or health claims. |
| H50 | Keep your routine moving. | 🎬 Needs footage | Needs gym or gym-bag footage. No body or health claims. |

### Angle 07 Problem → solution

| Hook | Copy | Status | Ad ID / note |
| --- | --- | --- | --- |
| H51 | Don’t want to pull out the giant blender? | ✅ Rendered | `WD01-PS-H51-STUDIO-NATV-C2` |
| H52 | There’s an easier way to make one drink. | ✅ Rendered | `WD01-PS-H52-STUDIO-FAST-C3` |
| H53 | The problem with making one smoothie… | ✅ Rendered | `WD01-PS-H53-LIFE-NATV-C4` |
| H54 | I wanted a smoothie. I didn’t want the cleanup. | ⛔ Hold | Cleaning claim not verified; hold until cleaning method is confirmed and shown. |
| H55 | Sometimes the big blender is just too much. | ✅ Rendered | `WD01-PS-H55-STUDIO-FAST-C5` |
| H56 | Want the smoothie without turning the kitchen into a project? | ✅ Rendered | `WD01-PS-H56-LIFE-NATV-C6` |
| H57 | There’s a reason compact products exist. | ✅ Rendered | `WD01-PS-H57-STUDIO-PREM-C7` |

### Angle 08 Product reveal

| Hook | Copy | Status | Ad ID / note |
| --- | --- | --- | --- |
| H58 | Meet your new little smoothie maker. | ✅ Rendered | `WD01-REVEAL-H58-STUDIO-FAST-C8` |
| H59 | Small. Simple. Portable. | ✅ Rendered | `WD01-REVEAL-H59-STUDIO-PREM-C1` |
| H60 | Say hello to the WEDRA discovery. | ✅ Rendered | `WD01-REVEAL-H60-LIFE-PREM-C2` |
| H61 | Today’s find. | ✅ Rendered | `WD01-REVEAL-H61-PINK-NATV-C3` |
| H62 | WEDRA Discovery #01. | ✅ Rendered | `WD01-REVEAL-H62-STUDIO-PREM-C4` |
| H63 | This is what we’re featuring first. | ✅ Rendered | `WD01-REVEAL-H63-PINK-FAST-C5` |
| H64 | Found for your everyday. | ✅ Rendered | `WD01-REVEAL-H64-LIFE-PREM-C6` |

### Angle 09 Minimalism

| Hook | Copy | Status | Ad ID / note |
| --- | --- | --- | --- |
| H65 | Less stuff. Better stuff. | ✅ Rendered | `WD01-MIN-H65-STUDIO-PREM-C7` |
| H66 | Small products can make a big difference in your routine. | ✅ Rendered | `WD01-MIN-H66-LIFE-PREM-C8` · “Difference” means convenience only, never health. |
| H67 | Keep the routine. Lose the clutter. | ✅ Rendered | `WD01-MIN-H67-LIFE-NATV-C1` |
| H68 | Minimal setup. Everyday use. | ✅ Rendered | `WD01-MIN-H68-STUDIO-FAST-C2` |
| H69 | For people who like their routines simple. | ✅ Rendered | `WD01-MIN-H69-LIFE-NATV-C3` |
| H70 | Simple products. Better routines. | ✅ Rendered | `WD01-MIN-H70-LIFE-PREM-C4` |

### Angle 10 “I found this”

| Hook | Copy | Status | Ad ID / note |
| --- | --- | --- | --- |
| H71 | Okay, I found something. | ✅ Rendered | `WD01-FOUND-H71-LIFE-NATV-C5` |
| H72 | Look what I found. | ✅ Rendered | `WD01-FOUND-H72-LIFE-NATV-C6` |
| H73 | Adding this to my daily routine. | 🧑 Creator only | Personal-use claim: creator-only. |
| H74 | Didn’t think I’d use this as much as I do. | 🧑 Creator only | Testimonial: only a real creator who used it. |
| H75 | Things I didn’t know I needed. | ✅ Rendered | `WD01-FOUND-H75-LIFE-NATV-C7` |
| H76 | Found this and immediately understood the appeal. | ✅ Rendered | `WD01-FOUND-H76-STUDIO-NATV-C8` |
| H77 | This is one of those products that just makes sense. | ✅ Rendered | `WD01-FOUND-H77-LIFE-NATV-C1` |
| H78 | Why is this actually so convenient? | ✅ Rendered | `WD01-FOUND-H78-LIFE-FAST-C2` |

### Angle 11 WEDRA finds

| Hook | Copy | Status | Ad ID / note |
| --- | --- | --- | --- |
| H79 | WEDRA finds products worth discovering. | ✅ Rendered | `WD01-WEDRA-H79-STUDIO-PREM-C3` |
| H80 | Another WEDRA discovery. | ✅ Rendered | `WD01-WEDRA-H80-STUDIO-FAST-C4` |
| H81 | We look for the products you didn’t know you wanted. | ✅ Rendered | `WD01-WEDRA-H81-LIFE-PREM-C5` |
| H82 | Found something interesting. | ✅ Rendered | `WD01-WEDRA-H82-LIFE-NATV-C6` |
| H83 | Not another random product. Something actually useful. | ✅ Rendered | `WD01-WEDRA-H83-STUDIO-FAST-C7` · Framed as WEDRA’s curation philosophy, not a factual guarantee. |
| H84 | Here’s what caught our attention. | ✅ Rendered | `WD01-WEDRA-H84-LIFE-NATV-C8` |
| H85 | Something new for your everyday. | ✅ Rendered | `WD01-WEDRA-H85-LIFE-PREM-C1` |
| H86 | Welcome to WEDRA. | ✅ Rendered | `WD01-WEDRA-H86-STUDIO-PREM-C2` |

### Angle 12 Gift

| Hook | Copy | Status | Ad ID / note |
| --- | --- | --- | --- |
| H87 | Know someone who lives on smoothies? | ✅ Rendered | `WD01-GIFT-H87-LIFE-NATV-C3` |
| H88 | Gift idea for the person who loves their routine. | ✅ Rendered | `WD01-GIFT-H88-LIFE-PREM-C4` |
| H89 | One for you. One for them. | ✅ Rendered | `WD01-GIFT-H89-PINK-FAST-C5` · No bundle or multi-buy offer exists; never imply one. |
| H90 | An easy gift for the smoothie person. | ✅ Rendered | `WD01-GIFT-H90-LIFE-NATV-C6` |

## 10. Re-rendering and reuse

```
cd tools/ad-bank
node render.mjs videos --format=9x16            # every ad, vertical
node render.mjs videos --format=4x5 --set=round1 # feed versions of round 1
node render.mjs videos --only=H01                # ads whose ID contains H01
node render.mjs statics                          # photos + carousels, all sizes
```

For the next discovery: new photos in `photos/`, a new `bank.json` (same
structure, new product facts and hooks), same renderer and naming.
