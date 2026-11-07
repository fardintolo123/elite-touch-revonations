"""
Fit the wall-plane homography for an X-ray before/after pair (lib/beforeAfterPairs.ts, D-160).

Usage (from the repo root; needs Python 3 with numpy and Pillow):
  python scripts/fit_before_after_pair.py scripts/before-after-pairs/the-rocks.json tmp/the-rocks

The JSON lists >= 4 matching points ON ONE FLAT SURFACE as [[before_x, before_y], [after_x, after_y]]
in each photo's natural pixels (the photos may differ in size), plus the `wall` polygon and a `crop`
for the check images. Prints each point's error, the worst and RMS error and the `homography` to paste
into the pair record, then writes <prefix>-blend.png (both photos at 50 %: the surface must be
sharp, off-plane things ghost) and <prefix>-composite.png (warped before photo inside `wall` over
the after photo). Check both by eye before trusting the numbers. Mechanics: PROJECT_CONTEXT.md.
"""
# Fit a wall-plane homography (before -> after), report residuals, and render check images:
# a 50% blend and a composite (warped before pasted inside the polygon over the after).
import sys, json
import numpy as np
from PIL import Image, ImageDraw
spec = json.load(open(sys.argv[1])); tag = sys.argv[2]
pts = np.array([[b[0], b[1], a[0], a[1]] for b, a in spec['points']], float)
A, rhs = [], []
for x, y, u, v in pts:
    A.append([x, y, 1, 0, 0, 0, -u * x, -u * y]); rhs.append(u)
    A.append([0, 0, 0, x, y, 1, -v * x, -v * y]); rhs.append(v)
h = np.linalg.lstsq(np.array(A), np.array(rhs), rcond=None)[0]
H = np.append(h, 1).reshape(3, 3)
def ap(M, x, y):
    w = M[2, 0] * x + M[2, 1] * y + M[2, 2]
    return (M[0, 0] * x + M[0, 1] * y + M[0, 2]) / w, (M[1, 0] * x + M[1, 1] * y + M[1, 2]) / w
worst = 0
for x, y, u, v in pts:
    px, py = ap(H, x, y); e = float(np.hypot(px - u, py - v)); worst = max(worst, e)
    print(f'({x:.1f},{y:.1f}) -> ({px:.1f},{py:.1f}) want ({u:.1f},{v:.1f}) err {e:.1f}px')
print(f'worst {worst:.1f}px  rms {np.sqrt(np.mean([np.hypot(*(np.array(ap(H,x,y))-[u,v]))**2 for x,y,u,v in pts])):.2f}px')
print('homography', json.dumps([float(f'{v:.9g}') for v in h]))
after = np.asarray(Image.open(spec['after']).convert('RGB'), float)
before = np.asarray(Image.open(spec['before']).convert('RGB'), float)
Hi = np.linalg.inv(H)
yy, xx = np.mgrid[0:after.shape[0], 0:after.shape[1]]
w = Hi[2, 0] * xx + Hi[2, 1] * yy + Hi[2, 2]
bx = (Hi[0, 0] * xx + Hi[0, 1] * yy + Hi[0, 2]) / w
by = (Hi[1, 0] * xx + Hi[1, 1] * yy + Hi[1, 2]) / w
valid = (bx >= 0) & (bx < before.shape[1] - 1) & (by >= 0) & (by < before.shape[0] - 1)
x0 = np.clip(np.floor(bx).astype(int), 0, before.shape[1] - 2); y0 = np.clip(np.floor(by).astype(int), 0, before.shape[0] - 2)
fx = (bx - x0)[..., None]; fy = (by - y0)[..., None]
warped = (before[y0, x0] * (1 - fx) * (1 - fy) + before[y0, x0 + 1] * fx * (1 - fy) + before[y0 + 1, x0] * (1 - fx) * fy + before[y0 + 1, x0 + 1] * fx * fy)
blend = np.where(valid[..., None], after * 0.5 + warped * 0.5, after * 0.5)
poly = Image.new('L', (after.shape[1], after.shape[0]), 0)
ImageDraw.Draw(poly).polygon([tuple(p) for p in spec['wall']], fill=255)
m = (np.asarray(poly) > 0) & valid
comp = np.where(m[..., None], warped, after)
c = spec.get('crop', [0, 0, after.shape[1], after.shape[0]])
for name, arr in (('blend', blend), ('composite', comp)):
    im = Image.fromarray(arr.clip(0, 255).astype('uint8')).crop(c)
    s = spec.get('scale', 2); im = im.resize((int(im.width * s), int(im.height * s)), Image.LANCZOS)
    if name == 'composite':
        d = ImageDraw.Draw(im); d.line([((x - c[0]) * s, (y - c[1]) * s) for x, y in spec['wall'] + spec['wall'][:1]], fill=(255, 0, 255), width=2)
    im.save(f'{tag}-{name}.png'); print(f'{tag}-{name}.png', im.size)
