import { createLogger, Mastra } from "@mastra/core"
import { LibSQLStore } from "@mastra/libsql"
import { lessonGeneratorWorkflow } from "./teachers/workflows"
import { assessmentGeneratorWorkflow } from "./teachers/workflows/assessmemnts"
import { tutorAgent } from "./students/agents/tutor"
import { assessmentGeneratorAgent } from "./teachers/agents/assessments"
import { lessonConclusionGeneratorAgent, lessonIntroductionGeneratorAgent, lessonSectionsGeneratorAgent } from "./teachers/agents"

export const mastra = new Mastra({
  agents: { tutorAgent, assessmentGeneratorAgent, lessonIntroductionGeneratorAgent, lessonSectionsGeneratorAgent, lessonConclusionGeneratorAgent },
  workflows: { lessonGeneratorWorkflow, assessmentGeneratorWorkflow },
  storage: new LibSQLStore({
    url: "file:./mastra.db",
  }),
  logger: createLogger({
    name: 'Mastra',
    level: 'info',
  })
})