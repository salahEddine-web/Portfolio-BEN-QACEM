import "./Contact.scss"
import React, { useState, useCallback } from 'react'
import { useData } from '/src/providers/DataProvider.jsx'
import { useLanguage } from '/src/providers/LanguageProvider.jsx'
import { useParser } from '/src/hooks/parser.js'

function Contact() {
  const data = useData()
  const language = useLanguage()
  const parser = useParser()

  const sections = data.getSections()
  const contactSection = sections.find(s => s.id === 'contact')
  const articles = parser.parseSectionArticles(contactSection)

  const formArticle = articles.find(a => a.component === 'ArticleContactForm')
  const infoArticle = articles.find(a => a.component === 'ArticleInfoList')
  const infoItems = infoArticle?.orderedItems || []

  const emailJsConfig = formArticle ? {
    publicKey: formArticle.settings?.emailJsPublicKey,
    serviceId: formArticle.settings?.emailJsServiceId,
    templateId: formArticle.settings?.emailJsTemplateId,
  } : {}

  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return

    if (emailJsConfig.publicKey && emailJsConfig.serviceId && emailJsConfig.templateId) {
      setSending(true)
      try {
        const { default: emailjs } = await import('@emailjs/browser')
        await emailjs.send(
          emailJsConfig.serviceId,
          emailJsConfig.templateId,
          {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
          },
          emailJsConfig.publicKey
        )
        setSubmitted(true)
      } catch (err) {
        window.location.href = `mailto:sorec.salaheddine@gmail.com?subject=Portfolio Contact from ${formData.name}&body=${encodeURIComponent(formData.message)}`
      } finally {
        setSending(false)
      }
    } else {
      window.location.href = `mailto:sorec.salaheddine@gmail.com?subject=Portfolio Contact from ${formData.name}&body=${encodeURIComponent(formData.message)}`
    }
  }, [formData, emailJsConfig])

  const linkedinItem = infoItems.find(i => i.locales?.title?.toLowerCase().includes('linkedin'))
  const githubItem = infoItems.find(i => i.locales?.title?.toLowerCase().includes('github'))

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="contact__cta scroll-reveal">
          <span className="section-label">07 &mdash; Contact</span>
          <h2 className="contact__heading">
            <span className="contact__heading-line">Have a project</span>
            <span className="contact__heading-line">in mind?</span>
          </h2>
          <p className="contact__subheading">
            Let's build<br />something great.
          </p>
        </div>

        <div className="contact__links scroll-reveal stagger-1">
          <a href="mailto:sorec.salaheddine@gmail.com" className="contact__link-item">
            <i className="fa-regular fa-envelope" />
            <span>sorec.salaheddine@gmail.com</span>
          </a>
          {linkedinItem?.link?.href && (
            <a href={linkedinItem.link.href} target="_blank" rel="noopener noreferrer" className="contact__link-item">
              <i className="fa-brands fa-linkedin" />
              <span>LinkedIn</span>
            </a>
          )}
          {githubItem?.link?.href && (
            <a href={githubItem.link.href} target="_blank" rel="noopener noreferrer" className="contact__link-item">
              <i className="fa-brands fa-github" />
              <span>GitHub</span>
            </a>
          )}
        </div>

        <div className="contact__form-section scroll-reveal stagger-2">
          {submitted ? (
            <div className="contact__success">
              <i className="fa-solid fa-check-circle" />
              <h3 dangerouslySetInnerHTML={{ __html: formArticle?.locales?.contactThankYouTitle || 'Thanks for reaching out!' }} />
              <p>{formArticle?.locales?.contactThankYouBody || "I'll get back to you soon."}</p>
            </div>
          ) : (
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="contact__field">
                <label className="contact__label" htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  className="contact__input"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
              </div>

              <div className="contact__field">
                <label className="contact__label" htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  className="contact__input"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                />
              </div>

              <div className="contact__field">
                <label className="contact__label" htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  className="contact__input contact__textarea"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                className="contact__submit"
                type="submit"
                disabled={sending}
              >
                {sending ? 'Sending...' : 'Send Message'}
                {!sending && <span className="contact__submit-arrow">&rarr;</span>}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default Contact
