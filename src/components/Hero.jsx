import "./Hero.scss"
import React from 'react'
import { useData } from '/src/providers/DataProvider.jsx'
import { useLanguage } from '/src/providers/LanguageProvider.jsx'

function Hero({ scrollTo }) {
  const data = useData()
  const language = useLanguage()

  const profile = data.getProfile()
  const sections = data.getSections()
  const coverSection = sections.find(s => s.id === 'about')

  const localizedName = language.getTranslation(profile.locales, 'localized_name', profile.name)
  const roles = language.getTranslation(profile.locales, 'roles', [])
  const role = Array.isArray(roles) && roles.length > 0 ? roles[0] : 'Full-Stack Developer'

  const inlineListArticle = coverSection?.data?.articles?.find(a => a.component === 'ArticleInlineList')
  const locationItem = inlineListArticle?.items?.find(i => i.faIcon?.includes('map-marker'))
  const location = locationItem?.label || 'Morocco'

  const hasResume = profile.resumePdfUrl && profile.resumePdfUrl.trim().length > 0

  return (
    <section id="hero" className="hero">
      <div className="hero__orb" aria-hidden="true" />

      <div className="container hero__inner">
        <div className="hero__status scroll-reveal stagger-1">
          <span className="hero__status-dot" />
          <span className="hero__status-text">Available for opportunities</span>
        </div>

        <h1 className="hero__heading">
          <span className="hero__greeting scroll-reveal stagger-2">Hi, I'm</span>
          <span className="hero__name scroll-reveal stagger-3">{localizedName}.</span>
        </h1>

        <p className="hero__role scroll-reveal stagger-4">
          <span className="hero__role-primary">{role}</span>
          <span className="hero__role-secondary">
            building modern web applications and digital experiences.
          </span>
        </p>

        <p className="hero__description scroll-reveal stagger-5">
          I design and develop reliable, responsive and scalable web applications using modern technologies.
        </p>

        <div className="hero__actions scroll-reveal stagger-6">
          <button className="hero__btn hero__btn--primary" onClick={() => scrollTo('portfolio')}>
            View My Work <span className="hero__btn-arrow">&rarr;</span>
          </button>
          {hasResume && (
            <a className="hero__btn hero__btn--secondary" href={profile.resumePdfUrl} target="_blank" rel="noopener noreferrer">
              Download CV
            </a>
          )}
        </div>

        <div className="hero__meta scroll-reveal stagger-7">
          <span>{location}</span>
          <span className="hero__meta-sep">&middot;</span>
          <span>{role}</span>
        </div>
      </div>
    </section>
  )
}

export default Hero
