import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(6, "Password must contain at least 6 characters"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Name must contain at least 2 characters"),
  email: z.email("Enter a valid email"),
  password: z.string().min(6, "Password must contain at least 6 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
