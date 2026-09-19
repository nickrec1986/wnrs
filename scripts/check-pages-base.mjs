/**
 * Fail the build if dist HTML/CSS still points at site-root assets/links.
 * GitHub project Pages is served at /wnrs/, so `/brand/...` 404s.
 */
import { readdirSync, readFileSync, writeFileSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = 'dist';
const htmlRe = /(?:src|href)="(\/(?!wnrs\/)(?:[A-Za-z#][^"]*)?)"/g;
const cssRe = /url\(\s*(['"]?)(\/(?!wnrs\/)(?:brand|clients|icons)[^'")\s]*)\1\s*\)/g;
const bad = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      walk(p);
      continue;
    }
    if (name.endsWith('.html')) {
      const html = readFileSync(p, 'utf8');
      htmlRe.lastIndex = 0;
      let m;
      while ((m = htmlRe.exec(html))) bad.push(`${p}: ${m[1]}`);
      const canon = html.match(/rel="canonical" href="([^"]+)"/);
      if (canon) {
        const href = canon[1];
        if (href.includes('github.io') || /wnrs\.com\/wnrs\b/.test(href)) {
          bad.push(`${p}: canonical is not production: ${href}`);
        }
        if (
          !href.startsWith('https://wnrs.com/') &&
          href !== 'https://wnrs.com' &&
          !href.startsWith('https://wnrs.com.br') &&
          !href.startsWith('https://wnrs.com.mx')
        ) {
          bad.push(`${p}: unexpected canonical host: ${href}`);
        }
      }
      const ogUrl = html.match(/property="og:url" content="([^"]+)"/);
      if (ogUrl && (ogUrl[1].includes('github.io') || /wnrs\.com\/wnrs\b/.test(ogUrl[1]))) {
        bad.push(`${p}: og:url is not production: ${ogUrl[1]}`);
      }
    } else if (name.endsWith('.css')) {
      const css = readFileSync(p, 'utf8');
      cssRe.lastIndex = 0;
      let m;
      while ((m = cssRe.exec(css))) bad.push(`${p}: ${m[2]}`);
    }
  }
}

walk(root);

// Sitemap index locs still include Astro `base` (/wnrs/). Rewrite to production.
for (const name of ['sitemap-0.xml', 'sitemap-index.xml']) {
  const sp = join(root, name);
  if (!existsSync(sp)) continue;
  const next = readFileSync(sp, 'utf8').replaceAll('https://wnrs.com/wnrs/', 'https://wnrs.com/');
  writeFileSync(sp, next);
}

const sitemapFiles = ['dist/sitemap-0.xml', 'dist/sitemap-index.xml'];
for (const sp of sitemapFiles) {
  try {
    const xml = readFileSync(sp, 'utf8');
    if (xml.includes('github.io') || xml.includes('/wnrs/')) {
      bad.push(`${sp}: sitemap still has github.io or /wnrs/ preview paths`);
    }
    if (sp.endsWith('sitemap-0.xml') && !xml.includes('https://wnrs.com/insights')) {
      bad.push(`${sp}: insights URL missing from sitemap`);
    }
  } catch {
    bad.push(`${sp}: missing`);
  }
}

if (bad.length) {
  console.error('Paths missing Astro base /wnrs/ (would 404 on github.io):\n' + bad.join('\n'));
  process.exit(1);
}
console.log('Pages base check passed: dist img/href/url paths use /wnrs/; canonicals + sitemap on wnrs.com');
