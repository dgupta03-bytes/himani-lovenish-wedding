import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import weddingData from '../data/weddingData'
import { Burst, Reveal, SectionHeading, ease } from './Decor'
import { Corners, Ganesha, Swastik } from './Ornaments'

const REVEAL_AT = 0.42 // fraction scratched before auto-reveal
const BRUSH = 26

/** Paint the gold foil coating onto the canvas. */
function paintCoating(canvas, w, h) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvas.width = w * dpr
  canvas.height = h * dpr
  const ctx = canvas.getContext('2d')
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.globalCompositeOperation = 'source-over'

  const g = ctx.createLinearGradient(0, 0, w, h)
  g.addColorStop(0, '#9c7230')
  g.addColorStop(0.25, '#d9b970')
  g.addColorStop(0.45, '#f6e7bf')
  g.addColorStop(0.6, '#c9973f')
  g.addColorStop(0.85, '#e4c785')
  g.addColorStop(1, '#8a6424')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, w, h)

  // brushed-metal grain
  for (let i = 0; i < 1400; i++) {
    ctx.fillStyle = `rgba(${Math.random() > 0.5 ? '255,248,225' : '110,75,25'},${Math.random() * 0.12})`
    ctx.fillRect(Math.random() * w, Math.random() * h, Math.random() * 18 + 2, 1)
  }

  // mandala rings
  ctx.save()
  ctx.translate(w / 2, h / 2)
  ctx.strokeStyle = 'rgba(110,20,35,0.22)'
  ctx.lineWidth = 1
  const R = Math.min(w, h) * 0.42
  for (let r = R; r > 20; r -= R / 5) {
    ctx.beginPath()
    ctx.arc(0, 0, r, 0, Math.PI * 2)
    ctx.stroke()
  }
  for (let i = 0; i < 24; i++) {
    ctx.rotate((Math.PI * 2) / 24)
    ctx.beginPath()
    ctx.ellipse(0, -R * 0.7, R * 0.07, R * 0.2, 0, 0, Math.PI * 2)
    ctx.stroke()
  }
  ctx.restore()

  // border
  ctx.strokeStyle = 'rgba(110,20,35,0.35)'
  ctx.lineWidth = 1.2
  ctx.strokeRect(10, 10, w - 20, h - 20)
  ctx.strokeRect(15, 15, w - 30, h - 30)

  // label
  ctx.fillStyle = 'rgba(74,13,24,0.85)'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = `600 ${Math.max(13, w * 0.038)}px Cinzel, serif`
  ctx.fillText('S C R A T C H   H E R E', w / 2, h / 2 - 6)
  ctx.font = `italic ${Math.max(14, w * 0.04)}px "Cormorant Garamond", serif`
  ctx.fillText('to reveal our special dates', w / 2, h / 2 + 22)
}

export default function ScratchCard() {
  const wrap = useRef(null)
  const canvas = useRef(null)
  const dustLayer = useRef(null)
  const last = useRef(null)
  const drawing = useRef(false)
  const strokes = useRef(0)
  const size = useRef({ w: 0, h: 0 })
  const lastDust = useRef(0)
  const [revealed, setRevealed] = useState(false)
  const [started, setStarted] = useState(false)
  const { scratchCard, weddingDates, location } = weddingData

  const setup = useCallback(() => {
    const el = wrap.current
    if (!el || !canvas.current) return
    const { width, height } = el.getBoundingClientRect()
    if (Math.round(width) === size.current.w) return // ignore height-only changes (mobile URL bar)
    size.current = { w: Math.round(width), h: Math.round(height) }
    paintCoating(canvas.current, width, height)
  }, [])

  useEffect(() => {
    if (revealed) return
    setup()
    const ro = new ResizeObserver(setup)
    ro.observe(wrap.current)
    // repaint once the web fonts arrive so the label uses Cinzel
    document.fonts?.ready.then(() => {
      size.current.w = 0
      setup()
    })
    return () => ro.disconnect()
  }, [revealed, setup])

  const progress = () => {
    const c = canvas.current
    const ctx = c.getContext('2d')
    const { data } = ctx.getImageData(0, 0, c.width, c.height)
    let clear = 0
    let total = 0
    for (let i = 3; i < data.length; i += 4 * 24) {
      total++
      if (data[i] < 40) clear++
    }
    return clear / total
  }

  const spawnDust = (x, y) => {
    const now = performance.now()
    if (now - lastDust.current < 35 || !dustLayer.current) return
    lastDust.current = now
    for (let i = 0; i < 3; i++) {
      const d = document.createElement('span')
      d.className = 'dust'
      d.style.left = `${x}px`
      d.style.top = `${y}px`
      d.style.setProperty('--dx', `${(Math.random() - 0.5) * 50}px`)
      d.style.setProperty('--dy', `${Math.random() * 40 + 10}px`)
      d.addEventListener('animationend', () => d.remove())
      dustLayer.current.appendChild(d)
    }
  }

  const scratch = (x, y) => {
    const ctx = canvas.current.getContext('2d')
    ctx.globalCompositeOperation = 'destination-out'
    ctx.strokeStyle = '#000' // must be opaque so each pass fully clears the foil
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.lineWidth = BRUSH * 2
    ctx.beginPath()
    const from = last.current ?? { x, y }
    ctx.moveTo(from.x, from.y)
    ctx.lineTo(x, y)
    ctx.stroke()
    last.current = { x, y }
    spawnDust(x, y)
    if (++strokes.current % 8 === 0 && progress() > REVEAL_AT) setRevealed(true)
  }

  const point = (e) => {
    const r = canvas.current.getBoundingClientRect()
    return { x: e.clientX - r.left, y: e.clientY - r.top }
  }

  const onDown = (e) => {
    if (revealed) return
    drawing.current = true
    setStarted(true)
    last.current = null
    canvas.current.setPointerCapture?.(e.pointerId)
    const p = point(e)
    scratch(p.x, p.y)
  }
  const onMove = (e) => {
    if (!drawing.current || revealed) return
    const p = point(e)
    scratch(p.x, p.y)
  }
  const onUp = () => {
    drawing.current = false
    last.current = null
    if (!revealed && progress() > REVEAL_AT) setRevealed(true)
  }

  return (
    <section id="surprise" aria-labelledby="surprise-title" className="paper relative overflow-hidden px-4 py-24 sm:py-32">
      <SectionHeading id="surprise-title" eyebrow="Just for you" title="A Little Surprise For You" subtitle="Scratch the card to reveal our special dates" />

      <Reveal delay={0.2} className="mx-auto mt-12 w-full max-w-md">
        <div ref={wrap} className="card-shadow relative aspect-[4/3] w-full overflow-hidden rounded-2xl select-none" style={{ '--card-bg': '#fbf6ec' }}>
          {/* Hidden content */}
          <div className="gold-border paper absolute inset-0 flex flex-col items-center justify-center rounded-2xl p-6 text-center">
            <Corners className="h-10 w-10 text-gold sm:h-12 sm:w-12" inset="inset-3" />
            <Ganesha className="h-14 w-14" />
            <p className="mt-2 font-display text-xs tracking-[0.45em] text-gold uppercase">{scratchCard.title}</p>
            <p className="mt-3 font-script text-[clamp(2rem,9vw,2.9rem)] leading-tight text-maroon">{weddingDates.display}</p>
            <div className="mt-2 flex items-center gap-2 text-ink-soft">
              <Swastik className="h-3.5 w-3.5 text-gold" />
              <span className="text-lg italic">{location}</span>
              <Swastik className="h-3.5 w-3.5 text-gold" />
            </div>
          </div>

          {/* Scratch coating */}
          <AnimatePresence>
            {!revealed && (
              <motion.canvas
                key="coating"
                ref={canvas}
                className="absolute inset-0 h-full w-full cursor-grab touch-none rounded-2xl active:cursor-grabbing"
                onPointerDown={onDown}
                onPointerMove={onMove}
                onPointerUp={onUp}
                onPointerCancel={onUp}
                exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.7, ease } }}
                aria-hidden="true"
              />
            )}
          </AnimatePresence>
          <div ref={dustLayer} className="pointer-events-none absolute inset-0" aria-hidden="true" />

          {/* Hint */}
          <AnimatePresence>
            {!started && !revealed && (
              <motion.div
                className="pointer-events-none absolute right-6 bottom-6"
                exit={{ opacity: 0 }}
                animate={{ x: [-30, 30, -30], y: [0, -6, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                aria-hidden="true"
              >
                <Sparkles className="h-6 w-6 text-maroon/60" />
              </motion.div>
            )}
          </AnimatePresence>

          {revealed && <Burst count={34} seed={9} distance={260} />}
        </div>

        {/* Accessible alternative */}
        {!revealed && (
          <div className="mt-5 text-center">
            <button
              type="button"
              onClick={() => setRevealed(true)}
              className="font-display text-[11px] tracking-[0.3em] text-maroon/70 uppercase underline decoration-gold/50 underline-offset-4 hover:text-maroon"
            >
              Reveal without scratching
            </button>
          </div>
        )}

        <div aria-live="polite" className="mt-8 min-h-[8rem] text-center">
          <AnimatePresence>
            {revealed && (
              <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.25, delayChildren: 0.4 } } }}>
                <p className="sr-only">
                  {scratchCard.title}: {weddingDates.display}, {location}.
                </p>
                {scratchCard.tagline.map((line, i) => (
                  <motion.p
                    key={line}
                    variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } }}
                    className={i === 1 ? 'font-script text-4xl text-maroon sm:text-5xl' : 'font-display text-sm tracking-[0.3em] text-gold uppercase sm:text-base'}
                  >
                    {line}
                  </motion.p>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  )
}
