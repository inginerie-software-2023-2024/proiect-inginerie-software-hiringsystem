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

export const academicBackgroundSchema = object({
  academics: array(
    object({
      academicId: optional(string([uuid()])),
      institution: string([toTrimmed(), minLength(2, "2 characters required")]),
      specialization: string([
        toTrimmed(),
        minLength(2, "2 characters required"),
      ]),
      level: optional(
        string([toTrimmed(), minLength(2, "2 characters required")])
      ),
      startDate: coerce(date(), (i) => new Date(i)),
      endDate: coerce(date(), (i) => new Date(i)),
    })
  ),
});

export type academicBackgroundSchemaType = Output<
  typeof academicBackgroundSchema
>;
