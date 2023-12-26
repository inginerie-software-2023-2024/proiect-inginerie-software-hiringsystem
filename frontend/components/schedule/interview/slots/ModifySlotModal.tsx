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
import { TableCell, TableRow, TableBody, Table } from "@/components/ui/table";
import useInterviewSlots from "@/hooks/useInterviewSlots";
import { formatTimeForInterview } from "@/lib/utils";

function AddSlotContent({ selectedSlot }) {
  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle>Add a slot</AlertDialogTitle>
        <AlertDialogDescription>
          This action will associate a new open interval for this interview.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <h1 className="mt-3 font-bold">Slot information</h1>
      {selectedSlot && (
        null
      )}
      <AlertDialogFooter className="mt-3 justify-between">
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction>Add Slot</AlertDialogAction>
      </AlertDialogFooter>
    </>
  );
}

function RemoveSlotContent({ selectedSlot }) {
  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action will remove the slot.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <h1 className="mt-3 font-bold">Slot information</h1>
      {selectedSlot && (
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Start Hour</TableCell>
              <TableCell className="font-medium">
                {formatTimeForInterview(selectedSlot.startMinute)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">End Hour</TableCell>
              <TableCell className="font-medium">
                {formatTimeForInterview(
                  selectedSlot.startMinute + selectedSlot.minutesDuration
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Date</TableCell>
              <TableCell className="font-medium">{selectedSlot.date}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
      <AlertDialogFooter className="mt-3 justify-between">
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction>Confirm Delete</AlertDialogAction>
      </AlertDialogFooter>
    </>
  );
}

export function ModifySlotContent({ selectedSlot }) {
  if (selectedSlot?.modifyAction === "remove")
    return <RemoveSlotContent selectedSlot={selectedSlot} />;
  else if (selectedSlot?.modifyAction === "add")
    return <AddSlotContent selectedSlot={selectedSlot} />;

  return null;
}

export function ModifySlotModal() {
  const { selectedSlot, setSelectedSlot } = useInterviewSlots();

  return (
    <AlertDialog
      open={selectedSlot !== null}
      onOpenChange={(open) => {
        if (!open) setSelectedSlot(null);
      }}
    >
      <AlertDialogContent>
        <ModifySlotContent selectedSlot={selectedSlot} />
      </AlertDialogContent>
    </AlertDialog>
  );
}
