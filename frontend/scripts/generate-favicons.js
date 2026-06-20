const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const PUBLIC = path.join(__dirname, '..', 'public');

function createPNG(width, height, pixels) {
  // pixels: array of RGBA values (4 * width * height)
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  function chunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeB = Buffer.from(type, 'ascii');
    const crcData = Buffer.concat([typeB, data]);
    const crc = crc32(crcData);
    const crcB = Buffer.alloc(4);
    crcB.writeUInt32BE(crc, 0);
    return Buffer.concat([len, typeB, data, crcB]);
  }

  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type RGBA
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  // IDAT - raw pixel data with filter byte per row
  const raw = Buffer.alloc(height * (1 + width * 4));
  for (let y = 0; y < height; y++) {
    raw[y * (1 + width * 4)] = 0; // filter none
    for (let x = 0; x < width; x++) {
      const src = (y * width + x) * 4;
      const dst = y * (1 + width * 4) + 1 + x * 4;
      raw[dst] = pixels[src];
      raw[dst + 1] = pixels[src + 1];
      raw[dst + 2] = pixels[src + 2];
      raw[dst + 3] = pixels[src + 3];
    }
  }

  const compressed = zlib.deflateSync(raw);

  return Buffer.concat([
    signature,
    chunk('IHDR', ihdr),
    chunk('IDAT', compressed),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

// CRC32 lookup table
const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[n] = c;
}
function crc32(buf) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8);
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function generateS(width, height) {
  const pixels = [];
  const bg = [124, 58, 237, 255]; // purple
  const fg = [255, 255, 255, 255]; // white

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const nx = x / width;
      const ny = y / height;

      // Simple "S" shape detection
      const cx = 0.5;
      const cy = 0.5;
      const r = 0.38;

      const dx = (nx - cx);
      const dy = (ny - cy);
      const dist = Math.sqrt(dx*dx + dy*dy);

      // Top curve: y < 0.5, x > 0.3
      // Bottom curve: y > 0.5, x < 0.7
      // Middle bar: y between 0.4 and 0.6, x between 0.3 and 0.7

      let isS = false;

      // Top horizontal bar
      if (ny < 0.25 && nx > 0.2 && nx < 0.8) isS = true;
      // Top curve (left side going down)
      if (nx > 0.2 && nx < 0.55 && ny > 0.15 && ny < 0.45) {
        const cx2 = 0.38, cy2 = 0.3;
        const d = Math.sqrt((nx-cx2)**2 + (ny-cy2)**2);
        if (d < 0.22 && d > 0.08) isS = true;
      }
      // Middle diagonal
      if (ny > 0.35 && ny < 0.65 && nx > 0.25 && nx < 0.75) {
        const mid = 0.5;
        const dxm = nx - 0.4 - (ny - 0.35) * 0.7;
        if (dxm > 0 && dxm < 0.35) isS = true;
      }
      // Bottom curve
      if (nx > 0.45 && nx < 0.8 && ny > 0.55 && ny < 0.85) {
        const cx3 = 0.62, cy3 = 0.7;
        const d = Math.sqrt((nx-cx3)**2 + (ny-cy3)**2);
        if (d < 0.22 && d > 0.08) isS = true;
      }
      // Bottom horizontal bar
      if (ny > 0.75 && nx > 0.2 && nx < 0.8) isS = true;

      if (isS) {
        pixels.push(...fg);
      } else {
        // Gradient background
        const t = (nx + ny) / 2;
        const r2 = Math.round(124 * (1-t) + 34 * t);
        const g2 = Math.round(58 * (1-t) + 211 * t);
        const b2 = Math.round(237 * (1-t) + 238 * t);
        pixels.push(r2, g2, b2, 255);
      }
    }
  }
  return pixels;
}

// Generate files
const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
];

for (const { name, size } of sizes) {
  const pixels = generateS(size, size);
  const png = createPNG(size, size, pixels);
  fs.writeFileSync(path.join(PUBLIC, name), png);
  console.log(`Generated ${name} (${size}x${size})`);
}

// Copy 32x32 as favicon.ico (simple approach - browsers accept PNG as .ico)
fs.copyFileSync(
  path.join(PUBLIC, 'favicon-32x32.png'),
  path.join(PUBLIC, 'favicon.ico')
);
console.log('Generated favicon.ico');

console.log('\nAll favicons generated successfully!');
