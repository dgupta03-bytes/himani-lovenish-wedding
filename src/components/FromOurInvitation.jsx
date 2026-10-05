import weddingData from '../data/weddingData'
import { Reveal, SectionHeading } from './Decor'

/** Shows a photo/scan of the printed card. Hidden when weddingData.invitationImage is null. */
export default function FromOurInvitation() {
  const src = weddingData.invitationImage
  if (!src) return null
  return (
    <section aria-labelledby="invitation-title" className="bg-cream px-4 py-24 sm:py-32">
      <SectionHeading id="invitation-title" eyebrow="Keepsake" title="From Our Invitation" />
      <Reveal className="mx-auto mt-14 max-w-2xl">
        <a href={src} target="_blank" rel="noopener noreferrer" className="block">
          <img src={src} alt="The printed wedding invitation of Himani and Lovenish" loading="lazy" className="card-shadow w-full rounded-md" />
        </a>
        <p className="mt-4 text-center text-sm italic text-ink-soft">Tap to view full size</p>
      </Reveal>
    </section>
  )
}
