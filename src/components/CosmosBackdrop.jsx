'use client'

import dynamic from 'next/dynamic'

const ThreeScene = dynamic(() => import('./hero/ThreeScene'), { ssr: false })

// Page-level black-hole backdrop: sits behind every (transparent) section,
// spans the top of the page and fades out toward the bottom via a mask.
export default function CosmosBackdrop() {
  return (
    <div className="cosmos" aria-hidden="true">
      <ThreeScene />
    </div>
  )
}
