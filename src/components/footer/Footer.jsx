'use client'

import './Footer.css'
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp } from 'react-icons/fa'

const NAV = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="rail rail--wide">
        <div className="footer-top">
          <a href="#home" className="footer-brand">
            Alwin <span className="footer-accent">Godly</span> Mathew
          </a>
          <nav className="footer-nav">
            {NAV.map((n) => <a key={n.id} href={`#${n.id}`}>{n.label}</a>)}
          </nav>
        </div>

        <div className="rule footer-rule" />

        <div className="footer-bottom">
          <span className="footer-copy">© {new Date().getFullYear()} Alwin Godly Mathew. All rights reserved.</span>
          <div className="footer-social">
            <a href="https://github.com/alwingodly" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
            <a href="https://www.linkedin.com/in/alwin-godly-mathew-a42754217" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
            <a href="mailto:alwingodlymathew@gmail.com" aria-label="Email"><FaEnvelope /></a>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top"><FaArrowUp /></button>
          </div>
        </div>
      </div>
    </footer>
  )
}
