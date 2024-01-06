"use client";

import useAuth from "@/hooks/useAuth";
import React from "react";
import DeleteJobConfirmModal from "./DeleteJobConfirmModal";
import { Button } from "../ui/button";

const DeleteButton = ({ className = "" }) => {
  const { session } = useAuth();
  const [isDeleting, setIsDeleting] = React.useState(false);

  if (!session?.roles?.includes("manager")) return null;

  return (
    <>
      <Button onClick={() => setIsDeleting(true)} className={className}>
        Delete Job
      </Button>
      <DeleteJobConfirmModal
        isDeleting={isDeleting}
        setIsDeleting={setIsDeleting}
      />
    </>
  );
};

export default DeleteButton;
