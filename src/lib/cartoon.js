/*
 * Cartoon bride & groom as SVG markup strings.
 * Used by the opening courtyard scene (src/components/Courtyard.jsx) and by
 * scripts/make-placeholders.mjs for the story/gallery placeholder art.
 * Each figure is drawn with its feet at (0, 0), about 290 units tall.
 */

const SKIN = '#EDBB96'
const INK = '#3a2416'
const SLEEVE = '#f3e0b8'

const eyes = (y, lashes) =>
  `<g fill="none" stroke="${INK}" stroke-width="2.4" stroke-linecap="round">` +
  `<path d="M-14 ${y} q4 -5 8 0"/><path d="M6 ${y} q4 -5 8 0"/>` +
  (lashes ? `<path d="M-14 ${y} l-3 -2" stroke-width="1.6"/><path d="M14 ${y} l3 -2" stroke-width="1.6"/>` : '') +
  `</g>`

/** Marigold-and-rose varmala, shaped to sit around a neck at x = 0. */
export function garlandSVG() {
  let s = ''
  for (let i = 0; i < 15; i++) {
    const t = i / 14
    const x = (1 - t) ** 2 * -18 + t ** 2 * 18
    const y = (1 - t) ** 2 * -174 + 2 * (1 - t) * t * -96 + t ** 2 * -174
    s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4.4" fill="${['#E98A2C', '#F2C14E', '#c0283f'][i % 3]}"/>`
  }
  return s + '<path d="M-3 -133 l3 12 3 -12z" fill="#d9b970"/>'
}

const GROOM_ARMS = {
  // both hands together in front (holding a garland)
  hold: `<path d="M-28 -154 Q-42 -124 -20 -114 M28 -154 Q42 -124 20 -114" fill="none" stroke="${SLEEVE}" stroke-width="15" stroke-linecap="round"/><circle cx="-18" cy="-114" r="7" fill="${SKIN}"/><circle cx="18" cy="-114" r="7" fill="${SKIN}"/>`,
  // left arm down, right arm reaching to the bride's hand
  hand: `<path d="M-28 -154 Q-42 -110 -34 -74 M26 -152 Q40 -120 44 -104" fill="none" stroke="${SLEEVE}" stroke-width="15" stroke-linecap="round"/><circle cx="-34" cy="-70" r="7" fill="${SKIN}"/><circle cx="46" cy="-100" r="7" fill="${SKIN}"/>`,
  // both arms down
  down: `<path d="M-28 -154 Q-42 -110 -34 -74 M28 -154 Q42 -110 34 -74" fill="none" stroke="${SLEEVE}" stroke-width="15" stroke-linecap="round"/><circle cx="-34" cy="-70" r="7" fill="${SKIN}"/><circle cx="34" cy="-70" r="7" fill="${SKIN}"/>`,
}

export function groomSVG({ arms = 'hand', garland = false } = {}) {
  return `
  <g class="ct-leg ct-leg-a"><rect x="-16" y="-60" width="13" height="56" rx="5" fill="#f6eedd"/><ellipse cx="-12" cy="-4" rx="12" ry="6" fill="#7a1a2b"/></g>
  <g class="ct-leg ct-leg-b"><rect x="3" y="-60" width="13" height="56" rx="5" fill="#f6eedd"/><ellipse cx="12" cy="-4" rx="12" ry="6" fill="#7a1a2b"/></g>
  <path d="M-30 -160 Q0 -172 30 -160 L38 -48 Q0 -38 -38 -48 Z" fill="${SLEEVE}" stroke="#c9a46a" stroke-width="1.2"/>
  <path d="M-38 -48 Q0 -38 38 -48 L36 -58 Q0 -48 -36 -58 Z" fill="#d9b970"/>
  <line x1="0" y1="-164" x2="0" y2="-44" stroke="#c9a46a" stroke-width="1.2"/>
  ${[-144, -128, -112, -96, -80].map((y) => `<circle cx="0" cy="${y}" r="2.3" fill="#b8893b"/>`).join('')}
  <path d="M-26 -160 L-12 -163 L34 -72 L20 -64 Z" fill="#8c1c2b"/>
  <rect x="-6" y="-186" width="12" height="18" fill="${SKIN}"/>
  ${garland ? garlandSVG() : ''}
  ${GROOM_ARMS[arms]}
  <circle cx="-30" cy="-206" r="6" fill="${SKIN}"/><circle cx="30" cy="-206" r="6" fill="${SKIN}"/>
  <circle cx="0" cy="-210" r="30" fill="${SKIN}"/>
  <path d="M-29 -210 Q-28 -222 -22 -226 L-22 -214 Z M29 -210 Q28 -222 22 -226 L22 -214 Z" fill="${INK}"/>
  <path d="M-33 -218 Q-36 -254 0 -258 Q36 -256 33 -218 Q18 -230 0 -230 Q-18 -230 -33 -218Z" fill="#E98A2C"/>
  <path d="M-30 -228 Q0 -246 30 -228 M-26 -240 Q0 -254 26 -238" fill="none" stroke="#c96a1a" stroke-width="2" stroke-linecap="round"/>
  <path d="M31 -228 Q46 -214 40 -178 Q36 -198 26 -214 Z" fill="#E98A2C"/>
  <path d="M0 -242 Q8 -266 18 -274 Q10 -258 5 -242 Z" fill="#fff6e0" stroke="#e6c46a" stroke-width="0.8"/>
  <circle cx="0" cy="-238" r="5" fill="#f7e7a3" stroke="#b8893b" stroke-width="1.2"/><circle cx="0" cy="-238" r="2" fill="#c0283f"/>
  ${eyes(-208)}
  <ellipse cx="-18" cy="-198" rx="6" ry="3.5" fill="#f29b9b" opacity="0.6"/><ellipse cx="18" cy="-198" rx="6" ry="3.5" fill="#f29b9b" opacity="0.6"/>
  <path d="M-8 -196 Q-4 -200 0 -197 Q4 -200 8 -196 Q4 -193 0 -195 Q-4 -193 -8 -196Z" fill="${INK}"/>
  <path d="M-5 -191 Q0 -186 5 -191" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>`
}

const bangles = (x, y) => `<circle cx="${x}" cy="${y}" r="5.5" fill="none" stroke="#c0283f" stroke-width="2.4"/><circle cx="${x}" cy="${y}" r="7.2" fill="none" stroke="#d9b970" stroke-width="1.6"/>`
const brideHand = (x, y) => `${bangles(x, y - 5)}<circle cx="${x}" cy="${y}" r="6.5" fill="${SKIN}"/>`

const BRIDE_ARMS = {
  hold: `<path d="M-16 -152 Q-32 -126 -18 -114 M16 -152 Q32 -126 18 -114" fill="none" stroke="${SKIN}" stroke-width="12" stroke-linecap="round"/>${brideHand(-16, -113)}${brideHand(16, -113)}`,
  // left arm reaching to the groom's hand, right arm down
  hand: `<path d="M-16 -152 Q-28 -122 -32 -104 M16 -152 Q30 -116 26 -84" fill="none" stroke="${SKIN}" stroke-width="12" stroke-linecap="round"/>${brideHand(-34, -100)}${brideHand(26, -80)}`,
  down: `<path d="M-16 -152 Q-30 -116 -26 -84 M16 -152 Q30 -116 26 -84" fill="none" stroke="${SKIN}" stroke-width="12" stroke-linecap="round"/>${brideHand(-26, -80)}${brideHand(26, -80)}`,
}

export function brideSVG({ arms = 'hand', garland = false } = {}) {
  const booti = [[-22, -84], [0, -94], [22, -84], [-34, -56], [-10, -64], [12, -64], [34, -56], [0, -40]]
    .map(([x, y]) => `<g transform="translate(${x} ${y})" fill="#e6c46a"><circle r="2.4"/><circle cx="-4" r="1.2"/><circle cx="4" r="1.2"/><circle cy="-4" r="1.2"/></g>`)
    .join('')
  return `
  <path d="M30 -214 Q46 -140 58 -20 L40 -14 Q28 -126 20 -182 Z" fill="#d23a52"/><path d="M58 -20 L40 -14" stroke="#e6c46a" stroke-width="3"/>
  <g class="ct-skirt">
    <path d="M-24 -114 Q0 -122 24 -114 L58 -10 Q0 8 -58 -10 Z" fill="#c0283f"/>
    <path d="M-58 -10 Q0 8 58 -10 L54 -24 Q0 -6 -54 -24 Z" fill="#d9b970"/>
    <path d="M-48 -42 Q0 -26 48 -42" fill="none" stroke="#d9b970" stroke-width="2" stroke-dasharray="1 6" stroke-linecap="round"/>
    ${booti}
  </g>
  <path d="M-18 -160 Q0 -166 18 -160 L22 -110 Q0 -104 -22 -110 Z" fill="#a51f36"/>
  <path d="M-20 -158 Q-2 -128 24 -112 L20 -104 Q-6 -118 -22 -142 Z" fill="#e05469" opacity="0.9" stroke="#e6c46a" stroke-width="1.4"/>
  <rect x="-6" y="-186" width="12" height="18" fill="${SKIN}"/>
  <path d="M-10 -170 Q0 -158 10 -170" fill="none" stroke="#d9b970" stroke-width="3"/>
  ${garland ? garlandSVG() : ''}
  ${BRIDE_ARMS[arms]}
  <circle cx="0" cy="-210" r="29" fill="${SKIN}"/>
  <path d="M-29 -206 Q-32 -240 0 -242 Q32 -240 29 -206 Q24 -226 0 -228 Q-24 -226 -29 -206Z" fill="#2b1a14"/>
  <path d="M-34 -202 Q-38 -256 0 -258 Q38 -256 34 -202 Q28 -234 0 -236 Q-28 -234 -34 -202Z" fill="#d23a52" stroke="#e6c46a" stroke-width="3"/>
  <line x1="0" y1="-236" x2="0" y2="-226" stroke="#d9b970" stroke-width="1.6"/>
  <circle cx="0" cy="-224" r="3.6" fill="#d9b970" stroke="#b8893b" stroke-width="0.8"/><circle cx="0" cy="-216" r="2" fill="#c0283f"/>
  ${eyes(-207, true)}
  <ellipse cx="-17" cy="-197" rx="6" ry="3.5" fill="#f29b9b" opacity="0.7"/><ellipse cx="17" cy="-197" rx="6" ry="3.5" fill="#f29b9b" opacity="0.7"/>
  <circle cx="6" cy="-198" r="3.4" fill="none" stroke="#d9b970" stroke-width="1.3"/>
  <path d="M-6 -191 Q0 -185 6 -191" fill="none" stroke="#b02a3e" stroke-width="2.2" stroke-linecap="round"/>
  ${[-28, 28].map((x) => `<line x1="${x}" y1="-202" x2="${x}" y2="-196" stroke="#d9b970" stroke-width="1.4"/><path d="M${x - 4} -190 Q${x} -200 ${x + 4} -190 Z" fill="#d9b970"/>`).join('')}`
}

/** Groom on the left, bride on the right, holding hands (gap = distance between them). */
export function coupleSVG({ arms = 'hand', garlands = true, gap = 84 } = {}) {
  const h = gap / 2
  return (
    `<ellipse cx="0" cy="0" rx="${h + 70}" ry="9" fill="rgba(90,60,30,0.18)"/>` +
    `<g transform="translate(${-h} 0)">${groomSVG({ arms, garland: garlands })}</g>` +
    `<g transform="translate(${h} 0)">${brideSVG({ arms, garland: garlands })}</g>` +
    (arms === 'hand' ? `<circle cx="${-h + 48}" cy="-101" r="8" fill="${SKIN}"/>` : '')
  )
}
