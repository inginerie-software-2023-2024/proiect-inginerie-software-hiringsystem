import React from "react";
import { Button } from "../ui/button";
import { TableCell } from "../ui/table";

const StatusButtons = ({ application }) => {
  const accept = () => {};

  const reject = () => {};

  const erase = () => {};

  return (
    <TableCell>
      <div
        className="inline-flex [&>*:first-child]:rounded-s-lg [&>*:last-child]:rounded-e-lg"
        role="group"
      >
        {application.job_application.status === "SUBMITTED" && (
          <>
            <Button className="bg-green-500 text-white" onClick={accept}>
              Accept
            </Button>
            <Button className="bg-red-500 text-white" onClick={reject}>
              Reject
            </Button>
            <Button className="bg-gray-400 text-white" onClick={erase}>
              Erase
            </Button>
          </>
        )}
      </div>
    </TableCell>
  );
};

export default StatusButtons;
