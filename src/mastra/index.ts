import { createLogger, Mastra } from "@mastra/core"
import { LibSQLStore } from "@mastra/libsql"
import { lessonGeneratorWorkflow } from "./teachers/workflows"
import { lessonIntroductionGeneratorAgent, lessonSectionsGeneratorAgent } from "./teachers/agents"

export const mastra = new Mastra({
  agents: { lessonIntroductionGeneratorAgent, lessonSectionsGeneratorAgent },
  workflows: { lessonGeneratorWorkflow },
  storage: new LibSQLStore({
    url: ":memory:",
  }),
  logger: createLogger({
    name: 'Mastra',
    level: 'info',
  })
})