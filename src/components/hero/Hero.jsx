'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowRight, FaArrowDown } from 'react-icons/fa'
import './Hero.css'

export default function Hero() {
  const heroRef = useRef(null)

  useGSAP(() => {
    gsap.from('.hero-bento > *', {
      y: 24, opacity: 0, duration: 0.75, ease: 'power3.out', stagger: 0.08, delay: 0.05,
    })
  }, { scope: heroRef, dependencies: [] })

  return (
    <section id="home" className="hero" ref={heroRef}>
      <div className="rail rail--wide">
        <div className="hero-bento">

          {/* Intro — focal tile */}
          <div className="tile h-intro">
            <div className="h-intro-top">
              <span className="h-avail"><span className="dot-live" /> Available for work</span>
              <span className="tile-label">React &amp; React Native Dev</span>
            </div>
            <h1 className="h-name">Alwin Godly Mathew<span className="h-dot">.</span></h1>
            <p className="h-tag">
              I build scalable web &amp; mobile products — enterprise KYC platforms and
              genomic-data systems — with React, React Native &amp; Node.
            </p>
            <div className="h-cta">
              <a href="#work" className="btn btn-primary">View work <FaArrowRight /></a>
              <a href="#contact" className="btn btn-ghost">Get in touch</a>
            </div>
          </div>

          {/* Stats (combined) */}
          <div className="tile h-stats">
            <div className="h-stat"><span className="h-stat-num">3<span>+</span></span><span className="tile-label">Years exp.</span></div>
            <div className="h-stat"><span className="h-stat-num">10<span>+</span></span><span className="tile-label">Projects shipped</span></div>
            <div className="h-stat"><span className="h-stat-num">2</span><span className="tile-label">Companies</span></div>
          </div>

          {/* Links (combined) */}
          <div className="tile h-links">
            <div className="h-links-row">
              <a href="https://github.com/alwingodly" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
              <a href="https://www.linkedin.com/in/alwin-godly-mathew-a42754217" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
              <a href="mailto:alwingodlymathew@gmail.com" aria-label="Email"><FaEnvelope /></a>
            </div>
            <a href="/Alwin_React_Developer.pdf" download className="h-resume">Download CV <FaArrowDown /></a>
          </div>

        </div>
      </div>
    </section>
  )
}
