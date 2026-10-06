# ritun.space

Personal portfolio of **Ritun Jain** — B.E. Computer Science & Engineering (AI & ML) student at NIE Mysuru, building toward AI Engineer and Full-Stack Developer roles.

**Live:** [ritun.space](https://ritun.space)

A katana- and cherry-blossom-themed single-page site with a scroll-driven intro, a canvas petal field, and an interactive terminal that answers questions about my work.

## Features

- Katana-slash hero intro (GSAP timeline) over a hand-rolled canvas sakura field
- Project cards with an "unsheathe" hover effect and a synthesized blade sound
- **Interactive terminal** (`ritun.sh`): type `help`, `projects 2`, `skills`, `experience`, `certs`, `contact`, `github` or `linkedin`. Tab autocompletes, ↑/↓ recall history, and tappable command buttons work on touch devices
- Smooth scrolling with Lenis, scroll-triggered reveals, `prefers-reduced-motion` respected
- All content lives in data files, so updating the site never means touching JSX

## Tech stack

React 18 · Vite · Tailwind CSS · GSAP (ScrollTrigger) · Framer Motion · Lenis · Lucide icons

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build -> dist/
npm run preview    # serve the production build
```

## Editing content

| File | What it controls |
| --- | --- |
| `src/data/projects.js` | Project cards (also feeds the terminal's `projects` command) |
| `src/data/experience.js` | Journey timeline and certifications |
| `src/data/skills.js` | Skill groups |
| `src/components/Contact.jsx` | Contact email |
| `src/components/Terminal.jsx` | Terminal commands and links |

## Project structure

```
src/
  components/   Hero, About, Skills, Projects, Experience, Terminal, Contact, ...
  data/         projects.js, experience.js, skills.js
  lib/          Lenis + GSAP scroll wiring, utilities
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to the `gh-pages` branch with the custom domain `ritun.space`.

In the repo settings, GitHub Pages should be set to **Deploy from a branch → `gh-pages` / root**.

## Connect

[GitHub](https://github.com/KeyboardNoMouse) · [LinkedIn](https://www.linkedin.com/in/ritun-jain) · ritunjain246@gmail.com
