import { CardTitle } from "@/components/ui/card";
import {
  DialogFooter,
  DialogHeader,
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { ArrowRight, CameraOffIcon, MicOffIcon } from "lucide-react";

const UsersModal = ({ roomId, peers, streams, openModal, setOpenModal }) => {
  const muteMic = (userId) => {
    fetch(
      `http://localhost:3000/api/interviews/forceAction/${roomId}/${userId}`,
      {
        method: "POST",
        body: JSON.stringify({ type: "MUTE" }),
      }
    );
  };

  const muteCam = (userId) => {
    fetch(
      `http://localhost:3000/api/interviews/forceAction/${roomId}/${userId}`,
      {
        method: "POST",
        body: JSON.stringify({ type: "CAMERA_OFF" }),
      }
    );
  };

  const leave = async (userId) => {
    const res = await fetch(
      `http://localhost:3000/api/interviews/forceAction/${roomId}/${userId}`,
      {
        method: "POST",
        body: JSON.stringify({ type: "KICK" }),
      }
    );

    console.log(await res.text())
  };

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
              <CardTitle>Connected users</CardTitle>
            </DialogHeader>
            {peers.length === 0
              ? "You are the only one connected."
              : peers.map((peer) => {
                  const stream = streams[peer.peerID];
                  const audioMuted = stream.mic === "off";
                  const cameraMuted = stream.camera === "off";

                  return (
                    <div
                      key={peer.peerID}
                      className="flex w-full items-center justify-around"
                    >
                      <span>{peer.peerFullName}</span>
                      <div className="flex gap-[20px]">
                        <button
                          disabled={audioMuted}
                          onClick={() => muteMic(peer.peerID)}
                          className="flex gap-2 rounded-lg bg-blue-3 p-2 text-white"
                        >
                          {audioMuted ? "Already muted" : "Mute"} <MicOffIcon />
                        </button>
                        <button
                          disabled={cameraMuted}
                          onClick={() => muteCam(peer.peerID)}
                          className="flex gap-2 rounded-lg bg-blue-3 p-2 text-white"
                        >
                          {cameraMuted ? "Already off" : "Turn camera off"}{" "}
                          <CameraOffIcon />
                        </button>
                        <button
                          onClick={() => leave(peer.peerID)}
                          className="flex gap-2 rounded-lg bg-red-600 p-2"
                        >
                          Kick <ArrowRight />
                        </button>
                      </div>
                    </div>
                  );
                })}
            <DialogFooter>
              <button
                className="rounded-lg bg-gray-200 p-4"
                onClick={() => setOpenModal(false)}
              >
                Close Window
              </button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UsersModal;
