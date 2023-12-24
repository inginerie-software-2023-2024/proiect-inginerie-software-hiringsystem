"use client";

import SubmitButton from "@/components/form/SubmitButton";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  workEperienceSchemaType,
  workExperienceSchema,
} from "@/types/form/workExperienceSchema";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useFieldArray, useForm } from "react-hook-form";
import useAuth from "@/hooks/useAuth";
import { mutate } from "swr";

const updateWorkExperience = async (
  id: string,
  values: workEperienceSchemaType
) => {
  const res = await fetch(
    `http://localhost:3000/api/profile/update/work/${id}`,
    {
      method: "POST",
      body: JSON.stringify(values),
    }
  );

  if (!res.ok) {
    throw Error("Could not update work experience");
  }

  return await res.text();
};

const ExperiencesContent = ({ details }) => {
  const {
    session: { userId },
  } = useAuth();
  const form = useForm<workEperienceSchemaType>({
    mode: "onTouched",
    resolver: valibotResolver(workExperienceSchema),
    defaultValues: {
      experiences: Object.values(details).map((experience) => {
        return {
          experienceId: experience.id,
          company: experience.company,
          position: experience.position,
          endDate: experience.endDate,
          startDate: experience.startDate,
        };
      }),
    },
  });

  const {
    fields: experiences,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    name: "experiences",
    control: form.control,
  });

  async function onSubmit(values: workEperienceSchemaType) {
    if (userId) {
      values.experiences = values.experiences.map(experience => ({ ...experience, id: experience.experienceId }));
      await updateWorkExperience(userId, values.experiences);
      await mutate("/api/users/me/profile/candidate");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-20">
        {experiences.map((experience, index) => {
          return (
            <div key={experience.id} className="flex flex-col gap-5">
              {experience.experienceId && (
                <input
                  type="hidden"
                  {...form.register(`experiences.${index}.experienceId`)}
                />
              )}
              <FormField
                control={form.control}
                name={`experiences.${index}.company`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Company{" "}
                      <Button type="button"
                        className="ml-3 rounded-lg bg-red-500"
                        onClick={() => removeExperience(index)}
                      >
                        Delete
                      </Button>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Name of the company" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`experiences.${index}.position`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Frontend/Backend/QA Developer"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name={`experiences.${index}.startDate`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          placeholder="MM/DD/YYYY"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`experiences.${index}.endDate`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          placeholder="MM/DD/YYYY"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          );
        })}

        <Button
          type="button"
          onClick={() =>
            appendExperience({
              company: "",
              position: "",
              endDate: "",
              startDate: "",
            })
          }
        >
          Add work experience
        </Button>

        <div className="flex justify-end">
          <SubmitButton
            toSubmitComponent="Save changes"
            pendingComponent="Saving changes..."
            className="rounded bg-green-600 p-3 text-white"
          />
        </div>
      </form>
    </Form>
  );
};

const WorkExperienceModal = ({ details, setDetails }) => {
  return (
    <Dialog
      open={details !== null}
      onOpenChange={(open) => {
        if (!open) setDetails(null);
      }}
    >
      <DialogContent className="no-scrollbar max-h-[90vh] min-w-[50vw] overflow-y-scroll pt-0">
        {details && (
          <>
            <DialogHeader className="w-full pb-2 pt-10">
              <CardTitle>Edit work experience</CardTitle>
            </DialogHeader>
            <ExperiencesContent details={details} />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default WorkExperienceModal;
