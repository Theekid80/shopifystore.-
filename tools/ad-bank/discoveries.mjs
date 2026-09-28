// WEDRA media for the discoveries after #01, built from the reference photos
// in photos/<product>/ (text-free crops; git-ignored like the other photos).
//   node discoveries.mjs [--only=oil,sealer] [--videos=0]
//   → out/discoveries/<product>/gallery/*.jpg   clean 4:5 product-page images (no text)
//     out/discoveries/<product>/slide-4x5.jpg   homepage hero slide (ad style, with text)
//     out/discoveries/<product>/video-4x5.mp4   product-page / feed video
//     out/discoveries/<product>/video-9x16.mp4  Reels / TikTok / Stories video
// Same engine (video.html) and rules as the #01 ad bank: no prices, no claims
// beyond the verified facts in docs/discovery-next-four.md.
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const HERE = path.dirname(new URL(import.meta.url).pathname);
const FPS = 30;
const opt = Object.fromEntries(process.argv.slice(2).map((a) => a.replace(/^--/, "").split("=")));
const only = opt.only ? opt.only.split(",") : null;
const ffmpeg = process.env.FFMPEG || "ffmpeg";
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const ph = (p) => pathToFileURL(path.join(HERE, "photos", p)).href;
const still = { zoom: [1, 1] };
const end = (label, dur = 2.6) => ({ kind: "end", dur, line: "Discover it at WEDRA.", cta: "Explore the discovery", label });

// h: product height per layout ({ feed, tall }) for wide product shots.
const products = {
  oil: {
    label: "WEDRA Discovery #02",
    gallery: [
      ["01-spray-and-pour", { kind: "caption", image: ph("oil/life.png"), pos: "50% 60%", ...still }],
      ["02-mist", { kind: "caption", image: ph("oil/mist.png"), pos: "40% 50%", ...still }],
      ["03-cap", { kind: "caption", image: ph("oil/cap.png"), pos: "50% 40%", ...still }],
      ["04-refill", { kind: "caption", image: ph("oil/refill.png"), pos: "50% 50%", ...still }],
    ],
    slide: { kind: "editorial", image: ph("oil/life.png"), pos: "50% 55%", ...still, eyebrow: "WEDRA Discovery #02", text: "Spray or pour.\nSame bottle.", mark: true },
    video: [
      { kind: "editorial", image: ph("oil/life.png"), pos: "50% 55%", dur: 3.0, eyebrow: "WEDRA Discovery #02", text: "Spray or pour.\nSame bottle.", textDelay: -1 },
      { kind: "caption", image: ph("oil/mist.png"), pos: "40% 55%", dur: 2.4, text: "A fine mist for the pan.", at: "low" },
      { kind: "caption", image: ph("oil/cap.png"), pos: "50% 40%", dur: 2.2, text: "Flip the cap to pour.", at: "top" },
      { kind: "caption", image: ph("oil/refill.png"), pos: "50% 50%", dur: 2.4, text: "470 ml glass bottle.", at: "low", mark: true },
      end("WEDRA Discovery #02"),
    ],
  },
  spoon: {
    label: "WEDRA Discovery #03",
    gallery: [
      ["01-studio", { kind: "studio", image: ph("spoon/full.png"), h: { feed: "24%" }, tone: "ivory", ...still }],
      ["02-scoop", { kind: "studio", image: ph("spoon/rice.png"), height: "70%", tone: "ivory", ...still }],
      ["03-buttons", { kind: "studio", image: ph("spoon/buttons.png"), height: "72%", tone: "ivory", ...still }],
      ["04-empty", { kind: "studio", image: ph("spoon/empty.png"), height: "70%", tone: "stone", ...still }],
    ],
    slide: { kind: "studio", image: ph("spoon/rice.png"), height: "56%", tone: "ivory", eyebrow: "Digital measuring spoon", text: "Measure as\nyou scoop.", mark: true, ...still },
    video: [
      { kind: "studio", image: ph("spoon/full.png"), h: { feed: "22%", tall: "18%" }, dur: 2.8, eyebrow: "WEDRA Discovery #03", text: "A spoon with a display.", zoom: [1, 1.05], textDelay: -1 },
      { kind: "studio", image: ph("spoon/rice.png"), height: "60%", dur: 2.4, eyebrow: "Digital measuring spoon", text: "Scoop. Read. Pour.", zoom: [1, 1.05] },
      { kind: "studio", image: ph("spoon/buttons.png"), height: "62%", tone: "stone", dur: 2.4, style: "caption", text: "Tare and hold buttons.", at: "top", zoom: [1, 1.06] },
      { kind: "studio", image: ph("spoon/empty.png"), height: "56%", dur: 2.2, eyebrow: "Up to 300 g or 500 g", text: "Digital measuring spoon", zoom: [1, 1.04] },
      end("WEDRA Discovery #03"),
    ],
  },
  sealer: {
    label: "WEDRA Discovery #04",
    gallery: [
      ["01-studio-white", { kind: "studio", image: ph("sealer/white.png"), h: { feed: "36%" }, tone: "ivory", ...still }],
      ["02-colours", { kind: "studio", image: ph("sealer/colours.png"), h: { feed: "44%" }, tone: "ivory", ...still }],
      ["03-magnet", { kind: "caption", image: ph("sealer/magnet.png"), pos: "50% 45%", ...still }],
      ["04-charging", { kind: "caption", image: ph("sealer/charge.png"), pos: "50% 50%", ...still }],
      ["05-side", { kind: "studio", image: ph("sealer/white-side.png"), h: { feed: "34%" }, tone: "stone", ...still }],
      ["colour-white", { kind: "studio", image: ph("sealer/white.png"), h: { feed: "36%" }, tone: "ivory", ...still }],
      ["colour-pink", { kind: "studio", image: ph("sealer/pink.png"), h: { feed: "36%" }, tone: "ivory", ...still }],
      ["colour-gray", { kind: "studio", image: ph("sealer/gray.png"), h: { feed: "36%" }, tone: "ivory", ...still }],
      ["colour-black", { kind: "studio", image: ph("sealer/black.png"), h: { feed: "36%" }, tone: "ivory", ...still }],
    ],
    slide: { kind: "studio", image: ph("sealer/colours.png"), h: { feed: "36%" }, tone: "ivory", eyebrow: "Mini bag sealer", text: "Close the bag.\nProperly.", mark: true, ...still },
    video: [
      { kind: "studio", image: ph("sealer/white.png"), h: { feed: "32%", tall: "22%" }, dur: 2.6, eyebrow: "Mini bag sealer", text: "Close the bag.\nProperly.", zoom: [1, 1.05], textDelay: -1 },
      { kind: "caption", image: ph("sealer/magnet.png"), pos: "50% 45%", dur: 2.2, text: "It lives on the fridge.", at: "low" },
      { kind: "caption", image: ph("sealer/charge.png"), pos: "50% 50%", dur: 2.2, text: "USB rechargeable.", at: "top" },
      { kind: "studio", image: ph("sealer/colours.png"), h: { feed: "36%", tall: "30%" }, dur: 2.6, eyebrow: "WEDRA Discovery #04", text: "Four colours.", zoom: [1, 1.04] },
      end("WEDRA Discovery #04"),
    ],
  },
  scrubber: {
    label: "WEDRA Discovery #05",
    gallery: [
      ["01-studio-green", { kind: "studio", image: ph("scrubber/green.png"), height: "70%", tone: "ivory", ...still }],
      ["02-in-use", { kind: "caption", image: ph("scrubber/use.png"), pos: "50% 50%", ...still }],
      ["03-pair", { kind: "pair", images: [ph("scrubber/white.png"), ph("scrubber/pink.png")], tone: "stone", ...still }],
      ["colour-green", { kind: "studio", image: ph("scrubber/green.png"), height: "70%", tone: "ivory", ...still }],
      ["colour-white", { kind: "studio", image: ph("scrubber/white.png"), height: "70%", tone: "ivory", ...still }],
      ["colour-pink", { kind: "studio", image: ph("scrubber/pink.png"), height: "70%", tone: "ivory", ...still }],
    ],
    slide: { kind: "studio", image: ph("scrubber/green.png"), height: "58%", tone: "ivory", eyebrow: "Electric dish scrubber", text: "The small help\nat the sink.", mark: true, ...still },
    video: [
      { kind: "studio", image: ph("scrubber/green.png"), height: "56%", dur: 2.6, style: "caption", text: "Compact. Powered. At the sink.", at: "top", zoom: [1, 1.05], textDelay: -1 },
      { kind: "caption", image: ph("scrubber/use.png"), pos: "50% 50%", dur: 2.6, text: "Brush head for bowls and the sink.", at: "low" },
      { kind: "studio", image: ph("scrubber/white.png"), height: "56%", dur: 2.2, style: "caption", text: "Sponge or brush head.", at: "top", zoom: [1, 1.05] },
      { kind: "pair", images: [ph("scrubber/green.png"), ph("scrubber/pink.png")], tone: "stone", dur: 2.6, eyebrow: "WEDRA Discovery #05", text: "Green, white or pink.", zoom: [1, 1.04] },
      end("WEDRA Discovery #05"),
    ],
  },
  espresso: {
    label: "WEDRA Discovery #06",
    gallery: [
      ["01-hero-black", { kind: "studio", image: ph("espresso/studio.png"), height: "78%", tone: "ivory", ...still }],
      ["02-in-hand", { kind: "caption", image: ph("espresso/pour.png"), pos: "50% 64%", ...still }],
      ["03-three-in-one", { kind: "studio", image: ph("espresso/parts.png"), height: "64%", tone: "ivory", ...still }],
      ["04-top", { kind: "caption", image: ph("espresso/top.png"), pos: "50% 50%", ...still }],
      ["05-button-usb-c", { kind: "caption", image: ph("espresso/button.png"), pos: "50% 50%", ...still }],
      ["06-studio-stone", { kind: "studio", image: ph("espresso/studio.png"), height: "70%", tone: "stone", ...still }],
      ["07-with-grinder", { kind: "studio", image: ph("espresso/set.png"), height: "66%", tone: "ivory", ...still }],
    ],
    slide: { kind: "studio", image: ph("espresso/studio.png"), height: "62%", tone: "ivory", eyebrow: "WEDRA Discovery #06", text: "Your coffee,\nwherever you are.", mark: true, ...still },
    video: [
      { kind: "editorial", image: ph("espresso/pour.png"), pos: "50% 38%", dur: 3.2, eyebrow: "WEDRA Discovery #06", text: "Your coffee,\nwherever\nyou go.", textDelay: -1 },
      { kind: "studio", image: ph("espresso/studio.png"), h: { feed: "62%", tall: "40%" }, dur: 2.6, eyebrow: "Portable espresso machine", text: "Self-heating.\n60 ml.", zoom: [1, 1.05] },
      { kind: "studio", image: ph("espresso/parts.png"), h: { feed: "52%", tall: "36%" }, dur: 2.8, eyebrow: "3-in-1", text: "Capsules or\nground coffee.", zoom: [1, 1.04] },
      { kind: "caption", image: ph("espresso/button.png"), pos: "50% 45%", dur: 2.4, text: "Charges by USB-C.", at: "top", mark: true },
      { kind: "caption", image: ph("espresso/pour.png"), pos: "50% 75%", dur: 2.4, text: "Press. Pour. Go.", at: "top", zoom: [1.05, 1.15] },
      end("WEDRA Discovery #06"),
    ],
  },
};

const FORMATS = { gallery: [1080, 1350, "gallery"], "4x5": [1080, 1350, "feed"], "9x16": [1080, 1920, "tall"] };
const resolve = (sc, layout) => {
  const { h, ...rest } = sc;
  if (h) rest.height = h[layout === "tall" ? "tall" : "feed"] || h.feed;
  return rest;
};
async function page(fmt, cfg) {
  const [w, hgt, layout] = FORMATS[fmt];
  const p = await browser.newPage({ viewport: { width: w, height: hgt } });
  await p.goto(pathToFileURL(path.join(HERE, "video.html")).href, { waitUntil: "domcontentloaded" });
  const dur = await p.evaluate((c) => window.setup(c), { ...cfg, layout, scenes: cfg.scenes.map((s) => resolve(s, layout)) });
  await p.evaluate(() => Promise.all([document.fonts.ready, ...[...document.images].map((i) => i.decode().catch(() => {}))]));
  return [p, dur];
}
async function stillShot(fmt, scene, out, caps) {
  const [p] = await page(fmt, { crossfade: 0, scenes: [{ ...scene, dur: 1, caps }] });
  await p.evaluate(() => window.setT(0.999));
  fs.mkdirSync(path.dirname(out), { recursive: true });
  await p.screenshot({ path: out, type: "jpeg", quality: 92 });
  await p.close();
  console.log(`✓ ${path.relative(HERE, out)}`);
}
async function video(fmt, scenes, out) {
  const [p, dur] = await page(fmt, { crossfade: 0.4, scenes });
  const dir = `${out}.frames`;
  fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir, { recursive: true });
  const n = Math.round(dur * FPS);
  for (let i = 0; i < n; i++) {
    await p.evaluate((t) => window.setT(t), i / FPS);
    await p.screenshot({ path: path.join(dir, `f${String(i).padStart(4, "0")}.jpg`), type: "jpeg", quality: 90 });
  }
  await p.close();
  const r = spawnSync(ffmpeg, ["-y", "-loglevel", "error", "-framerate", String(FPS), "-i", path.join(dir, "f%04d.jpg"), "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "19", "-movflags", "+faststart", out]);
  fs.rmSync(dir, { recursive: true, force: true });
  if (r.status !== 0) throw new Error(`ffmpeg failed for ${out}: ${r.stderr}`);
  console.log(`✓ ${path.relative(HERE, out)} (${dur.toFixed(1)} s)`);
}

for (const [key, prod] of Object.entries(products)) {
  if (only && !only.includes(key)) continue;
  const dir = path.join(HERE, "out", "discoveries", key);
  for (const [name, scene] of prod.gallery) await stillShot("gallery", scene, path.join(dir, "gallery", `wedra-${key}-${name}.jpg`), false);
  await stillShot("4x5", prod.slide, path.join(dir, `wedra-${key}-slide-4x5.jpg`), true);
  if (opt.videos === "0") continue;
  for (const fmt of ["4x5", "9x16"]) await video(fmt, prod.video.map((s) => ({ ...s, caps: s.kind !== "caption" })), path.join(dir, `wedra-${key}-video-${fmt}.mp4`));
}
await browser.close();
