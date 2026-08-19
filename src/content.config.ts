import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** Shared shape for an outbound resource link rendered as a pill button. */
const linkList = z
  .array(
    z.object({
      label: z.string(),
      href: z.string(),
      /** Icon key from components/Icon.astro */
      icon: z.enum(['pdf', 'code', 'link', 'arxiv', 'github']).default('link'),
    })
  )
  .default([]);

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    /** One line shown on cards and at the top of the project page. */
    summary: z.string(),
    /** Terser one-liner for the home page list. Falls back to `summary`. */
    tagline: z.string().optional(),
    /** Sort key + displayed period, e.g. "2024 — present". */
    period: z.string(),
    date: z.coerce.date(),
    /** Cover image, relative to the project's folder or /public. */
    cover: z.string().optional(),
    coverAlt: z.string().default(''),
    tags: z.array(z.string()).default([]),
    links: linkList,
    /** Show on the home page "Selected projects" grid. */
    featured: z.boolean().default(false),
    /** Lower numbers sort first within featured. */
    order: z.number().default(99),
    draft: z.boolean().default(false),
  }),
});

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    /** Editorial bucket, shown as a tag. */
    category: z
      .enum(['Tutorial', 'Paper Summary', 'Case Study', 'Notes'])
      .default('Notes'),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    coverAlt: z.string().default(''),
    draft: z.boolean().default(false),
  }),
});

const news = defineCollection({
  loader: glob({ base: './src/content/news', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    /** One-line version used in the home-page feed. */
    summary: z.string(),
    cover: z.string().optional(),
    coverAlt: z.string().default(''),
    /** External destination — set when the item is just a pointer. */
    href: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, blog, news };
