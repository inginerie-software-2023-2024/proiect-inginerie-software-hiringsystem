"use client"

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useRef, useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useRouter } from "next/navigation";


const ForgotPasswordEmailBox = () => {
  const router = useRouter();

  const emailInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setLoading] = useState(false);

  async function sendResetPasswordEmail(email: string) {
    const res = await fetch(
        `http://localhost:3000/api/auth/forgot/password`,
        {
          method: "POST",
          body: email,
        }
      );
    
      if (!res.ok) {
        throw Error("Could not send reset password email");
      } else {
        router.push("/forgot/password/sent");
      }
  }

  const submitEmail = async () => {
    const email = emailInputRef.current?.value;
    if (!email?.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      emailInputRef.current.value = "";
      return;
    }
    setLoading(true);
    await sendResetPasswordEmail(email);
    emailInputRef.current.value = "";
    setLoading(false);
  };

  return (
       <Card className="m-auto self-center p-10">
        <CardHeader className="mb-3">
          <CardTitle>Request password reset</CardTitle>
          <CardDescription>
            Insert here your email address, where you will receive an email for your password reset.
          </CardDescription>
        </CardHeader>
        <div className="mt-7 flex max-w-2xl gap-2 text-muted-foreground">
          <Label className="sr-only" htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            placeholder="Enter your email address"
            type="email"
            ref={emailInputRef} />
        </div>
        <Button disabled={isLoading} className="mt-5 bg-green-600 hover:bg-green-400" size="lg" onClick={submitEmail}>
          {isLoading ? "Sending email..." : "Request password reset"}
        </Button>
      </Card>
    );
}

export default ForgotPasswordEmailBox;