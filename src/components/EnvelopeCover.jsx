import { motion } from 'framer-motion'
import envelopeBg from '../assets/envelope-bg.jpg'
import { invitationData } from '../data/invitationData'
import { LUXURY_EASE } from './Reveal'

/**
 * Section 1: Sealed 4-flap X-folded embossed envelope with golden seam illumination
 * and seamless crossfade reveal into the Hero section.
 *
 * Timeline on click:
 * 1. 0.0s - 0.3s: Button fades out & background music starts.
 * 2. 0.3s - 1.8s: Golden light blooms behind wax seal & glows along diagonal seams;
 *                 top triangle brightens slightly while bottom triangle darkens.
 * 3. 1.8s - 3.0s: Entire envelope crossfades from opacity 1 -> 0 (0.95s App timer + 0.85s exit delay + 1.2s exit).
 */
function EnvelopeCover({ isOpening, onOpen }) {
  const { sealInitials, openButtonText, mediaPaths } = invitationData
  const trimmedInitials = String(sealInitials || 'Sh,K').trim()
  const monogramFontSize =
    trimmedInitials.length <= 2 ? '54px' : trimmedInitials.length <= 4 ? '36px' : '28px'

  return (
    <motion.section
      key="envelope-cover"
      aria-label="بەرگی نامەی بانگهێشتنامە"
      className="envelope-cover-stage"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { delay: 0.85, duration: 1.2, ease: LUXURY_EASE },
      }}
      style={{
        pointerEvents: isOpening ? 'none' : 'auto',
      }}
    >
      {/* 4-Flap X-Folded Embossed Ivory Envelope Base */}
      <img
        src={envelopeBg}
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center center',
          zIndex: 0,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      />

      {/* MEDIA SLOT: Place an envelope opening video via invitationData.mediaPaths.envelopeVideo */}
      <div
        data-media-slot="envelope-video"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        {mediaPaths.envelopeVideo ? (
          <video
            src={mediaPaths.envelopeVideo}
            autoPlay
            muted
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : null}
      </div>

      {/* Stage 2: Brighten Top Triangular Flap (0.3s - 1.8s) */}
      <motion.div
        aria-hidden="true"
        className="envelope-top-flap-bright"
        initial={{ opacity: 0 }}
        animate={isOpening ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.5, delay: 0.3, ease: LUXURY_EASE }}
      />

      {/* Stage 2: Darken Bottom Triangular Flap with Deeper Warm Shadow (0.3s - 1.8s) */}
      <motion.div
        aria-hidden="true"
        className="envelope-bottom-flap-shadow"
        initial={{ opacity: 0 }}
        animate={isOpening ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.5, delay: 0.3, ease: LUXURY_EASE }}
      />

      {/* Stage 2: Golden Light Seam Glow & Center Bloom behind Wax Seal (0.3s - 1.8s) */}
      <motion.svg
        aria-hidden="true"
        viewBox="0 0 430 860"
        preserveAspectRatio="none"
        initial={{ opacity: 0 }}
        animate={isOpening ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.5, delay: 0.3, ease: LUXURY_EASE }}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 3,
          pointerEvents: 'none',
        }}
      >
        <defs>
          <radialGradient id="sealGoldenBloom" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--seam-glow-core)" stopOpacity="0.95" />
            <stop offset="45%" stopColor="var(--seam-glow-amber)" stopOpacity="0.62" />
            <stop offset="100%" stopColor="var(--seam-glow-amber)" stopOpacity="0" />
          </radialGradient>
          <filter id="seamBlurHeavy" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
          <filter id="seamBlurMedium" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5.5" />
          </filter>
          <filter id="seamBlurCore" x="-15%" y="-15%" width="130%" height="130%">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>

        {/* Warm golden bloom behind centered wax seal */}
        <motion.circle
          cx="215"
          cy="444"
          r="138"
          fill="url(#sealGoldenBloom)"
          filter="url(#seamBlurHeavy)"
          initial={{ scale: 0.65 }}
          animate={isOpening ? { scale: 1.15 } : { scale: 0.65 }}
          transition={{ duration: 1.5, delay: 0.3, ease: LUXURY_EASE }}
          style={{ transformOrigin: '215px 444px' }}
        />

        {/* Lower diagonal edges: softer warm golden light */}
        <path
          d="M 0,828 L 215,456 L 430,828"
          fill="none"
          stroke="var(--seam-glow-amber)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.34"
          filter="url(#seamBlurMedium)"
        />
        <path
          d="M 0,828 L 215,456 L 430,828"
          fill="none"
          stroke="var(--seam-glow-core)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.45"
          filter="url(#seamBlurCore)"
        />

        {/* Top V-shaped diagonal seams: intense warm golden light */}
        <path
          d="M 0,32 L 215,432 L 430,32"
          fill="none"
          stroke="var(--seam-glow-amber)"
          strokeWidth="22"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.72"
          filter="url(#seamBlurHeavy)"
        />
        <path
          d="M 0,32 L 215,432 L 430,32"
          fill="none"
          stroke="var(--seam-glow-amber)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.9"
          filter="url(#seamBlurMedium)"
        />
        <path
          d="M 0,32 L 215,432 L 430,32"
          fill="none"
          stroke="var(--seam-glow-core)"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.98"
          filter="url(#seamBlurCore)"
        />
      </motion.svg>

      {/* Centered Sh,K Wax Seal (kept in place) & Open Pill Button (fades 0.0s - 0.3s) */}
      <div
        style={{
          position: 'relative',
          zIndex: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 22,
        }}
      >
        {/* 3D Irregular-Edged Burgundy Wax Seal ("Sh,K") */}
        <motion.button
          type="button"
          onClick={() => !isOpening && onOpen()}
          aria-label="کردنەوەی بانگهێشتنامە"
          animate={
            isOpening
              ? { scale: 1 }
              : { scale: [1, 1.04, 1] }
          }
          transition={
            isOpening
              ? { duration: 0.3, ease: LUXURY_EASE }
              : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
          }
          whileHover={!isOpening ? { scale: 1.06 } : undefined}
          whileTap={!isOpening ? { scale: 0.95 } : undefined}
          style={{
            position: 'relative',
            width: 146,
            height: 146,
            border: 'none',
            background: 'transparent',
            padding: 0,
            cursor: isOpening ? 'default' : 'pointer',
            WebkitTapHighlightColor: 'transparent',
            filter: 'drop-shadow(0 16px 24px var(--wax-shadow))',
          }}
        >
          {/* Ambient wax halo shifting into warm golden glow behind seal */}
          <motion.span
            aria-hidden="true"
            animate={
              isOpening
                ? { opacity: 0.95, scale: 1.18 }
                : { opacity: [0.28, 0.58, 0.28], scale: [0.96, 1.08, 0.96] }
            }
            transition={
              isOpening
                ? { duration: 1.5, delay: 0.3, ease: LUXURY_EASE }
                : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
            }
            style={{
              position: 'absolute',
              inset: -16,
              borderRadius: '50%',
              background: isOpening
                ? 'radial-gradient(circle, var(--seam-glow-bloom) 0%, var(--seam-glow-amber-soft) 45%, transparent 72%)'
                : 'radial-gradient(circle, var(--wax-halo) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <svg viewBox="0 0 160 160" style={{ width: '100%', height: '100%', display: 'block' }}>
            <defs>
              <radialGradient id="waxBodyGrad" cx="35%" cy="28%" r="72%">
                <stop offset="0%" stopColor="var(--wax-light)" />
                <stop offset="45%" stopColor="var(--wax-burgundy)" />
                <stop offset="100%" stopColor="var(--wax-dark)" />
              </radialGradient>
              <radialGradient id="waxInnerGrad" cx="56%" cy="58%" r="62%">
                <stop offset="0%" stopColor="var(--wax-inner-center)" />
                <stop offset="72%" stopColor="var(--wax-burgundy)" />
                <stop offset="100%" stopColor="var(--wax-inner-edge)" />
              </radialGradient>
              <linearGradient id="goldMonogramGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--seal-gold-light)" />
                <stop offset="42%" stopColor="var(--seal-gold-mid)" />
                <stop offset="100%" stopColor="var(--seal-gold-dark)" />
              </linearGradient>
              <filter id="monogramEmboss" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow
                  dx="1.2"
                  dy="1.8"
                  stdDeviation="1.1"
                  floodColor="var(--wax-emboss-shadow)"
                  floodOpacity="0.8"
                />
              </filter>
            </defs>

            {/* Organic melted irregular wax rim */}
            <path
              d="M80,10 C94,9 104,17 116,22 C131,28 144,42 144,58 C144,72 152,88 146,104 C140,120 127,132 112,140 C97,148 80,152 62,145 C44,138 28,132 20,116 C12,100 11,83 16,66 C21,50 18,34 31,23 C44,12 64,12 80,10 Z"
              fill="url(#waxBodyGrad)"
              stroke="var(--wax-stroke)"
              strokeWidth="1.4"
            />
            <path
              d="M35,34 C48,19 70,15 90,17 C110,19 125,29 134,44"
              fill="none"
              stroke="var(--wax-highlight)"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            <path
              d="M25,112 C34,128 52,139 74,142"
              fill="none"
              stroke="var(--wax-highlight-soft)"
              strokeWidth="2.4"
              strokeLinecap="round"
            />

            {/* Pressed inner circular stamp ring */}
            <circle
              cx="80"
              cy="80"
              r="50"
              fill="url(#waxInnerGrad)"
              stroke="var(--wax-inner-stroke)"
              strokeWidth="3"
            />
            <circle
              cx="80"
              cy="80"
              r="47"
              fill="none"
              stroke="var(--wax-rim-glow)"
              strokeWidth="1.2"
            />

            {/* Embossed Metallic Gold Cursive Initials */}
            <g filter="url(#monogramEmboss)">
              <text
                x="80"
                y="92"
                textAnchor="middle"
                fill="url(#goldMonogramGrad)"
                style={{
                  fontFamily: 'var(--font-seal)',
                  fontStyle: 'italic',
                  fontWeight: 600,
                  fontSize: monogramFontSize,
                  letterSpacing: '-0.02em',
                }}
              >
                {trimmedInitials}
              </text>
            </g>
          </svg>
        </motion.button>

        {/* Stage 1: Open Pill Button (fades out 0.0s - 0.3s) */}
        <motion.button
          type="button"
          onClick={() => !isOpening && onOpen()}
          whileHover={!isOpening ? { scale: 1.04 } : undefined}
          whileTap={!isOpening ? { scale: 0.96 } : undefined}
          animate={isOpening ? { y: 8, opacity: 0 } : { y: [0, -2, 0], opacity: 1 }}
          transition={
            isOpening
              ? { duration: 0.3, ease: LUXURY_EASE }
              : {
                  y: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
                  scale: { duration: 0.25, ease: LUXURY_EASE },
                }
          }
          style={{
            marginTop: 28,
            minWidth: 114,
            padding: '7px 28px',
            borderRadius: '9999px',
            border: '1px solid var(--open-pill-border)',
            background: 'var(--open-pill-bg)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            boxShadow: '0 4px 14px var(--open-pill-shadow)',
            color: 'var(--open-pill-text)',
            fontFamily: 'var(--font-body)',
            fontSize: '0.96rem',
            fontWeight: 600,
            cursor: isOpening ? 'default' : 'pointer',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          {openButtonText}
        </motion.button>
      </div>
    </motion.section>
  )
}

export default EnvelopeCover
