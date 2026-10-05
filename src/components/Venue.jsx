import { CalendarPlus, MapPin, Navigation as NavIcon } from 'lucide-react'
import weddingData from '../data/weddingData'
import { Reveal, SectionHeading } from './Decor'
import { Corners, PalaceSilhouette } from './Ornaments'

const { venue } = weddingData
const query = encodeURIComponent([venue.name, venue.address, venue.city, venue.state].filter(Boolean).join(', '))
const directionsUrl = venue.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${query}`
const embedUrl = venue.mapsEmbedUrl || `https://www.google.com/maps?q=${query}&output=embed`

/** Builds an .ics file with every function so guests can add them to their calendar. */
function downloadCalendar() {
  const pad = (n) => String(n).padStart(2, '0')
  const toUTC = (d) =>
    `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`
  const location = [venue.name, venue.address, venue.city, venue.state].filter(Boolean).join(', ')
  const parseTime = (dayNumber, time) => {
    const m = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec(time)
    // midnight IST of the event's day, counted from weddingDates.start
    const day = new Date(new Date(`${weddingData.weddingDates.start}T00:00:00+05:30`).getTime() + (dayNumber - 1) * 86400000)
    if (!m) return { start: new Date(day.getTime() + 23 * 3600000), hours: 1 } // e.g. "Taaron Ki Chhaon Mein"
    let h = Number(m[1]) % 12
    if (m[3].toUpperCase() === 'PM') h += 12
    return { start: new Date(day.getTime() + (h * 60 + Number(m[2])) * 60000), hours: 1.5 }
  }
  const events = weddingData.events.map((e, i) => {
    const { start, hours } = parseTime(e.day, e.time)
    const end = new Date(start.getTime() + hours * 3600000)
    return [
      'BEGIN:VEVENT',
      `UID:${weddingData.weddingDates.start}-${i}@himani-lovenish`,
      `DTSTAMP:${toUTC(new Date())}`,
      `DTSTART:${toUTC(start)}`,
      `DTEND:${toUTC(end)}`,
      `SUMMARY:${e.name} · ${weddingData.brideShort} & ${weddingData.groomShort}`,
      `LOCATION:${location.replace(/,/g, '\\,')}`,
      `DESCRIPTION:${e.description.replace(/,/g, '\\,')}`,
      'END:VEVENT',
    ].join('\r\n')
  })
  const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Himani & Lovenish//Wedding//EN', ...events, 'END:VCALENDAR'].join('\r\n')
  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }))
  const a = Object.assign(document.createElement('a'), { href: url, download: 'himani-lovenish-wedding.ics' })
  a.click()
  URL.revokeObjectURL(url)
}

export default function Venue() {
  return (
    <section id="venue" aria-labelledby="venue-title" className="relative overflow-hidden bg-cream px-4 py-24 sm:py-32">
      <SectionHeading id="venue-title" eyebrow="Where" title="The Celebration Awaits" />

      <div className="mx-auto mt-16 grid max-w-6xl items-stretch gap-8 lg:grid-cols-2">
        <Reveal className="relative">
          <div className="card-shadow relative h-full overflow-hidden rounded-t-[999px] rounded-b-3xl bg-ivory p-3">
            <div className="relative h-full overflow-hidden rounded-t-[999px] rounded-b-2xl">
              <img src={venue.image} alt={`${venue.name}, ${venue.city}`} loading="lazy" width="900" height="1100" className="aspect-[4/5] h-full w-full object-cover lg:aspect-auto" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-maroon-deep/90 via-maroon-deep/40 to-transparent px-6 pt-24 pb-8 text-center text-ivory">
                <p className="font-display text-[11px] tracking-[0.45em] text-gold-light uppercase">The Venue</p>
                <h3 className="mt-2 font-script text-[clamp(2.4rem,9vw,3.6rem)] leading-tight text-gold-pale">{venue.name}</h3>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="flex flex-col gap-6">
          <div className="paper relative rounded-3xl p-8 text-center card-shadow sm:p-10" style={{ '--card-bg': '#fbf6ec' }}>
            <Corners className="h-10 w-10 text-gold sm:h-12 sm:w-12" />
            <MapPin className="mx-auto h-8 w-8 text-gold" aria-hidden="true" />
            <h3 className="mt-4 font-display text-2xl tracking-[0.08em] text-maroon sm:text-3xl">{venue.name}</h3>
            <p className="mt-3 text-xl italic text-ink-soft">
              {venue.address ? `${venue.address}, ` : ''}
              {venue.city}, {venue.state}
            </p>
            {!venue.address && <p className="mt-1 text-sm text-ink-soft/70">Full address will be shared soon.</p>}
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-maroon px-7 font-display text-xs tracking-[0.25em] text-gold-pale uppercase shadow-[0_10px_24px_-10px_rgba(67,11,22,0.7)] transition hover:bg-maroon-deep"
              >
                <NavIcon className="h-4 w-4" aria-hidden="true" /> Get Directions
              </a>
              <button
                type="button"
                onClick={downloadCalendar}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-gold/60 px-7 font-display text-xs tracking-[0.25em] text-maroon uppercase transition hover:bg-gold-pale/40"
              >
                <CalendarPlus className="h-4 w-4" aria-hidden="true" /> Add to Calendar
              </button>
            </div>
          </div>

          <div className="card-shadow relative min-h-[280px] flex-1 overflow-hidden rounded-3xl border border-gold/30 bg-champagne/40">
            <iframe
              title={`Map showing ${venue.name}, ${venue.city}`}
              src={embedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0 grayscale-[35%] sepia-[25%]"
              allowFullScreen
            />
          </div>
        </Reveal>
      </div>

      <PalaceSilhouette className="pointer-events-none absolute inset-x-0 bottom-0 h-20 w-full text-champagne/60" />
    </section>
  )
}
