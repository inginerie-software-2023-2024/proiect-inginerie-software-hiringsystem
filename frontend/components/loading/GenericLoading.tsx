import React from "react";
import LoadingSpinner from "./LoadingSpinner";

const GenericLoading = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <LoadingSpinner /> Loading...
    </div>
  );
};

export default GenericLoading;
