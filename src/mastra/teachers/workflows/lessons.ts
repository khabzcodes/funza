import { Step, Workflow } from '@mastra/core/workflows';
import { z } from 'zod';
import { lessonConclusionGeneratorAgent, lessonIntroductionGeneratorAgent, lessonSectionsGeneratorAgent } from '../agents';
import { lessionSectionsSchema, lessonConclusionSchema, lessonInputSchema, lessonIntroductionSchema } from '../schemas/lesson';

export const introductionGeneratorStep = new Step({
  id: "introduction_generator",
  description: "Generates an introduction for the lesson",
  inputSchema: lessonInputSchema,
  outputSchema: lessonIntroductionSchema,
  execute: async ({ context }) => {
    const triggerData = context?.getStepResult<z.infer<typeof lessonInputSchema>>('trigger');

    if (!triggerData) {
      throw new Error('Trigger data is not available');
    }

    const { topic, grade, objective } = triggerData;

    const response = await lessonIntroductionGeneratorAgent.generate(
      [
        {
          role: 'user',
          content: `Generate a title and description for a lesson on ${topic} for ${grade} grade with the objective of ${objective}.`,
        }
      ],
      {
        output: lessonIntroductionSchema,
      }
    );
    return response.object;
  }
})

export const sectionsGeneratorStep = new Step({
  id: "sections_generator",
  description: "Generates sections for the lesson",
  inputSchema: lessonInputSchema,
  outputSchema: lessionSectionsSchema,
  execute: async ({ context }) => {
    const introductionData = context?.getStepResult<z.infer<typeof lessonIntroductionSchema>>('introduction_generator');

    if (!introductionData) {
      throw new Error('Introduction data is not available');
    }

    const { title, description } = introductionData;

    const response = await lessonSectionsGeneratorAgent.generate(
      [
        {
          role: 'user',
          content: `Generate sections for a lesson with the title "${title}" and description "${description}".`,
        }
      ],
      {
        output: lessionSectionsSchema,
      }
    );
    return response.object;
  }
})

export const conclusionGeneratorStep = new Step({
  id: "conclusion_generator",
  description: "Generates a conclusion for the lesson",
  inputSchema: lessonInputSchema,
  outputSchema: z.object({
    introduction: lessonIntroductionSchema,
    sections: lessionSectionsSchema,
    conclusion: lessonConclusionSchema
  }),
  execute: async ({ context }) => {
    const introductionData = context?.getStepResult<z.infer<typeof lessonIntroductionSchema>>('introduction_generator');
    const sectionsData = context?.getStepResult<z.infer<typeof lessionSectionsSchema>>('sections_generator');

    if (!introductionData || !sectionsData) {
      throw new Error('One or more step results are not available');
    }

    if (!introductionData) {
      throw new Error('Introduction data is not available');
    }

    const { title, description } = introductionData;

    const response = await lessonConclusionGeneratorAgent.generate(
      [
        {
          role: 'user',
          content: `Generate a conclusion for a lesson with the title "${title}" and description "${description}".`,
        }
      ],
      {
        output: lessonConclusionSchema,
      }
    );
    return {
      introduction: introductionData,
      sections: sectionsData,
      conclusion: response.object
    };
  }
})



export const lessonGeneratorWorkflow = new Workflow({
  name: 'lesson-generator',
  triggerSchema: lessonInputSchema
})
  .step(introductionGeneratorStep)
  .then(sectionsGeneratorStep)
  .then(conclusionGeneratorStep)
  .commit();