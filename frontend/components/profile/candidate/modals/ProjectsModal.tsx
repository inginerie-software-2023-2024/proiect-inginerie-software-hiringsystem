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
import { Textarea } from "@/components/ui/textarea";
import {
  projectsSchema,
  projectsSchemaType,
} from "@/types/form/projectsSchema";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useFieldArray, useForm } from "react-hook-form";
import useAuth from "@/hooks/useAuth";
import { mutate } from "swr";
import { useToast } from "@/components/ui/use-toast";

const updateProjects = async (
  toast: any,
  id: string,
  values: projectsSchemaType
) => {
  const res = await fetch(
    `http://localhost:3000/api/profile/update/projects/${id}`,
    {
      method: "POST",
      body: JSON.stringify(values),
    }
  );

  if (!res.ok) {
    // throw Error("Could not update projects");
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: "Could not update projects.",
    });
    return;
  }

  return await res.text();
};

const ProjectsContent = ({ details }) => {
  const {
    session: { userId },
  } = useAuth();
  const { toast } = useToast();
  const form = useForm<projectsSchemaType>({
    mode: "onTouched",
    resolver: valibotResolver(projectsSchema),
    defaultValues: {
      projects: Object.values(details).map((project) => {
        return {
          title: project.title,
          description: project.description,
          projectId: project.id,
        };
      }),
    },
  });

  const {
    fields: projects,
    append: appendProject,
    remove: removeProject,
  } = useFieldArray({
    name: "projects",
    control: form.control,
  });

  async function onSubmit(values: projectsSchemaType) {
    if (userId) {
      values.projects = values.projects.map((project) => ({
        ...project,
        id: project.projectId,
      }));
      await updateProjects(toast, userId, values.projects);
      await mutate("/api/users/me/profile/candidate");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-20">
        {projects.map((project, index) => {
          return (
            <div key={project.id} className="flex flex-col gap-5">
              {project.projectId && (
                <input
                  type="hidden"
                  {...form.register(`projects.${index}.projectId`)}
                />
              )}
              <FormField
                control={form.control}
                name={`projects.${index}.title`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Project Title{" "}
                      <Button
                        type="button"
                        className="ml-3 rounded-lg bg-red-500"
                        onClick={() => removeProject(index)}
                      >
                        Delete
                      </Button>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Title" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`projects.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Description </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="h-[200px]"
                        placeholder="Description"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          );
        })}

        <Button
          type="button"
          onClick={() => appendProject({ title: "", description: "" })}
        >
          Add project
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

const ProjectsModal = ({ details, setDetails }) => {
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
              <CardTitle>Edit projects</CardTitle>
            </DialogHeader>
            <ProjectsContent details={details} />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProjectsModal;
