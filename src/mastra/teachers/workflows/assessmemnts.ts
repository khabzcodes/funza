import { Step, Workflow } from "@mastra/core";
import { z } from "zod";
import { assessmentAssessmentSchema, assessmentInputSchema } from "../schemas/assessments";
import { assessmentGeneratorAgent } from "../agents/assessments";

export const assessmentQuestionGeneratorStep = new Step({
  id: "assessment_question_generator",
  description: "Generates questions for the assessment",
  inputSchema: assessmentInputSchema,
  outputSchema: assessmentAssessmentSchema,
  execute: async ({ context }) => {
    const triggerData = context?.getStepResult<z.infer<typeof assessmentInputSchema>>('trigger');

    if (!triggerData) {
      throw new Error('Trigger data is not available');
    }

    const { introduction, sections, conclusion } = triggerData;

    const response = await assessmentGeneratorAgent.generate(
      [
        {
          role: 'user',
          content: `
            Generate multiple choice questions for the following assessment:
            Introduction: ${introduction.description}
            Sections: ${sections.sections.map(section => section.content).join('\n')}
            Conclusion: ${conclusion.content}
          `,
        }
      ],
      {
        output: assessmentAssessmentSchema,
      }
    );

    return response.object;
  }
});

export const assessmentConclusionGeneratorStep = new Step({
  id: "assessment_conclusion_generator",
  description: "Generates a conclusion for the assessment",
  inputSchema: assessmentAssessmentSchema,
  outputSchema: assessmentAssessmentSchema,
  execute: async ({ context }) => {
    const assessmentQuestionData = context?.getStepResult<z.infer<typeof assessmentAssessmentSchema>>('assessment_question_generator');

    if (!assessmentQuestionData) {
      throw new Error('Assessment question data is not available');
    }

    return assessmentQuestionData;
  }
})

export const assessmentGeneratorWorkflow = new Workflow({
  name: "Assessment Generator Workflow",
  triggerSchema: assessmentInputSchema
})
  .step(assessmentQuestionGeneratorStep)
  .then(assessmentConclusionGeneratorStep)
  .commit();