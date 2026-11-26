import { useEffect, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { invitationData } from './data/invitationData'
import EnvelopeCover from './components/EnvelopeCover'
import HeroSection from './components/HeroSection'
import InvitationDetails from './components/InvitationDetails'
import CalendarSection from './components/CalendarSection'
import LocationSection from './components/LocationSection'
import DedicationSection from './components/DedicationSection'
import Footer from './components/Footer'
import MusicToggle from './components/MusicToggle'

function App() {
  const [isOpening, setIsOpening] = useState(false)
  const [isOpened, setIsOpened] = useState(false)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const openTimerRef = useRef(null)
  const playerControllerRef = useRef(null)

  useEffect(() => {
    document.title = `${invitationData.groomName} و ${invitationData.brideName} | ${invitationData.eventTitle}`
  }, [])

  // Lock page scroll until the wax-sealed envelope opening completes
  useEffect(() => {
    if (!isOpened) {
      document.body.classList.add('scroll-locked')
    } else {
      document.body.classList.remove('scroll-locked')
    }
    return () => {
      document.body.classList.remove('scroll-locked')
    }
  }, [isOpened])

  useEffect(() => {
    return () => {
      if (openTimerRef.current) {
        clearTimeout(openTimerRef.current)
      }
    }
  }, [])

  const handleOpenEnvelope = () => {
    if (isOpening || isOpened) return
    setIsOpening(true)
    setIsMusicPlaying(true)
    // Start music synchronously inside the click gesture for mobile/Safari autoplay support
    playerControllerRef.current?.play()
    // Safety fallback unlock if animation callback is interrupted
    openTimerRef.current = setTimeout(() => {
      setIsOpened(true)
    }, 3550)
  }

  const handleRevealComplete = () => {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current)
      openTimerRef.current = null
    }
    setIsOpened(true)
  }

  return (
    <div className="app-backdrop">
      <main className="invitation-frame">
        {/* Section 1: Sealed Envelope Lock Screen */}
        <AnimatePresence>
          {!isOpened ? (
            <EnvelopeCover
              isOpening={isOpening}
              onOpen={handleOpenEnvelope}
              onRevealComplete={handleRevealComplete}
            />
          ) : null}
        </AnimatePresence>

        {/* Section 2: Hero Section — Archway & Swans */}
        <HeroSection isOpening={isOpening} isOpened={isOpened} />

        {/* Section 3: Quranic Verse, Host Parents, & Couple Illustration */}
        <InvitationDetails />

        {/* Section 4: Calendar Card & Live Countdown */}
        <CalendarSection />

        {/* Section 5: Venue Location & Map */}
        <LocationSection />

        {/* Section 6: Poetic Dedication (connects seamlessly to Footer) */}
        <DedicationSection />

        {/* Section 7: Footer */}
        <Footer />

        {/* Background audio & Floating Music Control (visible once opened) */}
        <MusicToggle
          isVisible={isOpened}
          isPlaying={isMusicPlaying}
          onToggle={() => setIsMusicPlaying((prev) => !prev)}
          audioSrc={invitationData.mediaPaths.backgroundMusic}
          startSeconds={invitationData.mediaPaths.backgroundMusicStartSeconds}
          playerControllerRef={playerControllerRef}
        />
      </main>
    </div>
  )
}

export default App
