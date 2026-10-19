import { motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import weddingData from '../data/weddingData'
import { ease } from './Decor'
import { Marigold } from './Ornaments'

/*
 * The couple portrait (weddingData.couplePhoto) as a 3D card.
 * It swings in when the site opens, tilts toward the mouse with a moving glare,
 * sways gently on its own (for touch screens) and tips back as the page scrolls.
 * The back plate, photo, front frame and marigolds sit at different depths,
 * so the parallax shows whenever the card turns.
 */

const FLOWERS = [
  { className: '-top-4 -left-5', z: 90, color: '#E98A2C', center: '#F2C14E', d: 0 },
  { className: 'top-[18%] -right-6', z: 120, color: '#F2C14E', center: '#E98A2C', d: 0.8 },
  { className: 'bottom-[22%] -left-7', z: 110, color: '#c0283f', center: '#F2C14E', d: 1.6 },
  { className: '-bottom-3 -right-4', z: 80, color: '#E98A2C', center: '#F2C14E', d: 2.4 },
]

const layer = (z) => ({ transform: `translateZ(${z}px)`, transformStyle: 'preserve-3d' })

export default function CoupleCard3D({ delay = 0.3 }) {
  const px = useMotionValue(0) // pointer position over the card, -0.5 … 0.5
  const py = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollTilt = useTransform(scrollY, [0, 700], [0, 18])
  const spring = { stiffness: 140, damping: 18 }
  const rotateX = useSpring(useTransform([py, scrollTilt], ([y, s]) => -y * 16 + s), spring)
  const rotateY = useSpring(useTransform(px, (x) => x * 22), spring)
  const glareX = useTransform(px, [-0.5, 0.5], ['15%', '85%'])
  const glareY = useTransform(py, [-0.5, 0.5], ['10%', '90%'])
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,250,235,0.38), transparent 55%)`

  const onMove = (e) => {
    if (e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => {
    px.set(0)
    py.set(0)
  }

  return (
    <div className="relative mx-auto w-fit [perspective:1100px]" onPointerMove={onMove} onPointerLeave={onLeave}>
      {/* soft shadow on the ground */}
      <motion.div
        className="absolute inset-x-[8%] -bottom-8 h-10 rounded-[50%] bg-maroon-deep/30 blur-xl"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, delay: delay + 0.4, ease }}
        aria-hidden="true"
      />

      {/* entrance: swings in from the side, out of the depth */}
      <motion.div
        initial={{ opacity: 0, rotateY: -38, rotateX: 14, z: -260, y: 50 }}
        animate={{ opacity: 1, rotateY: 0, rotateX: 0, z: 0, y: 0 }}
        transition={{ duration: 2, delay, ease }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* idle sway */}
        <motion.div
          animate={{ rotateY: [-5, 5, -5], y: [0, -8, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: delay + 2 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* pointer + scroll tilt */}
          <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }} className="relative">
            {/* back plate, gives the card thickness */}
            <div
              className="absolute -inset-5 rounded-t-full rounded-b-2xl"
              style={{ ...layer(-22), background: 'linear-gradient(160deg, #7a1a2b, #430b16)', boxShadow: '0 40px 70px -25px rgba(40,8,14,0.65)' }}
              aria-hidden="true"
            />
            <div className="absolute -inset-2.5 rounded-t-full rounded-b-xl bg-gradient-to-b from-gold-light via-gold to-gold-light" style={layer(-8)} aria-hidden="true" />

            {/* the photo */}
            <div className="relative overflow-hidden rounded-t-full rounded-b-lg ring-1 ring-gold-pale/80" style={layer(0)}>
              <img
                src={weddingData.couplePhoto}
                alt={`${weddingData.groomShort} and ${weddingData.brideShort} in their wedding outfits`}
                width="1086"
                height="1448"
                fetchPriority="high"
                className="block h-[min(50svh,112vw)] w-auto max-w-[80vw] object-cover lg:h-[min(72svh,620px)]"
              />
              <motion.div className="pointer-events-none absolute inset-0 mix-blend-soft-light" style={{ background: glare }} aria-hidden="true" />
              {/* one shine across the photo once it has landed */}
              <motion.div
                className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/45 to-transparent"
                initial={{ x: '0%' }}
                animate={{ x: '400%' }}
                transition={{ duration: 1.6, delay: delay + 1.9, ease: 'easeInOut' }}
                aria-hidden="true"
              />
            </div>

            {/* front frame, floating above the photo */}
            <div className="pointer-events-none absolute inset-3 rounded-t-full rounded-b-md border border-gold-pale/80" style={layer(35)} aria-hidden="true" />

            {/* marigolds on the nearest layer */}
            {FLOWERS.map((f, i) => (
              <div key={i} className={`pointer-events-none absolute ${f.className}`} style={layer(f.z)} aria-hidden="true">
                <motion.div animate={{ y: [0, -10, 0], rotate: [0, 20, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: f.d }}>
                  <Marigold className="h-9 w-9 drop-shadow-[0_8px_8px_rgba(67,11,22,0.35)] sm:h-11 sm:w-11" color={f.color} center={f.center} />
                </motion.div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
