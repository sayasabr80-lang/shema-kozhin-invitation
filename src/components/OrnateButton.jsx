import { motion } from 'framer-motion'
import { LUXURY_EASE } from './Reveal'

function GoldFloralScroll({ position = 'top' }) {
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
        width: 92,
        height: 18,
        pointerEvents: 'none',
      }}
    >
      <g
        fill="none"
        stroke="var(--gold-scroll)"
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
        <path d="M22 15 C17 15, 13 13, 10 15" />
        <path d="M88 15 C93 15, 97 13, 100 15" />
      </g>
    </svg>
  )
}

/**
 * Ornate double-gold-bordered pill button with symmetrical top & bottom floral scroll ornaments.
 */
function OrnateButton({
  children,
  onClick,
  href,
  target,
  rel,
  className = '',
  type = 'button',
  ariaLabel,
}) {
  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.97 },
    transition: { duration: 0.25, ease: LUXURY_EASE },
    className: `ornate-btn ${className}`,
    'aria-label': ariaLabel,
  }

  const innerContent = (
    <>
      <span className="ornate-btn-sheen" aria-hidden="true" />
      <GoldFloralScroll position="top" />
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
      <GoldFloralScroll position="bottom" />
    </>
  )

  if (href) {
    return (
      <motion.a href={href} target={target} rel={rel} {...motionProps}>
        {innerContent}
      </motion.a>
    )
  }

  return (
    <motion.button type={type} onClick={onClick} {...motionProps}>
      {innerContent}
    </motion.button>
  )
}

export default OrnateButton
