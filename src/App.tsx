import { MotionConfig } from 'framer-motion'
import { Cursor } from './components/Cursor'
import { Footer } from './components/Footer'
import { Navigation } from './components/Navigation'
import { ScrollProgress } from './components/ScrollProgress'
import { useDocumentTitle } from './hooks/usePage'
import { About } from './sections/About'
import { Contact } from './sections/Contact'
import { Experiments } from './sections/Experiments'
import { Hero } from './sections/Hero'
import { Metrics } from './sections/Metrics'
import { Stack } from './sections/Stack'
import { Timeline } from './sections/Timeline'
import { Work } from './sections/Work'

export default function App() {
  useDocumentTitle('David — Software Engineer / AI / Cybersecurity')

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Cursor />
      <ScrollProgress />
      <Navigation />

      <main id="main">
        <Hero />
        <About />
        <Work />
        <Experiments />
        <Stack />
        <Metrics />
        <Timeline />
        <Contact />
      </main>

      <Footer />
    </MotionConfig>
  )
}
