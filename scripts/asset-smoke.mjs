import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

const backgrounds = [
  'convenience_night',
  'convenience_day',
  'classroom_sunset',
  'planetarium_old',
  'rooftop_stars',
  'station_morning',
  'rain_street',
  'underground_machine',
  'school_hallway',
  'home_evening',
  'beach_dusk',
  'title_sky',
];
const characters = ['weiyang', 'zhixia', 'baichuan', 'linmu', 'zhouyuan'];
const expressions = ['neutral', 'smile', 'sad', 'surprised', 'serious', 'gentle'];
const bgm = ['night', 'day', 'rain', 'stars', 'tension', 'ending'];
const se = ['click', 'choice', 'save', 'pageTurn'];

const checks = [
  ...backgrounds.map((id) => [`public/assets/backgrounds/${id}.webp`, 10_000]),
  ...characters.flatMap((character) => expressions.map((expression) => [`public/assets/sprites/${character}/${expression}.webp`, 10_000])),
  ...bgm.map((id) => [`public/assets/bgm/${id}.mp3`, 100_000]),
  ...se.map((id) => [`public/assets/se/${id}.mp3`, 1_000]),
  ['public/assets/ui/keyvisual.webp', 10_000],
];

const failures = [];
for (const [relative, minSize] of checks) {
  const file = path.join(root, relative);
  if (!fs.existsSync(file)) {
    failures.push(`${relative} missing`);
    continue;
  }
  const size = fs.statSync(file).size;
  if (size < minSize) failures.push(`${relative} too small (${size} bytes)`);
}

if (failures.length > 0) {
  console.error(`Asset smoke failed:\n${failures.map((failure) => `- ${failure}`).join('\n')}`);
  process.exit(1);
}

console.log(`Asset smoke OK: ${checks.length} files verified`);
