import {z} from "zod";

export const createStudyPlanSchema = z.object({
  title: z.string({
    message: 'Lesson plan title is required.',
  }),
  description: z.string({
    message: 'Lesson plan description is required.',
  }),
})
