import SubmitButton from "@/components/form/SubmitButton";
import { Button } from "@/components/ui/button";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import React, { useRef } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  personalDetailsSchema,
  personalDetailsSchemaType,
} from "@/types/form/personalDetailsSchema";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useFieldArray, useForm } from "react-hook-form";
import useAuth from "@/hooks/useAuth";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import PrimaryEmailComboBox from "../PrimaryEmailComboBox";
import { mutate } from "swr";

const updatePersonalDetails = async (id: string, values: personalDetailsSchemaType) => {
  const res = await fetch(`http://localhost:3000/api/profile/update/details/${id}`, {
    method: "POST",
    body: JSON.stringify(values),
  });

  if (!res.ok) {
    throw Error("Could not update personal details");
  }

  return await res.text();
};

const EmailsContent = ({ form }) => {
  const {
    fields: emails,
    append: appendEmail,
    remove: removeEmail,
  } = useFieldArray({
    name: "emails",
    control: form.control,
  });

  const newEmailInput = useRef<HTMLInputElement>(null);

  const alreadyExists = (value: string) => {
    for (const email of emails) if (email.item === value) return true;
    return false;
  };

  const newEmail = () => {
    const value = newEmailInput.current?.value;
    if (value) {
      if (
        value.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/) &&
        !alreadyExists(value)
      ) {
        appendEmail({ item: value });
        newEmailInput.current!.value = "";
      }
    }
  };

  return (
    <div className="mt-10 flex flex-col">
      <h1 className="text-lg font-bold">Your emails</h1>
      <div className="mb-3 inline-block">
        <FormField
          control={form.control}
          name="primaryEmail"
          render={({ field }) => (
            <FormItem className="inline-block">
              <FormDescription>This is your primary email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <PrimaryEmailComboBox form={form} />

      <div className="mt-10 grid grid-cols-3 justify-end gap-10">
        {emails.map((email, index) => {
          return (
            <FormField
              key={email.id}
              control={form.control}
              name={`emails.${index}.item`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email ({index + 1}){" "}
                    {email.item !== form.getValues("primaryEmail") && 
                    <Button
                      className="ml-3 rounded-lg bg-red-500"
                      onClick={() => removeEmail(index)}
                    >
                      Delete
                    </Button>}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} readOnly={true} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}
        <div className="inline-block">
          <FormItem className="mt-3 inline-block">
            <FormLabel>New email</FormLabel>
            <div className="flex gap-2">
              <Input placeholder="name@gmail.com" ref={newEmailInput} />
              <Button className="rounded" onClick={newEmail}>
                Add
              </Button>
            </div>

            <FormDescription>Add a new email</FormDescription>
          </FormItem>
        </div>
      </div>
    </div>
  );
};

const PhoneNumbersContent = ({ form }) => {
  const {
    fields: phoneNumbers,
    append: appendPhoneNumber,
    remove: removePhoneNumber,
  } = useFieldArray({
    name: "phoneNumbers",
    control: form.control,
  });

  const newPhoneNumberInput = useRef<HTMLInputElement>(null);

  const alreadyExists = (value: string) => {
    for (const phoneNumber of phoneNumbers)
      if (phoneNumber.item === value) return true;
    return false;
  };

  const newPhoneNumber = () => {
    const value = newPhoneNumberInput.current?.value;
    if (value) {
      if (
        value.match(
          /^(\+\d{1,2}\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/
        ) &&
        !alreadyExists(value)
      ) {
        appendPhoneNumber({ item: value });
        newPhoneNumberInput.current!.value = "";
      }
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-lg font-bold">Your phone numbers</h1>
      <div className="grid grid-cols-3 gap-10">
        {phoneNumbers.map((phoneNumber, index) => {
          return (
            <FormField
              key={phoneNumber.id}
              control={form.control}
              name={`phoneNumbers.${index}.item`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Phone number ({index + 1}){" "}
                    <Button
                      className="ml-3 rounded-lg bg-red-500"
                      onClick={() => removePhoneNumber(index)}
                    >
                      Delete
                    </Button>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} readOnly={true} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}
      </div>
      <div className="inline-block">
        <FormItem className="mt-3 inline-block">
          <FormLabel>New phone number</FormLabel>
          <div className="flex gap-2">
            <Input placeholder="0712345678" ref={newPhoneNumberInput} />
            <Button className="rounded" onClick={newPhoneNumber}>
              Add
            </Button>
          </div>

          <FormDescription>Add a new phone number</FormDescription>
        </FormItem>
      </div>
    </div>
  );
};

const SkillsContent = ({ form }) => {
  const {
    fields: skills,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({
    name: "skills",
    control: form.control,
  });

  const newSkillInput = useRef<HTMLInputElement>(null);

  const alreadyExists = (value: string) => {
    for (const skill of skills) if (skill.item === value) return true;
    return false;
  };

  const newSkill = () => {
    const value = newSkillInput.current?.value;
    if (value) {
      if (!alreadyExists(value)) {
        appendSkill({ item: value });
        newSkillInput.current!.value = "";
      }
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-lg font-bold">Skills</h1>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => {
          return (
            <FormField
              key={skill.id}
              control={form.control}
              name={`skills.${index}.item`}
              render={({ field }) => (
                <Badge variant="secondary">
                  {field.value}{" "}
                  <X onClick={() => removeSkill(index)} className="cursor-pointer" />
                </Badge>
              )}
            />
          );
        })}
      </div>
      <div className="inline-block">
        <FormItem className="mt-3 inline-block">
          <FormLabel>New skill</FormLabel>
          <div className="flex gap-2">
            <Input placeholder="c++/sql/git/debugging" ref={newSkillInput} />
            <Button className="rounded" onClick={newSkill}>
              Add
            </Button>
          </div>

          <FormDescription>Add a new skill</FormDescription>
        </FormItem>
      </div>
    </div>
  );
};

const PersonalDetailsContent = ({ details }) => {
  const { session: { userId } } = useAuth();
  const form = useForm<personalDetailsSchemaType>({
    mode: "onTouched",
    resolver: valibotResolver(personalDetailsSchema),
    defaultValues: {
      firstName: details.details.firstName,
      lastName: details.details.lastName,
      githubProfileLink: details.details.githubProfileLink,
      linkedInProfileLink: details.details.linkedInProfileLink,
      primaryEmail: details.details.primaryEmail,
      emails: details.details.mailList.map((email: string) => {
        return { item: email };
      }),
      phoneNumbers: details.details.phoneNumberList?.map(
        (phoneNumber: string) => {
          return { item: phoneNumber };
        }
      ),
      skills: Object.values(details.skills).map((skill: string) => {
        return { item: skill };
      }),
    },
  });

  async function onSubmit(values: personalDetailsSchemaType) {
    if (userId) {
      values.emails = values.emails.map(email => email.item);
      values.phoneNumbers = values.phoneNumbers.map(phone => phone.item);
      values.skills = values.skills.map(skill => skill.item);
      const response = await updatePersonalDetails(userId, values);
      await mutate("/api/users/me/profile/candidate");
    }
  }

  const StandardInput: React.FC<{
    form: any;
    propertyName: string;
    label?: string;
    placeholder?: string;
    description?: string;
  }> = ({ form, propertyName, label, placeholder, description }) => {
    return (
      <FormField
        control={form.control}
        name={propertyName}
        render={({ field }) => (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <Input placeholder={placeholder} {...field} />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
        <div className="grid grid-cols-2 gap-5">
          <StandardInput
            form={form}
            propertyName="firstName"
            label="First Name"
            placeholder="First Name"
          />
          <StandardInput
            form={form}
            propertyName="lastName"
            label="Last Name"
            placeholder="Last Name"
          />
          <StandardInput
            form={form}
            propertyName="githubProfileLink"
            label="GitHub Profile Link"
            placeholder="https://github.com/MyProfile"
          />
          <StandardInput
            form={form}
            propertyName="linkedInProfileLink"
            label="LinkedIn Profile Link"
            placeholder="https://linkedin.com/in/MyProfile"
          />
        </div>

        <EmailsContent form={form} />
        <PhoneNumbersContent form={form} />
        <SkillsContent form={form} />

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

const PersonalDetailsModal = ({ details, setDetails }) => {
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
              <CardTitle>Edit Personal Data</CardTitle>
              <CardDescription>
                Update your personal information.
              </CardDescription>
            </DialogHeader>
            <PersonalDetailsContent details={details} />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PersonalDetailsModal;