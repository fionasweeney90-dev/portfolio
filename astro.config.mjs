import { defineConfig } from 'astro/config';

// Served from GitHub Pages on the custom domain https://fionasweeneydesign.com/.
// The domain itself is set in the repo's Settings → Pages (a CNAME file isn't used with Actions deploys).
export default defineConfig({
  site: 'https://fionasweeneydesign.com',
  base: '/',
  trailingSlash: 'ignore',
});
