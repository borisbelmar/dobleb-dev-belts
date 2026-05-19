import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    belt: z.enum(['white-belt', 'yellow-belt', 'green-belt', 'black-belt']),
    tags: z.array(z.string()).default([]),
    order: z.number().default(0),
    published: z.boolean().default(true),
  }),
});

const glossary = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/glossary' }),
  schema: z.object({
    term: z.string(),
    definition: z.string(),
    relatedGuides: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { guides, glossary };
