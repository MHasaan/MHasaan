// Generates the demo cards. Run: node assets/make-cards.js
// Each card uses the portfolio's neutral frame plus one accent from that app's own identity.
const fs = require('fs');
const path = require('path');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

const cards = [
  {
    id: 'underwrite', name: 'Underwrite', kind: 'LOAN DEFAULT MODEL',
    claim: 'XGBoost credit risk on 307K applications,', claim2: 'explained with SHAP, scored in your browser.',
    stack: 'Python · DuckDB · XGBoost · SHAP',
    // navy rubber stamp
    glyph: `<g transform="translate(392 56) rotate(-8)"><rect x="-44" y="-17" width="88" height="34" rx="3" fill="none" stroke="#13294B" stroke-width="3"/><text x="0" y="6" text-anchor="middle" font-family="Georgia, serif" font-weight="700" font-size="16" letter-spacing="2" fill="#13294B">REFER</text></g>`,
    glyphDark: `<g transform="translate(392 56) rotate(-8)"><rect x="-44" y="-17" width="88" height="34" rx="3" fill="none" stroke="#9FB6DA" stroke-width="3"/><text x="0" y="6" text-anchor="middle" font-family="Georgia, serif" font-weight="700" font-size="16" letter-spacing="2" fill="#9FB6DA">REFER</text></g>`,
  },
  {
    id: 'sentinel', name: 'Sentinel', kind: 'TRANSACTION FRAUD',
    claim: '6.4M mobile-money transactions, cost-based', claim2: 'thresholds and drift monitoring.',
    stack: 'PySpark · XGBoost · FastAPI · Docker',
    // console tape: cyan rows, one red alert
    glyph: tape(),
    glyphDark: tape(),
  },
  {
    id: 'negamax', name: 'Negamax', kind: 'TIC-TAC-TOE AI',
    claim: 'An opponent that searches every future board,', claim2: 'and shows how it scores each move.',
    stack: 'React · TypeScript · minimax',
    glyph: lcd(), glyphDark: lcd(),
  },
  {
    id: 'orbit', name: 'Orbit', kind: '3D PROJECT SPACE',
    claim: 'Every project as a block on a blueprint;', claim2: 'height is the number of tools it uses.',
    stack: 'React · three.js · React Three Fiber',
    glyph: blueprint(), glyphDark: blueprint(),
  },
];

function tape() {
  const rows = [0, 1, 2, 3].map((i) => {
    const alert = i === 2;
    return `<rect x="0" y="${i * 11}" width="${alert ? 70 : 40 + ((i * 17) % 30)}" height="6" rx="1" fill="${alert ? '#FF4D5E' : '#3FD0E0'}" opacity="${alert ? 1 : 0.8}"/>`;
  }).join('');
  return `<g transform="translate(340 30)"><rect x="-10" y="-10" width="100" height="62" rx="6" fill="#0B0F14"/>${rows}</g>`;
}
function lcd() {
  const px = [[0,0],[2,0],[1,1],[0,2],[2,2]]; // an X in a 3x3 grid, drawn as pixels
  const cells = px.map(([c, r]) => `<rect x="${c * 16 + 4}" y="${r * 16 + 4}" width="10" height="10" fill="#0F380F"/>`).join('');
  const grid = `<path d="M16 0V48M32 0V48M0 16H48M0 32H48" stroke="#306230" stroke-width="2"/>`;
  return `<g transform="translate(348 24)"><rect x="-8" y="-8" width="64" height="64" rx="4" fill="#9BBC0F"/>${grid}${cells}</g>`;
}
function blueprint() {
  return `<g transform="translate(336 22)"><rect width="92" height="66" rx="4" fill="#0E3A6E"/>
    <path d="M10 56H82" stroke="#5D86B8"/>
    <rect x="16" y="30" width="16" height="26" fill="#2f74c8" fill-opacity=".6" stroke="#E6F0FF"/>
    <rect x="40" y="16" width="16" height="40" fill="#FFD166" fill-opacity=".4" stroke="#FFD166"/>
    <rect x="64" y="38" width="16" height="18" fill="none" stroke="#E6F0FF"/>
    <path d="M60 16V56M58 16H62M58 56H62" stroke="#FFD166"/></g>`;
}

for (const c of cards) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="460" height="150" viewBox="0 0 460 150" role="img" aria-label="${c.name}: ${esc(c.claim)} ${esc(c.claim2)}">
  <style>
    :root { --bg:#F2F3F0; --ink:#141A17; --muted:#5E6862; --signal:#2C4BFF; --line:rgba(20,26,23,.16); }
    .dk { display: none; }
    @media (prefers-color-scheme: dark) {
      :root { --bg:#161C19; --ink:#E6EAE6; --muted:#8D9892; --signal:#7B8CFF; --line:rgba(230,234,230,.16); }
      .lt { display: none; } .dk { display: inline; }
    }
    .kind { font: 500 11px ui-monospace, Consolas, monospace; letter-spacing: 1.4px; fill: var(--muted); }
    .name { font: 700 26px 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; fill: var(--ink); letter-spacing: -.4px; }
    .claim { font: 400 13.5px 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; fill: var(--ink); fill-opacity: .82; }
    .stack { font: 500 11.5px ui-monospace, Consolas, monospace; fill: var(--signal); }
  </style>
  <rect x=".5" y=".5" width="459" height="149" rx="10" fill="var(--bg)" stroke="var(--line)"/>
  <text class="kind" x="22" y="32">${c.kind}</text>
  <text class="name" x="20" y="64">${c.name}</text>
  <text class="claim" x="22" y="92">${esc(c.claim)}</text>
  <text class="claim" x="22" y="110">${esc(c.claim2)}</text>
  <text class="stack" x="22" y="134">${esc(c.stack)}  →</text>
  <g class="lt">${c.glyph}</g><g class="dk">${c.glyphDark}</g>
</svg>
`;
  fs.writeFileSync(path.join(__dirname, `work-${c.id}.svg`), svg);
}
console.log('wrote', cards.length, 'cards');
