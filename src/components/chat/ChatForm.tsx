import React, { useState } from "react";
import { Button, Input } from "../ui/ConsolidatedUI";
import { SendHorizontal } from "lucide-react";

interface ChatFormProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatForm = ({ onSendMessage, isLoading }: ChatFormProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    onSendMessage(input.trim());
    setInput("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="px-4 py-3 glass-morphism mt-4 rounded-lg flex gap-2"
    >
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask about art history..."
        className="bg-background/50 border-white/10"
        disabled={isLoading}
      />
      <Button
        type="submit"
        size="icon"
        disabled={isLoading || !input.trim()}
        className={!input.trim() ? "opacity-50 cursor-not-allowed" : ""}
      >
        <SendHorizontal size={18} />
      </Button>
    </form>
  );
};

export default ChatForm;
