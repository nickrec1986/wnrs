/**
 * Fail the build if dist HTML/CSS still points at site-root assets/links.
 * GitHub project Pages is served at /wnrs/, so `/brand/...` 404s.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
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
    } else if (name.endsWith('.css')) {
      const css = readFileSync(p, 'utf8');
      cssRe.lastIndex = 0;
      let m;
      while ((m = cssRe.exec(css))) bad.push(`${p}: ${m[2]}`);
    }
  }
}

walk(root);
if (bad.length) {
  console.error('Paths missing Astro base /wnrs/ (would 404 on github.io):\n' + bad.join('\n'));
  process.exit(1);
}
console.log('Pages base check passed: dist img/href/url paths use /wnrs/');
