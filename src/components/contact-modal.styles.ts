// Contact modal component style classes

export const contactModalStyles = {
  // Dialog content
  content: {
    wrapper: "",
    header: {
      title: "",
      description: ""
    }
  },
  
  // Contact info
  info: {
    wrapper: "space-y-4",
    
    item: {
      wrapper: "flex items-center justify-between rounded-lg border p-4",
      label: "text-sm font-medium text-muted-foreground",
      valueWrapper: "flex items-center gap-2",
      value: "font-medium",
      copyButton: "h-8 w-8",
      copyIcon: "h-4 w-4"
    }
  },
  
  // Footer
  footer: {
    wrapper: "flex justify-end",
    closeButton: ""
  }
};