/**
 * Production SEO helpers.
 *
 * Canonicals, Open Graph URLs, and JSON-LD use the locale host:
 * wnrs.com / wnrs.com.br / wnrs.com.mx with the same slug (no /pt or /es
 * in the public URL). `productionPath` still strips a leftover `/wnrs` prefix.
 */
import { SITE } from './consts';
import { barePath, localeCanonical, localeFromPath, pageHreflangLinks } from './i18n/locale';

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
 * `/pt/{slug}/` and `/es/{slug}/` canonicalize to the locale hosts at root.
 */
export function canonicalUrl(pathname: string, override?: string): string {
  if (override) return override;
  return localeCanonical(pathname);
}

/** Per-page hreflang: EN content id on wnrs.com; localized slugs on .br / .mx. */
export function homeHreflangLinks(pathname = '/'): { hreflang: string; href: string }[] {
  return pageHreflangLinks(pathname);
}

export { barePath, localeFromPath, pageHreflangLinks };

/** Absolute production URL for a public asset (`/heroes/foo.jpg`). */
export function productionAssetUrl(sitePath: string): string {
  const clean = sitePath.startsWith('/') ? sitePath : `/${sitePath}`;
  return `${SITE.url}${clean}`;
}

export function breadcrumbJsonLd(crumbs: Crumb[], localeHost?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => {
      const path = barePath(c.path);
      const item = localeHost
        ? `${localeHost}${path === '/' ? '/' : path}`
        : canonicalUrl(c.path);
      return {
        '@type': 'ListItem',
        position: i + 1,
        name: c.name,
        item,
      };
    }),
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
