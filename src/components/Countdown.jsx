import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import weddingData from '../data/weddingData'
import { Reveal, ease } from './Decor'
import { Divider } from './Ornaments'

const target = new Date(weddingData.countdownTo).getTime()

function remaining() {
  const diff = Math.max(0, target - Date.now())
  return {
    done: diff === 0,
    units: [
      { label: 'Days', value: Math.floor(diff / 86400000) },
      { label: 'Hours', value: Math.floor(diff / 3600000) % 24 },
      { label: 'Minutes', value: Math.floor(diff / 60000) % 60 },
      { label: 'Seconds', value: Math.floor(diff / 1000) % 60 },
    ],
  }
}

function Digit({ value }) {
  const text = String(value).padStart(2, '0')
  return (
    <span className="relative inline-flex h-[1.15em] overflow-hidden tabular-nums">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={text}
          initial={{ y: '-100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ duration: 0.45, ease }}
          className="block"
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export default function Countdown() {
  const [time, setTime] = useState(remaining)

  useEffect(() => {
    const id = setInterval(() => setTime(remaining()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="countdown" aria-labelledby="countdown-title" className="relative bg-maroon px-4 py-20 text-ivory sm:py-24" style={{ background: 'radial-gradient(ellipse at 50% 0%, #8a2236 0%, #6e1423 50%, #4a0d18 100%)' }}>
      <div className="fabric-brocade pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="relative mx-auto max-w-4xl text-center">
        <Reveal as="p" className="font-display text-xs tracking-[0.4em] text-gold-light uppercase">
          The Countdown Begins
        </Reveal>
        <Reveal as="h2" id="countdown-title" delay={0.1} className="mt-3 font-script text-5xl text-gold-pale sm:text-6xl">
          {time.done ? 'The celebrations have begun!' : 'Until We Say Forever'}
        </Reveal>

        <div className="mt-12 grid grid-cols-4 gap-2.5 sm:gap-6" role="timer" aria-live="off">
          {time.units.map((u, i) => (
            <Reveal key={u.label} delay={0.12 * i} y={36}>
              <div className="relative flex flex-col items-center rounded-t-[999px] rounded-b-xl border border-gold-light/40 bg-maroon-deep/50 px-1 pt-7 pb-4 shadow-[inset_0_0_0_4px_rgba(67,11,22,0.6),inset_0_0_0_5px_rgba(217,185,112,0.25)] sm:pt-10 sm:pb-6">
                <span className="font-display text-[clamp(1.7rem,8vw,3.6rem)] leading-none text-gold-pale">
                  <Digit value={u.value} />
                </span>
                <span className="mt-2 font-display text-[9px] tracking-[0.25em] text-champagne/80 uppercase sm:mt-3 sm:text-xs sm:tracking-[0.35em]">
                  {u.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="sr-only">
          {time.units[0].value} days, {time.units[1].value} hours and {time.units[2].value} minutes to go.
        </p>

        <Reveal delay={0.4} className="mt-12">
          <Divider tone="text-gold-light" />
        </Reveal>
      </div>
    </section>
  )
}
