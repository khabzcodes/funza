import { z } from 'zod';

export const createAssessmentSubmissionSchema = z.object({
  questions: z.array(
    z.object({
      question: z.string(),
      answer: z.string(),
    })
  ),
});

export type CreateAssessmentSubmissionFormInput = z.infer<typeof createAssessmentSubmissionSchema>;
