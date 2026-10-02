// WEDRA organic launch content: every TikTok, Reel, feed post and product photo,
// with hooks, on-screen text, captions, CTAs and hashtags. Rendered by social.mjs.
// Claims follow docs/discovery-01-blender.md and docs/discovery-next-four.md:
// no health, battery-life, ice, airtight, freshness, waterproof or accuracy claims.
import path from "node:path";
import { pathToFileURL } from "node:url";

const HERE = path.dirname(new URL(import.meta.url).pathname);
export const ph = (p) => pathToFileURL(path.join(HERE, "photos", p)).href;

// ---------- Products ----------
export const PRODUCTS = {
  blender: { name: "Portable Electric Juicer Blender", label: "WEDRA Discovery #01", url: "wedra.co/products/portable-electric-juicer-blender" },
  oil: { name: "Versatile Oil Sprayer", label: "WEDRA Discovery #02", url: "wedra.co/products/versatile-oil-sprayer" },
  spoon: { name: "Digital Measuring Spoon", label: "WEDRA Discovery #03", url: "wedra.co/products/digital-measuring-spoon" },
  sealer: { name: "Mini Bag Sealer", label: "WEDRA Discovery #04", url: "wedra.co/products/mini-bag-sealer-rechargeable-handheld-heat-sealing-tool" },
  scrubber: { name: "Cordless Electric Spin Scrubber", label: "WEDRA Discovery #05", url: "wedra.co/products/cordless-electric-spin-scrubber-for-kitchen-cleaning" },
  brand: { name: "WEDRA (all discoveries)", label: "WEDRA", url: "wedra.co" },
  kitchen: { name: "WEDRA Finds: kitchen edit (oil sprayer, spoon, sealer, scrubber)", label: "WEDRA Finds", url: "wedra.co/collections/all" },
};

// ---------- Hashtags (5–7 per post, no spam) ----------
const B = ["#WEDRA", "#productsworthdiscovering"];
export const TAGS = {
  brand: [...B, "#WEDRAfinds", "#everydayessentials", "#curated", "#homefinds"],
  blender: [...B, "#portableblender", "#smoothie", "#morningroutine", "#blender"],
  oil: [...B, "#oilsprayer", "#kitchenfinds", "#airfryer", "#homecooking"],
  spoon: [...B, "#measuringspoon", "#baking", "#kitchentools", "#coffeeathome"],
  sealer: [...B, "#bagsealer", "#kitchenorganization", "#snackdrawer", "#pantryorganization"],
  scrubber: [...B, "#kitchencleaning", "#cleaningtok", "#dishes", "#spinscrubber"],
  kitchen: [...B, "#WEDRAfinds", "#kitchenfinds", "#kitchengadgets", "#homefinds"],
};

// ---------- Scene helpers (video.html kinds) ----------
const cap = (image, text, o = {}) => ({ kind: "caption", image, text, at: o.at || "top", pos: o.pos || "50% 50%", zoom: o.zoom || [1.0, 1.08], dur: o.dur || 2.6, mark: o.mark });
const ed = (image, text, o = {}) => ({ kind: "editorial", image, text, eyebrow: o.eyebrow, pos: o.pos || "50% 50%", zoom: o.zoom || [1.02, 1.1], dur: o.dur || 3.0 });
const st = (image, o = {}) => ({ kind: "studio", image, height: o.h, tone: o.tone || "ivory", style: o.style, text: o.text, eyebrow: o.eyebrow, at: o.at, zoom: o.zoom || [1.0, 1.06], dur: o.dur || 2.6 });
const pair = (a, b, o = {}) => ({ kind: "pair", images: [a, b], tone: o.tone || "stone", text: o.text, eyebrow: o.eyebrow, zoom: [1.0, 1.04], dur: o.dur || 2.8 });
const card = (text, o = {}) => ({ kind: "card", text, tone: o.tone || "dark", dur: o.dur || 2.4 });
const end = (label, cta = "Discover it at wedra.co", line = "Products worth discovering.") => ({ kind: "end", line, cta, label, dur: 3.0 });

// Photos
const root = (f) => pathToFileURL(path.join(HERE, "photos", f)).href;
const P = {
  bStudio: root("studio-tall.jpg"), bPink: root("pink.jpg"), bLife: root("life.jpg"), bCharge: root("charge.jpg"),
  oLife: ph("oil/life.png"), oMist: ph("oil/mist.png"), oCap: ph("oil/cap.png"), oRefill: ph("oil/refill.png"), oPour: ph("oil/pour.png"),
  sFull: ph("spoon/full.png"), sRice: ph("spoon/rice.png"), sButtons: ph("spoon/buttons.png"), sEmpty: ph("spoon/empty.png"),
  bsWhite: ph("sealer/white.png"), bsColours: ph("sealer/colours.png"), bsMagnet: ph("sealer/magnet.png"), bsCharge: ph("sealer/charge.png"),
  bsDesk: ph("sealer/charging-desk.png"), bsSwitch: ph("sealer/switch.png"), bsPress: ph("sealer/press.png"), bsSide: ph("sealer/white-side.png"),
  cGreen: ph("scrubber/green.png"), cWhite: ph("scrubber/white.png"), cPink: ph("scrubber/pink.png"), cUse: ph("scrubber/use.png"),
};
const LIFE_DRINK = { pos: "48% 72%", zoom: [1.4, 1.5] };

// ---------- Videos: 20 TikTok + 10 Reels (all 9:16, no platform watermarks) ----------
// style: "native" (TikTok captions, quicker cuts) or "premium" (editorial, slower crossfades)
export const VIDEOS = [
  { id: "T01", platform: "TikTok", product: "brand", series: "Products Worth Discovering", style: "native",
    hook: "We look for the products you didn't know you wanted.",
    scenes: [cap(P.bLife, "We look for the products\nyou didn't know you wanted.", { dur: 3.2 }), cap(P.oMist, "A bottle that sprays or pours.", { at: "low" }), cap(P.sRice, "A spoon with a scale.", { at: "top" }), cap(P.bsMagnet, "A sealer that lives on the fridge.", { at: "top" }), cap(P.cUse, "A scrubber for the sink.", { at: "low" }), end("WEDRA", "See them all at wedra.co")],
    caption: "We search. We filter. You discover. Five finds for everyday living, and more on the way.", cta: "See them all at wedra.co" },
  { id: "T02", platform: "TikTok", product: "blender", series: "WEDRA Discovery #01", style: "native",
    hook: "WEDRA Discovery #01.",
    scenes: [cap(P.bLife, "WEDRA Discovery #01.", { dur: 2.8 }), st(P.bStudio, { style: "caption", text: "A blender shaped like a bottle.", at: "top" }), cap(P.bLife, "350 ml. Rechargeable.", { ...LIFE_DRINK, at: "low" }), pair(P.bStudio, P.bPink, { text: "White or pink." }), end("WEDRA Discovery #01")],
    caption: "Our first discovery: a portable blender for one smoothie or shake at a time. 350 ml, rechargeable, small enough for a bag.", cta: "Discover it at wedra.co" },
  { id: "T03", platform: "TikTok", product: "oil", series: "WEDRA Finds", style: "native",
    hook: "Spray or pour. Same bottle.",
    scenes: [cap(P.oMist, "Spray or pour.\nSame bottle.", { dur: 3.0, pos: "40% 50%" }), cap(P.oPour, "Tip it to pour.", { at: "low" }), cap(P.oCap, "Squeeze to spray.", { at: "top" }), cap(P.oRefill, "470 ml glass.", { at: "low" }), end("WEDRA Discovery #02")],
    caption: "One glass bottle by the stove: a fine mist for the pan, a thin pour for the salad.", cta: "Found on WEDRA." },
  { id: "T04", platform: "TikTok", product: "scrubber", series: "Problem → product", style: "native",
    hook: "POV: the washing-up, a little easier.",
    scenes: [cap(P.cUse, "POV: the washing-up,\na little easier.", { dur: 3.0 }), st(P.cGreen, { style: "caption", text: "Cordless. Handheld.", at: "top", h: "56%" }), cap(P.cUse, "Brush head for bowls and the sink.", { at: "low", zoom: [1.2, 1.3] }), pair(P.cWhite, P.cPink, { text: "Sponge or brush head." }), end("WEDRA Discovery #05")],
    caption: "A compact cordless scrubber with a sponge head and a brush head. The small help at the sink.", cta: "Discover it at wedra.co" },
  { id: "T05", platform: "TikTok", product: "sealer", series: "I Found This", style: "native",
    hook: "Okay... why did nobody show me this sooner?",
    scenes: [cap(P.bsSwitch, "Okay... why did nobody\nshow me this sooner?", { dur: 3.2 }), cap(P.bsPress, "Hold it closed a moment.", { at: "top" }), st(P.bsWhite, { style: "caption", text: "Then slide it along the bag.", at: "top", h: "32%" }), cap(P.bsMagnet, "It lives on the fridge.", { at: "low" }), end("WEDRA Discovery #04")],
    caption: "A pocket-size heat sealer for opened plastic snack bags. Built-in cutter, magnetic back, USB rechargeable.", cta: "Found on WEDRA." },
  { id: "T06", platform: "TikTok", product: "spoon", series: "Curiosity", style: "native",
    hook: "A spoon with a screen.",
    scenes: [st(P.sFull, { style: "caption", text: "A spoon with a screen.", at: "top", h: "20%", dur: 3.0 }), st(P.sRice, { style: "caption", text: "Scoop. Read. Pour.", at: "top", h: "40%" }), st(P.sButtons, { style: "caption", text: "Tare and hold buttons.", at: "top", h: "42%", tone: "stone" }), st(P.sEmpty, { eyebrow: "Up to 300 g or 500 g", text: "Digital measuring spoon", h: "40%" }), end("WEDRA Discovery #03")],
    caption: "Scoop and read the weight straight from the handle. For coffee, tea, spices and small-batch baking.", cta: "Discover it at wedra.co" },
  { id: "T07", platform: "TikTok", product: "blender", series: "Everyday routines", style: "native",
    hook: "Your smoothie. Your routine. Anywhere.",
    scenes: [cap(P.bLife, "Your smoothie.\nYour routine. Anywhere.", { dur: 3.0 }), cap(P.bLife, "One drink at a time.", { ...LIFE_DRINK, at: "low" }), st(P.bCharge, { style: "caption", text: "Charges by cable.", at: "top", h: "40%" }), st(P.bPink, { eyebrow: "WEDRA Discovery #01", text: "Portable blender", h: "36%" }), end("WEDRA Discovery #01")],
    caption: "Counter, desk, day bag. A 350 ml rechargeable blender that keeps a simple habit simple.", cta: "Discover better." },
  { id: "T08", platform: "TikTok", product: "oil", series: "I Found This", style: "native",
    hook: "I wasn't looking for this. Then I found it.",
    scenes: [cap(P.oLife, "I wasn't looking for this.\nThen I found it.", { dur: 3.2, pos: "50% 60%" }), cap(P.oMist, "A fine mist for the pan.", { at: "low", pos: "40% 55%" }), cap(P.oPour, "A thin pour for the salad.", { at: "low" }), cap(P.oCap, "One cap does both.", { at: "top" }), end("WEDRA Discovery #02")],
    caption: "The oil bottle that does two jobs. Spray for the pan and the air fryer, pour for the salad.", cta: "See the full discovery at wedra.co" },
  { id: "T09", platform: "TikTok", product: "sealer", series: "Satisfying", style: "native",
    hook: "Swap the drawer of clips.",
    scenes: [st(P.bsColours, { style: "caption", text: "Swap the drawer of clips.", at: "top", h: "30%", dur: 3.0 }), cap(P.bsSwitch, "Switch on.", { at: "top" }), cap(P.bsPress, "Hold. Slide.", { at: "top" }), cap(P.bsCharge, "USB rechargeable.", { at: "top" }), end("WEDRA Discovery #04")],
    caption: "One small sealer instead of a drawer of clips. In white, pink, gray or black.", cta: "Found on WEDRA." },
  { id: "T10", platform: "TikTok", product: "scrubber", series: "Product education", style: "native",
    hook: "Sponge or brush. Click and swap.",
    scenes: [st(P.cGreen, { style: "caption", text: "Sponge or brush.\nClick and swap.", at: "top", h: "56%", dur: 3.0 }), st(P.cWhite, { style: "caption", text: "Sponge head for plates and pans.", at: "top", h: "56%" }), cap(P.cUse, "Brush head for bowls and the sink.", { at: "low" }), st(P.cPink, { eyebrow: "Pink · White · Green", text: "Hangs by its loop.", h: "50%" }), end("WEDRA Discovery #05")],
    caption: "Two heads, one compact scrubber. The sponge for plates, the brush for bowls and the sink edge.", cta: "Discover it at wedra.co" },
  { id: "T11", platform: "TikTok", product: "spoon", series: "Product education", style: "native",
    hook: "Three buttons. That's the whole manual.",
    scenes: [st(P.sButtons, { style: "caption", text: "Three buttons.\nThat's the whole manual.", at: "top", h: "44%", tone: "stone", dur: 3.2 }), st(P.sEmpty, { style: "caption", text: "Tare zeroes the empty scoop.", at: "top", h: "40%" }), st(P.sRice, { style: "caption", text: "Scoop. Read the weight.", at: "top", h: "40%" }), st(P.sButtons, { style: "caption", text: "Hold keeps the reading.", at: "top", h: "44%" }), end("WEDRA Discovery #03")],
    caption: "Mode, Tare, Hold. Zero the scoop, add your ingredient, read it off the handle.", cta: "Discover it at wedra.co" },
  { id: "T12", platform: "TikTok", product: "sealer", series: "You Didn't Know You Needed This", style: "native",
    hook: "You probably didn't know you needed this.",
    scenes: [cap(P.bsDesk, "You probably didn't know\nyou needed this.", { dur: 3.2 }), cap(P.bsPress, "It seals opened snack bags.", { at: "top" }), st(P.bsSide, { style: "caption", text: "And opens them with a cutter.", at: "top", h: "30%" }), cap(P.bsMagnet, "Then back on the fridge.", { at: "low" }), end("WEDRA Discovery #04")],
    caption: "Seal it, or cut it open. Same clip. Works with plastic snack and storage bags.", cta: "Discover better." },
  { id: "T13", platform: "TikTok", product: "kitchen", series: "WEDRA Finds", style: "native",
    hook: "WEDRA Finds: the kitchen edit.",
    scenes: [card("WEDRA Finds:\nthe kitchen edit.", { dur: 2.6 }), cap(P.oMist, "01 · Spray or pour.", { at: "low" }), st(P.sRice, { style: "caption", text: "02 · Measure as you scoop.", at: "top", h: "40%" }), cap(P.bsPress, "03 · Close the bag.", { at: "top" }), cap(P.cUse, "04 · Scrub the sink.", { at: "low" }), end("WEDRA Finds", "See them all at wedra.co")],
    caption: "Four small kitchen finds we think are worth knowing about.", cta: "See them all at wedra.co" },
  { id: "T14", platform: "TikTok", product: "blender", series: "Lifestyle", style: "native",
    hook: "Small enough to take along.",
    scenes: [st(P.bStudio, { style: "caption", text: "Small enough to take along.", at: "top", h: "40%", dur: 3.0 }), cap(P.bLife, "Balcony breakfast.", { at: "low" }), cap(P.bLife, "Your drink, ready.", { ...LIFE_DRINK, at: "low" }), pair(P.bStudio, P.bPink, { eyebrow: "350 ml · Rechargeable", text: "Portable blender" }), end("WEDRA Discovery #01")],
    caption: "A bottle-shaped blender that goes where your morning does.", cta: "Discover it at wedra.co" },
  { id: "T15", platform: "TikTok", product: "oil", series: "Curiosity", style: "native",
    hook: "Wait until you see what this does.",
    scenes: [cap(P.oCap, "Wait until you see\nwhat this does.", { dur: 3.0 }), cap(P.oMist, "Squeeze: a fine mist.", { at: "low", pos: "40% 55%" }), cap(P.oPour, "Tip: a steady pour.", { at: "low" }), cap(P.oLife, "Same bottle.", { at: "low", pos: "50% 60%" }), end("WEDRA Discovery #02")],
    caption: "Spray or pour from one glass bottle. For oil or vinegar, cooking, grilling, baking and salads.", cta: "Found on WEDRA." },
  { id: "T16", platform: "TikTok", product: "scrubber", series: "Everyday routines", style: "native",
    hook: "Found for your everyday.",
    scenes: [cap(P.cUse, "Found for your everyday.", { dur: 3.0 }), st(P.cGreen, { style: "caption", text: "Compact and cordless.", at: "top", h: "56%" }), cap(P.cUse, "Pots, bowls, the sink edge.", { at: "low", zoom: [1.25, 1.35] }), pair(P.cGreen, P.cPink, { text: "Green, white or pink." }), end("WEDRA Discovery #05")],
    caption: "A cordless spin scrubber for pots, dishes and kitchenware, with a loop to hang it by the tap.", cta: "Discover better." },
  { id: "T17", platform: "TikTok", product: "spoon", series: "I Found This", style: "native",
    hook: "This might be one of the most useful things I found this week.",
    scenes: [st(P.sRice, { style: "caption", text: "This might be one of the most\nuseful things I found this week.", at: "top", h: "40%", dur: 3.4 }), st(P.sFull, { style: "caption", text: "Scale in the handle.", at: "top", h: "20%" }), st(P.sButtons, { style: "caption", text: "Tare. Hold. Mode.", at: "top", h: "44%" }), st(P.sEmpty, { eyebrow: "Up to 300 g or 500 g", text: "Measure as you scoop.", h: "40%" }), end("WEDRA Discovery #03")],
    caption: "Coffee, tea, flour, spices: scoop it and read the weight in one step.", cta: "See the full discovery at wedra.co" },
  { id: "T18", platform: "TikTok", product: "sealer", series: "Product education", style: "native",
    hook: "Which bags does it work with?",
    scenes: [st(P.bsWhite, { style: "caption", text: "Which bags does it work with?", at: "top", h: "30%", dur: 3.0 }), card("Plastic snack bags.\nPlastic storage bags.", { tone: "ivory" }), card("Not for thin, paper,\nkraft or foil bags.", { tone: "stone" }), cap(P.bsPress, "Hold, then slide slowly.", { at: "top" }), end("WEDRA Discovery #04")],
    caption: "Good to know before you buy: it's made for plastic snack and storage bags, not thin, paper, kraft or foil ones.", cta: "Discover it at wedra.co" },
  { id: "T19", platform: "TikTok", product: "blender", series: "Editorial discovery", style: "native",
    hook: "White or pink?",
    scenes: [pair(P.bStudio, P.bPink, { text: "White or pink?", dur: 3.0 }), st(P.bStudio, { style: "caption", text: "USB or magnetic charging.", at: "top", h: "40%" }), st(P.bCharge, { style: "caption", text: "Charges by cable.", at: "top", h: "40%" }), cap(P.bLife, "350 ml. One drink at a time.", { ...LIFE_DRINK, at: "low" }), end("WEDRA Discovery #01")],
    caption: "Pick your colour and how it charges. Same 350 ml portable blender.", cta: "Discover it at wedra.co" },
  { id: "T20", platform: "TikTok", product: "brand", series: "Products Worth Discovering", style: "native",
    hook: "Another WEDRA discovery.",
    scenes: [card("Products worth\ndiscovering.", { dur: 2.6 }), st(P.bStudio, { eyebrow: "#01", text: "Portable blender", h: "36%" }), cap(P.oMist, "#02 · Oil sprayer", { at: "low" }), st(P.sRice, { eyebrow: "#03", text: "Measuring spoon", h: "36%" }), st(P.bsColours, { eyebrow: "#04", text: "Mini bag sealer", h: "28%" }), st(P.cGreen, { eyebrow: "#05", text: "Spin scrubber", h: "46%" }), end("WEDRA", "Discover better at wedra.co")],
    caption: "Five discoveries so far. Found for your everyday.", cta: "Discover better at wedra.co" },
  // ---------- Instagram Reels (premium pacing) ----------
  { id: "R01", platform: "Instagram Reels", product: "brand", series: "Products Worth Discovering", style: "premium",
    hook: "Products worth discovering.",
    scenes: [ed(P.bLife, "Products worth\ndiscovering.", { eyebrow: "WEDRA" }), ed(P.oLife, "We search.", { pos: "50% 60%" }), ed(P.cUse, "We filter."), ed(P.bsSwitch, "You discover."), end("WEDRA", "Discover better at wedra.co")],
    caption: "WEDRA finds useful, well-made products for everyday living, and shows you only the ones worth your attention.", cta: "Discover better at wedra.co" },
  { id: "R02", platform: "Instagram Reels", product: "blender", series: "WEDRA Discovery #01", style: "premium",
    hook: "WEDRA Discovery #01.",
    scenes: [ed(P.bLife, "WEDRA Discovery #01.", { eyebrow: "Found for your everyday" }), st(P.bStudio, { eyebrow: "350 ml · Rechargeable", text: "Portable blender", h: "38%", dur: 3.0 }), ed(P.bLife, "Your smoothie.\nYour routine.", LIFE_DRINK), pair(P.bStudio, P.bPink, { text: "White or pink.", dur: 3.0 }), end("WEDRA Discovery #01")],
    caption: "Discovery #01: a compact, rechargeable blender for one smoothie or shake at a time.", cta: "Discover it at wedra.co" },
  { id: "R03", platform: "Instagram Reels", product: "oil", series: "WEDRA Finds", style: "premium",
    hook: "Spray or pour. Same bottle.",
    scenes: [ed(P.oLife, "Spray or pour.\nSame bottle.", { eyebrow: "WEDRA Discovery #02", pos: "50% 60%" }), ed(P.oMist, "A fine mist for the pan.", { pos: "40% 55%" }), ed(P.oPour, "A thin pour for the salad."), ed(P.oRefill, "470 ml glass."), end("WEDRA Discovery #02")],
    caption: "A 470 ml glass bottle that sprays or pours from the same cap. In beige, green, yellow or black.", cta: "Found on WEDRA." },
  { id: "R04", platform: "Instagram Reels", product: "spoon", series: "Products Worth Discovering", style: "premium",
    hook: "Measure as you scoop.",
    scenes: [st(P.sFull, { eyebrow: "WEDRA Discovery #03", text: "Measure as you scoop.", h: "20%", dur: 3.2 }), st(P.sRice, { eyebrow: "Coffee · Tea · Baking", text: "Scoop. Read. Pour.", h: "40%", dur: 3.0 }), st(P.sButtons, { eyebrow: "Mode · Tare · Hold", text: "Three buttons.", h: "44%", tone: "stone", dur: 3.0 }), end("WEDRA Discovery #03")],
    caption: "A measuring spoon with a display in the handle. Up to 300 g or 500 g.", cta: "Discover it at wedra.co" },
  { id: "R05", platform: "Instagram Reels", product: "sealer", series: "WEDRA Finds", style: "premium",
    hook: "Close the bag. Properly.",
    scenes: [st(P.bsWhite, { eyebrow: "WEDRA Discovery #04", text: "Close the bag.\nProperly.", h: "30%", dur: 3.0 }), ed(P.bsSwitch, "Switch on."), ed(P.bsPress, "Hold. Slide."), ed(P.bsMagnet, "Back on the fridge."), st(P.bsColours, { text: "Four colours.", h: "30%", dur: 2.8 }), end("WEDRA Discovery #04")],
    caption: "A pocket-size heat sealer for plastic snack bags, with a built-in cutter and a magnetic back.", cta: "Found on WEDRA." },
  { id: "R06", platform: "Instagram Reels", product: "scrubber", series: "WEDRA Finds", style: "premium",
    hook: "The small help at the sink.",
    scenes: [st(P.cGreen, { eyebrow: "WEDRA Discovery #05", text: "The small help\nat the sink.", h: "50%", dur: 3.0 }), ed(P.cUse, "Pots, bowls, the sink edge."), pair(P.cWhite, P.cPink, { text: "Sponge or brush head.", dur: 3.0 }), end("WEDRA Discovery #05")],
    caption: "A compact cordless scrubber for kitchen cleanup, with a sponge head and a brush head.", cta: "Discover it at wedra.co" },
  { id: "R07", platform: "Instagram Reels", product: "kitchen", series: "WEDRA Finds", style: "premium",
    hook: "Four kitchen finds worth knowing.",
    scenes: [card("Four kitchen finds\nworth knowing.", { dur: 2.8 }), ed(P.oMist, "Spray or pour.", { pos: "40% 55%" }), st(P.sRice, { text: "Measure as you scoop.", h: "40%", dur: 2.8 }), ed(P.bsPress, "Close the bag."), ed(P.cUse, "Scrub the sink."), end("WEDRA Finds", "See them all at wedra.co")],
    caption: "The kitchen edit: an oil sprayer, a measuring spoon, a bag sealer and a spin scrubber.", cta: "See them all at wedra.co" },
  { id: "R08", platform: "Instagram Reels", product: "oil", series: "I Found This", style: "premium",
    hook: "I wasn't looking for this. Then I found it.",
    scenes: [ed(P.oCap, "I wasn't looking for this.\nThen I found it."), ed(P.oMist, "One cap, a fine mist.", { pos: "40% 55%" }), ed(P.oPour, "Or a steady pour."), end("WEDRA Discovery #02")],
    caption: "A small upgrade for the stove: one bottle for spraying and pouring.", cta: "See the full discovery at wedra.co" },
  { id: "R09", platform: "Instagram Reels", product: "sealer", series: "You Didn't Know You Needed This", style: "premium",
    hook: "You didn't know you needed this.",
    scenes: [ed(P.bsDesk, "You didn't know\nyou needed this."), ed(P.bsSwitch, "Seal it."), st(P.bsSide, { text: "Or cut it open.", h: "30%", dur: 2.8 }), ed(P.bsMagnet, "It lives on the fridge."), end("WEDRA Discovery #04")],
    caption: "Seal opened snack bags, open them with the cutter, keep it on the fridge.", cta: "Discover better." },
  { id: "R10", platform: "Instagram Reels", product: "blender", series: "Everyday routines", style: "premium",
    hook: "Found for your everyday.",
    scenes: [ed(P.bLife, "Found for your everyday.", { eyebrow: "WEDRA Discovery #01" }), st(P.bPink, { eyebrow: "Portable blender", text: "Small format.\nEveryday use.", h: "36%", dur: 3.0 }), st(P.bCharge, { eyebrow: "USB or magnetic charging", text: "Charges by cable.", h: "40%", dur: 2.8 }), ed(P.bLife, "One drink at a time.", LIFE_DRINK), end("WEDRA Discovery #01")],
    caption: "A simple way to make one drink at a time, wherever your day goes.", cta: "Discover it at wedra.co" },
];

// ---------- Product photos: 5 per product (1080 × 1350, no text except editorial) ----------
const still = (s) => ({ ...s, zoom: s.zoom || [1, 1] });
export const PHOTOS = {
  blender: [
    ["hero", still(st(P.bStudio, { h: "76%" }))],
    ["lifestyle", still(cap(P.bLife, "", { pos: "50% 50%" }))],
    ["detail", still(st(P.bCharge, { h: "62%" }))],
    ["in-use", still(cap(P.bLife, "", LIFE_DRINK))],
    ["editorial", still(pair(P.bStudio, P.bPink, { eyebrow: "WEDRA Discovery #01", text: "Found for\nyour everyday." }))],
  ],
  oil: [
    ["hero", still(cap(P.oLife, "", { pos: "50% 60%" }))],
    ["lifestyle", still(cap(P.oPour, "", { pos: "50% 50%" }))],
    ["detail", still(cap(P.oCap, "", { pos: "50% 40%" }))],
    ["in-use", still(cap(P.oMist, "", { pos: "40% 55%" }))],
    ["editorial", still(ed(P.oLife, "Spray or pour.\nSame bottle.", { eyebrow: "WEDRA Discovery #02", pos: "50% 60%" }))],
  ],
  spoon: [
    ["hero", still(st(P.sFull, { h: "24%" }))],
    ["lifestyle", still(st(P.sRice, { h: "62%", tone: "stone" })), "stand-in: see AI prompt"],
    ["detail", still(st(P.sButtons, { h: "70%" }))],
    ["in-use", still(st(P.sRice, { h: "70%" }))],
    ["editorial", still(st(P.sEmpty, { eyebrow: "WEDRA Discovery #03", text: "Measure as\nyou scoop.", h: "46%" }))],
  ],
  sealer: [
    ["hero", still(st(P.bsWhite, { h: "36%" }))],
    ["lifestyle", still(cap(P.bsMagnet, "", { pos: "50% 45%" }))],
    ["detail", still(cap(P.bsCharge, "", { pos: "50% 50%" }))],
    ["in-use", still(cap(P.bsPress, "", { pos: "50% 50%" }))],
    ["editorial", still(st(P.bsColours, { eyebrow: "WEDRA Discovery #04", text: "Close the bag.\nProperly.", h: "36%" }))],
  ],
  scrubber: [
    ["hero", still(st(P.cGreen, { h: "70%" }))],
    ["lifestyle", still(cap(P.cUse, "", { pos: "50% 50%" }))],
    ["detail", still(cap(P.cGreen, "", { pos: "18% 30%", zoom: [2.2, 2.2] }))],
    ["in-use", still(cap(P.cUse, "", { pos: "45% 70%", zoom: [1.35, 1.35] }))],
    ["editorial", still(pair(P.cWhite, P.cPink, { eyebrow: "WEDRA Discovery #05", text: "The small help\nat the sink." }))],
  ],
};

// ---------- Instagram feed: 12 posts, 4:5, one premium grid ----------
// Posted oldest first; on the profile grid, F10–F12 sit on the top row.
export const FEED = [
  { id: "F01", product: "brand", pillar: "Brand storytelling", scene: card("WEDRA.\nProducts worth\ndiscovering."), caption: "Welcome to WEDRA. We find useful, well-made products for everyday living and show you only the ones worth your attention.", cta: "Discover better at wedra.co" },
  { id: "F02", product: "blender", pillar: "Product photography", scene: st(P.bStudio, { eyebrow: "WEDRA Discovery #01", text: "Portable blender", h: "62%" }), caption: "Discovery #01. A 350 ml rechargeable blender for one smoothie or shake at a time.", cta: "Discover it at wedra.co" },
  { id: "F03", product: "oil", pillar: "Lifestyle", scene: ed(P.oLife, "Spray or pour.\nSame bottle.", { eyebrow: "WEDRA Discovery #02", pos: "50% 60%" }), caption: "One glass bottle by the stove. A fine mist for the pan, a thin pour for the salad.", cta: "Found on WEDRA." },
  { id: "F04", product: "brand", pillar: "Brand storytelling", scene: card("We search.\nWe filter.\nYou discover.", { tone: "stone" }), caption: "How WEDRA works: we look through a lot of products so you don't have to, and share only the useful ones, clearly explained and honestly photographed.", cta: "Discover better." },
  { id: "F05", product: "scrubber", pillar: "Demonstration", scene: cap(P.cUse, ""), caption: "Discovery #05: a compact cordless scrubber for pots, bowls and the sink edge.", cta: "Discover it at wedra.co" },
  { id: "F06", product: "sealer", pillar: "Product photography", scene: st(P.bsColours, { eyebrow: "WEDRA Discovery #04", text: "Mini bag sealer", h: "36%" }), caption: "White, pink, gray or black. A pocket-size heat sealer with a cutter and a magnetic back.", cta: "Found on WEDRA." },
  { id: "F07", product: "spoon", pillar: "Product education", scene: st(P.sButtons, { eyebrow: "Mode · Tare · Hold", text: "Measure as you scoop.", h: "52%", tone: "stone" }), caption: "Tare zeroes the empty scoop, Hold keeps the reading on the screen. Discovery #03.", cta: "Discover it at wedra.co" },
  { id: "F08", product: "blender", pillar: "Lifestyle", scene: cap(P.bLife, ""), caption: "Balcony breakfast, made in the bottle.", cta: "Discover better." },
  { id: "F09", product: "kitchen", pillar: "Discovery graphics", scene: { kind: "grid", images: [P.oMist, P.sRice, P.bsPress, P.cUse], title: "WEDRA Finds", sub: "The kitchen edit" }, caption: "The kitchen edit: four small finds for cooking, measuring, snacks and the washing-up.", cta: "See them all at wedra.co" },
  { id: "F10", product: "oil", pillar: "Product photography", scene: cap(P.oCap, "", { pos: "50% 40%" }), caption: "One cap, two ways: squeeze to spray, tip to pour.", cta: "Found on WEDRA." },
  { id: "F11", product: "sealer", pillar: "Lifestyle", scene: cap(P.bsMagnet, "", { pos: "50% 45%" }), caption: "It lives on the fridge, right where the snacks are.", cta: "Discover it at wedra.co" },
  { id: "F12", product: "brand", pillar: "Brand storytelling", scene: card("Found for\nyour everyday.", { tone: "ivory" }), caption: "Five discoveries so far, and more to come, only when they're worth showing you.", cta: "Discover better at wedra.co" },
];

// Shared with production-content.mjs (the 30-video production library).
export { cap, ed, st, pair, card, end, P, LIFE_DRINK };
