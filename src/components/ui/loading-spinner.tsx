
import { cn } from "@/lib/utils";
import { RefreshCw } from "lucide-react";

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
  color?: string;
}

export function LoadingSpinner({ 
  size = 24, 
  className, 
  color 
}: LoadingSpinnerProps) {
  return (
    <RefreshCw 
      className={cn(
        "animate-spin text-primary", 
        className
      )} 
      size={size} 
      color={color}
    />
  );
}
