/**
 * Locale routing for the EN / pt-BR / es-MX marketing sites.
 *
 * Default `npm run build` (this repo → wnrs.com):
 *   English at `/`, Portuguese at `/pt/…`, Spanish at `/es/…`.
 *   Public production URLs after DNS are host-rooted:
 *   https://wnrs.com.br/about-us/  (not https://wnrs.com/pt/about-us/).
 *
 * Flip `LOCALE_DOMAINS_READY` when GitHub Pages + GoDaddy DNS
 * for .br and .mx are live so the language switcher leaves this host.
 */
export const LOCALES = ['en', 'pt', 'es'] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_META: Record<
  Locale,
  { htmlLang: string; hreflang: string; origin: string; host: string; label: string; name: string; og: string }
> = {
  en: {
    htmlLang: 'en',
    hreflang: 'en',
    origin: 'https://wnrs.com',
    host: 'wnrs.com',
    label: 'EN',
    name: 'English',
    og: 'en_US',
  },
  pt: {
    htmlLang: 'pt-BR',
    hreflang: 'pt-BR',
    origin: 'https://wnrs.com.br',
    host: 'wnrs.com.br',
    label: 'BR',
    name: 'Português',
    og: 'pt_BR',
  },
  es: {
    htmlLang: 'es-MX',
    hreflang: 'es',
    origin: 'https://wnrs.com.mx',
    host: 'wnrs.com.mx',
    label: 'ES',
    name: 'Español',
    og: 'es_MX',
  },
};

/**
 * When false (default), the EN/BR/ES switcher stays on this host
 * (`/banking/`, `/pt/banking/`, `/es/banking/`) so the full PT/ES
 * sites are previewable before .br/.mx DNS. When true, it uses
 * wnrs.com / wnrs.com.br / wnrs.com.mx with the same slug.
 */
export const LOCALE_DOMAINS_READY = false;

/** Astro `base` without trailing slash (`''` when base is `/`). */
function configuredBase(): string {
  const raw = import.meta.env.BASE_URL || '/';
  return String(raw).replace(/\/$/, '');
}

/**
 * Drop Astro `base` and a leftover `/wnrs` preview prefix so locale
 * detection still works on project Pages (`/wnrs-locale-preview/pt/…`).
 */
export function stripPreviewPrefix(pathname: string): string {
  let p = pathname || '/';
  const base = configuredBase();
  if (base && (p === base || p === `${base}/`)) p = '/';
  else if (base && p.startsWith(`${base}/`)) p = p.slice(base.length) || '/';
  if (p === '/wnrs' || p.startsWith('/wnrs/')) p = p.slice('/wnrs'.length) || '/';
  return p || '/';
}

export function localeFromPath(pathname: string): Locale {
  const p = stripPreviewPrefix(pathname).replace(/\/$/, '') || '/';
  if (p === '/pt' || p.startsWith('/pt/')) return 'pt';
  if (p === '/es' || p.startsWith('/es/')) return 'es';
  return 'en';
}

/** Site path without `/pt` or `/es` prefix, always trailing-slashed except `/`. */
export function barePath(pathname: string): string {
  let p = stripPreviewPrefix(pathname);
  const trimmed = p.replace(/\/$/, '') || '/';
  if (trimmed === '/pt' || trimmed === '/es') return '/';
  if (trimmed.startsWith('/pt/')) p = trimmed.slice(3);
  else if (trimmed.startsWith('/es/')) p = trimmed.slice(3);
  else p = trimmed;
  if (p !== '/' && !p.endsWith('/')) p = `${p}/`;
  return p || '/';
}

export function localePrefix(locale: Locale): string {
  return locale === 'en' ? '' : `/${locale}`;
}

/** Marketing path (`/services`, `/#contact`) for a locale, then `withBase`. */
export function localeHref(path: string, locale: Locale): string {
  const prefix = localePrefix(locale);
  if (/^(https?:|mailto:|tel:)/i.test(path)) return path;
  if (path.startsWith('/#')) return `${prefix}/${path.slice(1)}` || path;
  if (path === '/') return prefix || '/';
  return `${prefix}${path}`;
}

export function pageHreflangLinks(pathname: string): { hreflang: string; href: string }[] {
  const bare = barePath(pathname);
  const suffix = bare === '/' ? '/' : bare.endsWith('/') ? bare : `${bare}/`;
  return [
    { hreflang: 'en', href: `https://wnrs.com${suffix}` },
    { hreflang: 'pt-BR', href: `https://wnrs.com.br${suffix}` },
    { hreflang: 'es', href: `https://wnrs.com.mx${suffix}` },
    { hreflang: 'x-default', href: `https://wnrs.com${suffix}` },
  ];
}

export function localeCanonical(pathname: string): string {
  const locale = localeFromPath(pathname);
  const bare = barePath(pathname);
  const suffix = bare === '/' ? '/' : bare.endsWith('/') ? bare : `${bare}/`;
  return `${LOCALE_META[locale].origin}${suffix}`;
}

export function switcherHref(target: Locale, pathname: string): string {
  const bare = barePath(pathname);
  const suffix = bare === '/' ? '/' : bare.endsWith('/') ? bare : `${bare}/`;
  if (LOCALE_DOMAINS_READY) return `${LOCALE_META[target].origin}${suffix}`;
  const prefix = localePrefix(target);
  const path = prefix ? `${prefix}${suffix}` : suffix;
  const base = configuredBase();
  if (!base) return path;
  if (path === '/') return `${base}/`;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export const MARKETING_PATHS = [
  '/',
  '/about-us',
  '/services',
  '/insights',
  '/privacy',
  '/terms',
] as const;
