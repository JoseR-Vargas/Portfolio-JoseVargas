import { Navbar } from '../components/layout/Navbar'
import { About } from '../components/sections/About'
import { Contact } from '../components/sections/Contact'
import { Footer } from '../components/layout/Footer'
import { Hero } from '../components/sections/Hero'
import { Projects } from '../components/sections/Projects'
import { Resume } from '../components/sections/Resume'
import { Skills } from '../components/sections/Skills'

export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-clip">
        <Hero />
        <About />
        <Skills />
        <Resume />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
