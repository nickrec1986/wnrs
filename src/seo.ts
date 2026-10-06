/**
 * Production SEO helpers.
 *
 * Canonicals, Open Graph URLs, and JSON-LD use https://wnrs.com/{path}/
 * (home is https://wnrs.com/). `productionPath` still strips a leftover
 * `/wnrs` pathname if a preview-era URL is passed in.
 */
import { LOCALES, SITE } from './consts';

export const PREVIEW_BASE = '/wnrs';
export const OG_IMAGE_URL = `${SITE.url}/og-default.jpg`;
export const LOGO_URL = `${SITE.url}/brand/logo-wnrs.png`;

export type Crumb = { name: string; path: string };

/** Site-relative path as it should appear on wnrs.com (trailing slash). */
export function productionPath(pathname: string): string {
  let path = pathname || '/';
  if (path === PREVIEW_BASE || path.startsWith(`${PREVIEW_BASE}/`)) {
    path = path.slice(PREVIEW_BASE.length) || '/';
  }
  if (path !== '/' && !path.endsWith('/')) path = `${path}/`;
  return path || '/';
}

/**
 * Absolute production URL for a marketing-site path.
 * `/pt/` and `/es/` stubs canonicalize to the real locale hosts.
 */
export function canonicalUrl(pathname: string, override?: string): string {
  if (override) return override;
  const path = productionPath(pathname);
  if (path === '/pt' || path === '/pt/') return 'https://wnrs.com.br/';
  if (path === '/es' || path === '/es/') return 'https://wnrs.com.mx/';
  if (path === '/') return `${SITE.url}/`;
  return `${SITE.url}${path}`;
}

/** Homepage hreflang only — locale hosts do not have matching inner pages yet. */
export function homeHreflangLinks(): { hreflang: string; href: string }[] {
  return [
    { hreflang: 'en', href: 'https://wnrs.com/' },
    { hreflang: 'pt-BR', href: 'https://wnrs.com.br/' },
    { hreflang: 'es', href: 'https://wnrs.com.mx/' },
    { hreflang: 'x-default', href: 'https://wnrs.com/' },
  ];
}

/** Absolute production URL for a public asset (`/heroes/foo.jpg`). */
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
