import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { createLessonSchema } from '@/validations/lesson';
import { createLogger } from '@/lib/logger';
import { db } from '@/db';
import { lesson } from '@/db/schemas/lessons';
import { nanoid } from 'nanoid';
import { eq } from 'drizzle-orm';

const logger = createLogger('LessonRoutes');

export const lessonRoutes = new Hono()
  .post('/', zValidator('json', createLessonSchema), async c => {
    try {
      const { subject, topic, grade, objective } = c.req.valid('json');

      // Insert the lesson into the database
      const response = await db
        .insert(lesson)
        .values({
          id: nanoid(),
          subject,
          topic,
          grade,
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
