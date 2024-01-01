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

import { valibotResolver } from "@hookform/resolvers/valibot";

import { Input } from "@/components/ui/input";
import { loginFormSchemaType, loginFormSchema } from "@/types/form/loginSchema";
import useSession from "@/hooks/useSession";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const LoginForm = () => {
  const searchParams = useSearchParams();

  const router = useRouter();
  const form = useForm<loginFormSchemaType>({
    mode: "onTouched",
    resolver: valibotResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const callback = searchParams.get("callback") || "/";

  const { login } = useSession();

  async function onSubmit(values: loginFormSchemaType) {
    await login(values);
    router.replace(callback);
  }

  return (
    <><Form {...form}>
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
          )} />

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
          )} />

        <SubmitButton
          toSubmitComponent="Login"
          pendingComponent="Logging in..."
          className="" />
      </form>
    </Form>
    <Link href="http://localhost:3000/forgot/password">Forgot password?</Link>
    </>
  );
};

export default LoginForm;
