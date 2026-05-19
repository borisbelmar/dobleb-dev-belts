import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { Temporal } from 'temporal-polyfill';

const dateSchema = z.string().refine(
  (val) => {
    try {
      Temporal.PlainDate.from(val);
      return true;
    } catch {
      return false;
    }
  },
  { message: 'Invalid date, must be YYYY-MM-DD' },
);

const guides = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    belt: z.enum(['white-belt', 'yellow-belt', 'green-belt', 'black-belt']),
    tags: z.array(z.string()).default([]),
    order: z.number().default(0),
    published: z.boolean().default(true),
    lastRevision: dateSchema,
  }),
});

const glossary = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/glossary' }),
  schema: z.object({
    term: z.string(),
    definition: z.string(),
    relatedGuides: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    lastRevision: dateSchema,
  }),
});

export const collections = { guides, glossary };
