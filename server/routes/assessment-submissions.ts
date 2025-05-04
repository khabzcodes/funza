import { db } from '@/db';
import { assessmentQuestionAnswers } from '@/db/schemas/assessment-question-answers';
import { getServerSession } from '@/lib/auth';
import { createLogger } from '@/lib/logger';
import { eq } from 'drizzle-orm';
import { Hono } from 'hono';
import { nanoid } from 'nanoid';

const logger = createLogger('AssessmentSubmissionRoutes');

export const assessmentSubmissionRoutes = new Hono()
  .get('/', async c => {
    try {
      const session = await getServerSession();
      if (!session) {
        return c.json({ message: 'Unauthorized' }, 401);
      }

      const submissions = await db.query.assessmentQuestionAnswers.findMany({
        where: s => eq(s.studentId, session.user.id),
        with: {
          lesson: true,
        },
      });

      return c.json({ data: submissions }, 200);
    } catch (error) {
      logger.error('Error getting session', error);
      return c.json({ message: 'Internal Server Error' }, 500);
    }
  })
  .post('/startAssessment/:lessonId', async c => {
    try {
      const lessonId = c.req.param('lessonId');

      const session = await getServerSession();
      if (!session) {
        return c.json({ message: 'Unauthorized' }, 401);
      }

      const submission = await db
        .insert(assessmentQuestionAnswers)
        .values({
          id: nanoid(),
          lessonId,
          studentId: session.user.id,
          startTime: new Date(),
        })
        .returning();

      if (!submission) {
        return c.json({ message: 'Failed to start assessment' }, 500);
      }

      return c.json({ data: submission[0] }, 201);
    } catch (error) {
      logger.error('Error starting assessment', error);
      return c.json({ message: 'Internal Server Error' }, 500);
    }
  });
