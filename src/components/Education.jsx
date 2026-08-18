import "./Education.scss"
import React from 'react'
import { useData } from '/src/providers/DataProvider.jsx'
import { useParser } from '/src/hooks/parser.js'

function Education() {
  const data = useData()
  const parser = useParser()

  const sections = data.getSections()
  const educationSection = sections.find(s => s.id === 'education')
  const articles = parser.parseSectionArticles(educationSection)
  const timelineArticle = articles.find(a => a.component === 'ArticleTimeline')
  const items = timelineArticle?.orderedItems || []

  return (
    <section id="education" className="education">
      <div className="container">
        <span className="section-label scroll-reveal">05 &mdash; Education</span>
        <h2 className="section-title scroll-reveal stagger-1">Education Background</h2>

        <div className="education__list">
          {items.map((item, i) => (
            <div key={item.id} className={`education__card scroll-reveal stagger-${Math.min(i + 2, 8)}`}>
              <div className="education__card-accent" aria-hidden="true" />

              <div className="education__card-body">
                <div className="education__card-dates">
                  <span dangerouslySetInnerHTML={{ __html: item.dateStartDisplay }} />
                  {item.dateEnd && (
                    <>
                      <span className="education__card-sep">&mdash;</span>
                      <span dangerouslySetInnerHTML={{ __html: item.dateEndDisplay }} />
                    </>
                  )}
                </div>

                <h3 className="education__degree" dangerouslySetInnerHTML={{ __html: item.locales?.title || item.label }} />
                <p className="education__institution">{item.locales?.institution}</p>

                {item.locales?.text && (
                  <p className="education__text" dangerouslySetInnerHTML={{ __html: item.locales.text }} />
                )}

                {item.locales?.list?.length > 0 && (
                  <ul className="education__list-detail">
                    {item.locales.list.map((li, j) => (
                      <li key={j} className="education__list-item" dangerouslySetInnerHTML={{ __html: li }} />
                    ))}
                  </ul>
                )}

                {item.locales?.tags?.length > 0 && (
                  <div className="education__tags">
                    {item.locales.tags.map((tag, j) => (
                      <span key={j} className="education__tag">{tag}</span>
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

export default Education
