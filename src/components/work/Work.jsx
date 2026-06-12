'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaArrowUpRightFromSquare, FaGithub } from 'react-icons/fa6'
import './Work.css'

gsap.registerPlugin(ScrollTrigger)

/* Confidential client work — case cards, no screenshots. */
const CLIENT = [
  {
    id: 'ckyc', index: '01', title: 'IOB CKYC Web App',
    scale: 'National Bank', role: 'Frontend Engineer · React.js', year: '2024',
    desc: 'Built the bank’s Central-KYC web application in React.js — optimised performance, cut unnecessary re-renders and resolved security vulnerabilities.',
    tech: ['React.js', 'Redux Toolkit', 'REST APIs', 'Security'],
  },
  {
    id: 'kyc', index: '02', title: 'IOB KYC Mobile App',
    scale: 'National Bank', role: 'Frontend Engineer · React Native', year: '2024',
    desc: 'Rebuilt the bank’s KYC mobile app in React Native — improved the architecture and navigation and integrated QR-code scanning for faster onboarding.',
    tech: ['React Native', 'QR Scanner', 'Navigation'],
  },
  {
    id: 'genomic', index: '03', title: 'Kerala Genomic Data Center',
    scale: 'Govt. of Kerala', role: 'Lead Frontend · React.js', year: '2024',
    desc: 'Led the frontend for a state genomic-data platform with React.js, Redux Toolkit and Tailwind CSS — delivered ahead of schedule.',
    tech: ['React.js', 'Redux Toolkit', 'Tailwind', 'RHF'],
  },
  {
    id: 'dms', index: '04', title: 'Document Management Suite',
    scale: 'Enterprise', role: 'Frontend · RN + Compose', year: '2023',
    desc: 'Built three document-management apps with voice search, breadcrumb navigation and native bridging — plus a custom Jetpack Compose annotation viewer (draw, zoom, pan, swipe) embedded in React Native.',
    tech: ['React Native', 'Jetpack Compose', 'Kotlin', 'SOLID'],
  },
]

/* Personal projects — real screenshots from /public. */
const PERSONAL = [
  {
    id: 'warehouse', title: 'Warehouse Management', stack: 'MERN', role: 'Full-Stack',
    desc: 'Inventory system with stock tracking, item movements and reporting dashboards.',
    tech: ['React', 'Node.js', 'MongoDB'],
    shots: ['/warehouse-managment1.png', '/warehouse-managment2.png', '/warehouse-managment3.png'],
  },
  {
    id: 'clinic', title: 'Clinic Appointment SaaS', stack: 'SaaS', role: 'Full-Stack', wip: true,
    desc: 'A multi-tenant SaaS for clinics — patient appointment booking, schedules and admin dashboards.',
    tech: ['React', 'Node.js', 'SaaS'],
    shots: ['/appointment-booking1.png', '/appointment-booking2.png', '/appointment-booking3.png'],
  },
]

function ShotCard({ p }) {
  const [i, setI] = useState(0)
  const n = p.shots.length
  const startX = useRef(0)
  const dragging = useRef(false)
  const go = (idx) => setI((idx + n) % n)

  const onStart = (x) => { startX.current = x; dragging.current = true }
  const onEnd = (x) => {
    if (!dragging.current) return
    dragging.current = false
    const dx = x - startX.current
    if (dx < -40) go(i + 1)
    else if (dx > 40) go(i - 1)
  }

  return (
    <article className="tile wk-shot-card c6">
      <div
        className="wk-carousel"
        onTouchStart={(e) => onStart(e.touches[0].clientX)}
        onTouchEnd={(e) => onEnd(e.changedTouches[0].clientX)}
        onPointerDown={(e) => onStart(e.clientX)}
        onPointerUp={(e) => onEnd(e.clientX)}
        onPointerLeave={() => (dragging.current = false)}
      >
        {p.wip && <span className="wk-wip">In progress</span>}
        <div className="wk-track" style={{ transform: `translateX(-${i * 100}%)` }}>
          {p.shots.map((s, idx) => (
            <div className="wk-slide" key={s}>
              <img src={s} alt={`${p.title} — screen ${idx + 1}`} draggable={false} loading="lazy" />
            </div>
          ))}
        </div>
        <button className="wk-nav wk-nav--prev" onClick={() => go(i - 1)} aria-label="Previous screenshot">‹</button>
        <button className="wk-nav wk-nav--next" onClick={() => go(i + 1)} aria-label="Next screenshot">›</button>
        <div className="wk-dots">
          {p.shots.map((_, idx) => (
            <button
              key={idx}
              className={`wk-dot ${idx === i ? 'is-active' : ''}`}
              onClick={() => go(idx)}
              aria-label={`Go to screenshot ${idx + 1}`}
            />
          ))}
        </div>
      </div>
      <div className="wk-shot-body">
        <div className="wk-shot-head">
          <h3 className="wk-shot-title">{p.title}</h3>
          <span className="wk-shot-stack">{p.stack}</span>
        </div>
        <span className="wk-card-role">{p.role}</span>
        <p className="wk-shot-desc">{p.desc}</p>
        <div className="wk-card-tech">
          {p.tech.map((t) => <span className="chip" key={t}>{t}</span>)}
        </div>
      </div>
    </article>
  )
}

export default function Work() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    gsap.from('.wk-card, .wk-shot-card', {
      y: 26, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.07,
      scrollTrigger: { trigger: '.work-grid', start: 'top 84%', once: true },
    })
  }, { scope: sectionRef, dependencies: [] })

  return (
    <section id="work" className="work section" ref={sectionRef}>
      <div className="rail rail--wide">
        <div className="section-head">
          <div>
            <span className="eyebrow">Selected Work</span>
            <h2 className="section-title">Shipped at <span className="accent">enterprise scale</span></h2>
          </div>
          <p className="work-note">
            Bank &amp; government work is confidential — those lead with scale, role and stack.
            Personal projects come with screenshots.
          </p>
        </div>

        {/* Client / confidential */}
        <div className="wk-group">Client Work <span>· confidential</span></div>
        <div className="work-grid bento">
          {CLIENT.map((p) => (
            <article className="tile tile-link wk-card c6" key={p.id}>
              <div className="wk-card-head">
                <span className="wk-scale"><span className="wk-scale-dot" />{p.scale}</span>
                <span className="wk-num">{p.index}</span>
              </div>
              <h3 className="wk-card-title">{p.title}</h3>
              <span className="wk-card-role">{p.role}<span className="wk-card-year"> · {p.year}</span></span>
              <p className="wk-card-desc">{p.desc}</p>
              <div className="wk-card-tech">
                {p.tech.map((t) => <span className="chip" key={t}>{t}</span>)}
              </div>
            </article>
          ))}
        </div>

        {/* Personal */}
        <div className="wk-group wk-group--mt">Personal Projects</div>
        <div className="work-grid bento">
          {PERSONAL.map((p) => <ShotCard key={p.id} p={p} />)}
        </div>

        <a href="https://github.com/alwingodly" target="_blank" rel="noopener noreferrer" className="tile tile-link wk-cta">
          <span className="wk-cta-text"><FaGithub /> More projects on GitHub</span>
          <FaArrowUpRightFromSquare className="wk-cta-arrow" />
        </a>
      </div>
    </section>
  )
}
