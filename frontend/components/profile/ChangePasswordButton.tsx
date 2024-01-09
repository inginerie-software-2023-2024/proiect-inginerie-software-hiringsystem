import { EditIcon } from "lucide-react";

const ChangePasswordButton = ({ onClick }) => {
  return (
    <div
      className="absolute left-4 top-4 flex cursor-pointer gap-2 "
      onClick={onClick}
    >
      <EditIcon />
      Change password
    </div>
  );
};

export default ChangePasswordButton;
