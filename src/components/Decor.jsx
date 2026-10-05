import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Divider } from './Ornaments'

/* Deterministic pseudo-random so decorative layouts are stable between renders */
function seeded(seed) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

export const ease = [0.22, 1, 0.36, 1]

/** Fade/slide in once when scrolled into view. */
export function Reveal({ children, delay = 0, y = 28, className = '', as = 'div', ...rest }) {
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.9, delay, ease }}
      {...rest}
    >
      {children}
    </Comp>
  )
}

export function SectionHeading({ eyebrow, title, subtitle, tone = 'light', id }) {
  const dark = tone === 'dark'
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && (
        <Reveal as="p" className={`font-display text-xs tracking-[0.35em] uppercase ${dark ? 'text-gold-light' : 'text-gold'}`}>
          {eyebrow}
        </Reveal>
      )}
      <Reveal as="h2" id={id} delay={0.08} className={`mt-3 font-display text-3xl sm:text-5xl leading-tight ${dark ? 'text-ivory' : 'text-maroon'}`}>
        {title}
      </Reveal>
      <Reveal delay={0.16} className="mt-5">
        <Divider tone={dark ? 'text-gold-light' : 'text-gold'} />
      </Reveal>
      {subtitle && (
        <Reveal as="p" delay={0.24} className={`mt-5 text-lg sm:text-xl italic ${dark ? 'text-champagne/90' : 'text-ink-soft'}`}>
          {subtitle}
        </Reveal>
      )}
    </div>
  )
}

const PETAL_COLORS = ['#E98A2C', '#F2C14E', '#E7A3A0', '#C2404F', '#F6D7C3']

/** Gentle falling petals across the whole page. Pure CSS animation. */
export function FloatingPetals({ count = 12 }) {
  const petals = useMemo(() => {
    const r = seeded(7)
    return Array.from({ length: count }, (_, i) => ({
      left: `${r() * 100}%`,
      size: 8 + r() * 10,
      dur: `${14 + r() * 14}s`,
      delay: `${-r() * 28}s`,
      drift: `${(r() - 0.5) * 220}px`,
      spin: `${(r() > 0.5 ? 1 : -1) * (300 + r() * 400)}deg`,
      color: PETAL_COLORS[i % PETAL_COLORS.length],
    }))
  }, [count])
  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden" aria-hidden="true">
      {petals.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={{ left: p.left, '--dur': p.dur, '--delay': p.delay, '--drift': p.drift, '--spin': p.spin }}
        >
          <svg width={p.size} height={p.size * 1.3} viewBox="0 0 10 13">
            <path d="M5 0 C9 3 10 8 5 13 C0 8 1 3 5 0 Z" fill={p.color} opacity="0.75" />
          </svg>
        </span>
      ))}
    </div>
  )
}

export function Stars({ count = 60, seed = 3, className = '' }) {
  const stars = useMemo(() => {
    const r = seeded(seed)
    return Array.from({ length: count }, () => ({
      top: `${r() * 100}%`,
      left: `${r() * 100}%`,
      size: r() < 0.85 ? 1 + r() * 1.4 : 2.4 + r() * 1.2,
      dur: `${2 + r() * 4}s`,
      delay: `${-r() * 6}s`,
    }))
  }, [count, seed])
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      {stars.map((s, i) => (
        <span key={i} className="star" style={{ top: s.top, left: s.left, width: s.size, height: s.size, '--dur': s.dur, '--delay': s.delay }} />
      ))}
    </div>
  )
}

export function Embers({ count = 18, seed = 11 }) {
  const embers = useMemo(() => {
    const r = seeded(seed)
    return Array.from({ length: count }, () => ({
      left: `${r() * 100}%`,
      size: 3 + r() * 6,
      dur: `${7 + r() * 8}s`,
      delay: `${-r() * 12}s`,
      drift: `${(r() - 0.5) * 120}px`,
    }))
  }, [count, seed])
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {embers.map((e, i) => (
        <span key={i} className="ember" style={{ left: e.left, width: e.size, height: e.size, '--dur': e.dur, '--delay': e.delay, '--drift': e.drift }} />
      ))}
    </div>
  )
}

/** One-shot burst of gold sparkles + petals radiating from the centre. */
export function Burst({ count = 28, seed = 5, distance = 220 }) {
  const bits = useMemo(() => {
    const r = seeded(seed)
    return Array.from({ length: count }, (_, i) => {
      const a = (Math.PI * 2 * i) / count + r() * 0.4
      const d = distance * (0.5 + r() * 0.7)
      return {
        x: Math.cos(a) * d,
        y: Math.sin(a) * d,
        size: 4 + r() * 7,
        petal: i % 3 === 0,
        color: i % 3 === 0 ? PETAL_COLORS[i % PETAL_COLORS.length] : '#D9B970',
        delay: r() * 0.15,
      }
    })
  }, [count, seed, distance])
  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2" aria-hidden="true">
      {bits.map((b, i) => (
        <motion.span
          key={i}
          className="absolute block"
          style={{
            width: b.size,
            height: b.petal ? b.size * 1.4 : b.size,
            background: b.color,
            borderRadius: b.petal ? '50% 50% 50% 0' : '9999px',
            boxShadow: b.petal ? 'none' : '0 0 8px rgba(246,231,191,0.9)',
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0.4, rotate: 0 }}
          animate={{ x: b.x, y: b.y + 40, opacity: 0, scale: 1, rotate: 260 }}
          transition={{ duration: 1.5, delay: b.delay, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}
