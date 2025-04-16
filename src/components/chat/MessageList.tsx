
import React, { useRef, useEffect } from "react";
import ChatMessage from "../ChatMessage";
import LoadingDots from "../LoadingDots";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
}

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

const MessageList = ({ messages, isLoading }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto chat-scrollbar px-4 pb-4">
      {messages.map((message, index) => (
        <ChatMessage
          key={index}
          role={message.role}
          content={message.content}
          timestamp={message.timestamp}
        />
      ))}
      {isLoading && (
        <div className="flex w-full mb-4">
          <div className="flex gap-3 max-w-[80%]">
            <div className="p-2 rounded-full bg-secondary flex items-center justify-center">
              <LoadingDots />
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
