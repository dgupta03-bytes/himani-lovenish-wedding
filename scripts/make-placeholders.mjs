// Generates cartoon placeholder art (and the venue illustration) in /public/images.
// Replace these files (or the paths in src/data/weddingData.js) with real photos.
import { writeFileSync, mkdirSync } from 'node:fs'
import { brideSVG, coupleSVG, groomSVG } from '../src/lib/cartoon.js'

const out = new URL('../public/images/', import.meta.url)
mkdirSync(out, { recursive: true })

// ── Cartoon scenes for the story and gallery ─────────────────────────
const THEMES = {
  sunset: { sky: ['#f9c9b6', '#fde4d2', '#fbf1e4'], ground: '#e9d2b6', ink: '#b8893b' },
  night: { sky: ['#1f2350', '#3b2f63', '#6b4a74'], ground: '#2a2246', ink: '#d9b970' },
  garden: { sky: ['#e3efe2', '#f3f1e3', '#fbf6ec'], ground: '#c9d8b6', ink: '#5e6b4e' },
  palace: { sky: ['#f6b38f', '#f8cfae', '#fbe6d0'], ground: '#e2b991', ink: '#9e3b5b' },
  haldi: { sky: ['#f9d66b', '#fbe7a1', '#fff6d8'], ground: '#f1c75a', ink: '#b85c1e' },
  rose: { sky: ['#f3cfd2', '#f8e1e1', '#fdf2ef'], ground: '#ecc7c4', ink: '#9e3b5b' },
}

const heart = (x, y, s, c, o = 1) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 8 C-10 0 -14 -6 -14 -11 C-14 -17 -9 -20 -5 -20 C-2 -20 0 -18 0 -15 C0 -18 2 -20 5 -20 C9 -20 14 -17 14 -11 C14 -6 10 0 0 8 Z" fill="${c}" opacity="${o}"/>`
const seeded = (n) => { let x = n; return () => ((x = (x * 9301 + 49297) % 233280) / 233280) }

function backdrop(theme, w, h, seed) {
  const t = THEMES[theme], rnd = seeded(seed)
  let s = `<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${t.sky[0]}"/><stop offset="0.6" stop-color="${t.sky[1]}"/><stop offset="1" stop-color="${t.sky[2]}"/></linearGradient></defs>`
  s += `<rect width="${w}" height="${h}" fill="url(#sky)"/>`
  if (theme === 'night') {
    for (let i = 0; i < 70; i++) s += `<circle cx="${(rnd() * w).toFixed(0)}" cy="${(rnd() * h * 0.7).toFixed(0)}" r="${(0.8 + rnd() * 1.8).toFixed(1)}" fill="#fff8e1" opacity="${(0.4 + rnd() * 0.6).toFixed(2)}"/>`
    s += `<circle cx="${w * 0.8}" cy="${h * 0.18}" r="${Math.min(w, h) * 0.07}" fill="#fff4d6"/><circle cx="${w * 0.8 + Math.min(w, h) * 0.03}" cy="${h * 0.17}" r="${Math.min(w, h) * 0.065}" fill="${t.sky[0]}"/>`
  } else {
    s += `<circle cx="${w / 2}" cy="${h * 0.5}" r="${Math.min(w, h) * 0.2}" fill="#fff6e0" opacity="0.7"/>`
    for (let i = 0; i < 4; i++) {
      const cx = rnd() * w, cy = h * (0.1 + rnd() * 0.3), cw = 60 + rnd() * 90
      s += `<rect x="${cx}" y="${cy}" width="${cw}" height="${cw * 0.22}" rx="${cw * 0.11}" fill="#fff" opacity="0.55"/>`
    }
  }
  if (theme === 'palace' || theme === 'night') {
    // Jaipur skyline of domes and chhatris
    const base = h * 0.78, fill = theme === 'night' ? '#2a1d45' : '#e48f84'
    let x = -20
    while (x < w + 20) {
      const bw = 40 + rnd() * 70, bh = h * (0.08 + rnd() * 0.16)
      s += `<rect x="${x}" y="${base - bh}" width="${bw}" height="${bh + 10}" fill="${fill}"/>`
      s += `<path d="M${x + 4} ${base - bh} Q${x + bw / 2} ${base - bh - bw * 0.75} ${x + bw - 4} ${base - bh} Z" fill="${fill}"/>`
      s += `<rect x="${x + bw / 2 - 1.5}" y="${base - bh - bw * 0.62}" width="3" height="${bw * 0.18}" fill="${fill}"/>`
      for (let k = 0; k < Math.floor(bw / 16); k++)
        s += `<path d="M${x + 8 + k * 16} ${base - bh * 0.25} v-${bh * 0.25} q4 -6 8 0 v${bh * 0.25} z" fill="${theme === 'night' ? '#ffd98a' : '#fbd7c4'}" opacity="0.8"/>`
      x += bw + 6
    }
  }
  if (theme === 'garden') {
    const ax = w / 2, aw = Math.min(w * 0.5, h * 0.55)
    s += `<path d="M${ax - aw / 2} ${h} V${h * 0.42} Q${ax - aw / 2} ${h * 0.12} ${ax} ${h * 0.1} Q${ax + aw / 2} ${h * 0.12} ${ax + aw / 2} ${h * 0.42} V${h}" fill="#fbf6ec" stroke="#d9c39a" stroke-width="8"/>`
  }
  s += `<rect y="${h * 0.86}" width="${w}" height="${h * 0.14}" fill="${t.ground}"/>`
  if (theme === 'haldi' || theme === 'palace' || theme === 'garden') {
    // marigold strings hanging from the top
    const n = Math.round(w / 90)
    for (let i = 0; i <= n; i++) {
      const sx = (i / n) * w, len = h * (0.12 + ((i * 7) % 5) * 0.03)
      for (let k = 0; k < len / 14; k++) s += `<circle cx="${sx}" cy="${8 + k * 14}" r="6.5" fill="${k % 2 ? '#F2C14E' : '#E98A2C'}"/>`
    }
  }
  return s
}

function extras(kind, w, h, seed) {
  const rnd = seeded(seed + 7), m = Math.min(w, h)
  let s = ''
  if (kind.includes('hearts'))
    for (let i = 0; i < 9; i++) s += heart(w * (0.15 + rnd() * 0.7), h * (0.08 + rnd() * 0.2), m / 500 + rnd() * (m / 600), ['#e05469', '#f29b9b', '#c0283f'][i % 3], 0.75)
  if (kind.includes('ring')) {
    const cx = w / 2, cy = h * 0.2, r = m * 0.06
    s += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#d9b970" stroke-width="${r * 0.28}"/><path d="M${cx - r * 0.45} ${cy - r * 1.1} l${r * 0.45} ${-r * 0.5} ${r * 0.45} ${r * 0.5} -${r * 0.45} ${r * 0.45}z" fill="#e8f4ff" stroke="#9fc6e0" stroke-width="2"/>`
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI * 2 * i) / 6, d = r * 2.2
      s += `<path transform="translate(${cx + Math.cos(a) * d} ${cy + Math.sin(a) * d})" d="M0 -8 L2 -2 8 0 2 2 0 8 -2 2 -8 0 -2 -2Z" fill="#F2C14E"/>`
    }
  }
  return s
}

function bubble(x, y, text, s) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-38" y="-24" width="76" height="40" rx="20" fill="#fff" stroke="#e2c9a6" stroke-width="2"/><path d="M-6 15 l6 12 6 -12z" fill="#fff"/><text y="4" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="18" fill="#7a1a2b">${text}</text></g>`
}

function scene(name, w, h, { theme, arms = 'hand', garlands = false, gap = 84, extra = '', seed = 1 }) {
  const t = THEMES[theme]
  const scale = (h * 0.62) / 290
  const cx = w / 2, gy = h * 0.92
  let figures
  if (arms === 'hand' && gap === 84) figures = coupleSVG({ arms, garlands })
  else {
    const half = gap / 2
    figures = `<ellipse rx="${half + 70}" ry="9" fill="rgba(90,60,30,0.18)"/><g transform="translate(${-half} 0)">${groomSVG({ arms, garland: garlands })}</g><g transform="translate(${half} 0)">${brideSVG({ arms, garland: garlands })}</g>`
  }
  let s = backdrop(theme, w, h, seed) + extras(extra, w, h, seed)
  s += `<g transform="translate(${cx} ${gy}) scale(${scale})">${figures}</g>`
  if (extra.includes('hello')) s += bubble(cx - (gap / 2) * scale, gy - 315 * scale, 'Hi!', scale * 0.9) + bubble(cx + (gap / 2) * scale, gy - 315 * scale, 'Hello!', scale * 0.9) + heart(cx, gy - 220 * scale, scale * 0.9, '#e05469')
  s += `<rect x="16" y="16" width="${w - 32}" height="${h - 32}" fill="none" stroke="${t.ink}" stroke-opacity="0.55" stroke-width="2"/><rect x="26" y="26" width="${w - 52}" height="${h - 52}" fill="none" stroke="${t.ink}" stroke-opacity="0.3" stroke-width="1"/>`
  writeFileSync(new URL(name, out), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${s}</svg>`)
}

// Our Story (600×450): meeting, the journey, the ring, forever
scene('story-1.svg', 600, 450, { theme: 'garden', arms: 'down', gap: 190, extra: 'hello', seed: 3 })
scene('story-2.svg', 600, 450, { theme: 'night', extra: 'hearts', seed: 5 })
scene('story-3.svg', 600, 450, { theme: 'rose', extra: 'ring', seed: 8 })
scene('story-4.svg', 600, 450, { theme: 'palace', garlands: true, extra: 'hearts', seed: 11 })

// Gallery (sizes match weddingData.gallery)
const gallery = [
  [800, 1100, { theme: 'sunset', garlands: true, extra: 'hearts' }],
  [1200, 800, { theme: 'garden', arms: 'down', gap: 120, extra: 'hearts' }],
  [800, 1000, { theme: 'haldi' }],
  [1200, 900, { theme: 'palace', garlands: true }],
  [800, 1200, { theme: 'night', extra: 'hearts' }],
  [1000, 1000, { theme: 'rose', extra: 'ring' }],
  [1200, 800, { theme: 'palace', extra: 'hearts' }],
  [800, 1100, { theme: 'sunset', arms: 'hold', gap: 100, garlands: true, extra: 'hearts' }],
]
gallery.forEach(([w, h, o], i) => scene(`gallery-${i + 1}.svg`, w, h, { ...o, seed: i * 13 + 2 }))

// Venue: dusk sky over a palace silhouette
writeFileSync(new URL('venue.svg', out), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1100" width="900" height="1100">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a1f47"/><stop offset="0.45" stop-color="#6e2a4a"/><stop offset="0.75" stop-color="#d9865a"/><stop offset="1" stop-color="#f2c98a"/></linearGradient>
    <radialGradient id="sun" cx="0.5" cy="0.7" r="0.35"><stop offset="0" stop-color="#ffe9b0" stop-opacity="0.9"/><stop offset="1" stop-color="#ffe9b0" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="900" height="1100" fill="url(#sky)"/>
  <rect width="900" height="1100" fill="url(#sun)"/>
  ${Array.from({ length: 40 }, (_, i) => `<circle cx="${(i * 137) % 900}" cy="${(i * 89) % 380}" r="${1 + (i % 3) * 0.6}" fill="#fff8e1" opacity="${0.4 + (i % 4) * 0.15}"/>`).join('')}
  <g fill="#2a0f22">
    <path d="M0 1100 V820 H60 V780 H75 Q90 750 105 780 H120 V820 H170 V740 H185 V715 Q210 670 235 715 V740 H250 V820 H300 V680 H318 V655 H330 Q360 600 390 655 H400 Q450 560 500 655 H510 Q540 600 570 655 H582 V680 H600 V820 H650 V740 H665 V715 Q690 670 715 715 V740 H730 V820 H780 V780 H795 Q810 750 825 780 H840 V820 H900 V1100 Z"/>
    <rect x="0" y="900" width="900" height="200"/>
  </g>
  <g fill="#ffd98a" opacity="0.85">
    ${[340, 380, 420, 450, 480, 520, 560].map((x) => `<path d="M${x - 8} 820 V790 Q${x} 774 ${x + 8} 790 V820 Z"/>`).join('')}
    ${[200, 700].map((x) => `<path d="M${x} 820 V796 Q${x + 10} 782 ${x + 20} 796 V820 Z"/>`).join('')}
    ${Array.from({ length: 30 }, (_, i) => `<circle cx="${15 + i * 30}" cy="${905 + (i % 2) * 6}" r="3"/>`).join('')}
  </g>
</svg>`)

console.log('placeholders written')
