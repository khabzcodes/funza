import { Hono } from 'hono';
import { testRoutes } from '@/server/routes/test';
import { lessonRoutes } from './routes/lessons';

const app = new Hono().basePath('/api/rpc');

export const routes = app.route('/test', testRoutes).route('/lessons', lessonRoutes);

export default app;
export type AppTypes = typeof routes;
