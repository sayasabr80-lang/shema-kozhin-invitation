import { motion } from 'framer-motion'
import floralCorner from '../assets/floral-corner.png'

/**
 * Watercolor blush/ivory rose and olive-leaf corner floral cluster with organic breeze sway.
 */
function FloralGarland({
  flipX = false,
  flipY = false,
  rotateDeg = 0,
  style = {},
  className = '',
}) {
  const transformBase = [
    flipX ? 'scaleX(-1)' : '',
    flipY ? 'scaleY(-1)' : '',
    rotateDeg ? `rotate(${rotateDeg}deg)` : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <motion.div
      aria-hidden="true"
      className={className}
      animate={{ rotate: [-1.5, 1.5, -1.5] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        pointerEvents: 'none',
        transformOrigin: flipX ? 'right top' : 'left top',
        ...style,
      }}
    >
      <img
        src={floralCorner}
        alt=""
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block',
          transform: transformBase || undefined,
          userSelect: 'none',
        }}
      />
    </motion.div>
  )
}

export default FloralGarland
