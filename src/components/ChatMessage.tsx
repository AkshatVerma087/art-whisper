
import { cn } from "@/lib/utils";
import React from "react";
import { CornerLeftDown, User2 } from "lucide-react";

interface ChatMessageProps {
  content: string;
  role: "user" | "assistant";
  timestamp?: string;
}

const ChatMessage = ({ content, role, timestamp }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex w-full mb-4 animate-fade-in",
        role === "user" ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "flex gap-3 max-w-[80%] items-start",
          role === "user" ? "flex-row-reverse" : "flex-row"
        )}
      >
        <div
          className={cn(
            "p-2 rounded-full flex items-center justify-center",
            role === "user"
              ? "bg-indigo-600 text-white"
              : "bg-secondary text-white"
          )}
        >
          {role === "user" ? (
            <User2 size={16} />
          ) : (
            <CornerLeftDown size={16} />
          )}
        </div>
        <div
          className={cn(
            "p-4 rounded-xl",
            role === "user"
              ? "bg-indigo-600 text-white"
              : "bg-secondary text-foreground"
          )}
        >
          <p className="whitespace-pre-wrap">{content}</p>
          {timestamp && (
            <div className="mt-1 text-xs opacity-50 text-right">{timestamp}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
