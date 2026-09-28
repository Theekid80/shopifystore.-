// WEDRA organic creative production library: 6 videos per product (V1–V6),
// 30 in total, rendered by production.mjs. Builds on social-content.mjs (the
// launch package T01–T20 / R01–R10 / F01–F12 stays as it is).
//
// Every video follows the same beat sheet, with the product on screen from
// the first frame:
//   0–2 s hook + product · 2–7 s demonstration · 7–15 s use case ·
//   15–25 s payoff · final WEDRA card with a subtle CTA.
// Openings, movement, backgrounds, pacing and endings vary per V-type.
import { cap, ed, st, pair, card, end, P, LIFE_DRINK } from "./social-content.mjs";
import { pathToFileURL } from "node:url";
import path from "node:path";

const HERE = path.dirname(new URL(import.meta.url).pathname);
const ph = (f) => pathToFileURL(path.join(HERE, "photos", f)).href;
const X = { bSquare: ph("studio.jpg"), bsBlack: ph("sealer/black.png"), bsGray: ph("sealer/gray.png"), bsPink: ph("sealer/pink.png") };

export const CODES = { blender: "BL", oil: "OS", spoon: "MS", sealer: "BS", scrubber: "SS" };
export const WEEK = { blender: 1, oil: 2, spoon: 2, sealer: 3, scrubber: 3 };

// V-type = the hook family, with its pacing (crossfade, s) and ending.
export const TYPES = {
  V1: { name: "I wasn't looking for this. Then I found it.", angle: "Curiosity / personal discovery", xf: 0.18, end: ["Found for your everyday.", "Discover it at wedra.co"] },
  V2: { name: "You probably didn't know you needed this.", angle: "Everyday upgrade", xf: 0.26, end: ["Products worth discovering.", "Found on WEDRA."] },
  V3: { name: "Okay... why did nobody show me this sooner?", angle: "Surprise / reaction", xf: 0.1, end: ["Discover better.", "See the full discovery at wedra.co"] },
  V4: { name: "Problem → solution", angle: "Small problem, simple fix", xf: 0.2, end: ["Products worth discovering.", "Discover it at wedra.co"] },
  V5: { name: "Pure demonstration / satisfying", angle: "Show, don't tell", xf: 0.06, end: ["Products worth discovering.", "wedra.co"] },
  V6: { name: "WEDRA Discovery / editorial", angle: "Premium brand discovery", xf: 0.5, end: ["Found for your everyday.", "Discover better at wedra.co"] },
};

const fin = (p, t) => end(`WEDRA Discovery #0${["blender", "oil", "spoon", "sealer", "scrubber"].indexOf(p) + 1}`, TYPES[t].end[1], TYPES[t].end[0]);
const d = (s, dur) => ({ ...s, dur }); // set a scene's length
const pan = (s, from, to) => ({ ...s, pan: [from, to] });

// ---------- Shot lists for filming the same videos with the real product ----------
// The rendered videos are built from product photography. Filmed versions of
// the same scripts (phone, natural light, real hands) usually feel more native;
// these shot lists keep the product exactly as it is.
const SET = {
  blender: "a sunny kitchen counter or balcony table, fresh strawberries and banana, a short glass",
  oil: "a stovetop with a pan, a salad bowl and an air-fryer basket, warm kitchen light",
  spoon: "a coffee station (bean bag, grinder, cup), a flour jar and a spice tin",
  sealer: "an opened, unbranded plastic snack bag, a light oak table, the fridge door",
  scrubber: "a stainless sink, a used pan, a bowl, a little dish soap",
};
const FILM = {
  V1: (p) => `Handheld, first person. 0–2 s: reach into frame and pick the product up from ${SET[p]}; on-screen hook. 2–7 s: first use, one continuous take. 7–15 s: two quick everyday moments. 15–25 s: the finished result, held steady. End on the product set down, then the WEDRA card.`,
  V2: (p) => `Tripod at counter height. 0–2 s: product already in frame, hook on screen. 2–7 s: close-up of the one feature that surprises (buttons, cap, head, cutter). 7–15 s: three short cuts of real use in ${SET[p]}. 15–25 s: slow push-in on the product at rest. End card.`,
  V3: (p) => `Fast and reactive. 0–2 s: over-the-shoulder, product in hand, hook text. Then 1–1.5 s cuts: each cut reveals one feature with a single on-screen word. Keep camera moves snappy (whip pans or hard cuts). Final 3 s: product centred on ${SET[p]}. End card.`,
  V4: (p) => `0–2 s: the small everyday problem with the product visible in the corner of frame. 2–7 s: the product solves it in one take. 7–15 s: the same fix in two more situations around ${SET[p]}. 15–25 s: calm result shot. End card.`,
  V5: (p) => `No talking, minimal text. Locked-off macro and top-down shots, one action per shot (press, spray, spin, seal, scoop), 1–2 s each, on ${SET[p]}. Cut on the action. Keep the product's real sound (button click, spray, motor). End card.`,
  V6: (p) => `Editorial. Slow gimbal or tripod slides, soft window light, shallow depth of field, neutral stone and oak surfaces. 3 s per shot: product hero, detail, one elegant use in ${SET[p]}, product at rest. Serif titles only. End card.`,
};

// Wide cut-outs (sealer, spoon) get a lower height so they fit the 9:16 width.
const WIDE = { [P.sFull]: "19%", [P.bsColours]: "27%", [P.bsWhite]: "30%", [P.bsSide]: "29%", [X.bsBlack]: "30%", [X.bsGray]: "30%", [X.bsPink]: "30%" };
const fit = (s) => (s.kind === "studio" && WIDE[s.image] ? { ...s, height: WIDE[s.image] } : s);

// ---------- 30 videos ----------
const V = (product, type, o) => ({ product, type, id: `${CODES[product]}-${type}`, ...o, scenes: [...o.scenes, fin(product, type)] });

export const PRODUCTION = [
  // ===== #01 Portable Electric Juicer Blender (week 1) =====
  V("blender", "V1", {
    hook: "I wasn't looking for this. Then I found it.",
    scenes: [
      d(pan(cap(P.bLife, "I wasn't looking for this.\nThen I found it.", { at: "top" }), "38% 50%", "52% 50%"), 2.6),
      d(st(P.bStudio, { style: "caption", text: "A blender shaped like a bottle.", at: "top" }), 2.6),
      d(cap(P.bLife, "Fruit in. Press to blend.", { pos: "50% 60%", zoom: [1.12, 1.24], at: "low" }), 2.6),
      d(cap(P.bLife, "One drink at a time.", { ...LIFE_DRINK, at: "low" }), 2.6),
      d(st(P.bCharge, { style: "caption", text: "Charges by cable.", at: "top" }), 2.4),
      d(pair(P.bStudio, P.bPink, { text: "White or pink." }), 2.8),
    ],
    caption: "Not what I went looking for, but it stayed. A 350 ml rechargeable blender shaped like a bottle, for one smoothie at a time.",
    alt: ["I didn't plan on keeping this on my counter.", "Found this while looking for something else."],
  }),
  V("blender", "V2", {
    hook: "You probably didn't know you needed this.",
    scenes: [
      d(st(P.bPink, { style: "caption", text: "You probably didn't know\nyou needed this.", at: "top", tone: "stone" }), 2.8),
      d(st(P.bStudio, { eyebrow: "350 ml · Rechargeable", text: "Portable blender", zoom: [1.0, 1.1] }), 2.6),
      d(cap(P.bLife, "Fruit in.", { pos: "45% 62%", zoom: [1.3, 1.4], at: "low" }), 2.2),
      d(cap(P.bLife, "Smoothie for one.", { ...LIFE_DRINK, at: "low" }), 2.6),
      d(st(P.bCharge, { style: "caption", text: "USB or magnetic charging.", at: "top" }), 2.6),
      d(pan(cap(P.bLife, "Balcony. Desk. Day bag.", { at: "low" }), "60% 50%", "42% 50%"), 2.8),
    ],
    caption: "The small blender for one drink at a time. Choose USB or magnetic charging, in white or pink.",
    alt: ["The blender that fits in a tote.", "Your morning smoothie, minus the big blender."],
  }),
  V("blender", "V3", {
    hook: "Okay... why did nobody show me this sooner?",
    scenes: [
      d(cap(P.bLife, "Okay... why did nobody\nshow me this sooner?", { pos: "50% 55%", zoom: [1.2, 1.0], at: "top" }), 2.4),
      d(st(P.bStudio, { style: "caption", text: "It's a blender.", at: "top" }), 1.7),
      d(st(P.bPink, { style: "caption", text: "Shaped like a bottle.", at: "top", tone: "stone" }), 1.7),
      d(cap(P.bLife, "Blend right in it.", { ...LIFE_DRINK, at: "low" }), 2.0),
      d(st(P.bCharge, { style: "caption", text: "Recharge. Repeat.", at: "top" }), 1.9),
      d(pan(cap(P.bLife, "Breakfast outside, sorted.", { at: "low" }), "45% 50%", "58% 50%"), 2.4),
      d(pair(P.bStudio, P.bPink, { text: "Pick your colour." }), 2.4),
    ],
    caption: "It blends right in the bottle, it recharges, and it fits in a bag. 350 ml, white or pink.",
    alt: ["Wait, it's a blender?", "Why is this blender shaped like a bottle?"],
  }),
  V("blender", "V4", {
    hook: "A full-size blender for one smoothie?",
    scenes: [
      d(st(P.bStudio, { style: "caption", text: "A full-size blender\nfor one smoothie?", at: "top" }), 2.6),
      d(st(P.bPink, { style: "caption", text: "There's a smaller way.", at: "top" }), 2.4),
      d(cap(P.bLife, "Blend it in the bottle.", { ...LIFE_DRINK, at: "low" }), 2.8),
      d(cap(P.bLife, "Room to spare on the table.", { pos: "50% 50%", zoom: [1.0, 1.08], at: "low" }), 2.6),
      d(st(P.bCharge, { style: "caption", text: "Charges by cable.\nBlends cordless.", at: "top" }), 2.6),
      d(pair(P.bStudio, P.bPink, { eyebrow: "350 ml", text: "White or pink." }), 2.8),
    ],
    caption: "For one smoothie, a small blender makes more sense. 350 ml, rechargeable, blends right in the bottle.",
    alt: ["Still getting the big blender out for one drink?", "One smoothie shouldn't need the big blender."],
  }),
  V("blender", "V5", {
    hook: "Portable blender.",
    scenes: [
      d(cap(P.bLife, "Portable blender.", { pos: "48% 60%", zoom: [1.35, 1.2], at: "low" }), 1.8),
      d(st(P.bStudio, { zoom: [1.0, 1.14] }), 1.4),
      d(st(P.bPink, { zoom: [1.14, 1.0], tone: "stone" }), 1.4),
      d(st(P.bCharge, { style: "caption", text: "Charge.", at: "top", zoom: [1.0, 1.12] }), 1.5),
      d(cap(P.bLife, "Blend.", { pos: "48% 72%", zoom: [1.55, 1.7], at: "low" }), 1.6),
      d(pan(cap(P.bLife, ""), "30% 50%", "62% 50%"), 1.8),
      d(st(X.bSquare, { zoom: [1.0, 1.1] }), 1.4),
      d(cap(P.bLife, "Pour.", { ...LIFE_DRINK, at: "low" }), 1.8),
      d(pair(P.bStudio, P.bPink, {}), 1.8),
    ],
    caption: "Charge, blend, go.",
    alt: ["Just the blender.", "Watch this one start to finish."],
  }),
  V("blender", "V6", {
    hook: "WEDRA Discovery #01.",
    scenes: [
      d(ed(P.bLife, "Found for\nyour everyday.", { eyebrow: "WEDRA Discovery #01" }), 3.2),
      d(st(P.bStudio, { eyebrow: "350 ml · Rechargeable", text: "Portable blender" }), 3.0),
      d(ed(P.bLife, "One drink\nat a time.", LIFE_DRINK), 3.0),
      d(st(P.bCharge, { eyebrow: "USB or magnetic", text: "Charges by cable." }), 3.0),
      d(pair(P.bStudio, P.bPink, { eyebrow: "Two colours", text: "White. Pink." }), 3.0),
    ],
    caption: "WEDRA Discovery #01: a compact, rechargeable blender for one smoothie or shake at a time.",
    alt: ["The first WEDRA discovery.", "Discovery #01, up close."],
  }),

  // ===== #02 Versatile Oil Sprayer (week 2) =====
  V("oil", "V1", {
    hook: "I wasn't looking for this. Then I found it.",
    scenes: [
      d(cap(P.oLife, "I wasn't looking for this.\nThen I found it.", { pos: "50% 60%", at: "top" }), 2.6),
      d(cap(P.oMist, "Squeeze: a fine mist.", { pos: "40% 55%", at: "low" }), 2.4),
      d(cap(P.oPour, "Tip: a steady pour.", { at: "low" }), 2.4),
      d(pan(cap(P.oLife, "Pan, salad, air fryer.", { at: "low" }), "35% 60%", "60% 60%"), 2.8),
      d(cap(P.oRefill, "Fill it with oil or vinegar.", { at: "low" }), 2.6),
      d(cap(P.oCap, "One cap does both.", { pos: "50% 40%", at: "low" }), 2.6),
    ],
    caption: "The oil bottle I didn't know I wanted: spray for the pan, pour for the salad. 470 ml glass.",
    alt: ["Found this for the oil by the stove.", "Didn't expect an oil bottle to change anything."],
  }),
  V("oil", "V2", {
    hook: "You probably didn't know you needed this.",
    scenes: [
      d(cap(P.oCap, "You probably didn't know\nyou needed this.", { pos: "50% 40%", zoom: [1.1, 1.0], at: "low" }), 2.8),
      d(cap(P.oMist, "It sprays.", { pos: "40% 50%", at: "low" }), 2.2),
      d(cap(P.oPour, "It pours.", { at: "low" }), 2.2),
      d(cap(P.oRefill, "470 ml glass.", { at: "low", zoom: [1.0, 1.12] }), 2.4),
      d(pan(cap(P.oLife, "Roasting tray. Grill. Salad.", { at: "low" }), "60% 60%", "35% 60%"), 2.8),
      d(ed(P.oCap, "Four colours.\nOne or a set of two.", { pos: "50% 40%" }), 2.8),
    ],
    caption: "A glass oil bottle with a spray and a pour spout in one cap. In beige, green, yellow or black, single or a set of two.",
    alt: ["The bottle that does two jobs.", "Your oil bottle could do more."],
  }),
  V("oil", "V3", {
    hook: "Okay... why did nobody show me this sooner?",
    scenes: [
      d(cap(P.oMist, "Okay... why did nobody\nshow me this sooner?", { pos: "40% 55%", zoom: [1.2, 1.0], at: "top" }), 2.4),
      d(cap(P.oMist, "It sprays.", { pos: "35% 40%", zoom: [1.4, 1.5], at: "low" }), 1.6),
      d(cap(P.oPour, "It pours.", { pos: "50% 45%", zoom: [1.3, 1.4], at: "low" }), 1.6),
      d(cap(P.oCap, "Same cap.", { pos: "50% 40%", at: "low" }), 1.6),
      d(cap(P.oLife, "Same bottle.", { pos: "50% 60%", at: "low" }), 1.6),
      d(cap(P.oRefill, "Glass. 470 ml.", { at: "low" }), 2.0),
      d(pan(cap(P.oLife, "Pan to salad in one move.", { at: "low" }), "30% 60%", "62% 60%"), 2.6),
    ],
    caption: "Spray and pour from the same bottle. Why was this not the default?",
    alt: ["Wait, it pours too?", "One cap. Two ways. Why not sooner?"],
  }),
  V("oil", "V4", {
    hook: "Oil straight from the bottle?",
    scenes: [
      d(cap(P.oPour, "Oil straight\nfrom the bottle?", { pos: "50% 35%", at: "low" }), 2.6),
      d(cap(P.oMist, "A fine mist instead.", { pos: "40% 55%", at: "low" }), 2.6),
      d(cap(P.oPour, "Or a thin, steady pour.", { at: "low" }), 2.6),
      d(pan(cap(P.oLife, "For the pan and the salad.", { at: "low" }), "40% 60%", "58% 60%"), 2.8),
      d(cap(P.oRefill, "Refill with oil or vinegar.", { at: "low" }), 2.6),
      d(ed(P.oLife, "Spray or pour.\nSame bottle.", { pos: "50% 60%" }), 2.8),
    ],
    caption: "Control how the oil goes on: a fine mist for the pan, a thin pour for the salad. Same glass bottle.",
    alt: ["Glugging oil from the bottle?", "The pan doesn't need half the bottle."],
  }),
  V("oil", "V5", {
    hook: "Spray.",
    scenes: [
      d(cap(P.oMist, "Spray.", { pos: "40% 50%", zoom: [1.25, 1.1], at: "low" }), 1.6),
      d(cap(P.oCap, "", { pos: "50% 40%", zoom: [1.0, 1.15] }), 1.4),
      d(cap(P.oPour, "Pour.", { pos: "50% 40%", zoom: [1.2, 1.35], at: "low" }), 1.6),
      d(pan(cap(P.oLife, ""), "30% 60%", "55% 60%"), 1.6),
      d(cap(P.oRefill, "Refill.", { zoom: [1.3, 1.1], at: "low" }), 1.6),
      d(cap(P.oMist, "", { pos: "35% 42%", zoom: [1.5, 1.6] }), 1.4),
      d(cap(P.oPour, "", { pos: "50% 70%", zoom: [1.1, 1.25] }), 1.4),
      d(cap(P.oLife, "Repeat.", { pos: "50% 60%", at: "low" }), 1.8),
    ],
    caption: "Spray, pour, refill.",
    alt: ["Just the spray.", "Mist, then pour."],
  }),
  V("oil", "V6", {
    hook: "WEDRA Discovery #02.",
    scenes: [
      d(ed(P.oLife, "Spray or pour.\nSame bottle.", { eyebrow: "WEDRA Discovery #02", pos: "50% 60%" }), 3.2),
      d(ed(P.oCap, "One cap.\nTwo ways.", { pos: "50% 40%" }), 3.0),
      d(ed(P.oMist, "A fine mist\nfor the pan.", { pos: "40% 55%" }), 3.0),
      d(ed(P.oPour, "A thin pour\nfor the salad."), 3.0),
      d(ed(P.oRefill, "470 ml glass.", { eyebrow: "Beige · Green · Yellow · Black" }), 3.0),
    ],
    caption: "WEDRA Discovery #02: a 470 ml glass bottle that sprays or pours from the same cap.",
    alt: ["Discovery #02, up close.", "The kitchen bottle, reconsidered."],
  }),

  // ===== #03 Digital Measuring Spoon (week 2) =====
  V("spoon", "V1", {
    hook: "I wasn't looking for this. Then I found it.",
    scenes: [
      d(st(P.sRice, { style: "caption", text: "I wasn't looking for this.\nThen I found it.", at: "top" }), 2.8),
      d(st(P.sEmpty, { style: "caption", text: "Zero the empty scoop.", at: "top" }), 2.4),
      d(st(P.sRice, { style: "caption", text: "Scoop. Read the weight.", at: "top", zoom: [1.0, 1.12] }), 2.6),
      d(st(P.sButtons, { style: "caption", text: "Mode. Tare. Hold.", at: "top", tone: "stone" }), 2.4),
      d(st(P.sFull, { style: "caption", text: "Coffee, tea, spices, baking.", at: "low", h: "22%" }), 2.8),
      d(st(P.sEmpty, { eyebrow: "Up to 300 g or 500 g", text: "Measure as you scoop." }), 2.8),
    ],
    caption: "A measuring spoon with a scale in the handle. Scoop and read the weight in one step.",
    alt: ["Found the spoon that weighs.", "Didn't know spoons came with screens."],
  }),
  V("spoon", "V2", {
    hook: "You probably didn't know you needed this.",
    scenes: [
      d(st(P.sFull, { style: "caption", text: "You probably didn't know\nyou needed this.", at: "low", h: "22%", zoom: [1.12, 1.0] }), 2.8),
      d(st(P.sButtons, { style: "caption", text: "Tare zeroes it.", at: "top", tone: "stone" }), 2.4),
      d(st(P.sRice, { style: "caption", text: "Scoop.", at: "top" }), 2.0),
      d(st(P.sRice, { style: "caption", text: "Read it on the handle.", at: "top", zoom: [1.2, 1.35] }), 2.6),
      d(st(P.sEmpty, { style: "caption", text: "The scale stays in the drawer.", at: "top" }), 2.6),
      d(st(P.sButtons, { eyebrow: "Coffee · Tea · Baking", text: "One step, not two.", tone: "ivory" }), 2.8),
    ],
    caption: "Scoop your coffee, flour or spices and read the weight right on the handle. Up to 300 g or 500 g.",
    alt: ["The kitchen scale, but a spoon.", "Measure coffee in one move."],
  }),
  V("spoon", "V3", {
    hook: "Okay... why did nobody show me this sooner?",
    scenes: [
      d(st(P.sEmpty, { style: "caption", text: "Okay... why did nobody\nshow me this sooner?", at: "top", zoom: [1.16, 1.0] }), 2.4),
      d(st(P.sFull, { style: "caption", text: "It's a spoon.", at: "low", h: "22%" }), 1.7),
      d(st(P.sButtons, { style: "caption", text: "It's a scale.", at: "top", tone: "stone" }), 1.7),
      d(st(P.sRice, { style: "caption", text: "It's both.", at: "top" }), 1.8),
      d(st(P.sButtons, { style: "caption", text: "Hold keeps the reading.", at: "top", zoom: [1.1, 1.22] }), 2.2),
      d(st(P.sRice, { style: "caption", text: "Coffee, measured in one move.", at: "top", zoom: [1.0, 1.1], tone: "stone" }), 2.4),
      d(st(P.sFull, { eyebrow: "Up to 300 g or 500 g", text: "Measure as you scoop.", h: "22%" }), 2.4),
    ],
    caption: "A spoon and a scale in one. Tare, scoop, read. Why isn't every measuring spoon like this?",
    alt: ["Wait, the spoon has a screen?", "A spoon that tells you the weight."],
  }),
  V("spoon", "V4", {
    hook: "Scoop, tip onto the scale, repeat?",
    scenes: [
      d(st(P.sRice, { style: "caption", text: "Scoop, tip onto the scale,\nrepeat?", at: "top" }), 2.8),
      d(st(P.sFull, { style: "caption", text: "Measure as you scoop.", at: "low", h: "22%" }), 2.4),
      d(st(P.sEmpty, { style: "caption", text: "Tare the empty spoon.", at: "top" }), 2.4),
      d(st(P.sRice, { style: "caption", text: "Add until it reads right.", at: "top", zoom: [1.0, 1.14] }), 2.6),
      d(st(P.sButtons, { style: "caption", text: "Coffee. Tea. Baking.", at: "top", tone: "stone" }), 2.4),
      d(st(P.sEmpty, { eyebrow: "WEDRA Discovery #03", text: "One tool. One step." }), 2.8),
    ],
    caption: "Stop moving ingredients between spoon and scale. Tare the spoon, scoop, read the weight.",
    alt: ["Still weighing coffee on a big scale?", "Two tools for one scoop?"],
  }),
  V("spoon", "V5", {
    hook: "Tare.",
    scenes: [
      d(st(P.sButtons, { style: "caption", text: "Tare.", at: "top", zoom: [1.25, 1.1], tone: "stone" }), 1.6),
      d(st(P.sEmpty, { zoom: [1.0, 1.14] }), 1.4),
      d(st(P.sRice, { style: "caption", text: "Scoop.", at: "top", zoom: [1.1, 1.0] }), 1.6),
      d(st(P.sRice, { zoom: [1.3, 1.45] }), 1.4),
      d(st(P.sFull, { style: "caption", text: "Read.", at: "low", h: "22%" }), 1.6),
      d(st(P.sButtons, { style: "caption", text: "Hold.", at: "top", zoom: [1.0, 1.18] }), 1.6),
      d(st(P.sEmpty, { tone: "stone", zoom: [1.14, 1.0] }), 1.4),
      d(st(P.sRice, { zoom: [1.0, 1.08] }), 1.6),
    ],
    caption: "Tare, scoop, read, hold.",
    alt: ["Just the spoon.", "Scoop and read."],
  }),
  V("spoon", "V6", {
    hook: "WEDRA Discovery #03.",
    scenes: [
      d(st(P.sFull, { eyebrow: "WEDRA Discovery #03", text: "Measure as\nyou scoop.", h: "22%" }), 3.2),
      d(st(P.sRice, { eyebrow: "Coffee · Tea · Spices", text: "Scoop. Read. Pour." }), 3.0),
      d(st(P.sButtons, { eyebrow: "Mode · Tare · Hold", text: "Three buttons.", tone: "stone" }), 3.0),
      d(st(P.sEmpty, { eyebrow: "Up to 300 g or 500 g", text: "The scale in\nthe handle." }), 3.0),
      d(card("Small tools.\nEveryday use.", { tone: "ivory" }), 2.6),
    ],
    caption: "WEDRA Discovery #03: a measuring spoon with a display in the handle. Up to 300 g or 500 g.",
    alt: ["Discovery #03, up close.", "The measuring spoon, reconsidered."],
  }),

  // ===== #04 Mini Bag Sealer (week 3) =====
  V("sealer", "V1", {
    hook: "I wasn't looking for this. Then I found it.",
    scenes: [
      d(cap(P.bsSwitch, "I wasn't looking for this.\nThen I found it.", { at: "top" }), 2.6),
      d(cap(P.bsPress, "Hold it on the bag.", { at: "top" }), 2.4),
      d(st(P.bsSide, { style: "caption", text: "Then slide it along.", at: "low" }), 2.4),
      d(cap(P.bsDesk, "Snack drawer, sorted.", { at: "top", zoom: [1.0, 1.1] }), 2.6),
      d(cap(P.bsMagnet, "It lives on the fridge.", { at: "low" }), 2.6),
      d(st(P.bsColours, { eyebrow: "White · Pink · Gray · Black", text: "Mini bag sealer" }), 2.8),
    ],
    caption: "Didn't know I needed a bag sealer until I used one. Heat-seals opened plastic snack bags, then sticks to the fridge.",
    alt: ["Found the thing that replaced my bag clips.", "Not what I was looking for. Glad I found it."],
  }),
  V("sealer", "V2", {
    hook: "You probably didn't know you needed this.",
    scenes: [
      d(cap(P.bsDesk, "You probably didn't know\nyou needed this.", { at: "top", zoom: [1.1, 1.0] }), 2.8),
      d(cap(P.bsSwitch, "Switch on.", { at: "top" }), 2.0),
      d(cap(P.bsPress, "Press. Slide. Sealed.", { at: "top" }), 2.6),
      d(st(P.bsSide, { style: "caption", text: "The cutter opens bags too.", at: "low" }), 2.6),
      d(cap(P.bsCharge, "USB rechargeable.", { at: "top" }), 2.4),
      d(st(P.bsPink, { eyebrow: "Four colours", text: "Pocket size." }), 2.8),
    ],
    caption: "Seal opened snack bags, or open them with the built-in cutter. USB rechargeable, magnetic back, four colours.",
    alt: ["Your snack bags need this.", "The bag clip upgrade."],
  }),
  V("sealer", "V3", {
    hook: "Okay... why did nobody show me this sooner?",
    scenes: [
      d(cap(P.bsPress, "Okay... why did nobody\nshow me this sooner?", { at: "top", zoom: [1.2, 1.0] }), 2.4),
      d(st(P.bsWhite, { style: "caption", text: "It's a heat sealer.", at: "low" }), 1.8),
      d(cap(P.bsSwitch, "Pocket size.", { at: "top" }), 1.7),
      d(cap(P.bsMagnet, "Magnetic back.", { at: "low" }), 1.8),
      d(st(P.bsSide, { style: "caption", text: "Built-in cutter.", at: "low" }), 1.8),
      d(cap(P.bsCharge, "Charges by USB.", { at: "top" }), 1.8),
      d(st(P.bsColours, { style: "caption", text: "Pick a colour.", at: "low" }), 2.4),
    ],
    caption: "A pocket heat sealer with a cutter and a magnetic back. Why was this not in every kitchen drawer?",
    alt: ["Wait, it seals bags?", "Tell me you knew about this."],
  }),
  V("sealer", "V4", {
    hook: "A drawer full of bag clips?",
    scenes: [
      d(cap(P.bsDesk, "A drawer full of\nbag clips?", { at: "top" }), 2.6),
      d(st(P.bsWhite, { style: "caption", text: "One small sealer instead.", at: "low" }), 2.4),
      d(cap(P.bsSwitch, "Switch on.", { at: "top" }), 2.2),
      d(cap(P.bsPress, "Hold, then slide slowly.", { at: "top" }), 2.6),
      d(card("For plastic snack and\nstorage bags.\nNot paper, kraft or foil.", { tone: "ivory" }), 3.0),
      d(cap(P.bsMagnet, "Back on the fridge.", { at: "low" }), 2.6),
    ],
    caption: "Swap the drawer of clips for one small heat sealer. Works with plastic snack and storage bags, not paper, kraft or foil.",
    alt: ["Still using bag clips?", "Open bag, again?"],
  }),
  V("sealer", "V5", {
    hook: "Switch.",
    scenes: [
      d(cap(P.bsSwitch, "Switch.", { at: "top", zoom: [1.2, 1.05] }), 1.6),
      d(cap(P.bsPress, "Press.", { at: "top", zoom: [1.0, 1.15] }), 1.6),
      d(cap(P.bsPress, "", { pos: "45% 55%", zoom: [1.4, 1.55] }), 1.4),
      d(st(P.bsSide, { style: "caption", text: "Slide.", at: "low" }), 1.6),
      d(cap(P.bsCharge, "", { zoom: [1.15, 1.0] }), 1.4),
      d(cap(P.bsMagnet, "Stick.", { at: "low" }), 1.6),
      d(st(X.bsBlack, { zoom: [1.0, 1.1] }), 1.1),
      d(st(X.bsPink, { zoom: [1.0, 1.1], tone: "stone" }), 1.1),
      d(st(X.bsGray, { zoom: [1.0, 1.1] }), 1.1),
      d(st(P.bsWhite, { zoom: [1.0, 1.1], tone: "stone" }), 1.1),
    ],
    caption: "Switch, press, slide, stick.",
    alt: ["Just the seal.", "Four colours, one move."],
  }),
  V("sealer", "V6", {
    hook: "WEDRA Discovery #04.",
    scenes: [
      d(ed(P.bsDesk, "Close the bag.\nProperly.", { eyebrow: "WEDRA Discovery #04" }), 3.2),
      d(ed(P.bsPress, "Hold. Slide."), 3.0),
      d(ed(P.bsMagnet, "It lives on\nthe fridge."), 3.0),
      d(st(P.bsColours, { eyebrow: "White · Pink · Gray · Black", text: "Four colours." }), 3.0),
      d(ed(P.bsCharge, "USB\nrechargeable."), 2.8),
    ],
    caption: "WEDRA Discovery #04: a pocket-size heat sealer for plastic snack bags, with a built-in cutter and a magnetic back.",
    alt: ["Discovery #04, up close.", "The bag clip, reconsidered."],
  }),

  // ===== #05 Cordless Electric Spin Scrubber (week 3) =====
  V("scrubber", "V1", {
    hook: "I wasn't looking for this. Then I found it.",
    scenes: [
      d(cap(P.cUse, "I wasn't looking for this.\nThen I found it.", { at: "top" }), 2.6),
      d(st(P.cGreen, { style: "caption", text: "Cordless. Handheld.", at: "top" }), 2.4),
      d(cap(P.cUse, "Brush head for bowls.", { pos: "45% 70%", zoom: [1.2, 1.32], at: "low" }), 2.6),
      d(st(P.cWhite, { style: "caption", text: "Sponge or brush.\nClick and swap.", at: "top" }), 2.6),
      d(pan(cap(P.cUse, "Pots, pans, the sink edge.", { at: "low" }), "35% 50%", "60% 50%"), 2.8),
      d(pair(P.cGreen, P.cPink, { text: "Green, white or pink." }), 2.8),
    ],
    caption: "Found this for the washing-up and it stayed by the sink. Cordless, with a sponge head and a brush head.",
    alt: ["Found the small help for the sink.", "Didn't know I wanted this by the tap."],
  }),
  V("scrubber", "V2", {
    hook: "You probably didn't know you needed this.",
    scenes: [
      d(st(P.cPink, { style: "caption", text: "You probably didn't know\nyou needed this.", at: "top", tone: "stone" }), 2.8),
      d(cap(P.cUse, "It spins. You steer.", { at: "low", zoom: [1.0, 1.12] }), 2.4),
      d(st(P.cGreen, { style: "caption", text: "Sponge head for plates.", at: "top" }), 2.4),
      d(cap(P.cUse, "Brush head for bowls.", { pos: "45% 70%", zoom: [1.3, 1.4], at: "low" }), 2.4),
      d(st(P.cWhite, { style: "caption", text: "Hangs by its loop.", at: "top" }), 2.4),
      d(st(P.cGreen, { eyebrow: "WEDRA Discovery #05", text: "Spin scrubber", tone: "stone" }), 2.8),
    ],
    caption: "A cordless spin scrubber for pots, dishes and kitchenware. Two heads, one loop to hang it by the tap.",
    alt: ["Your sink sponge, upgraded.", "The washing-up helper."],
  }),
  V("scrubber", "V3", {
    hook: "Okay... why did nobody show me this sooner?",
    scenes: [
      d(cap(P.cUse, "Okay... why did nobody\nshow me this sooner?", { at: "top", zoom: [1.2, 1.0] }), 2.4),
      d(st(P.cGreen, { style: "caption", text: "It's cordless.", at: "top" }), 1.7),
      d(st(P.cWhite, { style: "caption", text: "Two heads.", at: "top", tone: "stone" }), 1.7),
      d(cap(P.cUse, "It does the spinning.", { pos: "45% 70%", zoom: [1.25, 1.35], at: "low" }), 2.0),
      d(st(P.cPink, { style: "caption", text: "Hang it by the tap.", at: "top" }), 1.9),
      d(pan(cap(P.cUse, "Pots. Bowls. Sink.", { at: "low" }), "60% 50%", "35% 50%"), 2.2),
      d(pair(P.cWhite, P.cPink, { text: "Three colours." }), 2.4),
    ],
    caption: "It spins, you steer. Cordless, two heads, three colours.",
    alt: ["Wait, it spins?", "The scrubber I didn't know existed."],
  }),
  V("scrubber", "V4", {
    hook: "Scrubbing the same pan by hand?",
    scenes: [
      d(cap(P.cUse, "Scrubbing the same pan\nby hand?", { at: "top" }), 2.6),
      d(st(P.cGreen, { style: "caption", text: "A little help.", at: "top" }), 2.2),
      d(cap(P.cUse, "Let the head spin.", { pos: "45% 70%", zoom: [1.2, 1.35], at: "low" }), 2.6),
      d(st(P.cWhite, { style: "caption", text: "Sponge for plates and pans.", at: "top" }), 2.6),
      d(pan(cap(P.cUse, "Brush for bowls and the sink edge.", { at: "low" }), "40% 50%", "58% 50%"), 2.8),
      d(pair(P.cGreen, P.cPink, { text: "Compact. Cordless." }), 2.8),
    ],
    caption: "The small help at the sink: a cordless spin scrubber with a sponge head and a brush head.",
    alt: ["The washing-up, a little easier.", "Still scrubbing pans by hand?"],
  }),
  V("scrubber", "V5", {
    hook: "Spin.",
    scenes: [
      d(cap(P.cUse, "Spin.", { pos: "45% 70%", zoom: [1.35, 1.2], at: "low" }), 1.6),
      d(st(P.cGreen, { zoom: [1.0, 1.14] }), 1.4),
      d(pan(cap(P.cUse, ""), "30% 50%", "60% 50%"), 1.6),
      d(st(P.cWhite, { style: "caption", text: "Swap.", at: "top", zoom: [1.14, 1.0] }), 1.5),
      d(cap(P.cUse, "", { pos: "50% 75%", zoom: [1.6, 1.75] }), 1.4),
      d(st(P.cPink, { zoom: [1.0, 1.12], tone: "stone" }), 1.4),
      d(cap(P.cUse, "Rinse.", { zoom: [1.0, 1.1], at: "low" }), 1.6),
      d(pair(P.cGreen, P.cPink, {}), 1.8),
    ],
    caption: "Spin, swap, rinse.",
    alt: ["Just the spin.", "Watch the pan."],
  }),
  V("scrubber", "V6", {
    hook: "WEDRA Discovery #05.",
    scenes: [
      d(ed(P.cUse, "The small help\nat the sink.", { eyebrow: "WEDRA Discovery #05" }), 3.2),
      d(st(P.cGreen, { eyebrow: "Cordless · Handheld", text: "Two heads." }), 3.0),
      d(ed(P.cUse, "Pots, bowls,\nthe sink edge.", { pos: "45% 70%", zoom: [1.2, 1.3] }), 3.0),
      d(pair(P.cWhite, P.cPink, { eyebrow: "Green · White · Pink", text: "Hangs by its loop." }), 3.0),
    ],
    caption: "WEDRA Discovery #05: a compact cordless scrubber for kitchen cleanup, with a sponge head and a brush head.",
    alt: ["Discovery #05, up close.", "The sink sponge, reconsidered."],
  }),
].map((v, i) => ({ ...v, scenes: v.scenes.map(fit), n: String(i + 1).padStart(2, "0"), film: FILM[v.type](v.product) }));

// ---------- Story frames (1080 × 1920): stickers are added in the Instagram app ----------
// kind: intro (new discovery) · poll (leave the middle free for a poll sticker) ·
// detail · link (leave the lower third free for the link sticker)
export const STORIES = {
  blender: [
    ["intro", st(P.bStudio, { eyebrow: "New · WEDRA Discovery #01", text: "Portable blender" })],
    ["poll", pair(P.bStudio, P.bPink, { text: "White or pink?" })],
    ["detail", st(P.bCharge, { eyebrow: "USB or magnetic", text: "Charges by cable." })],
    ["link", ed(P.bLife, "Tap the link\nto discover it.", { eyebrow: "WEDRA Discovery #01" })],
  ],
  oil: [
    ["intro", ed(P.oLife, "Spray or pour.\nSame bottle.", { eyebrow: "New · WEDRA Discovery #02", pos: "50% 60%" })],
    ["poll", cap(P.oMist, "Spray or pour?", { pos: "40% 55%", at: "top" })],
    ["detail", ed(P.oMist, "A fine mist\nfor the pan.", { pos: "40% 55%" })],
    ["link", ed(P.oPour, "Tap the link\nto discover it.", { eyebrow: "WEDRA Discovery #02" })],
  ],
  spoon: [
    ["intro", st(P.sFull, { eyebrow: "New · WEDRA Discovery #03", text: "Measure as\nyou scoop.", h: "22%" })],
    ["poll", st(P.sRice, { style: "caption", text: "Coffee or baking?", at: "top" })],
    ["detail", st(P.sButtons, { eyebrow: "Mode · Tare · Hold", text: "Three buttons.", tone: "stone" })],
    ["link", st(P.sEmpty, { eyebrow: "WEDRA Discovery #03", text: "Tap the link\nto discover it." })],
  ],
  sealer: [
    ["intro", st(P.bsColours, { eyebrow: "New · WEDRA Discovery #04", text: "Mini bag sealer" })],
    ["poll", st(P.bsColours, { style: "caption", text: "Which colour?", at: "low" })],
    ["detail", ed(P.bsMagnet, "It lives on\nthe fridge.")],
    ["link", ed(P.bsPress, "Tap the link\nto discover it.", { eyebrow: "WEDRA Discovery #04" })],
  ],
  scrubber: [
    ["intro", st(P.cGreen, { eyebrow: "New · WEDRA Discovery #05", text: "Spin scrubber" })],
    ["poll", pair(P.cGreen, P.cPink, { text: "Green, white or pink?" })],
    ["detail", ed(P.cUse, "Pots, bowls,\nthe sink edge.", { pos: "45% 70%" })],
    ["link", ed(P.cUse, "Tap the link\nto discover it.", { eyebrow: "WEDRA Discovery #05" })],
  ],
  brand: [
    ["this-week", card("This week\non WEDRA.", { tone: "dark" })],
    ["question", card("Which find should\nwe show next?", { tone: "ivory" })],
    ["behind", card("We search.\nWe filter.\nYou discover.", { tone: "stone" })],
    ["new-video", card("New video.\nTap to watch.", { tone: "dark" })],
  ],
};

for (const list of Object.values(STORIES)) list.forEach((x) => { x[1] = fit(x[1]); });

// Photo slot names for the production library (the launch package called
// "demonstration" "in-use"; the files are the same).
export const PHOTO_SLOTS = { hero: "hero", lifestyle: "lifestyle", detail: "detail", "in-use": "demonstration", editorial: "editorial" };
