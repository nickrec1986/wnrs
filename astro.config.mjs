// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * Normalize sitemap locs to https://wnrs.com/{path} with no trailing slash
 * (except home) and no leftover `/wnrs` preview prefix.
 */
function toProductionUrl(url) {
  const u = new URL(url);
  let path = u.pathname;
  if (path === '/wnrs' || path.startsWith('/wnrs/')) {
    path = path.slice('/wnrs'.length) || '/';
  }
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
  return path === '/' ? 'https://wnrs.com/' : `https://wnrs.com${path}`;
}

function sitemapPriority(url) {
  const path = new URL(url).pathname.replace(/\/$/, '') || '/';
  if (path === '/') return 1;
  if (path === '/services' || path === '/insights' || path === '/about-us') return 0.9;
  return 0.7;
}

// https://astro.build/config
export default defineConfig({
  site: 'https://wnrs.com',
  base: '/',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname.replace(/\/$/, '');
        if (path.endsWith('404') || path.endsWith('/404')) return false;
        if (path.endsWith('/pt') || path.endsWith('/es')) return false;
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
