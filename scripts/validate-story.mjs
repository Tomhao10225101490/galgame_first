import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const storyPath = join(root, 'src/data/story.ts');
const content = readFileSync(storyPath, 'utf-8');

const idMatches = [...content.matchAll(/\{\s*id:\s*'([^']+)'/g)];
const ids = idMatches.map((m) => m[1]);
const idSet = new Set(ids);

const refs = [];
for (const match of content.matchAll(/next:\s*'([^']+)'/g)) {
  refs.push(match[1]);
}

const missing = refs.filter((r) => !idSet.has(r));
const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);

if (dupes.length) {
  console.error('Duplicate node IDs:', [...new Set(dupes)]);
  process.exit(1);
}

if (missing.length) {
  console.error('Missing node references:', missing);
  process.exit(1);
}

console.log(`Story validation OK: ${ids.length} nodes, ${refs.length} references`);
