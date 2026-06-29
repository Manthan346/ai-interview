import { z } from "zod";

export const signupSchema = z.object({

  email: z.email("invalid Email"),

});

export type SignupType = z.infer<typeof signupSchema>;