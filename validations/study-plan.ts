import { z } from 'zod';

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ACCEPTED_FILE_TYPES = {
  'application/pdf': ['.pdf'],
};

export const createStudyPlanSchema = z.object({
  subject: z.string({
    message: 'Subject name is required',
  }),
  topic: z.string({
    message: 'Study plan title is required.',
  }),
  objectives: z.string({
    message: 'Study plan objectives is required.',
  }),
  files: z.custom<File[]>().refine(files => files.length > 0, {
    message: 'At least one file is required.',
  }),
});

export type CreateStudyPlanInput = z.infer<typeof createStudyPlanSchema>;
