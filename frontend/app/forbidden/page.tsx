"use client";

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
    <div className="my-auto flex flex-col items-center justify-center gap-[20px] self-center rounded-sm p-5 shadow">
      <h1 className="text-2xl font-bold">{message}</h1>
      <button
        onClick={() => router.back()}
        className="bg-red-500 p-3 font-bold text-white"
      >
        Go back
      </button>
    </div>
  );
};

export default Forbidden;
