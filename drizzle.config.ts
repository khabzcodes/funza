import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './db/schemas/**/*.ts',
  out: './db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL! || process.env.POSTGRES_URL!,
  },
});
