import { useEffect, useRef, useState } from 'react'
import { invitationData } from '../data/invitationData'
import OrnateButton from './OrnateButton'
import PaperDivider from './PaperDivider'
import Reveal from './Reveal'

function FrameFloralFlourish({ position = 'top' }) {
  const isBottom = position === 'bottom'
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 110 22"
      style={{
        position: 'absolute',
        left: '50%',
        [isBottom ? 'bottom' : 'top']: -11,
        transform: `translateX(-50%) ${isBottom ? 'scaleY(-1)' : ''}`,
        width: 96,
        height: 20,
        pointerEvents: 'none',
        zIndex: 3,
      }}
    >
      <g
        fill="none"
        stroke="var(--gold-solid)"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M55 15 C55 9, 51 5, 55 3 C59 5, 55 9, 55 15 Z" fill="var(--bg-cream)" />
        <path d="M55 15 C51 11, 47 10, 46 13 C48 15, 52 15, 55 15 Z" fill="var(--gold-fill-soft)" />
        <path d="M55 15 C59 11, 63 10, 64 13 C62 15, 58 15, 55 15 Z" fill="var(--gold-fill-soft)" />
        <path d="M47 16 C40 16, 36 9, 29 10 C24 11, 23 15, 27 16 C30 16, 31 13, 28 12" />
        <path d="M63 16 C70 16, 74 9, 81 10 C86 11, 87 15, 83 16 C80 16, 79 13, 82 12" />
        <path d="M37 13 C35 8, 30 6, 26 7" />
        <path d="M73 13 C75 8, 80 6, 84 7" />
      </g>
    </svg>
  )
}

/**
 * Section 5: Venue Location, Ornate Gold Map Frame, & Google Maps Link.
 * Defers mounting the heavy Google Maps iframe until scrolled within 350px.
 */
function LocationSection() {
  const { locationTitle, venueName, mapEmbedUrl, mapDirectLink, mapButtonText } = invitationData
  const mapHostRef = useRef(null)
  const [shouldLoadMap, setShouldLoadMap] = useState(false)

  useEffect(() => {
    const node = mapHostRef.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      setShouldLoadMap(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoadMap(true)
          observer.disconnect()
        }
      },
      { rootMargin: '350px 0px' }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      className="below-fold-section"
      aria-label={locationTitle}
      style={{
        position: 'relative',
        backgroundColor: 'var(--bg-cream)',
        paddingBottom: 74,
        textAlign: 'center',
      }}
    >
      {/* Subtle torn watercolor transition into cream */}
      <PaperDivider topColor="var(--bg-blush)" bottomColor="var(--bg-cream)" variant={0} />

      <div style={{ paddingTop: 22, paddingInline: 24 }}>
        <Reveal>
          <h2
            className="heading-calligraphic"
            style={{
              fontSize: 'clamp(1.78rem, 6.4vw, 2.1rem)',
              color: 'var(--gold)',
              marginBottom: 8,
            }}
          >
            {locationTitle}
          </h2>
          <p
            style={{
              margin: '0 0 30px',
              fontSize: '0.96rem',
              fontWeight: 600,
              color: 'var(--brown-body)',
            }}
          >
            {venueName}
          </p>
        </Reveal>

        {/* Square Ornate Gold-Framed Map Card (fixed 306px height prevents layout shift) */}
        <Reveal delay={0.12}>
          <div
            ref={mapHostRef}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: 314,
              margin: '0 auto 32px',
              padding: 2,
              borderRadius: 16,
              border: '1.25px solid var(--gold-solid)',
              backgroundColor: 'var(--bg-cream)',
              boxShadow: '0 10px 28px var(--shadow-warm-md)',
            }}
          >
            <FrameFloralFlourish position="top" />
            <div
              style={{
                borderRadius: 14,
                overflow: 'hidden',
                height: 306,
                backgroundColor: 'var(--bg-map-placeholder)',
              }}
            >
              {shouldLoadMap ? (
                <iframe
                  title={`نەخشەی شوێنی ئاهەنگ - ${venueName}`}
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: 'block' }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              ) : null}
            </div>
            <FrameFloralFlourish position="bottom" />
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <OrnateButton href={mapDirectLink} target="_blank" rel="noopener noreferrer">
            {mapButtonText}
          </OrnateButton>
        </Reveal>
      </div>

      {/* Torn-paper divider into Section 6 */}
      <PaperDivider topColor="transparent" bottomColor="var(--bg-blush)" variant={1} overlap />
    </section>
  )
}

export default LocationSection
