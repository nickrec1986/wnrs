/**
 * After the country sites have been copied out of dist/es and dist/pt,
 * turn those trees on the wnrs.com build into permanent redirect stubs.
 *
 * GitHub Pages has no server redirects. Same shape as the WordPress stubs:
 * meta refresh, canonical, and location.replace.
 *
 * Does not touch dist-mx/ or dist-br/.
 */
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = 'dist';
const HOST = { es: 'https://wnrs.com.mx', pt: 'https://wnrs.com.br' };
const LANG = { es: 'es-MX', pt: 'pt-BR' };

function walk(dir, files = []) {
  if (!existsSync(dir)) return files;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, files);
    else files.push(p);
  }
  return files;
}

function stub(dest, lang) {
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <title>Redirecting…</title>
  <meta http-equiv="refresh" content="0;url=${dest}">
  <link rel="canonical" href="${dest}">
  <meta name="robots" content="noindex">
  <script>location.replace(${JSON.stringify(dest)});</script>
</head>
<body>
  <p>Redirecting to <a href="${dest}">${dest}</a></p>
</body>
</html>
`;
}

function isRedirect(html) {
  return html.includes('http-equiv="refresh"');
}

function retarget(html) {
  return html
    .replaceAll('https://wnrs.com/es/', 'https://wnrs.com.mx/')
    .replaceAll('https://wnrs.com/pt/', 'https://wnrs.com.br/');
}

function localeUrl(locale, rel) {
  let urlPath;
  if (rel === 'index.html') urlPath = '/';
  else if (rel.endsWith('/index.html')) urlPath = `/${rel.slice(0, -'index.html'.length)}`;
  else urlPath = `/${rel.replace(/\.html$/, '')}/`;
  if (!urlPath.endsWith('/')) urlPath += '/';
  return `${HOST[locale]}${urlPath}`;
}

let retargeted = 0;
for (const file of walk(ROOT)) {
  if (!file.endsWith('.html')) continue;
  const html = readFileSync(file, 'utf8');
  if (!isRedirect(html)) continue;
  const next = retarget(html);
  if (next !== html) {
    writeFileSync(file, next);
    retargeted += 1;
  }
}

let stubbed = 0;
for (const locale of ['es', 'pt']) {
  const base = join(ROOT, locale);
  for (const file of walk(base)) {
    if (!file.endsWith('.html')) continue;
    const html = readFileSync(file, 'utf8');
    if (isRedirect(html)) continue;
    const rel = relative(base, file).replaceAll('\\', '/');
    writeFileSync(file, stub(localeUrl(locale, rel), LANG[locale]));
    stubbed += 1;
  }
}

for (const name of ['sitemap-0.xml', 'sitemap-index.xml']) {
  const file = join(ROOT, name);
  if (!existsSync(file)) continue;
  const xml = readFileSync(file, 'utf8');
  const next = xml.replace(/<url><loc>https:\/\/wnrs\.com\/(?:es|pt)\/[^<]*<\/loc><\/url>\n?/g, '');
  if (next !== xml) writeFileSync(file, next);
  if (next.includes('https://wnrs.com/es/') || next.includes('https://wnrs.com/pt/')) {
    console.error(`${file} still lists /es/ or /pt/ URLs`);
    process.exit(1);
  }
}

const esHome = readFileSync(join(ROOT, 'es/index.html'), 'utf8');
const ptService = readFileSync(join(ROOT, 'pt/cobranca-administrativa/index.html'), 'utf8');
const enHome = readFileSync(join(ROOT, 'index.html'), 'utf8');
if (!esHome.includes('content="0;url=https://wnrs.com.mx/"')) {
  console.error('dist/es/index.html is not a redirect to https://wnrs.com.mx/');
  process.exit(1);
}
if (!ptService.includes('https://wnrs.com.br/cobranca-administrativa/')) {
  console.error('dist/pt/cobranca-administrativa/index.html missing br redirect');
  process.exit(1);
}
if (enHome.includes('http-equiv="refresh"') || !enHome.includes('Your Receivables')) {
  console.error('English home was rewritten');
  process.exit(1);
}

console.log(`Locale host redirects: ${stubbed} content pages stubbed, ${retargeted} existing redirects retargeted`);
