'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Education.css'

gsap.registerPlugin(ScrollTrigger)

const DEGREES = [
  { span: 'c6', year: 'Aug 2017 — Jul 2021', score: 'CGPA 7.95', degree: 'B.Tech · Electronics & Communication', school: 'Sree Buddha College of Engineering', big: true },
  { span: 'c3', year: '2017', score: 'CGPA 7.12', degree: 'Higher Secondary', school: 'St. George Sr. Sec. School' },
  { span: 'c3', year: '2015', score: 'CGPA 8.6', degree: 'Secondary School', school: 'St. George Sr. Sec. School' },
]

export default function Education() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    gsap.from('.ed-tile', {
      y: 26, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08,
      scrollTrigger: { trigger: '.ed-bento', start: 'top 84%', once: true },
    })
  }, { scope: sectionRef, dependencies: [] })

  return (
    <section id="education" className="education section" ref={sectionRef}>
      <div className="rail rail--wide">
        <div className="section-head">
          <div>
            <span className="eyebrow">Education</span>
            <h2 className="section-title"><span className="accent">Foundations</span></h2>
          </div>
        </div>

        <div className="ed-bento bento">
          {DEGREES.map((d) => (
            <div className={`tile ed-tile ${d.span} ed-deg ${d.big ? 'ed-big' : ''}`} key={d.degree}>
              <div className="ed-badges">
                <span className="ed-year">{d.year}</span>
                <span className="ed-score">{d.score}</span>
              </div>
              <div className="ed-degree">{d.degree}</div>
              <div className="ed-school">{d.school}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
