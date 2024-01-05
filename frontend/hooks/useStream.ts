import { useEffect, useState } from "react";

export type Nullable<T> = T | null;
export type Status = "loading" | "idle" | "rejected" | "success";

export default function useStream(stream: Nullable<MediaStream> = null) {
  const [state, setState] = useState<Nullable<MediaStream>>(stream);
  const [status, setStatus] = useState<Status>("loading");

  const [m, setM] = useState(false);
  const [v, setV] = useState(true);

  useEffect(() => {
    return () => {
      const tracks = state?.getTracks();
      tracks?.forEach((track) => track.stop());
    };
  }, [state]);

  async function createStream() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      setState(stream);
      const [audio, video] = stream.getTracks();
      setM(!audio.enabled);
      setV(video.enabled);

      setStatus("success");
    } catch (error) {
      setStatus("rejected");
      console.error("Access denied for audio and video stream", error);
    }
  }

  function toggle(kind: "audio" | "video") {
    return (s = state) => {
      if (!s) throw new Error("Failed. Could not find stream");

      const track = s.getTracks().find((track) => track.kind === kind);

      if (!track)
        throw new Error(`Failed. Could not find ${kind} track in given stream`);

      if (track.enabled) {
        track.enabled = false;
        track.kind === "audio" ? setM(true) : setV(false);
      } else {
        track.enabled = true;
        track.kind === "audio" ? setM(false) : setV(true);
      }
    };
  }

  function toggleOffForced(kind: "audio" | "video") {
    return (s = state) => {
      if (!s) throw new Error("Failed. Could not find stream");

      const track = s.getTracks().find((track) => track.kind === kind);

      if (!track)
        throw new Error(`Failed. Could not find ${kind} track in given stream`);

      track.enabled = false;
      track.kind === "audio" ? setM(true) : setV(false);
    };
  }

  return {
    stream: state,
    muted: m,
    visible: v,
    createStream,
    toggle,
    toggleAudio: toggle("audio"),
    toggleVideo: toggle("video"),
    forceMute: toggleOffForced("audio"),
    forceVideoOff: toggleOffForced("video"),
    isLoading: status === "loading",
    isError: status === "rejected",
    isSuccess: status === "success" || status === "idle",
  };
}
