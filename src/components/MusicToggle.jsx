import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { LUXURY_EASE } from './Reveal'

function extractYouTubeId(url) {
  if (!url) return ''
  const match = String(url).match(
    /(?:youtube\.com\/(?:watch\?.*v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  )
  return match ? match[1] : ''
}

function extractYouTubeStartSeconds(url, explicitStart = 0) {
  if (Number.isFinite(explicitStart) && explicitStart > 0) {
    return Math.floor(explicitStart)
  }
  if (!url) return 0
  const match = String(url).match(/[?&](?:t|start)=(\d+)/)
  return match ? Number(match[1]) : 0
}

let ytApiPromise = null
function loadYouTubeIframeApi() {
  if (typeof window === 'undefined') return Promise.reject()
  if (window.YT && window.YT.Player) return Promise.resolve(window.YT)
  if (ytApiPromise) return ytApiPromise

  ytApiPromise = new Promise((resolve) => {
    const prevReady = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      if (typeof prevReady === 'function') prevReady()
      resolve(window.YT)
    }

    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const script = document.createElement('script')
      script.src = 'https://www.youtube.com/iframe_api'
      script.async = true
      document.head.appendChild(script)
    }
  })

  return ytApiPromise
}

/**
 * Fixed bottom-left frosted-glass music toggle button with expanding sound-wave pulse.
 * Supports YouTube URLs (via YouTube IFrame Player API), direct audio files (.mp3/.m4a),
 * and gracefully falls back to a gentle Web Audio melody if external media is blocked.
 */
function MusicToggle({
  isVisible = true,
  isPlaying,
  onToggle,
  audioSrc = '',
  startSeconds = 0,
  playerControllerRef,
}) {
  const youtubeId = useMemo(() => extractYouTubeId(audioSrc), [audioSrc])
  const ytStartAt = useMemo(
    () => extractYouTubeStartSeconds(audioSrc, startSeconds),
    [audioSrc, startSeconds]
  )
  const isAudioFile = Boolean(audioSrc) && !youtubeId

  const audioRef = useRef(null)
  const ytContainerRef = useRef(null)
  const ytPlayerRef = useRef(null)
  const ytReadyRef = useRef(false)
  const isPlayingRef = useRef(isPlaying)
  const ctxRef = useRef(null)
  const intervalRef = useRef(null)

  const [ytFailed, setYtFailed] = useState(false)
  const [audioFailed, setAudioFailed] = useState(false)

  useEffect(() => {
    isPlayingRef.current = isPlaying
  }, [isPlaying])

  useEffect(() => {
    setYtFailed(false)
    setAudioFailed(false)
  }, [audioSrc])

  // Expose synchronous play/pause controls for click-gesture handlers (App.jsx)
  useEffect(() => {
    if (!playerControllerRef) return
    playerControllerRef.current = {
      play: () => {
        if (youtubeId && !ytFailed && ytPlayerRef.current && ytReadyRef.current) {
          try {
            ytPlayerRef.current.unMute()
            ytPlayerRef.current.setVolume(85)
            ytPlayerRef.current.playVideo()
          } catch {
            // Handled by effect/fallback
          }
        } else if (isAudioFile && !audioFailed && audioRef.current) {
          audioRef.current.play().catch(() => setAudioFailed(true))
        }
      },
      pause: () => {
        if (youtubeId && ytPlayerRef.current && ytReadyRef.current) {
          try {
            ytPlayerRef.current.pauseVideo()
          } catch {
            // Ignore
          }
        } else if (isAudioFile && audioRef.current) {
          audioRef.current.pause()
        }
      },
    }
  }, [playerControllerRef, youtubeId, isAudioFile, ytFailed, audioFailed])

  // Initialize hidden YouTube IFrame Player when a YouTube URL is configured
  useEffect(() => {
    if (!youtubeId) return
    let cancelled = false
    ytReadyRef.current = false

    loadYouTubeIframeApi()
      .then((YT) => {
        if (cancelled || !ytContainerRef.current) return
        ytPlayerRef.current = new YT.Player(ytContainerRef.current, {
          height: '1',
          width: '1',
          videoId: youtubeId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            ...(ytStartAt > 0
              ? { start: ytStartAt }
              : { loop: 1, playlist: youtubeId }),
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
          },
          events: {
            onReady: (event) => {
              if (cancelled) return
              ytReadyRef.current = true
              if (isPlayingRef.current) {
                try {
                  event.target.unMute()
                  event.target.setVolume(85)
                  if (ytStartAt > 0) {
                    event.target.seekTo(ytStartAt, true)
                  }
                  event.target.playVideo()
                } catch {
                  setYtFailed(true)
                }
              }
            },
            onStateChange: (event) => {
              if (cancelled) return
              if (
                ytStartAt > 0 &&
                event.data === YT.PlayerState?.ENDED &&
                isPlayingRef.current
              ) {
                try {
                  event.target.seekTo(ytStartAt, true)
                  event.target.playVideo()
                } catch {
                  // Ignore
                }
              }
            },
            onError: () => {
              if (!cancelled) setYtFailed(true)
            },
          },
        })
      })
      .catch(() => {
        if (!cancelled) setYtFailed(true)
      })

    return () => {
      cancelled = true
      ytReadyRef.current = false
      if (ytPlayerRef.current && typeof ytPlayerRef.current.destroy === 'function') {
        try {
          ytPlayerRef.current.destroy()
        } catch {
          // Ignore
        }
        ytPlayerRef.current = null
      }
    }
  }, [youtubeId, ytStartAt])

  // Sync play/pause state across YouTube, HTMLAudioElement, or Web Audio fallback
  useEffect(() => {
    const useYouTube = Boolean(youtubeId) && !ytFailed
    const useAudioElement = isAudioFile && !audioFailed && Boolean(audioRef.current)

    const stopSynth = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      if (ctxRef.current && ctxRef.current.state === 'running') {
        ctxRef.current.suspend().catch(() => {})
      }
    }

    if (useYouTube) {
      stopSynth()
      if (ytPlayerRef.current && ytReadyRef.current) {
        try {
          if (isPlaying) {
            ytPlayerRef.current.unMute()
            ytPlayerRef.current.setVolume(85)
            ytPlayerRef.current.playVideo()
          } else {
            ytPlayerRef.current.pauseVideo()
          }
        } catch {
          setYtFailed(true)
        }
      }
      return
    }

    if (useAudioElement) {
      stopSynth()
      if (isPlaying) {
        audioRef.current.play().catch(() => setAudioFailed(true))
      } else {
        audioRef.current.pause()
      }
      return
    }

    if (!isPlaying) {
      stopSynth()
      return
    }

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (!AudioCtx) return

      if (!ctxRef.current) {
        ctxRef.current = new AudioCtx()
      }
      const ctx = ctxRef.current
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {})
      }

      const notes = [293.66, 369.99, 440.0, 587.33, 440.0, 369.99, 329.63, 493.88]
      let step = 0

      const playNote = () => {
        if (!ctxRef.current || ctxRef.current.state !== 'running') return
        const now = ctx.currentTime
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(notes[step % notes.length], now)
        step += 1

        gain.gain.setValueAtTime(0.0001, now)
        gain.gain.exponentialRampToValueAtTime(0.03, now + 0.18)
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.4)

        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(now)
        osc.stop(now + 2.5)
      }

      playNote()
      intervalRef.current = setInterval(playNote, 1300)
    } catch {
      // Ignore if Web Audio is restricted
    }

    return stopSynth
  }, [isPlaying, youtubeId, ytFailed, isAudioFile, audioFailed])

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (ctxRef.current) {
        ctxRef.current.close().catch(() => {})
      }
    }
  }, [])

  const handleToggleClick = () => {
    if (isPlaying) {
      playerControllerRef?.current?.pause()
    } else {
      playerControllerRef?.current?.play()
    }
    onToggle()
  }

  return (
    <>
      {/* Hidden 1x1 YouTube background audio player */}
      {youtubeId ? (
        <div
          aria-hidden="true"
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: 1,
            height: 1,
            opacity: 0.001,
            pointerEvents: 'none',
            overflow: 'hidden',
            zIndex: -1,
          }}
        >
          <div ref={ytContainerRef} />
        </div>
      ) : null}

      {/* Direct audio file element if audioSrc is a local/MP3 path */}
      {isAudioFile ? (
        <audio
          ref={audioRef}
          src={audioSrc}
          loop
          preload="auto"
          onError={() => setAudioFailed(true)}
        />
      ) : null}

      {isVisible ? (
        <div
          style={{
            position: 'fixed',
            bottom: 24,
            left: 'max(18px, calc(50% - 215px + 18px))',
            zIndex: 40,
          }}
        >
          <motion.button
            type="button"
            onClick={handleToggleClick}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: LUXURY_EASE }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            aria-label={isPlaying ? 'وەستاندنی مۆسیقا' : 'لێدانی مۆسیقا'}
            title={isPlaying ? 'وەستاندنی مۆسیقا' : 'لێدانی مۆسیقا'}
            style={{
              position: 'relative',
              width: 44,
              height: 44,
              borderRadius: '9999px',
              border: '1px solid var(--music-border)',
              background: 'var(--music-bg)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              boxShadow: '0 4px 16px var(--shadow-music)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--music-icon)',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            {isPlaying ? <span className="music-pulse-ring" aria-hidden="true" /> : null}
            <svg
              aria-hidden="true"
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.65"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ opacity: isPlaying ? 1 : 0.65 }}
            >
              <path d="M9 18V5l10-2v13" />
              <circle cx="6.5" cy="18" r="2.5" />
              <circle cx="16.5" cy="16" r="2.5" />
              {!isPlaying ? <line x1="4" y1="4" x2="20" y2="20" strokeWidth="1.5" /> : null}
            </svg>
          </motion.button>
        </div>
      ) : null}
    </>
  )
}

export default MusicToggle
