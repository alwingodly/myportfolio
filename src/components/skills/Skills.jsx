'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Skills.css'

gsap.registerPlugin(ScrollTrigger)

const CATS = [
  { name: 'Frontend', span: 'c8 r2', skills: ['React.js', 'React Native', 'Next.js', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Tailwind CSS', 'Bootstrap', 'Redux Toolkit', 'Zustand', 'Context API', 'TanStack Query', 'Jetpack Compose', 'Kotlin', 'Jest'] },
  { name: 'Backend', span: 'c4', skills: ['Node.js', 'Express.js', 'REST APIs', 'MongoDB'] },
  { name: 'Tools & Practice', span: 'c4', skills: ['Git', 'Postman', 'Figma', 'VS Code', 'SSR', 'CSR', 'SOLID', 'OOP', 'Nx Monorepo'] },
]

export default function Skills() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    gsap.from('.sk-tile', {
      y: 26, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08,
      scrollTrigger: { trigger: '.sk-bento', start: 'top 84%', once: true },
    })
  }, { scope: sectionRef, dependencies: [] })

  return (
    <section id="skills" className="skills section" ref={sectionRef}>
      <div className="rail rail--wide">
        <div className="section-head">
          <div>
            <span className="eyebrow">Skills</span>
            <h2 className="section-title">The <span className="accent">toolkit</span></h2>
          </div>
        </div>

        <div className="sk-bento bento">
          {CATS.map((c) => (
            <div className={`tile sk-tile ${c.span}`} key={c.name}>
              <div className="sk-head">
                <span className="sk-name">{c.name}</span>
                <span className="sk-count">{String(c.skills.length).padStart(2, '0')}</span>
              </div>
              <div className="sk-chips">
                {c.skills.map((s) => <span className="chip" key={s}>{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
