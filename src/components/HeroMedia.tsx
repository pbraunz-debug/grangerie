'use client'

import Image from 'next/image'
import {useEffect, useState} from 'react'

interface HeroMediaProps {
  videoUrl?: string
  posterUrl?: string
  alt: string
}

/**
 * Full-bleed hero media. The poster still carries the section until hero.mp4
 * exists; the <source> is only rendered when a file does. prefers-reduced-motion
 * swaps the loop for the still.
 */
export function HeroMedia({videoUrl, posterUrl, alt}: HeroMediaProps) {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const showVideo = Boolean(videoUrl) && !reducedMotion

  return (
    <div className="gr-photo" style={{position: 'absolute', inset: 0}}>
      {posterUrl && (
        <Image
          src={posterUrl}
          alt={alt}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          style={{objectFit: 'cover'}}
        />
      )}
      {showVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={posterUrl}
          aria-hidden="true"
          style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover'}}
        >
          {videoUrl && <source src={videoUrl} type="video/mp4" />}
        </video>
      )}
    </div>
  )
}
