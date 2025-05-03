import { z } from "zod";
import { lessonConclusionSchema, lessonIntroductionSchema } from "./lessons";

export const assessmentInputSchema = z.object({
  introduction: lessonIntroductionSchema,
  sections: z.array(z.object({
    title: z.string().describe('The title of the section'),
    content: z.string().describe('The content of the section, in markdown format'),
  }).describe("The section of the lesson")).describe('The sections of the lesson'),
  conclusion: lessonConclusionSchema
})

export const assessmentAssessmentSchema = z.object({
  questions: z.array(
    z.object({
      question: z.string().describe('The question of the assessment'),
      options: z.array(z.object({
        id: z.string().describe('The id of the option'),
        option: z.string().describe('The option of the assessment'),
        isCorrect: z.boolean().describe('Whether the option is correct or not'),
      })).describe('The options of the assessment'),
      answer: z.string().describe('The answer of the assessment which is the id of the correct option'),
    }).describe('The question of the assessment')
  ).describe('The questions of the assessment')
})