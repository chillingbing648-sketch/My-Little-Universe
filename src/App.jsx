import { useEffect } from 'react'
import { useHashRoute } from './hooks/useHashRoute'
import Opening from './components/Opening/Opening'
import Universe from './components/Universe/Universe'
import Navigation from './components/Navigation/Navigation'
import Timeline from './components/Timeline/Timeline'
import MemoryMuseum from './components/MemoryMuseum/MemoryMuseum'
import Unsaid from './components/Unsaid/Unsaid'
import Letter from './components/Letter/Letter'
import OpenWhen from './components/OpenWhen/OpenWhen'
import Quiz from './components/Quiz/Quiz'
import Soundtrack from './components/Soundtrack/Soundtrack'
import Surprise from './components/Surprise/Surprise'
import Future from './components/Future/Future'
import FinalReveal from './components/FinalReveal/FinalReveal'
import MusicPlayer from './components/UI/MusicPlayer'
import SecretStar from './components/UI/SecretStar'
import SectionTransition from './components/UI/SectionTransition'

const SECTIONS = {
  universe: Universe,
  beginning: Timeline,
  museum: MemoryMuseum,
  unsaid: Unsaid,
  letter: Letter,
  openwhen: OpenWhen,
  quiz: Quiz,
  soundtrack: Soundtrack,
  surprise: Surprise,
  future: Future,
  final: FinalReveal,
}

export default function App() {
  const [route, navigate] = useHashRoute()

  // Keep each section's top in view when navigating.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [route])

  if (route === 'opening') {
    return (
      <div className="app-shell">
        <Opening onEnter={() => navigate('universe')} />
      </div>
    )
  }

  const Section = SECTIONS[route] || Universe

  return (
    <div className="app-shell">
      <div className="grain" aria-hidden="true" />
      <Navigation route={route} navigate={navigate} />
      <SectionTransition key={route}>
        <Section navigate={navigate} />
      </SectionTransition>
      <MusicPlayer />
      <SecretStar />
    </div>
  )
}
