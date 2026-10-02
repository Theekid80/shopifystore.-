// Renders the WEDRA Discovery film from a job file.
//   node render.mjs job.json            → every format listed in the job
//   node render.mjs job.json 9x16       → one format
// Needs Node 18+, Playwright (npm i -D playwright; npx playwright install chromium)
// and ffmpeg on PATH (or FFMPEG=/path/to/ffmpeg).
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const HERE = path.dirname(new URL(import.meta.url).pathname);
const FORMATS = { "9x16": [1080, 1920], "4x5": [1080, 1350], "1x1": [1080, 1080], "16x9": [1920, 1080] };
const FPS = 30;

const jobPath = path.resolve(process.argv[2] || "job.json");
const job = JSON.parse(fs.readFileSync(jobPath, "utf8"));
const base = path.dirname(jobPath);
const abs = (p) => pathToFileURL(path.resolve(base, p)).href;
const resolved = {
  ...job,
  productImage: abs(job.productImage),
  lifestyle: (job.lifestyle || []).map((s) => ({ ...s, image: abs(s.image) })),
};
const formats = process.argv[3] ? [process.argv[3]] : job.formats || ["9x16"];
const duration = Math.min(15, Math.max(6, job.duration || 15));
resolved.duration = duration;

let chromium;
try { ({ chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright")); }
catch { console.error("Playwright not found. Run: npm i -D playwright && npx playwright install chromium"); process.exit(1); }
const ffmpeg = process.env.FFMPEG || "ffmpeg";
const outDir = path.join(HERE, "out");
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
for (const f of formats) {
  const size = FORMATS[f];
  if (!size) { console.error(`Unknown format ${f}. Use one of ${Object.keys(FORMATS).join(", ")}`); continue; }
  const [w, h] = size;
  const frames = path.join(outDir, `frames-${f}`);
  fs.rmSync(frames, { recursive: true, force: true });
  fs.mkdirSync(frames);
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto(pathToFileURL(path.join(HERE, "template.html")).href, { waitUntil: "domcontentloaded" });
  await page.evaluate((j) => window.setup(j), resolved);
  await page.evaluate(() => Promise.all([document.fonts.ready, ...[...document.images].map((i) => i.decode().catch(() => {}))]));
  for (let i = 0; i < FPS * duration; i++) {
    await page.evaluate((t) => window.setT(t), i / FPS);
    await page.screenshot({ path: path.join(frames, `f${String(i).padStart(4, "0")}.jpg`), type: "jpeg", quality: 92 });
  }
  await page.close();
  const out = path.join(outDir, `${job.slug || "wedra-discovery"}-${f}.mp4`);
  const r = spawnSync(ffmpeg, ["-y", "-loglevel", "error", "-framerate", String(FPS), "-i", path.join(frames, "f%04d.jpg"),
    "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", "-movflags", "+faststart", out], { stdio: "inherit" });
  if (r.status !== 0) { console.error(`ffmpeg failed for ${f}`); continue; }
  fs.rmSync(frames, { recursive: true, force: true });
  console.log(`✓ ${path.relative(process.cwd(), out)}`);
}
await browser.close();
