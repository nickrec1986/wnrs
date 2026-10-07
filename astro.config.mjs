// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { ASTRO_REDIRECTS } from './src/legacy-redirects.mjs';

/**
 * Sitemap locs on https://wnrs.com/{path}/ (home is https://wnrs.com/).
 * Strips a leftover `/wnrs` preview prefix if one ever appears.
 */
function toProductionUrl(url) {
  const u = new URL(url);
  let path = u.pathname;
  if (path === '/wnrs' || path.startsWith('/wnrs/')) {
    path = path.slice('/wnrs'.length) || '/';
  }
  if (path !== '/' && !path.endsWith('/')) path += '/';
  return `https://wnrs.com${path}`;
}

function sitemapPriority(url) {
  const path = new URL(url).pathname.replace(/\/$/, '') || '/';
  if (path === '/') return 1;
  if (path === '/services' || path === '/insights' || path === '/about-us') return 0.9;
  return 0.7;
}

const redirectSources = new Set(
  Object.keys(ASTRO_REDIRECTS).map((p) => {
    const trimmed = p.replace(/\/$/, '') || '/';
    return trimmed;
  }),
);

// https://astro.build/config
export default defineConfig({
  site: 'https://wnrs.com',
  base: '/',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  redirects: ASTRO_REDIRECTS,
  integrations: [
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname.replace(/\/$/, '') || '/';
        if (path.endsWith('404') || path === '/404') return false;
        if (path === '/pt' || path.startsWith('/pt/') || path === '/es' || path.startsWith('/es/')) return false;
        if (redirectSources.has(path)) return false;
        return true;
      },
      serialize(item) {
        item.url = toProductionUrl(item.url);
        item.priority = sitemapPriority(item.url);
        return item;
      },
    }),
  ],
});
