"use client";

import { LockClosedIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Forbidden = ({
  lastForbiddenMessage,
}: {
  lastForbiddenMessage?: string;
}) => {
  const router = useRouter();
  const [message, setMessage] = useState("");

  useEffect(() => {
    function getCookieValue(name: string) {
      const regex = new RegExp(`(^| )${name}=([^;]+)`);
      const match = document.cookie.match(regex);
      if (match) {
        return decodeURIComponent(match[2]);
      }
    }

    setMessage(
      lastForbiddenMessage ||
        getCookieValue("lastForbiddenMessage") ||
        "You are not allowed here."
    );
  }, [lastForbiddenMessage]);

  return (
    <div className="my-auto flex w-[70%] flex-col items-center justify-center gap-[20px] self-center rounded-sm p-5">
      <h1 className="text-[4rem]">Forbidden Access</h1>
      <h2 className="text-2xl font-bold text-muted-foreground">{message}</h2>
      <LockClosedIcon className="h-10 w-10" />
      <button
        onClick={() => router.back()}
        className="rounded bg-red-500 p-3 font-bold text-white hover:bg-red-400"
      >
        Go back
      </button>
    </div>
  );
};

export default Forbidden;
