import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'
import weddingData from '../data/weddingData'
import { music } from '../lib/music'
import { ease } from './Decor'
import Courtyard from './Courtyard'

/*
 * Full-screen gatefold intro:
 *   closed doors (embossed foliage, pearl seam, lace seal "TAP TO | OPEN")
 *   → tap: song starts, seal splits, doors swing open
 *   → pearl-strung curtains part onto a garden courtyard with a cartoon bride & groom
 *   → "Open Invitation" (or a short wait) fades into the site.
 */

const T = {
  doors: 0.3, // doors start opening (s)
  doorsDur: 2.8,
  curtains: 2.5, // curtains start parting (s)
  curtainsDur: 3.4,
  scene: 3.6, // courtyard animations begin (s)
  auto: 17000, // continue to the site on its own if the guest doesn't tap (ms)
}

/* ── Embossed foliage pattern for the doors (SVG data URI) ───────────── */
function sprig(x, y, rot, scale) {
  const leaves = [
    [0, -6, -38], [0, -6, 38], [0, -22, -34], [0, -22, 34], [0, -38, -30], [0, -38, 30], [0, -52, -26], [0, -52, 26],
  ]
  const leaf = (lx, ly, a) =>
    `<path d="M0 0 C4 -6 4 -14 0 -20 C-4 -14 -4 -6 0 0 Z" transform="translate(${lx} ${ly}) rotate(${a})"/>`
  const body = `<path d="M0 8 C2 -10 -2 -40 0 -62" fill="none" stroke-width="1.6"/>${leaves.map((l) => leaf(...l)).join('')}<path d="M0 -62 C4 -68 4 -74 0 -80 C-4 -74 -4 -68 0 -62 Z"/>`
  const g = (dx, dy, fill, stroke) =>
    `<g transform="translate(${x + dx} ${y + dy}) rotate(${rot}) scale(${scale})" fill="${fill}" stroke="${stroke}" stroke-width="0.8">${body}</g>`
  // shadow, highlight, face → reads as embossed
  return g(1.4, 1.8, 'rgba(25,24,8,0.35)', 'rgba(25,24,8,0.35)') + g(-0.8, -0.8, 'rgba(255,246,214,0.22)', 'rgba(255,246,214,0.22)') + g(0, 0, 'rgba(160,152,98,0.55)', 'rgba(205,196,140,0.35)')
}
const FOLIAGE = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="260" height="300" viewBox="0 0 260 300">${sprig(60, 120, -28, 1.1)}${sprig(190, 90, 34, 0.9)}${sprig(140, 260, -8, 1.25)}${sprig(30, 290, 40, 0.8)}${sprig(250, 250, -40, 0.85)}</svg>`,
)}")`

const DOOR_BG = {
  backgroundColor: '#65613c',
  backgroundImage: `${FOLIAGE}, radial-gradient(ellipse at 100% 50%, rgba(255,240,200,0.18), transparent 60%), linear-gradient(180deg, #747049 0%, #5f5b37 55%, #4d4a2c 100%)`,
  backgroundSize: '260px 300px, 100% 100%, 100% 100%',
}

const PEARLS = {
  backgroundImage:
    'radial-gradient(circle at 50% 45%, #fffaf0 0 1.6px, #f0e2c4 2.4px, #c7a86c 3.6px, rgba(0,0,0,0) 4.2px)',
  backgroundSize: '9px 9px',
  backgroundRepeat: 'repeat-y',
}

/* ── Lace seal ───────────────────────────────────────────────────────── */
function scallopPath(r, bumps, depth) {
  let d = ''
  for (let i = 0; i <= bumps * 2; i++) {
    const a = (Math.PI * i) / bumps
    const rr = i % 2 ? r : r - depth
    const x = Math.cos(a) * rr
    const y = Math.sin(a) * rr
    d += i === 0 ? `M${x} ${y}` : i % 2 ? ` Q${x * 1.04} ${y * 1.04}` : ` ${x} ${y}`
  }
  return d + ' Z'
}

function Seal() {
  const outer = useMemo(() => scallopPath(96, 30, 7), [])
  const inner = useMemo(() => scallopPath(80, 24, 4), [])
  return (
    <svg viewBox="-100 -100 200 200" className="h-full w-full drop-shadow-[0_10px_18px_rgba(20,18,6,0.45)]" aria-hidden="true">
      <defs>
        <radialGradient id="seal-fill" cx="0.4" cy="0.35" r="0.8">
          <stop offset="0" stopColor="#fbeee3" />
          <stop offset="0.6" stopColor="#efd6c4" />
          <stop offset="1" stopColor="#d9b49b" />
        </radialGradient>
      </defs>
      <path d={outer} fill="url(#seal-fill)" stroke="#b8935a" strokeWidth="1.4" />
      {Array.from({ length: 60 }, (_, i) => {
        const a = (Math.PI * 2 * i) / 60
        return <circle key={i} cx={Math.cos(a) * 85} cy={Math.sin(a) * 85} r="1.3" fill="#c9a46a" />
      })}
      <path d={inner} fill="none" stroke="#c9a46a" strokeWidth="1" />
      <circle r="66" fill="none" stroke="#c9a46a" strokeWidth="0.6" strokeDasharray="2 3" />
      {/* tiny leaf sprigs */}
      {[-1, 1].map((s) => (
        <g key={s} transform={`translate(${s * 34} -36) rotate(${s * 30})`} fill="#c9a46a" opacity="0.8">
          <path d="M0 0 C3 -5 3 -11 0 -16 C-3 -11 -3 -5 0 0 Z" />
          <path d="M0 0 C3 -5 3 -11 0 -16 C-3 -11 -3 -5 0 0 Z" transform="rotate(50)" />
          <path d="M0 0 C3 -5 3 -11 0 -16 C-3 -11 -3 -5 0 0 Z" transform="rotate(-50)" />
        </g>
      ))}
      <text x="-9" y="5" textAnchor="end" fontFamily="Cinzel, serif" fontSize="12.5" letterSpacing="2.4" fill="#7a5a2c">
        TAP TO
      </text>
      <text x="9" y="5" textAnchor="start" fontFamily="Cinzel, serif" fontSize="12.5" letterSpacing="2.4" fill="#7a5a2c">
        OPEN
      </text>
      <path d="M-36 26 q9 -7 18 0 t18 0 t18 0 t18 0" fill="none" stroke="#c9a46a" strokeWidth="1.1" strokeLinecap="round" />
      <circle cx="0" cy="26" r="2" fill="#c9a46a" />
    </svg>
  )
}

/* ── Door ────────────────────────────────────────────────────────────── */
function Door({ side, open }) {
  const left = side === 'left'
  return (
    <motion.div
      className={`absolute top-0 h-full w-1/2 ${left ? 'left-0' : 'right-0'}`}
      style={{ transformOrigin: left ? 'left center' : 'right center', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
      animate={{ rotateY: open ? (left ? -112 : 112) : 0 }}
      transition={{ duration: T.doorsDur, delay: T.doors, ease: [0.6, 0.02, 0.25, 1] }}
    >
      <div className="absolute inset-0" style={{ ...DOOR_BG, backgroundPosition: left ? '0 0, 0 0, 0 0' : '130px 40px, 0 0, 0 0' }} />
      {/* light falls on the centre seam; door darkens as it swings */}
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(${left ? '90deg' : '270deg'}, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0) 45%, rgba(255,240,200,0.06) 100%)` }}
      />
      <motion.div className="absolute inset-0 bg-black" initial={{ opacity: 0 }} animate={{ opacity: open ? 0.55 : 0 }} transition={{ duration: T.doorsDur, delay: T.doors }} />

      {/* panel mouldings */}
      <div className={`absolute top-[4%] bottom-[4%] ${left ? 'left-[7%] right-[9%]' : 'right-[7%] left-[9%]'} rounded-[3px] border border-[#cdbf86]/30`}>
        <div className="absolute inset-2 rounded-[2px] border border-[#cdbf86]/15" />
      </div>

      {/* pearl seam */}
      <div className={`absolute top-0 h-full w-[18px] ${left ? 'right-0' : 'left-0'}`} style={{ background: 'linear-gradient(90deg, #9b8551, #e4cf98 45%, #9b8551)' }}>
        <div className="absolute inset-y-0 left-1/2 w-[9px] -translate-x-1/2" style={PEARLS} />
      </div>

      {/* half of the seal */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 ${left ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'}`}
        style={{ width: 'min(60vw, 300px)', aspectRatio: '1', clipPath: left ? 'inset(-10% 50% -10% -10%)' : 'inset(-10% -10% -10% 50%)' }}
      >
        <motion.div className="h-full w-full" animate={open ? {} : { scale: [1, 1.035, 1] }} transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}>
          <Seal />
        </motion.div>
      </div>
    </motion.div>
  )
}

/* ── Curtains ────────────────────────────────────────────────────────── */
const FOLDS = {
  backgroundImage:
    'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(0,0,0,0) 30%, rgba(110,70,40,0.22) 100%), repeating-linear-gradient(90deg, #e6cfba 0px, #f8ece0 13px, #d6b99f 28px, #f1dfcc 42px, #e6cfba 54px)',
}

function Drape({ side, open }) {
  const left = side === 'left'
  const closed = left ? 'polygon(0% 0%, 100% 0%, 100% 62%, 100% 100%, 0% 100%)' : 'polygon(100% 0%, 0% 0%, 0% 62%, 0% 100%, 100% 100%)'
  const parted = left ? 'polygon(0% 0%, 38% 0%, 9% 60%, 24% 100%, 0% 100%)' : 'polygon(100% 0%, 62% 0%, 91% 60%, 76% 100%, 100% 100%)'
  return (
    <>
      <motion.div
        className={`absolute top-0 h-full w-[51%] ${left ? 'left-0' : 'right-0'}`}
        style={{ ...FOLDS, boxShadow: 'inset 0 0 60px rgba(90,55,30,0.25)' }}
        initial={{ clipPath: closed }}
        animate={{ clipPath: open ? parted : closed }}
        transition={{ duration: T.curtainsDur, delay: T.curtains, ease: [0.65, 0, 0.3, 1] }}
      >
        {/* pearl strand along the meeting edge */}
        <div className={`absolute top-0 h-full w-[9px] ${left ? 'right-1' : 'left-1'}`} style={PEARLS} />
      </motion.div>
      {/* tie-back tassel */}
      <motion.div
        className={`absolute top-[58%] ${left ? 'left-[3%]' : 'right-[3%]'} flex flex-col items-center`}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={open ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: T.curtains + T.curtainsDur * 0.7, duration: 0.5 }}
        aria-hidden="true"
      >
        <span className="h-3 w-10 rounded-full" style={{ ...PEARLS, backgroundRepeat: 'repeat-x', backgroundColor: '#c9a46a' }} />
        <span className="mt-0.5 h-8 w-3 rounded-b-full bg-gradient-to-b from-[#d9b970] to-[#9c7a40]" />
      </motion.div>
    </>
  )
}

function Valance() {
  const [count] = useState(() => Math.ceil((typeof window === 'undefined' ? 1200 : window.innerWidth) / 150) + 1)
  return (
    <div className="absolute inset-x-0 top-0 flex justify-center overflow-hidden" aria-hidden="true">
      <div className="flex shrink-0">
        {Array.from({ length: count }, (_, i) => (
          <svg key={i} viewBox="0 0 150 70" width="150" height="70" className="shrink-0 overflow-visible">
            <defs>
              <linearGradient id={`swag-${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#f6e8da" />
                <stop offset="1" stopColor="#d8bca2" />
              </linearGradient>
            </defs>
            <path d="M0 0 H150 Q148 34 75 50 Q2 34 0 0 Z" fill={`url(#swag-${i})`} />
            {[12, 22, 32].map((y, j) => (
              <path key={j} d={`M${6 + j * 4} 0 Q75 ${y + 8} ${144 - j * 4} 0`} fill="none" stroke="#c9a88a" strokeWidth="0.8" opacity="0.6" />
            ))}
            {Array.from({ length: 17 }, (_, k) => {
              const t = k / 16
              const x = (1 - t) ** 2 * 2 + 2 * (1 - t) * t * 75 + t ** 2 * 148
              const y = (1 - t) ** 2 * 6 + 2 * (1 - t) * t * 98 + t ** 2 * 6
              return <circle key={k} cx={x} cy={y} r="2.6" fill="#fffaf0" stroke="#c9a46a" strokeWidth="0.6" />
            })}
            <circle cx="0" cy="4" r="5" fill="#e4cf98" stroke="#b8935a" strokeWidth="0.8" />
          </svg>
        ))}
      </div>
      <div className="absolute inset-x-0 top-0 h-2.5 bg-gradient-to-b from-[#b8935a] to-[#e4cf98]" />
    </div>
  )
}

/* ── Intro ───────────────────────────────────────────────────────────── */
export default function DoorsIntro({ onReveal, onDone }) {
  const [open, setOpen] = useState(false)
  const [playing, setPlaying] = useState(music.playing)
  const timers = useRef([])
  const finished = useRef(false)

  useEffect(() => music.subscribe(setPlaying), [])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const finish = () => {
    if (finished.current) return
    finished.current = true
    onReveal() // mount the site underneath, then fade the intro away
    timers.current.push(setTimeout(onDone, 120))
  }

  const start = () => {
    if (open) return
    music.play() // inside the tap, so the browser allows sound
    setOpen(true)
    timers.current.push(setTimeout(finish, T.auto))
  }

  return (
    <motion.div className="fixed inset-0 z-[60] overflow-hidden" exit={{ opacity: 0, transition: { duration: 1, ease } }}>
      {/* courtyard (revealed behind the curtains) */}
      <Courtyard show={open} delay={T.scene} onContinue={finish} />

      {/* curtains (revealed behind the doors) */}
      <div className="pointer-events-none absolute inset-0">
        <Drape side="left" open={open} />
        <Drape side="right" open={open} />
        <Valance />
      </div>

      {/* doors */}
      <button
        type="button"
        onClick={start}
        disabled={open}
        aria-label={`Tap to open the wedding invitation of ${weddingData.bride} and ${weddingData.groom}`}
        className="absolute inset-0 block cursor-pointer"
        style={{ perspective: 1600, pointerEvents: open ? 'none' : 'auto' }}
      >
        <Door side="left" open={open} />
        <Door side="right" open={open} />
      </button>

      {/* sound */}
      <motion.button
        type="button"
        onClick={() => music.toggle()}
        aria-label={playing ? 'Mute music' : 'Play music'}
        aria-pressed={playing}
        className="absolute top-4 right-4 z-10 grid h-10 w-10 place-items-center rounded-lg border border-[#cdbf86]/40 bg-[#4d4a2c]/70 text-[#efe3b8] backdrop-blur"
        animate={{ opacity: open ? 0 : 1 }}
      >
        {playing ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
      </motion.button>
    </motion.div>
  )
}
