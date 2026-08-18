import "./Experience.scss"
import React from 'react'
import { useData } from '/src/providers/DataProvider.jsx'
import { useParser } from '/src/hooks/parser.js'

function Experience() {
  const data = useData()
  const parser = useParser()

  const sections = data.getSections()
  const experienceSection = sections.find(s => s.id === 'experience')
  const articles = parser.parseSectionArticles(experienceSection)
  const timelineArticle = articles.find(a => a.component === 'ArticleTimeline')
  const items = timelineArticle?.orderedItems || []

  return (
    <section id="experience" className="experience">
      <div className="container">
        <span className="section-label scroll-reveal">03 &mdash; Experience</span>
        <h2 className="section-title scroll-reveal stagger-1">Work Experience</h2>

        <div className="experience__timeline">
          <div className="experience__line" aria-hidden="true" />

          {items.map((item, i) => (
            <div key={item.id} className={`experience__entry scroll-reveal stagger-${Math.min(i + 2, 8)}`}>
              <div className="experience__dot" aria-hidden="true" />

              <div className="experience__content">
                <div className="experience__dates">
                  <span dangerouslySetInnerHTML={{ __html: item.dateStartDisplay }} />
                  {item.dateEnd && (
                    <>
                      <span className="experience__dates-sep">&mdash;</span>
                      <span dangerouslySetInnerHTML={{ __html: item.dateEndDisplay }} />
                    </>
                  )}
                </div>

                <h3 className="experience__position">{item.locales?.title || item.label}</h3>
                <p className="experience__institution">{item.locales?.institution}</p>

                {item.locales?.text && (
                  <p className="experience__text">{item.locales.text}</p>
                )}

                {item.locales?.list?.length > 0 && (
                  <ul className="experience__list">
                    {item.locales.list.map((li, j) => (
                      <li key={j} className="experience__list-item" dangerouslySetInnerHTML={{ __html: li }} />
                    ))}
                  </ul>
                )}

                {item.locales?.tags?.length > 0 && (
                  <div className="experience__tags">
                    {item.locales.tags.map((tag, j) => (
                      <span key={j} className="experience__tag">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
