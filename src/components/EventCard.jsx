import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import EventIcon from './EventIcons'
import { ease } from './Decor'

/**
 * Arched invitation card for one function.
 * `variant="royal"` is the deep-maroon Day 2 style.
 */
export default function EventCard({ event, index = 0, variant = 'light' }) {
  const royal = variant === 'royal'
  return (
    <motion.article
      className="group relative h-full"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.85, delay: (index % 4) * 0.12, ease }}
    >
      <div
        className={`relative flex h-full flex-col items-center overflow-hidden rounded-t-[999px] rounded-b-2xl px-6 pt-14 pb-8 text-center transition-transform duration-500 group-hover:-translate-y-1.5 ${
          royal ? 'bg-maroon text-ivory' : 'paper text-ink card-shadow'
        }`}
        style={
          royal
            ? {
                background: 'linear-gradient(180deg, #7a1a2b 0%, #5a1020 100%)',
                boxShadow: 'inset 0 0 0 6px #5a1020, inset 0 0 0 7px rgba(217,185,112,0.55), 0 30px 60px -30px rgba(20,4,8,0.7)',
              }
            : { boxShadow: 'inset 0 0 0 6px #fbf6ec, inset 0 0 0 7px rgba(184,137,59,0.45), 0 1px 2px rgba(67,11,22,0.06), 0 20px 40px -20px rgba(67,11,22,0.3)' }
        }
      >
        {royal && <div className="fabric-brocade pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />}
        <div
          className={`relative grid h-24 w-24 place-items-center rounded-full transition-transform duration-700 group-hover:rotate-[8deg] ${
            royal ? 'bg-maroon-deep/60 text-gold-light ring-1 ring-gold-light/40' : 'bg-cream text-gold ring-1 ring-gold/30'
          }`}
        >
          <EventIcon name={event.icon} className="h-14 w-14" />
        </div>
        <h4 className={`relative mt-6 font-display text-lg tracking-[0.18em] uppercase ${royal ? 'text-gold-pale' : 'text-maroon'}`}>{event.name}</h4>
        <p className={`relative mt-3 inline-flex items-center gap-2 font-display text-sm tracking-[0.2em] ${royal ? 'text-gold-light' : 'text-gold'}`}>
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          {event.time}
        </p>
        <span className={`relative my-4 h-px w-12 ${royal ? 'bg-gold-light/50' : 'bg-gold/50'}`} aria-hidden="true" />
        <p className={`relative text-[17px] leading-relaxed italic ${royal ? 'text-champagne/85' : 'text-ink-soft'}`}>{event.description}</p>
      </div>
    </motion.article>
  )
}
