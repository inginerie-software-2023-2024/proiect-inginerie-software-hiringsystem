import {
  object,
  array,
  string,
  toTrimmed,
  minLength,
  optional,
  uuid,
  Output,
  number,
  coerce,
  date,
  toUpperCase,
} from "valibot";

export const jobSchema = object({
  id: optional(string([uuid()])),
  title: string([toTrimmed(), minLength(2, "2 characters required")]),
  description: string([toTrimmed(), minLength(10, "10 characters required")]),
  jobType: string([
    toTrimmed(),
    toUpperCase(),
    minLength(2, "2 characters required"),
  ]),
  position: string([
    toTrimmed(),
    toUpperCase(),
    minLength(2, "2 characters required"),
  ]),
  salary: coerce(number(), Number),
  hoursPerWeek: coerce(number(), Number),
  startDate: coerce(date(), (i) => new Date(i)),
  skillsNeeded: array(
    object({
      item: string([toTrimmed(), minLength(2, "2 characters required")]),
    })
  ),
  offers: array(
    object({
      item: string([toTrimmed(), minLength(2, "2 characters required")]),
    })
  ),
});

export type jobSchemaType = Output<typeof jobSchema>;
