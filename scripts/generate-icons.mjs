// Dependency-free build-time icon generator.
// Rasterises a simple house glyph and encodes PNGs using Node's built-in zlib.
// Produces public/icons/{icon-192,icon-512,maskable-512}.png

import { deflateSync } from 'node:zlib';
import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, '../public/icons');

const BG = [0x12, 0x15, 0x1a, 255]; // slate-900
const ACCENT = [0x4a, 0x97, 0xa6, 255]; // accent.soft

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
function inTriangle(px, py, a, b, c) {
  const d = (b[1] - c[1]) * (a[0] - c[0]) + (c[0] - b[0]) * (a[1] - c[1]);
  const l1 = ((b[1] - c[1]) * (px - c[0]) + (c[0] - b[0]) * (py - c[1])) / d;
  const l2 = ((c[1] - a[1]) * (px - c[0]) + (a[0] - c[0]) * (py - c[1])) / d;
  const l3 = 1 - l1 - l2;
  return l1 >= 0 && l2 >= 0 && l3 >= 0;
}

function drawHouse(size) {
  const buf = Buffer.alloc(size * size * 4);
  const put = (x, y, col) => {
    const i = (y * size + x) * 4;
    buf[i] = col[0];
    buf[i + 1] = col[1];
    buf[i + 2] = col[2];
    buf[i + 3] = col[3];
  };
  const apex = [0.5 * size, 0.16 * size];
  const roofL = [0.14 * size, 0.46 * size];
  const roofR = [0.86 * size, 0.46 * size];
  const bodyX0 = 0.24 * size;
  const bodyX1 = 0.76 * size;
  const bodyY0 = 0.44 * size;
  const bodyY1 = 0.84 * size;
  const doorX0 = 0.44 * size;
  const doorX1 = 0.56 * size;
  const doorY0 = 0.58 * size;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let col = BG;
      const inBody = x >= bodyX0 && x <= bodyX1 && y >= bodyY0 && y <= bodyY1;
      const inRoof = inTriangle(x + 0.5, y + 0.5, apex, roofL, roofR);
      if (inBody || inRoof) col = ACCENT;
      const inDoor = x >= doorX0 && x <= doorX1 && y >= doorY0 && y <= bodyY1;
      if (inDoor) col = BG;
      put(x, y, col);
    }
  }
  return buf;
}

mkdirSync(outDir, { recursive: true });
for (const [name, size] of [
  ['icon-192', 192],
  ['icon-512', 512],
  ['maskable-512', 512],
]) {
  const png = encodePNG(size, size, drawHouse(size));
  writeFileSync(resolve(outDir, `${name}.png`), png);
  console.log(`generated icons/${name}.png (${size}px)`);
}
