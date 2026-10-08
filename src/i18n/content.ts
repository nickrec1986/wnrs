import {
  ABOUT,
  DIFFERENTIATORS,
  HOME,
  HOME_PICKER,
  KEY_STATS,
  PAGE_SEO,
  PROCESS_STEPS,
  SERVICES,
  SITE,
  TESTIMONIALS,
  VERTICALS,
  getService,
  getVertical,
  type SeoEntry,
  type Service,
  type Vertical,
} from '../consts';
import { esAbout, esDifferentiators, esHome, esKeyStats, esLegal, esPicker, esProcess, esSectorStats, esSeo, esServices, esSite, esTestimonials, esVerticals } from './es';
import type { Locale } from './locale';
import { ptAbout, ptDifferentiators, ptHome, ptKeyStats, ptLegal, ptPicker, ptProcess, ptSectorStats, ptSeo, ptServices, ptSite, ptTestimonials, ptVerticals } from './pt';
import { toLocaleSlug } from './slugs.mjs';

export function localizedSite(locale: Locale) {
  if (locale === 'pt') return { ...SITE, ...ptSite, url: 'https://wnrs.com.br' };
  if (locale === 'es') return { ...SITE, ...esSite, url: 'https://wnrs.com.mx' };
  return SITE;
}

export function localizedHome(locale: Locale) {
  if (locale === 'pt') return { ...HOME, ...ptHome };
  if (locale === 'es') return { ...HOME, ...esHome };
  return HOME;
}

export function localizedKeyStats(locale: Locale): readonly string[] {
  if (locale === 'pt') return ptKeyStats;
  if (locale === 'es') return esKeyStats;
  return KEY_STATS;
}

export function localizedPicker(locale: Locale) {
  const labels = locale === 'pt' ? ptPicker : locale === 'es' ? esPicker : null;
  return HOME_PICKER.map((p) => {
    const isContact = p.href.includes('#contact');
    const slug = p.href.replace(/\/$/, '').split('/').filter(Boolean).pop()?.split('#')[0] || '';
    const key = isContact ? 'contact' : slug;
    const path = isContact ? '/#contact' : `/${slug}`;
    return { href: path, label: labels?.[key] ?? p.label };
  });
}

export function localizedDifferentiators(locale: Locale) {
  const overlay = locale === 'pt' ? ptDifferentiators : locale === 'es' ? esDifferentiators : null;
  return DIFFERENTIATORS.map((d, i) => (overlay?.[i] ? { ...d, ...overlay[i] } : d));
}

export function localizedProcess(locale: Locale) {
  const overlay = locale === 'pt' ? ptProcess : locale === 'es' ? esProcess : null;
  return PROCESS_STEPS.map((s, i) => (overlay?.[i] ? { ...s, ...overlay[i] } : s));
}

export function localizedTestimonials(locale: Locale) {
  const overlay = locale === 'pt' ? ptTestimonials : locale === 'es' ? esTestimonials : null;
  return TESTIMONIALS.map((t, i) => (overlay?.[i] ? { ...t, ...overlay[i] } : t));
}

export function localizedAbout(locale: Locale) {
  if (locale === 'pt') return { ...ABOUT, ...ptAbout };
  if (locale === 'es') return { ...ABOUT, ...esAbout };
  return ABOUT;
}

export function localizedLegal(locale: Locale) {
  if (locale === 'pt') return ptLegal;
  if (locale === 'es') return esLegal;
  return {
    privacy: [
      'This static marketing site does not run a CMS, user accounts, or a collections database. If you email or call us, we use the contact details you send to respond to your inquiry.',
      'Client-file data lives on the separate portal at online.wnrs.com, not on this site. We do not sell marketing-site visitor lists.',
    ],
    terms: [
      'The content on this site is for general information about WNRS accounts receivable and collection services. Nothing here is legal advice, a credit decision, or a commitment to take a specific file.',
      'Engagement for collection work is governed by a separate written agreement between WNRS and the client. Use of the client portal at online.wnrs.com is governed by that portal’s own terms.',
    ],
  };
}

export function localizedSectorStats(locale: Locale): Record<string, string> {
  if (locale === 'pt') return ptSectorStats;
  if (locale === 'es') return esSectorStats;
  return { business: 'Increased 85%', enterprise: 'Increased 80%', government: 'Increased 75%' };
}

export function localizedServices(locale: Locale): Service[] {
  if (locale === 'en') return SERVICES;
  const overlay = locale === 'pt' ? ptServices : esServices;
  return SERVICES.map((s) => ({ ...s, ...(overlay[s.slug] ?? {}) }));
}

export function localizedService(slug: string, locale: Locale): Service | undefined {
  const base = getService(slug);
  if (!base) return undefined;
  if (locale === 'en') return base;
  const overlay = locale === 'pt' ? ptServices[slug] : esServices[slug];
  return overlay ? { ...base, ...overlay } : base;
}

export function localizedVerticals(locale: Locale): Vertical[] {
  if (locale === 'en') return VERTICALS;
  const overlay = locale === 'pt' ? ptVerticals : esVerticals;
  return VERTICALS.map((v) => ({ ...v, ...(overlay[v.slug] ?? {}) }));
}

export function localizedVertical(slug: string, locale: Locale): Vertical | undefined {
  const base = getVertical(slug);
  if (!base) return undefined;
  if (locale === 'en') return base;
  const overlay = locale === 'pt' ? ptVerticals[slug] : esVerticals[slug];
  return overlay ? { ...base, ...overlay } : base;
}

export function localizedFeatured(locale: Locale) {
  return localizedVerticals(locale).filter((v) => v.kind === 'industry' && v.featured);
}

export function localizedSeo(path: string, locale: Locale): SeoEntry {
  const key = path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
  if (locale === 'pt') return ptSeo[key] ?? { title: ptSite.title, description: ptSite.description };
  if (locale === 'es') return esSeo[key] ?? { title: esSite.title, description: esSite.description };
  return PAGE_SEO[key] ?? { title: SITE.title, description: SITE.description };
}

export function marketingSlugs(locale: Locale = 'en'): string[] {
  return [
    'about-us',
    'services',
    'insights',
    'privacy',
    'terms',
    '404',
    ...SERVICES.map((s) => toLocaleSlug(s.slug, locale)),
    ...VERTICALS.map((v) => toLocaleSlug(v.slug, locale)),
  ];
}

for (const s of SERVICES) {
  if (!ptServices[s.slug]) throw new Error(`pt overlay missing service ${s.slug}`);
  if (!esServices[s.slug]) throw new Error(`es overlay missing service ${s.slug}`);
}
for (const v of VERTICALS) {
  if (!ptVerticals[v.slug]) throw new Error(`pt overlay missing vertical ${v.slug}`);
  if (!esVerticals[v.slug]) throw new Error(`es overlay missing vertical ${v.slug}`);
  if (v.kind === 'industry') {
    if (!esVerticals[v.slug].kicker) throw new Error(`es overlay missing industry kicker ${v.slug}`);
    if (!ptVerticals[v.slug].kicker) throw new Error(`pt overlay missing industry kicker ${v.slug}`);
  }
}
