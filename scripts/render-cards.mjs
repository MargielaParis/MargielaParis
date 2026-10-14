// Renders assets/banner.svg and assets/activity.svg with embedded subset fonts.
// Usage: GITHUB_TOKEN=... node scripts/render-cards.mjs [--hero-only] [--theme=paper|graphite]
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const LOGIN = 'MargielaParis';
const HIDDEN_LANGS = new Set(['HTML', 'CSS', 'SCSS']);
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const asset = (...p) => join(root, 'assets', ...p);
const arg = (name, fallback) => (process.argv.find((a) => a.startsWith(`--${name}=`)) || '').split('=')[1] || fallback;

const THEMES = {
  paper: {
    bg: '#f6f4ee', border: '#e4e0d5', ink: '#14161a', body: '#3f4450', muted: '#8a8f99',
    rule: '#14161a', ruleOp: 0.1, card: '#eeebe2', accent: '#0f766e', accent2: '#4f46e5', track: '#e6e2d8',
    bar: ['#14b8a6', '#4f46e5'],
    weights: ['#1e3a8a', '#60a5fa', '#e8e6df', '#f59e0b', '#9a3412'],
  },
  graphite: {
    bg: '#141518', border: '#26282d', ink: '#f4f4f5', body: '#a1a1aa', muted: '#71717a',
    rule: '#ffffff', ruleOp: 0.09, card: '#1b1c20', accent: '#5eead4', accent2: '#a5b4fc', track: '#26282d',
    bar: ['#2dd4bf', '#818cf8'],
    weights: ['#1d4ed8', '#60a5fa', '#3f3f46', '#fbbf24', '#ea580c'],
  },
};
const T = THEMES[arg('theme', 'paper')];

const b64 = (file) => readFileSync(asset(file)).toString('base64');
const STYLE = `<style>
@font-face{font-family:PSans;src:url(data:font/woff2;base64,${b64('fonts/inter.woff2')}) format('woff2');font-weight:400 800}
@font-face{font-family:PMono;src:url(data:font/woff2;base64,${b64('fonts/mono.woff2')}) format('woff2');font-weight:400 700}
.s{font-family:PSans,'Segoe UI',Helvetica,Arial,sans-serif}
.m{font-family:PMono,ui-monospace,Menlo,Consolas,monospace}
.tn{font-variant-numeric:tabular-nums}
</style>`;

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const label = (x, y, text, fill = T.muted, anchor = 'start') =>
  `<text x="${x}" y="${y}" text-anchor="${anchor}" class="m" font-size="12" font-weight="500" letter-spacing="1.4" fill="${fill}">${text}</text>`;

function frame(w, h, title, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(title)}">
<title>${esc(title)}</title>
${STYLE}
<defs>
  <linearGradient id="bar" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${T.bar[0]}"/><stop offset="1" stop-color="${T.bar[1]}"/></linearGradient>
</defs>
<rect x="0.5" y="0.5" width="${w - 1}" height="${h - 1}" rx="18" fill="${T.bg}" stroke="${T.border}"/>
${body}
</svg>
`;
}

// Smooth weight field so FP16 reads as a gradient and 2-bit as four bands.
function weights(cols, rows) {
  return Array.from({ length: cols * rows }, (_, i) => {
    const c = i % cols, r = Math.floor(i / cols);
    return 0.92 * Math.sin(c * 0.52 + r * 0.9 - 0.6) * Math.cos(c * 0.12 - r * 0.35);
  });
}

function mix(a, b, t) {
  const p = (c) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
  const [x, y] = [p(a), p(b)];
  return '#' + x.map((v, i) => Math.round(v + (y[i] - v) * t).toString(16).padStart(2, '0')).join('');
}
function ramp(v) {
  const stops = T.weights, t = ((v + 1) / 2) * (stops.length - 1);
  const i = Math.min(Math.floor(t), stops.length - 2);
  return mix(stops[i], stops[i + 1], t - i);
}

function hero() {
  const facts = [['CIKM 2026', 'EPTQ, 2-bit PTQ'], ['IEEE ACCESS', 'RaP-Weather'], ['NOW', 'SKALA 4th cohort']];
  const factSvg = facts.map(([k, v], i) => {
    const x = 48 + i * 150;
    const sep = i ? `<line x1="${x - 16}" y1="272" x2="${x - 16}" y2="312" stroke="${T.rule}" stroke-opacity="${T.ruleOp}"/>` : '';
    return `${sep}${label(x, 286, k)}
<text x="${x}" y="308" class="s" font-size="15" font-weight="600" fill="${T.ink}">${esc(v)}</text>`;
  }).join('\n');

  const left = `<rect x="48" y="62" width="22" height="3" rx="1.5" fill="${T.accent}"/>
${label(80, 68, 'ML RESEARCHER / AI ENGINEER', T.accent)}
<text x="46" y="128" class="s" font-size="54" font-weight="700" letter-spacing="-1.6" fill="${T.ink}">Ki-Yeon Park</text>
<text x="48" y="170" class="s" font-size="18" fill="${T.body}">Compact representations for retrieval and 2-bit</text>
<text x="48" y="195" class="s" font-size="18" fill="${T.body}">inference, now shipped as RAG and agent services.</text>
${factSvg}`;

  // Panel A: satellite image cut into patches, one region selected.
  const ax = 508, ay = 40, size = 220, n = 5, p = size / n;
  const sel = (c, r) => c >= 2 && c <= 3 && r >= 1 && r <= 2;
  let shade = '', grid = '';
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
    if (!sel(c, r)) shade += `<rect x="${ax + c * p}" y="${ay + r * p}" width="${p}" height="${p}" fill="#05070c" fill-opacity="0.22"/>`;
  }
  for (let i = 1; i < n; i++) {
    grid += `<line x1="${ax + i * p}" y1="${ay}" x2="${ax + i * p}" y2="${ay + size}"/><line x1="${ax}" y1="${ay + i * p}" x2="${ax + size}" y2="${ay + i * p}"/>`;
  }
  const panelA = `<rect x="${ax - 16}" y="24" width="${size + 32}" height="300" rx="14" fill="${T.card}" stroke="${T.border}"/>
<clipPath id="sat"><rect x="${ax}" y="${ay}" width="${size}" height="${size}" rx="10"/></clipPath>
<g clip-path="url(#sat)">
  <image href="data:image/jpeg;base64,${b64('satellite.jpg')}" x="${ax + 3 * p - 0.56 * 330}" y="${ay + 2 * p - 0.47 * 330}" width="330" height="330"/>
  ${shade}
  <g stroke="#ffffff" stroke-opacity="0.28" stroke-width="1">${grid}</g>
</g>
<rect x="${ax + 2 * p}" y="${ay + p}" width="${2 * p}" height="${2 * p}" rx="3" fill="none" stroke="#5eead4" stroke-width="2.5"/>
<rect x="${ax + 2 * p + 6}" y="${ay + p + 6}" width="58" height="18" rx="4" fill="#0b1220" fill-opacity="0.85"/>
<text x="${ax + 2 * p + 35}" y="${ay + p + 19}" text-anchor="middle" class="m" font-size="10" font-weight="700" letter-spacing="1" fill="#5eead4">QUERY</text>
${label(ax, 286, 'RAP-WEATHER')}
<text x="${ax}" y="308" class="s" font-size="15" font-weight="600" fill="${T.ink}">Patch grid, region query</text>`;

  // Panel B: full-precision weights quantized to four 2-bit levels.
  const bx = 765, cols = 12, rows = 4, cell = 14, gap = 2;
  const w = weights(cols, rows);
  const levels = [-0.75, -0.25, 0.25, 0.75];
  const q = (v) => levels.reduce((a, b) => (Math.abs(b - v) < Math.abs(a - v) ? b : a));
  const matrix = (y0, f) => w.map((v, i) => {
    const x = bx + (i % cols) * (cell + gap), y = y0 + Math.floor(i / cols) * (cell + gap);
    return `<rect x="${x}" y="${y}" width="${cell}" height="${cell}" rx="2.5" fill="${ramp(f(v))}"/>`;
  }).join('');
  const mw = cols * cell + (cols - 1) * gap, mh = rows * cell + (rows - 1) * gap;
  const top = 58, bottom = top + mh + 44;
  const codes = ['00', '01', '10', '11'].map((code, i) => {
    const x = bx + i * 48;
    return `<rect x="${x}" y="${bottom + mh + 14}" width="12" height="12" rx="2" fill="${ramp(levels[i])}"/>
<text x="${x + 18}" y="${bottom + mh + 24}" class="m" font-size="11" fill="${T.muted}">${code}</text>`;
  }).join('');
  const panelB = `<rect x="${bx - 15}" y="24" width="${mw + 30}" height="300" rx="14" fill="${T.card}" stroke="${T.border}"/>
${matrix(top, (v) => v)}
<text x="${bx}" y="${top + mh + 28}" class="m" font-size="11" font-weight="500" letter-spacing="1" fill="${T.muted}">FP16</text>
<path d="M${bx + mw / 2} ${top + mh + 12} v16 m-5 -5 l5 5 l5 -5" fill="none" stroke="${T.accent2}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
<text x="${bx + mw}" y="${top + mh + 28}" text-anchor="end" class="m" font-size="11" font-weight="700" letter-spacing="1" fill="${T.accent2}">2-BIT</text>
${matrix(bottom, q)}
${codes}
${label(bx, 286, 'EPTQ')}
<text x="${bx}" y="308" class="s" font-size="15" font-weight="600" fill="${T.ink}">2-bit weights, E8 lattice</text>`;

  return frame(1000, 340, 'Ki-Yeon Park, ML researcher and AI engineer', `${left}\n${panelA}\n${panelB}`);
}

async function gql(query, variables) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error('GITHUB_TOKEN is required');
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: `bearer ${token}`, 'Content-Type': 'application/json', 'User-Agent': 'profile-cards' },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (!res.ok || json.errors) throw new Error(JSON.stringify(json.errors || json));
  return json.data;
}

async function fetchStats() {
  const data = await gql(`query($login:String!){
    user(login:$login){
      contributionsCollection{
        totalCommitContributions totalPullRequestContributions totalPullRequestReviewContributions
        totalRepositoriesWithContributedCommits restrictedContributionsCount
        contributionCalendar{ weeks{ firstDay contributionDays{ contributionCount } } }
      }
      repositories(ownerAffiliations:OWNER, isFork:false, privacy:PUBLIC, first:100){
        nodes{ languages(first:20, orderBy:{field:SIZE, direction:DESC}){ edges{ size node{ name color } } } }
      }
    }
  }`, { login: LOGIN });
  const cc = data.user.contributionsCollection;
  const langs = new Map();
  for (const repo of data.user.repositories.nodes) {
    for (const { size, node } of repo.languages.edges) {
      if (HIDDEN_LANGS.has(node.name)) continue;
      const cur = langs.get(node.name) || { size: 0, color: node.color || '#94a3b8' };
      cur.size += size;
      langs.set(node.name, cur);
    }
  }
  const total = [...langs.values()].reduce((a, b) => a + b.size, 0) || 1;
  const top = [...langs.entries()].sort((a, b) => b[1].size - a[1].size).slice(0, 6)
    .map(([name, v]) => ({ name, color: v.color, pct: (v.size / total) * 100 }));
  const weeks = cc.contributionCalendar.weeks.map((w) => ({
    firstDay: w.firstDay,
    count: w.contributionDays.reduce((a, d) => a + d.contributionCount, 0),
  }));
  return {
    metrics: [
      ['COMMITS', cc.totalCommitContributions],
      ['PULL REQS', cc.totalPullRequestContributions],
      ['REVIEWS', cc.totalPullRequestReviewContributions],
      ['REPOS', cc.totalRepositoriesWithContributedCommits],
    ],
    langs: top,
    weeks,
  };
}

function stats({ metrics, langs, weeks }) {
  const today = new Date().toISOString().slice(0, 10);
  const head = `${label(48, 52, 'GITHUB ACTIVITY', T.accent)}
${label(952, 52, `LAST 12 MONTHS / ${today}`, T.muted, 'end')}`;

  const metricSvg = metrics.map(([name, value], i) => {
    const x = 48 + i * 112;
    return `<text x="${x}" y="122" class="s tn" font-size="38" font-weight="700" letter-spacing="-0.8" fill="${T.ink}">${value.toLocaleString('en-US')}</text>
${label(x, 148, name)}`;
  }).join('\n');

  const lx = 532, lw = 420;
  let acc = 0;
  const sum = langs.reduce((a, l) => a + l.pct, 0) || 1;
  const segs = langs.map((l) => {
    const w = (l.pct / sum) * lw;
    const s = `<rect x="${(lx + acc).toFixed(1)}" y="88" width="${Math.max(w - 2, 1).toFixed(1)}" height="10" fill="${l.color}"/>`;
    acc += w;
    return s;
  }).join('');
  const legend = langs.map((l, i) => {
    const x = lx + (i % 3) * 142, y = 128 + Math.floor(i / 3) * 24;
    return `<circle cx="${x + 5}" cy="${y - 5}" r="5" fill="${l.color}"/>
<text x="${x + 17}" y="${y}" class="s" font-size="14" font-weight="500" fill="${T.ink}">${esc(l.name)}<tspan dx="7" class="m tn" font-size="12" font-weight="400" fill="${T.muted}">${l.pct.toFixed(1)}%</tspan></text>`;
  }).join('\n');
  const langSvg = `${label(lx, 76, 'LANGUAGES')}
<clipPath id="langbar"><rect x="${lx}" y="88" width="${lw}" height="10" rx="5"/></clipPath>
<rect x="${lx}" y="88" width="${lw}" height="10" rx="5" fill="${T.track}"/>
<g clip-path="url(#langbar)">${segs}</g>
${legend}`;

  const bx = 48, bw = 904, base = 256, maxH = 54;
  const step = bw / weeks.length;
  const max = Math.max(1, ...weeks.map((w) => w.count));
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  let lastMonth = -1;
  const bars = weeks.map((w, i) => {
    const x = bx + i * step + 2;
    const h = w.count ? Math.max(3, (w.count / max) * maxH) : 3;
    const fill = w.count ? 'url(#bar)' : T.track;
    let mark = '';
    const m = new Date(w.firstDay).getUTCMonth();
    if (m !== lastMonth && i > 0 && i < weeks.length - 2) mark = label(x, base + 22, months[m]);
    lastMonth = m;
    return `<rect x="${x.toFixed(1)}" y="${(base - h).toFixed(1)}" width="${(step - 4).toFixed(1)}" height="${h.toFixed(1)}" rx="2" fill="${fill}"/>${mark}`;
  }).join('\n');

  const body = `${head}
${metricSvg}
<line x1="500" y1="70" x2="500" y2="156" stroke="${T.rule}" stroke-opacity="${T.ruleOp}"/>
${langSvg}
<line x1="48" y1="180" x2="952" y2="180" stroke="${T.rule}" stroke-opacity="${T.ruleOp}"/>
${bars}`;
  return frame(1000, 300, 'GitHub activity for MargielaParis', body);
}

const out = arg('out', '');
writeFileSync(asset(`banner${out}.svg`), hero());
if (!process.argv.includes('--hero-only')) {
  writeFileSync(asset(`activity${out}.svg`), stats(await fetchStats()));
}
