/**
 * Copy a path-prefixed locale tree (`dist/pt` or `dist/es`) to a
 * host-rooted folder (`dist-br` / `dist-mx`) for a separate GitHub Pages site.
 *
 * Rewrites `/pt/…` or `/es/…` hrefs to `/…` so the locale is the domain root.
 * Does not copy English pages. Spanish WordPress `.html` stubs that target `/es/`
 * are copied into the Mexico build and pointed at wnrs.com.mx.
 */
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { HTML_REDIRECTS } from '../src/legacy-redirects.mjs';

const args = process.argv.slice(2);
const locale = args[0];
let previewBase = '';
for (let i = 1; i < args.length; i++) {
  if (args[i] === '--preview-base') previewBase = (args[++i] || '').replace(/\/$/, '');
}
if (locale !== 'pt' && locale !== 'es') {
  console.error('Usage: node scripts/flatten-locale.mjs pt|es [--preview-base /wnrs-br|/wnrs-mx]');
  process.exit(1);
}
if (previewBase && previewBase !== '/wnrs-br' && previewBase !== '/wnrs-mx') {
  console.error('Preview base must be /wnrs-br or /wnrs-mx (project Pages before DNS).');
  process.exit(1);
}

const host = locale === 'pt' ? 'wnrs.com.br' : 'wnrs.com.mx';
const origin = `https://${host}`;
const srcRoot = 'dist';
const srcLocale = join(srcRoot, locale);
const out = locale === 'pt' ? 'dist-br' : 'dist-mx';
const prefix = `/${locale}`;

if (!existsSync(srcLocale)) {
  console.error(`Missing ${srcLocale}. Run npm run build first.`);
  process.exit(1);
}

if (existsSync(out)) rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

const assetDirs = ['_astro', 'brand', 'clients', 'press', 'heroes', 'icons', 'fonts'];
for (const name of assetDirs) {
  const from = join(srcRoot, name);
  if (existsSync(from)) cpSync(from, join(out, name), { recursive: true });
}

for (const name of [
  'favicon.ico',
  'apple-touch-icon.png',
  'og-default.jpg',
  '.nojekyll',
]) {
  const from = join(srcRoot, name);
  if (existsSync(from)) cpSync(from, join(out, name));
}

cpSync(srcLocale, out, { recursive: true });

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, files);
    else files.push(p);
  }
  return files;
}

const prefixRe = new RegExp(`(href|src)="(${prefix})(/[^"]*)"`, 'g');
const prefixHomeRe = new RegExp(`(href|src)="${prefix}/"`, 'g');
const prefixHashRe = new RegExp(`(href)="${prefix}/#`, 'g');

const ptSwitch = previewBase ? 'https://nickrec1986.github.io/wnrs-br' : 'https://wnrs.com.br';
const esSwitch = previewBase ? 'https://nickrec1986.github.io/wnrs-mx' : 'https://wnrs.com.mx';

function prefixPreview(html) {
  if (!previewBase) return html;
  return html
    .replace(/((?:href|src)=")\//g, `$1${previewBase}/`)
    .replace(/url\(\s*(['"]?)\//g, `url($1${previewBase}/`);
}

const locs = [];
for (const file of walk(out)) {
  if (!file.endsWith('.html')) continue;
  let html = readFileSync(file, 'utf8');
  // Language switcher: EN stays on wnrs.com. The other locale goes to its
  // production host, or to the github.io test site when --preview-base is set.
  html = html.replace(/href="(\/[^"]*)"(\s+)hreflang="en"/g, 'href="https://wnrs.com$1"$2hreflang="en"');
  html = html.replace(/href="(\/pt)(\/[^"]*)"(\s+)hreflang="pt-BR"/g, `href="${ptSwitch}$2"$3hreflang="pt-BR"`);
  html = html.replace(/href="(\/pt\/)"(\s+)hreflang="pt-BR"/g, `href="${ptSwitch}/"$2hreflang="pt-BR"`);
  html = html.replace(/href="(\/es)(\/[^"]*)"(\s+)hreflang="es"/g, `href="${esSwitch}$2"$3hreflang="es"`);
  html = html.replace(/href="(\/es\/)"(\s+)hreflang="es"/g, `href="${esSwitch}/"$2hreflang="es"`);
  html = html.replace(prefixHashRe, '$1="/#');
  html = html.replace(prefixHomeRe, '$1="/"');
  html = html.replace(prefixRe, (_, attr, _pre, rest) => `${attr}="${rest}"`);
  if (html.includes('http-equiv="refresh"')) {
    html = html
      .replaceAll('https://wnrs.com/es/', 'https://wnrs.com.mx/')
      .replaceAll('https://wnrs.com/pt/', 'https://wnrs.com.br/');
  }
  html = prefixPreview(html);
  writeFileSync(file, html);

  const rel = relative(out, file).replace(/\\/g, '/');
  if (html.includes('http-equiv="refresh"')) continue;
  if (rel === '404.html' || rel.endsWith('/404/index.html')) continue;
  let path = rel.endsWith('/index.html')
    ? `/${rel.slice(0, -'/index.html'.length)}/`
    : rel === 'index.html'
      ? '/'
      : `/${rel.replace(/\.html$/, '/')}`;
  if (path !== '/' && !path.endsWith('/')) path += '/';
  locs.push(`${origin}${path === '//' ? '/' : path}`);
}

const four = join(out, '404', 'index.html');
if (existsSync(four)) cpSync(four, join(out, '404.html'));

function writeHostRedirect(fromSlug, toPath, lang) {
  const path = toPath.startsWith('/') ? toPath : `/${toPath}`;
  const dest = previewBase ? `https://nickrec1986.github.io${previewBase}${path}` : `${origin}${path}`;
  mkdirSync(join(out, fromSlug), { recursive: true });
  writeFileSync(
    join(out, fromSlug, 'index.html'),
    `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <title>Redirecting…</title>
  <meta http-equiv="refresh" content="0;url=${dest}">
  <link rel="canonical" href="${dest}">
  <script>location.replace(${JSON.stringify(dest)});</script>
</head>
<body>
  <p>Redirecting to <a href="${dest}">${dest}</a></p>
</body>
</html>
`,
  );
}

function legacyHostRedirects() {
  const prefix = `/${locale}/`;
  let copied = 0;
  for (const [source, dest] of Object.entries(HTML_REDIRECTS)) {
    if (dest !== `/${locale}` && dest !== prefix && !dest.startsWith(prefix)) continue;
    const from = join(srcRoot, source.replace(/^\//, ''));
    if (!existsSync(from)) continue;
    let path = dest.replace(new RegExp(`^/${locale}`), '') || '/';
    if (!path.startsWith('/')) path = `/${path}`;
    if (path !== '/' && !path.endsWith('/')) path += '/';
    const abs = `${origin}${path}`;
    const file = join(out, source.replace(/^\//, ''));
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, `<!DOCTYPE html>
<html lang="${locale === 'pt' ? 'pt-BR' : 'es-MX'}">
<head>
  <meta charset="utf-8">
  <title>Redirecting…</title>
  <meta http-equiv="refresh" content="0;url=${abs}">
  <link rel="canonical" href="${abs}">
  <meta name="robots" content="noindex">
  <script>location.replace(${JSON.stringify(abs)});</script>
</head>
<body>
  <p>Redirecting to <a href="${abs}">${abs}</a></p>
</body>
</html>
`);
    copied += 1;
  }
  if (!copied) console.log(`No legacy /${locale}/ WordPress HTML redirects to copy into ${out}`);
  else console.log(`Copied ${copied} legacy /${locale}/ WordPress HTML redirects into ${out}`);
}

legacyHostRedirects();

if (locale === 'es') {
  writeHostRedirect('defensa-y-seguridad', '/seguridad-privada/', 'es-MX');
  writeHostRedirect('productos-de-molino', '/acero-papel-y-madera/', 'es-MX');
}
if (locale === 'pt') {
  writeHostRedirect('produtos-de-laminacao', '/aco-papel-e-madeira/', 'pt-BR');
  writeHostRedirect('produtos-de-moinho', '/aco-papel-e-madeira/', 'pt-BR');
}

if (previewBase) {
  const cname = join(out, 'CNAME');
  if (existsSync(cname)) rmSync(cname);
} else {
  writeFileSync(join(out, 'CNAME'), `${host}\n`);
}
writeFileSync(join(out, '.nojekyll'), '');
writeFileSync(
  join(out, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap-index.xml\n`,
);

const uniqueLocs = [...new Set(locs)].sort();
const urlset = uniqueLocs
  .map((loc) => `  <url><loc>${loc}</loc></url>`)
  .join('\n');
writeFileSync(
  join(out, 'sitemap-0.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlset}\n</urlset>\n`,
);
writeFileSync(
  join(out, 'sitemap-index.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap><loc>${origin}/sitemap-0.xml</loc></sitemap>\n</sitemapindex>\n`,
);

if (previewBase) {
  for (const file of walk(out)) {
    if (!file.endsWith('.css')) continue;
    const css = readFileSync(file, 'utf8');
    const next = css.replace(/url\(\s*(['"]?)\//g, `url($1${previewBase}/`);
    if (next !== css) writeFileSync(file, next);
  }
}

console.log(
  `Flattened ${srcLocale} → ${out} (${uniqueLocs.length} pages) for ${previewBase ? `preview ${previewBase}` : host}`,
);
