/**
 * Fail the build if dist still uses the GitHub project-Pages preview prefix
 * `/wnrs/` or github.io hosts. Production is the domain root on wnrs.com.
 */
import { readdirSync, readFileSync, writeFileSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = 'dist';
const leftoverHtml = /(?:src|href)="(\/wnrs\/[^"]*)"/g;
const leftoverCss = /url\(\s*(['"]?)(\/wnrs\/[^'")\s]*)\1\s*\)/g;
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
      leftoverHtml.lastIndex = 0;
      let m;
      while ((m = leftoverHtml.exec(html))) bad.push(`${p}: leftover preview path ${m[1]}`);
      if (html.includes('github.io')) bad.push(`${p}: github.io host in HTML`);
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
      leftoverCss.lastIndex = 0;
      let m;
      while ((m = leftoverCss.exec(css))) bad.push(`${p}: leftover preview path ${m[2]}`);
    }
  }
}

walk(root);

// Safety: strip any leftover /wnrs/ from sitemap locs, then assert clean.
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

if (!existsSync(join(root, 'CNAME'))) {
  bad.push('dist/CNAME: missing (should copy public/CNAME → wnrs.com)');
} else {
  const cname = readFileSync(join(root, 'CNAME'), 'utf8').trim();
  if (cname !== 'wnrs.com') bad.push(`dist/CNAME: expected wnrs.com, got ${JSON.stringify(cname)}`);
}

if (bad.length) {
  console.error('Production URL check failed:\n' + bad.join('\n'));
  process.exit(1);
}
console.log('Pages check passed: domain-root paths, canonicals + sitemap on wnrs.com, CNAME present');
