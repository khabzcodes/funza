import { createAuthClient } from 'better-auth/react';
import { ac, admin, user, learner, educator, parent } from '@/lib/permissions';
import { adminClient } from 'better-auth/client/plugins';

export const client = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL!,
  plugins: [
    adminClient({
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

export const { useSession } = client;
export const { signIn, signOut, signUp, admin: adminOps } = client;
