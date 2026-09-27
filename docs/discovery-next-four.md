# WEDRA — creative development for the next four discoveries

**Status: creative development only.** None of these products is in Shopify.
Don't create, import, publish, price or map them until the business rule is
met (one product until $10K in sales, see `README.md`) and the owner says go.
Nothing in this document changes the store, the blender or checkout.

| Working name | Reference | Variants (as listed by the fulfilment partner) | Reference photos in hand |
| --- | --- | --- | --- |
| Oil Sprayer | 1972168 | 1 pc 470 ml: Beige, Black, Green, Yellow · 2 pc 470 ml: Black, Green, Beige | 6 (beige, incl. spray-and-pour in use; with overlay text) |
| Digital Measuring Spoon | 2076060 | 300 g, 500 g | 5 (display, buttons, contents; one size) |
| Electric Dish Scrubber | 2864377 | 800 mA / 1200 mA × White, Green, Pink | 5 (green, white, pink, in use, measurements) |
| Mini Bag Sealer | 2872197 | White, Pink, Gray, Black (W159) | 10 (all four colours, sizes, charging, steps; with overlay text) |

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

### What the photos confirm
- A tall, straight-sided cylindrical clear glass bottle with a rounded
  base, holding golden oil.
- A cream-beige cylindrical top unit with a small button on top, a trigger
  lever at the back, a fine spray nozzle at the front, and a pour spout
  under a small flip cap, also at the front.
- Spray: hold upright and squeeze the trigger for a fine mist to the front.
  Pour: tip the bottle and a thin stream runs from the spout (the in-use
  photo shows both over a salad and a grill pan).

### Product lock (from the 6 reference photos, beige)
```
A tall, straight-sided cylindrical clear glass oil bottle, 470 ml, with a
rounded base, holding golden oil. A {cream-beige} cylindrical plastic top
unit with: a small button on top; a trigger lever at the back; a fine spray
nozzle at the front; a pour spout under a small flip cap at the front, all
exactly as in the reference. The top unit is one uniform colour. No
printing on the glass.
```
- Only beige is confirmed by photo. Black, Green and Yellow need their own
  reference photos before any image in those colours. For 2 pc, show two
  real bottles only once a 2 pc photo exists.
- The in-use photo (spray over a grill pan, pour over a salad) is the
  model for images 3 and 5 and for video concept 1.
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
- [ ] Top unit: button on top, trigger at the back, spray nozzle and flip-cap pour spout at the front, as in the photos
- [ ] Tall straight-sided cylinder with a rounded base; glass has no printing
- [ ] Colour is a photographed colour (beige until others are received)
- [ ] No overlay text, arrows or badges from the source photos
- [ ] Mist and pour look physically plausible; no invented extra nozzle or measuring marks
- [ ] 2 pc shown only as two real bottles, and only once a 2 pc photo exists

---

## 4. Digital Measuring Spoon

**Reference photos: 5 received** (on white, no overlay text): scoop with
rice, empty scoop, button close-up and the box contents. They don't say
whether they show the 300 g or the 500 g version: confirm that both look
the same before one image stands for both.

### What the photo confirms
- A black, deep oval scoop on a short flat black neck.
- A long handle: silver/white top with a black underside.
- A rectangular LCD display in the handle (shown reading "10.0 g").
- Below the display, a black triangular button pad with three buttons,
  labelled "MODE" (top), "TARE" (right, with a power symbol) and "HOLD"
  (left). The display shows "g".
- A hanging hole at the end of the handle.
- Runs on batteries: the contents photo shows two AAA-size batteries and an
  instruction manual with the spoon. Confirm with the listing that the
  batteries are included before saying so.
- The retail box is printed with a generic "Digital Scale / Innovative
  Kitchen Accessories" design: never show the box.

### Creative brief
A kitchen spoon with a small digital display in the handle that shows the
weight of what's in the bowl. The WEDRA angle: *measure as you scoop.* For
coffee, baking, protein or tea routines and small-batch recipes. Two
capacity variants: up to 300 g or up to 500 g.

### Product lock (from the reference photo)
```
A digital measuring spoon: a deep oval black scoop on a short flat black
neck, joined to a long handle with a silver-white top and black underside;
a rectangular grey LCD display in the handle; below it a black triangular
button pad with three buttons and the small printed labels "MODE", "TARE"
and "HOLD" around it; a hanging hole at the end of the handle, exactly as
in the reference. No other printing or logo.
```
- Keep "MODE", "TARE" and "HOLD" exactly as printed; add no other text.
- No box, manual or batteries in images, except a flat-lay of what's included once confirmed.
- The display shows either nothing or a reading actually captured from the
  product for that amount. Never a made-up number.

### Hero direction
The spoon lying at a slight angle on warm white, display facing the camera
showing a real reading, a small mound of coffee beans in the bowl.
Minimal, precise, calm.

### Seven images
| # | Direction |
| --- | --- |
| 1 Hero | As above, top-down at 30°, soft light |
| 2 Alternate | Side profile: the depth of the scoop and the black underside of the handle |
| 3 Lifestyle | Morning coffee station: grinder, cup, spoon in hand scooping beans |
| 4 Detail | Macro of the display, the power button and the MODE / TARE labels |
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
- Highlights: Capacity (300 g / 500 g) · LCD display · Tare and hold buttons · Hanging hole · Battery powered (AAA, as confirmed) · Units (only if confirmed).
- Mobile: capacity picker as two plain pills ("Up to 300 g", "Up to 500 g").

### Product-page copy direction
How to use (details tab, once confirmed from the listing): power on, press
TARE to zero with the empty scoop, then scoop; HOLD keeps the reading on
screen. Mention MODE only once it's confirmed what it switches.

Value line: "A spoon with a display: measure coffee, tea and baking as you
scoop." Practical, precise, understated. No numbers beyond capacity.

### Claims to avoid
Accurate, precise to 0.1 g, "lab-grade", "professional", calibrated,
nutrition, portion control, diet or weight-loss support, battery life,
waterproof, "replaces your scale".

### Reference checklist
- [ ] Oval black scoop, silver-white handle with black underside, display and black button pad match the photo
- [ ] "MODE", "TARE" and "HOLD" printed exactly as in the reference, nothing else
- [ ] Triangular button pad and hanging hole as in the reference; no box shown
- [ ] Display shows a real captured reading, or is off
- [ ] Printing on the handle only as in the reference
- [ ] The 300 g and 500 g versions look as their photos show (don't assume they're identical)

---

## 5. Electric Dish Scrubber

**Reference photos: 5 received**: green, white and pink on white, green in
use and green with measurements (no overlay text). All three colours are
covered. It is a compact handheld device, 22.4 cm tall with an 11.9 cm
body: show it at true scale in a hand. Don't invent extension handles, stands, extra heads beyond
the two shown, IPX ratings, RPM or battery life.

### What the photo confirms
- Size: 22.4 cm tall, body 11.9 cm long (8.82 × 4.69 in).
- Shaped like a small hair dryer: a round motor body with a straight handle
  below it, in soft sage green, white or pale pink, always with a thin grey
  band around the body.
- A round head at the front of the body, fitted here with a sponge pad
  (yellow sponge, green scouring layer) on a black mount.
- A second, detachable head: a round white-bristle brush on a black disc
  with a push-in pin.
- A grey ribbed tip with a hanging loop at the end of the handle.
- Two round controls on the flat back of the body, a small red mark on the
  top back, and a small dot low on the front of the handle. What each one
  does, and where it charges, isn't clear yet: show them only as in the
  reference and don't describe them until the listing confirms.
- In use (reference): brush head face-down in a steel bowl with suds, held
  by the handle like a hair dryer.

### Creative brief
A small handheld powered scrubber for dishes, sinks and small surfaces. The
WEDRA angle: *the small help at the sink.* For people who cook daily and
want the washing-up to be less of a chore. Colours: White, Green, Pink.

### Product lock (from the reference photo, green)
```
A small handheld electric scrubber shaped like a compact hair dryer: a
round motor body in matte {sage green | white | pale pink} with a thin grey
band, two round controls on the flat back, a straight
handle below it ending in a grey ribbed tip with a hanging loop; at the
front a round black mount holding either a round sponge pad (yellow sponge
with a green scouring layer) or a round white-bristle brush head, exactly
as in the reference. Button and charging port only as in the reference.
No printing or logo.
```

### Hero direction
The scrubber in profile on warm white, sponge head fitted, the brush head
lying beside it, small in the frame to show its real scale, with a folded
linen cloth. Clean, fresh, quiet.

### Seven images
| # | Direction |
| --- | --- |
| 1 Hero | As above, in green (white and pink as colour images) |
| 2 Alternate | Brush head fitted, three-quarter view from the front |
| 3 Lifestyle | Bright sink, hand holding it like a hair dryer, brush head face-down in a steel bowl with suds, as in the in-use reference |
| 4 Detail | The two heads side by side: sponge pad and bristle brush |
| 5 Use case | Sponge head on a plate with suds; companion frame: brush head along the sink edge (no before/after dirt claims) |
| 6 Collection | Green, white and pink in a row on stone, sponge heads fitted |
| 7 Mobile | Hand holding it at the centre of a tall sink scene |

### Five Reels / TikTok concepts
| # | Hook | First 1–2 s | Shot list and action | Voiceover | Caption | CTA | Runtime |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | "Compact. Powered. At the sink." | Button press, head starts spinning | 1 press · 2 pan edge · 3 mug rim · 4 rinse · 5 end card | "Press, scrub, rinse." | "A compact powered scrubber for the sink." | Discover it | 15 s |
| 2 | "The washing-up, a little easier" | Stack of dishes, hand picks up scrubber | 1 stack · 2 plate · 3 pan · 4 rack · 5 end card | "For the everyday washing-up." | "The small help at the sink." | See the find | 20 s |
| 3 | "Sponge or brush. Click and swap." | Hand pulls off the sponge head | 1 sponge off · 2 brush pushed on · 3 brush along the sink edge · 4 hung by its loop · 5 end card | "Sponge for plates. Brush for the sink." | "Two heads, one small scrubber." | Worth a look | 18 s |
| 4 | "Three colours for your sink" | White, green, pink in a row | 1 row · 2 each in a hand · 3 in use · 4 end card | None | "White, green or pink." | Find it at WEDRA | 15 s |
| 5 | "WEDRA found: a scrubber that does the scrubbing" | Slow turn on warm white | 1 turn · 2 head macro · 3 button · 4 pan · 5 sink wide · 6 end card | "Handheld and powered. Found by WEDRA." | "Found: the small help at the sink." | Explore the discovery | 25 s |

Show only real results filmed in one take. No sped-up cleaning presented as
real time, and no before/after grime reveals.

### Hooks
1. Compact. Powered. At the sink.
2. The washing-up, a little easier.
3. Held like a hair dryer, one hand.
4. Sponge or brush. Click and swap.
5. Found: the small help at the sink.

### Captions
1. A compact powered scrubber that hangs by the sink. Press, scrub, rinse. Found by WEDRA.
2. Sponge head for plates, brush head for the sink. White, green or pink. Link in bio.
3. The small help at the sink. Sponge or brush, one hand.

### Website placement and mobile
- Gallery: hero, in-hand scale, use case, head detail, one per colour.
- Highlights: Handheld · Powered · Sponge and brush heads · Hanging loop, plus the capacity variant (as
  confirmed, in the specifications, not the headline).
- Mobile: colour swatches first, capacity pills second.

### Product-page copy direction
Value line: "A compact handheld scrubber with a sponge and a brush head, for the everyday washing-up."
Keep it modest and domestic. Say "compact" and "handheld" plainly; they set the right
expectation.

### Claims to avoid
Waterproof, IPX7 or any rating, RPM or speed, battery life or minutes per
charge, "deep clean", "removes 99%", antibacterial or hygienic, "no more
scrubbing", heavy-duty grout or grill cleaning, extra heads or extension
handles, heads other than the sponge and brush shown, anything implied by "800 mA / 1200 mA" beyond the
confirmed spec.

### Reference checklist
- [ ] Size in the hand matches the listing (22.4 cm tall, body 11.9 cm)
- [ ] Two round controls on the back; controls shown only as in the reference
- [ ] Head, bristles, button and charging method as in the photos
- [ ] Only the sponge head and brush head shown; no extension handle
- [ ] Grey band, ribbed tip and hanging loop as in the reference
- [ ] Each colour from its own photo
- [ ] No sped-up or staged "before/after"

---

## 6. Mini Bag Sealer

**Reference photos: 10 received, covering all four colours** (black, light
gray, pink, white), measurements, charging and how to use it. Most are
collages with the partner's text, icons, tick marks, other brands'
packaging and a before/after layout. Use them as a **shape reference
only**: never reuse a crop that shows their text, icons or another brand's
bag. The four-colour photo is the colour reference.

### What the photos confirm
- Size: 10.9 × 3.3 × 2.8 cm (4.3 × 1.3 × 1.1 in).
- A rounded-rectangle clip in one colour. The upper arm is hinged at one
  end and closes onto the base.
- A small beige knurled heating pad on the base at the open end.
- A small round button on top of the base at the hinge end, with a small
  blue light beside it (a red light shows while charging).
- A built-in cutter at the hinge end: a small hooked blade that opens bags.
- The back has a dark magnetic panel held by two screws (shown on the gray
  one), so it sticks to a fridge.
- USB rechargeable: a small port on the end of the base, below the button
  (shown charging from a cable and a power bank).
- How it's used: switch on, hold the jaw closed a few seconds to warm up,
  then pull it slowly and steadily along the top of the bag.
- Suitable for plastic snack and storage bags. The partner lists thin bags,
  paper, kraft and foil bags as **not suitable**.
- Safety notes from the partner: don't touch the heating pad, don't heat for
  long, keep away from children.

### Creative brief
A pocket-size clip that seals opened plastic snack bags with heat, and opens
them with a small built-in cutter. It sticks to the fridge. The WEDRA angle:
*close the bag, keep the drawer tidy.* For snack drawers, pantry organisers
and anyone with a drawer full of clips. Colours: White, Pink, Gray, Black.

### Product lock (from the reference photos, white)
```
A small handheld bag sealer, 10.9 cm long, 3.3 cm wide and 2.8 cm tall,
shaped like a rounded rectangular clip in matte {white | light gray | pink
| black}. An upper arm hinged at one end closes onto the base; on the base
at the open end a small beige knurled heating pad; on top of the base at
the hinge end a small round button with a tiny blue light beside it; a
small hooked cutting blade at the hinge end; a small charging port on the
end of the base below the button; a dark rectangular magnet panel held by
two screws on the back, all exactly as in the reference. The heating pad is
beige in every colour. No printing or logo anywhere.
```
- Show the blue light only when the button is pressed, and only as small as
  in the reference.
- Never show the blade touching fingers. Hands hold the body, never the
  heating strip.

### Hero direction
The sealer lying top-down on warm white, the button and blue light facing
the camera, beside a neatly closed, clear plastic snack bag with no brand.
Tidy, graphic and calm.

### Seven images
| # | Direction |
| --- | --- |
| 1 Hero | As above, top-down, soft shadow |
| 2 Alternate | Standing on end, arm slightly open to show the heating strip |
| 3 Lifestyle | The sealer on the fridge door (magnet side) beside a plain note, a pantry shelf soft in the background |
| 4 Detail | Macro of the jaw: heating strip and knurled pad, the button and blue light |
| 5 Use case | Hands pressing it on the top edge of an unbranded plastic snack bag and sliding it along; companion frame: the cutter opening the bag |
| 6 Collection | The four colours in a row on linen, arms slightly open, matching the four-colour reference |
| 7 Mobile | Hand with the sealer mid-slide on an unbranded bag, tall pantry backdrop |

Props: plain, unbranded plastic snack or storage bags only. No other brands'
packaging, no foil, kraft or paper bags (the partner lists them as not
suitable), no raw meat, and no before/after split.

### Five Reels / TikTok concepts
| # | Hook | First 1–2 s | Shot list and action | Voiceover | Caption | CTA | Runtime |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | "Close the bag. Properly." | Sealer slides along a bag top | 1 switch on, blue light · 2 hold closed a moment · 3 slow slide along the top · 4 close-up of the sealed edge · 5 bag into the drawer · 6 end card | "Switch on, hold, slide. Closed." | "Close the bag, properly." | Discover it | 15 s |
| 2 | "Seal it. Or cut it open." | The cutter opens a sealed bag | 1 cutter opens the bag · 2 snack out · 3 press and slide to reseal · 4 sealer onto the fridge · 5 end card | "It opens the bag, and it closes it again." | "Seal it, or cut it open. Same clip." | See the find | 18 s |
| 3 | "No more clips in the drawer" | Drawer of mismatched clips | 1 clips · 2 swap for the sealer · 3 slide · 4 tidy drawer · 5 end card | "One small sealer instead." | "Swap the clips." | Worth a look | 18 s |
| 4 | "It lives on the fridge" | Sealer clicks onto the fridge door | 1 magnet on the fridge · 2 take it off · 3 seal a snack bag · 4 back on the fridge · 5 end card | "Right where you need it." | "It lives on the fridge." | Find it at WEDRA | 15 s |
| 5 | "WEDRA found: the tiny bag sealer" | Sealer turns on warm white | 1 turn · 2 heating-strip macro · 3 button and light · 4 slide · 5 cutter · 6 fridge · 7 end card | "Seals, opens, sticks to the fridge. Found by WEDRA." | "Found: the tiny bag sealer." | Explore the discovery | 25 s |

Film real seals only: the sealed edge on screen must come from the product,
in one take.

### Hooks
1. Close the bag. Properly.
2. Seal it. Or cut it open.
3. Swap the clips.
4. It lives on the fridge.
5. Found: the tiny bag sealer.

### Captions
1. Press, slide, closed. A tiny sealer for opened snack bags, with a cutter to open them again. Found by WEDRA.
2. Swap the drawer of clips for one small sealer that sticks to the fridge. Link in bio.
3. Seal it, or cut it open. White, pink, gray or black.

### Website placement and mobile
- Gallery: hero, use case (slide), heating-strip detail, cutter frame, fridge
  lifestyle, then one image per colour (only colours with photos).
- Highlights: Seals plastic bags · Built-in cutter · Magnetic back ·
  USB rechargeable · 10.9 × 3.3 × 2.8 cm.
- How to use (details tab): "Switch it on, hold the jaw closed on the bag
  for a few seconds, then pull it slowly along the top."
- Specifications (verified only): "Works with: plastic snack and storage
  bags" and "Not for: thin, paper, kraft or foil bags".
- Safety line in the details tab, as supplied: "The heating strip gets hot.
  Don't touch it, don't hold the sealer closed for long, and keep it away
  from children."
- Mobile: four colour swatches ("Black", never "Black W159"), with the video
  (concept 2) straight after the tabs.

### Product-page copy direction
Value line: "A small clip that seals opened snack bags, opens them with a
built-in cutter and sticks to the fridge." Light, tidy, a little playful,
still WEDRA-calm. Be clear which bags it works with, so expectations match.

### Claims to avoid
"Keep food fresh", airtight, vacuum, freshness for X days, "suitable for any
bag", temperature figures, seconds to seal, seals per charge, battery
capacity (the partner's "400 mAh") or battery life, "no worries about
leaking batteries", exact warm-up seconds as a promise, "strong heating",
"sharp blade", food safety, child-safe. Never show meat, fresh produce in a
bag, or before/after splits. Never show other brands' packaging.

### Reference checklist
- [ ] Clip shape, hinge, beige heating pad, button and blue light at the hinge end, cutter and end port exactly as in the photos
- [ ] True size: about the length of a palm (10.9 cm)
- [ ] Magnet panel with two screws on the back when the back is shown
- [ ] Colour matches the four-colour reference (gray is a light gray, not silver)
- [ ] Bags are plain, unbranded plastic; no foil, kraft or paper
- [ ] No partner text, icons, ticks or before/after layout
- [ ] Sealed edge is a real result filmed in one take
- [ ] Fingers never on the heating strip or blade

---

## 7. Next steps (owner)

1. Send the fulfilment partner's photos for the Oil Sprayer in Black,
   Green, Yellow and the 2 pc pack, and a clear view of the Dish
   Scrubber's charging port.
2. Confirm from the listing: the scrubber's 800 / 1200 figure and how it
   charges; whether the spoon's two sizes look the
   same, whether batteries come in the box, and what MODE switches.
3. Pick the next discovery for when the blender reaches $10K. Then the
   seven images and five videos are produced for that one product only, and
   the theme changes in section 1 are made at launch.
