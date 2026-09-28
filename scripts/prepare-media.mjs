import { cpSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const workspace = dirname(root);
const players = {
  dwell: ['dwell-video-site', ['index.html', 'styles.css', 'assets/hls.min.js', 'assets/dwell-poster.jpg', 'hls']],
  choice: ['one-thought-video-site', ['index.html', 'assets/hls.min.js', 'hls']],
  shanghai: ['global-news-video-site', ['index.html', 'assets/hls.min.js', 'hls']],
  parking: ['video-portfolio-site', ['index.html', 'styles.css', 'assets/campus-parking-poster.jpg', 'assets/campus-parking-online.mp4', 'assets/campus-parking-online-1080p.webm']]
};

// Explicit allowlist: player assets only, never workspace documents or credentials.
for (const [key, [folder, files]] of Object.entries(players)) {
  for (const file of files) {
    const source = resolve(workspace, folder, 'dist', file);
    if (!existsSync(source)) throw new Error(`Required video asset missing: ${source}`);
    const target = resolve(root, 'dist/media', key, file);
    mkdirSync(dirname(target), { recursive: true });
    cpSync(source, target, { recursive: true });
  }
  console.log(`Prepared ${key}`);
}
