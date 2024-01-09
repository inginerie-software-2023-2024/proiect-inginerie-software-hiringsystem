"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import GenericAlert from "../alert/GenericAlert";

const AuthenticationTabs: React.FC<{
  defaultTab: "login" | "register";
}> = ({ defaultTab }) => {
  const [error, setError] = React.useState<{
    title?: string;
    description?: string;
  }>({});

  return (
    <Tabs defaultValue={defaultTab} className="my-[4rem] w-[400px] self-center">
      {error.title && error.description && (
        <GenericAlert
          title={error.title}
          description={error.description}
          className="mb-5"
        />
      )}
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Enter in your account.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <LoginForm setError={setError}/>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>
              Create an account to use for your job applications.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <RegisterForm setError={setError}/>
          </CardContent>
        </Card>
        <br /><br />
      </TabsContent>
    </Tabs>
  );
};

export default AuthenticationTabs;
