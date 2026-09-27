// Clean 4:5 product gallery images (no text) for the Shopify product page.
//   node gallery.mjs → out/web/gallery/*.jpg
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const HERE = path.dirname(new URL(import.meta.url).pathname);
const bank = JSON.parse(fs.readFileSync(path.join(HERE, "bank.json"), "utf8"));
const photo = (k) => pathToFileURL(path.join(HERE, bank.photos[k])).href;
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const shots = [
  ["01-studio-white", { kind: "studio", image: photo("studio_tall"), height: "78%", tone: "ivory", zoom: [1, 1] }],
  ["02-lifestyle", { kind: "caption", image: photo("life"), pos: "50% 50%", zoom: [1, 1] }],
  ["03-pair", { kind: "pair", images: [photo("studio_tall"), photo("pink")], tone: "stone", zoom: [1, 1] }],
  ["04-studio-pink", { kind: "studio", image: photo("pink"), height: "74%", tone: "ivory", zoom: [1, 1] }],
  ["05-drink", { kind: "caption", image: photo("life"), pos: "48% 72%", zoom: [1.4, 1.4] }],
  ["06-base", { kind: "studio", image: photo("charge"), height: "62%", tone: "ivory", zoom: [1, 1] }],
];
const out = path.join(HERE, "out", "web", "gallery");
fs.mkdirSync(out, { recursive: true });
for (const [name, scene] of shots) {
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
  await page.goto(pathToFileURL(path.join(HERE, "video.html")).href, { waitUntil: "domcontentloaded" });
  await page.evaluate((c) => window.setup(c), { crossfade: 0, layout: "gallery", scenes: [{ ...scene, dur: 1 }] });
  await page.evaluate(() => Promise.all([document.fonts.ready, ...[...document.images].map((i) => i.decode().catch(() => {}))]));
  await page.evaluate(() => window.setT(0.999));
  await page.screenshot({ path: path.join(out, `wedra-blender-${name}.jpg`), type: "jpeg", quality: 92 });
  await page.close();
  console.log(`✓ ${name}`);
}
await browser.close();
