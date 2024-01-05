"use client"

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useRef, useState } from "react";
import { Card, CardDescription, CardTitle } from "../ui/card";
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
          body: JSON.stringify(email),
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
          <CardTitle>Request password reset</CardTitle>
          <CardDescription className="mb-6">
            Insert your email address so we can send you further instructions on resetting your password.
          </CardDescription>
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