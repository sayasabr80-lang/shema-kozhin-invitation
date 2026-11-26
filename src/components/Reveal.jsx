import { motion } from 'framer-motion'

export const LUXURY_EASE = [0.22, 1, 0.36, 1]

/**
 * Scroll-triggered fade-up reveal wrapper with quiet-luxury easing.
 */
function Reveal({ children, delay = 0, y = 26, className = '', style }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: LUXURY_EASE }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

export default Reveal
