"use client";

import React from "react";
import SubmitButton from "@/components/form/SubmitButton";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { resetPasswordSchema, resetPasswordSchemaType } from "@/types/form/resetPasswordSchema";
import { Card, CardDescription, CardTitle } from "../ui/card";
import { useRouter } from "next/navigation";

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

const ResetPasswordForm = ({ token }) => {
    const form = useForm<resetPasswordSchemaType>({
        mode: "onTouched",
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            newPassword: "",
            confirmPassword: "",
        },
    });

    const router = useRouter();

    async function onSubmit(values: resetPasswordSchemaType) {
        const res = await fetch(
            `http://localhost:3000/api/auth/forgot/password/${token}`,
            {
              method: "POST",
              body: JSON.stringify(values.newPassword),
            }
          );
        
          if (!res.ok) {
            throw Error("Could not send reset password email");
          } else {
            router.push("/login");
          }
    }

    return (
      <Card className="m-auto self-center p-10">
          <CardTitle>Password reset</CardTitle>
          <CardDescription className="mb-6">
            To reset your old password, insert a new one and then confirm it.
          </CardDescription>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
        <div className="grid max-w-lg grid-cols-1 gap-5">
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
            description="Type your password once more."
          />
        </div>

        <div className="flex justify-end">
          <SubmitButton
            toSubmitComponent="Reset password"
            pendingComponent="Reseting password..."
            className="rounded bg-green-600 p-3 text-white"
          />
        </div>
      </form>
    </Form>
    </Card>
  );
};

export default ResetPasswordForm;