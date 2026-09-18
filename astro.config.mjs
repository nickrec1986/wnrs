// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://wnrs.com',
  // Project Pages preview: https://nickrec1986.github.io/wnrs/
  // Set to '/' when custom domains (wnrs.com) point at this Pages site.
  base: '/wnrs/',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
});
