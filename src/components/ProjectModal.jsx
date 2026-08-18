import "./ProjectModal.scss"
import React, { useEffect, useCallback } from 'react'

function ProjectModal({ project, onClose }) {
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [handleKeyDown])

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  const links = project.preview?.links || []

  return (
    <div className="project-modal" onClick={handleBackdropClick}>
      <div className="project-modal__card">
        <button className="project-modal__close" onClick={onClose} aria-label="Close">
          <i className="fa-solid fa-xmark" />
        </button>

        <div className="project-modal__header">
          <span className="project-modal__label">Project Details</span>
          <h2 className="project-modal__title">{project.locales?.title || project.label}</h2>
        </div>

        {project.img && (
          <div className="project-modal__image-wrap">
            <img src={project.img} alt={project.imageAlt} className="project-modal__image" />
          </div>
        )}

        <div className="project-modal__body">
          <p
            className="project-modal__description"
            dangerouslySetInnerHTML={{ __html: project.locales?.text || '' }}
          />

          {project.locales?.tags?.length > 0 && (
            <div className="project-modal__tags">
              {project.locales.tags.map((tag, j) => (
                <span key={j} className="project-modal__tag">{tag}</span>
              ))}
            </div>
          )}

          {links.length > 0 && (
            <div className="project-modal__links">
              {links.map((link, j) => (
                <a
                  key={j}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-modal__link"
                >
                  <i className={link.faIcon || 'fa-solid fa-link'} />
                  {link.faIcon?.includes('github') ? ' View on GitHub' : ' View Live'}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectModal
