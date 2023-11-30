import React from "react";
import { useFormState } from "react-hook-form";

const SubmitButton: React.FC<
  {
    toSubmitComponent: React.ReactNode;
    pendingComponent: React.ReactNode;
  } & any
> = ({ toSubmitComponent, pendingComponent, ...props }) => {
  const { isSubmitting } = useFormState();

  return (
    <button type="submit" disabled={isSubmitting} {...props}>
      {isSubmitting ? pendingComponent : toSubmitComponent}
    </button>
  );
};

export default SubmitButton;
