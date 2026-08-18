import "./Projects.scss"
import React, { useState } from 'react'
import { useData } from '/src/providers/DataProvider.jsx'
import { useLanguage } from '/src/providers/LanguageProvider.jsx'
import { useParser } from '/src/hooks/parser.js'
import ProjectModal from '/src/components/ProjectModal.jsx'

function Projects() {
  const data = useData()
  const language = useLanguage()
  const parser = useParser()
  const [selectedProject, setSelectedProject] = useState(null)

  const sections = data.getSections()
  const portfolioSection = sections.find(s => s.id === 'portfolio')
  const articles = parser.parseSectionArticles(portfolioSection)
  const portfolioArticle = articles.find(a => a.component === 'ArticlePortfolio')
  const projects = portfolioArticle?.orderedItems || []

  const profile = data.getProfile()

  return (
    <section id="portfolio" className="projects">
      <div className="container">
        <span className="section-label scroll-reveal">02 &mdash; Selected Work</span>
        <p className="section-subtitle scroll-reveal stagger-1">
          A selection of projects I've designed and developed.
        </p>

        <div className="projects__list">
          {projects.map((project, i) => (
            <div key={project.id} className={`projects__item scroll-reveal stagger-${(i % 4) + 1}`}>
              <div className={`projects__item-inner ${i % 2 !== 0 ? 'projects__item-inner--reversed' : ''}`}>
                <div
                  className="projects__image-wrap cursor-view"
                  onClick={() => setSelectedProject(project)}
                >
                  {project.img ? (
                    <img src={project.img} alt={project.imageAlt} className="projects__image" />
                  ) : (
                    <div className="projects__image-placeholder">
                      <i className={project.faIcon || 'fa-solid fa-folder-open'} />
                    </div>
                  )}
                </div>

                <div className="projects__info">
                  <span className="projects__number">
                    Project {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="projects__title" dangerouslySetInnerHTML={{ __html: project.locales?.title || project.label }} />
                  <p
                    className="projects__description"
                    dangerouslySetInnerHTML={{ __html: project.locales?.text || '' }}
                  />
                  {project.locales?.tags?.length > 0 && (
                    <div className="projects__tags">
                      {project.locales.tags.map((tag, j) => (
                        <span key={j} className="projects__tag">{tag}</span>
                      ))}
                    </div>
                  )}
                  <div className="projects__links">
                    {project.preview?.links?.map((link, j) => (
                      <a
                        key={j}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="projects__link"
                      >
                        {link.faIcon?.includes('github') ? 'GitHub' : 'View Live'}
                        <span className="projects__link-arrow">&rarr;</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="projects__footer scroll-reveal">
          <a
            href={profile.locales?.en?.github_url || 'https://github.com/salahEddine-web'}
            target="_blank"
            rel="noopener noreferrer"
            className="projects__view-all"
          >
            View All Projects <span>&rarr;</span>
          </a>
        </div>
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  )
}

export default Projects
