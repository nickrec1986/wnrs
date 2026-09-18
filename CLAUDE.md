# CLAUDE.md — WNRS site agent

## Mission
Maintain the WNRS marketing site: a static Astro 4 site for a B2B debt-collection /
accounts receivable management firm. Audience: finance, treasury, and ops leaders
evaluating ARM partners.

## Architecture (do not invent a CMS)
- Content lives in `src/consts.ts` (SITE, STATS, SERVICES, INDUSTRIES, SECTORS, ABOUT, HOME, …).
- Pages are thin. Service URLs are dedicated files that render `ServicePage`.
  Industry/sector URLs come from `src/pages/[slug].astro` via `VERTICALS`.
- Layout, SEO, JSON-LD: `src/layouts/BaseLayout.astro`.
- Brand tokens: `src/styles/global.css` Elementor kit-6 (`--primary` `#1A5B8C`,
  `--accent` `#5888CC`, `--green` `#4EAB85`, `--gray` `#F5F5F5`). Recreate live
  wnrs.com; do **not** restyle as Teleforce amber/navy.

## Voice
Direct, concrete, professional. Rewrite WordPress copy cleanly — never paste Elementor HTML.
Do not overclaim legal outcomes. Collections compliance: directional, not legal advice.

## Domains
- `wnrs.com` English (this build)
- `wnrs.com.br` pt-BR (stub under `/pt` until host-aware i18n)
- `wnrs.com.mx` ES (stub under `/es`)
- Leave `online.wnrs.com` alone (client portal)

## Stack
Astro 4, `@astrojs/sitemap`, `output: 'static'`, `site: 'https://wnrs.com'`.
GitHub Pages: `public/CNAME`, `.github/workflows/deploy.yml`.
