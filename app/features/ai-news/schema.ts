import { pgTable, serial, text, timestamp, jsonb, integer, boolean } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

// Weekly AI News Edition
export const weeklyAiNews = pgTable('weekly_ai_news', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').unique().notNull(),
  summary: text('summary'),
  content: jsonb('content').notNull(), // Store the main content as JSON
  coverImageUrl: text('cover_image_url'),
  publishedAt: timestamp('published_at', { withTimezone: true }),
  isPublished: boolean('is_published').default(false),
  authorId: text('author_id').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// Schema for creating a new weekly edition
export const insertWeeklyAiNewsSchema = createInsertSchema(weeklyAiNews, {
  title: (schema) => schema.title.min(1, 'Title is required'),
  slug: (schema) => schema.slug.min(1, 'Slug is required'),
  content: (schema) => schema.content,
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Schema for updating a weekly edition
export const updateWeeklyAiNewsSchema = insertWeeklyAiNewsSchema.partial();

// Schema for selecting a weekly edition
export const selectWeeklyAiNewsSchema = createSelectSchema(weeklyAiNews);

// Types
export type WeeklyAiNews = typeof weeklyAiNews.$inferSelect;
export type NewWeeklyAiNews = z.infer<typeof insertWeeklyAiNewsSchema>;
export type UpdateWeeklyAiNews = z.infer<typeof updateWeeklyAiNewsSchema>;

// News Item (for the JSONB content)
export const newsItemSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, 'Title is required'),
  url: z.string().url('Invalid URL'),
  summary: z.string().optional(),
  category: z.enum(['research', 'product', 'business', 'safety', 'policy']),
  tags: z.array(z.string()).default([]),
  publishedAt: z.string().datetime(),
  source: z.string().optional(),
});

export type NewsItem = z.infer<typeof newsItemSchema>;