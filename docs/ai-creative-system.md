# WEDRA AI creative system

A reusable prompt engine for photorealistic WEDRA product photos and short
videos, made in an image or video model that accepts a reference image
(for example ChatGPT image generation, Midjourney with image reference,
Runway, Kling, Veo or Sora). It works for every future discovery: only the
product block changes.

**The golden rule:** AI builds the world around the product (environment,
light, people, ingredients, props, camera). It never redesigns the product.

---

## 1. Product reference workflow

Do this once per product before generating anything.

1. **Collect the real references.** Download the product's own photos from its
   Zendrop listing (for Discovery #01: product 1904744, reference YNSM8MU4):
   front, back, three-quarter, top, lid, base and charging port, every colour
   variant. Keep them in a private folder, never in this repository.
2. **Write the product lock** (section 3) from those photos and the verified
   fact sheet, describing only what is visible.
3. **Pick a hero reference per shot**: the photo whose angle is closest to
   the shot you want. Models copy angles far better than they rotate objects.
4. **Generate** with the reference attached and the full prompt (section 2).
5. **Compare side by side** with the reference using the QA checklist
   (section 8). Reject anything with a changed shape, button, lid, blade,
   port, colour or an added logo or text.
6. **Retouch, don't regenerate the product.** If only the product is wrong,
   composite the real product photo into the generated scene instead.
7. **Log it**: file name, model, prompt, reference used, approved by, date.

If you don't have the real reference photo for a variant, don't generate that
variant. Never describe a product from memory.

---

## 2. Master prompt template

Fill every bracket. Keep the order.

```
[BRAND STYLE]
Photorealistic premium editorial lifestyle photograph for WEDRA, a curated
wellness and everyday-living brand. Clean, modern, minimal, natural, warm and
understated. Warm whites, soft neutrals, charcoal and subtle natural greens.
The product is the visual focus.

[PRODUCT REFERENCE]
Use the attached reference image as the exact physical source of truth for
the product. {PRODUCT LOCK}. Preserve its geometry, proportions, materials,
colours, buttons, lid, blades, charging port and every visible detail
exactly as in the reference.

[ENVIRONMENT]  {where}
[SUBJECT]      {who or what besides the product, or "no people"}
[ACTION]       {what is happening}
[CAMERA]       {lens, angle, distance, depth of field}
[LIGHTING]     {light source, time of day, quality}
[COMPOSITION]  {placement, negative space, aspect ratio}

[REALISM]
Real-world scale, correct perspective and shadows, natural skin and hands
with five fingers, realistic liquids and materials, no motion blur on the
product.

[NEGATIVE]
Do not redesign the product, change its shape, proportions, colour or
materials, add or remove buttons, lights, logos, labels or text, invent
accessories or components, show a WEDRA logo on the product, add on-image
text, watermarks, badges, prices or stickers. No neon colours, no heavy
gradients, no cartoon or CGI look, no distorted hands, no floating objects.
```

---

## 3. Product lock (per product)

A short, literal description of the product from its reference photos.
Discovery #01, written from the supplied reference photos (white studio,
pink render with base close-up, white lifestyle on a balcony table):

```
A portable electric juicer blender about 22 cm tall, shaped like a bottle:
a clear, transparent jar that narrows to a short neck; a flat round cap on
top; a collar at the neck with a round ring-shaped carry loop on one side;
a ribbed translucent sleeve around the lower part of the jar over the blade
area; dual stainless-steel blades at the bottom of the jar; a cylindrical
base in {white | pink} with small grey "FRESH JUICE" printing, exactly as in
the reference; a cable charging port on the base, as shown in the reference.
Cap, collar, loop and base are all the same colour.
```

- Keep the "FRESH JUICE" print exactly as the reference shows it: never
  remove, move or restyle it, and never add any other text or logo
  (including WEDRA).
- Use the white reference for white shots and the pink reference for pink
  shots. Other colour variants need their own reference photo first.
- The button position isn't clear in the current photos: describe it only
  as "as shown in the reference" until a clear photo is available.

---

## 4. Photo categories

Each row plugs into the master template. Aspect ratios: 4:5 for product
pages and feeds, 9:16 for stories, 1:1 for grids, 16:9 or 3:2 for the
website hero.

| # | Category | Environment | Subject / action | Camera | Lighting | Composition |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | **Hero (studio)** | Seamless warm-white sweep | No people. Product alone, upright | 85 mm, eye level, f/8, whole product sharp | Large soft key from the left, gentle fill, soft contact shadow | Centred, lots of negative space |
| 2 | **Morning routine** | Modern kitchen counter, light stone or oak, a window | No people or a partial hand. Fresh ingredients nearby, the product ready to use | 50 mm, slightly above eye level, f/2.8 | Early natural morning light through a window, warm | Product on the right third, ingredients soft in front |
| 3 | **Ingredients** | Stone or linen surface | Product surrounded by banana, berries, milk in a glass, a scoop of protein powder, leafy greens | 50 mm, 30° above, f/4 | Soft daylight | Loose arrangement, product the tallest element |
| 4 | **Office** | Clean modern desk, laptop edge, plant, notebook | Product standing on the desk, a finished drink beside it | 35 mm, seated eye level, f/2.8 | Daylight from a side window | Product in the foreground third, desk soft behind |
| 5 | **Gym** | Bench in a calm, well-lit gym or locker room | Product beside or in an open gym bag with a towel | 35 mm, low angle, f/2.8 | Soft overhead plus window light | Product sharp, bag and background soft |
| 6 | **Handheld** | Neutral outdoor or kitchen background | A realistic adult hand holding the product naturally around the body | 85 mm, f/2.8 | Soft daylight | Hand and product fill two thirds of the frame; correct scale (about 22 cm tall) |
| 7 | **Close-up** | Studio | Lid, body texture, blades seen through the jar (not touched) | 100 mm macro, f/8 | Raking soft light to show material | Tight crop, one detail per image |
| 8 | **Finished drink** | Kitchen or café-style counter | Product beside a glass with a realistic smoothie or shake | 50 mm, f/2.8 | Warm natural light | Drink and product side by side, even weight |

Rules for every category: realistic ingredients (no ice or frozen fruit
unless the product is verified for it), realistic liquid textures, no
health-benefit props (tape measures, scales, pill bottles), and nothing that
implies a health outcome.

---

## 5. Video system

**Formats:** 9:16 first (TikTok, Reels, Shorts), then 4:5, 1:1 and 16:9 cuts
of the same edit. **Length:** 6 to 15 seconds. The idea must be clear with
the sound off in the first two seconds.

**Video prompt template** (per shot; generate shots separately, then edit):

```
[BRAND STYLE] (as in the master template), shot as a premium commercial film.
[PRODUCT REFERENCE] (as above) The product must keep exactly the same shape,
colour and details in every frame.
Shot: {duration} seconds, {9:16 vertical}. {camera move: slow push-in /
static / gentle orbit of no more than 30°}.
Scene: {environment}. Action: {one simple action}.
Lighting: {…}. Realistic physics: liquids pour and settle naturally, hands
move naturally, no morphing.
Negative: no product redesign, no changing colours between frames, no new
buttons or lights, no text, no logos on the product, no touching the blades,
no product underwater, no impossible blending, no ice or frozen fruit.
```

Put text, the WEDRA wordmark and the end frame on in the edit (or with
`tools/discovery-video/`), not in the AI prompt.

### Concepts

| # | Concept | Structure (9:16, ~12–15 s) | End frame |
| --- | --- | --- | --- |
| 1 | **Discovered by WEDRA** | Product reveal (2 s) → product in an attractive lifestyle scene (6 s) → detail (3 s) | WEDRA — Products worth discovering. |
| 2 | **Make it anywhere** | Adding simple ingredients in a kitchen (4 s) → product on an office desk (3 s) → gym bag or day out (3 s) | WEDRA — Products worth discovering. |
| 3 | **Morning** | Window light (2 s) → ingredients (3 s) → product (3 s) → blend preparation (3 s) → finished drink (3 s). Calm, no music drops. | Discovery #01 · WEDRA |
| 4 | **Desk to day** | Product at a desk (4 s) → the same product in a bag, a park or a car (4 s) → finished drink (3 s) | WEDRA — Products worth discovering. |
| 5 | **Product close-up** | Fast premium cuts: rotation (2 s), lid (1.5 s), body (1.5 s), blades through the jar (1.5 s), charging port of the exact variant (1.5 s) | WEDRA wordmark on charcoal |
| 6 | **Problem → solution** | "Want a smoothie without getting out the big blender?" over a crowded counter (3 s) → the compact product (4 s) → making a single serve (5 s) | "A compact, rechargeable 350 ml blender." → WEDRA |
| 7 | **WEDRA Discovery** *(the reusable format)* | "We found something worth showing you." (2 s) → product reveal + name + "WEDRA Discovery #01" (4 s) → two or three lifestyle shots with one short fact each (6 s) → end frame (3 s) | WEDRA — Products worth discovering. |

Concept 7 is rendered automatically by `tools/discovery-video/` from
approved photos, so every future discovery gets the same film.

### Visual rules for every video

- Photorealistic, with the exact product geometry, colour, buttons and
  charging configuration in every frame.
- Realistic hands, liquids, physics and light.
- Never show fingers near or touching the blades, the product submerged, or
  impossible transformations or blending.
- No ice or frozen fruit unless verified for this exact product.
- No speed or battery-runtime claims (the runtime isn't verified).

---

## 6. Ready-to-use prompts for Discovery #01

Attach the matching Zendrop reference photo to each. Replace
`{PRODUCT LOCK}` with your completed lock from section 3.

**Website hero (16:9)**
> Photorealistic premium editorial photograph for WEDRA … {PRODUCT LOCK} …
> Environment: a calm, modern kitchen counter in pale stone, a linen cloth, a
> small bowl of berries and a banana at the edge of frame. No people. Camera:
> 50 mm at counter height, f/4. Lighting: soft morning window light from the
> left. Composition: 16:9, product on the right third, the left half calm
> and empty for a headline. [NEGATIVE]

**Vertical ad (9:16)**
> … Environment: an open gym bag on a wooden bench with a folded towel.
> Action: a hand places the product into the bag. Camera: 35 mm, slight top
> angle, f/2.8. Lighting: soft daylight. Composition: 9:16, product in the
> middle third, clean space at top and bottom for text added later.
> [NEGATIVE]

**Close-up (4:5)**
> … Studio on warm white. Detail: the lid and top of the jar only. Camera:
> 100 mm macro, f/8. Lighting: soft raking light from the right to show
> material texture. Composition: 4:5, tight crop. [NEGATIVE]

**Discovery announcement (1:1)**
> … Studio sweep in warm stone. The product alone, upright, centred with
> generous space above. Camera: 85 mm, eye level, f/8. Lighting: large soft
> key. Composition: 1:1. [NEGATIVE]
> *(Add "WEDRA Discovery #01" and the wordmark in the edit.)*

---

## 7. Reusing the system for the next discovery

1. Collect the new product's reference photos (section 1).
2. Write its product lock (section 3) and fact sheet (like
   `docs/discovery-01-blender.md`).
3. Keep the brand style, negative block, categories and concepts unchanged.
   Swap only the product lock and the scene props that suit the product.
4. Render the WEDRA Discovery film with `tools/discovery-video/`, using the
   next discovery number.

---

## 8. QA checklist (every asset)

**Product fidelity**
- [ ] Same shape and proportions as the reference.
- [ ] Same colour and material finish as the variant shown.
- [ ] Buttons, lid, blades and charging port match exactly; none added or missing.
- [ ] No logos, text or labels added to the product.
- [ ] Believable real-world size (about 22 cm tall).

**Scene**
- [ ] Hands have natural anatomy and grip; no one touches the blades.
- [ ] Liquids and ingredients look real; no ice or frozen fruit.
- [ ] No props or wording that imply a health, weight or performance outcome.
- [ ] Warm, natural palette; no neon, heavy gradients or badges.

**Copy on or around the asset**
- [ ] Only verified facts; no invented runtime, speed or capability.
- [ ] No fake reviews, numbers, awards, scarcity or urgency.
- [ ] WEDRA presented as the finder, never the maker.
- [ ] No supplier name.

**Delivery**
- [ ] 9:16 version exists for social; 4:5 / 1:1 / 16:9 as needed.
- [ ] Logged with model, prompt, reference and approver.
