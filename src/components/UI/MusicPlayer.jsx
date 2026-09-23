import { useEffect, useRef, useState } from 'react'
import { giftData, settings } from '../../data/giftData'
import { PlayIcon, PauseIcon } from './PlaybackIcons'

// Compact cinematic media object with progressive disclosure.
// Collapsed into a minimal starlight pill by default; expands smoothly on hover or interaction.
export default function MusicPlayer() {
  const { music } = giftData
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(0.6)
  const [available, setAvailable] = useState(true)
  const [isInteracted, setIsInteracted] = useState(false)

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  if (!settings.musicEnabled || !music?.enabled || !music?.src || !available) return null

  function toggle() {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().catch(() => {
        setPlaying(false)
      })
      setPlaying(true)
    }
  }

  return (
    <div
      className={`music-player ${playing ? 'is-playing' : ''} ${isInteracted ? 'is-interacted' : ''}`}
      role="group"
      aria-label="Background music"
      onPointerEnter={() => setIsInteracted(true)}
      onPointerLeave={() => setIsInteracted(false)}
      onFocusCapture={() => setIsInteracted(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsInteracted(false)
        }
      }}
    >
      <audio
        ref={audioRef}
        src={music.src}
        loop
        preload="none"
        onEnded={() => setPlaying(false)}
        onError={() => {
          setPlaying(false)
        }}
      />

      <button
        className="icon-btn music-player__toggle"
        onClick={toggle}
        aria-label={playing ? 'Pause music' : 'Play music'}
        aria-pressed={playing}
      >
        {playing ? <PauseIcon /> : <PlayIcon />}
      </button>

      <div className="music-player__body">
        <div className="music-player__meta">
          {playing && (
            <span className="music-player__bars" aria-hidden="true">
              <span className="music-player__bar" />
              <span className="music-player__bar" />
              <span className="music-player__bar" />
            </span>
          )}
          <span className="music-player__title" title={music.title || 'Our soundtrack'}>
            {music.title || 'Our soundtrack'}
          </span>
        </div>

        <div className="music-player__controls">
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            aria-label="Volume"
          />
        </div>
      </div>
    </div>
  )
}

