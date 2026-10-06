import LenisProvider from './lib/LenisProvider.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Experience from './components/Experience.jsx'
import Terminal from './components/Terminal.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <LenisProvider>
      <CustomCursor />
      <Navbar />
      <main className="relative bg-obsidian">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Terminal />
        <Contact />
      </main>
      <Footer />
    </LenisProvider>
  )
}
