import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { createLessonSchema } from '@/validations/lesson';
import { createLogger } from '@/lib/logger';
import { db } from '@/db';
import { lesson } from '@/db/schemas/lessons';
import { eq } from 'drizzle-orm';
import { WorkflowLessonResponse } from '@/types/workflow';

const logger = createLogger('LessonRoutes');

export const lessonRoutes = new Hono()
  .post('/', zValidator('json', createLessonSchema), async c => {
    try {
      const { subject, topic, grade, objective } = c.req.valid('json');

      // Insert the lesson into the database
      const workflowResponse = await fetch(
        `${process.env.MASTRA_API_URI!}/workflows/lessonGeneratorWorkflow/createRun`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!workflowResponse.ok) {
        const error = await workflowResponse.json();
        logger.error('Error creating workflow run', error);
        return c.json({ message: 'Failed to create workflow run' }, 500);
      }

      const { runId } = (await workflowResponse.json()) as { runId: string };

      const body = {
        grade,
        objective,
        topic,
      };
      const runWorkflowResponse = await fetch(
        `${process.env.MASTRA_API_URI!}/workflows/lessonGeneratorWorkflow/startAsync?${runId}`,
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

      const workflowData = (await runWorkflowResponse.json()) as WorkflowLessonResponse;
      logger.info('Workflow run started successfully', workflowData);
      const response = await db
        .insert(lesson)
        .values({
          id: runId,
          subject,
          topic,
          grade,
          introduction: workflowData.results.conclusion_generator.output.introduction,
          sections: workflowData.results.sections_generator.output.sections,
          conclusion: workflowData.results.conclusion_generator.output.conclusion,
          status: 'completed',
        })
        .returning();

      if (response.length === 0) {
        return c.json({ message: 'Failed to create lesson' }, 500);
      }

      return c.json({ data: response[0] }, 201);
    } catch (error) {
      logger.error('Error creating lesson', error);
      return c.json({ message: `${error}` }, 500);
    }
  })
  .get('/', async c => {
    try {
      const lessons = await db.query.lesson.findMany();
      return c.json({ data: lessons }, 200);
    } catch (error) {
      logger.error('Error fetching lessons', error);
      return c.json({ message: `${error}` }, 500);
    }
  })
  .get('/:id', async c => {
    try {
      const id = c.req.param('id');
      const lesson = await db.query.lesson.findFirst({
        where: l => eq(l.id, id),
      });

      if (!lesson) {
        return c.json({ message: 'Lesson not found' }, 404);
      }

      return c.json({ data: lesson }, 200);
    } catch (error) {
      logger.error('Error fetching lesson', error);
      return c.json({ message: `${error}` }, 500);
    }
  });
