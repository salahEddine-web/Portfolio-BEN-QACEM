import "./About.scss"
import React from 'react'
import { useData } from '/src/providers/DataProvider.jsx'
import { useLanguage } from '/src/providers/LanguageProvider.jsx'
import { useParser } from '/src/hooks/parser.js'

function About() {
  const data = useData()
  const language = useLanguage()
  const parser = useParser()

  const sections = data.getSections()
  const coverSection = sections.find(s => s.id === 'about')
  const articles = parser.parseSectionArticles(coverSection)

  const textArticle = articles.find(a => a.component === 'ArticleText')
  const bioItem = textArticle?.orderedItems?.[0]

  const professionalInfo = [
    'Full-Stack Development',
    'Web Applications',
    'Frontend & Backend',
    'UI/UX Design',
    'API Development',
  ]

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about__header scroll-reveal">
          <span className="section-label">01 &mdash; About</span>
        </div>

        <h2 className="about__statement scroll-reveal stagger-1">
          I build digital products<br />from idea to production.
        </h2>

        <div className="about__grid">
          <div className="about__bio scroll-reveal-left stagger-2">
            {bioItem && (
              <div
                className="about__bio-text"
                dangerouslySetInnerHTML={{ __html: bioItem.locales?.text || '' }}
              />
            )}
          </div>

          <div className="about__info scroll-reveal-right stagger-3">
            <h3 className="about__info-heading">Professional Info</h3>
            <ul className="about__info-list">
              {professionalInfo.map((item, i) => (
                <li key={i} className="about__info-item">
                  <span className="about__info-dot" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
