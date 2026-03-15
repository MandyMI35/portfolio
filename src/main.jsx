import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './index.css'
import App from './App.jsx'
import { Page2 } from './pages/page2.jsx'
import ProjectsSection from './pages/page3.jsx'
import ContactSection from './pages/page4.jsx'
import Navbar from './pages/navbar.jsx'

gsap.registerPlugin(ScrollTrigger)

function Main() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.8,
    })

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)
    lenis.on('scroll', ScrollTrigger.update)

    return () => {
      lenis.destroy()
      gsap.ticker.remove((time) => lenis.raf(time * 1000))
    }
  }, [])

  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
      <Navbar />

      {/* Hero — fixed height, relative so canvas fills it */}
      <section
        id="home"
        style={{ height: '100vh', position: 'relative' }}
      >
        <App />
      </section>

      {/* Experience */}
      <section style={{ height: 'auto', position: 'relative', background: 'white' }}>
        <Page2 />
      </section>

      {/* Projects */}
      <section id="projects" style={{ height: 'auto', position: 'relative', background: 'white' }}>
        <ProjectsSection />
      </section>

      {/* Contact */}
      <section
        id="contact"
        style={{
          height: 'auto',
          position: 'relative',
          background: 'white',
          /* Ensure contact section has enough room on small screens */
          minHeight: '80vh',
        }}
      >
        <ContactSection />
      </section>
    </div>
  )
}

const rootElement = document.getElementById('root')
createRoot(rootElement).render(
  <StrictMode>
    <Main />
  </StrictMode>
)
