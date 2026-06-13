'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'

const ThreeScene = dynamic(() => import('./hero/ThreeScene'), { ssr: false })

// Page-level black-hole backdrop: sits behind every (transparent) section,
// spans the top of the page and fades out toward the bottom via a mask.
//
// The raymarched WebGL scene is heavy, so we only run it on capable (desktop,
// fine-pointer, motion-OK) devices and pause it when it scrolls out of view or
// the tab is hidden. On phones / touch / reduced-motion we render a cheap static
// CSS approximation instead — no WebGL, no per-frame GPU cost.
export default function CosmosBackdrop() {
  const ref = useRef(null)
  const [useGL, setUseGL] = useState(false)
  const [inView, setInView] = useState(true)
  const [tabVisible, setTabVisible] = useState(true)

  useEffect(() => {
    const capable = window.matchMedia('(min-width: 769px) and (pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setUseGL(capable && !reduce)
  }, [])

  useEffect(() => {
    if (!useGL) return
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '120px' }
    )
    io.observe(el)
    const onVis = () => setTabVisible(!document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [useGL])

  return (
    <div className="cosmos" aria-hidden="true" ref={ref}>
      {useGL ? <ThreeScene active={inView && tabVisible} /> : <div className="cosmos-fallback" />}
    </div>
  )
}
