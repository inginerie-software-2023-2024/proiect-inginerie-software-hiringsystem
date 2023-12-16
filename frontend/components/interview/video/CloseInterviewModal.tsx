import { CardTitle } from "@/components/ui/card";
import {
  DialogFooter,
  DialogHeader,
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

const CloseInterviewModal = ({ closeMethod, openModal, setOpenModal }) => {
  return (
    <Dialog
      open={openModal}
      onOpenChange={(open) => {
        if (!open) setOpenModal(false);
      }}
    >
      <DialogContent className="no-scrollbar max-h-[90vh] min-w-[50vw] overflow-y-scroll">
        {openModal && (
          <>
            <DialogHeader className="w-full pb-2 pt-10">
              <CardTitle>Are you sure?</CardTitle>
            </DialogHeader>
            Are you sure you want to close this interview room, kicking everyone
            out?
            <DialogFooter>
              <button
                className="rounded-lg bg-red-600 p-4 text-white"
                onClick={closeMethod}
              >
                Close Interview Room
              </button>
              <button
                className="rounded-lg bg-gray-200 p-4"
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CloseInterviewModal;
