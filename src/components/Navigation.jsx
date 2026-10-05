import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import weddingData from '../data/weddingData'
import { Mandala } from './Ornaments'
import { ease } from './Decor'

const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'story', label: 'Our Story' },
  { id: 'celebrations', label: 'Celebrations' },
  { id: 'dresscode', label: 'Dress Code' },
  { id: 'venue', label: 'Venue' },
  { id: 'gallery', label: 'Gallery' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight the section currently crossing the middle of the viewport
  useEffect(() => {
    const els = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.body.classList.add('locked')
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('locked')
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const go = (id) => (e) => {
    e.preventDefault()
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    history.replaceState(null, '', `#${id}`)
  }

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-40 flex justify-center px-3 pt-3"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6, ease }}
      >
        <nav
          aria-label="Main"
          className={`flex w-full max-w-5xl items-center justify-between rounded-full px-4 py-2 transition-all duration-500 md:w-auto md:justify-center md:px-2 ${
            scrolled ? 'border border-gold/30 bg-ivory/85 shadow-[0_8px_30px_-12px_rgba(67,11,22,0.35)] backdrop-blur-md' : 'border border-transparent'
          }`}
        >
          <a href="#home" onClick={go('home')} className="font-script text-2xl text-maroon md:hidden" aria-label="Back to top">
            H <span className="text-gold">&amp;</span> L
          </a>
          <ul className="hidden items-center md:flex">
            {LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={go(l.id)}
                  aria-current={active === l.id ? 'true' : undefined}
                  className={`relative block rounded-full px-4 py-2 font-display text-[11px] tracking-[0.25em] uppercase transition-colors ${
                    active === l.id ? 'text-maroon' : 'text-ink-soft hover:text-maroon'
                  }`}
                >
                  {active === l.id && (
                    <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-gold-pale/60" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                  )}
                  <span className="relative">{l.label}</span>
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className={`grid h-11 w-11 place-items-center rounded-full text-maroon md:hidden ${scrolled ? '' : 'bg-ivory/70 backdrop-blur'}`}
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="paper fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <Mandala className="animate-spin-slow pointer-events-none absolute h-[120vmin] w-[120vmin] text-gold/15" strokeWidth={0.25} />
            <button
              type="button"
              className="absolute top-4 right-4 grid h-11 w-11 place-items-center rounded-full border border-gold/40 text-maroon"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              autoFocus
            >
              <X className="h-5 w-5" />
            </button>
            <p className="relative font-script text-4xl text-maroon">
              {weddingData.brideShort} <span className="text-gold">&amp;</span> {weddingData.groomShort}
            </p>
            <ul className="relative mt-10 space-y-2 text-center">
              {LINKS.map((l, i) => (
                <motion.li key={l.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i + 0.1, ease }}>
                  <a
                    href={`#${l.id}`}
                    onClick={go(l.id)}
                    className={`block px-6 py-2.5 font-display text-lg tracking-[0.25em] uppercase ${active === l.id ? 'text-maroon' : 'text-ink-soft'}`}
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
