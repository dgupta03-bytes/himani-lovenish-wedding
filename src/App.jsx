import { useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import DoorsIntro from './components/DoorsIntro'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Countdown from './components/Countdown'
import ScratchCard from './components/ScratchCard'
import OurStory from './components/OurStory'
import WeddingCelebrations from './components/WeddingCelebrations'
import DressCode from './components/DressCode'
import Venue from './components/Venue'
import Gallery from './components/Gallery'
import FromOurInvitation from './components/FromOurInvitation'
import FinalInvitation from './components/FinalInvitation'
import MusicToggle from './components/MusicToggle'
import CursorGlow from './components/CursorGlow'
import { FloatingPetals } from './components/Decor'
import { music } from './lib/music'

export default function App() {
  const [intro, setIntro] = useState(true) // doors/curtains overlay is showing
  const [opened, setOpened] = useState(false) // site is mounted behind the curtains

  // Keep the page still while the intro is on screen
  useEffect(() => {
    document.body.classList.toggle('locked', intro)
  }, [intro])

  // Start fetching the song; if this browser already allows autoplay, it starts right away.
  // Otherwise it starts on the guest's "Tap to open".
  useEffect(() => {
    music.preload()
    music.play()
  }, [])

  const reveal = () => {
    window.scrollTo(0, 0)
    setOpened(true)
  }

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{intro && <DoorsIntro key="intro" onReveal={reveal} onDone={() => setIntro(false)} />}</AnimatePresence>

      {opened && (
        <>
          <Navigation />
          <FloatingPetals />
          <main>
            <Hero />
            <ScratchCard />
            <Countdown />
            <OurStory />
            <WeddingCelebrations />
            <DressCode />
            <Venue />
            <Gallery />
            <FromOurInvitation />
            <FinalInvitation />
          </main>
          <MusicToggle />
          <CursorGlow />
        </>
      )}
    </MotionConfig>
  )
}
