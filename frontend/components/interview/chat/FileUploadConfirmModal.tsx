import React from "react";

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

const FileUploadConfirmModal = ({ handleFile, setFile, file }) => {
  return (
    <AlertDialog
      open={file !== null}
      onOpenChange={(open) => {
        if (!open) setFile(null);
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Do you want to submit this file?</AlertDialogTitle>
          <AlertDialogDescription>
            The following file will be uploaded in the interview chat.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {file && (
          <div className="flex gap-3">
            File:{" "}
            <b>
              {file.name.slice(0, 40) + (file.name.length > 40 ? "..." : "")}
            </b>
          </div>
        )}
        <AlertDialogFooter className="mt-3 justify-between">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleFile(file)}>
            Confirm File
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default FileUploadConfirmModal;
