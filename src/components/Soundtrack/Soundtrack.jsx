import { useEffect, useRef, useState } from 'react'
import { giftData } from '../../data/giftData'
import SmartImage from '../UI/SmartImage'
import { EmptySection } from '../Timeline/Timeline'
import { PlayIcon, PauseIcon } from '../UI/PlaybackIcons'

export default function Soundtrack() {
  const songs = giftData.songs
  if (!songs?.length) return <EmptySection title="Songs That Feel Like Us" />

  return (
    <div className="screen soundtrack">
      <div className="screen__inner">
        <p className="eyebrow">Our soundtrack</p>
        <h1 className="heading-l">Songs That Feel Like Us</h1>

        <ul className="soundtrack__list">
          {songs.map((song, i) => (
            <SongRow key={i} song={song} delay={i * 70} />
          ))}
        </ul>
      </div>
    </div>
  )
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

function SongRow({ song, delay }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [available, setAvailable] = useState(true)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onTime = () => setCurrentTime(audio.currentTime)
    const onMeta = () => setDuration(audio.duration || 0)
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onMeta)
    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onMeta)
    }
  }, [])

  function toggle() {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => setAvailable(false))
    }
  }

  function seek(e) {
    const audio = audioRef.current
    if (!audio || !duration) return
    audio.currentTime = Number(e.target.value)
    setCurrentTime(Number(e.target.value))
  }

  const progress = duration ? (currentTime / duration) * 100 : 0

  return (
    <li
      className={`soundtrack__row ${playing ? 'is-playing' : ''}`}
      style={{ '--enter-delay': `${delay}ms` }}
    >
      <span className="soundtrack__cover-ring">
        <SmartImage src={song.cover} alt="" className="soundtrack__cover" label="♪" />
      </span>
      <div className="soundtrack__meta">
        <p className="soundtrack__title">{song.title}</p>
        <p className="body-text--soft">{song.artist}</p>
        <p className="body-text body-text--soft">{song.why}</p>
        <div className="soundtrack__meta-row">
          {song.link && (
            <a className="pill-tag" href={song.link} target="_blank" rel="noreferrer">
              Listen ↗
            </a>
          )}
        </div>
        {song.src && available && (
          <div className="soundtrack__player">
            <audio
              ref={audioRef}
              src={song.src}
              onEnded={() => setPlaying(false)}
              onError={() => setAvailable(false)}
              preload="metadata"
            />
            <button className="icon-btn soundtrack__toggle" onClick={toggle} aria-label={playing ? 'Pause' : 'Play'}>
              {playing ? <PauseIcon size={13} /> : <PlayIcon size={13} />}
            </button>
            <span className="soundtrack__time">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 0}
              step="0.1"
              value={currentTime}
              onChange={seek}
              aria-label={`Seek in ${song.title}`}
              className="soundtrack__seek"
              style={{ '--progress': `${progress}%` }}
            />
            <span className="soundtrack__time">{formatTime(duration)}</span>
          </div>
        )}
      </div>
    </li>
  )
}
