import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeleton/MessageSkeleton";

const ChatContainer = () => {
  const { messages, getMessage, isMessageLoading, selectedUser } = useChatStore();
  useEffect(() => {
    getMessage(selectedUser._id);
  }, [selectedUser._id, getMessage]);
  if (isMessageLoading) {
    return (
      <div className="flex flex-1 flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
        /</div>
    )
  }
  return (
    <div className="flex flex-1 flex-col overflow-auto">
      <ChatHeader />

      <p>message ...</p>

      <MessageInput />
    </div>
  )
};

export default ChatContainer;
