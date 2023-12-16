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
      `http://localhost:8081/api/v1/interview/forceAction/${roomId}/${userId}`,
      {
        method: "POST",
        body: JSON.stringify({ type: "MUTE" }),
      }
    );
  };

  const muteCam = (userId) => {
    fetch(
      `http://localhost:8081/api/v1/interview/forceAction/${roomId}/${userId}`,
      {
        method: "POST",
        body: JSON.stringify({ type: "CAMERA_OFF" }),
      }
    );
  };

  const leave = (userId) => {
    fetch(
      `http://localhost:8081/api/v1/interview/forceAction/${roomId}/${userId}`,
      {
        method: "POST",
        body: JSON.stringify({ type: "KICK" }),
      }
    );
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
                        <div
                          onClick={() => muteMic(peer.peerID)}
                          className={
                            "btn btn-primary " + (audioMuted ? "disabled" : "")
                          }
                        >
                          Mute <MicOffIcon />
                        </div>
                        <div
                          onClick={() => muteCam(peer.peerID)}
                          className={
                            "btn btn-primary " + (cameraMuted ? "disabled" : "")
                          }
                        >
                          Turn camera off <CameraOffIcon />
                        </div>
                        <div
                          onClick={() => leave(peer.peerID)}
                          className="btn btn-primary"
                        >
                          Kick <ArrowRight />
                        </div>
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
