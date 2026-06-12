'use client'

import { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Contact.css'
import emailjs from '@emailjs/browser'
import { FaGithub, FaLinkedin, FaArrowRight } from 'react-icons/fa'

gsap.registerPlugin(ScrollTrigger)

const service_Id = process.env.NEXT_PUBLIC_SERVICE_ID
const template_Id = process.env.NEXT_PUBLIC_TEMPLATE_ID
const public_Key = process.env.NEXT_PUBLIC_EMAILJS_KEY

export default function Contact() {
  const sectionRef = useRef(null)
  const formRef = useRef(null)
  const [data, setData] = useState({ name: '', email: '', subject: '', message: '' })
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState({ ok: null, msg: '' })

  useGSAP(() => {
    gsap.from('.ct-tile', {
      y: 26, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08,
      scrollTrigger: { trigger: '.ct-bento', start: 'top 84%', once: true },
    })
  }, { scope: sectionRef, dependencies: [] })

  const handle = (e) => setData({ ...data, [e.target.name]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    setBusy(true)
    setStatus({ ok: null, msg: '' })
    emailjs.sendForm(service_Id, template_Id, formRef.current, public_Key)
      .then(() => {
        setBusy(false)
        setStatus({ ok: true, msg: "Message sent — I'll get back to you soon." })
        setData({ name: '', email: '', subject: '', message: '' })
      })
      .catch(() => {
        setBusy(false)
        setStatus({ ok: false, msg: 'Something went wrong. Please try again.' })
      })
  }

  return (
    <section id="contact" className="contact section" ref={sectionRef}>
      <div className="rail rail--wide">
        <div className="section-head">
          <div>
            <span className="eyebrow">Contact</span>
            <h2 className="section-title">Let&apos;s build <span className="accent">something</span></h2>
          </div>
        </div>

        <div className="ct-bento bento">
          {/* CTA banner */}
          <div className="tile tile--accent ct-tile ct-banner c12">
            <div className="ct-banner-text">
              <span className="ct-banner-kick">Available for freelance &amp; full-time</span>
              <p className="ct-banner-head">Have a project, a role, or an idea worth building?</p>
            </div>
            <a href="mailto:alwingodlymathew@gmail.com" className="btn btn-ghost ct-banner-btn">
              alwingodlymathew@gmail.com <FaArrowRight />
            </a>
          </div>

          {/* Form */}
          <div className="tile ct-tile ct-form c8">
            {status.msg && (
              <div className={`ct-status ${status.ok ? 'ok' : 'err'}`} role="alert" aria-live="polite">{status.msg}</div>
            )}
            <form ref={formRef} onSubmit={submit} className="ct-form-el">
              <div className="ct-row">
                <div className="ct-field">
                  <label htmlFor="name">Name</label>
                  <input id="name" name="name" type="text" value={data.name} onChange={handle} required placeholder="Your name" autoComplete="name" />
                </div>
                <div className="ct-field">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" value={data.email} onChange={handle} required placeholder="you@email.com" autoComplete="email" />
                </div>
              </div>
              <div className="ct-field">
                <label htmlFor="subject">Subject</label>
                <input id="subject" name="subject" type="text" value={data.subject} onChange={handle} required placeholder="What's this about?" />
              </div>
              <div className="ct-field">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" value={data.message} onChange={handle} required placeholder="Tell me a little about it…" rows={5} />
              </div>
              <button type="submit" className="btn btn-accent" disabled={busy} aria-busy={busy}>
                {busy ? 'Sending…' : <>Send message <FaArrowRight /></>}
              </button>
            </form>
          </div>

          {/* Details */}
          <div className="tile ct-tile ct-details c4">
            <div className="ct-detail">
              <span className="tile-label">Phone</span>
              <a href="tel:+919746564270" className="ct-detail-val">+91 97465 64270</a>
            </div>
            <div className="ct-detail">
              <span className="tile-label">Location</span>
              <span className="ct-detail-val">Trivandrum, Kerala, IN</span>
            </div>
            <div className="ct-detail">
              <span className="tile-label">Elsewhere</span>
              <div className="ct-social">
                <a href="https://github.com/alwingodly" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
                <a href="https://www.linkedin.com/in/alwin-godly-mathew-a42754217" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
