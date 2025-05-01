import { Hono } from 'hono';
import { testRoutes } from '@/server/routes/test';

const app = new Hono().basePath('/rpc');

export const routes = app.route('/test', testRoutes);

export default app;
export type AppTypes = typeof routes;
