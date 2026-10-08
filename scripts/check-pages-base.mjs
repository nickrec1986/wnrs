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
import { SLUG_BY_LOCALE, toLocaleSlug } from '../src/i18n/slugs.mjs';

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

const localePageSets = {
  es: [
    'index.html',
    'about-us/index.html',
    'services/index.html',
    'cobranza-administrativa/index.html',
    'bancario/index.html',
    'seguridad-privada/index.html',
    'privacy/index.html',
    'terms/index.html',
    'insights/index.html',
  ],
  pt: [
    'index.html',
    'about-us/index.html',
    'services/index.html',
    'cobranca-administrativa/index.html',
    'bancario/index.html',
    'seguranca-privada/index.html',
    'privacy/index.html',
    'terms/index.html',
    'insights/index.html',
  ],
};
for (const loc of ['pt', 'es']) {
  const host = loc === 'pt' ? 'https://wnrs.com.br' : 'https://wnrs.com.mx';
  for (const rel of localePageSets[loc]) {
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
if (!esHome.includes('Tus cuentas por cobrar')) bad.push('es home missing translated hero');
if (esHome.includes('versión en español del sitio WNRS se está armando')) {
  bad.push('es home is still the stub');
}

const serviceHeroes = {
  es: {
    'early-stage-arm': {
      name: 'Cobranza Administrativa',
      h1: 'Recupera tu cartera antes de que se complique.',
    },
    'late-stage-arm': {
      name: 'Cobranza Extrajudicial',
      h1: 'Expertos avanzados para etapas avanzadas.',
    },
    'specialized-arm': { name: 'Cobranza Especializada', h1: 'Simplifica lo complejo.' },
    'financial-skip-tracing': {
      name: 'Localización de deudores',
      h1: 'Localiza al deudor y a sus bienes.',
    },
    'attorney-intervention': {
      name: 'Intervención Legal',
      h1: 'Litigio y ejecución de sentencia, en un solo lugar.',
    },
  },
  pt: {
    'early-stage-arm': {
      name: 'Cobrança Administrativa',
      h1: 'Recupere sua carteira antes que complique.',
    },
    'late-stage-arm': {
      name: 'Cobrança Extrajudicial',
      h1: 'Especialistas avançados para etapas avançadas.',
    },
    'specialized-arm': { name: 'Cobrança Especializada', h1: 'Simplifique o complexo.' },
    'financial-skip-tracing': {
      name: 'Localização de Inadimplentes',
      h1: 'Localize o inadimplente e os seus bens.',
    },
    'attorney-intervention': {
      name: 'Cobrança Judicial',
      h1: 'Litígio e execução de sentença, num só lugar.',
    },
  },
};

for (const [loc, pages] of Object.entries(serviceHeroes)) {
  for (const [slug, { name, h1 }] of Object.entries(pages)) {
    const p = join(root, loc, toLocaleSlug(slug, loc), 'index.html');
    if (!existsSync(p)) {
      bad.push(`missing ${loc} service page: ${slug}`);
      continue;
    }
    const html = readFileSync(p, 'utf8');
    const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '';
    if (!title.startsWith(`${name} | WNRS`)) {
      bad.push(`${loc}/${slug}: title should lead with "${name} | WNRS" (got "${title}")`);
    }
    const desc = html.match(/name="description" content="([^"]*)"/)?.[1] ?? '';
    if (!desc.toLowerCase().includes(name.toLowerCase())) {
      bad.push(`${loc}/${slug}: meta description missing service name "${name}"`);
    }
    const hero = html.match(
      /<p class="kicker"([^>]*)>([^<]*)<\/p>\s*<h1>([^<]*)<\/h1>\s*<p class="lede">([\s\S]*?)<\/p>/,
    );
    if (!hero) {
      bad.push(`${loc}/${slug}: missing real kicker+h1+lede hero stack`);
    } else {
      const [, kickerAttrs, kicker, heading, lede] = hero;
      if (/\baria-hidden\b/.test(kickerAttrs)) {
        bad.push(`${loc}/${slug}: kicker is aria-hidden`);
      }
      if (kicker.trim() !== name) bad.push(`${loc}/${slug}: kicker "${kicker.trim()}" ≠ "${name}"`);
      if (heading.trim() !== h1) bad.push(`${loc}/${slug}: h1 "${heading.trim()}" ≠ "${h1}"`);
      if (heading.trim() === name) bad.push(`${loc}/${slug}: h1 repeats the service name`);
      if (!lede.toLowerCase().includes(name.toLowerCase())) {
        bad.push(`${loc}/${slug}: intro missing service name "${name}"`);
      }
    }
    const ldBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(
      (m) => {
        try {
          return JSON.parse(m[1]);
        } catch {
          return null;
        }
      },
    );
    const serviceLd = ldBlocks.find((b) => b?.['@type'] === 'Service');
    if (!serviceLd || !String(serviceLd.name).includes(name) || serviceLd.serviceType !== name) {
      bad.push(`${loc}/${slug}: JSON-LD Service.name/serviceType missing "${name}"`);
    }
    if (serviceLd && String(serviceLd.name).includes(h1.replace(/\.$/, ''))) {
      bad.push(`${loc}/${slug}: JSON-LD Service.name used the tagline`);
    }
    const crumbs = ldBlocks.find((b) => b?.['@type'] === 'BreadcrumbList');
    const crumbNames = crumbs?.itemListElement?.map((i) => i.name) ?? [];
    if (!crumbNames.includes(name)) {
      bad.push(`${loc}/${slug}: breadcrumb JSON-LD missing "${name}"`);
    }
  }
}

const enEarly = join(root, 'early-stage-arm', 'index.html');
if (existsSync(enEarly)) {
  const html = readFileSync(enEarly, 'utf8');
  if (!html.includes('<h1>Early Stage Collection</h1>')) {
    bad.push('en early-stage-arm: H1 should stay the service name');
  }
  if (!html.includes('Debt Collection Experts')) {
    bad.push('en early-stage-arm: brand kicker missing');
  }
}

const newIndustry = {
  en: { name: 'Private Security', file: join(root, 'private-security', 'index.html') },
  es: { name: 'Seguridad Privada', file: join(root, 'es', 'seguridad-privada', 'index.html') },
  pt: { name: 'Segurança Privada', file: join(root, 'pt', 'seguranca-privada', 'index.html') },
};
for (const [loc, { name, file }] of Object.entries(newIndustry)) {
  if (!existsSync(file)) {
    bad.push(`missing ${loc} private-security page`);
    continue;
  }
  const html = readFileSync(file, 'utf8');
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '';
  if (!title.startsWith(name)) bad.push(`${loc}/private-security: title should lead with "${name}" (got "${title}")`);
  const desc = html.match(/name="description" content="([^"]*)"/)?.[1] ?? '';
  if (!desc.toLowerCase().includes(name.toLowerCase())) {
    bad.push(`${loc}/private-security: meta description missing "${name}"`);
  }
  if (!html.includes(`<h1>${name}</h1>`)) bad.push(`${loc}/private-security: H1 should be "${name}"`);
}

const sectorIds = new Set(['business', 'enterprise', 'government', 'utilities']);
const serviceIds = new Set([
  'early-stage-arm',
  'late-stage-arm',
  'specialized-arm',
  'financial-skip-tracing',
  'attorney-intervention',
]);
for (const loc of ['es', 'pt']) {
  const generic = loc === 'es' ? 'Industria' : 'Setor';
  for (const [en, slug] of Object.entries(SLUG_BY_LOCALE[loc])) {
    if (sectorIds.has(en) || serviceIds.has(en)) continue;
    const p = join(root, loc, slug, 'index.html');
    if (!existsSync(p)) {
      bad.push(`missing ${loc} industry page: ${en}`);
      continue;
    }
    const html = readFileSync(p, 'utf8');
    const hero = html.match(/<p class="kicker"([^>]*)>([^<]*)<\/p>\s*<h1>([^<]*)<\/h1>/);
    if (!hero) {
      bad.push(`${loc}/${slug}: missing real kicker+h1 industry hero`);
      continue;
    }
    const [, kickerAttrs, kicker, heading] = hero;
    if (/\baria-hidden\b/.test(kickerAttrs)) bad.push(`${loc}/${slug}: kicker is aria-hidden`);
    if (kicker.trim() === generic) {
      bad.push(`${loc}/${slug}: industry kicker is still generic "${generic}"`);
    }
    if (kicker.trim().length < 20) {
      bad.push(`${loc}/${slug}: industry kicker too short: "${kicker.trim()}"`);
    }
    if (!heading.trim()) bad.push(`${loc}/${slug}: empty industry H1`);
  }
}
const enEdu = join(root, 'education-research', 'index.html');
if (existsSync(enEdu)) {
  const html = readFileSync(enEdu, 'utf8');
  if (!html.includes('<p class="kicker">Industry</p>')) {
    bad.push('en education-research: kicker should stay Industry');
  }
}

function walkHtml(dir, acc = []) {
  if (!existsSync(dir)) return acc;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walkHtml(p, acc);
    else if (name.endsWith('.html')) acc.push(p);
  }
  return acc;
}
const armRe = /\bARM\b/;
for (const loc of ['es', 'pt']) {
  for (const file of walkHtml(join(root, loc))) {
    const html = readFileSync(file, 'utf8');
    if (armRe.test(html)) bad.push(`${file}: leftover ARM acronym`);
  }
}

if (bad.length) {
  console.error('Production URL check failed:\n' + bad.join('\n'));
  process.exit(1);
}
console.log(
  `Pages check passed: trailing-slash canonicals/sitemap, ${Object.keys(ASTRO_REDIRECTS).length} Astro redirects + ${Object.keys(HTML_REDIRECTS).length} HTML redirects, CNAME present`,
);
