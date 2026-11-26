import { invitationData } from '../data/invitationData'
import FloralGarland from './FloralGarland'
import PaperDivider from './PaperDivider'
import Reveal from './Reveal'

/**
 * Section 3: Quranic Verse, Host Parents, Warm Messages, & Couple Illustration.
 */
function InvitationDetails() {
  const {
    quranVerse,
    invitationHeader,
    groomFatherLabel,
    groomFatherName,
    brideFatherLabel,
    brideFatherName,
    invitationMessage,
    secondaryMessage,
    mediaPaths,
  } = invitationData

  const verseLines =
    typeof quranVerse === 'string'
      ? quranVerse.split('\n').filter(Boolean)
      : [quranVerse?.basmala, quranVerse?.ayah].filter(Boolean)

  return (
    <section
      id="invitation-details"
      aria-label="زانیاری بانگهێشتنامە"
      style={{
        position: 'relative',
        backgroundColor: 'var(--bg-blush)',
        paddingTop: 58,
        paddingBottom: 56,
        paddingInline: 24,
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Top-left & top-right watercolor rose clusters */}
      <FloralGarland
        style={{ position: 'absolute', top: -10, left: -12, width: 155, height: 155, zIndex: 1 }}
      />
      <FloralGarland
        flipX
        style={{ position: 'absolute', top: -10, right: -12, width: 155, height: 155, zIndex: 1 }}
      />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 382, margin: '0 auto' }}>
        {/* Quranic Verse */}
        <Reveal>
          {verseLines.map((line, index) => (
            <p
              key={index}
              className="quran-text"
              style={
                index === 0
                  ? {
                      fontSize: 'clamp(1.26rem, 4.9vw, 1.5rem)',
                      fontWeight: 700,
                      marginBottom: 8,
                    }
                  : {
                      fontSize: 'clamp(1.02rem, 3.95vw, 1.18rem)',
                      fontWeight: 700,
                      lineHeight: 1.95,
                      marginBottom: 28,
                    }
              }
            >
              {line}
            </p>
          ))}
        </Reveal>

        {/* Invitation Header */}
        <Reveal delay={0.1}>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.32rem, 5vw, 1.54rem)',
              fontWeight: 700,
              color: 'var(--brown-header)',
              margin: '0 0 18px',
            }}
          >
            {invitationHeader}
          </h2>
        </Reveal>

        {/* Two-Column Parent Names (RTL) separated by 1px vertical gold divider */}
        <Reveal delay={0.18}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1px 1fr',
              alignItems: 'center',
              gap: 10,
              marginBottom: 30,
            }}
          >
            {/* Right column in RTL: Groom's father */}
            <div style={{ paddingInline: 6 }}>
              <div
                style={{
                  fontSize: '0.84rem',
                  color: 'var(--brown-label)',
                  marginBottom: 4,
                }}
              >
                {groomFatherLabel}
              </div>
              <div
                className="heading-calligraphic"
                style={{
                  fontSize: 'clamp(1.28rem, 4.8vw, 1.46rem)',
                  color: 'var(--gold)',
                }}
              >
                {groomFatherName}
              </div>
            </div>

            {/* Thin Vertical Gold Divider Line */}
            <div
              aria-hidden="true"
              style={{
                width: 1,
                height: 46,
                backgroundColor: 'var(--gold-border)',
                opacity: 0.85,
              }}
            />

            {/* Left column in RTL: Bride's father */}
            <div style={{ paddingInline: 6 }}>
              <div
                style={{
                  fontSize: '0.84rem',
                  color: 'var(--brown-label)',
                  marginBottom: 4,
                }}
              >
                {brideFatherLabel}
              </div>
              <div
                className="heading-calligraphic"
                style={{
                  fontSize: 'clamp(1.28rem, 4.8vw, 1.46rem)',
                  color: 'var(--gold)',
                }}
              >
                {brideFatherName}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Highlighted Warm Gold Message */}
        <Reveal delay={0.22}>
          <p
            style={{
              margin: '0 auto 22px',
              maxWidth: 344,
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.06rem, 4.2vw, 1.18rem)',
              fontWeight: 700,
              lineHeight: 1.85,
              color: 'var(--gold-warm)',
            }}
          >
            {invitationMessage}
          </p>
        </Reveal>

        {/* Secondary Warm Brown Message */}
        <Reveal delay={0.28}>
          <p
            style={{
              margin: '0 auto 22px',
              maxWidth: 332,
              fontSize: 'clamp(0.86rem, 3.5vw, 0.94rem)',
              lineHeight: 1.95,
              color: 'var(--brown-body)',
            }}
          >
            {secondaryMessage}
          </p>
        </Reveal>

        {/* MEDIA SLOT: Transparent Kurdish couple illustration container */}
        <Reveal delay={0.32}>
          <div
            data-media-slot="couple-illustration"
            style={{
              maxWidth: 215,
              margin: '0 auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {mediaPaths.coupleImage ? (
              <img
                src={mediaPaths.coupleImage}
                alt="وێنەی بووک و زاوا بە جلی کوردی"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  userSelect: 'none',
                }}
              />
            ) : null}
          </div>
        </Reveal>
      </div>

      {/* Bottom torn paper divider transitioning into Section 4 */}
      <PaperDivider topColor="transparent" bottomColor="var(--bg-cream)" variant={1} overlap />
    </section>
  )
}

export default InvitationDetails
