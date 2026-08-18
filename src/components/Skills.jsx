import "./Skills.scss"
import React, { useMemo } from 'react'
import { useData } from '/src/providers/DataProvider.jsx'
import { useLanguage } from '/src/providers/LanguageProvider.jsx'
import { useParser } from '/src/hooks/parser.js'

function Skills() {
  const data = useData()
  const language = useLanguage()
  const parser = useParser()

  const sections = data.getSections()
  const skillsSection = sections.find(s => s.id === 'skills')
  const articles = parser.parseSectionArticles(skillsSection)

  const skillCategories = useMemo(() => {
    return articles
      .filter(a => a.component === 'ArticleSkills')
      .map(article => ({
        title: article.locales?.title || article.id,
        items: article.orderedItems || [],
      }))
  }, [articles])

  return (
    <section id="skills" className="skills">
      <div className="container">
        <span className="section-label scroll-reveal">04 &mdash; Skills</span>
        <h2 className="section-title scroll-reveal stagger-1">My Skill Set</h2>

        <div className="skills__grid">
          {skillCategories.map((cat, i) => (
            <div key={i} className={`skills__category scroll-reveal stagger-${Math.min(i + 2, 8)}`}>
              <h3 className="skills__category-title" dangerouslySetInnerHTML={{ __html: cat.title }} />
              <div className="skills__items">
                {cat.items.map((item) => (
                  <div key={item.id} className="skills__item">
                    {item.faIcon && (
                      <i className={`skills__icon ${item.faIcon}`} style={item.faIconStyle} />
                    )}
                    <span className="skills__name" dangerouslySetInnerHTML={{ __html: item.locales?.title || item.label }} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
