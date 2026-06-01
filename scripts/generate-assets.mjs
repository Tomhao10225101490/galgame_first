/**
 * Generates WebP backgrounds, UI key visual, and character sprites for 星轨便利店.
 * Run: node scripts/generate-assets.mjs
 */
import sharp from 'sharp';
import { mkdir, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'public', 'assets');

const W = 1920;
const H = 1080;

async function ensureDirs() {
  const dirs = [
    'backgrounds',
    'ui',
    'bgm',
    'se',
    ...['weiyang', 'zhixia', 'baichuan', 'linmu', 'zhouyuan'].map((c) => `sprites/${c}`),
  ];
  for (const d of dirs) {
    await mkdir(join(out, d), { recursive: true });
  }
}

function svgBackground(id, stops, extras = '') {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">${stops}</linearGradient>
    <radialGradient id="glow" cx="50%" cy="30%" r="60%">
      <stop offset="0%" stop-color="rgba(255,220,150,0.25)"/>
      <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
    </radialGradient>
    <linearGradient id="vignette" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="70%" stop-color="rgba(0,0,0,0)"/>
      <stop offset="100%" stop-color="rgba(0,0,0,0.55)"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  ${extras}
  <rect width="${W}" height="${H}" fill="url(#vignette)"/>
</svg>`;
}

const BACKGROUNDS = {
  convenience_night: svgBackground(
    'convenience_night',
    `<stop offset="0%" stop-color="#0a1020"/><stop offset="50%" stop-color="#151a35"/><stop offset="100%" stop-color="#1a1530"/>`,
    `<rect x="80" y="400" width="900" height="500" fill="rgba(30,35,60,0.7)" rx="4"/>
     <rect x="1500" y="350" width="280" height="450" fill="rgba(80,140,220,0.15)" stroke="rgba(120,180,255,0.3)" stroke-width="2"/>
     ${Array.from({ length: 40 }, (_, i) => `<circle cx="${100 + (i * 47) % 1700}" cy="${80 + (i * 31) % 300}" r="1.5" fill="white" opacity="${0.3 + (i % 5) * 0.12}"/>`).join('')}`,
  ),
  convenience_day: svgBackground(
    'convenience_day',
    `<stop offset="0%" stop-color="#87a8c8"/><stop offset="60%" stop-color="#e8dcc8"/><stop offset="100%" stop-color="#f5efe0"/>`,
    `<rect x="100" y="420" width="850" height="480" fill="rgba(255,250,240,0.6)" rx="4"/>`,
  ),
  classroom_sunset: svgBackground(
    'classroom_sunset',
    `<stop offset="0%" stop-color="#4a3060"/><stop offset="40%" stop-color="#c06050"/><stop offset="100%" stop-color="#f0d080"/>`,
    `<rect x="200" y="200" width="1200" height="350" fill="#2a4030" opacity="0.85"/>
     <rect x="1400" y="150" width="350" height="500" fill="rgba(255,200,120,0.35)" stroke="rgba(255,180,80,0.5)" stroke-width="3"/>`,
  ),
  planetarium_old: svgBackground(
    'planetarium_old',
    `<stop offset="0%" stop-color="#0a0c18"/><stop offset="100%" stop-color="#2a2850"/>`,
    `<ellipse cx="960" cy="350" rx="700" ry="400" fill="none" stroke="rgba(200,200,220,0.2)" stroke-width="3"/>
     <ellipse cx="960" cy="350" rx="650" ry="370" fill="rgba(60,70,120,0.3)"/>`,
  ),
  rooftop_stars: svgBackground(
    'rooftop_stars',
    `<stop offset="0%" stop-color="#050810"/><stop offset="100%" stop-color="#1a2040"/>`,
    `${Array.from({ length: 120 }, (_, i) => `<circle cx="${(i * 97) % W}" cy="${(i * 53) % 500}" r="${1 + (i % 3)}" fill="white" opacity="${0.2 + (i % 7) * 0.1}"/>`).join('')}
     <rect x="0" y="750" width="${W}" height="330" fill="rgba(20,25,45,0.9)"/>`,
  ),
  station_morning: svgBackground(
    'station_morning',
    `<stop offset="0%" stop-color="#a0c0d8"/><stop offset="100%" stop-color="#e8e0d0"/>`,
    `<rect x="0" y="700" width="${W}" height="380" fill="#505860"/>
     <line x1="0" y1="820" x2="${W}" y2="820" stroke="#888" stroke-width="6"/>
     <line x1="0" y1="880" x2="${W}" y2="880" stroke="#888" stroke-width="6"/>`,
  ),
  rain_street: svgBackground(
    'rain_street',
    `<stop offset="0%" stop-color="#101520"/><stop offset="100%" stop-color="#252a40"/>`,
    `<circle cx="400" cy="250" r="80" fill="rgba(255,220,150,0.25)"/>
     ${Array.from({ length: 80 }, (_, i) => `<line x1="${(i * 24) % W}" y1="${(i * 17) % H}" x2="${(i * 24) % W + 8}" y2="${(i * 17) % H + 40}" stroke="rgba(150,180,220,0.15)" stroke-width="1"/>`).join('')}`,
  ),
  underground_machine: svgBackground(
    'underground_machine',
    `<stop offset="0%" stop-color="#0a0c18"/><stop offset="100%" stop-color="#1a2040"/>`,
    `<circle cx="960" cy="540" r="280" fill="none" stroke="rgba(100,200,255,0.4)" stroke-width="4"/>
     <circle cx="960" cy="540" r="200" fill="rgba(50,120,200,0.2)"/>
     <circle cx="960" cy="540" r="60" fill="rgba(100,200,255,0.5)"/>`,
  ),
  school_hallway: svgBackground(
    'school_hallway',
    `<stop offset="0%" stop-color="#c8d0d8"/><stop offset="100%" stop-color="#d8dce0"/>`,
    `<rect x="80" y="200" width="400" height="700" fill="rgba(100,110,130,0.35)"/>`,
  ),
  home_evening: svgBackground(
    'home_evening',
    `<stop offset="0%" stop-color="#302840"/><stop offset="100%" stop-color="#685070"/>`,
    `<rect x="600" y="300" width="700" height="500" fill="rgba(255,200,120,0.08)" rx="8"/>`,
  ),
  beach_dusk: svgBackground(
    'beach_dusk',
    `<stop offset="0%" stop-color="#405080"/><stop offset="50%" stop-color="#c07060"/><stop offset="100%" stop-color="#f0c890"/>`,
    `<rect x="0" y="700" width="${W}" height="380" fill="#c0a070"/>`,
  ),
  title_sky: svgBackground(
    'title_sky',
    `<stop offset="0%" stop-color="#0a0e1f"/><stop offset="50%" stop-color="#1a2040"/><stop offset="100%" stop-color="#2a2850"/>`,
    `${Array.from({ length: 150 }, (_, i) => `<circle cx="${(i * 73) % W}" cy="${(i * 41) % 600}" r="${1 + (i % 2)}" fill="white" opacity="${0.25 + (i % 6) * 0.1}"/>`).join('')}`,
  ),
};

const CHARACTERS = {
  weiyang: { hair: '#5a4a78', skin: '#f5e6d8', outfit: '#6b5a88', accent: '#9a8ab8', desc: 'long purple hair camera strap' },
  zhixia: { hair: '#8a4040', skin: '#f5e6d8', outfit: '#a05050', accent: '#c45c5c', desc: 'ponytail glasses school uniform' },
  baichuan: { hair: '#e8e8f0', skin: '#f5e6d8', outfit: '#d0d0e0', accent: '#f0f0f8', desc: 'white hoodie asymmetric bangs' },
  linmu: { hair: '#6b5040', skin: '#f0e0d0', outfit: '#a08060', accent: '#c0a080', desc: 'bob hair apron mother' },
  zhouyuan: { hair: '#3a6648', skin: '#f5e6d8', outfit: '#5a9a6e', accent: '#7aba8e', desc: 'messy hair sportswear boy' },
};

const EXPRESSION_MOD = {
  neutral: { mouth: 'M85 118 Q100 122 115 118', eye: 'open' },
  smile: { mouth: 'M85 118 Q100 128 115 118', eye: 'open' },
  sad: { mouth: 'M85 122 Q100 112 115 122', eye: 'down' },
  surprised: { mouth: 'M92 118 L108 118 L100 128 Z', eye: 'wide' },
  serious: { mouth: 'M85 120 L115 120', eye: 'narrow' },
  gentle: { mouth: 'M85 118 Q100 126 115 118', eye: 'soft' },
};

function spriteSvg(charId, expression, colors) {
  const exp = EXPRESSION_MOD[expression];
  const eyeY = exp.eye === 'down' ? 2 : 0;
  const eyeRy = exp.eye === 'wide' ? 6 : exp.eye === 'narrow' ? 3 : 5;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="832" height="1200" viewBox="0 0 200 300">
  <defs>
    <linearGradient id="body" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${colors.outfit}"/>
      <stop offset="100%" stop-color="${colors.accent}"/>
    </linearGradient>
  </defs>
  <ellipse cx="100" cy="290" rx="55" ry="10" fill="rgba(0,0,0,0.25)"/>
  <path d="M65 130 Q100 118 135 130 L140 285 L60 285 Z" fill="url(#body)"/>
  <ellipse cx="100" cy="105" rx="38" ry="42" fill="${colors.skin}"/>
  <ellipse cx="100" cy="55" rx="42" ry="48" fill="${colors.hair}"/>
  <ellipse cx="82" cy="${98 + eyeY}" rx="5" ry="${eyeRy}" fill="#2a2030"/>
  <ellipse cx="118" cy="${98 + eyeY}" rx="5" ry="${eyeRy}" fill="#2a2030"/>
  <path d="${exp.mouth}" stroke="#4a3540" stroke-width="2" fill="none"/>
</svg>`;
}

async function writeWebpFromSvg(svg, path, w, h) {
  await sharp(Buffer.from(svg)).resize(w, h).webp({ quality: 88 }).toFile(path);
}

async function generateBackgrounds() {
  for (const [id, svg] of Object.entries(BACKGROUNDS)) {
    const path = join(out, 'backgrounds', `${id}.webp`);
    await writeWebpFromSvg(svg, path, W, H);
    console.log('bg', id);
  }
  await writeWebpFromSvg(BACKGROUNDS.title_sky, join(out, 'ui', 'keyvisual.webp'), W, H);
}

async function generateSprites() {
  for (const [charId, colors] of Object.entries(CHARACTERS)) {
    for (const expr of Object.keys(EXPRESSION_MOD)) {
      const svg = spriteSvg(charId, expr, colors);
      const path = join(out, 'sprites', charId, `${expr}.webp`);
      await writeWebpFromSvg(svg, path, 832, 1200);
    }
    console.log('sprite', charId);
  }
}

async function main() {
  await ensureDirs();
  await generateBackgrounds();
  await generateSprites();
  console.log('Asset generation complete.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
