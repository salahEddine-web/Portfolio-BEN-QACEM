import "./Marquee.scss"
import React from 'react'

const TECHS = [
  'React.js', 'Angular', 'Laravel', 'PHP', 'JavaScript', 'TypeScript',
  'MySQL', 'Node.js', 'Git', 'Docker', 'HTML', 'CSS',
  'REST API', 'MongoDB', 'Vue.js', 'Next.js', 'Tailwind CSS', 'PostgreSQL'
]

function Marquee() {
  return (
    <div className="marquee">
      <div className="marquee__track">
        <div className="marquee__content">
          {TECHS.map((tech, i) => (
            <span key={i} className="marquee__item">
              {tech}
              <span className="marquee__bullet">&bull;</span>
            </span>
          ))}
        </div>
        <div className="marquee__content" aria-hidden="true">
          {TECHS.map((tech, i) => (
            <span key={`dup-${i}`} className="marquee__item">
              {tech}
              <span className="marquee__bullet">&bull;</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Marquee
