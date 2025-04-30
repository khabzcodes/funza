import { z } from "zod";

export const emailOtpAuthSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
});

export type EmailOtpAuthInput = z.infer<typeof emailOtpAuthSchema>;
