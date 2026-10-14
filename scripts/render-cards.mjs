// Renders assets/banner.svg and assets/activity.svg with embedded subset fonts.
// Usage: GITHUB_TOKEN=... node scripts/render-cards.mjs [--hero-only]
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const LOGIN = 'MargielaParis';
const HIDDEN_LANGS = new Set(['HTML', 'CSS', 'SCSS']);
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const asset = (...p) => join(root, 'assets', ...p);

const font = (file) => readFileSync(asset('fonts', file)).toString('base64');
const STYLE = `<style>
@font-face{font-family:PSans;src:url(data:font/woff2;base64,${font('inter.woff2')}) format('woff2');font-weight:400 800}
@font-face{font-family:PMono;src:url(data:font/woff2;base64,${font('mono.woff2')}) format('woff2');font-weight:400 700}
.s{font-family:PSans,'Segoe UI',Helvetica,Arial,sans-serif}
.m{font-family:PMono,ui-monospace,Menlo,Consolas,monospace}
.tn{font-variant-numeric:tabular-nums}
</style>`;

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

function frame(w, h, title, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(title)}">
<title>${esc(title)}</title>
${STYLE}
<defs>
  <radialGradient id="glowA" cx="0.88" cy="0.05" r="0.6"><stop offset="0" stop-color="#14b8a6" stop-opacity="0.22"/><stop offset="1" stop-color="#14b8a6" stop-opacity="0"/></radialGradient>
  <radialGradient id="glowB" cx="0.08" cy="1.1" r="0.7"><stop offset="0" stop-color="#7c3aed" stop-opacity="0.2"/><stop offset="1" stop-color="#7c3aed" stop-opacity="0"/></radialGradient>
  <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5eead4"/><stop offset="1" stop-color="#60a5fa"/></linearGradient>
  <linearGradient id="bar" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#2dd4bf"/><stop offset="1" stop-color="#60a5fa"/></linearGradient>
  <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#94a3b8" fill-opacity="0.07"/></pattern>
  <clipPath id="card"><rect width="${w}" height="${h}" rx="20"/></clipPath>
</defs>
<g clip-path="url(#card)">
  <rect width="${w}" height="${h}" fill="#0a0f1d"/>
  <rect width="${w}" height="${h}" fill="url(#dots)"/>
  <rect width="${w}" height="${h}" fill="url(#glowA)"/>
  <rect width="${w}" height="${h}" fill="url(#glowB)"/>
</g>
<rect x="0.5" y="0.5" width="${w - 1}" height="${h - 1}" rx="19.5" fill="none" stroke="#e2e8f0" stroke-opacity="0.08"/>
${body}
</svg>
`;
}

function hero() {
  const facts = [
    ['CIKM 2026', 'EPTQ, 2-bit PTQ'],
    ['IEEE ACCESS', 'RaP-Weather'],
    ['NOW', 'SKALA 4th cohort'],
  ];
  const factSvg = facts.map(([k, v], i) => {
    const x = 56 + i * 164;
    const sep = i ? `<line x1="${x - 18}" y1="246" x2="${x - 18}" y2="284" stroke="#e2e8f0" stroke-opacity="0.12"/>` : '';
    return `${sep}<text x="${x}" y="258" class="m" font-size="11" font-weight="500" letter-spacing="1.5" fill="#64748b">${k}</text>
<text x="${x}" y="281" class="s" font-size="15" font-weight="600" fill="#e2e8f0">${esc(v)}</text>`;
  }).join('\n');

  const cols = 9, rows = 7, cell = 26, gap = 8, gx = 646, gy = 44;
  const sel = (c, r) => c >= 4 && c <= 6 && r >= 2 && r <= 3;
  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = gx + c * (cell + gap), y = gy + r * (cell + gap);
      if (sel(c, r)) {
        cells.push(`<rect x="${x}" y="${y}" width="${cell}" height="${cell}" rx="6" fill="url(#accent)"/>`);
        continue;
      }
      const heat = Math.exp(-(((c - 5) ** 2) / 10 + ((r - 2.5) ** 2) / 6)) + 0.6 * Math.exp(-(((c - 1) ** 2) / 4 + ((r - 5.5) ** 2) / 3));
      const op = (0.07 + 0.38 * Math.min(heat, 1)).toFixed(2);
      cells.push(`<rect x="${x}" y="${y}" width="${cell}" height="${cell}" rx="6" fill="#60a5fa" fill-opacity="${op}"/>`);
    }
  }
  const sx = gx + 4 * (cell + gap) - 6, sy = gy + 2 * (cell + gap) - 6;
  const sw = 3 * cell + 2 * gap + 12, sh = 2 * cell + gap + 12;
  const region = `<rect x="${sx}" y="${sy}" width="${sw}" height="${sh}" rx="10" fill="none" stroke="#99f6e4" stroke-width="1.5" stroke-dasharray="4 4"/>
<rect x="${sx}" y="${sy - 26}" width="104" height="20" rx="6" fill="#0f2f2c" stroke="#5eead4" stroke-opacity="0.5"/>
<text x="${sx + 52}" y="${sy - 12}" text-anchor="middle" class="m" font-size="10" font-weight="700" letter-spacing="1.2" fill="#99f6e4">REGION QUERY</text>`;

  const body = `<g>
<rect x="56" y="76" width="24" height="3" rx="1.5" fill="url(#accent)"/>
<text x="92" y="82" class="m" font-size="13" font-weight="500" letter-spacing="2" fill="#5eead4">ML RESEARCHER / AI ENGINEER</text>
<text x="54" y="146" class="s" font-size="58" font-weight="700" letter-spacing="-1.5" fill="#f8fafc">Ki-Yeon Park</text>
<text x="56" y="190" class="s" font-size="19" fill="#94a3b8">Compact representations for retrieval and 2-bit</text>
<text x="56" y="216" class="s" font-size="19" fill="#94a3b8">inference, now shipped as RAG and agent services.</text>
${factSvg}
</g>
<g>${cells.join('')}</g>
${region}`;
  return frame(1000, 320, 'Ki-Yeon Park, ML researcher and AI engineer', body);
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
  const head = `<text x="56" y="52" class="m" font-size="12" font-weight="700" letter-spacing="2" fill="#5eead4">GITHUB ACTIVITY<tspan fill="#64748b" font-weight="500"> / LAST 12 MONTHS</tspan></text>
<text x="944" y="52" text-anchor="end" class="m" font-size="11" letter-spacing="1.2" fill="#475569">UPDATED ${today}</text>`;

  const metricSvg = metrics.map(([label, value], i) => {
    const x = 56 + i * 112;
    return `<text x="${x}" y="120" class="s tn" font-size="36" font-weight="700" letter-spacing="-0.5" fill="#f8fafc">${value.toLocaleString('en-US')}</text>
<text x="${x}" y="144" class="m" font-size="11" font-weight="500" letter-spacing="1.2" fill="#64748b">${label}</text>`;
  }).join('\n');

  const lx = 552, lw = 392;
  let acc = 0;
  const sum = langs.reduce((a, l) => a + l.pct, 0) || 1;
  const segs = langs.map((l) => {
    const w = (l.pct / sum) * lw;
    const s = `<rect x="${(lx + acc).toFixed(1)}" y="96" width="${Math.max(w - 2, 1).toFixed(1)}" height="8" fill="${l.color}"/>`;
    acc += w;
    return s;
  }).join('');
  const legend = langs.map((l, i) => {
    const x = lx + (i % 3) * 136, y = 134 + Math.floor(i / 3) * 24;
    return `<circle cx="${x + 4}" cy="${y - 4.5}" r="4" fill="${l.color}"/>
<text x="${x + 16}" y="${y}" class="s" font-size="13" font-weight="500" fill="#cbd5e1">${esc(l.name)}<tspan dx="7" class="m tn" font-size="11.5" font-weight="400" fill="#64748b">${l.pct.toFixed(1)}%</tspan></text>`;
  }).join('\n');
  const langSvg = `<text x="${lx}" y="80" class="m" font-size="11" font-weight="500" letter-spacing="1.2" fill="#64748b">LANGUAGES</text>
<clipPath id="langbar"><rect x="${lx}" y="96" width="${lw}" height="8" rx="4"/></clipPath>
<rect x="${lx}" y="96" width="${lw}" height="8" rx="4" fill="#1e293b"/>
<g clip-path="url(#langbar)">${segs}</g>
${legend}`;

  const bx = 56, bw = 888, base = 248, maxH = 52;
  const step = bw / weeks.length;
  const max = Math.max(1, ...weeks.map((w) => w.count));
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  let lastMonth = -1;
  const bars = weeks.map((w, i) => {
    const x = bx + i * step + 2;
    const h = w.count ? Math.max(3, (w.count / max) * maxH) : 3;
    const fill = w.count ? 'url(#bar)' : '#1e293b';
    let label = '';
    const m = new Date(w.firstDay).getUTCMonth();
    if (m !== lastMonth && i > 0 && i < weeks.length - 2) {
      label = `<text x="${x}" y="${base + 20}" class="m" font-size="10" letter-spacing="1" fill="#475569">${months[m]}</text>`;
    }
    lastMonth = m;
    return `<rect x="${x.toFixed(1)}" y="${(base - h).toFixed(1)}" width="${(step - 4).toFixed(1)}" height="${h.toFixed(1)}" rx="2" fill="${fill}"/>${label}`;
  }).join('\n');

  const body = `${head}
${metricSvg}
<line x1="520" y1="72" x2="520" y2="160" stroke="#e2e8f0" stroke-opacity="0.1"/>
${langSvg}
<line x1="56" y1="180" x2="944" y2="180" stroke="#e2e8f0" stroke-opacity="0.06"/>
${bars}`;
  return frame(1000, 290, 'GitHub activity for MargielaParis', body);
}

writeFileSync(asset('banner.svg'), hero());
if (!process.argv.includes('--hero-only')) {
  writeFileSync(asset('activity.svg'), stats(await fetchStats()));
}
