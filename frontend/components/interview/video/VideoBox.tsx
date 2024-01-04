"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import UsersModal from "./UsersModal";
import CloseInterviewModal from "./CloseInterviewModal";
import {
  ArrowRightIcon,
  CameraIcon,
  CameraOffIcon,
  MicIcon,
  MicOffIcon,
  UsersIcon,
  VideoOffIcon,
  X,
} from "lucide-react";
import useInterview from "@/hooks/useInterview";
import SocketContext from "@/context/SocketProvider";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const Video = ({ data, remoteStream }: { data: any; remoteStream: any }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [isAudioActive, setIsAudioActive] = useState(false);

  useEffect(() => {
    let audioContext = null;
    let analyser: AnalyserNode | null = null;
    let source = null;

    ref.current.srcObject = remoteStream.stream;

    if (remoteStream) {
      audioContext = new AudioContext();
      analyser = audioContext.createAnalyser();
      source = audioContext.createMediaStreamSource(remoteStream.stream);

      source.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const analyzeAudio = () => {
        analyser!.getByteFrequencyData(dataArray);

        const average =
          dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;
        setIsAudioActive(average > 0.5);

        requestAnimationFrame(analyzeAudio);
      };

      analyzeAudio();
    }

    return () => {
      analyser?.disconnect();
      source?.disconnect();
      audioContext?.close();
    };
  }, [remoteStream]);

  useEffect(() => {
    let audioContext = null;
    let analyser = null;
    let source = null;

    if (ref.current && ref.current.srcObject) {
      audioContext = new AudioContext();
      analyser = audioContext.createAnalyser();
      source = audioContext.createMediaStreamSource(ref.current.srcObject);

      source.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const analyzeAudio = () => {
        analyser.getByteFrequencyData(dataArray);

        const average =
          dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;
        setIsAudioActive(average > 0.5);

        requestAnimationFrame(analyzeAudio);
      };

      analyzeAudio();
    }

    return () => {
      analyser?.disconnect();
      source?.disconnect();
      audioContext?.close();
    };
  }, [data, ref.current?.srcObject]);

  return (
    <div className="relative self-center overflow-hidden rounded-xl">
      <video
        className={cn(
          "w-full",
          isAudioActive &&
            "outline outline-4 outline-offset-[-5px] outline-green-500"
        )}
        playsInline
        autoPlay
        ref={ref}
      />
      <div className="absolute bottom-0 flex w-full justify-between bg-black bg-opacity-[0.70] px-3 py-1 text-white">
        <div className="w-1/2">{data.peerFullName}</div>
        {ref.current && ref.current.srcObject && (
          <div className="flex gap-5">
            {remoteStream.mic === "off" && <MicOffIcon />}
            {remoteStream.camera === "off" && <VideoOffIcon />}
          </div>
        )}
      </div>
    </div>
  );
};

const VideoBox = () => {
  const [usersModalOpen, setUsersModalOpen] = useState(false);
  const [confirmCloseModalOpen, setConfirmCloseModalOpen] = useState(false);
  const [peers, setPeers] = useState([]);
  const peersRef = useRef([]);
  const [remoteStreams, setRemoteStreams] = useState({});
  const router = useRouter();
  const myVideoRef = useRef<HTMLVideoElement>(null);

  const {
    stream,
    interviewId: roomId,
    interviewData: { participantInfo: participantData, participantInfo: {userId} },
  } = useInterview();
  const { stompClient, connected } = useContext(SocketContext);

  useEffect(() => {
    if (!connected || !stompClient || !userId) return;

    stompClient.subscribe(
      `/api/v1/user/sockets/${userId}/interview/room/force-action`,
      forcedReceived
    );

    stompClient.subscribe(
      `/api/v1/user/sockets/${userId}/interview/room/users`,
      handleAllUsers
    );

    stompClient.subscribe(
      `/api/v1/user/sockets/${userId}/interview/room/user-joined`,
      handleUserJoined
    );

    stompClient.subscribe(
      `/interview/room/video/message/${roomId}/user-left`,
      handleUserLeft
    );

    stompClient.subscribe(
      `/api/v1/user/sockets/${userId}/interview/room/receiving-returned-signal`,
      handleReceivingReturnedSignal
    );

    stompClient.publish({
      destination: `/api/v1/sockets/interview/room/video/message/${roomId}/join`,
      body: JSON.stringify({ userId }),
      skipContentLengthHeader: true,
    });
  }, [connected, userId]);

  useEffect(() => {
    if (!myVideoRef.current) return;

    myVideoRef.current.srcObject = stream.stream;

    return peersRef.current.forEach((peer) => {
      peer.peer.destroy();
    });
  }, []);

  const handleAllUsers = (message) => {
    const users = JSON.parse(message.body);
    users.forEach((userGot) => {
      const peer = createPeer(userGot.userId, userId);
      peer.on("stream", (stream) => {
        setRemoteStreams((prevStreams) => {
          return {
            ...prevStreams,
            [userGot.userId]: {
              stream,
              mic: "on",
              camera: "on",
            },
          };
        });
      });

      peer.on("connect", () => {
        peer.send(JSON.stringify({ type: "status_request", userId }));

        setPeers((prevPeers) => [
          ...prevPeers,
          {
            peerID: userGot.userId,
            peerFullName: `${userGot.firstName} ${userGot.lastName}`,
            peer,
          },
        ]);
      });

      peersRef.current.push({
        peerID: userGot.userId,
        peer,
      });
    });
  };

  const handleUserJoined = (message) => {
    const payload = JSON.parse(message.body);
    const peer = addPeer(payload.signal, payload.callerID);

    peer.on("stream", (stream) => {
      setRemoteStreams((prevStreams) => {
        return {
          ...prevStreams,
          [payload.callerID]: {
            stream,
            mic: "on",
            camera: "on",
          },
        };
      });
    });

    peer.on("connect", () => {
      peer.send(JSON.stringify({ type: "status_request", userId }));

      setPeers((users) => [
        ...users,
        {
          peerID: payload.callerID,
          peerFullName: `${payload.extraUserInfo.firstName} ${payload.extraUserInfo.lastName}`,
          peer,
        },
      ]);
    });

    peersRef.current.push({
      peerID: payload.callerID,
      peer,
    });
  };

  const handleUserLeft = (message) => {
    const payload = JSON.parse(message.body);
    const peer = peersRef.current.find((p) => p.peerID === payload.id);
    if (peer) {
      peer.peer.destroy();
    }

    const peers = peersRef.current.filter((p) => p.peerID !== payload.id);
    peersRef.current = peers;
    setPeers((prevPeers) =>
      prevPeers.filter((peer) => peer.peerID !== payload.id)
    );

    setRemoteStreams((prevStreams) => {
      const updatedStreams = { ...prevStreams };
      delete updatedStreams[payload.id];
      return updatedStreams;
    });
  };

  const handleReceivingReturnedSignal = (message) => {
    const payload = JSON.parse(message.body);
    const item = peersRef.current.find((p) => p.peerID === payload.id);
    item.peer.signal(payload.signal);
  };

  const createPeer = (userToSignal, callerID) => {
    const peer = new window.SimplePeer({
      initiator: true,
      trickle: false,
      stream: stream.stream,
    });

    peer.on("signal", (signal) => {
      stompClient.publish({
        destination: `/api/v1/sockets/interview/room/video/message/${roomId}/signal`,
        body: JSON.stringify({ userToSignal, callerID, signal }),
      });
    });

    peer.on("data", (data) => {
      handleEvents(data);
    });

    return peer;
  };

  const addPeer = (incomingSignal, callerID) => {
    const peer = new window.SimplePeer({
      initiator: false,
      trickle: false,
      stream: stream.stream,
    });

    peer.on("signal", (signal) => {
      stompClient.publish({
        destination: `/api/v1/sockets/interview/room/video/message/${roomId}/return-signal`,
        body: JSON.stringify({ signal, callerID, id: userId }),
      });
    });

    peer.on("data", (data) => {
      handleEvents(data);
    });

    peer.signal(incomingSignal);

    return peer;
  };

  const handleEvents = (data) => {
    const decoder = new TextDecoder("utf-8");
    const jsonString = decoder.decode(data);
    const jsonData = JSON.parse(jsonString);

    if (jsonData.type === "status_request") {
      const peer = peersRef.current.find(
        (peer) => peer.peerID === jsonData.userId
      );
      const toSend = JSON.stringify({
        type: "status_response",
        mic: stream.muted ? "off" : "on",
        camera: !stream.visible ? "off" : "on",
        userId,
      });
      peer.peer.send(toSend);
      return;
    }

    setRemoteStreams((prevStreams) => {
      const updatedStreams = { ...prevStreams };
      const stream = updatedStreams[jsonData.userId];

      if (stream) {
        switch (jsonData.type) {
          case "microphone_on":
            stream.mic = "on";
            break;
          case "microphone_off":
            stream.mic = "off";
            break;
          case "camera_on":
            stream.camera = "on";
            break;
          case "camera_off":
            stream.camera = "off";
            break;
          case "status_response":
            stream.camera = jsonData.camera;
            stream.mic = jsonData.mic;
            break;
          default:
            break;
        }
      }

      return updatedStreams;
    });
  };

  const forcedReceived = (message) => {
    const payload = JSON.parse(message.body);
    console.log("FORCED RECEIVED", payload)
    console.log(stream.muted, stream.visible);
    const [audio, video] = stream.stream.getTracks();
    console.log(!audio.enabled, video.enabled);

    if (payload.type === "MUTE") {
      stream.forceMute();

      peersRef.current.forEach((peer) => {
        peer.peer.send(JSON.stringify({ userId, type: "microphone_off" }));
      });

      // setAudioMuted(true);
      // audioMutedRef.current = true;
    } else if (payload.type === "CAMERA_OFF") {
      stream.forceVideoOff();

      peersRef.current.forEach((peer) => {
        peer.peer.send(JSON.stringify({ userId, type: "camera_off" }));
      });

      // setCameraMuted(true);
      // cameraMutedRef.current = true;
    } else if (payload.type === "KICK") {
      router.replace("/interviews/room/left?kicked=true");
    }
  };

  function muteMic() {
    if (stream.muted) {
      peersRef.current.forEach((peer) => {
        peer.peer.send(JSON.stringify({ userId, type: "microphone_on" }));
      });
    } else {
      peersRef.current.forEach((peer) => {
        peer.peer.send(JSON.stringify({ userId, type: "microphone_off" }));
      });
    }

    stream.toggleAudio();

    // setAudioMuted(!audioMuted);
    // audioMutedRef.current = !audioMutedRef.current;
  }

  async function muteCam() {
    try {
      if (!stream.visible) {
        peersRef.current.forEach((peer) => {
          peer.peer.send(JSON.stringify({ userId, type: "camera_on" }));
        });
      } else {
        peersRef.current.forEach((peer) => {
          peer.peer.send(JSON.stringify({ userId, type: "camera_off" }));
        });
      }
    } catch (ex) {console.log("Error on sending action", ex)}

    stream.toggleVideo();
    // setCameraMuted(!cameraMuted);
    // cameraMutedRef.current = !cameraMutedRef.current;
  }

  function leave() {
    router.push("/interviews/room/left");
  }

  function closeRoom() {
    fetch(`http://localhost:3000/api/interviews/closeRoom/${roomId}`, {
      method: "POST",
    });
  }

  return (
    <>
      <CloseInterviewModal
        closeMethod={closeRoom}
        openModal={confirmCloseModalOpen}
        setOpenModal={setConfirmCloseModalOpen}
      />
      <UsersModal
        roomId={roomId}
        peers={peers}
        streams={remoteStreams}
        openModal={usersModalOpen}
        setOpenModal={setUsersModalOpen}
      />
      <div className="group relative m-auto h-[50vh] w-[80vw] rounded-t-lg bg-white">
        <div className="relative grid h-full w-full grid-cols-3 gap-2 p-3">
          <div className="relative self-center overflow-hidden rounded-xl">
            <video
              className="w-full"
              playsInline
              autoPlay
              ref={myVideoRef}
              muted={true}
            />
            <div className="absolute bottom-0 flex w-full justify-between bg-black bg-opacity-[0.70] px-3 py-1 text-white">
              <div className="w-1/2">Myself</div>

              <div className="flex gap-5">
                {stream.muted && <MicOffIcon />}
                {!stream.visible && <VideoOffIcon />}
              </div>
            </div>
          </div>

          {peers.map((peer) => {
            return (
              <Video
                key={peer.peerID}
                data={peer}
                remoteStream={remoteStreams[peer.peerID]}
              />
            );
          })}
        </div>
        {participantData.isRoomModerator && (
          <div className="absolute inset-x-0 top-3 mx-auto flex w-[30%] justify-around rounded-lg bg-black bg-opacity-[0.42] text-white opacity-[0] transition-all duration-300 group-hover:opacity-[1]">
            <button
              onClick={() => setUsersModalOpen(true)}
              className="m-3 inline-flex gap-2 rounded-2xl bg-red-600 p-3 transition-all hover:cursor-pointer hover:bg-red-500"
            >
              Users <UsersIcon />
            </button>
            <button
              onClick={() => setConfirmCloseModalOpen(true)}
              className="m-3 inline-flex gap-2 rounded-2xl bg-red-600 p-3 transition-all hover:cursor-pointer hover:bg-red-500"
            >
              Close Interview <X />
            </button>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-3 mx-auto flex w-[30%] justify-around rounded-lg bg-black bg-opacity-[0.42] text-white opacity-[0] transition-all duration-300 group-hover:opacity-[1]">
          <button
            onClick={muteMic}
            className="m-3 rounded-full bg-gray-800 p-3 transition-all hover:cursor-pointer hover:bg-gray-600"
          >
            {stream.muted ? <MicOffIcon /> : <MicIcon />}
          </button>
          <button
            onClick={muteCam}
            className="m-3 rounded-full bg-gray-800 p-3 transition-all hover:cursor-pointer hover:bg-gray-600"
          >
            {!stream.visible ? <CameraOffIcon /> : <CameraIcon />}
          </button>
          <button
            onClick={leave}
            className="m-3 rounded-full bg-gray-800 p-3 transition-all hover:cursor-pointer hover:bg-gray-600"
          >
            <ArrowRightIcon />
          </button>
        </div>
      </div>
    </>
  );
};

export default VideoBox;
