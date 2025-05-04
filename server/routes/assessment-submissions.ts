import { db } from '@/db';
import { assessmentQuestionAnswers } from '@/db/schemas/assessment-question-answers';
import { getServerSession } from '@/lib/auth';
import { createLogger } from '@/lib/logger';
import { Question } from '@/types/questions';
import { zValidator } from '@hono/zod-validator';
import { eq } from 'drizzle-orm';
import { Hono } from 'hono';
import { nanoid } from 'nanoid';
import { z } from 'zod';

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
      });

      return c.json({ data: submissions }, 200);
    } catch (error) {
      logger.error('Error getting session', error);
      return c.json({ message: 'Internal Server Error' }, 500);
    }
  })
  .get('/:id', async c => {
    try {
      const session = await getServerSession();
      if (!session) {
        return c.json({ message: 'Unauthorized' }, 401);
      }

      const submissionId = c.req.param('id');

      const submission = await db.query.assessmentQuestionAnswers.findFirst({
        where: s => eq(s.id, submissionId),
      });

      if (!submission) {
        return c.json({ message: 'Submission not found' }, 404);
      }

      return c.json({ data: submission }, 200);
    } catch (error) {
      logger.error('Error getting submission', error);
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

      const lesson = await db.query.lesson.findFirst({
        where: l => eq(l.id, lessonId),
      });

      if (!lesson) {
        return c.json({ message: 'Lesson not found' }, 404);
      }

      const questions = lesson.questions as Question[];

      const submission = await db
        .insert(assessmentQuestionAnswers)
        .values({
          id: nanoid(),
          lessonId,
          studentId: session.user.id,
          answers: questions.map(q => ({
            question: q.question,
            answer: q.options[0].id,
            isCorrect: q.options[0].isCorrect,
          })),
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
  })
  .post(
    '/:id/submit',
    zValidator(
      'json',
      z.array(
        z.object({
          question: z.string(),
          answer: z.string(),
          isCorrect: z.boolean(),
        })
      )
    ),
    async c => {
      try {
        const submissionId = c.req.param('id');
        const body = c.req.valid('json');

        const submission = await db.query.assessmentQuestionAnswers.findFirst({
          where: eq(assessmentQuestionAnswers.id, submissionId),
        });

        if (!submission) {
          return c.json({ message: 'Submission not found' }, 404);
        }

        const totalQuestions = body.length;
        const totalCorrect = body.filter(q => q.isCorrect).length;
        const percentage = ((totalCorrect / totalQuestions) * 100).toFixed(2);

        const updatedSubmission = await db
          .update(assessmentQuestionAnswers)
          .set({
            answers: body,
            percentage,
            endTime: new Date(),
          })
          .where(eq(assessmentQuestionAnswers.id, submissionId))
          .returning();

        if (updatedSubmission.length === 0) {
          return c.json({ message: 'Failed to update submission' }, 500);
        }

        return c.json({ data: updatedSubmission[0] }, 200);
      } catch (error) {
        logger.error('Error submitting assessment', error);
        return c.json({ message: 'Internal Server Error' }, 500);
      }
    }
  );
