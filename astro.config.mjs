// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';

// Writing stays out of the sitemap until it has a published post, the same test as its page's noindex: a Markdown file
// in the folder (where the collection's loader looks) whose front matter doesn't say `draft: true`.
const writingDir = new URL('./src/content/writing/', import.meta.url);
const isDraft = (text) => /^draft:\s*true\s*$/m.test(text.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '');
const hasWriting = readdirSync(writingDir)
  .filter((f) => /\.mdx?$/.test(f))
  .some((f) => !isDraft(readFileSync(new URL(f, writingDir), 'utf8')));

export default defineConfig({
  site: 'https://mxsalata.com',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'never' },
  integrations: [mdx(), sitemap({ filter: (page) => !page.includes('/minecraft/') && (hasWriting || !page.includes('/writing/')) })],
});
