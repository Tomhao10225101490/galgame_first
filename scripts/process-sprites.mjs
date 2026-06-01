/**
 * Convert PNG sprites from artifacts or local folder to WebP in public/assets/sprites/
 * Usage: node scripts/process-sprites.mjs [sourceDir]
 */
import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const source = process.argv[2] ?? join(root, 'sprites-import');
const outRoot = join(root, 'public', 'assets', 'sprites');

const EXPRESSIONS = ['neutral', 'smile', 'sad', 'surprised', 'serious', 'gentle'];
const CHARS = ['weiyang', 'zhixia', 'baichuan', 'linmu', 'zhouyuan'];

async function processFile(char, expr, inputPath) {
  const dir = join(outRoot, char);
  await mkdir(dir, { recursive: true });
  const out = join(dir, `${expr}.webp`);
  await sharp(inputPath).resize(832, 1200, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).webp({ quality: 88 }).toFile(out);
  console.log('wrote', out);
}

async function main() {
  for (const char of CHARS) {
    const charDir = join(source, char);
    try {
      const files = await readdir(charDir);
      for (const file of files) {
        const expr = EXPRESSIONS.find((e) => file.startsWith(e));
        if (!expr) continue;
        await processFile(char, expr, join(charDir, file));
      }
    } catch {
      // try flat naming: weiyang_smile.png
      for (const expr of EXPRESSIONS) {
        const flat = join(source, `${char}_${expr}.png`);
        try {
          await processFile(char, expr, flat);
        } catch {
          /* skip */
        }
      }
    }
  }
}

main().catch(console.error);
