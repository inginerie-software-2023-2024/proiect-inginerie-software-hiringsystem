import { string, z } from "zod";

export const resetPasswordSchema = z.object({
    newPassword: string().trim()
    .regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/, {
      message: "Your password does not meet all the mentioned criteria.",
    }),
    confirmPassword: string().trim(),
  }).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Your passwords do not match.",
    path: ["confirmPassword"],
  });
  
  export type resetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;

