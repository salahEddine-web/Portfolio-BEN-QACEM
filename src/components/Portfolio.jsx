import React, { useEffect } from 'react'
import { useData } from '/src/providers/DataProvider.jsx'
import { useLanguage } from '/src/providers/LanguageProvider.jsx'
import { useScrollRevealInit } from '/src/hooks/useScrollReveal.js'
import { useActiveSection } from '/src/hooks/useActiveSection.js'
import Navbar from '/src/components/Navbar.jsx'
import Hero from '/src/components/Hero.jsx'
import Marquee from '/src/components/Marquee.jsx'
import About from '/src/components/About.jsx'
import Stats from '/src/components/Stats.jsx'
import Projects from '/src/components/Projects.jsx'
import Experience from '/src/components/Experience.jsx'
import Skills from '/src/components/Skills.jsx'
import Services from '/src/components/Services.jsx'
import Education from '/src/components/Education.jsx'
import Learning from '/src/components/Learning.jsx'
import Contact from '/src/components/Contact.jsx'
import Footer from '/src/components/Footer.jsx'
import CustomCursor from '/src/components/CustomCursor.jsx'
import ScrollProgress from '/src/components/ScrollProgress.jsx'

const SECTION_IDS = ['hero','about','stats','portfolio','experience','skills','services','education','learning','contact']

function Portfolio() {
  useScrollRevealInit()
  const { activeId, scrollTo } = useActiveSection(SECTION_IDS)

  return (
    <div className="portfolio">
      <ScrollProgress />
      <CustomCursor />
      <Navbar activeId={activeId} scrollTo={scrollTo} />
      <main>
        <Hero scrollTo={scrollTo} />
        <Marquee />
        <About />
        <Stats />
        <Projects />
        <Experience />
        <Skills />
        <Services />
        <Education />
        <Learning />
        <Contact />
      </main>
      <Footer scrollTo={scrollTo} />
    </div>
  )
}

export default Portfolio
