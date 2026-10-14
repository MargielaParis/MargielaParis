# Procedural typhoon image for the banner. Requires numpy and pillow.
# Usage: python scripts/gen-satellite.py
import numpy as np
from PIL import Image
from pathlib import Path
rng = np.random.default_rng(11)
N = 480
def noise(octaves=6, base=4, persist=0.55):
    out = np.zeros((N, N)); amp = 1; tot = 0
    for o in range(octaves):
        s = base * 2**o
        n = rng.random((s, s)).astype(np.float32)
        img = Image.fromarray((n*255).astype(np.uint8)).resize((N, N), Image.BICUBIC)
        out += amp * (np.asarray(img)/255.0); tot += amp; amp *= persist
    return out / tot
y, x = np.mgrid[0:N, 0:N] / N
cx, cy = 0.56, 0.47
dx, dy = x - cx, y - cy
r = np.sqrt(dx**2 + dy**2) + 1e-6
th = np.arctan2(dy, dx)
n1, n2 = noise(), noise(base=3)
warp = (n1 - 0.5) * 0.9
arms = 0.5 + 0.5*np.cos(2*(th + 3.2*np.log(r) + warp*2.2))
n3 = noise(octaves=5, base=12, persist=0.6)
ring = np.exp(-((r-0.05)/0.035)**2)
core = np.exp(-(r/0.15)**2)
radial = np.exp(-(r/0.44)**1.4)
arms = arms**1.15
cloud = radial*(0.25 + 0.75*arms)*(0.45 + 0.9*n3) + 0.55*core + 0.25*ring
cloud = cloud * (0.8 + 0.55*n2)
eye = np.exp(-(r/0.018)**2)
cloud = np.clip(cloud - 1.2*eye, 0, None)
# scattered background convection
bg = np.clip((noise(base=6) - 0.58) * 3.0, 0, 1) * 0.45
v = np.clip(np.maximum(cloud, bg), 0, 1.25) / 1.25
# enhanced IR colormap: ocean -> gray -> white -> lavender -> purple -> magenta
stops = [(0.00,(9,18,34)),(0.18,(22,38,62)),(0.34,(96,110,132)),(0.52,(214,222,232)),
         (0.66,(246,246,252)),(0.76,(196,181,253)),(0.86,(139,92,246)),(1.0,(219,39,119))]
p = np.array([s[0] for s in stops]); c = np.array([s[1] for s in stops], float)
rgb = np.stack([np.interp(v, p, c[:,k]) for k in range(3)], -1)
Image.fromarray(rgb.astype(np.uint8)).save(str(Path(__file__).resolve().parent.parent / 'assets' / 'satellite.jpg'), quality=84, optimize=True)
