'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Providers({ children }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    })

    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    // ── Parallax (skipped under reduced-motion) ──
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let ctx
    if (!reduce) {
      ctx = gsap.context(() => {
        // Any element tagged data-parallax="<speed>" drifts as it crosses the viewport.
        gsap.utils.toArray('[data-parallax]').forEach((el) => {
          const speed = parseFloat(el.dataset.parallax) || 0.12
          gsap.fromTo(
            el,
            { yPercent: -speed * 50 },
            {
              yPercent: speed * 50, ease: 'none',
              scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
            }
          )
        })
        // Subtle drift on every section heading — the "layers move at different speeds" feel.
        gsap.utils.toArray('.section-title').forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: -4 },
            {
              yPercent: 4, ease: 'none',
              scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
            }
          )
        })
      })
    }

    // ── Liquid-glass glare: a soft light follows the cursor across the hovered tile ──
    let glareRaf = 0
    let lastEvt = null
    const updateGlare = () => {
      glareRaf = 0
      const e = lastEvt
      const tile = e && e.target.closest && e.target.closest('.tile')
      if (!tile) return
      const r = tile.getBoundingClientRect()
      tile.style.setProperty('--gx', `${((e.clientX - r.left) / r.width) * 100}%`)
      tile.style.setProperty('--gy', `${((e.clientY - r.top) / r.height) * 100}%`)
    }
    const onPointerMove = (e) => {
      lastEvt = e
      if (!glareRaf) glareRaf = requestAnimationFrame(updateGlare)
    }
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (finePointer) window.addEventListener('pointermove', onPointerMove, { passive: true })

    ScrollTrigger.refresh()
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)

    return () => {
      window.removeEventListener('load', onLoad)
      if (finePointer) window.removeEventListener('pointermove', onPointerMove)
      if (glareRaf) cancelAnimationFrame(glareRaf)
      ctx?.revert()
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
