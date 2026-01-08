import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    heroImage: z.string(),
    gallery: z.array(z.string()).optional(),
    tags: z.array(z.string()),
    technologies: z.array(z.string()),
    liveUrl: z.string().optional(),
    githubUrl: z.string().optional(),
    featured: z.boolean().default(false),
    publishedAt: z.coerce.date(),
    status: z.enum(['completed', 'in-progress', 'concept']),
    role: z.string().optional(),
    client: z.string().optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    tags: z.array(z.string()),
    coverImage: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, blog };
