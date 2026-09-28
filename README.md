# Shen Jiajun — Portfolio

The publishable static website is entirely inside `dist/`, including all four video players. Never upload the parent application-materials folder or account credentials.

Publication status: prepared for GitHub Pages; not yet published or anonymously verified.

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
- `dist/assets/`: posters, three full-length reports, eight internship pieces and twenty-four photos.
- `dist/media/`: Dwell, A Moment’s Choice, Shanghai and campus parking players.

Hey, Press Pause intentionally shows a still and reserves preview space; no unconfirmed video is inserted. The interactive school story and original portfolio links remain external services.

## Validation

```sh
node scripts/validate-site.mjs
```

This checks local image/player references, every HLS segment, project count, gallery files and GitHub size limits. `node scripts/prepare-media.mjs` is only needed when refreshing media from the original neighbouring local projects; it copies an explicit allowlist. It is not needed in GitHub Actions or a fresh clone with committed media.

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

The workflow redeploys automatically. Small text edits can also be committed directly on GitHub. Check Actions after each update; failed validation does not replace the last successful deployment. Replace HLS playlists and all referenced segments together.

Reference: [GitHub Pages automatic deployment](https://docs.github.com/en/get-started/start-your-journey/deploying-your-website-automatically).
