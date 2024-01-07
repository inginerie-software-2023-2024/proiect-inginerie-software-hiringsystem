"use client";

import { serverRegister } from "@/lib/sessionServerActions";
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
import {
  registerFormSchema,
  registerFormSchemaType,
} from "@/types/form/registerSchema";

const RegisterForm = ({ setError }) => {
  const form = useForm<registerFormSchemaType>({
    mode: "onTouched",
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      birthDate: "2000-01-01",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: registerFormSchemaType) {
    const res = await serverRegister(values);
    if (res?.message) {
      setError({
        title: "Register Exception",
        description: res.message,
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormDescription>Enter your email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="First Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Last Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Birth Date</FormLabel>
              <FormControl>
                <Input type="date" placeholder="Birth Date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormDescription>
                Password must contain one digit from 1 to 9, one lowercase
                letter, one uppercase letter, one special character, no space,
                and it must be 8-16 characters long.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  {...field}
                />
              </FormControl>
              <FormDescription>Type your password once more.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton
          toSubmitComponent="Register"
          pendingComponent="Registering..."
          className=""
        />
      </form>
    </Form>
  );
};

export default RegisterForm;
