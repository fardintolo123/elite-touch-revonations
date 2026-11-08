/**
 * Small line icons for the header dropdown rows (DECISIONS.md D-174, D-176).
 *
 * Server component with inline SVG: no icon library and no client JavaScript,
 * so the menus cost a few hundred bytes of HTML and nothing else
 * (PERFORMANCE_BUDGET.md). Each icon says what its row is about, so they are
 * used only on rows that need telling apart. Suburb links stay plain text:
 * thirty identical pins would be decoration (DISTINCTIVE_DESIGN_CHECKLIST.md §3).
 *
 * Decorative: the link text already names the destination, so the SVG is
 * `aria-hidden`.
 */

const ICONS = {
  grid: 'M4 4h6.5v6.5H4zM13.5 4H20v6.5h-6.5zM4 13.5h6.5V20H4zM13.5 13.5H20V20h-6.5z',
  bath: 'M4 12h16v2a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM6 12V6a2 2 0 0 1 2-2h1M7 19l-1 2M17 19l1 2',
  shower: 'M5 21V7a3 3 0 0 1 3-3h8M11 10a5 5 0 0 1 10 0zM13 14v2M16 14v3M19 14v2',
  laundry: 'M5 3h14a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM8 7h2M12 17.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9z',
  basin: 'M4 10h16c0 3.5-3 6-8 6s-8-2.5-8-6zM10 16l-.5 5h5L14 16M12 10V6a2 2 0 0 1 2-2h2',
  coin: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM14.5 9.5c-.5-1-1.5-1.5-2.5-1.5-1.4 0-2.5.8-2.5 2s1 1.7 2.5 2 2.5.8 2.5 2-1.1 2-2.5 2c-1 0-2-.5-2.5-1.5M12 6v2M12 16v2',
  roller: 'M5 4h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zM18 6.5h2v4h-8v3M10.5 13.5h3V21h-3z',
  compare: 'M4 8h13l-3-3M20 16H7l3 3',
  checklist: 'M9 4h6v3H9zM7 5.5H6a1 1 0 0 0-1 1V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6.5a1 1 0 0 0-1-1h-1M9 12h6M9 16h4',
  badge: 'M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6zM8.5 12l2.5 2.5L16 9.5',
  shrink: 'M4 14h6v6M20 10h-6V4M10 14l-7 7M14 10l7-7',
  quote: 'M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9zM8 8h.01',
  book: 'M12 6c-2-1.5-5-2-8-2v14c3 0 6 .5 8 2 2-1.5 5-2 8-2V4c-3 0-6 .5-8 2zM12 6v14',
  people: 'M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20a6 6 0 0 1 12 0M16 5.2a3 3 0 0 1 0 5.6M17.5 14.5A5.5 5.5 0 0 1 21 20',
  lock: 'M7 11h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2zM8 11V8a4 4 0 0 1 8 0v3',
  scales: 'M12 3v18M7 21h10M5 7h14M5 7l-3 7a3 3 0 0 0 6 0zM19 7l-3 7a3 3 0 0 0 6 0z',
} as const

export type NavIconName = keyof typeof ICONS

export function NavIcon({
  name,
  size = 'sm',
}: {
  name: NavIconName
  /** `lg` is the DESIGN.md 8.8 icon tile (48px) for service cards (D-177). */
  size?: 'sm' | 'lg'
}) {
  const px = size === 'lg' ? 24 : 18
  return (
    <span
      className={size === 'lg' ? 'et-nav-icon et-nav-icon-lg' : 'et-nav-icon'}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        width={px}
        height={px}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        focusable="false"
      >
        <path d={ICONS[name]} />
      </svg>
    </span>
  )
}

/* Service slugs and blog categories map to an icon here, in one place. A new
   service or category without an entry falls back to a neutral icon rather than
   breaking the menu. */
const SERVICE_ICONS: Record<string, NavIconName> = {
  'bathroom-renovations': 'bath',
  'ensuite-bathroom-renovations': 'shower',
  'laundry-renovations': 'laundry',
  'powder-room-renovations': 'basin',
}

const TOPIC_ICONS: Record<string, NavIconName> = {
  'Planning and cost': 'coin',
  'Design and finishes': 'roller',
  'Compare your options': 'compare',
  'Planning and process': 'checklist',
  'Choosing a renovator': 'badge',
  'Small bathrooms': 'shrink',
  'Quotes and decisions': 'quote',
}

export const serviceIcon = (slug: string): NavIconName => SERVICE_ICONS[slug] ?? 'grid'
export const topicIcon = (category: string): NavIconName => TOPIC_ICONS[category] ?? 'book'
