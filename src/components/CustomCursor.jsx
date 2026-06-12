'use client'

import { useEffect, useRef } from 'react'

/*
  Calm premium cursor: a precise dot that tracks 1:1 and a ring that lags
  behind, swelling over interactive elements. No particles / ripples / sparkles —
  restraint reads as premium.
*/
export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return

    document.body.classList.add('custom-cursor')

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ring = { ...mouse }
    let raf

    const loop = () => {
      ring.x += (mouse.x - ring.x) * 0.16
      ring.y += (mouse.y - ring.y) * 0.16
      if (dotRef.current) dotRef.current.style.transform = `translate(${mouse.x}px, ${mouse.y}px)`
      if (ringRef.current) ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px)`
      raf = requestAnimationFrame(loop)
    }
    loop()

    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY }
    const onEnter = () => ringRef.current?.classList.add('hover')
    const onLeave = () => ringRef.current?.classList.remove('hover')

    document.addEventListener('mousemove', onMove, { passive: true })

    // Delegated hover state — survives DOM changes without per-node listeners
    const isInteractive = (t) => t.closest?.('a, button, .btn, input, textarea, select, [data-cursor="hover"]')
    const over = (e) => { if (isInteractive(e.target)) onEnter() }
    const out = (e) => { if (isInteractive(e.target)) onLeave() }
    document.addEventListener('mouseover', over)
    document.addEventListener('mouseout', out)

    return () => {
      document.body.classList.remove('custom-cursor')
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', over)
      document.removeEventListener('mouseout', out)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  )
}
