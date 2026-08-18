import "./Footer.scss"
import React from 'react'

function Footer({ scrollTo }) {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__left">
          <span className="footer__brand">BEN QACEM Salah Eddine</span>
          <span className="footer__copy">&copy; {year}. All rights reserved.</span>
        </div>
        <div className="footer__right">
          <button className="footer__link" onClick={() => scrollTo('hero')}>Home</button>
          <button className="footer__link" onClick={() => scrollTo('about')}>About</button>
          <button className="footer__link" onClick={() => scrollTo('portfolio')}>Projects</button>
          <button className="footer__link" onClick={() => scrollTo('contact')}>Contact</button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
