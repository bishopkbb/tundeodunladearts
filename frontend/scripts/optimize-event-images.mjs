// Turns the large source images in raw-assets/ into web-ready files in public/Assets/events/
// and writes src/lib/eventImages.generated.ts (size + tiny blur preview for each image).
//
// Run:  node scripts/optimize-event-images.mjs
// Re-run it whenever a source image or the list below changes. The originals in raw-assets/ are
// git-ignored; only the optimised outputs are committed.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(root, 'raw-assets', 'november2026');
const OUT = path.join(root, 'public', 'Assets', 'events');
const GENERATED = path.join(root, 'src', 'lib', 'eventImages.generated.ts');

// kind 'flyer'     -> keep full resolution (small text must stay readable), high quality
// kind 'highlight' -> photo; capped at 2400px on the long edge (sharp on 2x screens, still light)
//   landscape: true -> portrait source re-cut to landscape (the slider only shows landscape pictures)
const images = [
  // Upcoming: Itanje, Ireje, Titi Aye (multimedia arts exhibition, opens 19 Nov 2026)
  { slug: 'itanje-ireje-titi-aye-2026', file: 'WhatsApp Image 2026-11-16 at 10.09.23 PM.jpeg', kind: 'flyer' },
  { slug: 'itanje-ireje-titi-aye-2026-alt', file: 'WhatsApp Image 2026-11-14 at 1.59.48 PM.jpeg', kind: 'flyer' },
  { slug: 'itanje-ireje-titi-aye-2026-alt2', file: 'WhatsApp Image 2026-11-14 at 1.59.48 PM (1).jpeg', kind: 'flyer' },
  // Recent past events
  { slug: 'oyo-state-business-forum-2026', file: 'WhatsApp Image 2026-11-14 at 1.51.06 PM.jpeg', kind: 'flyer' },
  { slug: 'yoruba-cultural-exchange-chicago-2026', file: 'WhatsApp Image 2026-11-14 at 1.51.06 PM (1).jpeg', kind: 'flyer' },
  { slug: 'bcos-tv-bo-se-n-lo-2026', file: 'WhatsApp Image 2026-11-14 at 1.59.47 PM (1).jpeg', kind: 'flyer' },
  { slug: 'birmingham-five-decades-2026', file: 'WhatsApp Image 2026-11-14 at 1.59.47 PM.jpeg', kind: 'flyer' },
  // Gallery Highlights slider: only natively landscape, high-resolution photos (never upscaled or re-cropped)
  { slug: 'reception-01', file: path.join('extracted-reception', 'WhatsApp Image 2026-11-14 at 2.05.35 PM.jpeg'), kind: 'highlight' },
  { slug: 'reception-02', file: path.join('extracted-reception', 'WhatsApp Image 2026-11-14 at 2.05.35 PM (1).jpeg'), kind: 'highlight' },
  // Existing high-resolution landscape pieces from public/Assets (originals are 2876-3600px wide)
  { slug: 'gallery-melody-maker', abs: 'public/Assets/hero10.jpg', kind: 'highlight' },
  { slug: 'gallery-native-doctor', abs: 'public/Assets/native_doctor.jpg', kind: 'highlight' },
  { slug: 'gallery-leadership', abs: 'public/Assets/leadership.jpg', kind: 'highlight' },
  { slug: 'gallery-natures-own-making', abs: 'public/Assets/nature-lg.jpg', kind: 'highlight' },
];

fs.mkdirSync(OUT, { recursive: true });

const entries = [];
let totalBefore = 0;
let totalAfter = 0;

for (const img of images) {
  const input = img.abs ? path.join(root, img.abs) : path.join(SRC, img.file);
  if (!fs.existsSync(input)) throw new Error(`Missing source image: ${input}`);

  const outFile = path.join(OUT, `${img.slug}.jpg`);
  let pipeline = sharp(input).rotate(); // apply EXIF orientation, then drop metadata
  if (img.kind === 'highlight' && img.landscape && img.cropTop !== undefined) {
    // Portrait source with a hand-picked frame: a full-width 3:2 band starting `cropTop` (0..1) down the photo.
    const upright = await pipeline.toBuffer();
    const m = await sharp(upright).metadata();
    const height = Math.round(m.width / 1.5);
    const top = Math.min(Math.round(m.height * img.cropTop), m.height - height);
    pipeline = sharp(upright).extract({ left: 0, top, width: m.width, height }).resize({ width: 1600 });
  } else if (img.kind === 'highlight' && img.landscape) {
    // Portrait source: re-cut to a 3:2 landscape frame, letting sharp keep the most interesting area.
    pipeline = pipeline.resize({ width: 1600, height: 1067, fit: 'cover', position: sharp.strategy.attention });
  } else if (img.kind === 'highlight') {
    pipeline = pipeline.resize({ width: 2400, height: 2400, fit: 'inside', withoutEnlargement: true });
  }
  const quality = img.kind === 'flyer' ? 86 : 84;
  await pipeline.jpeg({ quality, mozjpeg: true }).toFile(outFile);

  const meta = await sharp(outFile).metadata();
  const blur = await sharp(outFile).resize(16).blur(1).jpeg({ quality: 50 }).toBuffer();

  const before = fs.statSync(input).size;
  const after = fs.statSync(outFile).size;
  totalBefore += before;
  totalAfter += after;

  entries.push({
    slug: img.slug,
    src: `/Assets/events/${img.slug}.jpg`,
    width: meta.width,
    height: meta.height,
    blurDataURL: `data:image/jpeg;base64,${blur.toString('base64')}`,
  });
  console.log(`${img.slug.padEnd(42)} ${meta.width}x${meta.height}  ${(before / 1024).toFixed(0)} KB -> ${(after / 1024).toFixed(0)} KB`);
}

const body = entries
  .map((e) => `  '${e.slug}': {\n    src: '${e.src}',\n    width: ${e.width},\n    height: ${e.height},\n    blurDataURL: '${e.blurDataURL}',\n  },`)
  .join('\n');

fs.writeFileSync(
  GENERATED,
  `// AUTO-GENERATED by scripts/optimize-event-images.mjs. Do not edit by hand.\n\nexport interface EventImage {\n  src: string;\n  width: number;\n  height: number;\n  blurDataURL: string;\n}\n\nexport const eventImages = {\n${body}\n} as const satisfies Record<string, EventImage>;\n\nexport type EventImageKey = keyof typeof eventImages;\n`
);

console.log(`\nTotal: ${(totalBefore / 1048576).toFixed(1)} MB -> ${(totalAfter / 1048576).toFixed(1)} MB (${entries.length} images)`);
