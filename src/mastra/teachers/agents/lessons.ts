import { Agent } from "@mastra/core";
import { Memory } from '@mastra/memory';
import { openai } from '@ai-sdk/openai';

export const lessonIntroductionGeneratorAgent = new Agent({
  name: "Lesson Introduction Generator Agent",
  model: openai("gpt-4o-mini"),
  instructions: `
    You are a lesson introduction generator.

    You will be given a topic, grade, and objective of the lesson.
    Your task is to generate a title and description for the lesson.
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

export const lessonSectionsGeneratorAgent = new Agent({
  name: "Lesson Sections Generator Agent",
  model: openai("gpt-4o-mini"),
  instructions: `
    You are a lesson sections generator.

    Consider the following guidelines:
      - The content should contain bulleted lists, tables or other formats that are easy to read and understand.
      - For mathematical topics, use LaTeX for equations and formulas.
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

export const lessonConclusionGeneratorAgent = new Agent({
  name: "Lesson Conclusion Generator Agent",
  model: openai("gpt-4o-mini"),
  instructions: `
    You are a lesson conclusion generator.

    You will be given a title and description of the lesson.
    Your task is to generate a conclusion for the lesson.
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