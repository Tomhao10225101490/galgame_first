import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Lightweight engine smoke test — validates route endings resolve without errors.
 * Run: node scripts/smoke-test.mjs
 */

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

function loadStoryNodes() {
  const raw = readFileSync(join(root, 'src/data/story.ts'), 'utf-8');
  const nodes = [];
  const blocks = raw.split(/\{\s*id:\s*'/).slice(1);
  for (const block of blocks) {
    const id = block.match(/^([^']+)'/)?.[1];
    if (!id) continue;
    const type = block.match(/type:\s*'([^']+)'/)?.[1];
    if (!type) continue;
    const node = { id, type };
    const next = block.match(/next:\s*'([^']+)'/)?.[1];
    if (next) node.next = next;
    if (type === 'choice') {
      node.choices = [...block.matchAll(/text:\s*'[^']*',\s*next:\s*'([^']+)'/g)].map((m, i) => ({
        index: i,
        next: m[1],
      }));
    }
    nodes.push(node);
  }
  return new Map(nodes.map((n) => [n.id, n]));
}

const nodes = loadStoryNodes();
const visited = new Set();
let errors = 0;

function walk(id, depth = 0) {
  if (depth > 500 || visited.has(id)) return;
  visited.add(id);
  const node = nodes.get(id);
  if (!node) {
    console.error('Missing node:', id);
    errors++;
    return;
  }
  if (node.next) walk(node.next, depth + 1);
  if (node.choices) node.choices.forEach((c) => walk(c.next, depth + 1));
}

walk('start');
console.log(`Smoke test: visited ${visited.size} reachable nodes, errors ${errors}`);
if (errors) process.exit(1);

const endings = [...nodes.values()].filter((n) => n.type === 'ending');
console.log(`Endings defined: ${endings.length}`);
