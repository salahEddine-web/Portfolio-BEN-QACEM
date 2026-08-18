import React, { useState, useEffect, useCallback } from 'react'
import { useData } from '/src/providers/DataProvider.jsx'
import { useLanguage } from '/src/providers/LanguageProvider.jsx'
import { useTheme } from '/src/providers/ThemeProvider.jsx'
import './Navbar.scss'

const NAV_LINKS = [
  { id: 'portfolio', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

function Navbar({ activeId, scrollTo }) {
  const data = useData()
  const language = useLanguage()
  const theme = useTheme()

  const profile = data?.getProfile() || {}
  const resumeUrl = profile.resumePdfUrl || ''

  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleNav = useCallback((id) => {
    scrollTo(id)
    setMobileOpen(false)
  }, [scrollTo])

  const handleLangToggle = () => {
    if (!language?.supportsMultipleLanguages) return
    const langs = language.getAvailableLanguages(true)
    if (langs.length > 0) {
      language.setSelectedLanguage(langs[0])
    }
  }

  const langLabel = (language?.selectedLanguageId || 'en').toUpperCase()

  return (
    <nav className={`navbar${scrolled ? ' navbar-scrolled' : ''}`}>
      <button className="navbar-logo" onClick={() => handleNav('hero')} aria-label="Back to top">
        SQ
      </button>

      <div className="navbar-links">
        {NAV_LINKS.map((link) => (
          <button
            key={link.id}
            className={`navbar-link${activeId === link.id ? ' active' : ''}`}
            onClick={() => handleNav(link.id)}
          >
            {link.label}
            {activeId === link.id && <span className="navbar-link-dot" />}
          </button>
        ))}
      </div>

      <div className="navbar-actions">
        {language?.supportsMultipleLanguages && (
          <button className="navbar-toggle" onClick={handleLangToggle} aria-label="Toggle language">
            {langLabel}
          </button>
        )}

        {theme?.supportsMultipleThemes && (
          <button className="navbar-toggle navbar-theme-toggle" onClick={theme.toggle} aria-label="Toggle theme">
            <svg className="theme-icon-sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
            <svg className="theme-icon-moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </button>
        )}

        {resumeUrl && (
          <a className="navbar-resume" href={resumeUrl} target="_blank" rel="noopener noreferrer">
            Resume
          </a>
        )}

        <button
          className={`navbar-hamburger${mobileOpen ? ' open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`navbar-mobile-overlay${mobileOpen ? ' open' : ''}`}>
        <div className="navbar-mobile-links">
          {NAV_LINKS.map((link, i) => (
            <button
              key={link.id}
              className={`navbar-mobile-link${activeId === link.id ? ' active' : ''}`}
              style={{ transitionDelay: mobileOpen ? `${i * 80 + 100}ms` : '0ms' }}
              onClick={() => handleNav(link.id)}
            >
              <span className="navbar-mobile-link-index">0{i + 1}</span>
              {link.label}
            </button>
          ))}

          <div className="navbar-mobile-actions">
            {language?.supportsMultipleLanguages && (
              <button className="navbar-toggle" onClick={handleLangToggle}>
                {langLabel}
              </button>
            )}
            {theme?.supportsMultipleThemes && (
              <button className="navbar-toggle" onClick={theme.toggle}>
                Theme
              </button>
            )}
            {resumeUrl && (
              <a className="navbar-resume" href={resumeUrl} target="_blank" rel="noopener noreferrer">
                Resume
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
