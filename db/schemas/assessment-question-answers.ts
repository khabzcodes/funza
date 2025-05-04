import { jsonb, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { user } from './auth-schema';

export const assessmentQuestionAnswers = pgTable('assessment_question_answers', {
  id: text('id').primaryKey(),
  lessonId: text('lesson_id').notNull(),
  answers: jsonb('answers').default([]),
  studentId: text('student_id')
    .notNull()
    .references(() => user.id),
  percentage: text('percentage'),
  startTime: timestamp('start_time').defaultNow(),
  endTime: timestamp('end_time'),
});
