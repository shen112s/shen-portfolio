# Shen Jiajun — Portfolio

The publishable static website is entirely inside `dist/`, including all five video players. Never upload the parent application-materials folder or account credentials.

Website: https://shen112s.github.io/shen-portfolio/
Repository: https://github.com/shen112s/shen-portfolio

GitHub Pages deployment is enabled. The site is public; no GitHub login is required to view it.

## Local preview

From this project folder:

```sh
python3 -m http.server 8000 --bind 127.0.0.1 --directory dist
```

Open `http://127.0.0.1:8000/`. Use an HTTP server rather than opening HTML as a file, so HLS playback works correctly.

## Files to edit

- `dist/index.html`: cover, navigation and work index.
- `dist/editorial.css`: current layout, colours, typography and responsive rules; loaded after the base stylesheet.
- `dist/script.js`: project descriptions, links, media paths and gallery interactions.
- `dist/assets/`: posters, three full-length reports, eight internship pieces and thirty-six photos. Photos 25–36 are the twelve new photographs, appended in the supplied order without altering the source files.
- `dist/media/`: Dwell, A Moment’s Choice, Hey, Press Pause, Shanghai and campus parking players.

Hey, Press Pause temporarily uses the user-supplied `Bb13-09-020-0001.mp4`. Its web copy is in `dist/media/pause/hls/`; the desktop original remains untouched and is not included in the website. The player reuses the bundled HLS library from `dist/media/choice/assets/`. The interactive school story remains an external service with its own source link. Links to the old portfolio pages have been removed following the local review annotations.

## Validation

```sh
node scripts/validate-site.mjs
node scripts/check-online.mjs
```

This checks local image/player references, every HLS segment, project count, gallery files and GitHub size limits. `node scripts/prepare-media.mjs` is only needed when refreshing the other four players from the original neighbouring local projects; it copies an explicit allowlist and leaves the locally encoded Pause player untouched. It is not needed in GitHub Actions or a fresh clone with committed media.

## GitHub Pages setup

1. Upload this project folder only to your own repository, using a `main` branch.
2. Open **Settings → Pages → Source**, and select **GitHub Actions**.
3. The included workflow validates and publishes only `dist/` after pushes to `main`.
4. Wait for **Publish portfolio** to succeed, then use the URL under **Settings → Pages**.

## Future updates

You can ask Codex to edit this local project and publish to the same repository. The public URL stays the same.

For manual updates: edit the files above, preview locally, run validation, then:

```sh
git add dist scripts README.md DESIGN.md .github .gitignore
git commit -m "Update portfolio"
git push origin main
```

The workflow redeploys automatically. Small text edits can also be committed directly on GitHub. Check Actions after each update; failed validation does not replace the last successful deployment. Replace HLS playlists and all referenced segments together. Bump the `?v=` values in `dist/index.html` when changing CSS or JavaScript to avoid stale browser caches.

On this Mac, the repository has a local Git credential helper using the official GitHub CLI in the ignored `.release/` folder. Never upload or share that folder. A fresh clone on another computer needs its own GitHub login; the credential configuration is not included in source.

Reference: [GitHub Pages automatic deployment](https://docs.github.com/en/get-started/start-your-journey/deploying-your-website-automatically).
