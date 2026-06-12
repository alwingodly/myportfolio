'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Experience.css'

gsap.registerPlugin(ScrollTrigger)

const ROLES = [
  {
    company: 'Ospyn Technologies', role: 'Software Engineer · React & React Native',
    period: 'Oct 2023 — Present', current: true, span: 'c12', wide: true,
    points: [
      'Led the frontend for the Kerala Genomic Data Center (React.js, Redux Toolkit, Tailwind) — delivered ahead of schedule.',
      'Built the IOB CKYC web app in React.js — optimised performance, cut re-renders and fixed security vulnerabilities.',
      'Rebuilt the IOB KYC mobile app in React Native — architecture, navigation and QR-code scanning.',
      'Developed three document-management apps with voice search, breadcrumb navigation and Jetpack Compose native bridging.',
      'Built a custom Compose annotation viewer — draw, zoom, pan, swipe — integrated into React Native.',
      'Integrated Google Maps API; assisted Dhanalakshmi Bank web-platform integration & debugging.',
      'Designed responsive UI/UX in Figma with reusable components and custom animation hooks.',
    ],
  },
  {
    company: 'Open Leaves', role: 'Associate Software Engineer',
    period: 'Jan 2022 — Oct 2022', span: 'c6',
    points: [
      'Built responsive web apps with React.js, Next.js, HTML, CSS and Bootstrap.',
      'Basic backend work across Node.js, Express.js and MongoDB.',
    ],
  },
  {
    company: 'Brototype', role: 'MERN Stack Trainee',
    period: 'Nov 2022 — Sep 2023', span: 'c6',
    points: [
      'Built an SSR e-commerce platform with user & admin dashboards — Figma UI/UX, deployed on AWS.',
      'Developed a mini social app and a real-time chat app with Socket.io.',
    ],
  },
]

export default function Experience() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    gsap.from('.xp-tile', {
      y: 26, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1,
      scrollTrigger: { trigger: '.xp-bento', start: 'top 84%', once: true },
    })
  }, { scope: sectionRef, dependencies: [] })

  return (
    <section id="experience" className="experience section" ref={sectionRef}>
      <div className="rail rail--wide">
        <div className="section-head">
          <div>
            <span className="eyebrow">Experience</span>
            <h2 className="section-title">Where I&apos;ve <span className="accent">worked</span></h2>
          </div>
        </div>

        <div className="xp-bento bento">
          {ROLES.map((r) => (
            <div className={`tile xp-tile ${r.span} ${r.wide ? 'xp-wide' : ''}`} key={r.company}>
              <div className="xp-top">
                <span className="xp-co">{r.company}</span>
                {r.current && <span className="xp-now"><span className="dot-live" /> Current</span>}
              </div>
              <div className="xp-meta">
                <span className="xp-role">{r.role}</span>
                <span className="xp-period">{r.period}</span>
              </div>
              <ul className="xp-points">
                {r.points.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
