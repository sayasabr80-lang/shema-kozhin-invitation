import { memo } from 'react'
import floralCorner from '../assets/floral-corner.webp'

/**
 * Watercolor blush/ivory rose and olive-leaf corner floral cluster with lightweight CSS breeze sway.
 */
const FloralGarland = memo(function FloralGarland({
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
    <div
      aria-hidden="true"
      className={`floral-sway ${className}`}
      style={{
        pointerEvents: 'none',
        transformOrigin: flipX ? 'right top' : 'left top',
        ...style,
      }}
    >
      <img
        src={floralCorner}
        alt=""
        width={400}
        height={400}
        loading="lazy"
        decoding="async"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block',
          transform: transformBase || undefined,
          userSelect: 'none',
        }}
      />
    </div>
  )
})

export default FloralGarland
