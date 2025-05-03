import { z } from 'zod';

export const createLessonSchema = z.object({
  subject: z.string().min(1, {
    message: 'Subject is required.',
  }),
  topic: z.string().min(1, {
    message: 'Topic is required.',
  }),
  grade: z.enum(['Grade 10', 'Grade 11', 'Grade 12']),
  objective: z.string({
    message: 'Objective is required.',
  }),
  files: z.array(z.any()).optional(),
});

export type CreateLessonFormInput = z.infer<typeof createLessonSchema>;
