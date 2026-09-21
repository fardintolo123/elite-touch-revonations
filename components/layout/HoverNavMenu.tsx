'use client'

import Link from 'next/link'
import { useEffect, useState, type FocusEvent, type ReactNode } from 'react'

type HoverNavMenuProps = {
  href: string
  label: string
  children: ReactNode
}

/**
 * Desktop-only hover menu behavior.
 *
 * The panel and all of its links remain server-rendered children. This small
 * client boundary exists only to dismiss the panel after a link click; CSS
 * hover alone cannot close a menu when the pointer stays over the same header
 * position during a client-side route change.
 */
export function HoverNavMenu({ href, label, children }: HoverNavMenuProps) {
  const [enhanced, setEnhanced] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    setEnhanced(true)
  }, [])

  const open = !dismissed && (hovered || focused)

  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setFocused(false)
    }
  }

  return (
    <div
      className="et-nav-menu et-nav-menu-hover"
      data-enhanced={enhanced}
      data-open={open}
      onMouseEnter={() => {
        setHovered(true)
        setDismissed(false)
      }}
      onMouseLeave={() => {
        setHovered(false)
        setFocused(false)
        setDismissed(false)
      }}
      onFocus={() => setFocused(true)}
      onBlur={handleBlur}
      onClickCapture={() => setDismissed(true)}
    >
      <Link
        href={href}
        className="et-nav-menu-label"
        aria-haspopup="true"
        aria-expanded={open}
      >
        {label}
      </Link>
      {children}
    </div>
  )
}
