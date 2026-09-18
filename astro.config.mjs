// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Preview origin so OG/canonical/sitemap resolve on github.io.
  // At custom-domain cutover: site: 'https://wnrs.com', base: '/'.
  site: 'https://nickrec1986.github.io',
  base: '/wnrs/',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
});
