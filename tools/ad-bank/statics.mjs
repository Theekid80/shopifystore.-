// Static ads (concepts A–J) in 4:5 and 9:16, and the 5-slide carousel (4:5).
// Uses video.html with a single scene captured at its final state.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

export async function renderStatics(browser, bank, HERE) {
  const photo = (k) => pathToFileURL(path.join(HERE, bank.photos[k])).href;
  const LIFE_WIDE = { image: photo("life"), pos: "50% 50%", zoom: [1, 1] };
  const LIFE_DRINK = { image: photo("life"), pos: "48% 72%", zoom: [1.4, 1.4] };
  const D = bank.discovery, P = bank.product;
  const statics = [
    ["A", "Product hero", { kind: "studio", image: photo("studio"), text: "Your routine.\nMade portable.", mark: true }],
    ["B", "Product + lifestyle", { kind: "editorial", ...LIFE_WIDE, eyebrow: D, text: "Discover something better.", mark: true }],
    ["C", "Portable lifestyle", { kind: "editorial", ...LIFE_WIDE, text: "Smoothie.\nWherever.", mark: true }],
    ["D", "Large product", { kind: "studio", image: photo("studio"), height: "66%", eyebrow: P, text: D, mark: true }],
    ["E", "Close-up", { kind: "studio", image: photo("charge"), height: "52%", eyebrow: "Rechargeable · 350 ml", text: "Small format.\nEveryday convenience.", mark: true }],
    ["F", "Product pair (gym/office version needs footage)", { kind: "pair", images: [photo("studio_tall"), photo("pink")], tone: "stone", text: "The little blender\nthat goes with you.", mark: true }],
    ["G", "Clean editorial product", { kind: "studio", image: photo("pink"), height: "60%", tone: "ivory", eyebrow: D, text: "Found for your everyday.", mark: true }],
    ["H", "Lifestyle", { kind: "editorial", ...LIFE_DRINK, text: "Less setup.\nMore routine.", mark: true }],
    ["I", "UGC-style", { kind: "caption", ...LIFE_WIDE, text: "Why didn’t we find this sooner?", at: "mid" }],
    ["J", "Product reveal", { kind: "studio", image: photo("studio_tall"), height: "64%", tone: "stone", eyebrow: D, text: "One of our latest finds.", mark: true }],
  ];
  const carousel = [
    ["1", { kind: "studio", image: photo("studio"), height: "62%", eyebrow: P, text: D, mark: true }],
    ["2", { kind: "editorial", ...LIFE_WIDE, text: "Small enough\nto take along." }],
    ["3", { kind: "pair", images: [photo("studio_tall"), photo("pink")], tone: "stone", eyebrow: "350 ml · Rechargeable · 50 W", text: "Made for\neveryday routines." }],
    ["4", { kind: "editorial", ...LIFE_DRINK, text: "A simple way\nto make your drink." }],
    ["5", { kind: "end", line: "Discover it at WEDRA.", cta: "Shop the discovery", label: D }],
  ];
  const shot = async (scene, w, h, out) => {
    const page = await browser.newPage({ viewport: { width: w, height: h } });
    await page.goto(pathToFileURL(path.join(HERE, "video.html")).href, { waitUntil: "domcontentloaded" });
    await page.evaluate((c) => window.setup(c), { crossfade: 0, scenes: [{ ...scene, dur: 1, caps: true }] });
    await page.evaluate(() => Promise.all([document.fonts.ready, ...[...document.images].map((i) => i.decode().catch(() => {}))]));
    await page.evaluate(() => window.setT(0.999));
    fs.mkdirSync(path.dirname(out), { recursive: true });
    await page.screenshot({ path: out, type: "jpeg", quality: 92 });
    await page.close();
    console.log(`✓ ${path.relative(HERE, out)}`);
  };
  for (const [id, , scene] of statics) {
    await shot(scene, 1080, 1350, path.join(HERE, "out", "static", `WD01-STATIC-${id}-4x5.jpg`));
    await shot(scene, 1080, 1920, path.join(HERE, "out", "static", `WD01-STATIC-${id}-9x16.jpg`));
  }
  for (const [n, scene] of carousel) await shot(scene, 1080, 1350, path.join(HERE, "out", "carousel", `WD01-CAROUSEL-${n}.jpg`));
}
