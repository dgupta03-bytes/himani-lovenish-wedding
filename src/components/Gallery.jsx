import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import weddingData from '../data/weddingData'
import { SectionHeading, ease } from './Decor'

function Lightbox({ images, index, onClose, onStep }) {
  const closeBtn = useRef(null)
  const [dir, setDir] = useState(0)
  const img = images[index]

  const step = useCallback(
    (d) => {
      setDir(d)
      onStep(d)
    },
    [onStep],
  )

  useEffect(() => {
    const prevFocus = document.activeElement
    closeBtn.current?.focus()
    document.body.classList.add('locked')
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.classList.remove('locked')
      prevFocus?.focus?.()
    }
  }, [onClose, step])

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${images.length}: ${img.alt}`}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-[#140509]/92 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <AnimatePresence initial={false} custom={dir} mode="popLayout">
        <motion.img
          key={img.src}
          src={img.src}
          alt={img.alt}
          custom={dir}
          className="max-h-[82vh] max-w-full touch-pan-y rounded-lg object-contain shadow-2xl select-none"
          style={{ aspectRatio: `${img.width} / ${img.height}` }}
          variants={{
            enter: (d) => ({ opacity: 0, x: d * 80, scale: 0.96 }),
            center: { opacity: 1, x: 0, scale: 1 },
            exit: (d) => ({ opacity: 0, x: d * -80, scale: 0.96 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.45, ease }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.6}
          onDragEnd={(_, info) => {
            if (info.offset.x < -60) step(1)
            else if (info.offset.x > 60) step(-1)
          }}
          onClick={(e) => e.stopPropagation()}
          draggable={false}
        />
      </AnimatePresence>

      <p className="absolute bottom-5 left-1/2 -translate-x-1/2 font-display text-[11px] tracking-[0.35em] text-gold-light/80 uppercase">
        {index + 1} / {images.length}
      </p>
      <button
        ref={closeBtn}
        type="button"
        onClick={onClose}
        aria-label="Close photo"
        className="absolute top-4 right-4 grid h-11 w-11 place-items-center rounded-full border border-gold-light/40 text-gold-pale hover:bg-white/10"
      >
        <X className="h-5 w-5" />
      </button>
      {[-1, 1].map((d) => (
        <button
          key={d}
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            step(d)
          }}
          aria-label={d < 0 ? 'Previous photo' : 'Next photo'}
          className={`absolute top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-gold-light/40 text-gold-pale hover:bg-white/10 sm:grid ${d < 0 ? 'left-4' : 'right-4'}`}
        >
          {d < 0 ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
        </button>
      ))}
    </motion.div>
  )
}

function Tile({ img, i, onOpen, className = '' }) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(i)}
      className={`group relative block w-full overflow-hidden rounded-xl bg-champagne/40 text-left ${className}`}
      style={{ aspectRatio: `${img.width} / ${img.height}` }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5% 0px' }}
      transition={{ duration: 0.8, delay: (i % 3) * 0.1, ease }}
      aria-label={`View photo: ${img.alt}`}
    >
      <img src={img.src} alt="" loading="lazy" decoding="async" width={img.width} height={img.height} className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]" />
      <span className="absolute inset-0 bg-gradient-to-t from-maroon-deep/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <span className="absolute inset-2 rounded-lg border border-gold-pale/0 transition-colors duration-500 group-hover:border-gold-pale/70" />
      <span className="absolute bottom-4 left-4 translate-y-2 font-script text-2xl text-ivory opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        {img.alt}
      </span>
    </motion.button>
  )
}

export default function Gallery() {
  const images = weddingData.gallery
  const [index, setIndex] = useState(null)
  const onStep = useCallback((d) => setIndex((i) => (i + d + images.length) % images.length), [images.length])
  const onClose = useCallback(() => setIndex(null), [])

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="paper relative overflow-hidden py-24 sm:py-32">
      <div className="px-4">
        <SectionHeading id="gallery-title" eyebrow="Memories" title="Moments Along the Way" />
      </div>

      {/* Mobile: swipeable strip */}
      <div className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[10vw] pb-4 sm:hidden" aria-label="Photo gallery, swipe to browse">
        {images.map((img, i) => (
          <div key={img.src} className="w-[78vw] shrink-0 snap-center">
            <Tile img={{ ...img, width: 4, height: 5 }} i={i} onOpen={setIndex} className="card-shadow" />
          </div>
        ))}
      </div>
      <p className="mt-3 text-center font-display text-[10px] tracking-[0.35em] text-ink-soft/70 uppercase sm:hidden" aria-hidden="true">
        Swipe to see more
      </p>

      {/* Tablet & desktop: masonry */}
      <div className="mx-auto mt-16 hidden max-w-6xl columns-2 gap-5 px-4 sm:block lg:columns-3 [&>*]:mb-5 [&>*]:break-inside-avoid">
        {images.map((img, i) => (
          <Tile key={img.src} img={img} i={i} onOpen={setIndex} className="card-shadow" />
        ))}
      </div>

      <AnimatePresence>{index !== null && <Lightbox images={images} index={index} onClose={onClose} onStep={onStep} />}</AnimatePresence>
    </section>
  )
}
