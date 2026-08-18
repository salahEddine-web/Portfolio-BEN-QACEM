import "./Stats.scss"
import React, { useMemo } from 'react'
import { useData } from '/src/providers/DataProvider.jsx'

function Stats() {
  const data = useData()
  const sections = data.getSections()

  const stats = useMemo(() => {
    const portfolioSection = sections.find(s => s.id === 'portfolio')
    const skillsSection = sections.find(s => s.id === 'skills')
    const educationSection = sections.find(s => s.id === 'education')
    const experienceSection = sections.find(s => s.id === 'experience')

    const projectCount = portfolioSection?.data?.articles?.[0]?.items?.length || 0

    const skillArticles = skillsSection?.data?.articles || []
    let techCount = 0
    skillArticles.forEach(article => {
      if (article.component === 'ArticleSkills') {
        techCount += article.items?.length || 0
      }
    })

    const educationItems = educationSection?.data?.articles?.[0]?.items || []
    let earliestYear = new Date().getFullYear()
    educationItems.forEach(item => {
      if (item.dateStart?.year && item.dateStart.year < earliestYear) {
        earliestYear = item.dateStart.year
      }
    })
    const yearsExperience = new Date().getFullYear() - earliestYear

    let internships = 0
    const experienceItems = experienceSection?.data?.articles?.[0]?.items || []
    experienceItems.forEach(item => {
      const title = item.locales?.en?.title || ''
      if (title.toLowerCase().includes('intern') || title.toLowerCase().includes('stagiaire')) {
        internships++
      }
    })

    return [
      { number: String(yearsExperience).padStart(2, '0') + '+', label: 'Years learning & building' },
      { number: String(Math.max(projectCount, 10)).padStart(2, '0') + '+', label: 'Projects completed' },
      { number: String(Math.max(techCount, 5)).padStart(2, '0') + '+', label: 'Technologies mastered' },
      { number: String(internships || 1).padStart(2, '0'), label: 'Professional internships' },
    ]
  }, [sections])

  return (
    <section id="stats" className="stats">
      <div className="container">
        <span className="section-label scroll-reveal">02 &mdash; Stats</span>
        <div className="stats__grid">
          {stats.map((stat, i) => (
            <div key={i} className={`stats__item scroll-reveal stagger-${i + 1}`}>
              <span className="stats__number">{stat.number}</span>
              <span className="stats__label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats
