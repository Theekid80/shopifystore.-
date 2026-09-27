# WEDRA — creative development for the next four discoveries

**Status: creative development only.** None of these products is in Shopify.
Don't create, import, publish, price or map them until the business rule is
met (one product until $10K in sales, see `README.md`) and the owner says go.
Nothing in this document changes the store, the blender or checkout.

| Working name | Reference | Variants (as listed by the fulfilment partner) | Reference photos in hand |
| --- | --- | --- | --- |
| Oil Sprayer | 1972168 | 1 pc 470 ml: Beige, Black, Green, Yellow · 2 pc 470 ml: Black, Green, Beige | 5 (beige, with overlay text) |
| Digital Measuring Spoon | 2076060 | 300 g, 500 g | None yet |
| Electric Dish Scrubber | 2864377 | 800 mA / 1200 mA × White, Green, Pink | None yet |
| Mini Bag Sealer | 2872197 | White, Pink, Gray, Black (W159) | None yet |

The reference numbers are internal. They never appear in a caption, file
name that is uploaded publicly, alt text, product field or ad.

Discovery numbers (#02, #03 …) are given at launch, in launch order, not
here. Until then the working names above are used.

---

## 1. Audit: the current store and the blender creative

What the four new products must fit into, and what needs to change in the
theme before a second product goes live.

### Look and feel (keep)

| Element | Current system |
| --- | --- |
| Palette | Warm white `#F7F5F0` background, charcoal text, sage accent `#6F7A63`, soft neutral surfaces |
| Type | Cormorant Garamond (display, editorial headlines) + Manrope (body, labels) |
| Buttons | Square, uppercase, wide tracking (0.24em), 52 px tall (60 px large); primary charcoal, secondary outline |
| Spacing | Generous: sections 80–160 px apart, 20 px gutter on phones |
| Image ratios | 4:5 portrait for product cards, gallery and hero cards; 3:2 lifestyle; 16:9 video; 9:16 for Reels/TikTok only |
| Header | Logo + Discover / About / Contact, no overlay, cart drawer |
| Hero | Brand statement beside a carousel looping at 1.7 s |
| Product page | Gallery → name → price → variants → value line → add to cart → specs / included / details / shipping / returns tabs → everyday use → video → FAQ → more discoveries |

### Blender presentation (the benchmark)

- Studio white first, then a real lifestyle photo, a two-colour pair, the
  pink variant, a close-up and two videos. Every image is the real product
  from its reference photos.
- Copy is calm and specific (portable, rechargeable, your routine), with no
  health, runtime or ice claims.
- Ads: 90 hooks, statics A–J, carousel, 9:16 / 4:5 / 1:1, no prices.

**Every new product needs the same depth before it launches:** one studio
hero on warm white, one alternate angle, one real-use lifestyle, one detail,
one use case, one brand/collection image and a 9:16 mobile hero (section 2).

### What must change in the theme when product #2 goes live

1. **Hero carousel shows only the blender.** The homepage hero uses six slide
   blocks, all blender ads. Slide blocks take priority over live products, so
   a new product would never reach the hero. At launch, add the new product's
   brand image (image 6) and hero (image 1) as slide blocks, or remove all the
   slides so the carousel loops one card per live product.
2. **"WEDRA Discovery #01" eyebrow** on the homepage featured section: point
   the section at the newest product and update the number.
3. **"One discovery today. More to come."** on the homepage and About page
   becomes wrong with two products. Replace it with e.g. "A new discovery,
   when it's worth it."
4. **Discover menu / collection:** products only appear in "More
   discoveries" and `/collections/discoveries` once they're added to that
   collection.
5. **Variant naming (fix in Shopify at import, not in the theme):**
   - *Oil Sprayer*: one option mixing pack size, volume and colour
     ("1PC 470ML Beige") shows as long pills. Split it into two options,
     **Pack** (1 bottle / 2 bottles) and **Colour**. The theme greys out the
     missing combination (2 bottles, Yellow) and moves to the nearest
     available variant.
   - *Mini Bag Sealer*: "Black W159" gets no colour dot and shows a code.
     Rename the value to **Black** (the SKU keeps the code).
   - *Dish Scrubber*: "800mA / 1200mA" means little to a customer. Before
     launch, confirm what it is (usually the battery capacity, mAh). Then
     either label it plainly (e.g. "Standard" / "Larger battery") with the
     number in the specifications, or keep one version only. Never turn it
     into a runtime claim.
6. **Only sell what can be shown** (standing rule): a colour or pack with no
   real photo of its own is left out at import.

---

## 2. The system every product follows

### Seven images

| # | Image | Ratio | Where it's used |
| --- | --- | --- | --- |
| 1 | **Hero**: the product alone, front, on warm white `#F7F5F0`, soft shadow | 4:5 (1080 × 1350) | First gallery image, product card, hero carousel |
| 2 | **Alternate angle**: three-quarter or back, same background | 4:5 | Gallery 2, hover image |
| 3 | **Lifestyle**: in a real, calm home setting, in use or just used | 4:5 (+ 3:2 crop) | Gallery 3, "Everyday use" section |
| 4 | **Detail**: the one mechanism that makes it useful, close | 4:5 | Gallery 4, highlights |
| 5 | **Use case**: the moment it solves, with hands | 4:5 | Gallery 5, ads |
| 6 | **Collection / brand**: the product with neutral props on stone or linen, room for a headline | 4:5 + 1:1 | Hero slide, Discover page, social grid |
| 7 | **Mobile hero**: composed for a phone, product in the middle third, clear top 12 % and bottom 26 % | 9:16 (1080 × 1920) | Stories, Reels cover, mobile ad |

Rules for all seven:
- The product is the product in the reference photos: same shape, parts,
  colour, proportions and printing. Never redesign it, add parts or add a
  logo, including WEDRA's.
- No text on product images (text belongs to ads and the site).
- Remove the fulfilment partner's text overlays, arrows, badges and
  watermarks. Never trace or redraw them.
- One colour per image unless it's a deliberate colour-range shot, and only
  colours that have their own reference photo.
- Prompts: `docs/ai-creative-system.md` master template plus the product
  lock written below.

### Video

Each concept is 15–30 s, 9:16, with captions on screen for sound-off
viewing. Text stays inside the safe zones: clear of the top 12 %, the bottom
26 % and the right 14 %. The product appears in the first second. Cuts come
every 1–2 s. End on the product plus "WEDRA — Products worth discovering."
No prices, no countdowns, no "limited", no "viral".

### CTA options (all four products)

| On-screen / organic | Ad button |
| --- | --- |
| Discover it · See the find · Find it at WEDRA · Worth a look · Explore the discovery · Link in bio | Learn more (test), Shop now (retargeting) |

---

## 3. Oil Sprayer

### Creative brief
A 470 ml glass oil bottle with a cap that both sprays and pours. One bottle
by the stove instead of a spray bottle plus a pourer. The WEDRA angle:
*the small kitchen upgrade you use every single day.* Audience: people who
cook at home, air-fryer users, people who like a tidy counter.

### Product lock (from the 5 reference photos, beige)
```
A clear glass oil bottle, 470 ml, tall with rounded shoulders, holding
golden oil. A {beige} plastic top unit with: a flip lid over a pour spout;
a press button on top; a short side nozzle for spraying; a trigger-style
handle on one side, all exactly as in the reference. The cap colour is
uniform {beige}. No printing on the glass.
```
- Only beige is confirmed by photo. Black, Green and Yellow need their own
  reference photos before any image in those colours. For 2 pc, show two
  real bottles only once a 2 pc photo exists.
- The reference photos carry overlay text ("SPRAY DOWN INTEGRATED OILER
  POT", "LARGE CALIBER", "FREE SWITCHIN", "2 IN 1") and arrows. Crop them
  out or use the photos as a shape reference only. None of that wording is
  reused.

### Hero direction
The bottle standing alone, slightly off-centre on warm white. The trigger
handle faces the camera at three-quarter so that the side nozzle, handle and
cap read in one glance. Oil glows amber with a low backlight. Calm and
premium, like a design object rather than a gadget.

### Seven images
| # | Direction |
| --- | --- |
| 1 Hero | As above. 50 mm, eye level, soft window light from the left, gentle shadow to the right |
| 2 Alternate | The other side: flip lid open, pour spout visible, handle side away. Same background and light |
| 3 Lifestyle | On a stone counter beside a hob, olive-wood board, lemons, a pan. Morning light. No people or one hand at the edge |
| 4 Detail | Macro of the cap: press button, side nozzle, flip lid. Shallow depth of field on the glass |
| 5 Use case | A hand squeezing the trigger over a salad or an air-fryer basket, fine mist catching the light. Split companion frame: the same bottle pouring a thin stream into a pan |
| 6 Collection | Two bottles (only once a second-colour reference exists) on linen with a bowl of greens. Negative space top-left for a headline |
| 7 Mobile | Bottle centred in the middle third, tall crop, light top to bottom, room for captions top and bottom |

### Five Reels / TikTok concepts
| # | Hook (on screen) | First 1–2 s | Shot list and action | Voiceover | Caption | CTA | Runtime |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | "Spray or pour. Same bottle." | Close on the trigger: mist into a pan | 1 mist into pan · 2 flip lid, pour a line of oil · 3 bottle back on counter · 4 end card | "One bottle. Spray it, or flip the lid and pour it." | "Spray or pour. Same bottle." | Discover it | 15 s |
| 2 | "The air-fryer upgrade nobody talks about" | Mist over fries in an air-fryer basket | 1 basket mist · 2 close on nozzle · 3 basket closes · 4 bottle on counter · 5 end card | "A light mist over the basket. Then back by the stove." | "A small upgrade for the air fryer." | See the find | 18 s |
| 3 | "My counter, minus two bottles" | Messy counter with a spray can and an oil jug | 1 before: can + jug · 2 hands swap them for one glass bottle · 3 tidy counter wide · 4 detail of cap · 5 end card | "Two bottles out. One in." | "One bottle does both." | Worth a look | 20 s |
| 4 | "Salad, pan, toast. One bottle." | Quick mist over salad | 1 salad mist · 2 pour in pan · 3 mist on toast · 4 bottle hero · 5 end card (3 fast cuts to a beat) | None; captions only | "Salad, pan, toast." | Find it at WEDRA | 15 s |
| 5 | "WEDRA found: the oil bottle that does two jobs" | Bottle turns on warm white, oil glowing | 1 slow turn · 2 macro of button/nozzle · 3 flip lid · 4 hand spray · 5 hand pour · 6 lifestyle wide · 7 end card | "Glass, 470 ml. Spray, or pour. Found by WEDRA." | "Found: spray or pour, 470 ml glass." | Explore the discovery | 25 s |

### Hooks
1. Spray or pour. Same bottle.
2. One bottle by the stove, two jobs.
3. The air-fryer upgrade nobody talks about.
4. Glass, 470 ml, and a trigger.
5. Found: the oil bottle that does both.

### Captions
1. Spray it over the basket, or flip the lid and pour. One 470 ml glass bottle by the stove. Found by WEDRA.
2. Two bottles on the counter became one. A small kitchen upgrade worth discovering.
3. Salad, pan, air fryer. Mist or pour from the same bottle. Link in bio.

### Website placement and mobile
- Gallery order: 1 hero, 5 use case (spray), 3 lifestyle, 4 detail, 2 alternate (pour), then one image per colour, only for colours with photos.
- Highlights block: Capacity 470 ml · Glass bottle · Spray or pour · Colours available.
- Everyday use section: image 3 with 3 short lines (salads, air fryer, pan).
- Mobile: hero image fills the width at 4:5, pack and colour pickers above
  the fold together with Add to cart; the video (concept 1) sits right
  after the tabs.

### Product-page copy direction
- Title: "Oil Sprayer — Spray or Pour, 470 ml Glass" (no brand-of-maker).
- Value line: "Spray a light mist or pour: one glass bottle by the stove."
- Tone: practical, tidy-kitchen, calm. Talk about the moment (dressing a
  salad, the air-fryer basket) and the two ways to use it.
- Specifications only from the listing and photos: 470 ml, glass bottle,
  spray and pour functions, pack size, colour.

### Claims to avoid
Leak-proof, drip-free, "perfect mist", spray volume or pattern numbers,
"saves X% oil", fewer calories, healthier cooking, weight loss, BPA-free,
food-grade or dishwasher-safe (unless confirmed in writing), heat-resistant,
"2 in 1" styled as the partner's overlay, any of the partner's overlay words.

### Reference checklist (per image)
- [ ] Cap shape, flip lid, press button, side nozzle and handle match the photos
- [ ] Bottle proportions and rounded shoulders match; glass has no printing
- [ ] Colour is a photographed colour (beige until others are received)
- [ ] No overlay text, arrows or badges from the source photos
- [ ] Mist and pour look physically plausible; no invented extra nozzle or measuring marks
- [ ] 2 pc shown only as two real bottles, and only once a 2 pc photo exists

---

## 4. Digital Measuring Spoon

**Reference photos needed first.** Nothing below may be generated until the
partner's photos of the 300 g and 500 g versions are in hand. The product
lock is then written from them (handle shape, display position, buttons,
bowl shape, colour, any printing).

### Creative brief
A kitchen spoon with a small digital display in the handle that shows the
weight of what's in the bowl. The WEDRA angle: *measure as you scoop.* For
coffee, baking, protein or tea routines and small-batch recipes. Two
capacity variants: up to 300 g or up to 500 g.

### Product lock (template; fill from photos)
```
A digital measuring spoon: {bowl shape and material} bowl, {handle colour}
handle with a {size} digital display {position} and {n} buttons {labels},
exactly as in the reference. Any printing on the handle appears only as in
the reference.
```

### Hero direction
The spoon lying at a slight angle on warm white, display facing the camera
showing a plausible reading, a small mound of coffee beans in the bowl.
Minimal, precise, calm.

### Seven images
| # | Direction |
| --- | --- |
| 1 Hero | As above, top-down at 30°, soft light |
| 2 Alternate | Side profile showing the handle and buttons |
| 3 Lifestyle | Morning coffee station: grinder, cup, spoon in hand scooping beans |
| 4 Detail | Macro of the display and buttons, as in the reference |
| 5 Use case | Baking: scooping flour over a bowl, display visible |
| 6 Collection | Spoon with tea, spices and beans in small ceramic dishes, headline space |
| 7 Mobile | Hand holding spoon vertically, display at centre of frame |

### Five Reels / TikTok concepts
| # | Hook | First 1–2 s | Shot list and action | Voiceover | Caption | CTA | Runtime |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | "A spoon with a screen" | Display lights up as a scoop lands | 1 display on · 2 scoop beans · 3 reading · 4 pour into grinder · 5 end card | "Scoop. Read. Pour." | "A spoon that weighs as you scoop." | Discover it | 15 s |
| 2 | "Coffee, measured in one move" | Beans poured into the bowl | 1 beans · 2 display · 3 grinder · 4 cup · 5 end card | "No scale out. Just the spoon." | "Morning coffee, measured." | See the find | 18 s |
| 3 | "Small batch baking, without the scale" | Flour dusting from the spoon | 1 flour scoop · 2 display · 3 sugar scoop · 4 bowl · 5 end card | "For the small amounts." | "Measure as you scoop." | Worth a look | 20 s |
| 4 | "Tea, spice, coffee" | Three fast scoops to a beat | 1 tea · 2 spice · 3 coffee · 4 hero · 5 end card | None | "Tea. Spice. Coffee." | Find it at WEDRA | 15 s |
| 5 | "WEDRA found: the measuring spoon with a display" | Spoon turns on warm white | 1 turn · 2 display macro · 3 buttons · 4 in use · 5 lifestyle · 6 end card | "Up to 300 or 500 grams. Found by WEDRA." | "Found: a spoon with a display." | Explore the discovery | 25 s |

Readings shown on screen must be real readings captured from the product,
never made up in editing.

### Hooks
1. A spoon with a screen.
2. Measure as you scoop.
3. Coffee, measured in one move.
4. The scale stays in the drawer.
5. Found: the measuring spoon with a display.

### Captions
1. Scoop, read, pour. A measuring spoon with a small display in the handle. Found by WEDRA.
2. For coffee, tea and small-batch baking: measure as you scoop. Link in bio.
3. The scale stays in the drawer. Two sizes, up to 300 g or 500 g.

### Website placement and mobile
- Gallery: hero, display detail, coffee lifestyle, baking use case, side profile.
- Highlights: Capacity (300 g / 500 g) · Display · Units (only if confirmed).
- Mobile: capacity picker as two plain pills ("Up to 300 g", "Up to 500 g").

### Product-page copy direction
Value line: "A spoon with a display: measure coffee, tea and baking as you
scoop." Practical, precise, understated. No numbers beyond capacity.

### Claims to avoid
Accurate, precise to 0.1 g, "lab-grade", "professional", calibrated,
nutrition, portion control, diet or weight-loss support, battery life,
waterproof, "replaces your scale".

### Reference checklist
- [ ] Handle, bowl, display position and button count match the photos
- [ ] Display shows a real captured reading, or is off
- [ ] Printing on the handle only as in the reference
- [ ] The 300 g and 500 g versions look as their photos show (don't assume they're identical)

---

## 5. Electric Dish Scrubber

**Reference photos needed first**, for each colour. It is a small handheld
device: show it at true scale in a hand. Don't invent extra brush heads,
extension handles, stands, lights, IPX ratings, RPM or battery life.

### Creative brief
A small handheld powered scrubber for dishes, sinks and small surfaces. The
WEDRA angle: *the small help at the sink.* For people who cook daily and
want the washing-up to be less of a chore. Colours: White, Green, Pink.

### Product lock (template; fill from photos)
```
A small handheld electric scrubber about {size from listing} long,
{body colour} body with {head shape and bristles}, {button position}, and a
{charging method} exactly as in the reference. Only the heads shown in the
reference; no extension handle.
```

### Hero direction
The scrubber standing upright on warm white, small in the frame to show its
real scale, with a folded linen cloth. Clean, fresh, quiet.

### Seven images
| # | Direction |
| --- | --- |
| 1 Hero | As above, in the green (or whichever colour photographs best) |
| 2 Alternate | Lying on its side, showing the head and button |
| 3 Lifestyle | Bright sink with ceramic dishes, a hand holding the scrubber |
| 4 Detail | Macro of the head and bristles |
| 5 Use case | Scrubbing a pan edge with suds (no before/after dirt claims) |
| 6 Collection | The three colours in a row on stone (only with all three photographed) |
| 7 Mobile | Hand holding it at the centre of a tall sink scene |

### Five Reels / TikTok concepts
| # | Hook | First 1–2 s | Shot list and action | Voiceover | Caption | CTA | Runtime |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | "Small. Powered. At the sink." | Button press, head starts spinning | 1 press · 2 pan edge · 3 mug rim · 4 rinse · 5 end card | "Press, scrub, rinse." | "A small powered scrubber for the sink." | Discover it | 15 s |
| 2 | "The washing-up, a little easier" | Stack of dishes, hand picks up scrubber | 1 stack · 2 plate · 3 pan · 4 rack · 5 end card | "For the everyday washing-up." | "The small help at the sink." | See the find | 20 s |
| 3 | "Fits in one hand" | Scrubber in palm, true scale | 1 palm · 2 grip · 3 in use · 4 on the counter · 5 end card | "Small enough to keep by the tap." | "Fits in one hand." | Worth a look | 15 s |
| 4 | "Three colours for your sink" | White, green, pink in a row | 1 row · 2 each in a hand · 3 in use · 4 end card | None | "White, green or pink." | Find it at WEDRA | 15 s |
| 5 | "WEDRA found: a scrubber that does the scrubbing" | Slow turn on warm white | 1 turn · 2 head macro · 3 button · 4 pan · 5 sink wide · 6 end card | "Handheld and powered. Found by WEDRA." | "Found: the small help at the sink." | Explore the discovery | 25 s |

Show only real results filmed in one take. No sped-up cleaning presented as
real time, and no before/after grime reveals.

### Hooks
1. Small. Powered. At the sink.
2. The washing-up, a little easier.
3. Fits in one hand.
4. Press, scrub, rinse.
5. Found: the small help at the sink.

### Captions
1. A small powered scrubber that lives by the tap. Press, scrub, rinse. Found by WEDRA.
2. For pans, mugs and the everyday washing-up. White, green or pink. Link in bio.
3. The small help at the sink. Fits in one hand.

### Website placement and mobile
- Gallery: hero, in-hand scale, use case, head detail, one per colour.
- Highlights: Handheld · Powered · Colours, plus the capacity variant (as
  confirmed, in the specifications, not the headline).
- Mobile: colour swatches first, capacity pills second.

### Product-page copy direction
Value line: "A small handheld powered scrubber for the everyday washing-up."
Keep it modest and domestic. Say "small" plainly; it sets the right
expectation.

### Claims to avoid
Waterproof, IPX7 or any rating, RPM or speed, battery life or minutes per
charge, "deep clean", "removes 99%", antibacterial or hygienic, "no more
scrubbing", heavy-duty grout or grill cleaning, extra heads or extension
handles not in the box, anything implied by "800 mA / 1200 mA" beyond the
confirmed spec.

### Reference checklist
- [ ] Size in the hand matches the listing (small device)
- [ ] Head, bristles, button and charging method as in the photos
- [ ] Only the parts in the box, no extension handle or extra heads
- [ ] Each colour from its own photo
- [ ] No sped-up or staged "before/after"

---

## 6. Mini Bag Sealer

**Reference photos needed first**, for each colour.

### Creative brief
A pocket-size heat sealer that closes opened snack and food bags. The WEDRA
angle: *close the bag, keep the counter tidy.* For snack drawers, coffee
bags, pantry organisers. Colours: White, Pink, Gray, Black.

### Product lock (template; fill from photos)
```
A small handheld bag sealer about {size} long, {colour} body with a
{hinge / clip shape}, {button or slide} and {magnet or hook if shown},
exactly as in the reference. No added cutter or light unless in the
reference.
```

### Hero direction
The sealer lying on warm white beside a neatly folded, closed coffee bag.
Tidy, graphic, pastel-calm.

### Seven images
| # | Direction |
| --- | --- |
| 1 Hero | As above, top-down |
| 2 Alternate | Open position, showing the sealing edge |
| 3 Lifestyle | Pantry shelf with glass jars and a few sealed bags |
| 4 Detail | Macro of the sealing edge and button |
| 5 Use case | Hands sliding it along the top of a chip bag |
| 6 Collection | The four colours fanned out on linen (only with all four photographed) |
| 7 Mobile | Hand with sealer mid-slide on a tall pantry backdrop |

### Five Reels / TikTok concepts
| # | Hook | First 1–2 s | Shot list and action | Voiceover | Caption | CTA | Runtime |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | "Close the bag. Properly." | Sealer slides along a bag top | 1 slide · 2 close-up of the sealed edge · 3 bag into drawer · 4 end card | "Slide it along. Done." | "Close the bag, properly." | Discover it | 15 s |
| 2 | "No more clips in the drawer" | Drawer of mismatched clips | 1 clips · 2 swap for sealer · 3 slide · 4 tidy drawer · 5 end card | "One small sealer instead." | "Swap the clips." | See the find | 18 s |
| 3 | "Coffee bag, chips, pasta" | Three quick slides to a beat | 1 coffee · 2 chips · 3 pasta · 4 hero · 5 end card | None | "Coffee, chips, pasta." | Find it at WEDRA | 15 s |
| 4 | "Pocket-size pantry tidy" | Sealer in palm | 1 palm · 2 on the fridge or hook (only if shown) · 3 in use · 4 pantry wide · 5 end card | "Small enough to keep by the snacks." | "A pocket-size pantry tidy." | Worth a look | 20 s |
| 5 | "WEDRA found: the tiny bag sealer" | Four colours fanned on linen | 1 colours · 2 pick one · 3 slide · 4 edge macro · 5 pantry · 6 end card | "Four colours. Found by WEDRA." | "Found: the tiny bag sealer." | Explore the discovery | 25 s |

### Hooks
1. Close the bag. Properly.
2. Swap the clips.
3. Slide it along. Done.
4. A pocket-size pantry tidy.
5. Found: the tiny bag sealer.

### Captions
1. Slide it along the top of the bag and it's closed. A tiny sealer for the snack drawer. Found by WEDRA.
2. Coffee, chips, pasta: close them neatly. White, pink, gray or black. Link in bio.
3. Swap the drawer of clips for one small sealer.

### Website placement and mobile
- Gallery: hero, in-use slide, sealed-edge detail, pantry lifestyle, one per colour.
- Highlights: Handheld · Colours · How it's powered (as confirmed).
- Mobile: four colour swatches ("Black", never "Black W159").

### Product-page copy direction
Value line: "A small sealer that closes opened bags neatly." Light, tidy,
a little playful, still WEDRA-calm.

### Claims to avoid
Airtight, vacuum, keeps food fresh for X days, freshness, temperature
figures, number of seals per charge, battery life, "works on every bag",
food safety, child-safe.

### Reference checklist
- [ ] Body shape, hinge, button and any magnet/hook exactly as in the photos
- [ ] Colour from its own photo; black shown as black
- [ ] Sealed edge looks like a real result from the product, not a factory seal
- [ ] No added cutter, light or cable unless in the reference

---

## 7. Next steps (owner)

1. Send the fulfilment partner's photos for the Measuring Spoon, Dish
   Scrubber and Bag Sealer (every colour/size), and the Oil Sprayer in
   Black, Green, Yellow and the 2 pc pack.
2. Confirm from the listing: the scrubber's 800 / 1200 figure, and the
   charging method for the spoon, scrubber and sealer.
3. Pick the next discovery for when the blender reaches $10K. Then the
   seven images and five videos are produced for that one product only, and
   the theme changes in section 1 are made at launch.
