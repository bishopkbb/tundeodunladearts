// Builds the site's icon set from the master logo (design-assets/logo-master.png, 10000x10000).
//
// Run:  node scripts/generate-icons.mjs
//
// Outputs
//   src/app/favicon.ico                   16/32/48px circular favicon (served at /favicon.ico)
//   public/icons/favicon-16.png, -32.png  circular, transparent outside the ring
//   public/icons/icon-192.png, -512.png   circular, transparent (manifest "any" icons)
//   public/icons/icon-maskable-512.png    solid background + padding (Android applies its own shape)
//   public/icons/apple-touch-icon.png     solid background (iOS fills transparency with black)
//   public/icons/og-image.jpg             1200x630 social share image

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MASTER = path.join(root, 'design-assets', 'logo-master.png');
const ICONS = path.join(root, 'public', 'icons');
const BG = '#F5EFE7'; // brand cream, used behind maskable / apple-touch icons

fs.mkdirSync(ICONS, { recursive: true });

// 1) Find the ring: everything that is not (near) white on a downscaled copy of the master.
const SCAN = 1000;
const { data } = await sharp(MASTER, { limitInputPixels: false })
  .resize(SCAN, SCAN, { fit: 'fill' })
  .greyscale()
  .raw()
  .toBuffer({ resolveWithObject: true });

let minX = SCAN, minY = SCAN, maxX = -1, maxY = -1;
for (let y = 0; y < SCAN; y++) {
  for (let x = 0; x < SCAN; x++) {
    if (data[y * SCAN + x] < 205) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}
const scale = 10000 / SCAN;
const cx = ((minX + maxX) / 2) * scale;
const cy = ((minY + maxY) / 2) * scale;
const radius = (Math.max(maxX - minX, maxY - minY) / 2) * scale * 1.004; // tiny margin: keeps the ring intact without a white rim
console.log(`ring: centre ${cx.toFixed(0)},${cy.toFixed(0)}  radius ${radius.toFixed(0)}px of 10000`);

// 2) Crop the ring square and mask it to a circle (1024px master for everything below).
const side = Math.round(radius * 2);
const BASE = 1024;
const circleMask = (s) => Buffer.from(`<svg width="${s}" height="${s}"><circle cx="${s / 2}" cy="${s / 2}" r="${s / 2}" fill="#fff"/></svg>`);

const squareCrop = await sharp(MASTER, { limitInputPixels: false })
  .extract({ left: Math.round(cx - radius), top: Math.round(cy - radius), width: side, height: side })
  .resize(BASE, BASE)
  .png()
  .toBuffer();

const circleBase = await sharp(squareCrop)
  .ensureAlpha()
  .composite([{ input: circleMask(BASE), blend: 'dest-in' }])
  .png()
  .toBuffer();

const circle = (size) => sharp(circleBase).resize(size, size, { kernel: 'lanczos3' }).png({ compressionLevel: 9 }).toBuffer();

// 3) Circular icons.
const out = {};
for (const size of [16, 32, 48, 192, 512]) out[size] = await circle(size);
fs.writeFileSync(path.join(ICONS, 'favicon-16.png'), out[16]);
fs.writeFileSync(path.join(ICONS, 'favicon-32.png'), out[32]);
fs.writeFileSync(path.join(ICONS, 'icon-192.png'), out[192]);
fs.writeFileSync(path.join(ICONS, 'icon-512.png'), out[512]);

// 4) favicon.ico: PNG-compressed entries (supported by every current browser).
function buildIco(entries) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(entries.length, 4);
  let offset = 6 + entries.length * 16;
  const dirs = [];
  for (const { size, png } of entries) {
    const d = Buffer.alloc(16);
    d.writeUInt8(size >= 256 ? 0 : size, 0);
    d.writeUInt8(size >= 256 ? 0 : size, 1);
    d.writeUInt8(0, 2); // palette
    d.writeUInt8(0, 3);
    d.writeUInt16LE(1, 4); // planes
    d.writeUInt16LE(32, 6); // bits per pixel
    d.writeUInt32LE(png.length, 8);
    d.writeUInt32LE(offset, 12);
    offset += png.length;
    dirs.push(d);
  }
  return Buffer.concat([header, ...dirs, ...entries.map((e) => e.png)]);
}
fs.writeFileSync(
  path.join(root, 'src', 'app', 'favicon.ico'),
  buildIco([16, 32, 48].map((size) => ({ size, png: out[size] })))
);

// 5) Solid-background icons (maskable for Android, apple-touch for iOS).
async function onSolid(size, ringFraction) {
  const ring = await circle(Math.round(size * ringFraction));
  const pad = Math.round((size - Math.round(size * ringFraction)) / 2);
  return sharp({ create: { width: size, height: size, channels: 4, background: BG } })
    .composite([{ input: ring, left: pad, top: pad }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}
fs.writeFileSync(path.join(ICONS, 'icon-maskable-512.png'), await onSolid(512, 0.68)); // inside the 80% safe zone
fs.writeFileSync(path.join(ICONS, 'apple-touch-icon.png'), await onSolid(180, 0.8));

// 6) Social share image (1200x630).
const logoOg = await circle(300);
const svg = Buffer.from(`
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#8B4513"/>
      <stop offset="1" stop-color="#4A2810"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="24" y="24" width="1152" height="582" fill="none" stroke="#D4AF37" stroke-width="3" opacity="0.8"/>
  <text x="440" y="250" font-family="Georgia, 'Times New Roman', serif" font-size="64" font-weight="bold" fill="#F5EFE7">Tunde Odunlade</text>
  <text x="440" y="326" font-family="Georgia, 'Times New Roman', serif" font-size="64" font-weight="bold" fill="#F5EFE7">Arts &amp; Culture</text>
  <text x="440" y="402" font-family="Georgia, 'Times New Roman', serif" font-size="64" font-weight="bold" fill="#F5EFE7">Connexions</text>
  <rect x="440" y="430" width="140" height="5" rx="2" fill="#D4AF37"/>
  <text x="440" y="490" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="#E8DCC8">TOACC Gallery  |  African art and culture, Ibadan</text>
</svg>`);
await sharp(svg)
  .composite([{ input: logoOg, left: 90, top: 165 }])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(path.join(ICONS, 'og-image.jpg'));

for (const f of fs.readdirSync(ICONS)) console.log(f.padEnd(26), (fs.statSync(path.join(ICONS, f)).size / 1024).toFixed(1) + ' KB');
console.log('favicon.ico'.padEnd(26), (fs.statSync(path.join(root, 'src', 'app', 'favicon.ico')).size / 1024).toFixed(1) + ' KB');
