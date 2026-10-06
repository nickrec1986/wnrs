/**
 * Write static meta-refresh HTML for WordPress .html (and typo .hmtl) URLs.
 * Astro does not emit routes that end in .html under directory format.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { HTML_REDIRECTS, absoluteDest } from '../src/legacy-redirects.mjs';

const root = process.argv.includes('--out')
  ? process.argv[process.argv.indexOf('--out') + 1]
  : 'public';

function page(dest) {
  const abs = absoluteDest(dest);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Redirecting…</title>
  <meta http-equiv="refresh" content="0;url=${abs}">
  <link rel="canonical" href="${abs}">
  <script>location.replace(${JSON.stringify(abs)});</script>
</head>
<body>
  <p>Redirecting to <a href="${abs}">${abs}</a></p>
</body>
</html>
`;
}

for (const [source, dest] of Object.entries(HTML_REDIRECTS)) {
  const file = join(root, source.replace(/^\//, ''));
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, page(dest));
  console.log(`wrote ${file} → ${absoluteDest(dest)}`);
}
