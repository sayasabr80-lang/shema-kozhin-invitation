import { memo } from 'react'

/**
 * Torn watercolor paper edge SVG transition placed seamlessly between sections.
 * Uses layered translucent SVG contours (zero runtime Gaussian blur filter passes).
 */
const PaperDivider = memo(function PaperDivider({
  topColor = 'transparent',
  bottomColor = 'var(--bg-blush)',
  variant = 0,
  overlap = false,
}) {
  const paths = [
    'M0,26 C38,18 68,31 108,23 C148,15 182,30 222,22 C264,14 298,29 342,21 C376,15 406,25 430,20 L430,52 L0,52 Z',
    'M0,22 C44,30 82,14 126,24 C168,33 206,16 250,24 C292,31 334,15 376,24 C400,29 416,23 430,26 L430,52 L0,52 Z',
    'M0,24 C34,16 74,28 118,20 C162,13 196,29 242,21 C286,14 322,30 368,20 C395,14 414,24 430,22 L430,52 L0,52 Z',
  ]

  const decklePaths = [
    'M0,22 C42,14 72,27 112,19 C152,11 186,26 226,18 C268,10 302,25 346,17 C380,11 408,21 430,16 L430,30 C406,27 376,17 342,23 C298,31 264,16 222,24 C182,32 148,17 108,25 C68,33 38,20 0,28 Z',
    'M0,18 C46,26 84,10 128,20 C170,29 208,12 252,20 C294,27 336,11 378,20 C402,25 416,19 430,22 L430,30 C416,25 400,31 376,26 C334,17 292,33 250,26 C206,18 168,35 126,26 C82,16 44,32 0,24 Z',
    'M0,20 C36,12 76,24 120,16 C164,9 198,25 244,17 C288,10 324,26 370,16 C397,10 416,20 430,18 L430,26 C414,26 395,16 368,22 C322,32 286,16 242,23 C196,31 162,15 118,22 C74,30 34,18 0,26 Z',
  ]

  const idx = variant % paths.length

  return (
    <div
      aria-hidden="true"
      style={{
        position: overlap ? 'absolute' : 'relative',
        bottom: overlap ? -1 : undefined,
        left: 0,
        right: 0,
        width: '100%',
        height: 44,
        lineHeight: 0,
        backgroundColor: topColor,
        pointerEvents: 'none',
        zIndex: 6,
        overflow: 'hidden',
      }}
    >
      <svg
        viewBox="0 0 430 52"
        preserveAspectRatio="none"
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <path d={decklePaths[idx]} fill="var(--paper-feather)" opacity="0.72" />
        <path d={paths[idx]} fill={bottomColor} />
      </svg>
    </div>
  )
})

export default PaperDivider
