const FileAttachment = ({ direction, fileId, fullName, fileName }) => {
  return (
    <div
      className={`${
        direction === "outgoing"
          ? "self-end text-right"
          : "self-start text-left"
      } mb-[40px] flex max-w-[60%] flex-col`}
    >
      <div>{fullName}</div>
      <div
        className={`${
          direction === "incoming" ? "bg-gray-200" : "bg-blue-2"
        } rounded-2xl p-4 shadow`}
      >
        {fileName} {fileId}
      </div>
    </div>
  );
};

const TextMessage = ({ direction, message }) => {
  if (message.message_type === "JOIN") {
    return (
      <div className="mb-[40px] inline-block self-center rounded-[8px] bg-blue-2 p-[1rem] shadow-lg">
        {message.sender_full_name} has joined the interview room!
      </div>
    );
  }

  if (message.message_type === "LEAVE") {
    return (
      <div className="mb-[40px] inline-block self-center rounded-[8px] bg-blue-2 p-[1rem] shadow-lg">
        {message.sender_full_name} has left the interview room!
      </div>
    );
  }

  if (message.message_type === "FILE_ATTACHMENT") {
    return (
      <FileAttachment
        direction={direction}
        fileId={message.file_id}
        fullName={message.sender_full_name}
        fileName={message.message}
      />
    );
  }

  return (
    <div
      className={`${
        direction === "outgoing"
          ? "self-end text-right"
          : "self-start text-left"
      } mb-[40px] flex max-w-[60%] flex-col`}
    >
      <div>{message.sender_full_name}</div>
      <div
        className={`${
          direction === "incoming" ? "bg-gray-200" : "bg-blue-2"
        } rounded-2xl p-4 shadow`}
      >
        {message.message}
      </div>
    </div>
  );
};

export default TextMessage;
