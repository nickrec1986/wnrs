# WNRS

Static marketing site for **WNRS** (World Net Recovery Systems) — B2B debt collection and accounts receivable management.

- **Primary domain:** [wnrs.com](https://wnrs.com) (English)
- **Brazil:** [wnrs.com.br](https://wnrs.com.br) (pt-BR; full site, preview at `/pt/` until DNS)
- **Mexico:** [wnrs.com.mx](https://wnrs.com.mx) (es-MX; full site, preview at `/es/` until DNS)
- **Client portal (do not touch):** [online.wnrs.com](https://online.wnrs.com)

Stack matches [tryteleforce.com](https://tryteleforce.com): **Astro 4**, `@astrojs/sitemap`, `output: 'static'`. Visual design is a pixel-faithful recreation of live [wnrs.com](https://wnrs.com) (WordPress/Elementor): Inter, blues `#1A5B8C` / `#5888CC`, green `#4EAB85`, light gray `#F5F5F5`, white cards — not Teleforce amber/navy.

## Local development

```bash
npm install
npm run dev        # http://localhost:4321/  (EN)  /pt/  /es/
npm run build      # writes ./dist (EN at root + full PT/ES preview trees)
npm run preview    # serve the static build at /
npm run build:br   # flatten PT to ./dist-br (wnrs.com.br root)
npm run build:mx   # flatten ES to ./dist-mx (wnrs.com.mx root)
```

English copy lives in `src/consts.ts`. Portuguese and Spanish overlays live in `src/i18n/pt.ts` and `src/i18n/es.ts` (same slugs). UI chrome is in `src/i18n/ui.ts`.

| Path | Role |
| --- | --- |
| `src/consts.ts` | EN stats, services, industries, sectors, testimonials, about, **PAGE_SEO** |
| `src/i18n/` | Locale routing, UI chrome, pt-BR / es-MX overlays |
| `src/seo.ts` | Production canonical / hreflang / JSON-LD helpers |
| `src/layouts/BaseLayout.astro` | Title, description, OG, Twitter, canonical, hreflang, Organization + WebPage JSON-LD |
| `src/components/` | Nav, footer, service/industry templates, contact |
| `src/pages/[slug].astro` | EN industry + sector URLs from `VERTICALS` |
| `src/pages/pt/` `src/pages/es/` | Full locale trees (same slugs) |
| `public/.nojekyll` | Lets GitHub Pages serve Astro’s `_astro/` folder |

## GitHub Pages deploy (wnrs.com)

This branch is prepared for the **custom-domain cutover**. `astro.config.mjs` has `site: 'https://wnrs.com'` and **`base: '/'`**. `public/CNAME` is `wnrs.com`. Internal links and assets go through `withBase()` so they resolve at the domain root (`/brand/...`, `/services`).

**https://nickrec1986.github.io/wnrs/ will break or redirect after this build is what Pages serves** (expected). Production target is **https://wnrs.com**.

- Workflow: `.github/workflows/deploy-pages.yml` runs `npm ci` + `npm run build` and deploys `dist/` on **push to `main`** (or **Actions → Deploy GitHub Pages → Run workflow**). The old PR-branch trigger is removed so this cutover does not publish until merge.
- **Repo settings → Pages → Source: GitHub Actions** (not “Deploy from a branch”).
- After merge: **Settings → Pages → Custom domain `wnrs.com`**, wait for the DNS check, then enable **Enforce HTTPS**.
- `npm run build` fails if dist still contains `/wnrs/` preview paths or a missing/wrong CNAME.

## SEO

- `<link rel="canonical">`, `og:url`, `og:image`, Twitter image, and JSON-LD URLs use the locale host: `https://wnrs.com/{path}/`, `https://wnrs.com.br/{path}/`, `https://wnrs.com.mx/{path}/`.
- `@astrojs/sitemap` on this repo lists **English** URLs only (`site: 'https://wnrs.com'`). `/pt/` and `/es/` preview paths are filtered out.
- hreflang on **every** marketing page: `en` → wnrs.com, `pt-BR` → wnrs.com.br, `es` → wnrs.com.mx, `x-default` → wnrs.com (same slug).
- Edit EN titles/descriptions in `PAGE_SEO` (`src/consts.ts`); PT/ES in `src/i18n/pt.ts` / `es.ts`.

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

1. Merge this PR to `main`. Confirm the **Deploy GitHub Pages** workflow is green on `main`.
2. In GitHub: **Settings → Pages → Custom domain `wnrs.com`**, wait until the DNS check is no longer “incorrect”, then enable **Enforce HTTPS**.
3. In **GoDaddy DNS** for `wnrs.com`:
   - Remove records that point the apex/`www` at WordPress hosting, a parked page, or a CDN in front of WP (A records to the current host, CNAME to `www`, forwarding, etc.).
   - Add the GitHub A/AAAA records for `@` and CNAME for `www` as above.
   - **Leave `online.wnrs.com` alone** — that hostname is the client portal, not this marketing site. Do not point it at Pages.
   - Leave `wnrs.com.br` and `wnrs.com.mx` alone (EN-only go-live).
4. Lower TTL ahead of time (300s) if you can, so the cutover is not stuck on a 1-hour TTL.
5. After HTTPS shows a padlock on `https://wnrs.com`, delete or archive the WordPress host. Do not leave the old site answering on a leftover A record.

The github.io `/wnrs/` preview is expected to 404 or redirect once Pages serves this root-base build.

Brazil and Mexico are separate DNS zones. GitHub Pages allows **one custom domain per repo**, so `.br` and `.mx` need their own Pages sites (sibling repos `wnrs-br` / `wnrs-mx` recommended). See **i18n** below. Do not point `online.wnrs.com` at Pages.

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

English stays at the root of this repo and deploys to **wnrs.com**. Full pt-BR and es-MX sites are generated at `/pt/…` and `/es/…` in the same `dist/` so they are previewable before DNS (local `npm run preview`, or `https://wnrs.com/pt/` / `https://wnrs.com/es/` after this PR is merged).

Public URLs after cutover are host-rooted — `https://wnrs.com.br/banking/`, not `https://wnrs.com/pt/banking/`. `npm run build:br` / `build:mx` flatten those trees into `dist-br/` / `dist-mx/` with `CNAME` and sitemaps for a second and third Pages repo.

The language switcher stays **path-based** (`/`, `/pt/`, `/es/` + same slug) until `LOCALE_DOMAINS_READY` in `src/i18n/locale.ts` is flipped `true` at DNS cutover. hreflang/canonicals already use the production hosts.

### Preview before DNS

1. `npm run build && npm run preview` → http://localhost:4321/pt/ and http://localhost:4321/es/
2. After merge to `main`: https://wnrs.com/pt/ and https://wnrs.com/es/ (same layout as EN).
3. Project Pages test sites (no CNAME, base `/wnrs-br/` and `/wnrs-mx/`, language at the site root):

   ```bash
   npm run build
   node scripts/flatten-locale.mjs es --preview-base /wnrs-mx
   node scripts/flatten-locale.mjs pt --preview-base /wnrs-br
   ```

   Publish `dist-mx/` to `nickrec1986/wnrs-mx` and `dist-br/` to `nickrec1986/wnrs-br` (`gh-pages` or `main`, plus `.nojekyll`). Test at https://nickrec1986.github.io/wnrs-mx/ and https://nickrec1986.github.io/wnrs-br/.
4. Optional: Actions → **Build wnrs.com.br artifact** / **Build wnrs.com.mx artifact** downloads a host-rooted zip (`dist-br` / `dist-mx`) that includes `CNAME`. Do not publish that zip until DNS cutover.

`LOCALE_DOMAINS_READY` stays `false` until cutover, so wnrs.com hreflang and the language switcher stay on `/`, `/pt/`, and `/es/`.

### DNS cutover (GoDaddy → GitHub Pages) for .br and .mx

Mirror the wnrs.com cutover. GitHub Pages IPv4/IPv6 and `www` CNAME targets are in [Managing a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-github-pages/managing-a-custom-domain-for-github-pages). Confirm in **each Pages repo → Settings → Pages**.

| Host | Type | Value |
| --- | --- | --- |
| `@` (apex) | **A** | GitHub Pages IPv4 (four records) |
| `@` | **AAAA** | GitHub Pages IPv6 |
| `www` | **CNAME** | `nickrec1986.github.io` (or the Pages user/org of that repo) |

Sequence per domain (`wnrs.com.br`, then `wnrs.com.mx`):

1. Create empty public repo `nickrec1986/wnrs-br` (then `wnrs-mx`). Enable **Pages → GitHub Actions** (or deploy from a branch after the first publish).
2. Add a fine-grained token with contents write on that repo as `GH_PAGES_BR_TOKEN` / `GH_PAGES_MX_TOKEN` on **this** repo, uncomment the publish step in `.github/workflows/deploy-pages-br.yml` / `deploy-pages-mx.yml`.
3. Run the workflow on `main`. Confirm the artifact site on `https://nickrec1986.github.io/wnrs-br/` (or the Pages URL GitHub shows).
4. **Settings → Pages → Custom domain** `wnrs.com.br` (or `.mx`). Wait for the DNS check, then **Enforce HTTPS**.
5. In **GoDaddy DNS** for that zone: remove WordPress/parked A/CNAME records for `@` and `www`. Add the GitHub A/AAAA + `www` CNAME. Lower TTL beforehand if you can.
6. **Do not cancel WordPress** on .br/.mx until HTTPS is green and you have spot-checked the new site.
7. Republish host-rooted builds (base `/`, with CNAME) — do not reuse the `/wnrs-mx/` / `/wnrs-br/` preview trees:

   ```bash
   npm run build:mx   # dist-mx/CNAME = wnrs.com.mx
   npm run build:br   # dist-br/CNAME = wnrs.com.br
   ```

   Push `dist-mx/` and `dist-br/` over the preview branches, then set each repo’s Pages custom domain.
8. Flip `LOCALE_DOMAINS_READY` to `true` (branch `cursor/locale-domains-ready-d924`) and merge it so the switcher and hreflang on all three hosts use `wnrs.com` / `wnrs.com.br` / `wnrs.com.mx` + the equivalent slug.
9. Leave `online.wnrs.com` and the live **wnrs.com** Pages settings alone.

Cloudflare Pages (one project, three custom domains, host-based rewrite) is an alternative if you do not want two extra GitHub repos. It is not required: GitHub Pages + two sibling repos matches the existing wnrs.com cutover.

## License

Private — WNRS marketing site.
