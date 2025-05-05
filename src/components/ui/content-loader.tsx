
import { LoadingSpinner } from "./loading-spinner";

interface ContentLoaderProps {
  message?: string;
}

export function ContentLoader({ message = "Loading content..." }: ContentLoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8 animate-fade-in">
      <LoadingSpinner size={32} className="text-primary" />
      <p className="text-muted-foreground text-base">{message}</p>
    </div>
  );
}
