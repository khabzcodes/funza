import { Hono } from 'hono';
import { testRoutes } from '@/server/routes/test';
import { lessonRoutes } from './routes/lessons';
import { assessmentRoutes } from './routes/assessments';
import { assessmentSubmissionRoutes } from './routes/assessment-submissions';

const app = new Hono().basePath('/api/rpc');

export const routes = app
  .route('/test', testRoutes)
  .route('/lessons', lessonRoutes)
  .route('/assessments', assessmentRoutes)
  .route('/submissions', assessmentSubmissionRoutes);

export default app;
export type AppTypes = typeof routes;
