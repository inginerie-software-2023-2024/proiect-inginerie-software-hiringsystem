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
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow, TableBody, Table } from "@/components/ui/table";
import { formatTimeForInterview } from "@/lib/utils";
import {
  interviewSlotSchemaType,
  interviewSlotSchema,
} from "@/types/form/interviewSlotSchema";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import TimeInput from "./TimeInput";
import useInterviewSlotsEditor from "@/hooks/useInterviewSlotsEditor";

function AddSlotContent({ selectedSlot }) {
  const { interviewData } = useInterviewSlotsEditor();
  const form = useForm<interviewSlotSchemaType>({
    mode: "onTouched",
    resolver: valibotResolver(interviewSlotSchema),
    defaultValues: {
      date: selectedSlot.date,
      startMinutes: selectedSlot.startMinutes || 600,
      minutesDuration: selectedSlot.minutesDuration || 120,
    },
  });

  async function onSubmit(values: interviewSlotSchemaType) {
    console.log(values);
    console.log(interviewData);
  }

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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <Input readOnly {...form.register("date")} />

            <FormItem>
              <FormLabel>Start time</FormLabel>
              <FormControl>
                <TimeInput name="startMinutes" form={form} />
              </FormControl>
              <FormDescription>
                When is this slot interval starting
              </FormDescription>
            </FormItem>

            <FormField
              control={form.control}
              name="minutesDuration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minutes</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      placeholder="Number of minutes"
                    />
                  </FormControl>
                  <FormDescription>
                    Duration in minutes of the slot interval
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <AlertDialogFooter className="mt-3 justify-between">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button type="submit">Add Slot</Button>
            </AlertDialogFooter>
          </form>
        </Form>
      )}
    </>
  );
}

function RemoveSlotContent({ selectedSlot }) {
  const removeSlot = () => {};

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
        <AlertDialogAction onClick={removeSlot}>
          Confirm Delete
        </AlertDialogAction>
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
  const { selectedSlot, setSelectedSlot } = useInterviewSlotsEditor();

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
