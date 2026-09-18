/**
 * Prefix a site-relative path with Astro `base`.
 * Preview on GitHub project Pages uses `base: '/wnrs/'`.
 * Custom-domain cutover (wnrs.com) should set `base: '/'` in astro.config.mjs.
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
