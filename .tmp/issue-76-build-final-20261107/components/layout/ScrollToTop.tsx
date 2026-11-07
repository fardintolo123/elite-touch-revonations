'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/**
 * App Router navigation should start a normal page at its top. Next's native
 * scroll handling can otherwise retain the position from the page we left,
 * especially when the header is sticky. Hash links keep their browser target.
 */
export function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    if (window.location.hash) return

    // The site keeps smooth scrolling for intentional in-page anchors. Next's
    // route scroll should be immediate, otherwise the new page visibly sweeps
    // up from the old page's position before it reaches the top.
    const root = document.documentElement
    const body = document.body
    const previousRootBehavior = root.style.scrollBehavior
    const previousBodyBehavior = body.style.scrollBehavior
    root.style.scrollBehavior = 'auto'
    body.style.scrollBehavior = 'auto'
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })

    const restoreTimer = window.setTimeout(() => {
      root.style.scrollBehavior = previousRootBehavior
      body.style.scrollBehavior = previousBodyBehavior
    }, 1000)

    return () => {
      window.clearTimeout(restoreTimer)
      root.style.scrollBehavior = previousRootBehavior
      body.style.scrollBehavior = previousBodyBehavior
    }
  }, [pathname])

  return null
}
