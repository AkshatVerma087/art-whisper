
import { cn } from "@/lib/utils";
import React from "react";

interface LoadingDotsProps {
  className?: string;
}

const LoadingDots = ({ className }: LoadingDotsProps) => {
  return (
    <div className={cn("flex space-x-1 items-center", className)}>
      <div className="w-2 h-2 rounded-full bg-current animate-pulse"></div>
      <div className="w-2 h-2 rounded-full bg-current animate-pulse" style={{ animationDelay: "0.2s" }}></div>
      <div className="w-2 h-2 rounded-full bg-current animate-pulse" style={{ animationDelay: "0.4s" }}></div>
    </div>
  );
};

export default LoadingDots;
