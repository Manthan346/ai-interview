import { z } from "zod";

export const prepSchema = z.object({
  candidateName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  experienceId: z.string().min(1, { message: "Experience is required." }),
  roleId: z.string().min(1, { message: "Role is required." }),
  numberOfQuestionId: z
    .string().min(2, {message: "select from the given value 5,10,15,20,25,30"})
});

export type PrepType = z.infer<typeof prepSchema>;
