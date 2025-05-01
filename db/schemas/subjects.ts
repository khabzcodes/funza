import { pgTable, text } from 'drizzle-orm/pg-core';

export const subject = pgTable('subjects', {
  id: text('id').primaryKey(),
  name: text('name'),
  grade: text('grade'),
});
