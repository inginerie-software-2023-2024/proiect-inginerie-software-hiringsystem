"use client";

import { HomeIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const InterviewLeft = () => {
  const queryParams = useSearchParams();

  const closed = queryParams.get("closed");
  const kicked = queryParams.get("kicked");
  const router = useRouter();

  const goMainPage = () => {
    router.push("/");
  };

  if (closed === "true") {
    return (
      <div className="flex h-full w-full flex-1 items-center justify-center bg-gray-200 p-10">
        <div className="flex flex-col items-center gap-10 rounded-lg bg-white p-5 shadow-lg">
          <h2 className="text-[2.7rem] font-bold">Interview room closed!</h2>
          <p>
            Thank you for your participation! The interview was marked as
            finished by a room moderator.
          </p>
          <p>
            You should expect to hear back from us within a maximum of 5 working
            days via email.
          </p>
          <div
            onClick={goMainPage}
            className="inline-flex gap-3 rounded-2xl bg-blue-3 p-5 font-bold text-white hover:cursor-pointer"
          >
            Main Page <HomeIcon />
          </div>
        </div>
      </div>
    );
  }

  if (kicked === "true") {
    return (
      <div className="flex h-full w-full flex-1 items-center justify-center bg-gray-200 p-10">
        <div className="flex flex-col items-center gap-10 rounded-lg bg-white p-5 shadow-lg">
          <h2 className="text-[2.7rem] font-bold">
            You have been kicked from the interview room!
          </h2>
          <div
            onClick={goMainPage}
            className="inline-flex gap-3 rounded-2xl bg-blue-3 p-5 font-bold text-white hover:cursor-pointer"
          >
            Main Page <HomeIcon />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-1 items-center justify-center bg-gray-200 p-10">
      <div className="flex flex-col items-center gap-10 rounded-lg bg-white p-5 shadow-lg">
        <h2 className="text-[2.7rem] font-bold">
          You have left the interview!
        </h2>
        <p>
          You have exited the interview room. If you left by mistake, you can
          simply rejoin using the same link. Otherwise, we appreciate your
          participation!
        </p>
        <p>
          You should expect to hear back from us within a maximum of 5 working
          days via email.
        </p>
        <div
          onClick={goMainPage}
          className="inline-flex gap-3 rounded-2xl bg-blue-3 p-5 font-bold text-white hover:cursor-pointer"
        >
          Main Page <HomeIcon />
        </div>
      </div>
    </div>
  );
};

export default InterviewLeft;
