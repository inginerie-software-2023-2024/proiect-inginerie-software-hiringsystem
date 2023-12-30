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
import { useRouter } from "next/navigation";

export function SlotConfirmModal() {
  const { selectedSlot, setSelectedSlot, interviewId } = useInterviewSlots();
  const router = useRouter();

  const slotConfirm = () => {
    router.push(`/interviews/room/${interviewId}`);
  };

  return (
    <AlertDialog
      open={selectedSlot !== null}
      onOpenChange={(open) => {
        if (!open) setSelectedSlot(null);
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be easily undone.
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
                <TableCell className="font-medium">
                  {selectedSlot.date}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
        <AlertDialogFooter className="mt-3 justify-between">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={slotConfirm}>
            Confirm Slot
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
