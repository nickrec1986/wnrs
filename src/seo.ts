/**
 * Production SEO helpers.
 *
 * Canonicals, Open Graph URLs, hreflang, JSON-LD, and the sitemap use
 * https://wnrs.com/... with no `/wnrs` prefix. `productionPath` still
 * strips a leftover `/wnrs` pathname if a preview-era URL is passed in.
 */
import { LOCALES, SITE } from './consts';

export const PREVIEW_BASE = '/wnrs';
export const OG_IMAGE_URL = `${SITE.url}/og-default.jpg`;
export const LOGO_URL = `${SITE.url}/brand/logo-wnrs.png`;

export type Crumb = { name: string; path: string };

/** Site-relative path as it should appear on wnrs.com (no preview prefix). */
export function productionPath(pathname: string): string {
  let path = pathname || '/';
  if (path === PREVIEW_BASE || path.startsWith(`${PREVIEW_BASE}/`)) {
    path = path.slice(PREVIEW_BASE.length) || '/';
  }
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
  return path || '/';
}

/**
 * Absolute production URL for a marketing-site path.
 * `/pt` and `/es` stubs canonicalize to the real locale hosts.
 */
export function canonicalUrl(pathname: string, override?: string): string {
  if (override) return override;
  const path = productionPath(pathname);
  if (path === '/pt') return 'https://wnrs.com.br';
  if (path === '/es') return 'https://wnrs.com.mx';
  if (path === '/') return SITE.url;
  return `${SITE.url}${path}`;
}

/** Same path on a locale host (home for `/`, `/pt`, `/es`). */
export function localeAlternateUrl(host: string, pathname: string): string {
  const path = productionPath(pathname);
  const origin = `https://${host}`;
  if (path === '/' || path === '/pt' || path === '/es') return origin;
  return `${origin}${path}`;
}

export function hreflangLinks(pathname: string): { hreflang: string; href: string }[] {
  const links = LOCALES.map((l) => ({
    hreflang: l.hreflang,
    href: localeAlternateUrl(l.host, pathname),
  }));
  links.push({
    hreflang: 'x-default',
    href: localeAlternateUrl('wnrs.com', pathname),
  });
  return links;
}

/** Absolute production URL for a public asset (`/heroes/foo.jpg`, not `/wnrs/...`). */
export function productionAssetUrl(sitePath: string): string {
  const clean = sitePath.startsWith('/') ? sitePath : `/${sitePath}`;
  return `${SITE.url}${clean}`;
}

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: canonicalUrl(c.path),
    })),
  };
}

export function webPageJsonLd(opts: {
  title: string;
  description: string;
  url: string;
  lang?: string;
  type?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': opts.type ?? 'WebPage',
    name: opts.title,
    description: opts.description,
    url: opts.url,
    inLanguage: opts.lang ?? 'en',
    isPartOf: {
      '@type': 'WebSite',
      name: SITE.name,
      url: SITE.url,
      publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    },
  };
}
