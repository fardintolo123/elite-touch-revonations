import type { MouseEvent } from 'react'
import { startEnquiry } from '@/lib/enquiryStarter'

export function HomeEnquiryStarter({ services }: { services: string[] }) {
  function choose(event: MouseEvent<HTMLAnchorElement>, service: string) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    startEnquiry(service)
  }

  return (
    <div className="et-room-starter" role="group" aria-labelledby="room-starter-label">
      {/* Says what a tap does: the room choice is the hero's primary action (D-155, F13). */}
      <p id="room-starter-label" className="et-label">Choose your room to book a free on-site measure</p>
      <div className="et-room-choices">
        {services.map((service) => (
          <a
            key={service}
            href="#enquiry-form"
            className="et-btn et-btn-md et-btn-secondary"
            onClick={(event) => choose(event, service)}
          >
            {service.replace(/ Renovations$/, '')}
          </a>
        ))}
      </div>
      <a href="#enquiry-form" className="et-link et-body-sm" onClick={(event) => choose(event, '')}>
        Not sure yet? Request a free measure
      </a>
    </div>
  )
}
