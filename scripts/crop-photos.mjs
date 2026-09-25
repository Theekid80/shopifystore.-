/**
 * Cuts every site image out of the two design boards in /design:
 *
 *   design/velara-product-board.png  (1536×1024) — individual product shots
 *   design/velara-brand-board.png    (1312×1199) — lifestyle and scene shots
 *
 * Run after replacing a board:  npm run photos
 *
 * The boards are small composites, so each shot is only ~200–560px wide.
 * Scene images used large on the page are enlarged 2× with Lanczos
 * resampling so they scale smoothly, but that can't add detail: replace them
 * with full-resolution originals (2400px+ for the hero) before launch.
 * Once you have real files, drop them into /public/images with the same
 * names and stop running this script.
 */
import path from "node:path";
import sharp from "sharp";

const PRODUCT = path.join("design", "velara-product-board.png");
const BRAND = path.join("design", "velara-brand-board.png");
const OUT = path.join("public", "images");

// [output file, board, left, top, right, bottom, enlarge]
// Edges were measured on each board and exclude gutters and baked-in text.
const crops = [
  // Product board
  ["sleep-mask.jpg", PRODUCT, 0, 0, 444, 402, 1],
  ["travel-pouch.jpg", PRODUCT, 453, 0, 813, 402, 1],
  ["earplugs.jpg", PRODUCT, 828, 0, 1146, 402, 1],
  ["tech-organizer.jpg", PRODUCT, 1159, 0, 1536, 402, 1],
  ["packing-cubes.jpg", PRODUCT, 0, 530, 337, 847, 1],
  ["toiletry-bag.jpg", PRODUCT, 352, 530, 661, 847, 1],
  ["luggage-tag.jpg", PRODUCT, 676, 530, 979, 847, 1],
  ["travel-system.jpg", PRODUCT, 994, 530, 1536, 881, 2],

  // Brand board
  ["hero-travel.jpg", BRAND, 420, 0, 980, 408, 3],
  ["airplane-lifestyle.jpg", BRAND, 986, 0, 1311, 212, 3],
  ["flights-lifestyle.jpg", BRAND, 776, 792, 1042, 985, 2],
  ["business-lifestyle.jpg", BRAND, 205, 792, 426, 1058, 2],
  ["suitcase-organized.jpg", BRAND, 436, 792, 767, 995, 2],
  ["sleep-mask-detail.jpg", BRAND, 776, 525, 1064, 786, 1],
  // Numbered flat lay, cropped before item 7 (luggage tag) so it shows the six system pieces.
  ["whats-included.jpg", BRAND, 256, 413, 679, 786, 2],

  // Reused product shots in scene tiles
  ["hotel-lifestyle.jpg", PRODUCT, 352, 530, 661, 847, 2],
  ["road-trip-lifestyle.jpg", PRODUCT, 453, 0, 813, 402, 2],
];

for (const [file, src, l, t, r, b, scale] of crops) {
  const width = r - l;
  const height = b - t;
  let img = sharp(src).extract({ left: l, top: t, width, height });
  if (scale > 1) {
    img = sharp(await img.toBuffer())
      .resize(width * scale, height * scale, { kernel: "lanczos3" })
      .sharpen({ sigma: 0.6 });
  }
  await img.jpeg({ quality: 90, mozjpeg: true }).toFile(path.join(OUT, file));
  console.log(`${file.padEnd(26)} ${width * scale}×${height * scale}`);
}

// Social share card: exactly 1200×630, cropped from the hero scene.
await sharp(BRAND)
  .extract({ left: 420, top: 0, width: 560, height: 408 })
  .resize(1200, 630, { fit: "cover", position: "centre", kernel: "lanczos3" })
  .sharpen({ sigma: 0.6 })
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(path.join(OUT, "og-image.jpg"));
console.log("og-image.jpg               1200×630");
