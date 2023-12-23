"use client";

import React, { useState } from "react";
import SubmitButton from "@/components/form/SubmitButton";
import { Input } from "@/components/ui/input";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { changePasswordSchemaType, changePasswordSchema } from "@/types/form/changePasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangePasswordAlert } from "../ChangePasswordAlert";

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
            <Input type="password" placeholder={placeholder} {...field} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const ChangePasswordContent = ({ changePasswordModal, setChangePasswordModal }) => {
  const form = useForm<changePasswordSchemaType>({
    mode: "onTouched",
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const [oldPasswordIncorrect, setOldPasswordIncorrect] = useState(false);


  async function onSubmit(values: changePasswordSchemaType) {
    const res = await fetch(
        `http://localhost:3000/api/users/change/password`,
        {
          method: "POST",
          body: JSON.stringify(values),
        }
      );
    
      if (!res.ok) {
        if(res.status === 403){  
            setOldPasswordIncorrect(true);         
             return;
        }
        throw Error("Could not change passsword");
      }

      setChangePasswordModal(false);
  }

  return (
    <Form {...form}>
      {oldPasswordIncorrect && <ChangePasswordAlert /> }
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
        <div className="grid grid-cols-1 gap-5">
          <StandardInput
            form={form}
            propertyName="oldPassword"
            label="Old Password"
            placeholder="Old Password"
          />
          <StandardInput
            form={form}
            propertyName="newPassword"
            label="New Password"
            placeholder="New Password"
            description="The new password must contain one digit from 1 to 9, one lowercase
            letter, one uppercase letter, one special character, no space,
            and it must be 8-16 characters long."
          />
          <StandardInput
            form={form}
            propertyName="confirmPassword"
            label="Confirm New Password"
            placeholder="Confirm New Password"
          />
        </div>

        <div className="flex justify-end">
          <SubmitButton
            toSubmitComponent="Change password"
            pendingComponent="Changing password..."
            className="rounded bg-green-600 p-3 text-white"
          />
        </div>
      </form>
    </Form>
  );
}

const ChangePasswordModal = ({ changePasswordModal, setChangePasswordModal }) => {
  return (
    <Dialog
      open={changePasswordModal}
      onOpenChange={(open) => {
        if (!open) setChangePasswordModal(false);
      }}
    >
      <DialogContent className="no-scrollbar max-h-[90vh] min-w-[50vw] overflow-y-scroll pt-0">
        {changePasswordModal && (
          <>
            <DialogHeader className="w-full pb-2 pt-10">
              <CardTitle>Change password</CardTitle>
              <CardDescription>
                Change your password form profile.
              </CardDescription>
            </DialogHeader>
            <ChangePasswordContent changePasswordModal={changePasswordModal} setChangePasswordModal={setChangePasswordModal} />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordModal;
