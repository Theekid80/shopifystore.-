// Renders WEDRA colour cards (1080x1350) from downloaded supplier photos.
// Usage: node render.mjs   (reads jobs.json, photos in ./photos/<n>.<ext>, writes ./out/)
// Set "label" (and optionally "swatch") in jobs.json first; toiletry labels
// should describe the design you see, e.g. "Burgundy" or "Flamingo print".
import fs from "node:fs";
let chromium;
try { ({ chromium } = await import("playwright")); } catch { ({ chromium } = await import("/opt/node22/lib/node_modules/playwright/index.mjs")); }
const D = new URL("./", import.meta.url).pathname;
fs.mkdirSync(`${D}out`, { recursive: true });
const jobs = JSON.parse(fs.readFileSync(`${D}jobs.json`, "utf8"));
const b = await chromium.launch(fs.existsSync("/opt/pw-browsers/chromium") ? { executablePath: "/opt/pw-browsers/chromium" } : {});
const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
for (const j of jobs) {
  const photo = fs.readdirSync(`${D}photos`).find((f) => f.startsWith(`${j.n}.`));
  if (!photo) { console.log(`skip ${j.n}: no photo`); continue; }
  await p.goto(`file://${D}color.html`);
  await p.evaluate(([src, j]) => {
    const i = document.getElementById("img"); i.src = src;
    document.getElementById("panel").className = "panel contain";
    document.getElementById("prod").textContent = j.eyebrow;
    document.getElementById("col").textContent = j.label;
    const sw = document.getElementById("sw");
    if (j.swatch) sw.style.background = j.swatch; else sw.style.display = "none";
  }, [`photos/${photo}`, j]);
  await p.evaluate(() => Promise.all([document.fonts.ready, ...[...document.images].map((i) => i.decode())]));
  const slug = `${j.eyebrow}-${j.label}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  await p.screenshot({ path: `${D}out/${String(j.n).padStart(2, "0")}-wedra-${slug}.jpg`, type: "jpeg", quality: 90 });
  console.log(`rendered ${j.n} ${j.label}`);
}
await b.close();
