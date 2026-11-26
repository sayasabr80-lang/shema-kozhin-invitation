import { motion } from 'framer-motion'
import { invitationData } from '../data/invitationData'
import FloralGarland from './FloralGarland'
import PaperDivider from './PaperDivider'
import Reveal, { LUXURY_EASE } from './Reveal'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.12,
    },
  },
}

const lineVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: LUXURY_EASE },
  },
}

/**
 * Section 6: Poetic Dedication with staggered lines, watercolor rose garlands,
 * and a single seamless PaperDivider transitioning directly into the Footer.
 */
function DedicationSection() {
  const { dedicationTitle, dedicationLines } = invitationData

  return (
    <section
      aria-label={dedicationTitle}
      style={{
        position: 'relative',
        backgroundColor: 'var(--bg-blush)',
        paddingTop: 58,
        paddingBottom: 96,
        paddingInline: 28,
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Top-right rose & olive-leaf garland */}
      <FloralGarland
        flipX
        style={{
          position: 'absolute',
          top: -12,
          right: -16,
          width: 185,
          height: 185,
          zIndex: 1,
        }}
      />

      {/* Right-border trailing rose & olive garland */}
      <FloralGarland
        flipX
        flipY
        style={{
          position: 'absolute',
          top: 122,
          right: -28,
          width: 155,
          height: 155,
          zIndex: 1,
          opacity: 0.9,
        }}
      />

      {/* Bottom-left rose & olive-leaf cluster */}
      <FloralGarland
        flipY
        style={{
          position: 'absolute',
          bottom: 22,
          left: -14,
          width: 165,
          height: 165,
          zIndex: 1,
        }}
      />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 342, margin: '0 auto' }}>
        <Reveal>
          <h2
            className="heading-calligraphic"
            style={{
              fontSize: 'clamp(1.78rem, 6.4vw, 2.1rem)',
              color: 'var(--gold)',
              marginBottom: 32,
            }}
          >
            {dedicationTitle}
          </h2>
        </Reveal>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          {dedicationLines.map((line, index) => (
            <motion.p
              key={index}
              variants={lineVariants}
              style={{
                margin: 0,
                fontSize: 'clamp(0.95rem, 3.8vw, 1.04rem)',
                fontWeight: 500,
                lineHeight: 2.05,
                color: 'var(--brown-deep)',
              }}
            >
              {line}
            </motion.p>
          ))}
        </motion.div>
      </div>

      {/* Single seamless torn-paper divider directly into Footer (#ECE4D6) */}
      <PaperDivider topColor="transparent" bottomColor="var(--bg-champagne)" variant={2} overlap />
    </section>
  )
}

export default DedicationSection
