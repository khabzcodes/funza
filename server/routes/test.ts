import { Hono } from 'hono';

export const testRoutes = new Hono().get('/', c => {
  return c.json({ message: 'Hello from test route!' }, 200);
});
