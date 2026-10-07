/**
 * Production URL checks: no /wnrs/ preview prefix, trailing-slash canonicals
 * and sitemap locs, and every WordPress redirect file present in dist/.
 */
import { readdirSync, readFileSync, writeFileSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import {
  ASTRO_REDIRECTS,
  HTML_REDIRECTS,
  ALL_REDIRECT_SOURCES,
  expectedDistFile,
} from '../src/legacy-redirects.mjs';

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
    if (name.endsWith('.html') || name.endsWith('.hmtl')) {
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
        const allowed =
          href.startsWith('https://wnrs.com/') ||
          href === 'https://wnrs.com' ||
          href.startsWith('https://wnrs.com.br') ||
          href.startsWith('https://wnrs.com.mx') ||
          href.startsWith('https://online.wnrs.com');
        if (!allowed) bad.push(`${p}: unexpected canonical host: ${href}`);
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
    if (sp.endsWith('sitemap-0.xml')) {
      if (!xml.includes('https://wnrs.com/insights/')) {
        bad.push(`${sp}: insights URL missing from sitemap`);
      }
      const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((x) => x[1]);
      for (const loc of locs) {
        if (!loc.endsWith('/')) bad.push(`${sp}: sitemap loc missing trailing slash: ${loc}`);
        if (loc.includes('/pt/') || loc.endsWith('/pt/') || loc.includes('/es/') || loc.endsWith('/es/')) {
          bad.push(`${sp}: sitemap should not include preview locale paths: ${loc}`);
        }
      }
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

const home = readFileSync(join(root, 'index.html'), 'utf8');
const homeCanon = home.match(/rel="canonical" href="([^"]+)"/)?.[1];
if (homeCanon !== 'https://wnrs.com/') {
  bad.push(`home canonical should be https://wnrs.com/, got ${homeCanon}`);
}
if (!home.includes('rel="alternate" hreflang="pt-BR"')) {
  bad.push('home missing pt-BR hreflang alternate');
}
const about = readFileSync(join(root, 'about-us/index.html'), 'utf8');
if (!about.includes('rel="alternate" hreflang="pt-BR" href="https://wnrs.com.br/about-us/"')) {
  bad.push('about-us missing per-page pt-BR hreflang');
}
if (!about.includes('rel="alternate" hreflang="es" href="https://wnrs.com.mx/about-us/"')) {
  bad.push('about-us missing per-page es hreflang');
}
const aboutCanon = about.match(/rel="canonical" href="([^"]+)"/)?.[1];
if (aboutCanon !== 'https://wnrs.com/about-us/') {
  bad.push(`about-us canonical should end with slash, got ${aboutCanon}`);
}

const bareDirHref = /(?:href)="(\/[a-zA-Z0-9][-a-zA-Z0-9/]*[a-zA-Z0-9])"/g;
for (const file of ['index.html', 'about-us/index.html', 'services/index.html']) {
  const html = readFileSync(join(root, file), 'utf8');
  bareDirHref.lastIndex = 0;
  let m;
  while ((m = bareDirHref.exec(html))) {
    const href = m[1];
    if (/\.[a-zA-Z0-9]+$/.test(href)) continue;
    if (href.startsWith('/#')) continue;
    bad.push(`${file}: internal href missing trailing slash: ${href}`);
  }
}

for (const source of ALL_REDIRECT_SOURCES) {
  const rel = expectedDistFile(source);
  if (!existsSync(join(root, rel))) {
    bad.push(`redirect missing in dist/: ${rel} (from ${source})`);
  }
}

if (!existsSync(join(root, 'favicon.ico'))) bad.push('dist/favicon.ico missing');
if (!existsSync(join(root, 'apple-touch-icon.png'))) bad.push('dist/apple-touch-icon.png missing');

const localePages = [
  'index.html',
  'about-us/index.html',
  'services/index.html',
  'early-stage-arm/index.html',
  'banking/index.html',
  'privacy/index.html',
  'terms/index.html',
  'insights/index.html',
];
for (const loc of ['pt', 'es']) {
  const host = loc === 'pt' ? 'https://wnrs.com.br' : 'https://wnrs.com.mx';
  for (const rel of localePages) {
    const p = join(root, loc, rel);
    if (!existsSync(p)) {
      bad.push(`missing ${loc} page: ${rel}`);
      continue;
    }
    const html = readFileSync(p, 'utf8');
    const canon = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
    const expectedPath = rel === 'index.html' ? '/' : `/${rel.replace(/\/index\.html$/, '/')}`;
    const expected = `${host}${expectedPath}`;
    if (canon !== expected) bad.push(`${loc}/${rel}: canonical ${canon} (expected ${expected})`);
    if (!html.includes('rel="alternate" hreflang="en"')) {
      bad.push(`${loc}/${rel}: missing en hreflang`);
    }
  }
}

const ptHome = readFileSync(join(root, 'pt/index.html'), 'utf8');
if (!ptHome.includes('Suas contas a receber')) bad.push('pt home missing translated hero');
if (ptHome.includes('versão em português do site WNRS está em montagem')) {
  bad.push('pt home is still the stub');
}
const esHome = readFileSync(join(root, 'es/index.html'), 'utf8');
if (!esHome.includes('Sus cuentas por cobrar')) bad.push('es home missing translated hero');
if (esHome.includes('versión en español del sitio WNRS se está armando')) {
  bad.push('es home is still the stub');
}

if (bad.length) {
  console.error('Production URL check failed:\n' + bad.join('\n'));
  process.exit(1);
}
console.log(
  `Pages check passed: trailing-slash canonicals/sitemap, ${Object.keys(ASTRO_REDIRECTS).length} Astro redirects + ${Object.keys(HTML_REDIRECTS).length} HTML redirects, CNAME present`,
);
