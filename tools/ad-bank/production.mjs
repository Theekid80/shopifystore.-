// WEDRA organic creative production package, built on the launch package
// (social.mjs). Renders the 30-video production library and story frames,
// and assembles everything into the 01–15 delivery folders.
//   node production.mjs [videos|stills|docs|all] [--only=BL-V1,OS-V3] [--shard=0/4] [--force]
//   node production.mjs videos --only=BL-V3 --hook="New hook text"   (week-4 re-cut of a winner)
//   → out/production/01-Profile-Creative … 15-Final-Posting-Checklist
// Needs the launch package first (node social.mjs stills) for profile images and photos.
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { PRODUCTS, TAGS, VIDEOS, FEED } from "./social-content.mjs";
import { PRODUCTION, TYPES, CODES, WEEK, STORIES, PHOTO_SLOTS } from "./production-content.mjs";

const HERE = path.dirname(new URL(import.meta.url).pathname);
const SOCIAL = path.join(HERE, "out", "social");
const OUT = path.join(HERE, "out", "production");
const FPS = 30;
const [mode = "all", ...rest] = process.argv.slice(2);
const opt = Object.fromEntries(rest.map((a) => { const [k, ...v] = a.replace(/^--/, "").split("="); return [k, v.join("=") || true]; }));
const only = opt.only ? opt.only.split(",") : null;
const [si, sn] = (opt.shard || "0/1").split("/").map(Number);
const ffmpeg = process.env.FFMPEG || "ffmpeg";
const font = (f) => pathToFileURL(path.join(HERE, "../../assets", f)).href;
const mk = (f) => fs.mkdirSync(path.dirname(f), { recursive: true });

const NAMES = { blender: "Blender", oil: "Oil-Sprayer", spoon: "Measuring-Spoon", sealer: "Bag-Sealer", scrubber: "Spin-Scrubber" };
const ORDER = ["blender", "oil", "spoon", "sealer", "scrubber"];
export const DIR = {
  profile: "01-Profile-Creative",
  ...Object.fromEntries(ORDER.flatMap((p, i) => [[`${p}:photos`, `${String(2 + i * 2).padStart(2, "0")}-${NAMES[p]}-Photos`], [`${p}:videos`, `${String(3 + i * 2).padStart(2, "0")}-${NAMES[p]}-Videos`]])),
  calendar: "12-30-Day-Calendar", captions: "13-Captions-Hooks-CTAs", tracker: "14-Creative-Testing-Tracker", checklist: "15-Final-Posting-Checklist",
};
const videoFile = (v) => `WEDRA-${v.n}-${v.id}.mp4`;
const len = (v) => v.scenes.reduce((n, s) => n + s.dur, 0);
const label = (v) => ({ PRODUCT: PRODUCTS[v.product].name, HOOK: v.hook, ANGLE: TYPES[v.type].angle, FORMAT: `9:16 video · 1080 × 1920 · ${len(v).toFixed(0)} s · silent master`, WEEK: WEEK[v.product], "VIDEO NUMBER": `${v.n} (${v.id})` });
const labelLine = (v) => Object.entries(label(v)).map(([k, x]) => `${k}: ${x}`).join(" | ");

let browser;
async function getBrowser() {
  if (!browser) {
    const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
    browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  }
  return browser;
}
async function engine(w, h, layout, cfg) {
  const p = await (await getBrowser()).newPage({ viewport: { width: w, height: h } });
  await p.goto(pathToFileURL(path.join(HERE, "video.html")).href, { waitUntil: "domcontentloaded" });
  const dur = await p.evaluate((c) => window.setup(c), { ...cfg, layout });
  await p.evaluate(() => Promise.all([document.fonts.ready, ...[...document.images].map((i) => i.decode().catch(() => {}))]));
  return [p, dur];
}

// ---------- Videos ----------
async function videos() {
  const list = PRODUCTION.filter((v) => !only || only.includes(v.id)).filter((v, i) => i % sn === si);
  for (const v0 of list) {
    // --hook re-cuts a video with a new opening line (week 4 winner variations).
    const v = opt.hook ? { ...v0, hook: opt.hook, scenes: [{ ...v0.scenes[0], text: opt.hook.replace(/\\n/g, "\n") }, ...v0.scenes.slice(1)] } : v0;
    const suffix = opt.hook ? `-alt-${opt.suffix || "a"}` : "";
    const out = path.join(OUT, DIR[`${v.product}:videos`], videoFile(v).replace(".mp4", `${suffix}.mp4`));
    if (fs.existsSync(out) && !opt.force && !opt.hook) { console.log("=", v.id); continue; }
    mk(out);
    const scenes = v.scenes.map((s, i) => ({ ...s, caps: s.kind !== "caption", textDelay: i === 0 ? -1 : undefined }));
    const [p, dur] = await engine(1080, 1920, "tall", { crossfade: TYPES[v.type].xf, scenes });
    const dir = `${out}.frames`; fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir, { recursive: true });
    const n = Math.round(dur * FPS);
    for (let i = 0; i < n; i++) {
      await p.evaluate((t) => window.setT(t), i / FPS);
      await p.screenshot({ path: path.join(dir, `f${String(i).padStart(4, "0")}.jpg`), type: "jpeg", quality: 90 });
    }
    await p.close();
    const r = spawnSync(ffmpeg, ["-y", "-loglevel", "error", "-framerate", String(FPS), "-i", path.join(dir, "f%04d.jpg"),
      "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "20", "-movflags", "+faststart",
      "-metadata", `title=WEDRA ${v.n} ${v.id}`, "-metadata", `comment=${labelLine(v)}`, out]);
    fs.rmSync(dir, { recursive: true, force: true });
    if (r.status !== 0) throw new Error(`ffmpeg ${v.id}: ${r.stderr}`);
    console.log(`✓ ${v.n} ${v.id} (${dur.toFixed(1)} s)`);
  }
}

// ---------- Stills: photos (labelled copies), story frames, highlight covers, profile ----------
async function frame(scene, out) {
  mk(out);
  const [p] = await engine(1080, 1920, "tall", { crossfade: 0, scenes: [{ ...scene, dur: 1, zoom: [1, 1], caps: scene.kind !== "caption" }] });
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
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: out, type: "png" });
  await p.close();
  console.log("✓", path.relative(OUT, out));
}
const copy = (from, to) => { mk(to); fs.copyFileSync(from, to); };

async function stills() {
  const prof = path.join(OUT, DIR.profile);
  for (const f of ["wedra-profile-charcoal.png", "wedra-profile-ivory.png"]) copy(path.join(SOCIAL, "profile", f), path.join(prof, f));
  // Highlight covers: one word inside the circle crop, ivory on charcoal.
  for (const [i, word] of ["Discoveries", "Kitchen", "How it works"].entries())
    await html(1080, 1920, `<div style="width:1080px;height:1920px;background:#F7F5F0;display:grid;place-items:center;">
      <div style="text-align:center;color:#161615;"><p style="font-size:34px;letter-spacing:.5em;padding-left:.5em;">WEDRA</p>
      <p style="font-family:'Cormorant Garamond',serif;font-size:120px;line-height:1;margin-top:26px;">${word}</p></div></div>`,
      path.join(prof, "highlight-covers", `highlight-${i + 1}-${word.toLowerCase().replace(/ /g, "-")}.png`));
  for (const [i, [name, scene]] of STORIES.brand.entries()) await frame(scene, path.join(prof, "stories", `WEDRA-BRAND-S${i + 1}-${name}.jpg`));
  for (const p of ORDER) {
    const dir = path.join(OUT, DIR[`${p}:photos`]);
    Object.entries(PHOTO_SLOTS).forEach(([from, slot], i) => copy(path.join(SOCIAL, "photos", p, `wedra-${p}-${from}.jpg`), path.join(dir, `WEDRA-${CODES[p]}-P${i + 1}-${slot}.jpg`)));
    for (const [i, [name, scene]] of STORIES[p].entries()) await frame(scene, path.join(dir, "stories", `WEDRA-${CODES[p]}-S${i + 1}-${name}.jpg`));
  }
}

// ---------- 30-day calendar ----------
const L = (id) => { const t = VIDEOS.find((x) => x.id === id); return t ? { lib: true, id, product: t.product, hook: t.hook, caption: t.caption, cta: t.cta, file: `Launch pack: videos/${t.id}-${t.product}.mp4` } : null; };
const Pv = (id) => { const v = PRODUCTION.find((x) => x.id === id); return { id, product: v.product, hook: v.hook, caption: v.caption, cta: TYPES[v.type].end[1], file: `${DIR[`${v.product}:videos`]}/${videoFile(v)}`, v }; };
const A = (id) => (id.includes("-V") ? Pv(id) : L(id));
// [day, TikTok 12:30, TikTok 19:00, Reel 18:30, feed post]
const WEEKS = [
  [1, "T01", "BL-V1", "R02", "F01 F02 F03"], [2, "BL-V3", "T02", "BL-V1"], [3, "BL-V4", "T07", "BL-V6", "F04"], [4, "BL-V2", "T14", "BL-V3"],
  [5, "BL-V5", "T19", "BL-V4"], [6, "BL-V6", "R02", "BL-V2", "F05"], [7, "R10", "T20", "BL-V5"],
  [8, "OS-V1", "MS-V1", "OS-V6"], [9, "OS-V3", "T13", "MS-V6", "F06"], [10, "MS-V3", "OS-V2", "OS-V1"], [11, "OS-V4", "MS-V2", "MS-V1", "F07"],
  [12, "MS-V4", "OS-V5", "OS-V3"], [13, "MS-V5", "OS-V6", "MS-V4", "F08"], [14, "MS-V6", "T03", "R07"],
  [15, "BS-V1", "SS-V1", "BS-V6"], [16, "BS-V3", "SS-V3", "SS-V6", "F09"], [17, "SS-V4", "BS-V2", "BS-V1"], [18, "BS-V4", "SS-V2", "SS-V1"],
  [19, "SS-V5", "BS-V5", "BS-V3", "F10"], [20, "BS-V6", "T05", "SS-V4"], [21, "SS-V6", "T04", "BS-V4"],
];
// Week 4: replicate winners. Each slot names the job and a ready fallback if no clear winner yet.
const W4 = [
  [22, "Winner 1: new hook (alt hook 1)", "Winning V-type on another product", "T08", "OS-V2", "F11"],
  [23, "Winner 2: new hook (alt hook 1)", "Winning V-type on another product", "T09", "MS-V2"],
  [24, "Winner 3: new hook (alt hook 1)", "Winning V-type on another product", "T10", "BS-V2"],
  [25, "Winner 1: new opening shot + alt hook 2", "Winning V-type on another product", "T11", "SS-V2", "F12"],
  [26, "Winner 2: new opening shot + alt hook 2", "Winning V-type on another product", "T12", "OS-V5"],
  [27, "Winner 3: new opening shot + alt hook 2", "Winning V-type on another product", "T15", "MS-V3"],
  [28, "Winner 1: filmed version (shot list in 13)", "Winning V-type on another product", "T16", "BS-V5"],
  [29, "Winner 2: filmed version (shot list in 13)", "Winning V-type on another product", "T17", "SS-V3"],
  [30, "Best of the month: new cut of the top video", "Winning V-type on another product", "T18", "R01"],
];
const dayProducts = (day) => (day <= 7 ? ["blender"] : day <= 14 ? [day % 2 ? "spoon" : "oil"] : day <= 21 ? [day % 2 ? "sealer" : "scrubber"] : ["winner"]);
function storyFrames(day, reel) {
  const [p] = dayProducts(day);
  const code = (k) => (p === "winner" ? `Winner's product ${k} frame (${ORDER.map((x) => CODES[x]).join("/")}-S*-${k})` : `${DIR[`${p}:photos`]}/stories/WEDRA-${CODES[p]}-S${["intro", "poll", "detail", "link"].indexOf(k) + 1}-${k}.jpg`);
  // 3–5 frames: this-week opener (day 1 of each week), the day's Reel, one rotating
  // product frame, a brand frame every other day, and always the product's link frame last.
  const f = [`Share today's Reel (${reel}) to Story`];
  f.push(code(["intro", "poll", "detail"][(day - 1) % 3]));
  if (day % 2 === 0) f.push(`${DIR.profile}/stories/WEDRA-BRAND-S${(day / 2) % 3 + 2}-${STORIES.brand[(day / 2) % 3 + 1][0]}.jpg`);
  f.push(code("link"));
  if (day % 7 === 1) f.unshift(`${DIR.profile}/stories/WEDRA-BRAND-S1-this-week.jpg`);
  return f.slice(0, 5);
}
export function calendar() {
  const rows = [["Day", "Week", "Platform", "Time (ET)", "Product", "Asset", "V-type / series", "Hook", "Caption", "CTA", "Hashtags", "Fallback asset (week 4)"]];
  const tags = (p) => (TAGS[p] || TAGS.brand).join(" ");
  const push = (day, plat, time, a, fb = "") => rows.push([day, Math.ceil(day / 7) > 4 ? 4 : Math.ceil(day / 7), plat, time, PRODUCTS[a.product]?.name || a.product, a.file, a.v ? `${a.v.type} · ${TYPES[a.v.type].name}` : "Launch pack", a.hook, a.caption, a.cta, tags(a.product), fb]);
  for (const [day, t1, t2, reel, feed] of WEEKS) {
    push(day, "TikTok", "12:30 PM", A(t1)); push(day, "TikTok", "7:00 PM", A(t2)); push(day, "Instagram Reel", "6:30 PM", A(reel));
    if (feed) for (const id of feed.split(" ")) { const f = FEED.find((x) => x.id === id); rows.push([day, Math.ceil(day / 7), "Instagram feed", "11:00 AM", PRODUCTS[f.product].name, `Launch pack: feed/${f.id}-${f.product}.jpg`, f.pillar, "", f.caption, f.cta, tags(f.product), ""]); }
    storyFrames(day, reel).forEach((s, i) => rows.push([day, Math.ceil(day / 7), "Instagram Stories", i ? "" : "9:00 AM–1:00 PM", "", s, `Story frame ${i + 1}`, "", "", /link/.test(s) ? `Link sticker: ${dayProducts(day)[0] === "winner" ? "winner's product link (see 14)" : UTM("instagram", "story", dayProducts(day)[0])}` : "", "", ""]));
  }
  for (const [day, t1, t2, fb, reelFb, feed] of W4) {
    const f1 = A(fb), f2 = A(reelFb);
    rows.push([day, 4, "TikTok", "12:30 PM", "Winner", t1, "Winner replication", "Alt hook from 13", "Original caption, first line rewritten", "Rotate CTA", "Same as original", ""]);
    rows.push([day, 4, "TikTok", "7:00 PM", "—", t2, "Winner replication", "", "", "", "", `${f1.file} (${f1.hook})`]);
    rows.push([day, 4, "Instagram Reel", "6:30 PM", "—", "Best TikTok of weeks 1–3 not yet on Instagram", "Winner replication", "", "", "", "", `${f2.file} (${f2.hook})`]);
    if (feed) { const f = FEED.find((x) => x.id === feed); rows.push([day, 4, "Instagram feed", "11:00 AM", PRODUCTS[f.product].name, `Launch pack: feed/${f.id}-${f.product}.jpg`, f.pillar, "", f.caption, f.cta, tags(f.product), ""]); }
    storyFrames(day, "the day's Reel").forEach((s, i) => rows.push([day, 4, "Instagram Stories", i ? "" : "9:00 AM–1:00 PM", "", s, `Story frame ${i + 1}`, "", "", /link/.test(s) ? "Link sticker: winner's product link (see 14)" : "", "", ""]));
  }
  return rows;
}

// ---------- Docs ----------
const csv = (rows) => rows.map((r) => r.map((c) => `"${String(c ?? "").replace(/"/g, '""')}"`).join(",")).join("\n") + "\n";
const esc = (x) => String(x ?? "").replace(/\|/g, "/").replace(/\n/g, " ");
const onScreen = (v) => v.scenes.map((s) => (s.text || (s.kind === "end" ? `${s.line} ${s.cta}` : "")).replace(/\n/g, " ")).filter(Boolean).join(" / ");
const UTM = (src, medium, content) => `https://wedra.co/${content ? PRODUCTS[content].url.replace(/^wedra\.co\/?/, "") : ""}?utm_source=${src}&utm_medium=${medium}&utm_campaign=organic_launch${content ? `&utm_content=${content}` : ""}`;
const w = (dir, name, body) => { const f = path.join(OUT, dir, name); mk(f); fs.writeFileSync(f, body); };

function docs() {
  // 01 profile
  w(DIR.profile, "README.md", `# 01 · Profile creative

For the **existing** WEDRA TikTok Business and Instagram Business accounts. Don't create new or duplicate accounts.
The profile page text (bios, links, highlights) is also in \`WEDRA-Social-Profiles.html\` with copy buttons.

| File | Use |
| --- | --- |
| \`wedra-profile-charcoal.png\` | Profile photo on both apps (recommended) |
| \`wedra-profile-ivory.png\` | Alternative profile photo |
| \`highlight-covers/highlight-1-discoveries.png\` · \`-2-kitchen\` · \`-3-how-it-works\` | Instagram highlight covers (upload as a Story, add to the highlight, then remove from the Story) |
| \`stories/WEDRA-BRAND-S1…S4\` | Brand Story frames: this week, question, behind the discovery, new video |

**TikTok** — Name \`WEDRA\` · Bio:
\`\`\`
Products worth discovering.
Better finds for everyday living.
↓ wedra.co
\`\`\`
Website: \`${UTM("tiktok", "social")}\`

**Instagram** — Name \`WEDRA\` · Category \`Shopping & retail\` · Bio:
\`\`\`
Products worth discovering.
Curated for better everyday living.
Discover better ↓
wedra.co
\`\`\`
Link (title "Shop WEDRA"): \`${UTM("instagram", "social")}\`
Highlights: Discoveries · Kitchen · How it works.
`);
  // 02–11 per product
  for (const p of ORDER) {
    const vids = PRODUCTION.filter((v) => v.product === p);
    const code = CODES[p];
    w(DIR[`${p}:photos`], "README.md", `# ${DIR[`${p}:photos`].slice(0, 2)} · ${PRODUCTS[p].name}: photos

${PRODUCTS[p].label} · Week ${WEEK[p]} · 4:5, 1080 × 1350, built from the real product photography (no third-party text or logos).

| File | PRODUCT | SHOT | FORMAT | WEEK | Use |
| --- | --- | --- | --- | --- | --- |
${Object.values(PHOTO_SLOTS).map((slot, i) => `| \`WEDRA-${code}-P${i + 1}-${slot}.jpg\` | ${PRODUCTS[p].name} | ${slot} | 4:5 photo | ${WEEK[p]} | ${["Feed post, carousel cover, Reel cover", "Feed, carousel", "Carousel slide, Story", "Carousel slide, Story", "Feed post (has text)"][i]} |`).join("\n")}

**Story frames** (\`stories/\`, 9:16, 1080 × 1920; add stickers in the Instagram app, keep them in the empty middle / lower third):

| File | Sticker to add |
| --- | --- |
${STORIES[p].map(([name], i) => `| \`stories/WEDRA-${code}-S${i + 1}-${name}.jpg\` | ${{ intro: "none, or a “New” text tag", poll: "Poll sticker with the question on the frame", detail: "Question sticker: “Ask us anything”", link: `Link sticker → \`${UTM("instagram", "story", p)}\`` }[name]} |`).join("\n")}
`);
    w(DIR[`${p}:videos`], "README.md", `# ${DIR[`${p}:videos`].slice(0, 2)} · ${PRODUCTS[p].name}: videos

Six videos, V1–V6. All 9:16, 1080 × 1920, 30 fps, 15–19 s, silent masters (add a trending instrumental sound in the app, low volume).
No platform watermarks: the same file posts to TikTok, Reels and Stories. The product is on screen from the first frame.
Beat sheet: 0–2 s hook + product · 2–7 s demonstration · 7–15 s use case · 15–25 s payoff · WEDRA card + subtle CTA.

${vids.map((v) => `## ${v.n} · ${v.id} — \`${videoFile(v)}\`

| PRODUCT | HOOK | ANGLE | FORMAT | WEEK | VIDEO NUMBER |
| --- | --- | --- | --- | --- | --- |
| ${PRODUCTS[p].name} | ${esc(v.hook)} | ${TYPES[v.type].angle} (${v.type}: ${esc(TYPES[v.type].name)}) | 9:16 · ${len(v).toFixed(0)} s | ${WEEK[p]} | ${v.n} (${v.id}) |

On-screen text: ${esc(onScreen(v))}

Film it instead (optional): ${v.film}
`).join("\n")}`);
  }
  // 12 calendar
  const cal = calendar();
  w(DIR.calendar, "WEDRA-30-day-calendar.csv", csv(cal));
  w(DIR.calendar, "README.md", `# 12 · 30-day posting calendar

Cadence: **TikTok 2 videos/day** (12:30 PM and 7:00 PM ET) · **Instagram 1 Reel/day** (6:30 PM ET) · **Instagram Stories 3–5 frames/day** (morning to lunchtime) · 12 feed posts from the launch pack spread over the month.

| Week | Days | Focus |
| --- | --- | --- |
| 1 | 1–7 | **Portable blender** (Discovery #01): 12 blender TikToks, 7 blender Reels, blender Stories. Day 1 and day 7 open and close with brand videos. |
| 2 | 8–14 | **Oil sprayer + measuring spoon**: all 12 production videos, plus the kitchen edit. |
| 3 | 15–21 | **Bag sealer + spin scrubber**: all 12 production videos, plus two launch-pack videos. |
| 4 | 22–30 | **Winner replication**: re-cuts of the top 3 videos (new hook, new opening, filmed version) and the winning V-type on other products. Never repost an identical video. Every slot has a ready fallback. |

Assets marked "Launch pack" are in the earlier WEDRA-Social zips (videos T/R, feed F). Everything else is in this package.
Full detail (captions, CTAs, hashtags, story frames): \`WEDRA-30-day-calendar.csv\`.

| Day | Platform | Time | Asset | Hook |
| --- | --- | --- | --- | --- |
${cal.slice(1).filter((r) => r[2] !== "Instagram Stories").map((r) => `| ${r[0]} | ${r[2]} | ${r[3]} | ${esc(r[5])}${r[11] ? ` (fallback: ${esc(r[11])})` : ""} | ${esc(r[7])} |`).join("\n")}

Stories (3–5 frames a day): the day's Reel, one product frame (intro → poll → detail, rotating), a brand frame every other day, and the product's link frame last with a link sticker. The first day of each week opens with \"This week on WEDRA\". See the CSV.
`);
  // 13 captions, hooks, CTAs
  w(DIR.captions, "WEDRA-captions.csv", csv([["Video number", "ID", "Product", "V-type", "Angle", "Week", "File", "Length (s)", "Hook", "Alt hook 1", "Alt hook 2", "On-screen text", "Caption", "CTA", "Hashtags", "Label"],
    ...PRODUCTION.map((v) => [v.n, v.id, PRODUCTS[v.product].name, `${v.type} · ${TYPES[v.type].name}`, TYPES[v.type].angle, WEEK[v.product], videoFile(v), len(v).toFixed(0), v.hook, v.alt[0], v.alt[1], onScreen(v), v.caption, TYPES[v.type].end[1], TAGS[v.product].join(" "), labelLine(v)])]));
  w(DIR.captions, "README.md", `# 13 · Captions, hooks and CTAs

Copy each block into TikTok or Instagram. Caption + CTA + hashtags are one paste. Spreadsheet version: \`WEDRA-captions.csv\`.

## Hook bank by V-type

${Object.entries(TYPES).map(([k, t]) => `- **${k} · ${t.name}** (${t.angle})`).join("\n")}

Alternative hooks for week-4 re-cuts are listed under every video (alt 1, alt 2).

## CTAs (rotate, keep them soft)

${["Discover it at wedra.co", "Found on WEDRA.", "Discover better.", "See the full discovery at wedra.co", "Discover better at wedra.co", "Link in bio.", "Tap the link to discover it. (Stories)"].map((c) => `- ${c}`).join("\n")}

No prices, discount codes, "viral", scarcity or countdowns in organic posts.

## Every video

${PRODUCTION.map((v) => `### ${v.n} · ${v.id} · ${PRODUCTS[v.product].name} · ${v.type}

\`${labelLine(v)}\`

Hook: **${v.hook}** · Alt 1: ${v.alt[0]} · Alt 2: ${v.alt[1]}

\`\`\`
${v.caption}
${TYPES[v.type].end[1]}

${TAGS[v.product].join(" ")}
\`\`\`
`).join("\n")}`);
  // 14 testing tracker
  const posts = cal.slice(1).filter((r) => ["TikTok", "Instagram Reel"].includes(r[2]));
  w(DIR.tracker, "WEDRA-creative-tracker.csv", csv([["Day", "Date", "Platform", "Asset", "Product", "V-type", "Hook", "Views", "Avg watch time (s)", "Completion rate %", "Likes", "Comments", "Shares", "Saves", "Profile visits", "Link clicks", "Shopify sessions (UTM)", "Add to cart", "Orders", "Revenue", "Decision (Keep / Re-cut / Drop)", "Notes"],
    ...posts.map((r) => [r[0], "", r[2], r[5], r[4], r[6], r[7]])]));
  w(DIR.tracker, "WEDRA-weekly-scorecard.csv", csv([["Week", "Platform", "Posts", "Total views", "Median completion rate %", "Shares", "Saves", "Followers gained", "Link clicks", "Shopify sessions (UTM)", "Add to cart", "Orders", "Revenue", "Top video", "Top V-type", "Top product", "Next week's change"], ...[1, 2, 3, 4].flatMap((k) => [[k, "TikTok"], [k, "Instagram"]])]));
  w(DIR.tracker, "WEDRA-cash-flow.csv", csv([["Week", "Shopify net sales (after refunds)", "Product + fulfilment costs paid", "Payment fees", "Apps / subscriptions", "Other costs", "Net cash this week", "Cumulative net cash", "Reserve kept", "Withdrawable (cumulative − reserve)", "Notes"], [1], [2], [3], [4]]));
  w(DIR.tracker, "README.md", `# 14 · Creative testing tracker

Three sheets, filled from real data only (TikTok Analytics, Instagram Insights, Shopify Analytics). Leave a cell empty until the number exists; never estimate or invent one.

- \`WEDRA-creative-tracker.csv\`: one row per TikTok and Reel in the calendar. Fill it 48 hours after posting.
- \`WEDRA-weekly-scorecard.csv\`: every Sunday, per platform.
- \`WEDRA-cash-flow.csv\`: weekly cash from Shopify payouts and real costs.

**Where the numbers come from**
- Views, average watch time, completion rate, shares, saves, profile visits: each post's analytics in TikTok / Instagram.
- Link clicks: TikTok profile → Analytics → Website clicks; Instagram Insights → Link taps (profile and Story link stickers).
- Sessions, add to cart, orders: Shopify Analytics → Sessions by UTM source / campaign (\`organic_launch\`); Story link stickers carry \`utm_medium=story&utm_content=<product>\`:
${ORDER.map((p) => `  - ${PRODUCTS[p].name}: \`${UTM("instagram", "story", p)}\``).join("\n")}

**How to pick winners (end of week 3)**
1. Compare videos only against others on the same platform.
2. Rank by completion rate first, then shares + saves, then link clicks and Shopify sessions.
3. The top 3 are winners 1–3 for week 4. The V-type that appears most in the top third is the winning V-type.
4. A result counts only when it's in the data. Don't call a post viral, and don't assume a conversion rate.

**Decision per video:** Keep (top third: re-cut in week 4) · Re-cut (strong watch time, weak hook: try an alt hook) · Drop (bottom third on both).

**The $10K withdrawal:** withdraw only from real, cumulative net cash in \`WEDRA-cash-flow.csv\` (Shopify payouts minus every real cost, with a reserve kept for refunds and upcoming orders). Views, followers and projected sales never count toward it.
`);
  // 15 checklist
  w(DIR.checklist, "README.md", `# 15 · Final posting checklist

**Before the first post**
- [ ] Existing TikTok Business and Instagram Business accounts only; no new or duplicate accounts.
- [ ] Profile photo, name, bio and UTM link set on both (folder 01).
- [ ] Instagram highlights created: Discoveries, Kitchen, How it works (covers in 01).
- [ ] wedra.co is live, the store password is off, and every product can be added to cart.
- [ ] Shopify Analytics shows sessions by UTM (test by opening the bio link once).

**Every post**
- [ ] File matches the calendar day (12) and the label (PRODUCT / HOOK / ANGLE / FORMAT / WEEK / VIDEO NUMBER).
- [ ] Uploaded natively from the master file, never a re-download with another app's watermark.
- [ ] Sound added in the app (trending instrumental, low volume). No copyrighted music on Reels for business accounts unless it's in the app's commercial library.
- [ ] Caption + CTA + hashtags pasted from 13; the first line of the caption repeats or extends the hook.
- [ ] Cover frame chosen (first frame or the product's hero photo).
- [ ] On-screen text is readable and clear of the app buttons (all masters keep text inside the safe zone).
- [ ] No prices, discount codes, "viral", scarcity, countdowns, reviews, ratings or awards.
- [ ] No health, weight-loss, battery-life, ice / frozen-fruit, airtight, freshness, waterproof or accuracy claims.
- [ ] No supplier names or marketplace references; WEDRA is the finder, not the maker.
- [ ] The product is shown as it is (no changed shape, colour, buttons or printing).

**Stories (3–5 frames a day)**
- [ ] Frame 1 shares the day's Reel.
- [ ] Poll / question / link stickers added in the empty area of each frame.
- [ ] Link stickers use the product UTM links from 14.

**After posting**
- [ ] Reply to comments within the first hour (answer questions with facts from the product page).
- [ ] Fill the tracker (14) 48 hours after each post, and the scorecard + cash flow every Sunday.
- [ ] End of week 3: pick winners 1–3 and the winning V-type (rules in 14); ask for week-4 re-cuts with the alt hooks.
`);
  // Master index
  const index = `# WEDRA — organic content creative production package

Adds a 30-video production library, labelled photo and Story libraries, a
30-day calendar, captions, a testing tracker and a posting checklist to the
existing TikTok + Instagram launch package (which stays as it is: videos
T01–T20 and R01–R10, feed posts F01–F12).

| Folder | Contents |
| --- | --- |
| \`${DIR.profile}\` | Profile images, highlight covers, brand Story frames, profile text |
${ORDER.map((p) => `| \`${DIR[`${p}:photos`]}\` | 5 photos (hero, lifestyle, detail, demonstration, editorial) + 4 Story frames |\n| \`${DIR[`${p}:videos`]}\` | 6 videos V1–V6 (${PRODUCTION.filter((v) => v.product === p).map((v) => v.n).join(", ")}) |`).join("\n")}
| \`${DIR.calendar}\` | Day-by-day plan: TikTok 2/day, Reels 1/day, Stories 3–5/day |
| \`${DIR.captions}\` | Caption, CTA, hashtags and alt hooks for every video |
| \`${DIR.tracker}\` | Creative tracker, weekly scorecard, cash-flow sheet |
| \`${DIR.checklist}\` | Before / during / after posting checks |

**V-types (6 per product):** ${Object.entries(TYPES).map(([k, t]) => `${k} ${t.name}`).join(" · ")}.

**Labels:** every video carries PRODUCT / HOOK / ANGLE / FORMAT / WEEK / VIDEO NUMBER in its folder README, in \`13/WEDRA-captions.csv\`, and in the file's own metadata (title + comment).

**What was generated vs. what needs production:** all 30 videos, 25 photos and 24 Story frames are finished files made from the real product photography. They are silent (add sound in the app). Some products have only one or two real in-use photos, so their videos reuse those scenes with different crops, motion and text. Each video README includes a shot list to film the same script with the real product, and \`docs/social-launch.md\` §6 has AI image prompts for the missing lifestyle shots.

## All 30 videos

| # | ID | Product | V-type | Length | Hook | Week |
| --- | --- | --- | --- | --- | --- | --- |
${PRODUCTION.map((v) => `| ${v.n} | ${v.id} | ${PRODUCTS[v.product].name} | ${v.type} | ${len(v).toFixed(0)} s | ${esc(v.hook)} | ${WEEK[v.product]} |`).join("\n")}
`;
  w("", "00-START-HERE.md", index);
  fs.writeFileSync(path.join(HERE, "../../docs/social-production.md"), index.replace(/\| `(\d\d-[^`]+)`/g, "| `out/production/$1`"));
  console.log("✓ docs");
}

if (["stills", "all"].includes(mode)) await stills();
if (["videos", "all"].includes(mode)) await videos();
if (["docs", "all"].includes(mode)) docs();
if (browser) await browser.close();
