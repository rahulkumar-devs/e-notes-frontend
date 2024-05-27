import { z } from "zod";



export const signinFormSchema = z.object({
    email: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(5, {
      message: "Username must be at least 5 characters.",
    }),
  });
export const signUpFormSchema = z.object({
    name: z.string().min(2, {
        message: "Username must be at least 2 characters.",
      }),
    email: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(5, {
      message: "Username must be at least 5 characters.",
    }),
  });