// Dependency-free build-time icon generator.
// Rasterises a simple football glyph and encodes PNGs using Node's built-in zlib.
// Produces public/icons/{icon-192,icon-512,maskable-512}.png

import { deflateSync } from 'node:zlib';
import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, '../public/icons');

const BG = [0x0e, 0x16, 0x22, 255];
const BALL = [0xe4, 0xea, 0xf2, 255];
const PATCH = [0x0e, 0x16, 0x22, 255];
const GREEN = [0x23, 0x70, 0x36, 255];

// --- tiny PNG encoder ------------------------------------------------------
const crcTable = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function encodePNG(width, height, rgba) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // colour type RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  // add filter byte (0) at the start of every scanline
  const stride = width * 4;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (stride + 1)] = 0;
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, y * stride + stride);
  }
  const idat = deflateSync(raw, { level: 9 });
  return Buffer.concat([
    sig,
    chunk('IHDR', ihdr),
    chunk('IDAT', idat),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

// --- glyph rasteriser ------------------------------------------------------
function inPentagon(px, py, cx, cy, r) {
  // regular pentagon, point up
  const pts = [];
  for (let i = 0; i < 5; i++) {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
    pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }
  let inside = true;
  for (let i = 0; i < 5; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[(i + 1) % 5];
    if ((x2 - x1) * (py - y1) - (y2 - y1) * (px - x1) < 0) inside = false;
  }
  return inside;
}

function drawBall(size, maskable) {
  const buf = Buffer.alloc(size * size * 4);
  const cx = size / 2;
  const cy = size / 2;
  const r = size * (maskable ? 0.3 : 0.4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const px = x + 0.5;
      const py = y + 0.5;
      const d = Math.hypot(px - cx, py - cy);
      let col = BG;
      if (maskable && py > size * 0.78) col = GREEN;
      if (d <= r) {
        col = BALL;
        if (inPentagon(px, py, cx, cy, r * 0.36)) col = PATCH;
        for (let i = 0; i < 5; i++) {
          const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
          const ox = cx + Math.cos(a) * r * 0.8;
          const oy = cy + Math.sin(a) * r * 0.8;
          if (inPentagon(px, py, ox, oy, r * 0.2)) col = PATCH;
        }
      } else if (d <= r + size * 0.012) col = PATCH;
      const i = (y * size + x) * 4;
      buf[i] = col[0];
      buf[i + 1] = col[1];
      buf[i + 2] = col[2];
      buf[i + 3] = col[3];
    }
  }
  return buf;
}

mkdirSync(outDir, { recursive: true });
for (const [name, size, maskable] of [
  ['icon-192', 192, false],
  ['icon-512', 512, false],
  ['maskable-512', 512, true],
]) {
  const png = encodePNG(size, size, drawBall(size, maskable));
  writeFileSync(resolve(outDir, `${name}.png`), png);
  console.log(`generated icons/${name}.png (${size}px)`);
}
