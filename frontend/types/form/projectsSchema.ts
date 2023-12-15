import {
  object,
  string,
  toTrimmed,
  array,
  Output,
  minLength,
  uuid,
  optional,
} from "valibot";

export const projectsSchema = object({
  projects: array(
    object({
      title: string([toTrimmed(), minLength(2, "2 characters required")]),
      description: string([
        toTrimmed(),
        minLength(10, "10 characters required"),
      ]),
      projectId: optional(string([uuid()])),
    })
  ),
});

export type projectsSchemaType = Output<typeof projectsSchema>;
