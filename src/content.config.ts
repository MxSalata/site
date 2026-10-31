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
    links: z.array(z.object({ label: z.string(), href: z.string() })).optional(),
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

export const collections = { projects, writing, pages };
