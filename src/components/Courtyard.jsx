import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { brideSVG, garlandSVG, groomSVG } from '../lib/cartoon'
import weddingData from '../data/weddingData'

/*
 * The scene behind the curtains: a garden courtyard with a fountain,
 * cypress trees, rose urns and a cartoon bride & groom. When
 * weddingData.introCartoon is set, the scene turns soft blush watercolour
 * and that illustration of the couple replaces the drawn figures.
 * `show` turns true when the curtains start parting; `delay` (s) is when
 * the scene's own animations should begin.
 */

const INK = '#3a2416'

/* ── Small pieces ────────────────────────────────────────────────────── */
function Rose({ x, y, r = 8, c = '#f4c1bb', d = '#d98b88' }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} fill={c} />
      <path
        d={`M${-r * 0.45} ${r * 0.1} a${r * 0.45} ${r * 0.45} 0 1 1 ${r * 0.45} ${r * 0.45} a${r * 0.7} ${r * 0.7} 0 1 1 ${-r * 0.75} ${-r * 0.8}`}
        fill="none"
        stroke={d}
        strokeWidth={r * 0.14}
        strokeLinecap="round"
      />
    </g>
  )
}

function Leaf({ x, y, a, s = 1, c = '#7d9a6a' }) {
  return <ellipse cx={x} cy={y} rx={9 * s} ry={4.2 * s} fill={c} transform={`rotate(${a} ${x} ${y})`} />
}

const ROSE_COLORS = [
  ['#f4c1bb', '#d98b88'],
  ['#f8ddd2', '#e0a998'],
  ['#ffffff', '#e6cfc4'],
  ['#efa7a6', '#c86f74'],
]

function RoseCluster({ cx, cy, w = 60 }) {
  const roses = [
    [-0.42, 0.1, 0.9], [-0.15, -0.18, 1.1], [0.18, -0.08, 1], [0.45, 0.14, 0.85], [0, 0.2, 0.95], [-0.3, 0.32, 0.75], [0.3, 0.34, 0.8],
  ]
  const leaves = [
    [-0.55, 0.3, -30], [-0.5, -0.05, 20], [-0.25, 0.45, 50], [0.05, -0.32, -10], [0.32, -0.28, 30], [0.55, 0.0, -20], [0.5, 0.36, 40], [0.12, 0.48, -50],
  ]
  return (
    <g>
      {leaves.map(([x, y, a], i) => (
        <Leaf key={i} x={cx + x * w} y={cy + y * w} a={a} s={w / 50} c={i % 2 ? '#7d9a6a' : '#5f7d52'} />
      ))}
      {roses.map(([x, y, s], i) => {
        const [c, d] = ROSE_COLORS[i % ROSE_COLORS.length]
        return <Rose key={i} x={cx + x * w} y={cy + y * w} r={(w / 6.5) * s} c={c} d={d} />
      })}
    </g>
  )
}

/* ── Fountain ────────────────────────────────────────────────────────── */
function Fountain({ className }) {
  const jet = { strokeDasharray: '7 5', animate: { strokeDashoffset: [0, -24] }, transition: { duration: 1.1, repeat: Infinity, ease: 'linear' } }
  return (
    <svg viewBox="0 0 320 180" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="ct-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#bfe0e6" />
          <stop offset="1" stopColor="#8fbcc6" />
        </linearGradient>
        <linearGradient id="ct-stone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6efe4" />
          <stop offset="1" stopColor="#ddd0bc" />
        </linearGradient>
      </defs>
      {/* basin back rim + water */}
      <ellipse cx="160" cy="126" rx="150" ry="28" fill="#e9dfd0" stroke="#c9b89e" />
      <ellipse cx="160" cy="128" rx="134" ry="20" fill="url(#ct-water)" />
      {[0, 1].map((i) => (
        <motion.ellipse
          key={i}
          cx="160"
          cy="130"
          rx="40"
          ry="6"
          fill="none"
          stroke="#e8f6f8"
          strokeWidth="1.4"
          animate={{ scale: [0.6, 2.6], opacity: [0.9, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 1.5, ease: 'easeOut' }}
          style={{ transformOrigin: '160px 130px' }}
        />
      ))}
      {/* column, bowl and finial */}
      <ellipse cx="160" cy="128" rx="22" ry="6" fill="#ddd0bc" />
      <rect x="150" y="70" width="20" height="58" fill="url(#ct-stone)" stroke="#c9b89e" strokeWidth="0.8" />
      <path d="M116 70 Q160 96 204 70 Z" fill="url(#ct-stone)" stroke="#c9b89e" strokeWidth="0.8" />
      <ellipse cx="160" cy="70" rx="44" ry="7" fill="#d6ecf0" stroke="#c9b89e" strokeWidth="0.8" />
      <rect x="156" y="42" width="8" height="28" fill="url(#ct-stone)" stroke="#c9b89e" strokeWidth="0.6" />
      <circle cx="160" cy="38" r="6" fill="url(#ct-stone)" stroke="#c9b89e" strokeWidth="0.6" />
      {/* water jets */}
      <g fill="none" stroke="#d7eef2" strokeWidth="2.4" strokeLinecap="round">
        <motion.path d="M160 32 Q138 14 120 68" {...jet} />
        <motion.path d="M160 32 Q182 14 200 68" {...jet} />
        <motion.path d="M116 72 Q100 82 96 122" {...jet} />
        <motion.path d="M204 72 Q220 82 224 122" {...jet} />
      </g>
      {/* basin front wall */}
      <path d="M10 126 Q160 182 310 126 L304 158 Q160 212 16 158 Z" fill="url(#ct-stone)" stroke="#c9b89e" />
      <path d="M10 126 Q160 182 310 126" fill="none" stroke="#fffaf2" strokeWidth="2" />
      <path d="M22 146 Q160 196 298 146" fill="none" stroke="#d8c8b0" strokeWidth="1" />
    </svg>
  )
}

/* ── Cypress tree with a rose urn on a pedestal ──────────────────────── */
function CypressUrn({ className, flip }) {
  return (
    <svg viewBox="0 0 140 320" className={className} style={flip ? { transform: 'scaleX(-1)' } : undefined} aria-hidden="true">
      <path d="M70 6 C92 60 104 150 100 250 L40 250 C36 150 48 60 70 6Z" fill="#4f6b45" />
      <path d="M70 6 C92 60 104 150 100 250 L72 250 C76 160 76 70 70 6Z" fill="#3e5737" />
      {Array.from({ length: 9 }, (_, i) => (
        <path key={i} d={`M${52 + (i % 3) * 12} ${50 + i * 22} q6 -6 12 0`} fill="none" stroke="#6d8a5e" strokeWidth="1.4" strokeLinecap="round" />
      ))}
      {/* pedestal */}
      <rect x="34" y="254" width="72" height="10" rx="2" fill="#f2e9dc" stroke="#cdbca4" />
      <rect x="40" y="264" width="60" height="50" fill="#ece2d3" stroke="#cdbca4" />
      <rect x="48" y="272" width="44" height="34" fill="none" stroke="#d8c9b2" />
      {/* urn */}
      <path d="M46 222 Q44 250 60 254 L80 254 Q96 250 94 222 Z" fill="#e9dccb" stroke="#c8b69c" />
      <ellipse cx="70" cy="222" rx="27" ry="5" fill="#f4ece0" stroke="#c8b69c" />
      <RoseCluster cx={70} cy={204} w={44} />
    </svg>
  )
}

function RoseBush({ className, flip }) {
  return (
    <svg viewBox="0 0 220 120" className={className} style={flip ? { transform: 'scaleX(-1)' } : undefined} aria-hidden="true">
      <ellipse cx="100" cy="120" rx="120" ry="60" fill="#5f7d52" />
      <RoseCluster cx={60} cy={70} w={70} />
      <RoseCluster cx={140} cy={88} w={56} />
      <RoseCluster cx={200} cy={104} w={40} />
    </svg>
  )
}

/* ── Cartoon couple: walk in from opposite sides, exchange varmalas ─── */
// Phases: wait → walk (each carries a garland) → swap (garlands fly onto each other) → together (holding hands)
const WALK = 3.2 // s

function CoupleWalk({ show, delay, className }) {
  const [phase, setPhase] = useState('wait')
  // how far off-screen (in SVG units) each of them starts
  const [off] = useState(() => {
    if (typeof window === 'undefined') return 400
    const px = Math.min(window.innerHeight * 0.42, window.innerWidth) / 340
    return window.innerWidth / 2 / px + 90
  })

  useEffect(() => {
    if (!show) return
    const ms = delay * 1000
    const t = [setTimeout(() => setPhase('walk'), ms), setTimeout(() => setPhase('swap'), ms + WALK * 1000 + 300), setTimeout(() => setPhase('together'), ms + WALK * 1000 + 1800)]
    return () => t.forEach(clearTimeout)
  }, [show, delay])

  const arrived = phase !== 'wait'
  const walking = phase === 'walk'
  const arms = phase === 'together' ? 'hand' : 'hold'
  const walkTo = (x) => ({ initial: { x: x < 0 ? x - off : x + off }, animate: arrived ? { x } : {}, transition: { duration: WALK, ease: [0.3, 0.1, 0.4, 1] } })
  const bob = { animate: walking ? { y: [0, -5, 0] } : { y: 0 }, transition: walking ? { duration: 0.5, repeat: Infinity } : { duration: 0.3 } }
  // each garland: carried in front, then tossed in an arc onto the other's neck
  const garland = (from, to) => ({
    initial: { x: from < 0 ? from - off : from + off, y: 60 },
    animate: phase === 'wait' ? {} : phase === 'walk' ? { x: from, y: 60 } : { x: [from, (from + to) / 2, to], y: [60, -60, 0] },
    transition: phase === 'walk' ? { duration: WALK, ease: [0.3, 0.1, 0.4, 1] } : { duration: 1.3, ease: 'easeInOut' },
  })

  return (
    <svg viewBox="-200 -300 400 310" className={`overflow-visible ${className}`} role="img" aria-label={`Cartoon of ${weddingData.groomShort} and ${weddingData.brideShort} exchanging varmalas`}>
      <motion.ellipse cx="0" cy="0" rx="112" ry="9" fill="rgba(90,60,30,0.18)" initial={{ opacity: 0 }} animate={{ opacity: phase === 'together' || phase === 'swap' ? 1 : 0 }} />
      <motion.g {...walkTo(-42)}>
        <motion.g {...bob} className={walking ? 'ct-walking' : ''} dangerouslySetInnerHTML={{ __html: groomSVG({ arms }) }} />
      </motion.g>
      <motion.g {...walkTo(42)}>
        <motion.g {...bob} className={walking ? 'ct-walking' : ''} dangerouslySetInnerHTML={{ __html: brideSVG({ arms }) }} />
      </motion.g>
      {phase === 'together' && <motion.circle cx="6" cy="-101" r="8" fill="#EDBB96" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />}
      <motion.g {...garland(-42, 42)} dangerouslySetInnerHTML={{ __html: garlandSVG() }} />
      <motion.g {...garland(42, -42)} dangerouslySetInnerHTML={{ __html: garlandSVG() }} />
      {/* sparkle burst when the garlands land */}
      {phase === 'together' &&
        Array.from({ length: 10 }, (_, i) => {
          const a = (Math.PI * 2 * i) / 10
          return (
            <motion.circle
              key={i}
              r="3"
              fill={i % 2 ? '#F2C14E' : '#e05469'}
              initial={{ cx: 0, cy: -160, opacity: 1 }}
              animate={{ cx: Math.cos(a) * 120, cy: -160 + Math.sin(a) * 90, opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
          )
        })}
    </svg>
  )
}

/* ── Illustrated couple (weddingData.introCartoon) ─────────────────── */
const SPARKLES = [
  [8, 30, 0], [88, 22, 0.7], [16, 62, 1.4], [92, 56, 2.1], [50, 6, 1], [30, 14, 2.6],
]

function Sparkle({ x, y, d, delay }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      className="absolute h-4 w-4 text-[#e8b86a]"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 1, 0], scale: [0.4, 1, 0.4], rotate: [0, 45] }}
      transition={{ duration: 2.4, repeat: Infinity, delay: delay + d, ease: 'easeInOut' }}
      aria-hidden="true"
    >
      <path d="M12 0 C13 8 16 11 24 12 C16 13 13 16 12 24 C11 16 8 13 0 12 C8 11 11 8 12 0Z" fill="currentColor" />
    </motion.svg>
  )
}

// Rises into place, softly focusing, then floats with a few twinkles around it
function CoupleArt({ show, delay }) {
  return (
    <div className="relative">
      <motion.div
        className="absolute inset-x-[6%] top-[8%] bottom-[4%] rounded-full bg-white/70 blur-3xl"
        initial={{ opacity: 0 }}
        animate={show ? { opacity: 1 } : {}}
        transition={{ duration: 2, delay }}
        aria-hidden="true"
      />
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9, filter: 'blur(10px)' }}
        animate={show ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transitionEnd: { filter: 'none' } } : {}}
        transition={{ duration: 2, delay, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <motion.img
          src={weddingData.introCartoon}
          alt={`${weddingData.groomShort} and ${weddingData.brideShort} in their wedding outfits`}
          width="884"
          height="900"
          className="relative block h-[min(54vh,92vw)] w-auto"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: delay + 2 }}
        />
      </motion.div>
      {show && SPARKLES.map(([x, y, d], i) => <Sparkle key={i} x={x} y={y} d={d} delay={delay + 1.6} />)}
    </div>
  )
}

// Soft watercolour hearts drifting up the whole scene
const DRIFT = [
  [6, 70, 26, 0], [18, 40, 16, 3], [80, 75, 22, 1.5], [92, 45, 14, 4.5], [70, 30, 12, 6], [28, 82, 12, 7.5], [60, 88, 18, 2.5], [40, 55, 10, 5.5],
]

function DriftingHearts({ show, delay }) {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {DRIFT.map(([x, y, size, d], i) => (
        <motion.svg
          key={i}
          viewBox="0 0 24 24"
          className="absolute blur-[0.6px]"
          style={{ left: `${x}%`, top: `${y}%`, width: size * 2, height: size * 2 }}
          initial={{ opacity: 0 }}
          animate={show ? { opacity: [0, 0.55, 0], y: [0, -160], x: [0, i % 2 ? 18 : -18] } : {}}
          transition={{ duration: 9, repeat: Infinity, delay: delay + d, ease: 'easeOut' }}
        >
          <path d={HEART} fill={i % 3 ? '#f4b6c2' : '#ee9fb0'} />
        </motion.svg>
      ))}
    </div>
  )
}

const HEART = 'M12 21s-7.5-4.6-9.6-9.2C.9 8.5 3 4.5 6.8 4.5c2.2 0 3.7 1.3 5.2 3 1.5-1.7 3-3 5.2-3 3.8 0 5.9 4 4.4 7.3C19.5 16.4 12 21 12 21z'

/* ── Scene ───────────────────────────────────────────────────────────── */
export default function Courtyard({ show, delay, onContinue }) {
  const art = weddingData.introCartoon
  const coupleDone = art ? 2.4 : WALK + 2 // s after the couple starts, when hearts and the button appear
  const at = (d) => ({ delay: delay + d })
  const pop = (d) => ({ initial: { opacity: 0, y: 30 }, animate: show ? { opacity: 1, y: 0 } : {}, transition: { duration: 1.2, ease: [0.2, 0.8, 0.2, 1], ...at(d) } })

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        background: art
          ? 'radial-gradient(ellipse at 50% 40%, #fff8f4 0%, #fcebe7 45%, #f5d6d1 100%)'
          : 'linear-gradient(180deg, #f7ecdf 0%, #f0dfca 58%, #e6cfb4 100%)',
      }}
    >
      {/* arched window with a soft sunset sky */}
      <div
        className={`absolute top-[11%] left-1/2 h-[62%] w-[min(78vw,460px)] -translate-x-1/2 overflow-hidden rounded-t-full border-[7px] ${art ? 'border-[#f6dcd6]' : 'border-[#ead6bd]'}`}
        style={
          art
            ? { background: 'linear-gradient(180deg, #fbd9d6 0%, #fde9e4 50%, #fff6f1 100%)', boxShadow: 'inset 0 0 40px rgba(220,140,150,0.2), 0 0 0 2px #efc6c0' }
            : { background: 'linear-gradient(180deg, #f9cdbd 0%, #fbe0cf 45%, #f6eadb 100%)', boxShadow: 'inset 0 0 40px rgba(170,110,80,0.25), 0 0 0 2px #d9c2a3' }
        }
        aria-hidden="true"
      >
        <div className="absolute bottom-[18%] left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-[#fff1d6] opacity-80 blur-[2px]" />
        {[[12, 22, 70], [58, 34, 90], [30, 50, 60]].map(([l, t, w], i) => (
          <motion.div
            key={i}
            className="absolute h-5 rounded-full bg-white/70"
            style={{ left: `${l}%`, top: `${t}%`, width: w }}
            animate={{ x: [0, 18, 0] }}
            transition={{ duration: 9 + i * 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* floor */}
      <div
        className="absolute inset-x-0 bottom-0 h-[24%]"
        style={{
          background: art
            ? 'linear-gradient(180deg, rgba(248,226,221,0) 0%, #f4d5cf 45%, #ecc1ba 100%)'
            : 'repeating-linear-gradient(90deg, rgba(160,125,90,0.18) 0 1px, transparent 1px 64px), linear-gradient(180deg, #e2cdb0 0%, #d4ba98 100%)',
        }}
        aria-hidden="true"
      />

      {/* text */}
      <div className="absolute inset-x-0 top-[15%] px-6 text-center">
        <motion.p {...pop(0.2)} className="font-deva text-sm text-[#8a5a2c] sm:text-base">
          {weddingData.blessing}
        </motion.p>
        <motion.h2 {...pop(0.5)} className="mt-2 font-script text-[clamp(2.3rem,9vw,4.6rem)] leading-tight text-[#7a1a2b]">
          {weddingData.groomShort} <span className="text-[#b8893b]">&amp;</span> {weddingData.brideShort}
        </motion.h2>
        <motion.p {...pop(0.8)} className="mt-1 font-display text-[11px] tracking-[0.4em] text-[#8a5a2c] uppercase sm:text-xs">
          are getting married!
        </motion.p>
      </div>

      {art ? (
        <DriftingHearts show={show} delay={delay} />
      ) : (
        <>
          {/* trees + urns */}
          <motion.div {...pop(0)} className="absolute bottom-[8%]" style={{ left: 'max(1vw, calc(50% - 470px))' }}>
            <CypressUrn className="h-[min(46vh,60vw)] w-auto" />
          </motion.div>
          <motion.div {...pop(0)} className="absolute bottom-[8%]" style={{ right: 'max(1vw, calc(50% - 470px))' }}>
            <CypressUrn className="h-[min(46vh,60vw)] w-auto" flip />
          </motion.div>

          {/* fountain */}
          <motion.div {...pop(0.1)} className="absolute bottom-[9%] left-1/2 w-[min(100vw,600px)] -translate-x-1/2">
            <Fountain className="h-auto w-full" />
          </motion.div>
        </>
      )}

      {/* couple */}
      <div className={`absolute left-1/2 -translate-x-1/2 ${art ? 'bottom-[9%]' : 'bottom-[5%]'}`}>
        {art ? (
          <CoupleArt show={show} delay={delay + 0.6} />
        ) : (
          <motion.div animate={{ rotate: [-1, 1, -1] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }} style={{ transformOrigin: '50% 100%' }}>
            <CoupleWalk show={show} delay={delay + 0.6} className="h-[min(42vh,100vw)] w-auto" />
          </motion.div>
        )}
        {/* hearts rising once they're together */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.svg
            key={i}
            viewBox="0 0 24 24"
            className={`absolute left-1/2 h-5 w-5 ${art ? 'top-[2%]' : 'top-[20%]'}`}
            style={{ marginLeft: (i - 2) * 14 - 10 }}
            initial={{ opacity: 0 }}
            animate={show ? { opacity: [0, 1, 0], y: [0, -90 - i * 12], x: [(i - 2) * 4, (i - 2) * 16] } : {}}
            transition={{ duration: 3.2, repeat: Infinity, delay: delay + 0.6 + coupleDone + i * 0.6, ease: 'easeOut' }}
            aria-hidden="true"
          >
            <path d={HEART} fill={['#e05469', '#f29b9b', '#c0283f', '#f4c1bb', '#e05469'][i]} />
          </motion.svg>
        ))}
      </div>

      {/* foreground roses */}
      {!art && (
        <>
          <motion.div {...pop(0.3)} className="absolute -bottom-[2%] -left-[6%] w-[min(50vw,340px)]">
            <RoseBush className="h-auto w-full" />
          </motion.div>
          <motion.div {...pop(0.3)} className="absolute -right-[6%] -bottom-[2%] w-[min(50vw,340px)]">
            <RoseBush className="h-auto w-full" flip />
          </motion.div>
        </>
      )}

      {/* continue */}
      <motion.div
        className="absolute inset-x-0 bottom-[3%] z-10 flex justify-center"
        initial={{ opacity: 0, y: 12 }}
        animate={show ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ...at(0.6 + coupleDone + 0.2) }}
      >
        <button
          type="button"
          onClick={onContinue}
          disabled={!show}
          className="rounded-full border border-[#b8893b]/70 bg-[#fbf3e6]/90 px-6 py-2.5 font-display text-[11px] tracking-[0.35em] text-[#7a1a2b] uppercase shadow-[0_10px_24px_-12px_rgba(90,50,20,0.6)] backdrop-blur transition-colors hover:bg-white"
        >
          Open Invitation
        </button>
      </motion.div>
    </div>
  )
}
