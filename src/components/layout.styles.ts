// Layout component style classes

export const layoutStyles = {
  // Main layout
  layout: "min-h-screen bg-background",
  main: "flex-1",
  
  // Footer
  footer: {
    wrapper: "border-t bg-muted/50",
    container: "container px-4 py-8 md:px-6",
    content: "flex flex-col items-center justify-between gap-4 md:flex-row",
    
    copyright: "text-sm text-muted-foreground",
    
    links: {
      wrapper: "flex gap-4",
      link: "text-sm text-muted-foreground hover:text-foreground",
      icon: "h-4 w-4"
    }
  }
};