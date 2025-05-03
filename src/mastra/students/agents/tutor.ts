import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core";
import { OpenAIRealtimeVoice } from "@mastra/voice-openai-realtime";
import { Memory } from "@mastra/memory";

export const tutorAgent = new Agent({
  name: "Tutor Agent",
  model: openai("gpt-4o-mini"),
  instructions: `
    You are a tutor agent.
  `,
  voice: new OpenAIRealtimeVoice(),
  memory: new Memory({
    options: {
      lastMessages: 10,
      semanticRecall: false,
      threads: {
        generateTitle: false,
      },
    },
  }),
})