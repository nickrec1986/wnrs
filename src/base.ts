/**
 * Prefix a site-relative path with Astro `base`.
 * Production (`site: 'https://wnrs.com'`, `base: '/'`) yields root-absolute
 * directory URLs (`/services/`, `/about-us/`). Asset paths keep their
 * filename (no trailing slash). `/#contact` is unchanged.
 */
export function withBase(path: string): string {
  if (/^(https?:|mailto:|tel:)/i.test(path)) return path;
  const base = import.meta.env.BASE_URL || '/';
  const hashIndex = path.indexOf('#');
  const hash = hashIndex >= 0 ? path.slice(hashIndex) : '';
  const raw = hashIndex >= 0 ? path.slice(0, hashIndex) : path;
  const relative = raw.replace(/^\//, '');
  if (!relative) return `${base === '/' ? '/' : base}${hash}`;
  const prefix = base.endsWith('/') ? base : `${base}/`;
  let url = `${prefix}${relative}`;
  const isFile = /\.[a-zA-Z0-9]+$/.test(url);
  if (!isFile && !url.endsWith('/')) url += '/';
  return `${url}${hash}`;
}

/** Live wnrs.com above-the-fold photo for a Type / Industry / sector slug. */
export function pageHero(slug: string): string {
  return withBase(`/heroes/${slug}.jpg`);
}
