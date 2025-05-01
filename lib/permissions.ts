import { createAccessControl } from 'better-auth/plugins/access';
import { defaultStatements, adminAc } from 'better-auth/plugins/admin/access';

const statements = {
  ...defaultStatements,
  lesson_plans: ['create', 'share', 'update', 'delete'],
} as const;

export const ac = createAccessControl(statements);

export const user = ac.newRole({
  ...adminAc.statements,
});

export const admin = ac.newRole({
  lesson_plans: ['create', 'share', 'update', 'delete'],
});

export const learner = ac.newRole({
  lesson_plans: ['create', 'share', 'update', 'delete'],
});

export const educator = ac.newRole({
  lesson_plans: ['create', 'share', 'update', 'delete'],
});

export const parent = ac.newRole({
  lesson_plans: ['create', 'share', 'update', 'delete'],
});
