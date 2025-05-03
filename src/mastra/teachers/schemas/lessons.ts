import { z } from "zod";

export const lessonInputSchema = z.object({
  topic: z.string().describe('The topic of the lesson'),
  grade: z.string().describe('The grade of the lesson'),
  objective: z.string().describe('The objective of the lesson'),
})

export const lessonIntroductionSchema = z.object({
  title: z.string().describe('The title of the lesson'),
  description: z.string().describe('The description of the lesson, in markdown format'),
})

export const lessionSectionsSchema = z.object({
  sections: z.array(z.object({
    title: z.string().describe('The title of the section'),
    content: z.string().describe('The content of the section, in markdown format'),
  }).describe("The section of the lesson")).describe('The sections of the lesson'),
})

export const lessonConclusionSchema = z.object({
  content: z.string().describe('The conclusion of the lesson, in markdown format'),
})