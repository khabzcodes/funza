import { z } from "zod";
import { lessionSectionsSchema, lessonConclusionSchema, lessonIntroductionSchema } from "./lessons";

export const assessmentInputSchema = z.object({
  introduction: lessonIntroductionSchema,
  sections: lessionSectionsSchema,
  conclusion: lessonConclusionSchema
})

export const assessmentAssessmentSchema = z.array(
  z.object({
    question: z.string().describe('The question of the assessment'),
    options: z.array(z.object({
      id: z.string().describe('The id of the option'),
      option: z.string().describe('The option of the assessment'),
      isCorrect: z.boolean().describe('Whether the option is correct or not'),
    })).describe('The options of the assessment'),
    answer: z.string().describe('The answer of the assessment which is the id of the correct option'),
  }).describe('The question of the assessment')
)