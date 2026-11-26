import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import { invitationData } from './data/invitationData'
import EnvelopeCover from './components/EnvelopeCover'
import HeroSection from './components/HeroSection'
import MusicToggle from './components/MusicToggle'

const loadInvitationDetails = () => import('./components/InvitationDetails')
const loadCalendarSection = () => import('./components/CalendarSection')
const loadLocationSection = () => import('./components/LocationSection')
const loadDedicationSection = () => import('./components/DedicationSection')
const loadFooter = () => import('./components/Footer')

const InvitationDetails = lazy(loadInvitationDetails)
const CalendarSection = lazy(loadCalendarSection)
const LocationSection = lazy(loadLocationSection)
const DedicationSection = lazy(loadDedicationSection)
const Footer = lazy(loadFooter)

function preloadBelowFoldSections() {
  loadInvitationDetails()
  loadCalendarSection()
  loadLocationSection()
  loadDedicationSection()
  loadFooter()
}

function App() {
  const [isOpening, setIsOpening] = useState(false)
  const [isOpened, setIsOpened] = useState(false)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const openTimerRef = useRef(null)
  const playerControllerRef = useRef(null)

  useEffect(() => {
    document.title = `${invitationData.groomName} و ${invitationData.brideName} | ${invitationData.eventTitle}`
  }, [])

  // Preload below-the-fold sections during browser idle so initial mobile load is instant
  useEffect(() => {
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const id = window.requestIdleCallback(preloadBelowFoldSections, { timeout: 1500 })
      return () => window.cancelIdleCallback(id)
    }
    const id = setTimeout(preloadBelowFoldSections, 800)
    return () => clearTimeout(id)
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
    preloadBelowFoldSections()
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
    <MotionConfig reducedMotion="user">
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

          {/* Below-the-fold sections lazy-loaded with fixed fallback height to prevent layout shift */}
          <Suspense fallback={<div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-blush)' }} />}>
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
          </Suspense>

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
    </MotionConfig>
  )
}

export default App
