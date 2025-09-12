// Project detail page style classes

export const projectStyles = {
  // Loading state
  loading: {
    container: "container px-4 py-12 md:px-6 md:py-16 lg:py-24",
    wrapper: "mx-auto max-w-4xl",
    content: "flex flex-col items-center justify-center space-y-6",
    iconWrapper: "relative",
    icon: "h-16 w-16 text-primary animate-pulse",
    textWrapper: "text-center space-y-2",
    title: "text-2xl font-semibold",
    message: "text-muted-foreground"
  },

  // Error state
  error: {
    container: "container px-4 py-12 md:px-6 md:py-16 lg:py-24",
    wrapper: "mx-auto max-w-4xl text-center",
    title: "text-2xl font-bold",
    link: "mt-4 inline-flex items-center text-primary hover:underline",
    icon: "ml-2 h-4 w-4"
  },

  // Main container
  container: "container px-4 py-8 md:px-6",
  wrapper: "mx-auto max-w-4xl",
  
  // Back link
  backLink: "mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground",
  backIcon: "mr-2 h-4 w-4",
  
  // Article
  article: {
    header: {
      wrapper: "mb-8 space-y-4",
      badge: "inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary",
      badgeIcon: "mr-1 h-3 w-3",
      title: "text-3xl font-bold tracking-tight sm:text-4xl",
      description: "text-lg text-muted-foreground",
      
      tags: {
        wrapper: "flex flex-wrap gap-2",
        tag: "rounded-full border px-2.5 py-0.5 text-xs"
      },
      
      actions: {
        wrapper: "flex flex-wrap gap-3",
        button: "inline-flex items-center",
        icon: "mr-2 h-4 w-4"
      }
    },
    
    content: {
      wrapper: "space-y-6",
      
      section: {
        wrapper: "rounded-lg bg-muted/30 p-6",
        title: "mb-3 text-xl font-semibold",
        content: "space-y-4 text-muted-foreground"
      },
      
      features: {
        title: "mb-4 text-xl font-semibold",
        list: "list-inside list-disc space-y-2 text-muted-foreground"
      },
      
      technologies: {
        title: "mb-4 text-xl font-semibold",
        grid: "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4",
        item: "rounded-lg border bg-background px-3 py-2 text-center text-sm"
      },
      
      fallback: "rounded-lg bg-muted/30 p-8 text-center text-muted-foreground"
    }
  },

  // Related projects
  related: {
    wrapper: "mt-12",
    title: "mb-6 text-2xl font-bold",
    grid: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
  }
};