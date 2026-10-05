import { motion } from 'framer-motion'
import weddingData from '../data/weddingData'
import { SectionHeading, ease } from './Decor'
import { Lotus } from './Ornaments'

function MoodCard({ item, index }) {
  const [main, accent, light] = item.swatches
  return (
    <motion.article
      className="group relative"
      initial={{ opacity: 0, y: 40, rotate: index % 2 ? 1.5 : -1.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.9, delay: (index % 3) * 0.12, ease }}
    >
      <div className="card-shadow overflow-hidden rounded-2xl bg-ivory p-2.5 transition-transform duration-500 group-hover:-translate-y-1.5">
        {/* Fabric swatch */}
        <div className="relative aspect-[5/4] overflow-hidden rounded-xl" style={{ background: `linear-gradient(135deg, ${main} 0%, ${main} 55%, ${accent} 100%)` }}>
          <div className={`fabric-${item.pattern} absolute inset-0 opacity-90 transition-transform duration-[1.5s] group-hover:scale-110`} aria-hidden="true" />
          {/* zari border */}
          <div
            className="absolute inset-x-0 bottom-0 h-7"
            style={{ background: `repeating-linear-gradient(90deg, ${accent} 0 10px, ${light} 10px 12px), ${accent}`, boxShadow: `0 -3px 0 ${light}66` }}
            aria-hidden="true"
          />
          {/* arched label */}
          <div className="absolute inset-x-[20%] top-[26%] bottom-12 flex items-end justify-center rounded-t-[999px] border border-white/60 bg-ivory/90 px-3 pb-4 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.35)]">
            <div className="text-center">
              <Lotus className="mx-auto h-5 w-10 text-gold" />
              <h3 className="mt-2 font-display text-[13px] leading-snug tracking-[0.16em] text-maroon uppercase sm:text-sm">{item.event}</h3>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 px-3 pt-4 pb-2">
          <p className="text-lg leading-snug italic text-ink">{item.attire}</p>
          <div className="flex shrink-0 -space-x-1.5" aria-label="Suggested colours">
            {item.swatches.map((c) => (
              <span key={c} className="h-6 w-6 rounded-full border-2 border-ivory shadow-sm" style={{ background: c }} title={c} />
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default function DressCode() {
  return (
    <section id="dresscode" aria-labelledby="dresscode-title" className="paper relative overflow-hidden px-4 py-24 sm:py-32">
      <SectionHeading id="dresscode-title" eyebrow="The Look Book" title="Dress to Celebrate" subtitle={weddingData.dressCodeNote} />
      <div className="mx-auto mt-16 grid max-w-6xl gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {weddingData.dressCode.map((item, i) => (
          <MoodCard key={item.event} item={item} index={i} />
        ))}
      </div>
    </section>
  )
}
