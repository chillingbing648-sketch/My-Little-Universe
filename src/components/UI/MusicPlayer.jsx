import { useEffect, useRef, useState } from 'react'
import { giftData, settings } from '../../data/giftData'
import { PlayIcon, PauseIcon } from './PlaybackIcons'

// Never autoplays. Shows up only after the visitor has entered the universe,
// and disappears gracefully if no audio file is configured or found.
export default function MusicPlayer() {
  const { music } = giftData
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(0.6)
  const [available, setAvailable] = useState(true)

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
      audio.play().catch(() => setAvailable(false))
      setPlaying(true)
    }
  }

  return (
    <div className={`music-player ${playing ? 'is-playing' : ''}`} role="group" aria-label="Background music">
      <audio
        ref={audioRef}
        src={music.src}
        loop
        preload="none"
        onError={() => setAvailable(false)}
      />
      <button
        className="icon-btn music-player__toggle"
        onClick={toggle}
        aria-label={playing ? 'Pause music' : 'Play music'}
        style={{ width: 32, height: 32 }}
      >
        {playing ? <PauseIcon /> : <PlayIcon />}
      </button>
      <span className="music-player__title">♪ {music.title || 'Our soundtrack'}</span>
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
  )
}
