import { z } from "zod";

export const prepSchema = z.object({
  candidateName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  experience: z.string().min(1, { message: "Experience is required." }),
  role: z.string().min(1, { message: "Role is required." }),
  numberOfQuestions: z
    .number()
    .int({ message: "The number of questions must be a whole number." })
    .min(5, { message: "At least 5 questions are required." })
    .max(30, { message: "You can select up to 30 questions." }),
});

export type PrepType = z.infer<typeof prepSchema>;
  