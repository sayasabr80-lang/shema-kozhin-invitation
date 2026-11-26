import { motion } from 'framer-motion'
import { invitationData } from '../data/invitationData'
import Reveal, { LUXURY_EASE } from './Reveal'

/**
 * Custom SVG of two interlocking antique-gold wedding rings (one topped with a diamond).
 */
function InterlockingRings() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.85, ease: LUXURY_EASE }}
      style={{
        position: 'relative',
        width: 72,
        height: 62,
        margin: '0 auto 18px',
        overflow: 'hidden',
      }}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 86 72"
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <defs>
          <linearGradient id="ringGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--gold-ring-light)" />
            <stop offset="50%" stopColor="var(--gold-solid)" />
            <stop offset="100%" stopColor="var(--gold-ring-dark)" />
          </linearGradient>
        </defs>

        {/* Left Wedding Band */}
        <circle
          cx="32"
          cy="43"
          r="19"
          fill="none"
          stroke="url(#ringGoldGrad)"
          strokeWidth="5.2"
        />

        {/* Right Wedding Band with Diamond */}
        <circle
          cx="54"
          cy="43"
          r="19"
          fill="none"
          stroke="url(#ringGoldGrad)"
          strokeWidth="5.2"
        />

        {/* Subtle interlocking overlap stroke */}
        <path
          d="M 43,27 A 19,19 0 0 1 51,43"
          fill="none"
          stroke="var(--bg-champagne)"
          strokeWidth="2.2"
          opacity="0.7"
        />
        <path
          d="M 42,27 A 19,19 0 0 1 51,43"
          fill="none"
          stroke="url(#ringGoldGrad)"
          strokeWidth="5.2"
          strokeLinecap="round"
        />

        {/* Diamond Crown on Right Ring */}
        <g transform="translate(54, 15)">
          <polygon
            points="-9,-3 9,-3 5,-9 -5,-9"
            fill="none"
            stroke="url(#ringGoldGrad)"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          <polygon
            points="-9,-3 9,-3 0,6"
            fill="none"
            stroke="url(#ringGoldGrad)"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
        </g>
      </svg>

      {/* Subtle metallic shimmer sweep across the rings */}
      <div className="rings-shimmer-bar" aria-hidden="true" />
    </motion.div>
  )
}

function renderCreditText(text, highlight, instagramUrl) {
  if (!highlight) return text
  const idx = text.indexOf(highlight)
  if (idx === -1) return text
  return (
    <>
      {text.slice(0, idx)}
      <a
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: 'var(--gold-warm)',
          fontWeight: 700,
          textDecoration: 'none',
        }}
      >
        {highlight}
      </a>
      {text.slice(idx + highlight.length)}
    </>
  )
}

/**
 * Champagne Beige Footer with Interlocking Rings, Linked Credit, & Instagram Icon.
 */
function Footer() {
  const { footerCreditText, footerCreditHighlight, instagramUrl } = invitationData

  return (
    <footer
      aria-label="پێی لاپەڕە"
      style={{
        backgroundColor: 'var(--bg-champagne)',
        paddingTop: 34,
        paddingBottom: 46,
        paddingInline: 24,
        textAlign: 'center',
      }}
    >
      <InterlockingRings />

      <Reveal delay={0.1}>
        <p
          style={{
            margin: '0 auto 18px',
            fontSize: '0.84rem',
            lineHeight: 1.85,
            color: 'var(--brown-footer)',
          }}
        >
          {renderCreditText(footerCreditText, footerCreditHighlight, instagramUrl)}
        </p>
      </Reveal>

      {/* Centered Thin Gold Outline Instagram Icon */}
      <Reveal delay={0.18}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <motion.a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="ئینستاگرام - Infora.krd By Saya"
            whileHover={{ scale: 1.12, y: -1 }}
            whileTap={{ scale: 0.94 }}
            style={{
              color: 'var(--gold)',
              display: 'inline-flex',
              padding: 4,
            }}
          >
            <svg
              aria-hidden="true"
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
              <circle cx="12" cy="12" r="4.2" />
              <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
            </svg>
          </motion.a>
        </div>
      </Reveal>
    </footer>
  )
}

export default Footer
