
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle, Key, Link } from "lucide-react";

interface ApiKeyFormProps {
  onApiKeySubmit: (apiKey: string) => void;
}

const ApiKeyForm = ({ onApiKeySubmit }: ApiKeyFormProps) => {
  const [apiKey, setApiKey] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid API key",
        variant: "destructive",
      });
      return;
    }
    
    localStorage.setItem("openrouter_api_key", apiKey.trim());
    onApiKeySubmit(apiKey.trim());
    
    toast({
      title: "Success",
      description: "OpenRouter API key has been saved",
    });
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 glass-morphism rounded-xl">
      <div className="flex flex-col items-center gap-4 mb-6">
        <div className="h-12 w-12 rounded-full glass-morphism flex items-center justify-center">
          <Key size={24} className="text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gradient">Enter OpenRouter API Key</h2>
        <p className="text-sm text-center text-muted-foreground">
          Your API key will be stored locally and never sent to our servers.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="password"
          placeholder="Enter your OpenRouter API key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="bg-background/50 border-white/10"
        />
        <Button type="submit" className="w-full">
          Save API Key
        </Button>
      </form>

      <div className="mt-6 p-4 bg-amber-900/30 border border-amber-500/30 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertCircle size={20} className="text-amber-500 mt-0.5 shrink-0" />
          <div>
            <h3 className="font-medium text-amber-500 mb-1">Important Note</h3>
            <p className="text-sm text-amber-300/80 mb-2">
              Make sure your OpenRouter API key has sufficient credits. Ensure you have a positive balance in your account.
            </p>
            <a 
              href="https://openrouter.ai/account" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs flex items-center gap-1 text-amber-400 hover:text-amber-300 transition-colors"
            >
              <Link size={12} /> Check your OpenRouter account balance
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyForm;
