import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { brideSVG, garlandSVG, groomSVG } from '../lib/cartoon'
import weddingData from '../data/weddingData'

/*
 * The scene behind the curtains: a garden courtyard with a fountain,
 * cypress trees, rose urns and a cartoon bride & groom.
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
    <svg viewBox="-200 -300 400 310" className={`overflow-visible ${className}`} role="img" aria-label={`Cartoon of ${weddingData.brideShort} and ${weddingData.groomShort} exchanging varmalas`}>
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

/* ── Lovebirds carrying a heart ──────────────────────────────────────── */
function Bird({ x, color, wing, flip }) {
  return (
    <g transform={`translate(${x} 20) ${flip ? 'scale(-1 1)' : ''}`}>
      <ellipse rx="13" ry="9" fill={color} />
      <circle cx="11" cy="-6" r="7" fill={color} />
      <path d="M17 -7 l7 2 -7 3 Z" fill="#E98A2C" />
      <circle cx="13" cy="-8" r="1.4" fill={INK} />
      <path d="M-12 0 l-9 -4 2 6 Z" fill={color} />
      <motion.ellipse
        cx="-1"
        cy="-4"
        rx="9"
        ry="6"
        fill={wing}
        animate={{ scaleY: [1, -0.6, 1] }}
        transition={{ duration: 0.45, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '-1px 0px' }}
      />
    </g>
  )
}

function LoveBirds() {
  return (
    <svg viewBox="-30 -10 160 60" className="h-full w-full overflow-visible" aria-hidden="true">
      <path d="M12 26 Q50 50 88 26" fill="none" stroke="#c9a46a" strokeWidth="1.2" />
      <motion.path
        d="M50 40 c-6 -7 -15 -1 -9 7 l9 9 9 -9 c6 -8 -3 -14 -9 -7z"
        fill="#e05469"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 0.9, repeat: Infinity }}
        style={{ transformOrigin: '50px 46px' }}
      />
      <Bird x={10} color="#f6c1c8" wing="#ee9fae" />
      <Bird x={90} color="#bfdcef" wing="#93c2e2" flip />
    </svg>
  )
}

const HEART = 'M12 21s-7.5-4.6-9.6-9.2C.9 8.5 3 4.5 6.8 4.5c2.2 0 3.7 1.3 5.2 3 1.5-1.7 3-3 5.2-3 3.8 0 5.9 4 4.4 7.3C19.5 16.4 12 21 12 21z'

/* ── Scene ───────────────────────────────────────────────────────────── */
export default function Courtyard({ show, delay, onContinue }) {
  const at = (d) => ({ delay: delay + d })
  const pop = (d) => ({ initial: { opacity: 0, y: 30 }, animate: show ? { opacity: 1, y: 0 } : {}, transition: { duration: 1.2, ease: [0.2, 0.8, 0.2, 1], ...at(d) } })

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: 'linear-gradient(180deg, #f7ecdf 0%, #f0dfca 58%, #e6cfb4 100%)' }}>
      {/* arched window with a soft sunset sky */}
      <div
        className="absolute top-[11%] left-1/2 h-[62%] w-[min(78vw,460px)] -translate-x-1/2 overflow-hidden rounded-t-full border-[7px] border-[#ead6bd]"
        style={{ background: 'linear-gradient(180deg, #f9cdbd 0%, #fbe0cf 45%, #f6eadb 100%)', boxShadow: 'inset 0 0 40px rgba(170,110,80,0.25), 0 0 0 2px #d9c2a3' }}
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
          background:
            'repeating-linear-gradient(90deg, rgba(160,125,90,0.18) 0 1px, transparent 1px 64px), linear-gradient(180deg, #e2cdb0 0%, #d4ba98 100%)',
        }}
        aria-hidden="true"
      />

      {/* text */}
      <div className="absolute inset-x-0 top-[15%] px-6 text-center">
        <motion.p {...pop(0.2)} className="font-deva text-sm text-[#8a5a2c] sm:text-base">
          {weddingData.blessing}
        </motion.p>
        <motion.h2 {...pop(0.5)} className="mt-2 font-script text-[clamp(2.3rem,9vw,4.6rem)] leading-tight text-[#7a1a2b]">
          {weddingData.brideShort} <span className="text-[#b8893b]">&amp;</span> {weddingData.groomShort}
        </motion.h2>
        <motion.p {...pop(0.8)} className="mt-1 font-display text-[11px] tracking-[0.4em] text-[#8a5a2c] uppercase sm:text-xs">
          are getting married!
        </motion.p>
      </div>

      {/* lovebirds fly across */}
      <motion.div
        className="absolute top-[37%] left-0 h-14 w-36"
        initial={{ x: '-40vw', opacity: 0 }}
        animate={show ? { x: ['-40vw', '30vw', '110vw'], y: [0, -20, -60], opacity: [1, 1, 1] } : {}}
        transition={{ duration: 9, ...at(0.6), ease: 'easeInOut', times: [0, 0.45, 1] }}
        aria-hidden="true"
      >
        <LoveBirds />
      </motion.div>

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

      {/* couple */}
      <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2">
        <motion.div animate={{ rotate: [-1, 1, -1] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }} style={{ transformOrigin: '50% 100%' }}>
          <CoupleWalk show={show} delay={delay + 0.6} className="h-[min(42vh,100vw)] w-auto" />
        </motion.div>
        {/* hearts rising once they're together */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.svg
            key={i}
            viewBox="0 0 24 24"
            className="absolute top-[20%] left-1/2 h-5 w-5"
            style={{ marginLeft: (i - 2) * 14 - 10 }}
            initial={{ opacity: 0 }}
            animate={show ? { opacity: [0, 1, 0], y: [0, -90 - i * 12], x: [(i - 2) * 4, (i - 2) * 16] } : {}}
            transition={{ duration: 3.2, repeat: Infinity, delay: delay + 0.6 + WALK + 2 + i * 0.6, ease: 'easeOut' }}
            aria-hidden="true"
          >
            <path d={HEART} fill={['#e05469', '#f29b9b', '#c0283f', '#f4c1bb', '#e05469'][i]} />
          </motion.svg>
        ))}
      </div>

      {/* foreground roses */}
      <motion.div {...pop(0.3)} className="absolute -bottom-[2%] -left-[6%] w-[min(50vw,340px)]">
        <RoseBush className="h-auto w-full" />
      </motion.div>
      <motion.div {...pop(0.3)} className="absolute -right-[6%] -bottom-[2%] w-[min(50vw,340px)]">
        <RoseBush className="h-auto w-full" flip />
      </motion.div>

      {/* continue */}
      <motion.div
        className="absolute inset-x-0 bottom-[3%] z-10 flex justify-center"
        initial={{ opacity: 0, y: 12 }}
        animate={show ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ...at(0.6 + WALK + 2.2) }}
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
