import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { invitationData } from '../data/invitationData'
import {
  WEEKDAYS_SHORT_RTL,
  buildMonthGrid,
  downloadWeddingIcs,
  getCountdownTimeLeft,
  toKurdishDigits,
} from '../utils/dateUtils'
import OrnateButton from './OrnateButton'
import PaperDivider from './PaperDivider'
import Reveal, { LUXURY_EASE } from './Reveal'

function CountdownUnit({ value, label }) {
  const display = toKurdishDigits(String(value).padStart(2, '0'))
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: 58,
        padding: '10px 8px',
        borderRadius: 14,
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-countdown)',
        boxShadow: '0 4px 14px var(--shadow-warm-soft)',
      }}
    >
      <div style={{ height: 32, overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={display}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: LUXURY_EASE }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.55rem',
              fontWeight: 700,
              color: 'var(--gold-deep)',
              lineHeight: 1,
            }}
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span style={{ fontSize: '0.78rem', color: 'var(--brown-muted)', marginTop: 4 }}>{label}</span>
    </div>
  )
}

/**
 * Section 4: Dynamic Calendar Card, Save-the-Date (.ics), & Live Countdown driven by eventDateISO.
 */
function CalendarSection() {
  const {
    eventDateISO,
    groomName,
    brideName,
    venueName,
    saveDateButtonText,
    eventStartedText,
  } = invitationData

  const monthGrid = useMemo(() => buildMonthGrid(eventDateISO), [eventDateISO])
  const [timeLeft, setTimeLeft] = useState(() => getCountdownTimeLeft(eventDateISO))

  useEffect(() => {
    setTimeLeft(getCountdownTimeLeft(eventDateISO))
    const timer = setInterval(() => {
      setTimeLeft(getCountdownTimeLeft(eventDateISO))
    }, 1000)
    return () => clearInterval(timer)
  }, [eventDateISO])

  const handleSaveDate = () => {
    downloadWeddingIcs({ eventDateISO, groomName, brideName, venueName })
  }

  return (
    <section
      aria-label="ڕۆژژمێر و کاتژمێری ئاهەنگ"
      style={{
        position: 'relative',
        backgroundColor: 'var(--bg-cream)',
        paddingTop: 22,
        paddingBottom: 80,
        paddingInline: 20,
        textAlign: 'center',
      }}
    >
      {/* Elevated Calendar Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 24 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.85, ease: LUXURY_EASE }}
        style={{
          backgroundColor: 'var(--bg-card)',
          borderRadius: 24,
          padding: '30px 18px 36px',
          maxWidth: 386,
          margin: '0 auto',
          boxShadow:
            '0 12px 34px var(--shadow-warm-card), 0 0 0 1px var(--border-card)',
        }}
      >
        {/* Card Header */}
        <h2
          className="heading-calligraphic"
          style={{
            fontSize: 'clamp(1.55rem, 5.8vw, 1.8rem)',
            color: 'var(--gold)',
            marginBottom: 26,
          }}
        >
          {monthGrid.headerText}
        </h2>

        {/* Weekday Headers */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: 6,
            marginBottom: 18,
            justifyItems: 'center',
          }}
        >
          {WEEKDAYS_SHORT_RTL.map((day) => (
            <div
              key={day}
              style={{
                width: 40,
                height: 40,
                borderRadius: '9999px',
                border: '1px solid var(--border-weekday)',
                backgroundColor: 'var(--bg-card)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.86rem',
                fontWeight: 600,
                color: 'var(--bronze)',
              }}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Month Dates Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            rowGap: 18,
            columnGap: 6,
            justifyItems: 'center',
            alignItems: 'center',
            marginBottom: 36,
          }}
        >
          {monthGrid.cells.map((day, idx) => {
            const isWeddingDay = day === monthGrid.highlightedDay
            return (
              <div
                key={idx}
                className={isWeddingDay ? 'wedding-day-pulse' : undefined}
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: '9999px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: isWeddingDay ? 'var(--gold-solid)' : 'transparent',
                  color: isWeddingDay
                    ? 'var(--white)'
                    : day
                      ? 'var(--brown-body)'
                      : 'var(--brown-dash)',
                  fontSize: isWeddingDay ? '0.96rem' : '0.9rem',
                  fontWeight: isWeddingDay ? 700 : 500,
                }}
              >
                {day ? toKurdishDigits(day) : '-'}
              </div>
            )
          })}
        </div>

        {/* Save the Date (.ics download) */}
        <OrnateButton onClick={handleSaveDate}>{saveDateButtonText}</OrnateButton>
      </motion.div>

      {/* Live Countdown Area */}
      <Reveal delay={0.15} style={{ marginTop: 38 }}>
        {timeLeft.finished ? (
          <p
            className="heading-calligraphic"
            style={{
              fontSize: 'clamp(1.6rem, 6vw, 1.95rem)',
              color: 'var(--gold)',
            }}
          >
            {eventStartedText}
          </p>
        ) : (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 10,
              flexWrap: 'wrap',
            }}
          >
            <CountdownUnit value={timeLeft.days} label="ڕۆژ" />
            <CountdownUnit value={timeLeft.hours} label="کاتژمێر" />
            <CountdownUnit value={timeLeft.minutes} label="خولەک" />
            <CountdownUnit value={timeLeft.seconds} label="چرکە" />
          </div>
        )}
      </Reveal>

      {/* Torn-paper divider at the bottom */}
      <PaperDivider topColor="transparent" bottomColor="var(--bg-blush)" variant={2} overlap />
    </section>
  )
}

export default CalendarSection
