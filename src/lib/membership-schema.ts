import { z } from "zod";

export const membershipApplicationSchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  email: z.email().max(254),
  studentId: z.string().trim().min(3).max(32),
  message: z.string().trim().max(1000).default(""),
  turnstileToken: z.string().min(1).max(2048),
  website: z.string().max(0).optional(),
});

export type MembershipApplication = z.infer<typeof membershipApplicationSchema>;
