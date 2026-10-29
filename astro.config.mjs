import { defineConfig } from 'astro/config';

// Served from GitHub Pages at https://fionasweeney90-dev.github.io/portfolio/.
// If you move to a custom domain or a <user>.github.io repo, set base to '/'.
export default defineConfig({
  site: 'https://fionasweeney90-dev.github.io',
  base: '/portfolio',
  trailingSlash: 'ignore',
});
