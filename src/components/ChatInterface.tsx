import { useToast } from "@/hooks/use-toast";
import React, { useState } from "react";
import ChatHeader from "./chat/ChatHeader";
import MessageList from "./chat/MessageList";
import ChatForm from "./chat/ChatForm";
import { sendChatRequest } from "../services/chatServiceWithMessage";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
}

const AVAILABLE_MODELS = [
  { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo" },
  { id: "anthropic/claude-3-haiku", name: "Claude 3 Haiku" },
  { id: "meta-llama/llama-3-8b-instruct", name: "Llama 3 8B" },
  { id: "google/gemini-flash-1.5", name: "Gemini 1.5 Flash" },
  { id: "mistralai/mistral-7b-instruct", name: "Mistral 7B" }
];

interface ChatInterfaceProps {}

const ChatInterface = ({}: ChatInterfaceProps) => {
  const [selectedModel, setSelectedModel] = useState(AVAILABLE_MODELS[0].id);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI Art History tutor. You can ask me about art movements, famous artists, iconic artworks, or any specific art history topic you're curious about!"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async (userMessage: string) => {
    const newUserMessage: Message = {
      role: "user",
      content: userMessage,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);
    
    try {
      const apiMessages: Message[] = [
        {
          role: "system",
          content: "You are an expert art history tutor. Only respond to questions about art history, including movements, artists, and artworks. Provide accurate, educational, and engaging responses, including relevant historical context and cultural significance."
        },
        ...messages.map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        {
          role: "user",
          content: userMessage
        }
      ] as Message[];
      
      const data = await sendChatRequest(apiMessages, selectedModel);
      const assistantResponse = data.choices[0].message.content;
      
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: assistantResponse,
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
    } catch (error) {
      console.error("Error calling OpenRouter API:", error);
      
      let errorMessage = "Failed to get response.\n";
      if (error instanceof Error) {
        errorMessage += `Error: ${error.message}\n\n`;
        errorMessage += "Troubleshooting Steps:\n";
        
        if (error.message.includes("401")) {
          errorMessage += "1. Check your .env file has VITE_OPENROUTER_API_KEY\n";
          errorMessage += "2. Verify the key at https://openrouter.ai/keys\n";
          errorMessage += "3. Restart your development server after changes";
        } 
        else if (error.message.includes("400")) {
          errorMessage += "1. The API request was malformed\n";
          errorMessage += "2. Please contact support with this error message";
        }
        else if (error.message.includes("402")) {
          errorMessage += "1. Add credits at https://openrouter.ai/account\n";
          errorMessage += "2. Some free models require minimal credits";
        }
        else {
          errorMessage += "1. Check your internet connection\n";
          errorMessage += "2. Try again later\n";
          errorMessage += "3. Contact support if problem continues";
        }
      } else {
        errorMessage += "Unknown error occurred. Please try again.";
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: errorMessage,
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "Chat cleared! I'm your AI Art History tutor. How can I help you today?"
      }
    ]);
  };

  return (
    <div className="flex flex-col h-full max-h-[90vh]">
      <ChatHeader 
        onClearChat={handleClearChat}
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
        availableModels={AVAILABLE_MODELS}
      />
      <MessageList messages={messages} isLoading={isLoading} />
      <ChatForm onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatInterface;
