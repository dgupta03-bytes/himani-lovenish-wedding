import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import { Embers, Stars, ease } from './Decor'
import { Divider, Mandala, Marigold, PalaceSilhouette } from './Ornaments'

/* Bead positions along a garland — a cubic curve that hangs as a rounded U */
function garlandBeads(cx, width, depth, count) {
  const x0 = cx - width / 2
  const x3 = cx + width / 2
  const y0 = 8
  const k = depth / 0.75 // control-point drop so the lowest point sits at y0 + depth
  return Array.from({ length: count }, (_, i) => {
    const t = i / (count - 1)
    const u = 1 - t
    const x = u ** 3 * x0 + 3 * u ** 2 * t * x0 + 3 * u * t ** 2 * x3 + t ** 3 * x3
    const y = y0 + (3 * u ** 2 * t + 3 * u * t ** 2) * k
    return { x, y, t }
  })
}

function Garland({ cx, delay, flip }) {
  const beads = garlandBeads(cx, 170, 105, 27)
  return (
    <motion.g
      style={{ transformOrigin: `${cx}px 0px` }}
      initial={{ rotate: flip ? 8 : -8 }}
      whileInView={{ rotate: [flip ? 8 : -8, flip ? -2 : 2, 0] }}
      viewport={{ once: true }}
      transition={{ duration: 2.4, delay, ease }}
    >
      {beads.map((b, i) => (
        <motion.circle
          key={i}
          cx={b.x}
          cy={b.y}
          r={i % 2 ? 5.5 : 7}
          fill={i % 3 === 0 ? '#C2404F' : i % 3 === 1 ? '#E98A2C' : '#F2C14E'}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: delay + Math.abs(b.t - 0.5) * -1.6 + 0.9 }}
          style={{ transformOrigin: `${b.x}px ${b.y}px`, transformBox: 'view-box' }}
        />
      ))}
      {/* pendant */}
      <motion.g initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: delay + 1.2, duration: 0.8 }}>
        <path d={`M${cx} ${8 + 105} l-7 14 l7 14 l7 -14 Z`} fill="#D9B970" />
        <circle cx={cx} cy={8 + 105 + 34} r="4" fill="#F6E7BF" />
      </motion.g>
    </motion.g>
  )
}

export function VarmalaFeature({ event }) {
  const letters = event.name.toUpperCase().split('')
  return (
    <section
      aria-labelledby="varmala-title"
      className="relative isolate overflow-hidden px-4 py-28 text-center text-ivory sm:py-36"
      style={{ background: 'radial-gradient(ellipse at 50% 35%, #5a1a3a 0%, #2a0f2e 40%, #0b1029 100%)' }}
    >
      <Stars count={90} seed={4} />
      <Embers count={22} />
      <motion.div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.2, ease }}
        aria-hidden="true"
      >
        <div className="absolute inset-[20%] rounded-full bg-[radial-gradient(circle,rgba(217,185,112,0.28),transparent_65%)]" />
        <Mandala className="animate-spin-slower h-full w-full text-gold-light/15" strokeWidth={0.2} />
      </motion.div>

      <div className="relative mx-auto max-w-3xl">
        <motion.p
          className="font-display text-[11px] tracking-[0.3em] text-gold-light uppercase sm:text-xs sm:tracking-[0.5em]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          The Moment We’ve Waited For
        </motion.p>

        <svg viewBox="0 0 400 190" className="mx-auto mt-6 w-full max-w-md" aria-hidden="true">
          <Garland cx={178} delay={0.2} />
          <Garland cx={222} delay={0.5} flip />
        </svg>

        <h3 id="varmala-title" className="mt-4 font-display text-[clamp(2.6rem,12vw,6rem)] leading-none tracking-[0.12em]" aria-label={event.name}>
          {letters.map((l, i) => (
            <motion.span
              key={i}
              className="gold-text gold-shimmer inline-block"
              initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 1 + i * 0.09, ease }}
              aria-hidden="true"
            >
              {l}
            </motion.span>
          ))}
        </h3>

        <motion.p
          className="mt-5 inline-flex items-center gap-2 font-display text-lg tracking-[0.3em] text-gold-pale"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.8, duration: 1 }}
        >
          <Clock className="h-4 w-4" aria-hidden="true" /> {event.time}
        </motion.p>

        <motion.div
          className="mt-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ show: { transition: { staggerChildren: 0.35, delayChildren: 2.1 } } }}
        >
          {['Two hearts.', 'One promise.', 'Forever begins.'].map((line) => (
            <motion.p
              key={line}
              className="font-script text-4xl leading-snug text-ivory sm:text-5xl"
              variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 1, ease } } }}
            >
              {line}
            </motion.p>
          ))}
        </motion.div>
        <div className="mt-10">
          <Divider tone="text-gold-light" />
        </div>
      </div>
    </section>
  )
}

function Palanquin({ className }) {
  return (
    <svg viewBox="0 0 320 200" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 96 H314" strokeWidth="4" />
      <circle cx="6" cy="96" r="4" fill="currentColor" />
      <circle cx="314" cy="96" r="4" fill="currentColor" />
      {/* roof */}
      <path d="M100 74 C108 40 132 20 160 12 C188 20 212 40 220 74 Z" fill="currentColor" fillOpacity="0.12" />
      <path d="M118 74 C124 50 140 34 160 26 C180 34 196 50 202 74" opacity="0.5" />
      <path d="M160 12 V2" /> <circle cx="160" cy="2" r="2.5" fill="currentColor" />
      <path d="M92 74 H228" strokeWidth="2.4" />
      {/* hanging beads */}
      {[104, 120, 136, 152, 168, 184, 200, 216].map((x, i) => (
        <g key={x}>
          <path d={`M${x} 74 V${82 + (i % 2) * 6}`} opacity="0.6" />
          <circle cx={x} cy={84 + (i % 2) * 6} r="2.2" fill="currentColor" />
        </g>
      ))}
      {/* cabin */}
      <path d="M104 96 V156 H216 V96" fill="currentColor" fillOpacity="0.08" />
      <path d="M118 100 C118 112 136 112 136 124 C136 136 118 136 118 150" opacity="0.7" />
      <path d="M202 100 C202 112 184 112 184 124 C184 136 202 136 202 150" opacity="0.7" />
      <path d="M136 100 H184 V150 H136 Z" opacity="0.35" />
      <path d="M150 124 C150 118 160 117 160 124 C160 117 170 118 170 124 C170 131 160 136 160 136 C160 136 150 131 150 124 Z" fill="currentColor" fillOpacity="0.35" />
      {/* base */}
      <path d="M96 156 H224 L216 166 H104 Z" fill="currentColor" fillOpacity="0.2" />
      <path d="M112 166 V180 M208 166 V180" />
    </svg>
  )
}

export function DoliFeature({ event }) {
  return (
    <section
      aria-labelledby="doli-title"
      className="relative isolate overflow-hidden px-4 pt-40 pb-44 text-center text-ivory sm:pt-44 sm:pb-52"
      style={{ background: 'linear-gradient(180deg, #0b1029 0%, #141a42 55%, #2a2350 100%)' }}
    >
      <Stars count={130} seed={17} />
      {/* moon */}
      <motion.div
        className="pointer-events-none absolute top-16 right-[6%] h-20 w-20 rounded-full sm:top-24 sm:right-[14%] sm:h-32 sm:w-32"
        style={{
          background: 'radial-gradient(circle at 35% 35%, #fffaf0 0%, #f4ead2 45%, #d9cba6 100%)',
          boxShadow: '0 0 60px 20px rgba(246,231,191,0.25), 0 0 160px 60px rgba(246,231,191,0.12)',
        }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-3xl">
        <motion.p
          className="font-display text-xs tracking-[0.5em] text-gold-light/90 uppercase"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          The Farewell
        </motion.p>
        <motion.h3
          id="doli-title"
          className="mt-6 font-script text-[clamp(4rem,18vw,8rem)] leading-[1.15] text-gold-pale"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease }}
        >
          {event.name}
        </motion.h3>
        <motion.p
          className="mt-4 font-display text-base tracking-[0.35em] text-champagne uppercase sm:text-xl"
          initial={{ opacity: 0, letterSpacing: '0.1em' }}
          whileInView={{ opacity: 1, letterSpacing: '0.35em' }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, delay: 0.4, ease }}
        >
          {event.time}
        </motion.p>
        <p className="mt-2 text-lg italic text-champagne/70">Beneath a canopy of stars</p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.6, ease }}
        >
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
            <Palanquin className="mx-auto mt-10 w-full max-w-sm text-gold-light drop-shadow-[0_0_18px_rgba(217,185,112,0.35)]" />
          </motion.div>
        </motion.div>

        <motion.p
          className="mx-auto mt-8 max-w-xl text-xl leading-relaxed text-champagne/85"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.9 }}
        >
          {event.description}
        </motion.p>
      </div>

      {/* flowers + palace at the horizon */}
      <PalaceSilhouette className="pointer-events-none absolute inset-x-0 bottom-0 h-28 w-full text-[#090c22] sm:h-36 [--window:rgba(246,214,140,0.7)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-around px-2" aria-hidden="true">
        {Array.from({ length: 9 }, (_, i) => (
          <Marigold key={i} className={`h-6 w-6 translate-y-2 ${i % 2 ? 'hidden sm:block' : ''}`} color={i % 2 ? '#F2C14E' : '#E98A2C'} />
        ))}
      </div>
    </section>
  )
}
