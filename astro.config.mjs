// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';

// A collection's index stays out of the sitemap until it has a published entry, the same test as its page's noindex: a
// Markdown file in the folder (where the collection's loader looks) whose front matter doesn't say `draft: true`.
const isDraft = (text) => /^draft:\s*true\s*$/m.test(text.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '');
const hasEntries = (name) => {
  const dir = new URL(`./src/content/${name}/`, import.meta.url);
  return readdirSync(dir)
    .filter((f) => /\.mdx?$/.test(f))
    .some((f) => !isDraft(readFileSync(new URL(f, dir), 'utf8')));
};
const hasWriting = hasEntries('writing');
const hasReviews = hasEntries('reviews');

export default defineConfig({
  site: 'https://mxsalata.com',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'never' },
  integrations: [mdx(), sitemap({
      filter: (page) =>
        !page.includes('/minecraft/') && (hasWriting || !page.includes('/writing/')) && (hasReviews || !page.includes('/reviews/')),
    }),],
});
