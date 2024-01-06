"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";

const DeleteJobConfirmModal = ({ isDeleting, setIsDeleting }) => {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [isDisabled, setDisabled] = useState(false);
  const deleteJob = async () => {
    setDisabled(true);

    const res = await fetch(`/api/jobs/delete/${params.id}`, {
      method: "POST",
    });

    if (res.ok) {
      router.push(`/jobs`);
      router.refresh();
    }
  };

  return (
    <AlertDialog
      open={isDeleting}
      onOpenChange={(open) => {
        if (!open) setIsDeleting(false);
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will delete the job and all associated interviews.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-3 justify-between">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isDisabled} onClick={deleteJob}>
            {isDisabled ? "Deleting..." : "Confirm Deletion"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteJobConfirmModal;
