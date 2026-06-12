'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

const FOCUS = ['Scalable architecture', 'Performance', 'Cross-platform', 'State management', 'REST APIs', 'SOLID']
const WHAT = [
  'Enterprise web apps in React.js',
  'Cross-platform mobile in React Native',
  'UI/UX from Figma to production',
  'API integration & state management',
]

export default function About() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    gsap.from('.about-bento > *', {
      y: 26, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.07,
      scrollTrigger: { trigger: '.about-bento', start: 'top 82%', once: true },
    })
  }, { scope: sectionRef, dependencies: [] })

  return (
    <section id="about" className="about section" ref={sectionRef}>
      <div className="rail rail--wide">
        <div className="section-head">
          <div>
            <span className="eyebrow">About</span>
            <h2 className="section-title">The person <span className="accent">behind the code</span></h2>
          </div>
        </div>

        <div className="about-bento bento">
          <div className="tile ab-bio c8 r2">
            <span className="tile-label">A bit about me</span>
            <p className="ab-lead">
              I&apos;m a frontend-focused engineer with <strong>3+ years</strong> turning complex
              requirements into fast, reliable interfaces.
            </p>
            <p className="ab-text">
              At Ospyn Technologies I&apos;ve led frontend delivery for national banks and a state
              genomic-data centre — KYC/CKYC, document management and more — with React, React Native,
              Redux Toolkit and Tailwind, backed by working Node, Express and MongoDB range.
            </p>
          </div>

          <div className="tile tile--dark ab-now c4">
            <span className="tile-label">Currently</span>
            <div className="ab-now-role">Software Engineer</div>
            <div className="ab-now-co">Ospyn Technologies</div>
            <div className="ab-now-when">Oct 2023 → Now</div>
          </div>

          <div className="tile ab-focus c4">
            <span className="tile-label">Focus</span>
            <div className="ab-chips">
              {FOCUS.map((f) => <span className="chip" key={f}>{f}</span>)}
            </div>
          </div>

          <div className="tile ab-what c8">
            <span className="tile-label">What I do</span>
            <ul className="ab-list">
              {WHAT.map((w) => <li key={w}>{w}</li>)}
            </ul>
          </div>

          <div className="tile tile--soft ab-approach c4">
            <span className="tile-label">Approach</span>
            <p className="ab-approach-text">Clean, <span className="accent">SOLID-driven</span> code. Ship fast — keep it maintainable.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
