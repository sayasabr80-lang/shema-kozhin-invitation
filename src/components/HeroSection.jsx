import { motion } from 'framer-motion'
import heroBg from '../assets/hero-bg.jpg'
import { invitationData } from '../data/invitationData'
import { formatHeroDate } from '../utils/dateUtils'
import PaperDivider from './PaperDivider'
import { LUXURY_EASE } from './Reveal'

const PETALS = [
  { id: 1, right: '16%', size: 11, delay: '0s', duration: '9.5s', opacity: 0.78 },
  { id: 2, right: '28%', size: 9, delay: '1.8s', duration: '11s', opacity: 0.62 },
  { id: 3, right: '40%', size: 13, delay: '3.6s', duration: '10.2s', opacity: 0.72 },
  { id: 4, right: '52%', size: 8, delay: '0.9s', duration: '12s', opacity: 0.56 },
  { id: 5, right: '64%', size: 12, delay: '2.7s', duration: '9.8s', opacity: 0.68 },
  { id: 6, right: '76%', size: 10, delay: '4.4s', duration: '11.4s', opacity: 0.6 },
  { id: 7, right: '24%', size: 8, delay: '5.5s', duration: '10.8s', opacity: 0.54 },
  { id: 8, right: '46%', size: 10, delay: '6.8s', duration: '11.8s', opacity: 0.64 },
]

/**
 * Section 2: Full-viewport Hero Section — Classical Stone Arch, Blush Roses, & Twin Swans.
 */
function HeroSection({ isOpening, isOpened }) {
  const {
    eventTitle,
    eventDateISO,
    groomName,
    brideName,
    scrollIndicatorText,
    mediaPaths,
  } = invitationData

  const formattedDate = formatHeroDate(eventDateISO)
  const isRevealing = isOpening || isOpened

  const scrollToDetails = () => {
    const target = document.getElementById('invitation-details')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.section
      aria-label="پێشوازی ئاهەنگ"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={isRevealing ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
      transition={{ duration: 0.7, delay: isOpened ? 0 : 0.25, ease: LUXURY_EASE }}
      style={{
        position: 'relative',
        width: '100%',
        height: '100svh',
        minHeight: 700,
        overflow: 'hidden',
        backgroundColor: 'var(--bg-blush)',
      }}
    >
      {/* Ken Burns Animated Background & Classical Arch/Swans Image */}
      <motion.div
        animate={{ scale: [1, 1.06] }}
        transition={{ duration: 18, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          transformOrigin: 'center center',
        }}
      >
        <img
          src={heroBg}
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        />

        {/* MEDIA SLOT: Set invitationData.mediaPaths.heroVideo to overlay a looping video */}
        <div
          data-media-slot="hero-video"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            pointerEvents: 'none',
            overflow: 'hidden',
          }}
        >
          {mediaPaths.heroVideo ? (
            <video
              src={mediaPaths.heroVideo}
              autoPlay
              loop
              muted
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : null}
        </div>
      </motion.div>

      {/* Ambient Drifting White Blossom Petals */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 4 }}>
        {PETALS.map((petal) => (
          <svg
            key={petal.id}
            viewBox="0 0 20 20"
            className="hero-petal"
            style={{
              right: petal.right,
              width: petal.size,
              height: petal.size,
              animationDelay: petal.delay,
              animationDuration: petal.duration,
              opacity: petal.opacity,
            }}
          >
            <path
              d="M10,1 C14,4 17,9 14,15 C11,19 5,18 4,13 C3,8 6,3 10,1 Z"
              fill="var(--petal-ivory)"
            />
          </svg>
        ))}
      </div>

      {/* Top Center Overlay Inside Arch */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={isOpened ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
        transition={{ duration: 0.85, delay: 0.1, ease: LUXURY_EASE }}
        style={{
          position: 'absolute',
          top: '14%',
          left: 0,
          right: 0,
          zIndex: 5,
          textAlign: 'center',
          paddingInline: 24,
        }}
      >
        <h1
          className="heading-calligraphic"
          style={{
            fontSize: 'clamp(1.68rem, 6.2vw, 2.08rem)',
            color: 'var(--gold-hero-title)',
            marginBottom: 4,
            textShadow: '0 1px 12px var(--hero-text-halo)',
          }}
        >
          {eventTitle}
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: 'clamp(0.88rem, 3.5vw, 1.02rem)',
            fontWeight: 600,
            color: 'var(--brown-hero-date)',
            letterSpacing: '0.01em',
            textShadow: '0 1px 10px var(--hero-text-halo)',
          }}
        >
          {formattedDate}
        </p>
      </motion.div>

      {/* Center Staggered Couple Names */}
      <div
        style={{
          position: 'absolute',
          top: '33%',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 5,
          width: '100%',
          maxWidth: 318,
          paddingInline: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: 26 }}
          animate={isOpened ? { opacity: 1, x: 0 } : { opacity: 0, x: 26 }}
          transition={{ duration: 0.9, delay: 0.25, ease: LUXURY_EASE }}
          style={{
            alignSelf: 'flex-start',
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(3.05rem, 12.2vw, 3.85rem)',
            fontWeight: 700,
            color: 'var(--bronze)',
            lineHeight: 1.05,
            textShadow: '0 2px 16px var(--hero-text-halo)',
          }}
        >
          {groomName}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={isOpened ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.88 }}
          transition={{ duration: 0.8, delay: 0.45, ease: LUXURY_EASE }}
          style={{
            alignSelf: 'center',
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.75rem, 6.5vw, 2.2rem)',
            fontWeight: 700,
            color: 'var(--bronze)',
            lineHeight: 1,
            marginBlock: 2,
            textShadow: '0 2px 12px var(--hero-text-halo)',
          }}
        >
          و
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -26 }}
          animate={isOpened ? { opacity: 1, x: 0 } : { opacity: 0, x: -26 }}
          transition={{ duration: 0.9, delay: 0.6, ease: LUXURY_EASE }}
          style={{
            alignSelf: 'flex-end',
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(3.05rem, 12.2vw, 3.85rem)',
            fontWeight: 700,
            color: 'var(--bronze)',
            lineHeight: 1.05,
            textShadow: '0 2px 16px var(--hero-text-halo)',
          }}
        >
          {brideName}
        </motion.div>
      </div>

      {/* Lower Center Scroll Indicator Above Swans */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isOpened ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.9, delay: 0.8, ease: LUXURY_EASE }}
        style={{
          position: 'absolute',
          bottom: '26%',
          left: 0,
          right: 0,
          zIndex: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <button
          type="button"
          onClick={scrollToDetails}
          aria-label="وەرە خوارەوە بۆ زانیاریەکان"
          style={{
            background: 'transparent',
            border: 'none',
            padding: '6px 14px',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            color: 'var(--brown-hero-scroll)',
            fontFamily: 'var(--font-body)',
            textShadow: '0 1px 10px var(--hero-text-halo)',
          }}
        >
          <span style={{ fontSize: '0.88rem', fontWeight: 500 }}>{scrollIndicatorText}</span>
          <motion.svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <polyline points="6 7 12 13 18 7" />
            <polyline points="6 13 12 19 18 13" />
          </motion.svg>
        </button>
      </motion.div>

      {/* Torn watercolor paper edge transition into Section 3 */}
      <PaperDivider topColor="transparent" bottomColor="var(--bg-blush)" variant={0} overlap />
    </motion.section>
  )
}

export default HeroSection
