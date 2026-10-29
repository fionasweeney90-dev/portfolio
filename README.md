# portfolio

Fiona Sweeney's UX portfolio, built with [Astro](https://astro.build).

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:4321/portfolio/.

## Where things live

| What | Where |
| --- | --- |
| Home page | `src/pages/index.astro` |
| Selected Work cards | `src/data/projects.ts` |
| Case study content | `src/data/case-studies/<slug>.json` (one file per case study) |
| Case study layout | `src/pages/work/[slug].astro`, `src/components/case-study/` |
| Colours, type, shared styles | `src/styles/global.css`, `src/styles/case-study.css` |
| Images | `public/images/` |

### Editing a case study

Each case study is a list of sections, and each section is a list of blocks. Block types:
`text`, `list`, `cards`, `callout`, `facts`, `team`, `timeline`, `findings`, `code` and `gallery`
(layouts `full`, `two`, `three`, `split`, `ba`, `devices`, `offset`). The shapes are typed in
`src/data/case-study.ts`.

- Sections with no blocks are hidden.
- Sections marked `"plain": true` are unnumbered.
- An image without a `src` shows its `label` as a placeholder, so `[Add …]` text marks what's still to do.
- Add `"zoom": true` to an image to let visitors open it full-screen.

### Adding a project cover

Put the image in `public/images/home/` and set `image` on the card in `src/data/projects.ts`.

## Deploying

Pushing to `main` builds the site and publishes it to GitHub Pages through `.github/workflows/deploy.yml`.
In the repo's **Settings → Pages**, set **Source** to **GitHub Actions** once.

The site is served at https://fionasweeney90-dev.github.io/portfolio/. If you move to a custom domain,
change `base` to `'/'` in `astro.config.mjs`.
