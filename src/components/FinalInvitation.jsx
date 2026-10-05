import { motion } from 'framer-motion'
import weddingData from '../data/weddingData'
import { Reveal, ease } from './Decor'
import { Corners, Divider, Ganesha, Kalash, Mandala, Swastik } from './Ornaments'

export default function FinalInvitation() {
  const { brideShort, groomShort, weddingDates, venue, closing } = weddingData
  return (
    <section
      aria-labelledby="final-title"
      className="relative overflow-hidden px-4 py-24 sm:py-32"
      style={{ background: 'radial-gradient(ellipse at 50% 30%, #7a1a2b 0%, #4a0d18 60%, #24060c 100%)' }}
    >
      <Mandala className="animate-spin-slow pointer-events-none absolute top-1/2 left-1/2 h-[140vmin] w-[140vmin] -translate-x-1/2 -translate-y-1/2 text-gold-light/10" strokeWidth={0.2} />

      <motion.div
        className="paper card-shadow relative mx-auto max-w-xl rounded-[6px] px-7 py-14 text-center sm:px-14 sm:py-16"
        initial={{ opacity: 0, y: 60, rotateX: 18 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: '-15% 0px' }}
        transition={{ duration: 1.3, ease }}
        style={{ transformPerspective: 1200 }}
      >
        <div className="pointer-events-none absolute inset-3 rounded-[3px] border border-gold/60" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-[18px] rounded-[2px] border border-gold/30" aria-hidden="true" />
        <Corners className="h-12 w-12 text-gold sm:h-16 sm:w-16" inset="inset-5" />

        <Reveal className="flex justify-center">
          <Ganesha className="h-14 w-14 text-gold" />
        </Reveal>
        <Reveal as="h2" id="final-title" delay={0.1} className="mt-6 font-script text-[clamp(3rem,13vw,5rem)] leading-none text-maroon">
          {brideShort} <span className="gold-text gold-shimmer">&amp;</span> {groomShort}
        </Reveal>
        <Reveal as="p" delay={0.2} className="mt-6 text-2xl leading-snug whitespace-pre-line italic text-ink-soft">
          {closing.message}
        </Reveal>
        <Reveal delay={0.3} className="mt-8">
          <Divider />
        </Reveal>
        <Reveal as="p" delay={0.35} className="mt-8 font-display text-lg tracking-[0.15em] text-ink sm:text-xl">
          {weddingDates.display}
        </Reveal>
        <Reveal as="p" delay={0.4} className="mt-3 text-xl leading-snug text-ink-soft">
          {venue.name}
          <br />
          {venue.city}, {venue.state}
        </Reveal>
        <Reveal delay={0.5} className="mt-10 flex items-center justify-center gap-4 text-gold">
          <Swastik className="h-5 w-5" />
          <Kalash className="h-16 w-16" />
          <Swastik className="h-5 w-5" />
        </Reveal>
        <Reveal as="p" delay={0.55} className="mt-6 font-script text-3xl leading-tight whitespace-pre-line text-maroon">
          {closing.signOff}
        </Reveal>
        <Reveal as="p" delay={0.7} className="mt-10 font-display text-sm tracking-[0.5em] text-gold uppercase">
          {closing.farewell}
        </Reveal>
      </motion.div>

      <p className="relative mt-12 text-center font-display text-[10px] tracking-[0.35em] text-gold-light/60 uppercase">
        Made with love for {brideShort} &amp; {groomShort}
      </p>
    </section>
  )
}
