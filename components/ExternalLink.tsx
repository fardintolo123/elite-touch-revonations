import type { AnchorHTMLAttributes, ReactNode } from 'react'

type ExternalLinkProps = {
  href: string
  children: ReactNode
  className?: string
} & Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'children' | 'className' | 'href' | 'rel' | 'target'
>

export function ExternalLink({
  href,
  children,
  className = 'et-link',
  ...props
}: ExternalLinkProps) {
  return (
    <a
      className={className}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      {...props}
    >
      {children}
    </a>
  )
}
