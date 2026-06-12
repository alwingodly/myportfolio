'use client'

import { useState, useEffect } from 'react'
import './Header.css'

const LINKS = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)

      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0)

      const ids = ['home', ...LINKS.map((l) => l.id)]
      let current = 'home'
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && window.scrollY + 160 >= el.offsetTop) current = id
      }
      setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
  }, [menuOpen])

  const close = () => setMenuOpen(false)

  return (
    <header className={scrolled ? 'header scrolled' : 'header'}>
      <div className="scroll-progress" style={{ width: `${progress}%` }} aria-hidden="true" />
      <div className="rail rail--wide nav">
        <a href="#home" className="logo" onClick={close}>
          <span className="logo-mark">AG</span>
          <span className="logo-text">Alwin <span className="logo-accent">Godly</span> Mathew</span>
        </a>

        <button
          className={menuOpen ? 'menu-toggle open' : 'menu-toggle'}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span /><span />
        </button>

        <nav className={menuOpen ? 'nav-menu active' : 'nav-menu'}>
          <ul>
            {LINKS.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} onClick={close} className={active === l.id ? 'nav-link active' : 'nav-link'}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" onClick={close} className="btn btn-primary nav-cta">Let&apos;s talk</a>
        </nav>
      </div>
    </header>
  )
}
