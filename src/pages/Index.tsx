import { Brush, Palette, Framer } from "lucide-react";
import ChatInterface from "../components/ChatInterface";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <header className="container px-4 py-6">
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="h-10 w-10 rounded-lg glass-morphism flex items-center justify-center">
            <Palette className="text-indigo-400" />
          </div>
          <h1 className="text-3xl font-bold text-gradient">Art Whisper</h1>
        </div>
      </header>

      <main className="container flex-1 p-4 max-w-4xl mx-auto w-full">
        <ChatInterface />
      </main>

      <footer className="container py-6 text-center text-gray-500 text-sm">
        <p>© 2025 Art Whisper - AI Art History Tutor</p>
      </footer>
    </div>
  );
};

export default Index;
