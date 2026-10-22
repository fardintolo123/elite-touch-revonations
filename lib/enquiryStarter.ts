const START_EVENT = 'etr:choose-room'

declare global {
  interface Window {
    __etrEnquiryStart?: { service: string }
  }
}

// Park one choice until the existing form hydrates; consume it once.
export function startEnquiry(service: string): void {
  window.__etrEnquiryStart = { service }
  window.dispatchEvent(new Event(START_EVENT))
}

export function listenForEnquiryStart(apply: (service: string) => void): () => void {
  const consume = () => {
    const choice = window.__etrEnquiryStart
    if (!choice) return
    delete window.__etrEnquiryStart
    apply(choice.service)
  }
  window.addEventListener(START_EVENT, consume)
  consume()
  return () => window.removeEventListener(START_EVENT, consume)
}
