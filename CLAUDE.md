# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Static marketing site for a small Czech restaurant ("Obecní restaurace Želiv"): menu, opening hours, photo gallery, and contact/reservation info. No framework, no build tool, no package manager — plain HTML/CSS/JS deployed as-is.

## Commands

There is no build, lint, or test tooling in this repo (no `package.json`). To preview locally, serve the directory with any static file server, e.g.:

```
python3 -m http.server 8000
```

or open `index.html` directly in a browser. Deployment is to Vercel as a static site (Vercel Analytics script is embedded in `index.html`); there is no `vercel.json`, so Vercel's default static-site handling applies.

## Architecture

- **`index.html`** — the entire site. One page, all sections inline: SEO/meta tags, Open Graph/Twitter tags, a JSON-LD `Restaurant` schema block, a small `<style>` block for a few overrides (bento gallery grid, lightbox, hero centering) that live on top of `style.min.css`, then the markup for navbar → hero → menu → Facebook embed → gallery → map → footer → cookie banner → lightbox markup.
- **`style.min.css`** — a single hand-maintained, pre-minified stylesheet. There is no source/SCSS file and no build step; edits are made directly to this minified file.
- **`js/`** — small, independent vanilla JS files, each wired up with its own `DOMContentLoaded` listener and loaded via `<script defer>` at the bottom of `index.html`. No bundler, no shared module system:
  - `navbar.js` — mobile nav overlay open/close state.
  - `openingHours.js` — computes and renders the "Otevřeno / Zavřeno / Otevíráme za X" status pill in the navbar, and highlights today's row in the footer opening-hours table. Contains its own hardcoded schedule logic.
  - `gallery.js` — bento grid → lightbox (click, prev/next, keyboard, click-outside-to-close) over the `.bentoItem img` elements.
  - `cookie.js` — cookie consent banner; persists choice in `localStorage` and updates `gtag('consent', ...)` for Google Analytics/Ads consent mode.
- **Opening hours are duplicated in four independent places** that must be kept in sync by hand: the meta/OG `description` tags, the JSON-LD `openingHoursSpecification`, and the footer's `.ohTable` markup (all in `index.html`), plus the hardcoded day/hour logic in `js/openingHours.js`. Current hours: Mon 11–14, Tue–Thu & Sun 11–20, Fri–Sat 11–21. Update all four when hours change.
- **`img/`** and **`svg/`** — static assets; gallery photos live in `img/gallery/` and are referenced by filename in both the JSON-LD `image` array and the gallery markup in `index.html`.
- Analytics/consent: Google tag (`gtag.js`) is loaded in `<head>` with consent mode defaulted to `denied`; `js/cookie.js` is what flips consent to `granted` after the user accepts the cookie banner.
- A `design-taste-frontend` skill is installed (`.claude/skills/`, tracked via `skills-lock.json`) for anti-slop frontend/design work — relevant when making visual/layout changes to this site.
