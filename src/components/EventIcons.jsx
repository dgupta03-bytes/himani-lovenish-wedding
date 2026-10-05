/* Line illustrations for each function. Keys match `icon` in weddingData.events. */

const base = {
  viewBox: '0 0 64 64',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

const icons = {
  // Thaal with coconut, flowers and sweets
  godhBharai: (
    <>
      <ellipse cx="32" cy="46" rx="24" ry="6" fill="currentColor" fillOpacity="0.1" />
      <ellipse cx="32" cy="44" rx="24" ry="6" />
      <path d="M32 18 C25 20 23 28 25 34 C27 39 37 39 39 34 C41 28 39 20 32 18 Z" fill="currentColor" fillOpacity="0.15" />
      <path d="M30 22 Q32 20 34 22" />
      <circle cx="16" cy="40" r="3" /> <circle cx="48" cy="40" r="3" />
      <circle cx="16" cy="40" r="1" fill="currentColor" /> <circle cx="48" cy="40" r="1" fill="currentColor" />
      <path d="M21 41 Q24 38 27 41 M37 41 Q40 38 43 41" />
      <path d="M32 12 V8 M24 14 L22 11 M40 14 L42 11" opacity="0.6" />
    </>
  ),
  // Diya with tilak flame
  tika: (
    <>
      <path d="M32 34 C26 26 29 18 32 10 C35 18 38 26 32 34 Z" fill="currentColor" fillOpacity="0.2" />
      <path d="M32 30 C30 27 31 24 32 21 C33 24 34 27 32 30 Z" fill="currentColor" />
      <path d="M12 38 H52 C50 48 42 54 32 54 C22 54 14 48 12 38 Z" fill="currentColor" fillOpacity="0.1" />
      <path d="M12 38 C20 42 44 42 52 38" />
      <path d="M22 46 Q32 50 42 46" opacity="0.6" />
      <path d="M8 58 H56" opacity="0.5" />
      <path d="M18 18 L15 15 M46 18 L49 15 M32 4 V2" opacity="0.6" />
    </>
  ),
  // Interlocked rings with a music note
  sangeet: (
    <>
      <circle cx="25" cy="38" r="12" />
      <circle cx="39" cy="38" r="12" />
      <path d="M36 26 L39 21 L42 26 L39 29 Z" fill="currentColor" fillOpacity="0.4" />
      <path d="M50 8 V20" />
      <path d="M50 8 L57 10 V14 L50 12" fill="currentColor" fillOpacity="0.3" />
      <ellipse cx="47.5" cy="20.5" rx="3" ry="2.2" fill="currentColor" />
      <path d="M10 14 Q12 10 14 14 T18 14" opacity="0.6" />
    </>
  ),
  // Thali with katoris
  dinner: (
    <>
      <circle cx="32" cy="34" r="22" fill="currentColor" fillOpacity="0.06" />
      <circle cx="32" cy="34" r="22" />
      <circle cx="32" cy="34" r="19" opacity="0.4" />
      <circle cx="23" cy="26" r="5" /> <circle cx="37" cy="23" r="5" /> <circle cx="44" cy="34" r="5" />
      <path d="M20 38 C24 46 34 47 38 43" />
      <circle cx="28" cy="38" r="2" fill="currentColor" fillOpacity="0.4" />
      <path d="M59 14 V54 M5 14 V30 C5 34 9 34 9 30 V14 M7 34 V54" opacity="0.6" />
    </>
  ),
  // Bowl of haldi with marigold
  haldi: (
    <>
      <path d="M8 34 H56 C54 46 44 54 32 54 C20 54 10 46 8 34 Z" fill="currentColor" fillOpacity="0.1" />
      <path d="M14 34 C18 26 26 24 32 26 C38 24 46 26 50 34" fill="currentColor" fillOpacity="0.25" />
      <path d="M20 44 Q32 49 44 44" opacity="0.6" />
      <g transform="translate(46 16)">
        {Array.from({ length: 8 }, (_, i) => (
          <ellipse key={i} cx="0" cy="-5" rx="2.6" ry="4" transform={`rotate(${i * 45})`} fill="currentColor" fillOpacity="0.15" />
        ))}
        <circle r="2.4" fill="currentColor" />
      </g>
      <path d="M16 22 C14 18 16 14 20 14" opacity="0.6" />
      <path d="M10 58 H54" opacity="0.5" />
    </>
  ),
  // Dhol drum for the barat
  barat: (
    <>
      <ellipse cx="14" cy="34" rx="6" ry="14" />
      <ellipse cx="50" cy="34" rx="6" ry="14" fill="currentColor" fillOpacity="0.1" />
      <path d="M14 20 H50 M14 48 H50" />
      <path d="M14 20 L22 48 L30 20 L38 48 L46 20 L50 26" opacity="0.7" />
      <path d="M8 14 L20 4 M56 14 L44 4" />
      <circle cx="20" cy="4" r="1.5" fill="currentColor" /> <circle cx="44" cy="4" r="1.5" fill="currentColor" />
      <path d="M6 56 Q32 62 58 56" opacity="0.5" />
    </>
  ),
  // Garland
  varmala: (
    <>
      <path d="M12 8 C10 34 20 52 32 56 C44 52 54 34 52 8" strokeDasharray="0.1 5.2" strokeWidth="4.5" />
      <path d="M12 8 C10 34 20 52 32 56 C44 52 54 34 52 8" opacity="0.4" />
      <circle cx="32" cy="56" r="4" fill="currentColor" fillOpacity="0.35" />
      <path d="M32 60 V63" />
      <path d="M26 24 C26 20 32 19 32 24 C32 19 38 20 38 24 C38 28 32 32 32 32 C32 32 26 28 26 24 Z" fill="currentColor" fillOpacity="0.25" />
    </>
  ),
  // Palanquin
  doli: (
    <>
      <path d="M4 34 H60" strokeWidth="2.2" />
      <path d="M18 26 C20 14 26 10 32 8 C38 10 44 14 46 26 Z" fill="currentColor" fillOpacity="0.15" />
      <path d="M32 8 V4" /> <circle cx="32" cy="3" r="1.2" fill="currentColor" />
      <path d="M18 26 H46 V48 H18 Z" />
      <path d="M22 30 Q26 38 22 46 M42 30 Q38 38 42 46" opacity="0.7" />
      <path d="M26 30 V46 M38 30 V46" opacity="0.3" />
      <path d="M16 48 H48 M22 48 V54 M42 48 V54" />
      <path d="M52 12 L53 15 L56 15 L53.5 17 L54.5 20 L52 18 L49.5 20 L50.5 17 L48 15 L51 15 Z" fill="currentColor" fillOpacity="0.4" />
    </>
  ),
}

export default function EventIcon({ name, className = 'w-14 h-14' }) {
  return (
    <svg {...base} className={className}>
      {icons[name] ?? icons.tika}
    </svg>
  )
}
