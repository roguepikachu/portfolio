
import { LoadingSpinner } from "./loading-spinner";

interface ContentLoaderProps {
  message?: string;
}

export function ContentLoader({ message = "Loading content..." }: ContentLoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8 animate-fade-in">
      <div className="relative">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 blur-sm animate-pulse"></div>
        <div className="relative bg-background rounded-full p-2">
          <LoadingSpinner size={32} className="text-primary" />
        </div>
      </div>
      <p className="text-muted-foreground text-base font-medium">{message}</p>
    </div>
  );
}
