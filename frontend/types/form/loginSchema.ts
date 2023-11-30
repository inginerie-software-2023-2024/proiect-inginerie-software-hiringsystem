import {
  type Output,
  email,
  object,
  string,
  toTrimmed,
  regex,
} from "valibot";

export const loginFormSchema = object({
  email: string([toTrimmed(), email()]),
  password: string([
    toTrimmed(),
    // regex(
    //   /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/,
    //   "Your password does not meet all the mentioned criteria."
    // ),
  ]),
});

export type loginFormSchemaType = Output<typeof loginFormSchema>;
