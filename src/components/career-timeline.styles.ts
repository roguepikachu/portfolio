// Career timeline component style classes

export const careerTimelineStyles = {
  container: "space-y-8",
  
  header: {
    wrapper: "text-center mb-8",
    title: "text-2xl font-bold"
  },
  
  timeline: {
    wrapper: "relative",
    line: "absolute left-8 top-0 bottom-0 w-0.5 bg-border",
    
    item: {
      wrapper: "relative flex gap-6 pb-8 last:pb-0",
      
      marker: {
        wrapper: "relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-4 border-background",
        default: "bg-muted",
        milestone: "bg-primary",
        icon: "h-6 w-6",
        defaultIcon: "text-muted-foreground",
        milestoneIcon: "text-primary-foreground"
      },
      
      content: {
        wrapper: "flex-1 space-y-4",
        
        header: {
          wrapper: "space-y-1",
          period: "text-sm text-muted-foreground",
          title: "text-xl font-bold",
          company: "text-muted-foreground"
        },
        
        description: "text-muted-foreground",
        
        role: {
          wrapper: "rounded-lg border bg-card p-4 space-y-3",
          header: {
            wrapper: "flex items-start justify-between",
            titleWrapper: "",
            title: "font-semibold",
            period: "text-sm text-muted-foreground",
            badge: "text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full"
          },
          
          achievements: {
            wrapper: "space-y-2",
            title: "text-sm font-medium",
            list: "list-disc list-inside space-y-1 text-sm text-muted-foreground"
          },
          
          responsibilities: {
            wrapper: "space-y-2",
            title: "text-sm font-medium",
            list: "list-disc list-inside space-y-1 text-sm text-muted-foreground"
          },
          
          milestones: {
            wrapper: "flex flex-wrap gap-2",
            title: "text-sm font-medium mb-2",
            badge: "inline-flex items-center rounded-full bg-secondary/20 px-2.5 py-0.5 text-xs"
          }
        }
      }
    }
  }
};