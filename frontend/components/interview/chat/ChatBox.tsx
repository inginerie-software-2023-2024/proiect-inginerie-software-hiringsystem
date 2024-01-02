import SocketContext from "@/context/SocketProvider";
import useInterview from "@/hooks/useInterview";
import TextMessage from "./TextMessage";
import { useRef, useEffect, useState, useContext } from "react";
import { SendIcon, UploadIcon } from "lucide-react";

const Messages = ({ chatMessages, messagesEnd, userData }) => {
  return (
    <>
      {chatMessages.map((msg, index) => (
        <TextMessage
          key={index}
          message={msg}
          direction={msg.user_id === userData.userId ? "outgoing" : "incoming"}
        />
      ))}
      <div ref={messagesEnd} />
    </>
  );
};

const Footer = ({ newMessageText, addNewMessage }) => {
  return (
    <div className="flex border-t-2">
      <textarea
        type="text"
        className="flex-1 resize-none rounded-none border-none"
        placeholder="Type something..."
        ref={newMessageText}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey && newMessageText !== "") {
            e.preventDefault();
            addNewMessage(newMessageText.current.value);
            newMessageText.current.value = "";
          }
        }}
      />
      <button className="border-x-2 bg-white p-5">
        <UploadIcon />
      </button>
      <button
        onClick={() => {
          addNewMessage(newMessageText.current.value);
          newMessageText.current.value = "";
        }}
        className="bg-white p-5"
      >
        <SendIcon />
      </button>
    </div>
  );
};

const ChatBox = () => {
  const messagesEnd = useRef(null);
  const newMessageText = useRef("");
  const [chatMessages, setChatMessages] = useState([]);
  const {
    interviewId: roomId,
    interviewData: { participantInfo: userData },
  } = useInterview();
  const { stompClient, connected } = useContext(SocketContext);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  useEffect(() => {
    if (!connected || !stompClient) return;

    stompClient.subscribe(`/interview/room/chat/${roomId}`, onMessageReceived);
    userJoin();
  }, [connected]);

  const userJoin = () => {
    const chatMessage = {
      user_id: userData.userId,
      sender_full_name: `${userData.firstName} ${userData.lastName}`,
      sender_email: userData.primaryEmail,
      message: "Has joined the interview room",
      message_type: "JOIN",
    };

    stompClient!.publish({
      destination: `/api/v1/sockets/interview/room/chat/message/${roomId}`,
      body: JSON.stringify(chatMessage),
      skipContentLengthHeader: true,
    });
  };

  const addNewMessage = (text) => {
    const chatMessage = {
      user_id: userData.userId,
      sender_full_name: `${userData.firstName} ${userData.lastName}`,
      sender_email: userData.primaryEmail,
      message: text,
      message_type: "MESSAGE",
    };

    stompClient!.publish({
      destination: `/api/v1/sockets/interview/room/chat/message/${roomId}`,
      body: JSON.stringify(chatMessage),
      skipContentLengthHeader: true,
    });
  };

  const onMessageReceived = (message) => {
    const payloadData = JSON.parse(message.body);
    setChatMessages((prevMessages) => [...prevMessages, payloadData]);
  };

  const scrollToBottom = () => {
    messagesEnd.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative m-auto flex h-[50vh] w-[90vw] flex-col rounded bg-white shadow-xl">
      <div className="flex max-h-full w-full flex-1 flex-col overflow-y-auto p-5">
        <Messages
          chatMessages={chatMessages}
          messagesEnd={messagesEnd}
          userData={userData}
        />
      </div>
      <Footer newMessageText={newMessageText} addNewMessage={addNewMessage} />
    </div>
  );
};

export default ChatBox;
