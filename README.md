# Adrin N Makombe — Builder Portfolio

> **Not just projects. Evidence of how I build systems.**

An interactive, recruiter-facing portfolio site built with React + Vite + TypeScript + Tailwind CSS. Hosted on GitHub Pages at `https://amakodev.github.io/portfolio`.

## Stack

- **React 18 + TypeScript** — SPA
- **Vite 5** — build tool, `base: '/portfolio/'`
- **Tailwind CSS 3** — dark glassmorphism design
- **Recharts** — technical signal dashboard
- **Framer Motion** — animations
- **Lucide React** — icons

## Sections

1. Hero / Curiosity Hook (animated counters)
2. 60-Second Recruiter View
3. Best-Fit Roles
4. Top Evidence Projects (17 screenshots)
5. Demo & Screenshot Gallery (lightbox)
6. Four Portfolio Themes
7. Recruiter Journey Selector (3 paths)
8. Portfolio Ecosystem Map (23 layers)
9. Featured Build Timeline
10. Deep-Dive Project Cards
11. Technical Signal Dashboard (Recharts)
12. Repository Explorer (searchable, filterable, 130 repos)
13. CV Bullet Builder (copy-ready bullets)
14. Trust & Transparency Notes
15. Common Recruiter Questions (FAQ)
16. Final Hiring Pitch

## Development

```bash
npm install
npm run dev
```

## Data Extraction

The repo data is pre-extracted from the XLSX. To re-extract:

```bash
npm run extract-data
```

Requires `xlsx` package (installed as dev dependency).

## Build & Deploy

```bash
# Local build
npm run build

# Deploy to gh-pages branch (manual)
npm run deploy
```

**GitHub Pages Settings:**
- Source: Deploy from a branch
- Branch: `gh-pages` / `(root)`
- URL: `https://amakodev.github.io/portfolio`

Note: `npm run deploy` uses `gh-pages` package to push the `dist` folder to the `gh-pages` branch. No billing required.

## Assets

- `public/screenshots/` — 17 project screenshots
- `public/gallery/` — headshot and team photos
- `src/data/` — extracted JSON from XLSX

## Contact

- **Email:** amakodev@gmail.com
- **Portfolio:** [amakodev.github.io/portfolio](https://amakodev.github.io/portfolio)
- **GitHub:** [github.com/amakodev](https://github.com/amakodev)
- **LinkedIn:** [linkedin.com/in/amakodevz](https://linkedin.com/in/amakodevz)
