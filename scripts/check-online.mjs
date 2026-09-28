import { readdirSync, statSync } from 'node:fs';
import { resolve, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const site = resolve(dirname(fileURLToPath(import.meta.url)), '../dist');
const base = new URL(process.argv[2] || 'https://shen112s.github.io/shen-portfolio/');
const files = [];
function walk(dir) {
  for (const name of readdirSync(dir)) {
    if (name.startsWith('.')) continue;
    const file = resolve(dir, name), info = statSync(file);
    if (info.isDirectory()) walk(file);
    else files.push(relative(site, file));
  }
}
walk(site);
let cursor = 0;
const failures = [];
// Anonymous HEAD requests only: no login cookies, credentials or media downloads.
await Promise.all(Array.from({ length: 8 }, async () => {
  while (cursor < files.length) {
    const file = files[cursor++];
    try {
      const response = await fetch(new URL(file, base), { method: 'HEAD', signal: AbortSignal.timeout(20000) });
      if (!response.ok) failures.push(`${response.status}: ${file}`);
    } catch (error) { failures.push(`${file}: ${error.message}`); }
  }
}));
if (failures.length) { console.error(failures.join('\n')); process.exit(1); }
console.log(`PASS: ${files.length} website and media files publicly accessible without authentication at ${base.href}`);
