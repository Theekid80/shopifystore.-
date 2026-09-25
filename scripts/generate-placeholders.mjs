/**
 * Generates art-directed placeholder images in /public/images.
 *
 * These are stand-ins until real product photography is ready. Each file
 * uses the exact filename the site expects, so replacing a placeholder is a
 * matter of dropping a real photo with the same name into /public/images.
 *
 * Usage:
 *   npm run placeholders          # only creates files that are missing
 *   npm run placeholders -- --force   # overwrites everything (careful!)
 */
import { mkdir, access } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const OUT_DIR = path.join(process.cwd(), "public", "images");
const FORCE = process.argv.includes("--force");

const C = {
  ink: "#0E0E0E",
  charcoal: "#1C1C1B",
  graphite: "#2B2A28",
  stone: "#8A8680",
  mist: "#E6E2DC",
  warm: "#F4F1EC",
  ivory: "#FAF8F4",
  sand: "#C9B89F",
  sandDeep: "#A8937A",
};

/* ---------- small drawing helpers (SVG strings) ---------- */

const label = (w, h, name, dark) => {
  const fill = dark ? "rgba(255,255,255,0.38)" : "rgba(20,20,20,0.34)";
  const size = Math.max(14, Math.round(w / 90));
  return `<text x="${Math.round(w * 0.06)}" y="${Math.round(h - h * 0.06)}" font-family="Helvetica, Arial, sans-serif" font-size="${size}" letter-spacing="${size * 0.18}" fill="${fill}">PLACEHOLDER · ${name.toUpperCase()}</text>`;
};

const grain = `
  <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope="0.05"/></feComponentTransfer></filter>`;

const softShadow = `
  <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur in="SourceAlpha" stdDeviation="18"/><feOffset dy="22"/><feComponentTransfer><feFuncA type="linear" slope="0.22"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>`;

const wrap = (w, h, defs, body, name, dark) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>${grain}${softShadow}${defs}</defs>
  ${body}
  <rect width="${w}" height="${h}" filter="url(#grain)"/>
  ${label(w, h, name, dark)}
</svg>`;

/* Product silhouettes, drawn around (0,0) at a nominal ~600px size. */
const shapes = {
  mask: (fill = C.charcoal) => `
    <g filter="url(#shadow)">
      <path d="M-300,-20 C-300,-120 -180,-150 0,-150 C180,-150 300,-120 300,-20 C300,90 200,130 110,120 C60,114 35,70 0,70 C-35,70 -60,114 -110,120 C-200,130 -300,90 -300,-20 Z" fill="${fill}"/>
      <path d="M-270,-20 C-270,-100 -170,-125 0,-125 C170,-125 270,-100 270,-20" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="3"/>
      <rect x="-420" y="-40" width="130" height="34" rx="17" fill="${fill}" opacity="0.9"/>
      <rect x="290" y="-40" width="130" height="34" rx="17" fill="${fill}" opacity="0.9"/>
    </g>`,
  pouch: (fill = C.graphite) => `
    <g filter="url(#shadow)">
      <rect x="-260" y="-170" width="520" height="340" rx="46" fill="${fill}"/>
      <path d="M-220,-120 H220" stroke="${C.sand}" stroke-width="5" stroke-linecap="round"/>
      <rect x="170" y="-138" width="54" height="34" rx="10" fill="${C.sand}"/>
    </g>`,
  earplugs: (fill = C.charcoal) => `
    <g filter="url(#shadow)">
      <g transform="translate(-110,0) rotate(-18)"><rect x="-55" y="-140" width="110" height="280" rx="55" fill="${fill}"/><rect x="-30" y="-100" width="60" height="40" rx="20" fill="rgba(255,255,255,0.08)"/></g>
      <g transform="translate(110,0) rotate(14)"><rect x="-55" y="-140" width="110" height="280" rx="55" fill="${fill}"/><rect x="-30" y="-100" width="60" height="40" rx="20" fill="rgba(255,255,255,0.08)"/></g>
    </g>`,
  tech: (fill = C.graphite) => `
    <g filter="url(#shadow)">
      <rect x="-300" y="-200" width="600" height="400" rx="36" fill="${fill}"/>
      ${[-120, 0, 120].map((y) => `<rect x="-250" y="${y - 12}" width="500" height="24" rx="12" fill="rgba(255,255,255,0.1)"/>`).join("")}
      <circle cx="-150" cy="-60" r="36" fill="none" stroke="${C.sand}" stroke-width="10"/>
      <rect x="40" y="40" width="150" height="46" rx="12" fill="${C.sand}" opacity="0.85"/>
    </g>`,
  cube: (fill = C.charcoal) => `
    <g filter="url(#shadow)">
      <rect x="-300" y="-190" width="600" height="380" rx="34" fill="${fill}"/>
      <rect x="-250" y="-140" width="500" height="280" rx="18" fill="rgba(255,255,255,0.06)"/>
      <path d="M-270,-165 H270" stroke="${C.sand}" stroke-width="4" stroke-linecap="round"/>
    </g>`,
  toiletry: (fill = C.graphite) => `
    <g filter="url(#shadow)">
      <path d="M-240,-150 H240 Q280,-150 280,-110 L260,150 Q256,190 216,190 H-216 Q-256,190 -260,150 L-280,-110 Q-280,-150 -240,-150 Z" fill="${fill}"/>
      <path d="M-230,-105 H230" stroke="${C.sand}" stroke-width="5" stroke-linecap="round"/>
      <rect x="-330" y="-60" width="70" height="120" rx="22" fill="none" stroke="${fill}" stroke-width="16"/>
    </g>`,
  tag: (fill = C.sandDeep) => `
    <g filter="url(#shadow)">
      <path d="M-120,-230 H120 Q150,-230 150,-200 V200 Q150,230 120,230 H-120 Q-150,230 -150,200 V-160 L-80,-230 Z" fill="${fill}"/>
      <circle cx="-80" cy="-150" r="20" fill="${C.warm}"/>
      <rect x="-90" y="-20" width="180" height="16" rx="8" fill="rgba(0,0,0,0.14)"/>
      <rect x="-90" y="20" width="130" height="16" rx="8" fill="rgba(0,0,0,0.14)"/>
      <path d="M-80,-150 C-150,-260 -40,-330 40,-300" fill="none" stroke="${C.charcoal}" stroke-width="12" stroke-linecap="round"/>
    </g>`,
};

const place = (shape, x, y, scale = 1, rotate = 0) =>
  `<g transform="translate(${x},${y}) rotate(${rotate}) scale(${scale})">${shape}</g>`;

/* ---------- scene builders ---------- */

const studio = (w, h, name, shape, bg = [C.ivory, C.mist]) =>
  wrap(
    w,
    h,
    `<radialGradient id="bg" cx="50%" cy="40%" r="75%"><stop offset="0" stop-color="${bg[0]}"/><stop offset="1" stop-color="${bg[1]}"/></radialGradient>`,
    `<rect width="${w}" height="${h}" fill="url(#bg)"/>
     <ellipse cx="${w / 2}" cy="${h * 0.66}" rx="${w * 0.36}" ry="${h * 0.05}" fill="rgba(0,0,0,0.06)"/>
     ${place(shape, w / 2, h / 2, Math.min(w, h) / 1000)}`,
    name,
    false,
  );

const nightScene = (w, h, name, { windows = true, glowX = 0.72, figure = false } = {}) =>
  wrap(
    w,
    h,
    `<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#23211F"/><stop offset="0.55" stop-color="#151413"/><stop offset="1" stop-color="#0B0B0A"/></linearGradient>
     <radialGradient id="glow" cx="${glowX * 100}%" cy="38%" r="45%"><stop offset="0" stop-color="#C9A97F" stop-opacity="0.55"/><stop offset="0.5" stop-color="#6E5A44" stop-opacity="0.18"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>`,
    `<rect width="${w}" height="${h}" fill="url(#sky)"/>
     <rect width="${w}" height="${h}" fill="url(#glow)"/>
     ${
       windows
         ? Array.from({ length: 9 }, (_, i) => `<rect x="${(w / 9) * i}" y="0" width="${Math.max(6, w / 260)}" height="${h * 0.72}" fill="rgba(0,0,0,0.45)"/>`).join("") +
           `<rect x="0" y="${h * 0.72}" width="${w}" height="${h * 0.28}" fill="rgba(0,0,0,0.35)"/>` +
           `<rect x="0" y="${h * 0.3}" width="${w}" height="${Math.max(4, h / 300)}" fill="rgba(0,0,0,0.4)"/>`
         : ""
     }
     ${
       figure
         ? `<g transform="translate(${w * 0.34},${h * 0.62}) scale(${h / 1400})" opacity="0.92">
              <path d="M-260,420 C-240,180 -120,120 0,120 C120,120 240,180 260,420 Z" fill="#0A0A09"/>
              <circle cx="0" cy="-20" r="120" fill="#0A0A09"/>
              <path d="M-112,-40 C-112,-80 -60,-92 0,-92 C60,-92 112,-80 112,-40 C112,-8 80,6 50,4 C30,2 18,-12 0,-12 C-18,-12 -30,2 -50,4 C-80,6 -112,-8 -112,-40 Z" fill="#2E2C2A"/>
            </g>`
         : ""
     }`,
    name,
    true,
  );

const flatLay = (w, h, name) =>
  wrap(
    w,
    h,
    `<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.warm}"/><stop offset="1" stop-color="${C.mist}"/></linearGradient>`,
    `<rect width="${w}" height="${h}" fill="url(#bg)"/>
     ${place(shapes.mask(), w * 0.5, h * 0.3, 0.85)}
     ${place(shapes.pouch(), w * 0.18, h * 0.7, 0.55, -6)}
     ${place(shapes.earplugs(), w * 0.14, h * 0.3, 0.5, 10)}
     ${place(shapes.tech(), w * 0.44, h * 0.74, 0.5, 3)}
     ${place(shapes.cube(), w * 0.78, h * 0.68, 0.6, -4)}
     ${place(shapes.toiletry(), w * 0.86, h * 0.25, 0.45, 8)}
     ${place(shapes.tag(), w * 0.64, h * 0.42, 0.34, -14)}`,
    name,
    false,
  );

const suitcase = (w, h, name, organized) => {
  const inner = organized
    ? `${place(shapes.cube(), -250, -110, 0.62)}
       ${place(shapes.cube(C.graphite), 250, -110, 0.62)}
       ${place(shapes.tech(), -250, 170, 0.5)}
       ${place(shapes.toiletry(), 250, 170, 0.5)}
       ${place(shapes.mask(), 0, 30, 0.42)}
       ${place(shapes.pouch(), 0, 250, 0.3)}`
    : Array.from({ length: 22 }, (_, i) => {
        const x = ((i * 137) % 900) - 450;
        const y = ((i * 89) % 520) - 260;
        const r = (i * 47) % 90 - 45;
        const fills = [C.stone, C.sand, C.graphite, "#B5AFA6", "#6E6A64"];
        return `<rect x="${x - 70}" y="${y - 22}" width="${120 + (i % 4) * 30}" height="${36 + (i % 3) * 18}" rx="14" fill="${fills[i % fills.length]}" transform="rotate(${r} ${x} ${y})"/>`;
      }).join("");
  return wrap(
    w,
    h,
    `<linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.warm}"/><stop offset="1" stop-color="${C.mist}"/></linearGradient>`,
    `<rect width="${w}" height="${h}" fill="url(#bg)"/>
     <g transform="translate(${w / 2},${h / 2}) scale(${h / 1400})">
       <rect x="-600" y="-420" width="1200" height="840" rx="70" fill="${C.charcoal}" filter="url(#shadow)"/>
       <rect x="-560" y="-380" width="1120" height="760" rx="46" fill="#3A3835"/>
       ${inner}
     </g>`,
    name,
    false,
  );
};

const og = (w, h, name) =>
  wrap(
    w,
    h,
    `<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1C1B1A"/><stop offset="1" stop-color="#0E0E0E"/></linearGradient>`,
    `<rect width="${w}" height="${h}" fill="url(#bg)"/>
     <g transform="translate(${w / 2 - 250},${h / 2 - 38})" fill="none" stroke="${C.sand}" stroke-width="3" stroke-linejoin="round"><path d="M0,40 L22,12 L34,26 L48,6 L72,40"/></g>
     <text x="${w / 2}" y="${h / 2 + 8}" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="96" letter-spacing="30" fill="${C.ivory}">VELARA</text>
     <text x="${w / 2}" y="${h / 2 + 78}" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="24" letter-spacing="8" fill="${C.stone}">BETTER SLEEP. SMOOTHER JOURNEYS.</text>`,
    name,
    true,
  );

/* ---------- manifest: filename -> [width, height, svg builder] ---------- */

const manifest = {
  "hero-travel.jpg": [2400, 1500, (n) => nightScene(2400, 1500, n)],
  "airplane-lifestyle.jpg": [2400, 1350, (n) => nightScene(2400, 1350, n, { windows: false, glowX: 0.2 })],
  "flights-lifestyle.jpg": [1000, 1250, (n) => nightScene(1000, 1250, n, { windows: false, glowX: 0.3 })],
  "hotel-lifestyle.jpg": [1000, 1250, (n) => nightScene(1000, 1250, n, { windows: false, glowX: 0.8 })],
  "road-trip-lifestyle.jpg": [1000, 1250, (n) => nightScene(1000, 1250, n, { windows: true, glowX: 0.5 })],
  "business-lifestyle.jpg": [1000, 1250, (n) => nightScene(1000, 1250, n, { windows: true, glowX: 0.2 })],
  "travel-system.jpg": [2000, 1400, (n) => flatLay(2000, 1400, n)],
  "sleep-mask.jpg": [1600, 1600, (n) => studio(1600, 1600, n, shapes.mask())],
  "sleep-mask-detail.jpg": [1600, 1600, (n) => studio(1600, 1600, n, place(shapes.mask(C.graphite), 0, 0, 1.6), [C.mist, "#D8D3CB"])],
  "sleep-mask-stone.jpg": [1600, 1600, (n) => studio(1600, 1600, n, shapes.mask("#77736D"))],
  "sleep-mask-sand.jpg": [1600, 1600, (n) => studio(1600, 1600, n, shapes.mask(C.sandDeep))],
  "travel-pouch.jpg": [1200, 1500, (n) => studio(1200, 1500, n, shapes.pouch())],
  "earplugs.jpg": [1200, 1500, (n) => studio(1200, 1500, n, shapes.earplugs())],
  "tech-organizer.jpg": [1200, 1500, (n) => studio(1200, 1500, n, shapes.tech())],
  "packing-cubes.jpg": [1200, 1500, (n) => studio(1200, 1500, n, shapes.cube())],
  "toiletry-bag.jpg": [1200, 1500, (n) => studio(1200, 1500, n, shapes.toiletry())],
  "luggage-tag.jpg": [1200, 1500, (n) => studio(1200, 1500, n, shapes.tag())],
  "suitcase-before.jpg": [2000, 1400, (n) => suitcase(2000, 1400, n, false)],
  "suitcase-after.jpg": [2000, 1400, (n) => suitcase(2000, 1400, n, true)],
  "og-image.jpg": [1200, 630, (n) => og(1200, 630, n)],
};

await mkdir(OUT_DIR, { recursive: true });

for (const [file, [, , build]] of Object.entries(manifest)) {
  const out = path.join(OUT_DIR, file);
  if (!FORCE) {
    try {
      await access(out);
      console.log(`skip   ${file} (exists)`);
      continue;
    } catch {}
  }
  await sharp(Buffer.from(build(file))).jpeg({ quality: 82, mozjpeg: true }).toFile(out);
  console.log(`write  ${file}`);
}
