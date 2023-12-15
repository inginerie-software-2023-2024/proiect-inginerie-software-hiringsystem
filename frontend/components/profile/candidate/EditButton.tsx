import { EditIcon } from "lucide-react";

const EditButton = ({ onClick }) => {
  return (
    <EditIcon
      onClick={onClick}
      className="absolute right-4 top-4 cursor-pointer"
    />
  );
};

export default EditButton;
