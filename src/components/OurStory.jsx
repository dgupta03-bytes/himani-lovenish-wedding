import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import weddingData from '../data/weddingData'
import { SectionHeading, ease } from './Decor'
import { Lotus, Marigold } from './Ornaments'

function StoryItem({ item, index }) {
  const right = index % 2 === 1
  return (
    <li className="relative grid grid-cols-[2.5rem_1fr] gap-x-4 md:grid-cols-[1fr_4rem_1fr] md:gap-x-0">
      {/* node on the line */}
      <motion.div
        className="relative z-10 col-start-1 row-start-1 flex justify-center pt-3 md:col-start-2"
        initial={{ scale: 0, rotate: -90 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true, margin: '-20% 0px' }}
        transition={{ duration: 0.8, ease }}
      >
        <span className="grid h-10 w-10 place-items-center rounded-full border border-gold/60 bg-ivory shadow-[0_0_0_6px_#fbf6ec]">
          <Marigold className="h-6 w-6" />
        </span>
      </motion.div>

      {/* photo */}
      <motion.figure
        className={`col-start-2 row-start-1 mb-5 md:mb-0 md:row-start-1 ${right ? 'md:col-start-1 md:pr-12' : 'md:col-start-3 md:pl-12'}`}
        initial={{ opacity: 0, x: right ? -40 : 40, rotate: right ? -2 : 2 }}
        whileInView={{ opacity: 1, x: 0, rotate: right ? -1.5 : 1.5 }}
        viewport={{ once: true, margin: '-15% 0px' }}
        transition={{ duration: 1, ease }}
      >
        <div className="card-shadow mx-auto max-w-sm rounded-[3px] bg-white p-2.5 pb-8 md:mx-0">
          <img src={item.image} alt={item.title} loading="lazy" width="600" height="450" className="aspect-[4/3] w-full rounded-[2px] object-cover" />
        </div>
      </motion.figure>

      {/* text */}
      <motion.div
        className={`col-start-2 row-start-2 pb-16 md:row-start-1 md:pb-24 ${right ? 'md:col-start-3 md:pl-12' : 'md:col-start-1 md:pr-12 md:text-right'}`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15% 0px' }}
        transition={{ duration: 0.9, delay: 0.15, ease }}
      >
        <p className="font-display text-[11px] tracking-[0.35em] text-gold uppercase">{item.date}</p>
        <h3 className="mt-2 font-script text-4xl text-maroon sm:text-5xl">{item.title}</h3>
        <p className="mt-3 text-lg leading-relaxed text-ink-soft">{item.text}</p>
      </motion.div>
    </li>
  )
}

export default function OurStory() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 25 })

  return (
    <section id="story" aria-labelledby="story-title" className="relative overflow-hidden bg-cream px-4 py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: 'radial-gradient(circle, transparent 7px, rgba(184,137,59,0.12) 7.5px, rgba(184,137,59,0.12) 8.5px, transparent 9px)', backgroundSize: '18px 18px' }}
        aria-hidden="true"
      />
      <div className="relative">
        <SectionHeading id="story-title" eyebrow="How it happened" title="Our Story" subtitle="Two souls, two families, one beautiful journey." />

        <div ref={ref} className="relative mx-auto mt-16 max-w-5xl">
          {/* timeline line */}
          <div className="absolute top-0 bottom-0 left-5 w-px bg-gold/20 md:left-1/2" aria-hidden="true" />
          <motion.div style={{ scaleY }} className="absolute top-0 bottom-0 left-5 w-px origin-top bg-gradient-to-b from-gold via-gold-light to-maroon/60 md:left-1/2" aria-hidden="true" />

          <ol className="relative">
            {weddingData.story.map((item, i) => (
              <StoryItem key={item.title} item={item} index={i} />
            ))}
          </ol>
          <div className="relative flex justify-start text-gold md:justify-center" aria-hidden="true">
            <Lotus className="-ml-3 h-8 w-16 md:ml-0" />
          </div>
        </div>
      </div>
    </section>
  )
}
