import weddingData from '../data/weddingData'
import EventCard from './EventCard'
import { DoliFeature, VarmalaFeature } from './FeatureEvents'
import { Reveal, SectionHeading } from './Decor'
import { Corners, Divider, Marigold } from './Ornaments'

const FEATURES = { varmala: VarmalaFeature, doli: DoliFeature }

function DayHeader({ day, royal }) {
  return (
    <div className="relative mx-auto max-w-xl text-center">
      <Reveal as="p" className={`font-display text-xs tracking-[0.45em] uppercase ${royal ? 'text-gold-light' : 'text-gold'}`}>
        {day.label}
      </Reveal>
      <Reveal as="h3" delay={0.1} className={`mt-3 font-display text-[clamp(1.8rem,7vw,3.2rem)] tracking-[0.06em] ${royal ? 'text-gold-pale' : 'text-maroon'}`}>
        {day.date}
      </Reveal>
      <Reveal as="p" delay={0.2} className={`mt-2 font-script text-4xl sm:text-5xl ${royal ? 'text-ivory' : 'text-ink-soft'}`}>
        {day.subtitle}
      </Reveal>
      <Reveal delay={0.3} className="mt-6">
        <Divider tone={royal ? 'text-gold-light' : 'text-gold'} />
      </Reveal>
    </div>
  )
}

export default function WeddingCelebrations() {
  const [day1, day2] = weddingData.days
  const eventsOf = (d) => weddingData.events.filter((e) => e.day === d.day)
  const day1Events = eventsOf(day1)
  const day2Events = eventsOf(day2).filter((e) => !e.feature)
  const features = weddingData.events.filter((e) => e.feature && FEATURES[e.feature])

  return (
    <section id="celebrations" aria-labelledby="celebrations-title">
      {/* Intro + Day 1 */}
      <div className="paper relative overflow-hidden px-4 py-24 sm:py-32" style={{ backgroundColor: '#f8efe6' }}>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-blush/50 to-transparent" aria-hidden="true" />
        <div className="relative">
          <SectionHeading id="celebrations-title" eyebrow="Join us for" title="The Wedding Celebrations" subtitle="Two days of love, laughter, music and memories." />

          <div className="mt-20">
            <DayHeader day={day1} />
            <div className="mx-auto mt-14 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {day1Events.map((e, i) => (
                <EventCard key={`${e.name}-${e.time}`} event={e} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Day 2 — grander */}
      <div
        className="relative overflow-hidden px-4 py-24 sm:py-32"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, #7a1a2b 0%, #4a0d18 60%, #2a0811 100%)' }}
      >
        <div className="fabric-brocade pointer-events-none absolute inset-0 opacity-25" aria-hidden="true" />
        <Corners className="h-16 w-16 text-gold-light/50 sm:h-24 sm:w-24" inset="inset-4 sm:inset-8" />
        <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center gap-3 sm:gap-5" aria-hidden="true">
          {Array.from({ length: 11 }, (_, i) => (
            <Marigold key={i} className={`-mt-2 h-6 w-6 ${i % 2 ? 'hidden sm:block' : ''}`} color={i % 2 ? '#F2C14E' : '#E98A2C'} />
          ))}
        </div>
        <div className="relative">
          <DayHeader day={day2} royal />
          <div className="mx-auto mt-14 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {day2Events.map((e, i) => (
              <EventCard key={`${e.name}-${e.time}`} event={e} index={i} variant="royal" />
            ))}
          </div>
          <Reveal as="p" className="mt-16 text-center font-display text-xs tracking-[0.4em] text-gold-light/80 uppercase">
            And then, under the stars…
          </Reveal>
        </div>
      </div>

      {features.map((e) => {
        const Feature = FEATURES[e.feature]
        return <Feature key={e.name} event={e} />
      })}
    </section>
  )
}
