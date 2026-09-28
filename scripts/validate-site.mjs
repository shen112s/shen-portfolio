import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { resolve, dirname, relative, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const site = resolve(root, 'dist');
const failures = [];
let size = 0, count = 0, segmentCount = 0;

function checkRef(file, ref) {
  if (!ref || /^(?:https?:|data:|#|mailto:)/i.test(ref)) return;
  const target = resolve(dirname(file), ref.split(/[?#]/)[0]);
  if (!target.startsWith(`${site}/`) || !existsSync(target)) failures.push(`Invalid reference in ${relative(site, file)}: ${ref}`);
}

function walk(folder) {
  for (const name of readdirSync(folder)) {
    const file = resolve(folder, name), info = statSync(file);
    if (info.isDirectory()) { walk(file); continue; }
    count++; size += info.size;
    if (info.size >= 100 * 1024 ** 2) failures.push(`File exceeds GitHub's limit: ${relative(site, file)}`);
    if (extname(file) === '.html') {
      const content = readFileSync(file, 'utf8');
      for (const match of content.matchAll(/(?:src|href|poster)=["']([^"']+)["']/g)) checkRef(file, match[1]);
      for (const match of content.matchAll(/(?:streamUrl|source)\s*=\s*["'](\.\/[^"']+)["']/g)) checkRef(file, match[1]);
    }
    if (extname(file) === '.m3u8') {
      const content = readFileSync(file, 'utf8');
      if (!content.includes('#EXT-X-ENDLIST')) failures.push(`Incomplete VOD playlist: ${relative(site, file)}`);
      for (const line of content.split(/\r?\n/)) {
        const ref = line.trim();
        if (ref && !ref.startsWith('#')) { checkRef(file, ref); segmentCount++; }
      }
    }
  }
}

walk(site);
const scriptFile = resolve(site, 'script.js'), script = readFileSync(scriptFile, 'utf8');
new vm.Script(script);
if (/localhost|127\.0\.0\.1|\.\.\/\.\.\//.test(script)) failures.push('Script still depends on a local server or sibling project.');
const projectsSource = script.slice(script.indexOf('const projects ='), script.indexOf('const projectDialog ='));
const projects = vm.runInNewContext(`${projectsSource}; projects`, Object.create(null));
if (Object.keys(projects).length !== 9) failures.push('Expected nine projects.');
for (const project of Object.values(projects)) {
  for (const key of ['image', 'article', 'still']) if (project[key]) checkRef(scriptFile, project[key]);
  if (project.video) checkRef(scriptFile, project.video.player);
  for (const [, ref] of project.actions) checkRef(scriptFile, ref);
}
for (const [type, total] of [['internship',8], ['photo',24]]) {
  for (let i=1; i<=total; i++) checkRef(scriptFile, `./assets/gallery/${type}-${String(i).padStart(2,'0')}.jpg`);
}
if (size >= 1024 ** 3) failures.push('Published site exceeds GitHub Pages 1 GiB limit.');
if (failures.length) { console.error(failures.join('\n')); process.exit(1); }
console.log(`PASS: 9 projects, 32 gallery images, ${segmentCount} HLS segments, ${count} files, ${(size / 1024 ** 2).toFixed(1)} MiB. All local references resolve.`);
