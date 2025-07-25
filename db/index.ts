import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { subject } from '@/db/schemas/subjects';
import { lesson } from '@/db/schemas/lessons';
import { user } from '@/db/schemas/auth-schema';
import { assessmentQuestionAnswers } from '@/db/schemas/assessment-question-answers';

const DATABASE_URL = process.env.DATABASE_URL || process.env.POSTGRES_URL;

const client = postgres(DATABASE_URL!);

export const db = drizzle(client, {
  schema: {
    user,
    subject,
    lesson,
    assessmentQuestionAnswers,
  },
});
