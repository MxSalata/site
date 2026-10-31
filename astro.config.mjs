// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { readdirSync } from 'node:fs';

// Writing stays out of the sitemap until it has a post (its page is also noindex while empty).
const hasWriting = readdirSync(new URL('./src/content/writing/', import.meta.url)).some((f) => /\.mdx?$/.test(f));

export default defineConfig({
  site: 'https://mxsalata.com',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'never' },
  integrations: [mdx(), sitemap({ filter: (page) => !page.includes('/minecraft/') && (hasWriting || !page.includes('/writing/')) })],
});
