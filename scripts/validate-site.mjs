import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { resolve, dirname, relative, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const site = resolve(root, 'dist');
const failures = [];
const index = readFileSync(resolve(site, 'index.html'), 'utf8');
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
if (projects.pause.video?.player !== './media/pause/index.html?v=20260929-2' || projects.pause.still) failures.push('Hey, Press Pause must use its remastered local film player.');
const pauseCover = './assets/press-pause-poster-20260929.jpg';
const pausePlayer = readFileSync(resolve(site, 'media/pause/index.html'), 'utf8');
const pauseCovers = [...index.matchAll(/class="work-card[^" ]*(?: [^" ]+)*"[^>]*data-project="pause"[^>]*>[\s\S]*?<img (?:data-chapter-)?src="([^"]+)"/g)];
if (pauseCovers.length !== 1 || pauseCovers[0][1] !== pauseCover) failures.push('The Pause work card must use the supplied portrait poster.');
if (projects.pause.image !== './assets/press-pause-remaster-20260929.jpg' || projects.pause.poster || !pausePlayer.includes('poster="../../assets/press-pause-remaster-20260929.jpg"')) failures.push('Pause detail and player must retain the supplied landscape cover.');
if (!pausePlayer.includes("const source = './hls-remaster-20260929/index.m3u8';")) failures.push('Pause player must load the remastered video playlist.');
const pausePlaylist = readFileSync(resolve(site, 'media/pause/hls-remaster-20260929/index.m3u8'), 'utf8');
const pauseDuration = [...pausePlaylist.matchAll(/#EXTINF:([\d.]+)/g)].reduce((sum, match) => sum + Number(match[1]), 0);
if (Math.abs(pauseDuration - 179.896396) > 0.1) failures.push('Pause remaster must preserve the complete source duration.');
if (/press-pause\.jpg/.test(index + script + pausePlayer) || existsSync(resolve(site, 'media/pause/hls'))) failures.push('Superseded Pause media must not remain in the published site.');
const workLabels = [...index.matchAll(/class="work-no">([^<]+)</g)].map(match => match[1]);
if (workLabels.length !== 9 || workLabels.some(label => /^\d+\s*\//.test(label) || !/\/\s*20\d{2}$/.test(label))) failures.push('Work labels must show only type and year for all nine projects.');
if (/id="dialog-(?:deck|story)"|THE WORK/.test(index)) failures.push('Removed detail scaffolding remains in the page.');
if (/id="dialog-kicker"|SHEN JIAJUN \/ SELECTED WORK/.test(index) || /querySelector\(['"]#dialog-kicker['"]\)/.test(script)) failures.push('Removed detail masthead or kicker remains.');
const backdropSource = script.slice(script.indexOf('function isProjectBackdropPoint'), script.indexOf('let projectBackdropPress'));
const testDialog = {getBoundingClientRect: () => ({left:32,top:32,right:887,bottom:779})};
const isBackdropPoint = vm.runInNewContext(`${backdropSource}; isProjectBackdropPoint`, {projectDialog:testDialog});
for (const [clientX,clientY,expected] of [[16,400,true],[900,400,true],[400,16,true],[400,800,true],[400,400,false],[882,774,false],[32,32,false]]) {
  if (isBackdropPoint({target:testDialog,clientX,clientY}) !== expected) failures.push('Project backdrop hit testing must not close the window from its resize corner or scrollbar.');
}
if (isBackdropPoint({target:{},clientX:16,clientY:400})) failures.push('Clicks on project content must not be treated as backdrop clicks.');
const removedFacts = {accessibility:['Subject'], doxxing:['Subject'], parking:['Reporting','Format'], dwell:['Subjects'], choice:['Selection'], pause:['Brand'], shanghai:['Format','Places']};
for (const [key, project] of Object.entries(projects)) {
  if (!project.description?.trim()) failures.push(`Missing project description: ${key}`);
  if (project.article && (!Array.isArray(project.articleSize) || project.articleSize.length !== 2 || project.articleSize.some(value => !Number.isInteger(value) || value <= 0))) failures.push(`Missing intrinsic article dimensions: ${key}`);
  if (project.deck || project.story) failures.push(`Removed detail copy remains: ${key}`);
  if (project.meta.some(([label]) => removedFacts[key]?.includes(label))) failures.push(`Removed metadata remains: ${key}`);
  for (const key of ['image', 'article', 'still']) if (project[key]) checkRef(scriptFile, project[key]);
  if (project.video) checkRef(scriptFile, project.video.player);
  for (const [label, ref] of project.actions) {
    checkRef(scriptFile, ref);
    if (label.includes('original portfolio')) failures.push(`Removed portfolio link remains: ${key}`);
  }
}
const gallerySource = script.slice(script.indexOf('const photography ='), script.indexOf('const galleryDialog ='));
const {gallery, photography, photographyOrder} = vm.runInNewContext(`${gallerySource}; ({gallery, photography, photographyOrder})`, Object.create(null));
const expectedInternshipLinks = [
  [3, 'https://www.thepaper.cn/newsDetail_forward_32788899'],
  [5, 'https://www.thepaper.cn/newsDetail_forward_33036593'],
  [7, 'https://www.thepaper.cn/newsDetail_forward_33335354'],
  [8, 'https://m.thepaper.cn/newsDetail_forward_33044587'],
  [1, 'https://www.thepaper.cn/newsDetail_forward_33107850'],
  [6, 'https://m.thepaper.cn/newsDetail_forward_33205440'],
  [2, 'https://weixin.qq.com/sph/ACVLSvtLeK'],
  [4, 'https://weixin.qq.com/sph/AHfnU8sLHZ']
];
if (gallery.internship.length !== expectedInternshipLinks.length || expectedInternshipLinks.some(([number,href],i) => gallery.internship[i]?.src !== `./assets/gallery/internship-${String(number).padStart(2,'0')}.jpg` || gallery.internship[i]?.href !== href || !gallery.internship[i]?.title)) failures.push('Internship order or work links do not match the requested sequence.');
if (!index.includes('Click an image to view the work ↗')) failures.push('Missing internship click hint.');
if (photographyOrder.length !== photography.length || new Set(photographyOrder).size !== photography.length || photographyOrder.some(number => !Number.isInteger(number) || number < 1 || number > photography.length)) failures.push('Photography order must include every photograph exactly once.');
let galleryCount = 0;
for (const [type, items] of Object.entries(gallery)) {
  galleryCount += items.length;
  if (new Set(items.map(item => item.src)).size !== items.length) failures.push(`Duplicate ${type} gallery entries.`);
  const files = readdirSync(resolve(site, 'assets/gallery')).filter(name => new RegExp(`^${type}-\\d+\\.jpg$`).test(name));
  if (files.length !== items.length) failures.push(`Gallery count mismatch: ${type}`);
  for (const item of items) {
    checkRef(scriptFile, item.src);
    if (type === 'photo' && !item.preview) failures.push(`Missing photography preview: ${item.src}`);
    checkRef(scriptFile, item.preview);
    if (item.preview) checkRef(scriptFile, item.preview.replace(/\.webp$/, '.jpg'));
    if (!item.caption.endsWith(`/${String(items.length).padStart(2,'0')}`)) failures.push(`Stale gallery counter: ${item.caption}`);
  }
}
for (const match of index.matchAll(/\.\/assets\/tv-posters\/[^"\s]+\.webp/g)) {
  checkRef(resolve(site, 'index.html'), match[0].replace(/\.webp$/, '.jpg'));
}
if (size >= 1024 ** 3) failures.push('Published site exceeds GitHub Pages 1 GiB limit.');
if (failures.length) { console.error(failures.join('\n')); process.exit(1); }
console.log(`PASS: 9 projects, ${galleryCount} gallery images (${gallery.photo.length} photographs), ${segmentCount} HLS segments, ${count} files, ${(size / 1024 ** 2).toFixed(1)} MiB. All local references resolve.`);
