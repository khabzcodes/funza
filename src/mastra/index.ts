import { createLogger, Mastra } from "@mastra/core"
import { LibSQLStore } from "@mastra/libsql"
import { lessonGeneratorWorkflow } from "./teachers/workflows"
import { assessmentGeneratorWorkflow } from "./teachers/workflows/assessmemnts"
import { tutorAgent } from "./students/agents/tutor"

export const mastra = new Mastra({
  agents: { tutorAgent },
  workflows: { lessonGeneratorWorkflow, assessmentGeneratorWorkflow },
  storage: new LibSQLStore({
    url: "file:./mastra.db",
  }),
  logger: createLogger({
    name: 'Mastra',
    level: 'info',
  })
})