// Draws seamless batik / adire pattern tiles from code (no downloads, fully repeatable).
//
//   node scripts/generate-batik-tiles.mjs preview <dir>   -> writes preview sheets (PNG) into <dir>
//   node scripts/generate-batik-tiles.mjs build           -> writes the production tiles into public/patterns/
//
// Every motif is drawn with a hand-made wobble that repeats exactly every TILE pixels, and each element is
// drawn 9 times (shifted by +-TILE), so the tiles join with no visible seams.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TILE = 240;
const TAU = Math.PI * 2;

// ---------------------------------------------------------------- palette (brand colours unchanged)
export const palette = {
  cream: '#F5EFE7',
  sand: '#E8DCC8',
  tan: '#D4A574',
  saddle: '#8B4513',
  kola: '#6B3410',
  deep: '#4A2810',
  orange: '#C17C2E',
  gold: '#D4AF37',
  indigo: '#2B3563', // optional accent, <= 5% of any surface
};

// ---------------------------------------------------------------- helpers
function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

// Displacement that repeats exactly every TILE px: sums of sines with whole-number frequencies.
function makeWarp(seed, amp) {
  const t = TAU / TILE;
  return (x, y) => [
    x + amp * (0.6 * Math.sin(t * 2 * y + seed) + 0.4 * Math.sin(t * (3 * x + y) + seed * 1.7)),
    y + amp * (0.6 * Math.sin(t * 2 * x + seed * 2.3) + 0.4 * Math.sin(t * (x + 3 * y) + seed * 0.9)),
  ];
}

const pt = (p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`;
const poly = (pts, close = false) => `M${pts.map(pt).join(' L')}${close ? ' Z' : ''}`;

function circlePts(cx, cy, r, warp, n = 56, a0 = 0, a1 = TAU) {
  const pts = [];
  const full = Math.abs(a1 - a0 - TAU) < 1e-6;
  const steps = full ? n : Math.ceil((n * Math.abs(a1 - a0)) / TAU);
  for (let i = 0; i <= steps; i++) {
    const a = a0 + ((a1 - a0) * i) / steps;
    pts.push(warp(cx + r * Math.cos(a), cy + r * Math.sin(a)));
  }
  return pts;
}

// Draw `fn` 9 times so shapes that cross a tile edge wrap around to the opposite side.
function wrapped(fn) {
  let out = '';
  for (const dx of [-TILE, 0, TILE]) for (const dy of [-TILE, 0, TILE]) out += `<g transform="translate(${dx} ${dy})">${fn()}</g>`;
  return out;
}

// ---------------------------------------------------------------- motifs (each returns SVG shapes, stroke only)
const motifs = {
  // Adire oniko: raffia-tied circles. Concentric, slightly uneven rings with tiny radial pinch marks.
  oniko(ink) {
    const warp = makeWarp(1.1, 3.2);
    const centres = [[60, 60], [180, 60], [0, 180], [120, 180], [240, 180]];
    return wrapped(() =>
      centres
        .map(([cx, cy]) => {
          let g = '';
          [9, 19, 29, 39].forEach((r, i) => {
            g += `<path d="${poly(circlePts(cx, cy, r, warp), true)}" stroke-width="${i % 2 ? 2.2 : 3.4}"/>`;
          });
          for (let k = 0; k < 14; k++) {
            const a = (k / 14) * TAU;
            g += `<path d="${poly([warp(cx + 43 * Math.cos(a), cy + 43 * Math.sin(a)), warp(cx + 50 * Math.cos(a), cy + 50 * Math.sin(a))])}" stroke-width="2"/>`;
          }
          g += `<circle cx="${cx}" cy="${cy}" r="3" fill="${ink}" stroke="none"/>`;
          return g;
        })
        .join('')
    );
  },

  // Olokun (sea): rows of nested half-circles, like waves or scales.
  olokun() {
    const warp = makeWarp(2.4, 2.6);
    return wrapped(() => {
      let g = '';
      for (let row = 0; row < 8; row++) {
        const cy = row * 30 + 30;
        const offset = row % 2 ? 30 : 0;
        for (let col = 0; col < 4; col++) {
          const cx = col * 60 + offset;
          [30, 22, 14, 6].forEach((r, i) => {
            g += `<path d="${poly(circlePts(cx, cy, r, warp, 28, Math.PI, TAU))}" stroke-width="${i === 0 ? 3 : 2.2}"/>`;
          });
        }
      }
      return g;
    });
  },

  // Ibadandun ("Ibadan is sweet"): a quilt of squares, alternating a diamond and a dot cluster.
  ibadandun() {
    const warp = makeWarp(3.3, 2.4);
    const c = 60;
    return wrapped(() => {
      let g = '';
      for (let i = 0; i < 4; i++)
        for (let j = 0; j < 4; j++) {
          const x = i * c;
          const y = j * c;
          g += `<path d="${poly([warp(x + 4, y + 4), warp(x + c - 4, y + 4), warp(x + c - 4, y + c - 4), warp(x + 4, y + c - 4)], true)}" stroke-width="2.6"/>`;
          const mx = x + c / 2;
          const my = y + c / 2;
          if ((i + j) % 2 === 0) {
            g += `<path d="${poly([warp(mx, my - 17), warp(mx + 17, my), warp(mx, my + 17), warp(mx - 17, my)], true)}" stroke-width="2.4"/>`;
            g += `<path d="${poly([warp(mx, my - 8), warp(mx + 8, my), warp(mx, my + 8), warp(mx - 8, my)], true)}" stroke-width="2"/>`;
          } else {
            [[-10, -10], [10, -10], [-10, 10], [10, 10], [0, 0]].forEach(([dx, dy]) => {
              const p = warp(mx + dx, my + dy);
              g += `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="3.2" fill="currentColor" stroke="none"/>`;
            });
          }
        }
      return g;
    });
  },

  // Cowrie shells (wealth, divination) scattered with strings of beads.
  cowrie() {
    const warp = makeWarp(4.2, 2.2);
    const spots = [[40, 45, 20], [150, 30, -35], [210, 110, 55], [95, 120, 90], [30, 190, -60], [165, 200, 15]];
    return wrapped(() => {
      let g = '';
      spots.forEach(([cx, cy, deg]) => {
        const rot = (deg * Math.PI) / 180;
        const shape = (rx, ry) => {
          const pts = [];
          for (let i = 0; i < 40; i++) {
            const a = (i / 40) * TAU;
            const x = rx * Math.cos(a);
            const y = ry * Math.sin(a);
            pts.push(warp(cx + x * Math.cos(rot) - y * Math.sin(rot), cy + x * Math.sin(rot) + y * Math.cos(rot)));
          }
          return pts;
        };
        g += `<path d="${poly(shape(14, 21), true)}" stroke-width="3"/>`;
        // the slit, with teeth
        const slit = [];
        for (let i = -6; i <= 6; i++) {
          const y = i * 2.8;
          const x = 2.2 * Math.sin(i * 0.5);
          slit.push(warp(cx + x * Math.cos(rot) - y * Math.sin(rot), cy + x * Math.sin(rot) + y * Math.cos(rot)));
        }
        g += `<path d="${poly(slit)}" stroke-width="2.4"/>`;
        for (let i = -5; i <= 5; i += 2) {
          const y = i * 2.8;
          const a = warp(cx + -5 * Math.cos(rot) - y * Math.sin(rot), cy + -5 * Math.sin(rot) + y * Math.cos(rot));
          const b = warp(cx + 5 * Math.cos(rot) - y * Math.sin(rot), cy + 5 * Math.sin(rot) + y * Math.cos(rot));
          g += `<path d="${poly([a, b])}" stroke-width="1.6"/>`;
        }
      });
      // beads
      [[95, 40], [190, 60], [130, 160], [20, 120], [215, 190], [80, 225], [60, 100]].forEach(([x, y]) => {
        const p = warp(x, y);
        g += `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="4" fill="currentColor" stroke="none"/>`;
        g += `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="8.5" stroke-width="1.6"/>`;
      });
      return g;
    });
  },

  // Adire alabere: stitched-resist stripes, wavy columns with stitch marks.
  alabere() {
    const warp = makeWarp(5.1, 2.0);
    return wrapped(() => {
      let g = '';
      for (let col = 0; col < 6; col++) {
        const x = col * 40 + 20;
        const pts = [];
        for (let y = 0; y <= TILE; y += 6) pts.push(warp(x + 5 * Math.sin((y / TILE) * TAU * 3 + col), y));
        g += `<path d="${poly(pts)}" stroke-width="3.4"/>`;
        for (let y = 8; y < TILE; y += 20) {
          const [a, b] = [warp(x - 12 + 2 * Math.sin((y / TILE) * TAU * 3 + col), y), warp(x - 5 + 2 * Math.sin((y / TILE) * TAU * 3 + col), y)];
          const [c, d] = [warp(x + 5 + 2 * Math.sin((y / TILE) * TAU * 3 + col), y), warp(x + 12 + 2 * Math.sin((y / TILE) * TAU * 3 + col), y)];
          g += `<path d="${poly([a, b])}" stroke-width="2"/><path d="${poly([c, d])}" stroke-width="2"/>`;
        }
      }
      return g;
    });
  },
};

// Wax-crackle: fine random hairlines, drawn over the motif at low opacity.
function crackle(seed, ink, alpha = 0.5) {
  const r = rng(seed);
  return wrapped(() => {
    let g = '';
    const r2 = rng(seed); // same cracks in all 9 copies
    for (let i = 0; i < 46; i++) {
      let x = r2() * TILE;
      let y = r2() * TILE;
      let a = r2() * TAU;
      const pts = [[x, y]];
      const segs = 3 + Math.floor(r2() * 3);
      for (let s = 0; s < segs; s++) {
        a += (r2() - 0.5) * 1.6;
        x += Math.cos(a) * (8 + r2() * 14);
        y += Math.sin(a) * (8 + r2() * 14);
        pts.push([x, y]);
      }
      g += `<path d="${poly(pts)}" fill="none" stroke="${ink}" stroke-width="0.9" stroke-linecap="round" opacity="${alpha}"/>`;
    }
    void r;
    return g;
  });
}

// ---------------------------------------------------------------- tile rendering
export function tileSvg({ motif, ground, ink, opacity = 1, cracks = true, crackleAlpha = 0.5, size = TILE }) {
  const shapes = motifs[motif](ink);
  const cr = cracks ? crackle(7 + motif.length, ink, crackleAlpha) : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${TILE} ${TILE}" color="${ink}">
  ${ground ? `<rect width="${TILE}" height="${TILE}" fill="${ground}"/>` : ''}
  <g fill="none" stroke="${ink}" stroke-linecap="round" stroke-linejoin="round" opacity="${opacity}">${shapes}</g>
  ${cr}
</svg>`;
}


// ---------------------------------------------------------------- preview sheets
async function preview(outDir) {
  fs.mkdirSync(outDir, { recursive: true });
  const names = ['oniko', 'olokun', 'ibadandun', 'cowrie', 'alabere'];
  const labels = {
    oniko: 'Oniko: tied rosettes',
    olokun: 'Olokun: sea waves',
    ibadandun: 'Ibadandun: quilt grid',
    cowrie: 'Cowrie and beads',
    alabere: 'Alabere: stitched stripes',
  };

  const CELL = 420; // shows 2x2 repeats of a 210px tile
  const T = 210;
  const sheet = async (file, variants) => {
    const cols = 3;
    const rows = Math.ceil(names.length / cols);
    const comps = [];
    for (let i = 0; i < names.length; i++) {
      const n = names[i];
      const v = variants[n] ?? variants.default;
      const buf = await sharp(Buffer.from(tileSvg({ motif: n, size: T, ...v }))).png().toBuffer();
      const x0 = (i % cols) * (CELL + 20) + 20;
      const y0 = Math.floor(i / cols) * (CELL + 70) + 20;
      for (let a = 0; a < 2; a++) for (let b = 0; b < 2; b++) comps.push({ input: buf, left: x0 + a * T, top: y0 + 40 + b * T });
      comps.push({
        input: Buffer.from(`<svg width="${CELL}" height="34"><text x="0" y="24" font-family="Arial" font-size="22" font-weight="bold" fill="#222">${labels[n]}</text></svg>`),
        left: x0,
        top: y0,
      });
    }
    await sharp({ create: { width: cols * (CELL + 20) + 20, height: rows * (CELL + 70) + 20, channels: 4, background: '#e9e4dc' } })
      .composite(comps)
      .png()
      .toFile(path.join(outDir, file));
  };

  // Sheet 1: dark kola ground with tan resist (hero, footer, dark sections)
  await sheet('batik-dark.png', { default: { ground: palette.kola, ink: palette.tan, opacity: 0.85 } });
  // Sheet 2: cream ground with faint saddle-brown resist (page backgrounds behind content)
  await sheet('batik-light.png', { default: { ground: palette.cream, ink: palette.saddle, opacity: 0.32 } });

  // Sheet 3: palette swatches + indigo accent strip + a mock hero using the pattern
  const swatches = [
    ['Cream', palette.cream], ['Sand', palette.sand], ['Tan', palette.tan], ['Saddle', palette.saddle],
    ['Kola', palette.kola], ['Deep', palette.deep], ['Orange', palette.orange], ['Gold', palette.gold], ['Indigo (accent)', palette.indigo],
  ];
  const W = 1400;
  const comps = [];
  const sw = 150;
  swatches.forEach(([n, c], i) => {
    comps.push({ input: { create: { width: sw - 8, height: 90, channels: 4, background: c } }, left: 20 + i * sw, top: 20 });
    const textCol = ['Cream', 'Sand', 'Tan', 'Gold'].includes(n) ? '#222' : '#fff';
    comps.push({
      input: Buffer.from(`<svg width="${sw - 8}" height="90"><text x="8" y="36" font-family="Arial" font-size="17" font-weight="bold" fill="${textCol}">${n}</text><text x="8" y="62" font-family="Arial" font-size="15" fill="${textCol}">${c}</text></svg>`),
      left: 20 + i * sw,
      top: 20,
    });
  });
  // mock hero: kola ground, oniko pattern, vignette, gold rule, sample card
  const heroW = 1360;
  const heroH = 420;
  const t1 = await sharp(Buffer.from(tileSvg({ motif: 'oniko', ground: palette.kola, ink: palette.tan, opacity: 0.55, size: 240 }))).png().toBuffer();
  const heroComps = [];
  for (let a = 0; a * 240 < heroW; a++) for (let b = 0; b * 240 < heroH; b++) heroComps.push({ input: t1, left: a * 240, top: b * 240 });
  const vignette = Buffer.from(
    `<svg width="${heroW}" height="${heroH}"><defs><radialGradient id="v" cx="50%" cy="50%" r="75%"><stop offset="0.35" stop-color="#4A2810" stop-opacity="0"/><stop offset="1" stop-color="#4A2810" stop-opacity="0.78"/></radialGradient></defs><rect width="${heroW}" height="${heroH}" fill="url(#v)"/></svg>`
  );
  const card = Buffer.from(
    `<svg width="760" height="200"><rect width="760" height="200" rx="16" fill="#F5EFE7" fill-opacity="0.94" stroke="#D4AF37" stroke-width="3"/><text x="380" y="82" text-anchor="middle" font-family="Georgia, serif" font-size="46" font-weight="bold" fill="#3D2817">Where heritage meets art</text><text x="380" y="130" text-anchor="middle" font-family="Arial" font-size="22" fill="#6B4423">Text on a solid cream card stays fully readable</text><rect x="320" y="150" width="120" height="5" rx="2" fill="#D4AF37"/></svg>`
  );
  // adire border strip in indigo
  const strip = await sharp(Buffer.from(tileSvg({ motif: 'alabere', ground: palette.indigo, ink: palette.cream, opacity: 0.8, size: 240 }))).extract({ left: 0, top: 0, width: 240, height: 56 }).png().toBuffer();
  const stripComps = [];
  for (let a = 0; a * 240 < heroW; a++) stripComps.push({ input: strip, left: a * 240, top: 0 });
  const stripImg = await sharp({ create: { width: heroW, height: 56, channels: 4, background: palette.indigo } }).composite(stripComps).png().toBuffer();
  const heroBase = await sharp({ create: { width: heroW, height: heroH, channels: 4, background: palette.kola } })
    .composite([...heroComps, { input: vignette, left: 0, top: 0 }, { input: card, left: 300, top: 110 }])
    .png()
    .toBuffer();
  comps.push({ input: heroBase, left: 20, top: 140 });
  comps.push({ input: stripImg, left: 20, top: 140 + heroH });
  comps.push({
    input: Buffer.from(`<svg width="900" height="40"><text x="0" y="28" font-family="Arial" font-size="20" fill="#222">Mock hero: kola ground, oniko pattern at 55%, vignette, gold rule. Indigo adire strip as a divider (about 5% of the page).</text></svg>`),
    left: 20,
    top: 140 + heroH + 66,
  });
  await sharp({ create: { width: W, height: 140 + heroH + 56 + 120, channels: 4, background: '#e9e4dc' } })
    .composite(comps)
    .png()
    .toFile(path.join(outDir, 'batik-palette-mock.png'));
  console.log('preview sheets written to', outDir);
}

// ---------------------------------------------------------------- production tiles
// Line-work only (transparent background) so the tiles sit on the site's existing brown gradients and
// the page tone does not change. Opacity is controlled in CSS by <BatikBackground>.
async function build() {
  const outDir = path.join(root, 'public', 'patterns');
  fs.mkdirSync(outDir, { recursive: true });
  const write = async (name, svg, extractTop) => {
    let img = sharp(Buffer.from(svg));
    if (extractTop) img = sharp(await img.png().toBuffer()).extract({ left: 0, top: 0, width: 480, height: extractTop });
    const buf = await img.webp({ quality: 70, alphaQuality: 55, effort: 6, smartSubsample: true }).toBuffer();
    fs.writeFileSync(path.join(outDir, `${name}.webp`), buf);
    console.log(name.padEnd(16), (buf.length / 1024).toFixed(1) + ' KB');
  };
  for (const motif of Object.keys(motifs)) {
    await write(motif, tileSvg({ motif, ground: null, ink: palette.tan, crackleAlpha: 0.35, size: 480 }));
  }
  // Indigo adire divider strip: cream resist lines on indigo, 480x112 (shown at 240x56)
  await write('adire-strip', tileSvg({ motif: 'alabere', ground: palette.indigo, ink: palette.cream, opacity: 0.85, crackleAlpha: 0.45, size: 480 }), 112);
}

const [cmd, arg] = process.argv.slice(2);
if (cmd === 'preview') await preview(arg ?? path.join(root, 'design-assets', 'preview'));
else if (cmd === 'build') await build();
else console.log('usage: generate-batik-tiles.mjs preview <dir> | build');
