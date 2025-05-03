import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core";
import { Memory } from "@mastra/memory";

export const assessmentGeneratorAgent = new Agent({
  name: "Assessment Generator Agent",
  model: openai("gpt-4o-mini"),
  instructions: `
    You an assessment generator.

    You will be given an assessment with the introduction, sections and conclusion.
    Your task is to generate multiple choice questions for the assessment.
  `,
  memory: new Memory({
    options: {
      lastMessages: 10,
      semanticRecall: false,
      threads: {
        generateTitle: false,
      },
    },
  }),
});