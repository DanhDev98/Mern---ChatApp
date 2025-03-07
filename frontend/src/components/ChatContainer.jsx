import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeleton/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";

const ChatContainer = () => {
  const { messages, getMessage, isMessageLoading, selectedUser ,listenToMessage, unListenToMessage } =
    useChatStore();

  const { authUser } = useAuthStore();
  const messagesEndRef = useRef(null);
  const getFormattedTime = (dateString) => {
    const now = new Date(dateString);
    const hours = now.getHours().toString().padStart(2, "0"); // Lấy giờ và thêm số 0 nếu chỉ có 1 chữ số
    const minutes = now.getMinutes().toString().padStart(2, "0"); // Lấy phút và thêm số 0 nếu chỉ có 1 chữ số
    return `${hours}:${minutes}`;
  };
  useEffect(() => {
    getMessage(selectedUser._id);
    listenToMessage();
    return () => {
      unListenToMessage();
    };
  }, [selectedUser._id, getMessage, listenToMessage, unListenToMessage]);

  useEffect(() => {
    if(messagesEndRef.current && messages ){
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  if (isMessageLoading) {
    return (
      <div className="flex flex-1 flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />/
      </div>
    );
  }
  return (
    <div className="flex flex-1 flex-col overflow-auto relative">
      <ChatHeader />

      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((message) => (
          <div
            ref={messagesEndRef}
            key={message._id}
            className={`chat ${
              message.senderId === authUser._id ? "chat-end" : "chat-start"
            } `
          }
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.image || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic "
                />
              </div>
            </div>

            <div className="chat-header">
              <time className="text-xs opacity-50">
                {getFormattedTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble mt-1">
              {message.image && (
                <img
                  src={message.image}
                  alt="message"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && (
                <p className="flex items-center justify-end">{message.text}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
