/**
 * Prefix a site-relative path with Astro `base`.
 * Preview on GitHub project Pages uses `base: '/wnrs/'`.
 * Custom-domain cutover (wnrs.com) should set `base: '/'` in astro.config.mjs.
 *
 * Canonicals, Open Graph, hreflang, JSON-LD, and the sitemap do NOT use this
 * helper — they stay on https://wnrs.com/{path} via `src/seo.ts` so preview
 * URLs never become the indexed ones.
 */
export function withBase(path: string): string {
  if (/^(https?:|mailto:|tel:)/i.test(path)) return path;
  const base = import.meta.env.BASE_URL || '/';
  const hashIndex = path.indexOf('#');
  const hash = hashIndex >= 0 ? path.slice(hashIndex) : '';
  const raw = hashIndex >= 0 ? path.slice(0, hashIndex) : path;
  const relative = raw.replace(/^\//, '');
  if (!relative) return `${base}${hash}`;
  const prefix = base.endsWith('/') ? base : `${base}/`;
  return `${prefix}${relative}${hash}`;
}

/** Live wnrs.com above-the-fold photo for a Type / Industry / sector slug. */
export function pageHero(slug: string): string {
  return withBase(`/heroes/${slug}.jpg`);
}
