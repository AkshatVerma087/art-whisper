import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ChatHeaderProps {
  onClearChat: () => void;
  selectedModel: string;
  onModelChange: (model: string) => void;
  availableModels: Array<{id: string, name: string}>;
}

const ChatHeader = ({ 
  onClearChat,
  selectedModel,
  onModelChange,
  availableModels 
}: ChatHeaderProps) => {
  return (
    <div className="flex justify-between items-center px-4 py-3 glass-morphism mb-4 rounded-lg">
      <h2 className="text-xl font-semibold text-gradient">Art History Tutor</h2>
      <div className="flex items-center gap-2">
        <Select value={selectedModel} onValueChange={onModelChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select model" />
          </SelectTrigger>
          <SelectContent>
            {availableModels.map((model) => (
              <SelectItem key={model.id} value={model.id}>
                {model.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClearChat}
          title="Clear chat"
        >
          <Trash2 size={18} />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
