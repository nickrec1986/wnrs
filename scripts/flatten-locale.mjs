/**
 * Copy a path-prefixed locale tree (`dist/pt` or `dist/es`) to a
 * host-rooted folder (`dist-br` / `dist-mx`) for a separate GitHub Pages site.
 *
 * Rewrites `/pt/…` or `/es/…` hrefs to `/…` so the locale is the domain root.
 * Does not copy English pages or WordPress redirects (those stay on wnrs.com).
 */
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const locale = process.argv[2];
if (locale !== 'pt' && locale !== 'es') {
  console.error('Usage: node scripts/flatten-locale.mjs pt|es');
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

const locs = [];
for (const file of walk(out)) {
  if (!file.endsWith('.html')) continue;
  let html = readFileSync(file, 'utf8');
  // Language switcher: send EN/other-locale to production hosts before stripping /pt or /es.
  html = html.replace(/href="(\/[^"]*)"(\s+)hreflang="en"/g, 'href="https://wnrs.com$1"$2hreflang="en"');
  html = html.replace(/href="(\/pt)(\/[^"]*)"(\s+)hreflang="pt-BR"/g, 'href="https://wnrs.com.br$2"$3hreflang="pt-BR"');
  html = html.replace(/href="(\/pt\/)"(\s+)hreflang="pt-BR"/g, 'href="https://wnrs.com.br/"$2hreflang="pt-BR"');
  html = html.replace(/href="(\/es)(\/[^"]*)"(\s+)hreflang="es"/g, 'href="https://wnrs.com.mx$2"$3hreflang="es"');
  html = html.replace(/href="(\/es\/)"(\s+)hreflang="es"/g, 'href="https://wnrs.com.mx/"$2hreflang="es"');
  html = html.replace(prefixHashRe, '$1="/#');
  html = html.replace(prefixHomeRe, '$1="/"');
  html = html.replace(prefixRe, (_, attr, _pre, rest) => `${attr}="${rest}"`);
  writeFileSync(file, html);

  const rel = relative(out, file).replace(/\\/g, '/');
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

if (locale === 'es') {
  const dest = `${origin}/seguridad-privada/`;
  mkdirSync(join(out, 'defensa-y-seguridad'), { recursive: true });
  writeFileSync(
    join(out, 'defensa-y-seguridad', 'index.html'),
    `<!DOCTYPE html>
<html lang="es-MX">
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

writeFileSync(join(out, 'CNAME'), `${host}\n`);
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

console.log(`Flattened ${srcLocale} → ${out} (${uniqueLocs.length} pages) for ${host}`);
