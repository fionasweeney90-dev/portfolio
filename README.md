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
- Add `"zoom": true` to an image to let visitors open it full-screen.

### Drafts and placeholders

`[Add …]` placeholders and images without a `src` show while you work (`npm run dev`) but are left out of
the published site, so unfinished bits never go live.

To keep a whole project unpublished, add `"draft": true` to its case study JSON and `draft: true` to its card
in `src/data/projects.ts`. Leading Design and Gaming Experience are drafts for now; delete those two lines
to publish them.

### Adding a project cover

Put the image in `public/images/home/` and set `image` on the card in `src/data/projects.ts`.

### Adding the CV

Put the PDF in `public/` (e.g. `public/fiona-sweeney-cv.pdf`) and set `cv: '/fiona-sweeney-cv.pdf'` in
`src/lib/site.ts`. The "View CV" link appears once that's set.

## Deploying

Pushing to `main` builds the site and publishes it to GitHub Pages through `.github/workflows/deploy.yml`.
In the repo's **Settings → Pages**, set **Source** to **GitHub Actions** once.

The site is served at https://fionasweeney90-dev.github.io/portfolio/. If you move to a custom domain,
change `base` to `'/'` in `astro.config.mjs`.
