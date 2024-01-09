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
import useAuth from "@/hooks/useAuth";

const LoginForm = ({ setError }) => {
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

  const { login } = useAuth();

  async function onSubmit(values: loginFormSchemaType) {
    const res = await login(values);
    if (res.errorMessage) {
      setError({
        title: "Login Exception",
        description: res.errorMessage,
      });
      return;
    }

    router.replace(callback);
  }

  return (
    <>
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

          <SubmitButton
            toSubmitComponent="Login"
            pendingComponent="Logging in..."
            className=""
          />
        </form>
      </Form>
      <Link
        href="http://localhost:3000/forgot/password"
        className="text-sm text-muted-foreground"
      >
        Forgot password?
      </Link>
    </>
  );
};

export default LoginForm;
