import { z } from "zod";

export const prepSchema = z.object({
  candidateName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  experience: z.string().min(1, { message: "Experience is required." }),
  role: z.string().min(1, { message: "Role is required." }),
});

export type PrepType = z.infer<typeof prepSchema>;
