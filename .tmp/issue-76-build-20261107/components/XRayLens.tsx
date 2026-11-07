'use client'

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react'
import Image from 'next/image'
import type { BeforeAfterPair } from '@/lib/beforeAfterPairs'
import styles from './XRayLens.module.css'

/**
 * X-ray lens over a genuine before/after pair (DECISIONS.md D-160). The finished photo is the
 * picture; a soft circle that follows the pointer shows the same window wall before the renovation.
 * Ported from 4 Elements Painting's lens (their D-78, PROJECT_CONTEXT §5.2), restyled to DESIGN.md.
 *
 * Moves by `transform` only: the round window slides over the photo while the layer inside it slides
 * the opposite way, so the before photo stays fixed to the wall. Per frame JS writes three transforms
 * and nothing else (a version that animated a mask ran at ~30 fps on a throttled phone in 4EP).
 *
 * The frame shows a crop of the after photo (`pair.crop`), so both photos sit on a "stage" sized to
 * the full after photo at scale k = frame width / crop width and shifted by the crop origin. The
 * before photo is lined up on that stage by a matrix3d() of the fitted homography and clipped to the
 * wall polygon. Neither photo file is edited.
 *
 * Inputs: mouse/pen hover moves the lens; on touch, a handle under the lens drags it and a tap moves
 * it; the toggle is the keyboard and screen-reader path. The toggle shows the before photo whole and
 * unwarped, labelled as taken from a different spot: at full size the aligned composite shows seams.
 */

const EASE = 18 // per-second easing toward the pointer
const SETTLE_PX = 0.3

type Vec = { x: number; y: number }

const pct = (v: number, of: number) => `${((v / of) * 100).toFixed(3)}%`

function wallClipPath({ wall, after }: BeforeAfterPair) {
  return `polygon(${wall.map(([x, y]) => `${pct(x, after.width)} ${pct(y, after.height)}`).join(', ')})`
}

/**
 * The homography lives in natural photo pixels; the stage draws both photos at scale k, so the
 * browser needs S·H·S⁻¹ with S = diag(k, k, 1). matrix3d() is column-major.
 */
function planeTransform([a, b, c, d, e, f, g, h]: BeforeAfterPair['homography'], k: number) {
  return `matrix3d(${a}, ${d}, 0, ${g / k}, ${b}, ${e}, 0, ${h / k}, 0, 0, 1, 0, ${c * k}, ${f * k}, 0, 1)`
}

export function XRayLens({ pair }: { pair: BeforeAfterPair }) {
  const [cropX, cropY, cropW, cropH] = pair.crop
  const frameRef = useRef<HTMLDivElement>(null)
  const planeRef = useRef<HTMLDivElement>(null)
  const windowRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  // near: about a screen away, so the before photo may download. loaded: it has arrived, so the
  // lens can show it. Until then the lens stays hidden rather than showing an empty circle.
  const [near, setNear] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const [showBefore, setShowBefore] = useState(false)
  const startRef = useRef<() => void>(() => {})

  // Animation state lives outside React so moving the lens never re-renders.
  const sim = useRef({
    size: { w: 0, h: 0 },
    rest: { x: 0, y: 0 } as Vec,
    target: { x: 0, y: 0 } as Vec,
    lens: { x: 0, y: 0 } as Vec,
    r: 0,
    raf: 0,
    last: 0,
    reduced: false,
    drag: null as null | { id: number; dx: number; dy: number },
    tap: null as null | { id: number; x: number; y: number },
  })

  useEffect(() => {
    const frame = frameRef.current
    const plane = planeRef.current
    const win = windowRef.current
    const counter = counterRef.current
    const ring = ringRef.current
    if (!frame || !plane || !win || !counter || !ring) return
    const s = sim.current
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    s.reduced = motion.matches
    const onMotion = () => {
      s.reduced = motion.matches
    }
    motion.addEventListener('change', onMotion)

    const write = () => {
      const x = s.lens.x - s.r
      const y = s.lens.y - s.r
      const at = `translate3d(${x}px, ${y}px, 0)`
      win.style.transform = at
      ring.style.transform = at
      counter.style.transform = `translate3d(${-x}px, ${-y}px, 0)`
    }

    const tick = (now: number) => {
      // rAF's timestamp can precede the performance.now() taken in a pointer handler; never let a
      // negative dt push the lens the wrong way.
      const dt = Math.min(Math.max(now - s.last, 0) / 1000, 1 / 20)
      s.last = now
      const p = s.lens
      const k = s.reduced ? 1 : 1 - Math.exp(-dt * EASE)
      p.x += (s.target.x - p.x) * k
      p.y += (s.target.y - p.y) * k
      const moving = Math.abs(s.target.x - p.x) > SETTLE_PX || Math.abs(s.target.y - p.y) > SETTLE_PX
      if (!moving) {
        p.x = s.target.x
        p.y = s.target.y
      }
      write()
      s.raf = moving ? requestAnimationFrame(tick) : 0
    }

    const layout = () => {
      const w = frame.clientWidth
      const h = frame.clientHeight
      if (!w || !h) return
      const prev = s.size
      const atRest = s.target.x === s.rest.x && s.target.y === s.rest.y
      const k = w / cropW
      s.size = { w, h }
      s.rest = { x: (pair.rest[0] - cropX) * k, y: (pair.rest[1] - cropY) * k }
      // Keep the lens on the same spot of the photo when the frame resizes.
      const rescale = (v: Vec) => (prev.w ? { x: (v.x / prev.w) * w, y: (v.y / prev.h) * h } : { ...s.rest })
      s.target = atRest ? { ...s.rest } : rescale(s.target)
      s.lens = rescale(s.lens)
      s.r = Math.round(Math.min(120, Math.max(64, w * 0.22)))
      frame.style.setProperty('--r', `${s.r}px`)
      frame.style.setProperty('--fw', `${w}px`)
      frame.style.setProperty('--fh', `${h}px`)
      frame.style.setProperty('--k', `${k}`)
      plane.style.transform = planeTransform(pair.homography, k)
      write()
    }

    startRef.current = () => {
      if (s.raf) return
      s.last = performance.now()
      s.raf = requestAnimationFrame(tick)
    }

    const ro = new ResizeObserver(layout)
    ro.observe(frame)
    layout()

    // A visitor who never scrolls this far never downloads the before photo.
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return
        io.disconnect()
        setNear(true)
      },
      { rootMargin: '100% 0px' },
    )
    io.observe(frame)

    return () => {
      io.disconnect()
      ro.disconnect()
      motion.removeEventListener('change', onMotion)
      cancelAnimationFrame(s.raf)
      s.raf = 0
      startRef.current = () => {}
    }
  }, [pair, cropX, cropY, cropW])

  const local = (e: ReactPointerEvent) => {
    const f = frameRef.current!
    const r = f.getBoundingClientRect()
    return { x: e.clientX - r.left - f.clientLeft, y: e.clientY - r.top - f.clientTop }
  }

  // The lens never rises so far that the frame clips its "Before" tag. `keepHandle`: on touch, it
  // also stops high enough that its drag handle is never clipped.
  const moveTo = ({ x, y }: Vec, keepHandle = false) => {
    const s = sim.current
    const minY = s.r + 10
    const maxY = keepHandle ? s.size.h - s.r - 24 : s.size.h
    s.target = { x: Math.min(Math.max(x, 0), s.size.w), y: Math.min(Math.max(y, minY), Math.max(minY, maxY)) }
    startRef.current()
  }

  const onFramePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const s = sim.current
    if (s.drag && e.pointerId === s.drag.id) {
      const p = local(e)
      moveTo({ x: p.x + s.drag.dx, y: p.y + s.drag.dy }, true)
      return
    }
    if (e.pointerType === 'touch' || showBefore) return
    moveTo(local(e))
  }

  const onFramePointerLeave = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch' || sim.current.drag) return
    moveTo(sim.current.rest)
  }

  // A touch that lifts without scrolling the page is a tap: move the lens there.
  const onFramePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' || sim.current.drag) return
    sim.current.tap = { id: e.pointerId, ...local(e) }
  }
  const onFramePointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    const s = sim.current
    if (s.drag && e.pointerId === s.drag.id) {
      s.drag = null
      return
    }
    if (!s.tap || s.tap.id !== e.pointerId || showBefore) return
    const p = local(e)
    if (Math.hypot(p.x - s.tap.x, p.y - s.tap.y) < 10) moveTo(p, true)
    s.tap = null
  }
  const onFramePointerCancel = () => {
    sim.current.tap = null
    sim.current.drag = null
  }

  const onHandlePointerDown = (e: ReactPointerEvent<HTMLSpanElement>) => {
    const s = sim.current
    const p = local(e)
    s.drag = { id: e.pointerId, dx: s.lens.x - p.x, dy: s.lens.y - p.y }
    s.tap = null
    frameRef.current!.setPointerCapture(e.pointerId)
    e.stopPropagation()
  }

  // The stage holds a photo at the full after-photo size and is shifted so the crop fills the frame.
  // Both photos share it, so they share one coordinate system. Sized in container units (the frame is
  // the container), so the crop is right in the server HTML before any script runs.
  const cq = (px: number) => `${((px / cropW) * 100).toFixed(4)}cqw`
  const stage = {
    width: cq(pair.after.width),
    height: cq(pair.after.height),
    transform: `translate3d(${cq(-cropX)}, ${cq(-cropY)}, 0)`,
  } satisfies CSSProperties

  return (
    <figure className={styles.figure}>
      <div
        ref={frameRef}
        className={styles.frame}
        style={{ aspectRatio: `${cropW} / ${cropH}` }}
        data-near={near}
        data-loaded={loaded}
        data-before={showBefore}
        data-failed={failed}
        onPointerMove={onFramePointerMove}
        onPointerLeave={onFramePointerLeave}
        onPointerDown={onFramePointerDown}
        onPointerUp={onFramePointerUp}
        onPointerCancel={onFramePointerCancel}
      >
        <div className={styles.stage} style={stage}>
          <Image
            src={pair.after.src}
            alt={pair.after.alt}
            width={pair.after.width}
            height={pair.after.height}
            sizes="1180px"
            className={styles.photo}
          />
        </div>
        {/* Always hidden from assistive tech: the toggle's whole-photo view carries the before alt. */}
        <div ref={windowRef} className={styles.window} aria-hidden="true">
          <div ref={counterRef} className={styles.counter}>
            <div className={styles.stage} style={stage}>
              <div className={styles.before} style={{ clipPath: wallClipPath(pair) }}>
                <div ref={planeRef} className={styles.plane}>
                  {near && (
                    <Image
                      src={pair.before.src}
                      alt={pair.before.alt}
                      width={pair.before.width}
                      height={pair.before.height}
                      sizes="872px"
                      className={styles.beforePhoto}
                      style={{ width: cq(pair.before.width), height: cq(pair.before.height) }}
                      onLoad={() => setLoaded(true)}
                      onError={() => setFailed(true)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div ref={ringRef} className={styles.ring} aria-hidden="true">
          <span className={styles.tag}>Before</span>
          <span className={styles.handle} onPointerDown={onHandlePointerDown} />
        </div>
        {showBefore && (
          <div className={styles.whole}>
            <Image
              src={pair.before.src}
              alt={pair.before.alt}
              width={pair.before.width}
              height={pair.before.height}
              sizes="(min-width: 1024px) 663px, 100vw"
              style={{ objectPosition: pair.wholePosition }}
              onLoad={() => setLoaded(true)}
            />
            <span className={styles.wholeTag}>Before · taken from a different spot</span>
          </div>
        )}
      </div>

      <div className={styles.controls} hidden={failed}>
        <button
          type="button"
          aria-pressed={showBefore}
          onClick={() => {
            setNear(true)
            setShowBefore((v) => !v)
          }}
          className="et-btn et-btn-md et-btn-secondary"
        >
          {showBefore ? 'Show the finished bathroom' : 'Show the whole before photo'}
        </button>
        <p className="et-body-sm" aria-live="polite" style={{ color: 'var(--et-text-secondary)' }}>
          {showBefore
            ? 'The whole before photo, as supplied.'
            : 'Move the circle, or use the button, to see the window as we found it.'}
        </p>
      </div>
      {/* The caption follows the view, so it never describes a lens that is not on screen. */}
      <figcaption className="et-caption" style={{ marginTop: 'var(--et-space-3)', color: 'var(--et-text-secondary)' }}>
        {showBefore
          ? 'The before photo as supplied: black and white, with its own "BEFORE" label, taken from a different spot than the finished photo.'
          : pair.caption}
      </figcaption>
    </figure>
  )
}
