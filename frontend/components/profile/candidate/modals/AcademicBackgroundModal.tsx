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
  academicBackgroundSchema,
  academicBackgroundSchemaType,
} from "@/types/form/academicBackgroundSchema";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useFieldArray, useForm } from "react-hook-form";
import useAuth from "@/hooks/useAuth";
import { mutate } from "swr";
import { useToast } from "@/components/ui/use-toast";

const updateAcademicBackground = async (
  toast: any,
  id: string,
  values: academicBackgroundSchemaType
) => {
  const res = await fetch(
    `http://localhost:3000/api/profile/update/academic/${id}`,
    {
      method: "POST",
      body: JSON.stringify(values),
    }
  );

  if (!res.ok) {
    // throw Error("Could not update academic background");
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: "Could not update academic background.",
    });
    return;
  }

  return await res.text();
};

const AcademicContent = ({ details }) => {
  const {
    session: { userId },
  } = useAuth();
  const { toast } = useToast();
  const form = useForm<academicBackgroundSchemaType>({
    mode: "onTouched",
    resolver: valibotResolver(academicBackgroundSchema),
    defaultValues: {
      academics: Object.values(details).map((academic) => {
        return {
          academicId: academic.id,
          institution: academic.institution,
          specialization: academic.specialization,
          level: academic.level ? academic.level : undefined,
          endDate: academic.endDate,
          startDate: academic.startDate,
        };
      }),
    },
  });

  const {
    fields: academics,
    append: appendAcademic,
    remove: removeAcademic,
  } = useFieldArray({
    name: "academics",
    control: form.control,
  });

  async function onSubmit(values: academicBackgroundSchemaType) {
    if (userId) {
      values.academics = values.academics.map((academic) => ({
        ...academic,
        id: academic.academicId,
      }));
      await updateAcademicBackground(toast, userId, values.academics);
      await mutate("/api/users/me/profile/candidate");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-20">
        {academics.map((academic, index) => {
          return (
            <div key={academic.id} className="flex flex-col gap-5">
              {academic.academicId && (
                <input
                  type="hidden"
                  {...form.register(`academics.${index}.academicId`)}
                />
              )}
              <FormField
                control={form.control}
                name={`academics.${index}.institution`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Institution{" "}
                      <Button
                        type="button"
                        className="ml-3 rounded-lg bg-red-500"
                        onClick={() => removeAcademic(index)}
                      >
                        Delete
                      </Button>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="University XYZ" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`academics.${index}.specialization`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specialization</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Informatics" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`academics.${index}.level`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Level (Optional)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Bachelor/Master" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name={`academics.${index}.startDate`}
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
                  name={`academics.${index}.endDate`}
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
            appendAcademic({
              institution: "",
              specialization: "",
              endDate: "",
              startDate: "",
            })
          }
        >
          Add academic background
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

const AcademicBackgroundModal = ({ details, setDetails }) => {
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
              <CardTitle>Edit academic background</CardTitle>
            </DialogHeader>
            <AcademicContent details={details} />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AcademicBackgroundModal;
