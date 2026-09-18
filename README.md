# WNRS

Static marketing site for **WNRS** (World Net Recovery Systems) — B2B debt collection and accounts receivable management.

- **Primary domain:** [wnrs.com](https://wnrs.com) (English)
- **Brazil:** [wnrs.com.br](https://wnrs.com.br) (pt-BR; stub routes live at `/pt` until that host is cut over)
- **Mexico:** [wnrs.com.mx](https://wnrs.com.mx) (Spanish; stub routes live at `/es`)
- **Client portal (do not touch):** [online.wnrs.com](https://online.wnrs.com)

Stack matches [tryteleforce.com](https://tryteleforce.com): **Astro 4**, `@astrojs/sitemap`, `output: 'static'`. Visual design is a pixel-faithful recreation of live [wnrs.com](https://wnrs.com) (WordPress/Elementor): Inter, blues `#1A5B8C` / `#5888CC`, green `#4EAB85`, light gray `#F5F5F5`, white cards — not Teleforce amber/navy.

## Local development

```bash
npm install
npm run dev      # http://localhost:4321/wnrs/
npm run build    # writes ./dist
npm run preview  # serve the static build (also under /wnrs/)
```

Content is consts-driven. Edit copy in `src/consts.ts`; pages under `src/pages/` stay thin so bots can change the site via git.

| Path | Role |
| --- | --- |
| `src/consts.ts` | Stats, services, industries, sectors, testimonials, about |
| `src/layouts/BaseLayout.astro` | SEO, OG, canonical, Organization JSON-LD, sitemap link |
| `src/components/` | Nav, footer, service/industry templates, contact |
| `src/pages/[slug].astro` | All industry + sector URLs from `VERTICALS` |
| `src/pages/early-stage-arm.astro` (etc.) | Core service URLs |
| `public/.nojekyll` | Lets GitHub Pages serve Astro’s `_astro/` folder |

## GitHub Pages deploy

Two URL modes. **This branch is set up so Nicolas can scroll a live preview on github.io.** Custom-domain cutover is a later config change, not required for review.

### Preview now (GitHub project Pages)

**Live preview:** https://nickrec1986.github.io/wnrs/ (after the first Actions deploy on this branch).

- `astro.config.mjs` has `site: 'https://nickrec1986.github.io'` and **`base: '/wnrs/'`**. Every public asset and internal link goes through `withBase()` (`import.meta.env.BASE_URL`) so logo, clients, illustrations, favicon, and nav are `/wnrs/brand/...` not `/brand/...`.
- `npm run build` greps `dist/` and fails if HTML still uses root-absolute `/brand/` or `/clients/` paths.
- Workflow: `.github/workflows/deploy-pages.yml` runs `npm ci` + `npm run build` and deploys `dist/` with `actions/upload-pages-artifact` + `actions/deploy-pages` on push to `cursor/wnrs-astro-marketing-site-2e72` and `main` (or **Actions → Deploy GitHub Pages → Run workflow**).
- **Repo settings → Pages → Source: GitHub Actions** (not “Deploy from a branch”).
- If deploy fails with “branch is not allowed to deploy to github-pages”, open **Settings → Environments → github-pages → Deployment branches** and add this PR branch (today only `main` is listed). Repo admins can also re-run the workflow; admin pushes bypass that rule, GitHub Actions does not.

`public/CNAME` is **not** on this branch. A CNAME of `wnrs.com` would force Pages onto the custom domain and redirect `github.io/wnrs` to the live WordPress site, which would hide this preview.

### Custom domain later (wnrs.com)

When DNS for `wnrs.com` / `www` points at GitHub Pages:

1. In `astro.config.mjs`, set **`site: 'https://wnrs.com'`** and **`base: '/'`**. Rebuild so asset URLs are root-absolute again.
2. Add `public/CNAME` containing `wnrs.com`.
3. In **Repo → Settings → Pages**, set custom domain `wnrs.com` and enable **Enforce HTTPS** after DNS checks pass.

Until that cutover, keep `base: '/wnrs/'` so the github.io preview keeps working.

`public/.nojekyll` is included because Astro emits `/_astro/` assets. Jekyll on Pages would otherwise ignore that folder.

## DNS cutover (GoDaddy WordPress → GitHub Pages)

Today wnrs.com still points at a GoDaddy-hosted WordPress/Elementor stack. After this site is live on Pages, cut DNS — do not keep WordPress in front of the new static files.

### What GitHub Pages needs

GitHub publishes the current Pages IPv4/IPv6 (apex) and `www` CNAME target in [Managing a custom domain for your GitHub Pages site](https://docs.github.com/en/pages/configuring-a-custom-domain-for-github-pages/managing-a-custom-domain-for-github-pages). Confirm the values in **Repo → Settings → Pages** at cutover time; they look like:

| Host | Type | Value |
| --- | --- | --- |
| `@` (apex `wnrs.com`) | **A** | GitHub Pages IPv4 addresses (four records) |
| `@` | **AAAA** | GitHub Pages IPv6 addresses |
| `www` | **CNAME** | `<org-or-user>.github.io` (for this repo: `nickrec1986.github.io`) |

ALTERNATIVE: some registrars allow an apex **ALIAS/ANAME** to `<user>.github.io`. GoDaddy typically uses A/AAAA for the apex plus CNAME for `www`.

### Cutover sequence

1. Merge this site, confirm the Pages workflow is green, and open **https://nickrec1986.github.io/wnrs/**.
2. In GitHub: set custom domain `wnrs.com`, wait until the DNS check is no longer “incorrect”, then enable **Enforce HTTPS**.
3. In **GoDaddy DNS** for `wnrs.com`:
   - Remove records that point the apex/`www` at WordPress hosting, a parked page, or a CDN in front of WP (A records to the current host, CNAME to `www`, forwarding, etc.).
   - Add the GitHub A/AAAA records for `@` and CNAME for `www` as above.
   - **Leave `online.wnrs.com` alone** — that hostname is the client portal, not this marketing site. Do not point it at Pages.
4. Lower TTL ahead of time (300s) if you can, so the cutover is not stuck on a 1-hour TTL.
5. After HTTPS shows a padlock on `https://wnrs.com`, delete or archive the WordPress host. Do not leave the old site answering on a leftover A record.

Brazil and Mexico are separate zones (`wnrs.com.br`, `wnrs.com.mx`). Repeat the same Pages + DNS pattern per domain when those locales are more than stubs (or serve them from this same `dist/` with host-aware routing later). Until then, locale switcher links go to the existing `.br` / `.mx` hosts.

## SSL is free on GitHub Pages

GitHub Pages provisions a **Let’s Encrypt** certificate for the custom domain and auto-renews it. You do **not** need:

- GoDaddy paid SSL
- A separate certificate SKU on the old WordPress box
- A CDN SSL add-on just to get HTTPS on a static site

Enable **Settings → Pages → Enforce HTTPS** after the domain check passes. If HTTPS is stuck, wait for DNS TTL, then toggle the custom domain off/on once.

## Why the Sucuri / “$500 security package” is not needed

The WordPress stack needed a WAF (Sucuri or similar) because it was a **dynamic CMS**: PHP, plugins, `wp-admin`, XML-RPC, theme CVEs, and a database. Attackers probe that surface constantly.

This site is **static HTML/CSS/JS** generated at build time and served from GitHub’s CDN:

- No WordPress, no PHP, no plugin attacks, no `wp-login.php`
- No origin database for this hostname
- No application server to patch on a schedule
- Forms are `mailto:` / `tel:` stubs (no backend to inject)
- The only write path is git + GitHub Actions

A $500/year malware-cleanup + WAF bundle is priced for a CMS. It does not add meaningful security on a static Pages site and should be **cancelled at cutover** so you are not paying Sucuri (or GoDaddy’s security upsell) to protect a host you are turning off.

Keep normal account hygiene: GitHub 2FA, limited Actions permissions (this workflow already uses `contents: read` + `pages: write`), and the separate lock-down of **online.wnrs.com**, which is still an application.

## i18n

Phase 1 ships English as default. `LOCALES` in `src/consts.ts` drives the EN / BR / ES switcher (links to `wnrs.com`, `wnrs.com.br`, `wnrs.com.mx`). Minimal home stubs exist at `/pt/` and `/es/` so folder routing is ready when those hosts point here.

## License

Private — WNRS marketing site.
