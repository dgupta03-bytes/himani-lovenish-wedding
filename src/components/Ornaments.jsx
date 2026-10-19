/* Hand-drawn SVG motifs inspired by traditional Indian wedding cards. */

/** Lord Ganesha (public/images/ganesh.webp, background removed from Ganesh.jpeg). */
export function Ganesha({ className = '', title = 'Lord Ganesha' }) {
  return <img src="/images/ganesh.webp" alt={title} width="360" height="484" className={`object-contain ${className}`} />
}

export function Kalash({ className = '', title = 'Kalash' }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label={title} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {/* mango leaves */}
      <path d="M50 33 C40 27 31 26 22 31 C31 34 41 35 50 33 Z" fill="currentColor" fillOpacity="0.15" />
      <path d="M50 33 C42 22 34 18 26 19 C32 26 41 31 50 33 Z" fill="currentColor" fillOpacity="0.1" />
      <path d="M50 33 C60 27 69 26 78 31 C69 34 59 35 50 33 Z" fill="currentColor" fillOpacity="0.15" />
      <path d="M50 33 C58 22 66 18 74 19 C68 26 59 31 50 33 Z" fill="currentColor" fillOpacity="0.1" />
      {/* coconut */}
      <path d="M50 8 C43 10 40 18 42 26 C44 31 56 31 58 26 C60 18 57 10 50 8 Z" fill="currentColor" fillOpacity="0.2" />
      <path d="M50 8 V4" />
      {/* neck + rim */}
      <path d="M40 34 H60 M42 34 V40 M58 34 V40 M38 40 H62" />
      {/* pot */}
      <path d="M42 40 C25 46 22 70 36 82 H64 C78 70 75 46 58 40" fill="currentColor" fillOpacity="0.08" />
      <path d="M28 56 Q50 63 72 56 M29 66 Q50 73 71 66" opacity="0.7" />
      {/* small swastik on pot */}
      <g transform="translate(44.5 54) scale(0.46)" strokeWidth="2.6">
        <path d="M12 4 V20 M4 12 H20 M12 4 H19 M20 12 V19 M12 20 H5 M4 12 V5" />
      </g>
      {/* base */}
      <path d="M38 82 H62 L58 90 H42 Z" fill="currentColor" fillOpacity="0.15" />
      <path d="M34 93 H66" />
    </svg>
  )
}

export function Swastik({ className = '', title = 'Shubh' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} role="img" aria-label={title} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M12 4 V20 M4 12 H20 M12 4 H19 M20 12 V19 M12 20 H5 M4 12 V5" />
      <g fill="currentColor" stroke="none">
        <circle cx="16" cy="8" r="1.2" />
        <circle cx="16" cy="16" r="1.2" />
        <circle cx="8" cy="16" r="1.2" />
        <circle cx="8" cy="8" r="1.2" />
      </g>
    </svg>
  )
}

export function Mandala({ className = '', petals = 16, strokeWidth = 0.35 }) {
  const ring = (count, r, rx, ry) =>
    Array.from({ length: count }, (_, i) => (
      <ellipse key={`${r}-${rx}-${i}`} cx="0" cy={-r} rx={rx} ry={ry} transform={`rotate(${(360 / count) * i})`} />
    ))
  const dots = (count, r, size) =>
    Array.from({ length: count }, (_, i) => {
      const a = ((Math.PI * 2) / count) * i
      return <circle key={`d${r}-${i}`} cx={Math.sin(a) * r} cy={-Math.cos(a) * r} r={size} fill="currentColor" stroke="none" />
    })
  return (
    <svg viewBox="-50 -50 100 100" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={strokeWidth}>
      <circle r="49" />
      <circle r="47.5" strokeDasharray="0.6 1.4" />
      {dots(petals * 2, 45.5, 0.45)}
      {ring(petals, 36, 4.2, 8.5)}
      {ring(petals, 36, 2, 5)}
      <circle r="27" />
      {ring(petals / 2, 19, 3.2, 5.5)}
      {Array.from({ length: petals / 2 }, (_, i) => (
        <path key={`p${i}`} d="M0 -26 C5 -20 5 -14 0 -10 C-5 -14 -5 -20 0 -26 Z" transform={`rotate(${(360 / (petals / 2)) * i + 360 / petals})`} />
      ))}
      <circle r="10" />
      {ring(8, 6, 1.8, 3.4)}
      <circle r="2.2" fill="currentColor" fillOpacity="0.4" />
    </svg>
  )
}

export function CornerOrnament({ className = '' }) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
      <path d="M4 76 V20 C4 10 10 4 20 4 H76" />
      <path d="M10 76 V24 C10 15 15 10 24 10 H76" opacity="0.5" />
      {/* paisley */}
      <path d="M22 22 C30 14 44 18 42 30 C40 40 26 40 24 32 C23 27 28 24 32 27" fill="currentColor" fillOpacity="0.1" />
      <circle cx="33" cy="29" r="1.4" fill="currentColor" />
      {/* vines */}
      <path d="M42 22 C52 18 58 22 66 18" />
      <path d="M22 42 C18 52 22 58 18 66" />
      <path d="M54 20 C56 15 60 14 62 15 C61 18 58 20 54 20 Z M20 54 C15 56 14 60 15 62 C18 61 20 58 20 54 Z" fill="currentColor" fillOpacity="0.25" />
      <circle cx="70" cy="17" r="1.6" fill="currentColor" />
      <circle cx="17" cy="70" r="1.6" fill="currentColor" />
    </svg>
  )
}

/** Four corner ornaments framing a parent with `position: relative`. */
export function Corners({ className = 'w-12 h-12 sm:w-16 sm:h-16 text-gold', inset = 'inset-2 sm:inset-3' }) {
  return (
    <div className={`pointer-events-none absolute ${inset}`} aria-hidden="true">
      <CornerOrnament className={`absolute left-0 top-0 ${className}`} />
      <CornerOrnament className={`absolute right-0 top-0 -scale-x-100 ${className}`} />
      <CornerOrnament className={`absolute left-0 bottom-0 -scale-y-100 ${className}`} />
      <CornerOrnament className={`absolute right-0 bottom-0 -scale-100 ${className}`} />
    </div>
  )
}

export function Marigold({ className = '', color = '#E98A2C', center = '#F2C14E' }) {
  const layer = (count, r, rx, ry, fill, offset = 0) =>
    Array.from({ length: count }, (_, i) => (
      <ellipse key={`${r}-${i}`} cx="0" cy={-r} rx={rx} ry={ry} fill={fill} transform={`rotate(${(360 / count) * i + offset})`} />
    ))
  return (
    <svg viewBox="-20 -20 40 40" className={className} aria-hidden="true">
      {layer(14, 12, 4.5, 6.5, color)}
      {layer(12, 8, 4, 5.5, center, 15)}
      {layer(9, 4.5, 3, 4, color, 5)}
      <circle r="2.6" fill="#B85C1E" />
    </svg>
  )
}

export function Lotus({ className = '' }) {
  return (
    <svg viewBox="0 0 48 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round">
      <path d="M24 3 C29 9 29 16 24 21 C19 16 19 9 24 3 Z" fill="currentColor" fillOpacity="0.15" />
      <path d="M24 21 C18 19 13 14 12 7 C17 9 21 13 24 21 Z" />
      <path d="M24 21 C30 19 35 14 36 7 C31 9 27 13 24 21 Z" />
      <path d="M24 21 C16 21 8 18 4 13 C11 13 18 16 24 21 Z" opacity="0.7" />
      <path d="M24 21 C32 21 40 18 44 13 C37 13 30 16 24 21 Z" opacity="0.7" />
    </svg>
  )
}

/** Gold line + lotus divider */
export function Divider({ className = '', tone = 'text-gold' }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${tone} ${className}`} aria-hidden="true">
      <span className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-current opacity-70" />
      <span className="h-1.5 w-1.5 rotate-45 bg-current opacity-70" />
      <Lotus className="h-5 w-10" />
      <span className="h-1.5 w-1.5 rotate-45 bg-current opacity-70" />
      <span className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-current opacity-70" />
    </div>
  )
}

/** Simplified Jaipur palace skyline with chhatris */
export function PalaceSilhouette({ className = '' }) {
  return (
    <svg viewBox="0 0 600 120" preserveAspectRatio="xMidYMax slice" className={className} aria-hidden="true" fill="currentColor">
      <path d="
        M0 120 V96 H24 V84 H30 Q36 72 42 84 H48 V96 H70 V78 H78 V70 Q88 54 98 70 V78 H106 V96
        H130 V64 H138 V56 Q150 36 162 56 V64 H170 V96 H186 V86 H192 Q198 76 204 86 H210 V96
        H226 V52 H234 V44 H240 Q252 22 264 44 H270 Q300 6 330 44 H336 Q348 22 360 44 H366 V52 H374 V96
        H390 V86 H396 Q402 76 408 86 H414 V96 H430 V64 H438 V56 Q450 36 462 56 V64 H470 V96
        H494 V78 H502 V70 Q512 54 522 70 V78 H530 V96 H552 V84 H558 Q564 72 570 84 H576 V96 H600 V120 Z" />
      <path d="M300 4 V-6 M150 36 V30 M450 36 V30 M252 22 V16 M348 22 V16" stroke="currentColor" strokeWidth="2" />
      {/* jharokha windows */}
      <g fill="var(--window, rgba(255,240,200,0.55))">
        {[246, 282, 300, 318, 354].map((x) => (
          <path key={x} d={`M${x - 5} 92 V76 Q${x} 66 ${x + 5} 76 V92 Z`} />
        ))}
        {[142, 458].map((x) => (
          <path key={x} d={`M${x} 92 V78 Q${x + 8} 68 ${x + 16} 78 V92 Z`} />
        ))}
      </g>
    </svg>
  )
}

/** Pointed jharokha arch outline, stretches to its container */
export function ArchFrame({ className = '' }) {
  return (
    <svg viewBox="0 0 200 300" preserveAspectRatio="none" className={className} aria-hidden="true" fill="none" stroke="currentColor" vectorEffect="non-scaling-stroke">
      <path d="M8 300 V120 C8 60 50 26 100 8 C150 26 192 60 192 120 V300" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
      <path d="M18 300 V124 C18 70 56 38 100 22 C144 38 182 70 182 124 V300" strokeWidth="0.6" opacity="0.6" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}
