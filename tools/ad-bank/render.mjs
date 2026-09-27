// WEDRA ad bank renderer.
//   node render.mjs videos [--format=9x16|4x5|1x1|16x9] [--set=round1] [--only=H01] [--shard=0/4]
//        → out/video/<format>/<id>-<format>.mp4
//        --cta="Link in bio" --dir=organic --tag=ORG  → organic versions (own CTA, folder, file tag)
//        existing files are skipped unless --force
//   node render.mjs statics  → out/static/<format>/ (4x5, 9x16, 1x1, 191x1) + out/carousel/<format>/ (4x5, 1x1)
// Reads bank.json (hooks, ads, CTAs, facts, photo paths). Photos live in photos/ (git-ignored).
// Needs Playwright and ffmpeg (FFMPEG, CHROMIUM_PATH, PLAYWRIGHT_MODULE env overrides).
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const HERE = path.dirname(new URL(import.meta.url).pathname);
const bank = JSON.parse(fs.readFileSync(path.join(HERE, "bank.json"), "utf8"));
const photo = (k) => pathToFileURL(path.join(HERE, bank.photos[k])).href;
const FPS = 30;
const mode = process.argv[2] || "videos";
const opt = Object.fromEntries(process.argv.slice(3).map((a) => a.replace(/^--/, "").split("=")));
const [shardIndex, shardCount] = (opt.shard || "0/1").split("/").map(Number);
const fmt = opt.format || "9x16";
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
const ffmpeg = process.env.FFMPEG || "ffmpeg";
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});

// Crops of the lifestyle photo used as "close-ups" (object-position + zoom).
const LIFE_LID = { image: photo("life"), pos: "50% 18%", zoom: [1.55, 1.7] };
const LIFE_WIDE = { image: photo("life"), pos: "50% 50%", zoom: [1.0, 1.08] };
const LIFE_DRINK = { image: photo("life"), pos: "48% 72%", zoom: [1.45, 1.6] };
const LIFE_BERRIES = { image: photo("life"), pos: "88% 60%", zoom: [1.35, 1.45] };

function opening(ad, kind, dur, extra = {}) {
  if (ad.open === "studio") return { kind: "studio", image: photo("studio_tall"), dur, zoom: [1.0, 1.06], style: kind === "editorial" ? undefined : "caption", text: ad.text, at: "top", ...extra };
  if (ad.open === "pink") return { kind: "studio", image: photo("pink"), dur, zoom: [1.0, 1.06], height: "58%", style: kind === "editorial" ? undefined : "caption", text: ad.text, at: "top", ...extra };
  return { kind, ...(kind === "editorial" ? LIFE_LID : LIFE_WIDE), dur, text: ad.text, at: "mid", ...extra };
}

function build(ad) {
  const end = (dur) => ({ kind: "end", dur, cta: ad.cta, label: bank.discovery, line: "Products worth discovering." });
  if (ad.structure === "fast") return { crossfade: 0.08, scenes: [          // 12 s
    { ...opening(ad, "caption", 1.3), textDelay: -1 },
    { kind: "studio", image: photo(ad.open === "pink" ? "studio_tall" : "pink"), height: ad.open === "pink" ? "62%" : "58%", dur: 1.9, eyebrow: bank.discovery, text: bank.product, zoom: [1.02, 1.08] },
    { kind: "caption", ...LIFE_WIDE, dur: 2.0, text: "350 ml. Rechargeable.", at: "low", mark: true },
    { kind: "studio", image: photo("charge"), height: "56%", dur: 1.8, style: "caption", text: "Charges by cable.", at: "top", zoom: [1.0, 1.05] },
    { kind: "caption", ...LIFE_DRINK, dur: 2.8, text: "Your drink, ready.", at: "low" },
    end(2.2) ] };
  if (ad.structure === "premium") return { crossfade: 0.45, scenes: [       // 15 s
    { ...opening(ad, "editorial", 2.4, { eyebrow: bank.discovery }), textDelay: -1 },
    { kind: "editorial", ...LIFE_WIDE, dur: 3.0, eyebrow: "Found for your everyday", text: "Small format. Everyday use." },
    { kind: "pair", images: [photo("studio_tall"), photo("pink")], tone: "ivory", dur: 3.4, eyebrow: "350 ml · Rechargeable · 50 W", text: bank.product, zoom: [1.0, 1.04] },
    { kind: "editorial", ...LIFE_DRINK, dur: 3.2, text: "Your smoothie. Your routine." },
    end(3.0) ] };
  return { crossfade: 0.12, scenes: [                                      // native, 10 s
    { ...opening(ad, "caption", 2.6), textDelay: -1 },
    { kind: "studio", image: photo(ad.open === "studio" ? "pink" : "studio_tall"), dur: 1.6, style: "caption", text: "Compact. About 22 cm tall.", at: "top", zoom: [1.0, 1.05] },
    { kind: "caption", ...LIFE_BERRIES, dur: 1.4, text: "Make one drink at a time.", at: "top" },
    { kind: "caption", ...LIFE_DRINK, dur: 1.8, text: "350 ml. Rechargeable.", at: "low", mark: true },
    end(2.6) ] };
}

async function renderVideo(ad, fmt) {
  const { size: [w, h], layout } = bank.formats[fmt];
  const tag = opt.tag ? `-${opt.tag}` : "";
  const outDir = path.join(HERE, "out", opt.dir || "video", fmt);
  const out = path.join(outDir, `${ad.id}${tag}-${fmt}.mp4`);
  if (fs.existsSync(out) && !opt.force) { console.log(`= ${path.basename(out)} (exists)`); return; }
  if (opt.cta) ad = { ...ad, cta: opt.cta };
  const cfg = { ...build(ad), layout };
  const dur = cfg.scenes.reduce((n, s) => n + s.dur, 0);
  const dir = path.join(HERE, "out", "frames", `${ad.id}-${fmt}`);
  fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir, { recursive: true });
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto(pathToFileURL(path.join(HERE, "video.html")).href, { waitUntil: "domcontentloaded" });
  await page.evaluate((c) => window.setup(c), cfg);
  await page.evaluate(() => Promise.all([document.fonts.ready, ...[...document.images].map((i) => i.decode().catch(() => {}))]));
  const n = Math.round(dur * FPS);
  for (let i = 0; i < n; i++) {
    await page.evaluate((t) => window.setT(t), i / FPS);
    await page.screenshot({ path: path.join(dir, `f${String(i).padStart(4, "0")}.jpg`), type: "jpeg", quality: 90 });
  }
  await page.close();
  fs.mkdirSync(outDir, { recursive: true });
  const r = spawnSync(ffmpeg, ["-y", "-loglevel", "error", "-framerate", String(FPS), "-i", path.join(dir, "f%04d.jpg"), "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "19", "-movflags", "+faststart", out]);
  fs.rmSync(dir, { recursive: true, force: true });
  if (r.status !== 0) throw new Error(`ffmpeg failed for ${ad.id}: ${r.stderr}`);
  console.log(`✓ ${path.basename(out)} (${dur.toFixed(1)} s)`);
}

if (mode === "videos") {
  const set = opt.set ? bank.sets[opt.set] : null;
  const ads = bank.ads
    .filter((a) => (!set || set.includes(a.hook)) && (!opt.only || opt.only.split(",").some((o) => a.id.includes(o))))
    .filter((a, i) => i % shardCount === shardIndex);
  for (const ad of ads) await renderVideo(ad, fmt);
} else if (mode === "statics") {
  const { renderStatics } = await import("./statics.mjs");
  await renderStatics(browser, bank, HERE);
}
await browser.close();
