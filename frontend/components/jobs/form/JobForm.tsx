"use client";

import SubmitButton from "@/components/form/SubmitButton";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { jobSchema, jobSchemaType } from "@/types/form/jobSchema";
import { valibotResolver } from "@hookform/resolvers/valibot";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import SelectOptions from "./SelectOption";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const StandardInput: React.FC<{
  form: any;
  propertyName: string;
  label?: string;
  placeholder?: string;
  description?: string;
  type?: string;
}> = ({
  form,
  propertyName,
  label,
  placeholder,
  description,
  type = "text",
}) => {
  return (
    <FormField
      control={form.control}
      name={propertyName}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input placeholder={placeholder} {...field} type={type} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const JobForm = ({ job = undefined }) => {
  const router = useRouter();
  const form = useForm<jobSchemaType>({
    mode: "onTouched",
    resolver: valibotResolver(jobSchema),
    defaultValues: {
      title: job?.title || "",
      description: job?.description || "",
      skillsNeeded:
        job?.skillsNeeded?.map((skill) => {
          return { item: skill };
        }) || [],
      offers:
        job?.offers?.map((offer) => {
          return { item: offer };
        }) || [],
      salary: job?.salary || 2000,
      position: job?.position || "",
      jobType: job?.jobType || "",
      hoursPerWeek: job?.hoursPerWeek || 40,
      startDate: job?.startDate || new Date().toISOString().split("T")[0],
    },
  });

  const {
    fields: skillsNeeded,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({
    name: "skillsNeeded",
    control: form.control,
  });

  const {
    fields: offers,
    append: appendOffer,
    remove: removeOffer,
  } = useFieldArray({
    name: "offers",
    control: form.control,
  });

  async function onSubmit(values: jobSchemaType) {
    values.skillsNeeded = values.skillsNeeded.map((skill) => skill.item);
    values.offers = values.offers.map((offer) => offer.item);
    if (!job?.id) {
      const res = await fetch("http://localhost:3000/api/jobs/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        router.push("/jobs");
        router.refresh();
      }
    } else {
      const res = await fetch(
        `http://localhost:3000/api/jobs/edit/${job.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (res.ok) {
        router.push(`/jobs/job/${job.id}`);
        router.refresh();
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        <StandardInput
          form={form}
          propertyName="title"
          label="Job Title"
          placeholder="Job Title"
          description="Enter the job title"
        />

        <FormField
          control={form.control}
          name={"description"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Description</FormLabel>
              <FormControl>
                <Textarea placeholder={"Job description"} {...field} />
              </FormControl>
              <FormDescription>Enter the job description</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <StandardInput
          form={form}
          propertyName="salary"
          label="Salary"
          placeholder="Salary"
          description="Enter a number representing the monthly NET salary"
          type="number"
        />

        <StandardInput
          form={form}
          propertyName="hoursPerWeek"
          label="Hours per week"
          placeholder="Hours per week"
          description="Enter a number representing the hours per week"
          type="number"
        />

        <StandardInput
          form={form}
          propertyName="startDate"
          label="Start date"
          placeholder="Start date"
          description="Enter the start date of the job"
          type="date"
        />

        <div className="flex items-center justify-between gap-5">
          <FormLabel>Job Type</FormLabel>
          <SelectOptions
            form={form}
            propertyName="jobType"
            fetchSource="http://localhost:8081/api/v1/job/types"
          />
        </div>

        <div className="flex items-center justify-between gap-5">
          <FormLabel>Position</FormLabel>
          <SelectOptions
            form={form}
            propertyName="position"
            fetchSource="http://localhost:8081/api/v1/job/positions"
          />
        </div>

        <div>
          <FormLabel>Skills Needed</FormLabel>
          <div className="my-5 flex flex-col gap-5">
            {skillsNeeded.map((skill, index) => {
              return (
                <div className="flex items-center gap-5" key={skill.id}>
                  <Input
                    placeholder="Skill"
                    {...form.register(`skillsNeeded.${index}.item`)}
                    defaultValue={skill.item}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeSkill(index)}
                  >
                    <TrashIcon className="h-6 w-6" />
                  </Button>
                  <FormMessage />
                </div>
              );
            })}
          </div>
          <Button type="button" onClick={() => appendSkill({ item: "" })}>
            Add skill
          </Button>
        </div>

        <div>
          <FormLabel>Offers</FormLabel>
          <div className="my-5 flex flex-col gap-5">
            {offers.map((offer, index) => {
              return (
                <div className="flex items-center gap-5" key={offer.id}>
                  <Input
                    placeholder="Offer"
                    {...form.register(`offers.${index}.item`)}
                    defaultValue={offer.item}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeOffer(index)}
                  >
                    <TrashIcon className="h-6 w-6" />
                  </Button>
                  <FormMessage />
                </div>
              );
            })}
          </div>
          <Button type="button" onClick={() => appendOffer({ item: "" })}>
            Add offer
          </Button>
        </div>

        <div className="flex justify-end">
          {!job && (
            <SubmitButton
              toSubmitComponent="Create job"
              pendingComponent="Creating job..."
              className="rounded bg-green-600 p-3 text-white hover:bg-green-400"
            />
          )}
          {job && (
            <SubmitButton
              toSubmitComponent="Edit job"
              pendingComponent="Editing job..."
              className="rounded bg-green-600 p-3 text-white hover:bg-green-400"
            />
          )}
        </div>
      </form>
    </Form>
  );
};

export default JobForm;
