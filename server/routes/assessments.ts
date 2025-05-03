import { db } from '@/db';
import { createLogger } from '@/lib/logger';
import { eq } from 'drizzle-orm';
import { Hono } from 'hono';

const logger = createLogger('AssessmentRoutes');

export const assessmentRoutes = new Hono().post('/generate/:id', async c => {
  try {
    const id = c.req.param('id');

    const lessonExists = await db.query.lesson.findFirst({
      where: l => eq(l.id, id),
    });

    if (!lessonExists) {
      return c.json({ error: 'Lesson not found' }, 404);
    }

    const { introduction, sections, conclusion } = lessonExists;
    logger.info('Lesson data retrieved', { introduction, sections, conclusion });

    const generateAssessmentResponse = await fetch(
      `${process.env.MASTRA_API_URI!}/workflows/assessmentGeneratorWorkflow/createRun`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!generateAssessmentResponse.ok) {
      const error = await generateAssessmentResponse.json();
      logger.error('Error creating workflow run', error);
      return c.json({ message: 'Failed to create workflow run' }, 500);
    }

    const { runId } = (await generateAssessmentResponse.json()) as { runId: string };

    const body = {
      introduction,
      sections,
      conclusion,
    };

    const runWorkflowResponse = await fetch(
      `${process.env.MASTRA_API_URI!}/workflows/assessmentGeneratorWorkflow/startAsync?${runId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    if (!runWorkflowResponse.ok) {
      const error = await runWorkflowResponse.json();
      logger.error('Error starting workflow run', error);
      return c.json({ message: 'Failed to start workflow run' }, 500);
    }

    const { response, results } = await runWorkflowResponse.json();

    logger.info('Response', { response });
    logger.info('Results', { results });

    return c.json({ runId }, 200);
  } catch (error) {
    logger.error('Error generating assessment', error);
    return c.json({ error: 'Error generating assessment' }, 500);
  }
});
