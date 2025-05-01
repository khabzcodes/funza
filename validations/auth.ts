import { z } from 'zod';

export const emailOtpAuthSchema = z.object({
  email: z.string().email({
    message: 'Invalid email address.',
  }),
});

export const registerSchema = z.object({
  role: z.enum(['learner', 'educator', 'parent']),
  name: z
    .string({
      message: 'Full name is required.',
    })
    .max(100, {
      message: 'Full name must be less than 100 characters.',
    })
    .min(2, {
      message: 'Full name must be at least 2 characters.',
    }),
  email: z
    .string({
      message: 'Email is required.',
    })
    .email({
      message: 'Invalid email address.',
    }),
  password: z
    .string({
      message: 'Password is required.',
    })
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
      'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number'
    ),
});

export type EmailOtpAuthInput = z.infer<typeof emailOtpAuthSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
