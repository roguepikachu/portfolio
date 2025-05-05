
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

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
    <Loader2
      className={cn(
        "animate-spin text-primary", 
        className
      )} 
      size={size} 
      color={color}
    />
  );
}
