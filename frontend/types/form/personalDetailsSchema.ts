import {
  type Output,
  email,
  object,
  string,
  toTrimmed,
  array,
  url,
} from "valibot";

export const personalDetailsSchema = object({
  firstName: string(),
  lastName: string(),
  githubProfileLink: string([toTrimmed(), url()]),
  linkedInProfileLink: string([toTrimmed(), url()]),
  primaryEmail: string([toTrimmed(), email()]),
  emails: array(object({ item: string([toTrimmed(), email()]) })),
  phoneNumbers: array(object({ item: string([toTrimmed()]) })),
  skills: array(object({ item: string([toTrimmed()]) })),
});

export type personalDetailsSchemaType = Output<typeof personalDetailsSchema>;
