import "./Services.scss"
import React from 'react'

const SERVICES = [
  {
    number: '01',
    title: 'Web Development',
    description: 'Modern responsive websites and web applications built with cutting-edge technologies.',
  },
  {
    number: '02',
    title: 'Full-Stack Development',
    description: 'Frontend + backend architecture and API development for complete solutions.',
  },
  {
    number: '03',
    title: 'UI / UX Implementation',
    description: 'Turning designs into responsive and interactive interfaces with pixel-perfect accuracy.',
  },
  {
    number: '04',
    title: 'Business Solutions',
    description: 'Custom digital solutions tailored for businesses and organizations.',
  },
]

function Services() {
  return (
    <section id="services" className="services">
      <div className="container">
        <span className="section-label scroll-reveal">04 &mdash; What I Do</span>
        <h2 className="section-title scroll-reveal stagger-1">Services</h2>

        <div className="services__grid">
          {SERVICES.map((service, i) => (
            <div key={i} className={`services__card scroll-reveal stagger-${Math.min(i + 2, 8)}`}>
              <span className="services__number">{service.number}</span>
              <h3 className="services__title">{service.title}</h3>
              <p className="services__description">{service.description}</p>
              <span className="services__arrow">&rarr;</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
