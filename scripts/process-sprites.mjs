import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const spritesDir = path.join(root, 'public/assets/sprites');

async function main() {
  const characters = await fs.readdir(spritesDir);
  for (const character of characters) {
    const dir = path.join(spritesDir, character);
    const files = (await fs.readdir(dir)).filter((file) => file.endsWith('.webp'));
    for (const file of files) {
      const source = path.join(dir, file);
      const buffer = await sharp(source)
        .resize({ width: 832, height: 1200, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .webp({ quality: 88, effort: 5 })
        .toBuffer();
      await fs.writeFile(source, buffer);
    }
  }
  console.log('Sprite post-processing complete.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
