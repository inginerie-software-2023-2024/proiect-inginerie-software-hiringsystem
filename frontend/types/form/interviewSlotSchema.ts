import {
    object,
    string,
    toTrimmed,
    Output,
    number,
    coerce,
  } from "valibot";
  
  export const interviewSlotSchema = object({
    date: string([toTrimmed()]),
    startMinutes: coerce(number(), Number),
    minutesDuration: coerce(number(), Number),
  });
  
  export type interviewSlotSchemaType = Output<typeof interviewSlotSchema>;