// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://nickrec1986.github.io',
  base: '/wnrs/',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
});
