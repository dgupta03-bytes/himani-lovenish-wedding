import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, MapPin } from 'lucide-react'
import weddingData from '../data/weddingData'
import { ArchFrame, Divider, Ganesha, Mandala, Marigold, PalaceSilhouette, Swastik } from './Ornaments'
import { ease } from './Decor'
import CoupleCard3D from './CoupleCard3D'

// Mobile strands sit between the logo and menu button; desktop strands flank the centred nav.
const GARLANDS = [
  { left: '36%', length: 3, className: 'md:hidden' },
  { left: '50%', length: 4, className: 'md:hidden' },
  { left: '64%', length: 3, className: 'md:hidden' },
  { left: '4%', length: 5, className: 'hidden md:flex' },
  { left: '11%', length: 3, className: 'hidden xl:flex' },
  { left: '18%', length: 4, className: 'hidden xl:flex' },
  { left: '82%', length: 4, className: 'hidden xl:flex' },
  { left: '89%', length: 3, className: 'hidden xl:flex' },
  { left: '96%', length: 5, className: 'hidden md:flex' },
]

const rise = (delay) => ({
  initial: { opacity: 0, y: 24, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 1.1, delay, ease },
})

export default function Hero() {
  const { bride, groom, blessing, location, couplePhoto } = weddingData
  const { scrollY } = useScroll()
  const mandalaY = useTransform(scrollY, [0, 800], [0, 160])
  const contentY = useTransform(scrollY, [0, 800], [0, -60])

  return (
    <section id="home" aria-label="Welcome" className="paper relative flex min-h-[100svh] items-center justify-center overflow-hidden px-4 pt-24 pb-28">
      {/* Background mandala + palace */}
      <motion.div style={{ y: mandalaY }} className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <Mandala className="animate-spin-slow h-[130vmin] w-[130vmin] text-gold/[0.13]" strokeWidth={0.22} />
      </motion.div>
      <PalaceSilhouette className="pointer-events-none absolute inset-x-0 bottom-0 h-24 w-full text-champagne/70 sm:h-32" />

      {/* Marigold garlands hanging from the top, kept clear of the navigation */}
      <div className="pointer-events-none absolute inset-x-0 top-0" aria-hidden="true">
        {GARLANDS.map((g, i) => (
          <motion.div
            key={i}
            className={`absolute top-0 flex -translate-x-1/2 flex-col items-center ${g.className}`}
            style={{ left: g.left }}
            initial={{ y: -140 }}
            animate={{ y: 0 }}
            transition={{ duration: 1.4, delay: 0.08 * i, ease }}
          >
            {Array.from({ length: g.length }, (_, j) => (
              <Marigold key={j} className="-mt-1 h-5 w-5 sm:h-6 sm:w-6" color={j % 2 ? '#F2C14E' : '#E98A2C'} center={j % 2 ? '#E98A2C' : '#F2C14E'} />
            ))}
          </motion.div>
        ))}
      </div>

      <div className={`relative grid w-full items-center ${couplePhoto ? 'mt-4 max-w-6xl gap-14 lg:mt-0 lg:grid-cols-2 lg:gap-10' : 'max-w-xl'}`}>
        <motion.div style={{ y: contentY }} className="relative mx-auto w-full max-w-xl text-center">
          {/* Jharokha arch framing the names */}
          <motion.div
            className="pointer-events-none absolute -inset-x-2 -top-10 -bottom-8 text-gold/60 sm:-inset-x-10"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, ease }}
            aria-hidden="true"
          >
            <ArchFrame className="h-full w-full" />
          </motion.div>

          <motion.div {...rise(0.2)} className="flex flex-col items-center">
            <Ganesha className="h-24 w-24 sm:h-28 sm:w-28" />
            <div className="mt-2 flex items-center gap-3 text-maroon">
              <Swastik className="h-4 w-4 text-gold" />
              <span className="font-deva text-lg">{blessing}</span>
              <Swastik className="h-4 w-4 text-gold" />
            </div>
          </motion.div>

          <h1 className="mt-8 sm:mt-10">
            <motion.span {...rise(0.45)} className="block font-script text-[clamp(3.2rem,13vw,6.5rem)] leading-[1.02] text-maroon">
              {groom}
            </motion.span>
            <motion.span {...rise(0.65)} className="block font-script text-[clamp(2.4rem,9vw,4.2rem)] leading-none gold-text gold-shimmer">
              &amp;
            </motion.span>
            <motion.span {...rise(0.85)} className="block font-script text-[clamp(3.2rem,13vw,6.5rem)] leading-[1.02] text-maroon">
              {bride}
            </motion.span>
          </h1>

          <motion.p {...rise(1.1)} className="mt-7 font-display text-sm tracking-[0.45em] text-gold uppercase sm:text-base">
            We’re Getting Married
          </motion.p>

          <motion.div {...rise(1.25)} className="mt-6">
            <Divider />
          </motion.div>

          <motion.p {...rise(1.5)} className="mt-3 inline-flex items-center gap-2 text-lg italic text-ink-soft">
            <MapPin className="h-4 w-4 text-gold" aria-hidden="true" /> {location}
          </motion.p>
        </motion.div>

        {couplePhoto && (
          <div>
            <CoupleCard3D delay={0.3} />
          </div>
        )}
      </div>

      <motion.a
        href="#surprise"
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-maroon/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{ opacity: { delay: 2 }, y: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' } }}
        aria-label="Scroll to the surprise"
      >
        <span className="font-display text-[10px] tracking-[0.4em] uppercase">Scroll</span>
        <ChevronDown className="h-4 w-4" />
      </motion.a>
    </section>
  )
}
