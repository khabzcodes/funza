import { createLogger, Mastra } from "@mastra/core"
import { LibSQLStore } from "@mastra/libsql"
import { lessonGeneratorWorkflow } from "./teachers/workflows"
import { assessmentGeneratorWorkflow } from "./teachers/workflows/assessmemnts"

export const mastra = new Mastra({
  workflows: { lessonGeneratorWorkflow, assessmentGeneratorWorkflow },
  storage: new LibSQLStore({
    url: "file:./mastra.db",
  }),
  logger: createLogger({
    name: 'Mastra',
    level: 'info',
  })
})