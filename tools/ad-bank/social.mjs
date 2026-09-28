// WEDRA organic launch package (TikTok + Instagram), rendered from social-content.mjs.
//   node social.mjs [stills|videos|docs|all] [--only=T01,R02] [--shard=0/4]
//   → out/social/profile/        profile images (1080 × 1080)
//     out/social/photos/<product>/  5 product photos each (1080 × 1350)
//     out/social/feed/          12 Instagram feed posts (1080 × 1350)
//     out/social/videos/        20 TikTok + 10 Reels (1080 × 1920, 9:16), no platform watermarks
//     out/social/*.csv / .md    captions, hashtags, 30-day calendar, tracking sheet
// Master assets carry no TikTok/Instagram marks, so they can be reused for Reels,
// Stories, feed and future paid ads.
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { PRODUCTS, TAGS, VIDEOS, PHOTOS, FEED } from "./social-content.mjs";

const HERE = path.dirname(new URL(import.meta.url).pathname);
const OUT = path.join(HERE, "out", "social");
const FPS = 30;
const [mode = "all", ...rest] = process.argv.slice(2);
const opt = Object.fromEntries(rest.map((a) => a.replace(/^--/, "").split("=")));
const only = opt.only ? opt.only.split(",") : null;
const [si, sn] = (opt.shard || "0/1").split("/").map(Number);
const ffmpeg = process.env.FFMPEG || "ffmpeg";
const font = (f) => pathToFileURL(path.join(HERE, "../../assets", f)).href;

let browser;
async function getBrowser() {
  if (!browser) {
    const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
    browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  }
  return browser;
}
const mk = (f) => fs.mkdirSync(path.dirname(f), { recursive: true });

async function engine(w, h, layout, cfg) {
  const p = await (await getBrowser()).newPage({ viewport: { width: w, height: h } });
  await p.goto(pathToFileURL(path.join(HERE, "video.html")).href, { waitUntil: "domcontentloaded" });
  const dur = await p.evaluate((c) => window.setup(c), { ...cfg, layout });
  await p.evaluate(() => Promise.all([document.fonts.ready, ...[...document.images].map((i) => i.decode().catch(() => {}))]));
  return [p, dur];
}
async function still(scene, out, layout = "feed", caps = true) {
  mk(out);
  if (scene.kind === "grid") return gridPost(scene, out);
  const [p] = await engine(1080, 1350, layout, { crossfade: 0, scenes: [{ ...scene, dur: 1, caps }] });
  await p.evaluate(() => window.setT(0.999));
  await p.screenshot({ path: out, type: "jpeg", quality: 92 });
  await p.close();
  console.log("✓", path.relative(OUT, out));
}
async function html(w, h, body, out) {
  mk(out);
  const p = await (await getBrowser()).newPage({ viewport: { width: w, height: h } });
  const tmp = path.join(OUT, `.tmp-${path.basename(out)}.html`);
  fs.writeFileSync(tmp, `<!doctype html><html><head><style>
    @font-face { font-family: "Cormorant Garamond"; src: url(${font("cormorant-garamond-latin-500-normal.woff2")}); font-weight: 500; }
    @font-face { font-family: Manrope; src: url(${font("manrope-latin-500-normal.woff2")}); font-weight: 500; }
    * { margin: 0; box-sizing: border-box; } body { width: ${w}px; height: ${h}px; overflow: hidden; font-family: Manrope, sans-serif; }
  </style></head><body>${body}</body></html>`);
  await p.goto(pathToFileURL(tmp).href, { waitUntil: "load" });
  fs.rmSync(tmp);
  await p.evaluate(() => Promise.all([document.fonts.ready, ...[...document.images].map((i) => i.decode().catch(() => {}))]));
  await p.screenshot({ path: out, type: out.endsWith(".png") ? "png" : "jpeg", ...(out.endsWith(".png") ? {} : { quality: 92 }) });
  await p.close();
  console.log("✓", path.relative(OUT, out));
}
function gridPost(s, out) {
  const cells = s.images.map((src) => `<div style="background:url('${src}') center/cover;"></div>`).join("");
  return html(1080, 1350, `<div style="width:1080px;height:1350px;background:#F7F5F0;padding:64px;display:flex;flex-direction:column;gap:40px;">
    <div style="text-align:center;color:#111;"><p style="font-size:22px;letter-spacing:.3em;text-transform:uppercase;color:#67645E;">${s.sub}</p>
    <p style="font-family:'Cormorant Garamond',serif;font-size:84px;line-height:1.05;margin-top:14px;text-transform:uppercase;letter-spacing:.02em;">${s.title}</p></div>
    <div style="flex:1;display:grid;grid-template-columns:1fr 1fr;gap:16px;">${cells}</div>
    <p style="text-align:center;font-size:22px;letter-spacing:.5em;padding-left:.5em;color:#111;">WEDRA</p></div>`, out);
}

// ---------- Stills ----------
async function stills() {
  // Profile image: the WEDRA wordmark, sized for the circular crop on both apps.
  const mark = (bg, fg) => `<div style="width:1080px;height:1080px;background:${bg};display:grid;place-items:center;">
    <p style="color:${fg};font-size:118px;font-weight:500;letter-spacing:.34em;padding-left:.34em;">WEDRA</p></div>`;
  await html(1080, 1080, mark("#161615", "#F7F5F0"), path.join(OUT, "profile", "wedra-profile-charcoal.png"));
  await html(1080, 1080, mark("#F7F5F0", "#161615"), path.join(OUT, "profile", "wedra-profile-ivory.png"));
  for (const [prod, list] of Object.entries(PHOTOS))
    for (const [slot, scene] of list) await still(scene, path.join(OUT, "photos", prod, `wedra-${prod}-${slot}.jpg`), scene.text ? "feed" : "gallery", !!scene.text);
  for (const f of FEED) await still(f.scene, path.join(OUT, "feed", `${f.id}-${f.product}.jpg`), "feed", true);
}

// ---------- Videos ----------
// Every video runs at least MIN_LEN seconds: content scenes are lengthened in
// proportion (the end card keeps its length), so the cuts and order stay the same.
const MIN_LEN = 16;
const stretch = (scenes) => {
  const total = scenes.reduce((n, s) => n + s.dur, 0);
  if (total >= MIN_LEN) return scenes;
  const endDur = scenes.filter((s) => s.kind === "end").reduce((n, s) => n + s.dur, 0);
  const k = (MIN_LEN - endDur) / (total - endDur);
  return scenes.map((s) => (s.kind === "end" ? s : { ...s, dur: +(s.dur * k).toFixed(2) }));
};
async function videos() {
  const list = VIDEOS.filter((v) => !only || only.includes(v.id)).filter((v, i) => i % sn === si);
  for (const v of list) {
    const out = path.join(OUT, "videos", `${v.id}-${v.product}.mp4`);
    if (fs.existsSync(out) && !opt.force) { console.log("=", v.id); continue; }
    mk(out);
    const scenes = stretch(v.scenes).map((s, i) => ({ ...s, caps: s.kind !== "caption", textDelay: i === 0 ? -1 : undefined }));
    const [p, dur] = await engine(1080, 1920, "tall", { crossfade: v.style === "premium" ? 0.45 : 0.18, scenes });
    const dir = `${out}.frames`; fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir, { recursive: true });
    const n = Math.round(dur * FPS);
    for (let i = 0; i < n; i++) {
      await p.evaluate((t) => window.setT(t), i / FPS);
      await p.screenshot({ path: path.join(dir, `f${String(i).padStart(4, "0")}.jpg`), type: "jpeg", quality: 90 });
    }
    await p.close();
    const r = spawnSync(ffmpeg, ["-y", "-loglevel", "error", "-framerate", String(FPS), "-i", path.join(dir, "f%04d.jpg"), "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "20", "-movflags", "+faststart", out]);
    fs.rmSync(dir, { recursive: true, force: true });
    if (r.status !== 0) throw new Error(`ffmpeg ${v.id}: ${r.stderr}`);
    console.log(`✓ ${v.id} (${dur.toFixed(1)} s)`);
  }
}

// ---------- Docs: captions, calendar, tracking ----------
const csv = (rows) => rows.map((r) => r.map((c) => `"${String(c ?? "").replace(/"/g, '""')}"`).join(",")).join("\n") + "\n";
const onScreen = (v) => v.scenes.map((s) => (s.text || (s.kind === "end" ? `${s.line} ${s.cta}` : "")).replace(/\n/g, " ")).filter(Boolean).join(" | ");
const dur = (v) => stretch(v.scenes).reduce((n, s) => n + s.dur, 0).toFixed(0);

export function calendar() {
  // Week 1 sets the identity (brand + Discovery #01 + each product once); weeks 2–4 rotate
  // products, with a "double down" slot each week for whichever product performed best.
  const T = Object.fromEntries(VIDEOS.map((v) => [v.id, v]));
  const F = Object.fromEntries(FEED.map((f) => [f.id, f]));
  const plan = [
    // [TikTok video, Instagram item(s)]
    ["T01", ["F01", "F02", "F03"]], ["T02", ["R01"]], ["T03", ["F04"]], ["T04", ["R02"]], ["T05", ["F05"]], ["T06", ["R03"]], ["T13", ["F06", "Story: Q&A 'Which find should we show next?'"]],
    ["T07", ["R04"]], ["T08", ["F07"]], ["T09", ["R05"]], ["T10", ["F08"]], ["T11", ["R06"]], ["T12", ["F09"]], ["T20", ["Story: repost the week's best TikTok"]],
    ["T14", ["R07"]], ["T15", ["F10"]], ["T16", ["R08"]], ["T17", ["F11"]], ["T18", ["R09"]], ["T19", ["F12"]], ["R01", ["Story: poll 'Spray or pour?'"]],
    ["R02", ["R10"]], ["R03", ["Story: repost the week's best Reel"]], ["BEST", ["Carousel: F02 + photos of the best product"]], ["R05", ["Story: behind the discovery"]], ["R06", ["Reel: repost best TikTok of weeks 1–3"]], ["BEST", ["Story: link sticker to best product"]], ["R07", ["Feed: best product's editorial photo"]],
    ["R09", ["Story: Q&A"]], ["BEST", ["Reel: best-performing video, new hook"]],
  ];
  const rows = [["Day", "Platform", "Time (ET)", "Pillar", "Product", "Asset", "Hook", "Caption", "CTA", "Hashtags"]];
  plan.forEach(([t, igs], i) => {
    const day = i + 1;
    if (t === "BEST") rows.push([day, "TikTok", "7:00 PM", "Double down", "Best performer", "Re-post the best TikTok so far with a new hook from the hook bank", "Pick from the hook bank for that product", "Reuse the original caption", "Discover it at wedra.co", "Same as original"]);
    else { const v = T[t]; rows.push([day, "TikTok", day % 2 ? "7:00 PM" : "12:30 PM", v.series, PRODUCTS[v.product].name, `videos/${v.id}-${v.product}.mp4`, v.hook, v.caption, v.cta, TAGS[v.product].join(" ")]); }
    for (const ig of igs) {
      if (T[ig]) { const v = T[ig]; rows.push([day, "Instagram Reel", "6:30 PM", v.series, PRODUCTS[v.product].name, `videos/${v.id}-${v.product}.mp4`, v.hook, v.caption, v.cta, TAGS[v.product].join(" ")]); }
      else if (F[ig]) { const f = F[ig]; rows.push([day, "Instagram feed", "11:00 AM", f.pillar, PRODUCTS[f.product].name, `feed/${f.id}-${f.product}.jpg`, "", f.caption, f.cta, TAGS[f.product].join(" ")]); }
      else rows.push([day, "Instagram Stories", "1:00 PM", "Community", "—", ig, "", "", "Link sticker: wedra.co", ""]);
    }
  });
  return rows;
}

function docs() {
  fs.mkdirSync(OUT, { recursive: true });
  const content = [["ID", "Platform", "Posting order", "Product", "Series", "Length (s)", "File", "Hook", "On-screen text", "Caption", "CTA", "Hashtags"]];
  VIDEOS.forEach((v, i) => content.push([v.id, v.platform, i < 20 ? i + 1 : i - 19, PRODUCTS[v.product].name, v.series, dur(v), `videos/${v.id}-${v.product}.mp4`, v.hook, onScreen(v), v.caption, v.cta, TAGS[v.product].join(" ")]));
  FEED.forEach((f, i) => content.push([f.id, "Instagram feed", i + 1, PRODUCTS[f.product].name, f.pillar, "", `feed/${f.id}-${f.product}.jpg`, "", (f.scene.text || f.scene.title || "").replace(/\n/g, " "), f.caption, f.cta, TAGS[f.product].join(" ")]));
  fs.writeFileSync(path.join(OUT, "WEDRA-content-plan.csv"), csv(content));
  fs.writeFileSync(path.join(OUT, "WEDRA-30-day-calendar.csv"), csv(calendar()));
  const track = [["Date", "Platform", "Asset ID", "Views", "Avg watch time (s)", "Completion rate %", "Likes", "Comments", "Shares", "Saves", "Profile visits", "Website clicks", "Add to cart (Shopify)", "Purchases (Shopify)", "Notes"]];
  fs.writeFileSync(path.join(OUT, "WEDRA-tracking.csv"), csv(track));
  const md = guide();
  fs.writeFileSync(path.join(OUT, "WEDRA-launch-guide.md"), md);
  fs.writeFileSync(path.join(HERE, "../../docs/social-launch.md"), md);
  console.log("✓ content plan, calendar, tracking sheet, launch guide");
}

function guide() {
  const esc = (x) => String(x ?? "").replace(/\|/g, "/").replace(/\n/g, " ");
  const vids = (plat) => VIDEOS.filter((v) => v.platform === plat).map((v, i) =>
    `| ${i + 1} | ${v.id} | ${esc(PRODUCTS[v.product].name)} | ${esc(v.series)} | ${dur(v)} s | ${esc(v.hook)} | ${esc(onScreen(v))} | ${esc(v.caption)} | ${esc(v.cta)} | ${TAGS[v.product].join(" ")} |`).join("\n");
  const feed = FEED.map((f, i) => `| ${i + 1} | ${f.id} | ${esc(PRODUCTS[f.product].name)} | ${f.pillar} | ${esc(f.caption)} | ${esc(f.cta)} | ${TAGS[f.product].join(" ")} |`).join("\n");
  const cal = calendar().slice(1).map((r) => `| ${r[0]} | ${r[1]} | ${r[2]} | ${esc(r[5])} | ${esc(r[6])} | ${esc(r[4])} |`).join("\n");
  return `# WEDRA — TikTok + Instagram organic launch package

Everything here is for the **existing** WEDRA TikTok Business and Instagram
Business accounts. Nothing creates or duplicates an account. Every asset uses
only the five current products and their verified facts; no health, battery
life, ice, airtight, freshness, waterproof or accuracy claims; no supplier
names; no platform watermarks on master files.

Files (in the package zip / \`tools/ad-bank/out/social/\`):

| Folder / file | What |
| --- | --- |
| \`profile/\` | Profile image, charcoal (recommended) and ivory, 1080 × 1080 |
| \`photos/<product>/\` | 5 product photos per product: hero, lifestyle, detail, in-use, editorial (1080 × 1350) |
| \`feed/\` | 12 Instagram feed posts F01–F12 (1080 × 1350) |
| \`videos/\` | 20 TikTok videos T01–T20 and 10 Reels R01–R10 (1080 × 1920, 9:16) |
| \`WEDRA-content-plan.csv\` | Every video and post: hook, on-screen text, caption, CTA, hashtags, order |
| \`WEDRA-30-day-calendar.csv\` | Day-by-day schedule for both platforms |
| \`WEDRA-tracking.csv\` | Weekly results sheet |

## 1. Profiles

**Profile image (both apps):** \`profile/wedra-profile-charcoal.png\` (the
wordmark sits inside the circular crop).

**TikTok** — Name: WEDRA · Bio:
\`\`\`
Products worth discovering.
Better finds for everyday living.
↓ wedra.co
\`\`\`
Website field: \`https://wedra.co/?utm_source=tiktok&utm_medium=social&utm_campaign=organic_launch\`

**Instagram** — Name: WEDRA · Category: Shopping & retail · Bio:
\`\`\`
Products worth discovering.
Curated for better everyday living.
Discover better ↓
wedra.co
\`\`\`
Link: \`https://wedra.co/?utm_source=instagram&utm_medium=social&utm_campaign=organic_launch\`
Story highlights (covers: ivory profile image): Discoveries · Kitchen · How it works.

## 2. Content series and hook bank

Recurring formats: **WEDRA Discovery #0X** (one product, editorial) ·
**WEDRA Finds** (a themed edit) · **Products Worth Discovering** (brand) ·
**I Found This** (first-person curiosity) · **You Didn't Know You Needed This**
(small problem → find).

Brand hooks: "Okay... why did nobody show me this sooner?" · "I wasn't looking
for this. Then I found it." · "This might be one of the most useful things I
found this week." · "You probably didn't know you needed this." · "WEDRA
Discovery #01." · "Another WEDRA discovery." · "We look for the products you
didn't know you wanted." · "Found for your everyday." · "Products worth
discovering." · "Wait until you see what this does."

Product hooks:
- **Blender:** "Your smoothie. Your routine. Anywhere." · "Small enough to take along." · "A blender shaped like a bottle." · "White or pink?" · "Breakfast at your desk, one drink at a time."
- **Oil sprayer:** "Spray or pour. Same bottle." · "A fine mist for the pan." · "One cap, two ways." · "The bottle that does two jobs." · "Salad, pan, air fryer."
- **Measuring spoon:** "A spoon with a screen." · "Measure as you scoop." · "Three buttons. That's the whole manual." · "The scale stays in the drawer." · "Coffee, measured in one move."
- **Bag sealer:** "Close the bag. Properly." · "Swap the drawer of clips." · "It lives on the fridge." · "Seal it, or cut it open." · "Which bags does it work with?"
- **Spin scrubber:** "The small help at the sink." · "Sponge or brush. Click and swap." · "POV: the washing-up, a little easier." · "Compact. Cordless. At the sink." · "Pots, bowls, the sink edge."

CTAs (rotate; most posts are not "buy now"): Discover it at wedra.co · Found
on WEDRA. · Discover better. · See the full discovery at wedra.co.

## 3. TikTok — 20 videos (post in this order)

| Order | ID | Product | Series | Length | Hook | On-screen text | Caption | CTA | Hashtags |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
${vids("TikTok")}

Posting: upload natively, add a trending *instrumental* sound at low volume
(the files are silent so you can pick current audio), keep the in-video text
visible (all text sits inside the TikTok safe zone), pin T01, T02 and T13.

## 4. Instagram Reels — 10 videos (post in this order)

| Order | ID | Product | Series | Length | Hook | On-screen text | Caption | CTA | Hashtags |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
${vids("Instagram Reels")}

Cover image: the first frame, or the matching product's hero photo. Share
each Reel to Stories with a link sticker to the product.

## 5. Instagram feed — 12 posts (post in this order)

| Order | ID | Product | Pillar | Caption | CTA | Hashtags |
| --- | --- | --- | --- | --- | --- | --- |
${feed}

The grid alternates brand cards, product photography and lifestyle, so the
profile reads as one curated brand. After all 12 are posted the top row is
F12 · F11 · F10.

## 6. Product photos (25)

Each product has hero, lifestyle, detail, in-use and editorial images in
\`photos/<product>/\`, built from the real product photos (supplier text and
graphics removed). Some products only have one real lifestyle scene, so a few
slots are different crops of the same photo: blender lifestyle / in-use, oil
hero / in-use, scrubber lifestyle / in-use, and the spoon's lifestyle slot is a
studio stand-in. Replace them with new shots using these prompts (attach the
product's hero photo as the reference, and use the master template in
\`docs/ai-creative-system.md\` with its product lock):

- **Spoon — lifestyle:** "Morning coffee station on a warm oak counter, soft window light from the left. A hand scoops whole coffee beans with the exact digital measuring spoon from the reference (black oval scoop, silver-white handle with LCD display, triangular black button pad labelled MODE, TARE, HOLD). Grinder and ceramic cup softly out of focus. 4:5, 50 mm, natural colours, no text."
- **Blender — in use:** "Kitchen counter in morning light. A hand pours a strawberry smoothie from the exact portable blender in the reference (clear bottle-shaped jar, ring carry loop, white base with 'FRESH JUICE' print) into a short glass. 4:5, natural, no text."
- **Oil sprayer — hero:** "The exact oil sprayer from the reference (tall cylindrical clear glass bottle, golden oil, cream-beige top unit with top button, rear trigger, front nozzle and flip-cap spout) standing alone on warm white #F7F5F0, soft shadow, three-quarter view. 4:5, no text."
- **Scrubber — in use:** "Hand holding the exact sage-green spin scrubber from the reference by its handle, sponge head on a stainless pan with light suds in a bright sink. True scale. 4:5, no text."
- **Bag sealer — in use:** "Hands sliding the exact white bag sealer from the reference along the top of a plain, unbranded clear plastic snack bag on a light oak table. No brand packaging. 4:5, no text."

Never change the product's shape, colour, buttons or printing, add
accessories or text, or show other brands' packaging.

## 7. 30-day calendar

Week 1 establishes WEDRA (brand intro, Discovery #01, each product once, the
first three feed posts together on day 1). Weeks 2–4 rotate products; the
"Double down" slots re-post whichever video performed best (by completion
rate and shares) with a fresh hook from the bank. Full detail with captions
and hashtags: \`WEDRA-30-day-calendar.csv\`.

| Day | Platform | Time (ET) | Asset | Hook | Product |
| --- | --- | --- | --- | --- | --- |
${cal}

## 8. Repurposing

All videos are 9:16 masters without platform marks: the same file posts to
TikTok, Reels and Stories. For the feed and future paid ads, the 4:5 and 1:1
cuts come from the same scenes (\`node discoveries.mjs\` / \`render.mjs\`),
and the product photos double as ad images. Keep the original files; never
re-upload a video downloaded from TikTok (it carries the watermark).

## 9. Tracking (organic)

Each Sunday, fill \`WEDRA-tracking.csv\` from TikTok Analytics and Instagram
Insights (views, average watch time, completion rate, likes, comments,
shares, saves, profile visits, link clicks) and Shopify Analytics (sessions
by UTM source, add-to-cart, purchases). Judge a post on completion rate,
shares and saves first, then clicks and add-to-cart. Only call something a
hit when the numbers say so; never describe a post as viral without data.
`;
}

if (["stills", "all"].includes(mode)) await stills();
if (["videos", "all"].includes(mode)) await videos();
if (["docs", "all"].includes(mode)) docs();
if (browser) await browser.close();
