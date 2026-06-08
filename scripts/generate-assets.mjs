import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const out = path.join(root, 'public/assets');

const backgrounds = {
  convenience_night: {
    title: '星轨便利店 / Night Shift',
    sky: ['#070916', '#101936', '#231b31'],
    accents: ['#6bb8ff', '#f0c878'],
    motifs: ['shelf', 'fridge', 'window'],
  },
  convenience_day: {
    title: '星轨便利店 / Afternoon',
    sky: ['#85b4d8', '#ecd097', '#f5e6c8'],
    accents: ['#ffffff', '#e7a64b'],
    motifs: ['shelf', 'door', 'sun'],
  },
  classroom_sunset: {
    title: '凌川高中 / Sunset Classroom',
    sky: ['#37224b', '#b8555f', '#f0b76b'],
    accents: ['#ffd48d', '#2c4939'],
    motifs: ['blackboard', 'window', 'desks'],
  },
  planetarium_old: {
    title: '旧天文馆 / Sealed Dome',
    sky: ['#050713', '#171b36', '#2e2b62'],
    accents: ['#8fb3ff', '#f0c878'],
    motifs: ['dome', 'stars', 'crack'],
  },
  rooftop_stars: {
    title: '教学楼天台 / Rooftop Stars',
    sky: ['#020510', '#0d1632', '#22284c'],
    accents: ['#cfe7ff', '#f7dda0'],
    motifs: ['rail', 'stars', 'city'],
  },
  station_morning: {
    title: '凌川车站 / First Train',
    sky: ['#9bc3df', '#d7e4ef', '#f0dfc8'],
    accents: ['#fff2c8', '#68717c'],
    motifs: ['platform', 'tracks', 'sign'],
  },
  rain_street: {
    title: '雨中的商店街 / Rain Memory',
    sky: ['#101625', '#22283b', '#0e1420'],
    accents: ['#ffd98b', '#6fa5ff'],
    motifs: ['lamp', 'puddle', 'neon'],
  },
  underground_machine: {
    title: '地下星象仪 / Unauthorized Start',
    sky: ['#030611', '#132048', '#07101f'],
    accents: ['#5bdcff', '#1b6bff'],
    motifs: ['machine', 'grid', 'core'],
  },
  school_hallway: {
    title: '旧校舍走廊 / After School',
    sky: ['#c2ccd7', '#e2e4e7', '#b7c2cc'],
    accents: ['#d8b06a', '#718198'],
    motifs: ['lockers', 'windows', 'floor'],
  },
  home_evening: {
    title: '林家客厅 / Before Dinner',
    sky: ['#2b2336', '#5a455c', '#73545c'],
    accents: ['#ffb470', '#f1dbc0'],
    motifs: ['sofa', 'window', 'lamp'],
  },
  beach_dusk: {
    title: '凌川海岸 / Dusk Tide',
    sky: ['#344879', '#bc6760', '#edc68d'],
    accents: ['#ffe1a0', '#78b7d8'],
    motifs: ['sea', 'sun', 'sand'],
  },
  title_sky: {
    title: '星轨便利店 / Star Trail',
    sky: ['#020510', '#11183b', '#2d2859'],
    accents: ['#f0c878', '#8fc8ff'],
    motifs: ['stars', 'orbit', 'store'],
  },
};

const characters = {
  weiyang: { name: '星野未央', hair: '#2d214d', skin: '#f3d5c3', cloth: '#6f63a8', accent: '#c9b9ff', accessory: 'camera' },
  zhixia: { name: '沈知夏', hair: '#4a2c2c', skin: '#f2d1bf', cloth: '#394e76', accent: '#d46b6b', accessory: 'glasses' },
  baichuan: { name: '白川音', hair: '#dfe5f4', skin: '#f5d9c9', cloth: '#eef1f8', accent: '#9aa8d0', accessory: 'hood' },
  linmu: { name: '林母', hair: '#5d4638', skin: '#e5c4ae', cloth: '#9b755c', accent: '#f0e1c8', accessory: 'apron' },
  zhouyuan: { name: '周远', hair: '#283323', skin: '#e8c6ad', cloth: '#4f9b69', accent: '#e6f0d4', accessory: 'sport' },
};

const expressions = ['neutral', 'smile', 'sad', 'surprised', 'serious', 'gentle'];

function esc(value) {
  return String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[c]);
}

function backgroundSvg(id, cfg) {
  const [top, mid, bottom] = cfg.sky;
  const [accentA, accentB] = cfg.accents;
  const stars = Array.from({ length: 95 }, (_, i) => {
    const x = (i * 73) % 1920;
    const y = (i * 157) % 620;
    const r = 0.8 + ((i * 17) % 18) / 10;
    const op = 0.35 + ((i * 19) % 55) / 100;
    return `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" opacity="${op}"/>`;
  }).join('');

  const motif = cfg.motifs
    .map((m) => {
      if (m === 'shelf') return `<rect x="110" y="610" width="1700" height="260" rx="18" fill="rgba(20,24,44,.62)"/><path d="M120 700H1810M120 790H1810" stroke="${accentB}" stroke-opacity=".28" stroke-width="5"/>`;
      if (m === 'fridge') return `<rect x="1450" y="420" width="210" height="390" rx="14" fill="${accentA}" opacity=".18"/><rect x="1474" y="448" width="160" height="320" rx="8" fill="#d9f2ff" opacity=".12"/>`;
      if (m === 'window') return `<rect x="1260" y="160" width="360" height="220" rx="12" fill="#071026" stroke="${accentA}" stroke-opacity=".35" stroke-width="4"/>${stars}`;
      if (m === 'blackboard') return `<rect x="260" y="205" width="890" height="310" rx="8" fill="#243b31" stroke="#806d4d" stroke-width="14"/><path d="M330 318H1050M330 388H850" stroke="#e7f1df" stroke-opacity=".18" stroke-width="5"/>`;
      if (m === 'desks') return `<g opacity=".58"><rect x="160" y="730" width="390" height="120" rx="10" fill="#4c2f38"/><rect x="690" y="760" width="430" height="120" rx="10" fill="#4c2f38"/><rect x="1240" y="720" width="460" height="130" rx="10" fill="#4c2f38"/></g>`;
      if (m === 'dome') return `<path d="M310 700Q960 120 1610 700" fill="none" stroke="${accentA}" stroke-opacity=".35" stroke-width="7"/><path d="M420 690Q960 260 1500 690" fill="none" stroke="${accentA}" stroke-opacity=".16" stroke-width="4"/>${stars}`;
      if (m === 'crack') return `<path d="M955 230l24 88-38 70 32 95-58 110" fill="none" stroke="${accentB}" stroke-opacity=".42" stroke-width="5"/>`;
      if (m === 'rail') return `<path d="M0 760H1920M0 810H1920" stroke="#9aa8c9" stroke-opacity=".35" stroke-width="6"/><g opacity=".45">${Array.from({ length: 16 }, (_, i) => `<rect x="${i * 130}" y="740" width="14" height="120" fill="#151b33"/>`).join('')}</g>`;
      if (m === 'city') return `<g opacity=".5">${Array.from({ length: 22 }, (_, i) => `<rect x="${i * 95}" y="${650 - ((i * 41) % 160)}" width="70" height="${220 + ((i * 41) % 160)}" fill="#060a14"/>`).join('')}</g>`;
      if (m === 'tracks') return `<path d="M420 1080L860 610M1500 1080L1060 610" stroke="#4b535b" stroke-width="18"/><path d="M0 820H1920M0 890H1920" stroke="#7c858c" stroke-width="8"/>`;
      if (m === 'platform') return `<rect x="0" y="680" width="1920" height="400" fill="#58606a" opacity=".72"/><rect x="0" y="648" width="1920" height="35" fill="#e8d2a8" opacity=".8"/>`;
      if (m === 'sign') return `<rect x="1240" y="250" width="360" height="110" rx="10" fill="#f6f0d8" opacity=".85"/><text x="1420" y="320" text-anchor="middle" font-size="42" fill="#334">凌川</text>`;
      if (m === 'lamp') return `<rect x="520" y="300" width="18" height="520" fill="#343746"/><circle cx="529" cy="280" r="82" fill="${accentB}" opacity=".35"/><circle cx="529" cy="280" r="28" fill="${accentB}" opacity=".8"/>`;
      if (m === 'puddle') return `<ellipse cx="1050" cy="880" rx="520" ry="90" fill="${accentA}" opacity=".12"/><ellipse cx="620" cy="930" rx="310" ry="55" fill="#d8e8ff" opacity=".1"/>`;
      if (m === 'neon') return `<rect x="1290" y="380" width="340" height="120" rx="12" fill="#101729" stroke="${accentA}" stroke-opacity=".5" stroke-width="5"/><text x="1460" y="456" text-anchor="middle" font-size="40" fill="${accentA}" opacity=".8">OPEN</text>`;
      if (m === 'machine') return `<circle cx="960" cy="540" r="300" fill="none" stroke="${accentA}" stroke-opacity=".45" stroke-width="10"/><circle cx="960" cy="540" r="190" fill="none" stroke="${accentA}" stroke-opacity=".28" stroke-width="6"/><circle cx="960" cy="540" r="74" fill="${accentA}" opacity=".32"/>`;
      if (m === 'grid') return `<g opacity=".16">${Array.from({ length: 28 }, (_, i) => `<path d="M${i * 80} 1080L960 540" stroke="${accentA}" stroke-width="2"/>`).join('')}</g>`;
      if (m === 'core') return `<circle cx="960" cy="540" r="34" fill="#eaffff" opacity=".8"/>`;
      if (m === 'lockers') return `<g opacity=".58">${Array.from({ length: 7 }, (_, i) => `<rect x="${120 + i * 130}" y="250" width="110" height="560" rx="6" fill="#788599"/><path d="M${140 + i * 130} 360h70M${140 + i * 130} 585h70" stroke="#dbe1ea" stroke-opacity=".28" stroke-width="4"/>`).join('')}</g>`;
      if (m === 'floor') return `<path d="M0 790H1920L1580 1080H340Z" fill="#8d96a3" opacity=".42"/><path d="M960 790V1080M520 790L220 1080M1400 790l300 290" stroke="#fff" stroke-opacity=".14" stroke-width="3"/>`;
      if (m === 'sofa') return `<rect x="500" y="660" width="760" height="210" rx="34" fill="#6f4c54"/><rect x="560" y="570" width="640" height="180" rx="32" fill="#7e5860"/>`;
      if (m === 'sea') return `<rect x="0" y="620" width="1920" height="250" fill="${accentA}" opacity=".28"/><path d="M0 650C220 610 360 690 560 650S920 610 1130 650s390 35 790-10" fill="none" stroke="#fff0d0" stroke-opacity=".34" stroke-width="8"/>`;
      if (m === 'sand') return `<rect x="0" y="840" width="1920" height="240" fill="#c39962" opacity=".88"/>`;
      if (m === 'sun') return `<circle cx="1450" cy="190" r="95" fill="${accentA}" opacity=".66"/>`;
      if (m === 'orbit') return `<ellipse cx="960" cy="470" rx="640" ry="210" fill="none" stroke="${accentB}" stroke-opacity=".48" stroke-width="4" transform="rotate(-12 960 470)"/><ellipse cx="960" cy="470" rx="430" ry="140" fill="none" stroke="${accentA}" stroke-opacity=".28" stroke-width="3" transform="rotate(18 960 470)"/>`;
      if (m === 'store') return `<path d="M420 780L620 660H1300L1510 780V1000H420Z" fill="#050711" opacity=".85"/><rect x="700" y="735" width="480" height="120" rx="12" fill="${accentB}" opacity=".14"/>`;
      return '';
    })
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${top}"/>
        <stop offset="52%" stop-color="${mid}"/>
        <stop offset="100%" stop-color="${bottom}"/>
      </linearGradient>
      <radialGradient id="glow" cx="50%" cy="30%" r="55%">
        <stop offset="0%" stop-color="${accentA}" stop-opacity=".32"/>
        <stop offset="100%" stop-color="${accentA}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="1920" height="1080" fill="url(#bg)"/>
    <rect width="1920" height="1080" fill="url(#glow)"/>
    ${cfg.motifs.includes('stars') ? stars : ''}
    ${motif}
    <rect width="1920" height="1080" fill="rgba(0,0,0,.18)"/>
    <text x="90" y="980" font-size="34" letter-spacing="6" fill="#f0c878" opacity=".55">${esc(cfg.title)}</text>
  </svg>`;
}

function face(expression) {
  const mouth = {
    neutral: '<path d="M376 524Q416 538 456 524" stroke="#3b2730" stroke-width="10" stroke-linecap="round" fill="none"/>',
    smile: '<path d="M360 512Q416 574 472 512" stroke="#3b2730" stroke-width="12" stroke-linecap="round" fill="none"/>',
    sad: '<path d="M364 552Q416 500 468 552" stroke="#3b2730" stroke-width="11" stroke-linecap="round" fill="none"/>',
    surprised: '<ellipse cx="416" cy="535" rx="28" ry="38" fill="#3b2730" opacity=".78"/>',
    serious: '<path d="M365 530H467" stroke="#3b2730" stroke-width="11" stroke-linecap="round"/>',
    gentle: '<path d="M360 516Q416 562 472 516" stroke="#3b2730" stroke-width="11" stroke-linecap="round" fill="none"/>',
  }[expression];
  const brows =
    expression === 'serious'
      ? '<path d="M285 388L358 372M474 372L547 388" stroke="#2b1f27" stroke-width="13" stroke-linecap="round"/>'
      : expression === 'sad'
        ? '<path d="M292 382Q326 360 360 392M472 392Q506 360 540 382" stroke="#2b1f27" stroke-width="12" stroke-linecap="round" fill="none"/>'
        : '<path d="M294 380Q326 362 358 378M474 378Q506 362 538 380" stroke="#2b1f27" stroke-width="12" stroke-linecap="round" fill="none"/>';
  return `${brows}
    <ellipse cx="326" cy="435" rx="${expression === 'surprised' ? 26 : 30}" ry="${expression === 'serious' ? 20 : 32}" fill="#211923"/>
    <ellipse cx="506" cy="435" rx="${expression === 'surprised' ? 26 : 30}" ry="${expression === 'serious' ? 20 : 32}" fill="#211923"/>
    <circle cx="337" cy="424" r="8" fill="#fff" opacity=".9"/><circle cx="517" cy="424" r="8" fill="#fff" opacity=".9"/>
    <ellipse cx="260" cy="505" rx="46" ry="20" fill="#ff8fa1" opacity="${expression === 'gentle' || expression === 'smile' ? '.28' : '.15'}"/>
    <ellipse cx="572" cy="505" rx="46" ry="20" fill="#ff8fa1" opacity="${expression === 'gentle' || expression === 'smile' ? '.28' : '.15'}"/>
    ${mouth}`;
}

function spriteSvg(id, cfg, expression) {
  const hood = cfg.accessory === 'hood' ? `<path d="M168 385Q416 80 664 385L626 515Q416 255 206 515Z" fill="${cfg.cloth}" opacity=".88"/>` : '';
  const accessory =
    cfg.accessory === 'glasses'
      ? '<g fill="none" stroke="#2a2630" stroke-width="9"><rect x="270" y="407" width="112" height="68" rx="24"/><rect x="450" y="407" width="112" height="68" rx="24"/><path d="M382 442H450"/></g>'
      : cfg.accessory === 'camera'
        ? '<rect x="333" y="710" width="166" height="110" rx="18" fill="#222633"/><circle cx="416" cy="765" r="34" fill="#51607b"/><path d="M318 690Q416 650 514 690" stroke="#222633" stroke-width="12" fill="none"/>'
        : cfg.accessory === 'apron'
          ? '<path d="M300 660H532L510 1110H322Z" fill="#f4ead8" opacity=".82"/><path d="M350 805H482" stroke="#b58f65" stroke-width="10" stroke-linecap="round"/>'
          : cfg.accessory === 'sport'
            ? '<path d="M286 670L546 670" stroke="#eff8e7" stroke-width="18"/><path d="M300 730L532 730" stroke="#eff8e7" stroke-width="8" opacity=".7"/>'
            : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="832" height="1200" viewBox="0 0 832 1200">
    <defs>
      <linearGradient id="cloth" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${cfg.cloth}"/>
        <stop offset="100%" stop-color="${cfg.accent}"/>
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="22" stdDeviation="24" flood-opacity=".28"/></filter>
    </defs>
    <g filter="url(#shadow)">
      <ellipse cx="416" cy="1160" rx="210" ry="34" fill="#000" opacity=".16"/>
      <path d="M220 665Q416 560 612 665L670 1170H162Z" fill="url(#cloth)"/>
      <path d="M265 660Q416 610 567 660L540 1170H292Z" fill="#fff" opacity=".10"/>
      ${hood}
      <ellipse cx="416" cy="430" rx="166" ry="196" fill="${cfg.skin}"/>
      <path d="M210 420Q250 120 416 142Q594 118 630 420Q550 255 416 270Q282 255 210 420Z" fill="${cfg.hair}"/>
      <path d="M230 392Q160 610 208 810L282 750Q240 570 288 390Z" fill="${cfg.hair}"/>
      <path d="M602 392Q672 610 624 810L550 750Q592 570 544 390Z" fill="${cfg.hair}"/>
      <path d="M285 306Q370 245 548 308" stroke="#fff" stroke-opacity=".24" stroke-width="22" stroke-linecap="round" fill="none"/>
      ${face(expression)}
      ${accessory}
    </g>
    <text x="416" y="1160" text-anchor="middle" font-size="36" letter-spacing="10" fill="#ffffff" opacity=".24">${esc(cfg.name)}</text>
  </svg>`;
}

async function renderSvg(svg, file, options = {}) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await sharp(Buffer.from(svg)).webp({ quality: options.quality ?? 82, effort: 5 }).toFile(file);
}

async function main() {
  await fs.rm(out, { recursive: true, force: true });
  await fs.mkdir(out, { recursive: true });

  for (const [id, cfg] of Object.entries(backgrounds)) {
    await renderSvg(backgroundSvg(id, cfg), path.join(out, 'backgrounds', `${id}.webp`), { quality: 84 });
  }

  for (const [id, cfg] of Object.entries(characters)) {
    for (const expression of expressions) {
      await renderSvg(spriteSvg(id, cfg, expression), path.join(out, 'sprites', id, `${expression}.webp`), { quality: 88 });
    }
  }

  await renderSvg(backgroundSvg('title_sky', backgrounds.title_sky), path.join(out, 'ui', 'keyvisual.webp'), { quality: 88 });
  await fs.mkdir(path.join(out, 'bgm'), { recursive: true });
  await fs.mkdir(path.join(out, 'se'), { recursive: true });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
