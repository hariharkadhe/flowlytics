import { z } from 'zod';

export const createBlogSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    slug: z.string({ required_error: 'Slug is required' }),
    excerpt: z.string({ required_error: 'Excerpt is required' }),
    content: z.string({ required_error: 'Content is required' }),
    thumbnail: z.string().optional(),
    author: z.string({ required_error: 'Author is required' }),
    publishedAt: z.string().datetime().optional(),
    featured: z.boolean().default(false),
    status: z.enum(['draft', 'published']).default('draft'),
  }),
});

export const updateBlogSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    slug: z.string().optional(),
    excerpt: z.string().optional(),
    content: z.string().optional(),
    thumbnail: z.string().optional(),
    author: z.string().optional(),
    publishedAt: z.string().datetime().optional(),
    featured: z.boolean().optional(),
    status: z.enum(['draft', 'published']).optional(),
  }),
});
