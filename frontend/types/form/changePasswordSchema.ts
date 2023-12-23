import { string, z } from "zod";

export const changePasswordSchema = z.object({
    oldPassword: string().trim(),
    newPassword: string().trim()
    .regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/, {
      message: "Your password does not meet all the mentioned criteria.",
    }),
    confirmPassword: string().trim(),
  }).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Your passwords do not match.",
    path: ["confirmPassword"],
  });
  
  export type changePasswordSchemaType = z.infer<typeof changePasswordSchema>;

