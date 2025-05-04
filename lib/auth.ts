import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { admin as adminPlugin } from 'better-auth/plugins/admin';
import { db } from '@/db';
import * as schema from '@/db/schemas/auth-schema';
import { ac, user, admin, learner, educator, parent } from '@/lib/permissions';
import { headers } from 'next/headers';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 24 * 60 * 60, // 24 hours
    },
    expiresIn: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
    freshAge: 60 * 60, // 1 hour
  },
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  plugins: [
    adminPlugin({
      ac,
      roles: {
        admin,
        user,
        learner,
        educator,
        parent,
      },
    }),
  ],
});

export const getServerSession = async () => {
  return await auth.api.getSession({
    headers: await headers(),
  });
};
