import { projectBySlug } from '@/lib/projects'
import type { ProjectImage } from '@/lib/projects'

/**
 * Before/after pairs for the X-ray lens (`components/XRayLens.tsx`, DECISIONS.md D-160).
 *
 * Adapted from 4 Elements Painting's lens (their D-78). A pair is only eligible when:
 *   - both photos are a genuine matched pair of one job (D-06 / D-100), and
 *   - one flat surface is visible in BOTH photos with enough fixed points to line it up
 *     (window and frame corners, leadlight details). Tested 2026-10-29: The Rocks passes;
 *     Hunters Hill fails (its before photo is a close-up with the window cut off).
 *
 * The photo files are never edited. The before photo was taken from a different spot, so it is
 * lined up in the browser by a perspective transform of the window-wall plane (a homography fitted
 * to matched points), and the reveal is clipped to that wall. Anything off the wall (vanity, bath,
 * tap, the burned-in "BEFORE" label) cannot line up and is never shown. Mechanics:
 * PROJECT_CONTEXT.md "Before/after X-ray lens".
 */

/** A point in the after photo's natural pixel grid. */
type Point = readonly [x: number, y: number]

export type BeforeAfterPair = {
  after: ProjectImage
  before: ProjectImage
  /**
   * Homography taking before-photo pixels to after-photo pixels for points on the wall plane,
   * row-major [a, b, c, d, e, f, g, h] with the last entry fixed at 1.
   */
  homography: readonly [number, number, number, number, number, number, number, number]
  /** The surface the lens may reveal, traced on the after photo. */
  wall: readonly Point[]
  /** The part of the after photo the frame shows: [x, y, width, height] in after pixels. */
  crop: readonly [number, number, number, number]
  /** Where the lens rests when nobody is pointing at it (after pixels). */
  rest: Point
  /**
   * `object-position` for the toggle's view, which shows the before photo whole and unwarped (the
   * aligned composite shows seams at full size: 2026-10-29 critique, finding 2).
   */
  wholePosition: string
  caption: string
}

function image(slug: string, file: string): ProjectImage {
  const found = projectBySlug(slug)?.images.find((img) => img.src.endsWith(`/${file}`))
  if (!found) throw new Error(`beforeAfterPairs: ${slug}/${file} is not in lib/projects.ts`)
  return found
}

/**
 * The Rocks: the original leadlight window, kept through the renovation. Fitted 2026-10-29 to 13
 * points on the window plane (pane corners and the leadlight's dots): worst error 3.0 px, RMS 1.5 px
 * on the 1180 px after photo, then checked on a 50 % blend and a composite. The before photo's right
 * edge lands at x ≈ 691–701 in the after photo, so the wall stops there. Points and refit:
 * `scripts/before-after-pairs/the-rocks.json`, `scripts/fit_before_after_pair.py`.
 */
export const THE_ROCKS_WINDOW: BeforeAfterPair = {
  after: image('the-rocks-bathroom', 'shower-window-tub-wide.webp'),
  before: image('the-rocks-bathroom', 'before.webp'),
  homography: [
    0.701345673, -0.0237052711, 168.438525,
    0.0277322239, 0.579508332, 169.047835,
    0.000146256706, -8.57620786e-5,
  ],
  wall: [
    [507, 192],
    [690, 192],
    [698, 343],
    [507, 343],
  ],
  crop: [470, 158, 340, 240],
  rest: [606, 268],
  // The window is in the right half of the before photo.
  wholePosition: '100% 50%',
  caption:
    'The Rocks bathroom, cropped to the window wall. The before photo was supplied in black and white and taken from a different spot, so the window wall has been lined up between the two shots. Only that wall changes inside the lens; the leadlight glass is original.',
}
