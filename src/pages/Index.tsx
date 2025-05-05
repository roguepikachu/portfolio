
import { Button } from "@/components/ui/button";
import { ContentLoader } from "@/components/ui/content-loader";
import { useState, useEffect } from "react";

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for demo purposes
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <ContentLoader message="Loading the latest Lovable features..." />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-2xl px-4">
        <div className="mb-8">
          <div className="relative inline-block">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary via-secondary to-primary opacity-75 blur-lg"></div>
            <div className="relative bg-background rounded-full p-4 border">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Welcome to Your Lovable App</h1>
        <p className="text-xl text-foreground/80 mb-8">Start building your amazing project with the latest Lovable features!</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button size="lg" variant="default">Get Started</Button>
          <Button size="lg" variant="outline">Learn More</Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
