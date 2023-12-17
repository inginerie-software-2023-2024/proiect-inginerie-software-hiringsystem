import { string, z } from "zod";

const getMinDate = (): Date => {
  const currentDate = new Date();
  return new Date(
    currentDate.getFullYear() - 14,
    currentDate.getMonth(),
    currentDate.getDate()
  );
};

export const registerFormSchema = z
  .object({
    email: string().email({
      message: "Invalid email format.",
    }),
    firstName: string(),
    lastName: string(),
    birthDate: z
      .string()
      .refine((value) => new Date(value) < getMinDate(), {
        message: "You need to be at least 14 years old.",
      }),
    password: string()
      .trim()
      .regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/, {
        message: "Your password does not meet all the mentioned criteria.",
      }),
    confirmPassword: string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Your passwords do not match.",
    path: ["confirmPassword"],
  });

export type registerFormSchemaType = z.infer<typeof registerFormSchema>;
