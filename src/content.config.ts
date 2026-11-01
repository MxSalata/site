import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    featured: z.boolean().optional(),
    // A screenshot for the tiles (a path under public/), and a short honour shown as a badge.
    cover: z.object({ src: z.string(), tile: z.string().optional(), alt: z.string(), themed: z.boolean().optional() }).optional(),
    award: z.string().optional(),
    // Further honours from the same contest, shown as small pins beside the award (for example "1st in Freshmen").
    pins: z.array(z.string()).optional(),
    // The contest's full name and page, shown on the project page (the tile keeps the short award).
    contest: z.object({ name: z.string(), href: z.string().url() }).optional(),
    // A link without an href is a placeholder: shown as an inactive button marked "Coming soon".
    links: z.array(z.object({ label: z.string(), href: z.string().optional() })).optional(),
    draft: z.boolean().default(false),
  }),
});

const writing = defineCollection({
  loader: glob({ pattern: '*.{md,mdx}', base: './src/content/writing' }), // top level only: /writing/[slug]/ takes no slash
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    canonical: z.string().optional(),
    // An article published elsewhere (for example on the InterSystems Developer Community): the lists link straight to it,
    // and no page is made for it here.
    url: z.string().url().optional(),
    draft: z.boolean().default(false),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

// Reviews of places and products. Places stay vague about where (a town or county at most), and a review goes up a while
// after the visit, not the same day.
const reviews = defineCollection({
  loader: glob({ pattern: '*.{md,mdx}', base: './src/content/reviews' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    kind: z.enum(['place', 'product']),
    rating: z.number().int().min(1).max(5).optional(),
    cover: z.object({ src: z.string(), alt: z.string() }).optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, writing, pages, reviews };
