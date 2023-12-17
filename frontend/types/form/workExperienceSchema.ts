import {
  object,
  string,
  toTrimmed,
  array,
  Output,
  minLength,
  uuid,
  date,
  optional,
  coerce,
} from "valibot";

export const workExperienceSchema = object({
  experiences: array(
    object({
      experienceId: optional(string([uuid()])),
      company: string([toTrimmed(), minLength(2, "2 characters required")]),
      position: string([toTrimmed(), minLength(2, "2 characters required")]),
      startDate: coerce(date(), (i) => new Date(i)),
      endDate: coerce(date(), (i) => new Date(i)),
    })
  ),
});

export type workEperienceSchemaType = Output<typeof workExperienceSchema>;
