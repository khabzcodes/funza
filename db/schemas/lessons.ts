import { jsonb, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const lesson = pgTable('lessons', {
  id: text('id').primaryKey(),
  subject: text('subject').notNull(),
  topic: text('topic').notNull(),
  grade: text('grade').notNull(),
  introduction: jsonb('introduction').default({}),
  sections: jsonb('sections').default([]),
  status: text('status').default('pending'),
  conclusion: jsonb('conclusion').default({}),
  createdAt: timestamp('created_at').defaultNow(),
});
