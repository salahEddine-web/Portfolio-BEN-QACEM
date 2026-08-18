import "./Learning.scss"
import React from 'react'

const TOPICS = [
  'AI / LLM',
  'Docker',
  'DevOps',
  'Cloud',
  'Advanced React',
  'Modern Architecture',
  'GraphQL',
  'Flutter',
  'CI/CD',
]

function Learning() {
  return (
    <section id="learning" className="learning">
      <div className="container">
        <span className="section-label scroll-reveal">06 &mdash; Learning</span>
        <h2 className="section-title scroll-reveal stagger-1">Currently Exploring</h2>
        <p className="section-subtitle scroll-reveal stagger-2">
          Technologies and concepts I'm currently diving into.
        </p>

        <div className="learning__strip scroll-reveal stagger-3">
          {TOPICS.map((topic, i) => (
            <span key={i} className="learning__tag" style={{ animationDelay: `${i * 0.15}s` }}>
              {topic}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Learning
