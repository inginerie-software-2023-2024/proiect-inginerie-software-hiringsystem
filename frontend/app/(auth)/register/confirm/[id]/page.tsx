"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import successImg from "@/public/assets/images/emailConfirmed.png";
import errorImg from "@/public/assets/images/emailError.svg";
import GenericLoading from "@/components/loading/GenericLoading";

const DisplayCard: React.FC<{ success: boolean }> = ({ success }) => {
  return (
    <div className="m-auto flex flex-col items-center gap-3 p-10 shadow-2xl">
      {!success && <h1 className="text-3xl font-bold">Invalid account!</h1>}
      <Image
        src={success ? successImg : errorImg}
        alt="Email Sent"
        className="h-auto w-[70%] rounded"
      />
      {success ? (
        <h2>You can login now!</h2>
      ) : (
        <p>
          Sorry but it seems no account is associated with your link.
          <br />
          It might have timed out.
        </p>
      )}
    </div>
  );
};

const RegisterConfirm = () => {
  const { id } = useParams();
  const [success, setSuccess] = useState<boolean | null>(null);

  useEffect(() => {
    if (success === null) {
      axios
        .post(`${process.env.NEXT_PUBLIC_BACKEND_URL_FOR_BROWSER}/api/v1/auth/register/confirm/${id}`)
        .then((answer) => {
          setSuccess(answer.data);
        })
        .catch((err) => {
          console.log(err);
          setSuccess(false);
        });
    }
  }, [id, success]);

  if (success === null) {
    return <GenericLoading />;
  }

  return <DisplayCard success={success} />;
};

export default RegisterConfirm;
