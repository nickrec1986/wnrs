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
npm run dev      # http://localhost:4321
npm run build    # writes ./dist
npm run preview  # serve the static build
```

Content is consts-driven. Edit copy in `src/consts.ts`; pages under `src/pages/` stay thin so bots can change the site via git.

| Path | Role |
| --- | --- |
| `src/consts.ts` | Stats, services, industries, sectors, testimonials, about |
| `src/layouts/BaseLayout.astro` | SEO, OG, canonical, Organization JSON-LD, sitemap link |
| `src/components/` | Nav, footer, service/industry templates, contact |
| `src/pages/[slug].astro` | All industry + sector URLs from `VERTICALS` |
| `src/pages/early-stage-arm.astro` (etc.) | Core service URLs |
| `public/CNAME` | GitHub Pages custom domain (`wnrs.com`) |

## GitHub Pages deploy

This repo deploys with [GitHub Pages](https://docs.github.com/en/pages) from `main`.

1. **Repo settings → Pages**
   - Source: **GitHub Actions** (not “Deploy from a branch”).
   - The workflow `.github/workflows/deploy.yml` runs `npm ci && npm run build` and publishes `./dist`.
2. **Custom domain**
   - Pages custom domain: `wnrs.com`
   - `public/CNAME` contains `wnrs.com` so the built site keeps the domain on every deploy.
   - Enforce HTTPS once DNS has propagated (GitHub provisions a Let’s Encrypt certificate automatically — no paid SSL SKU).
3. **Push to `main`** (or run the workflow manually). The first deploy can take a few minutes while DNS and the certificate settle.

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

1. Merge this site, confirm the Pages workflow is green, and open `https://<user>.github.io/wnrs/` or the Pages preview URL.
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
