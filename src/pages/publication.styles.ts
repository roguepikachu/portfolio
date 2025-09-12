// Publication detail page style classes

export const publicationStyles = {
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
      
      authors: "text-lg text-muted-foreground",
      
      meta: {
        wrapper: "flex flex-wrap gap-4 text-sm text-muted-foreground",
        item: "flex items-center gap-1",
        icon: "h-4 w-4"
      },
      
      tags: {
        wrapper: "flex flex-wrap gap-2",
        tag: "rounded-full border px-2.5 py-0.5 text-xs"
      }
    },
    
    content: {
      abstract: {
        wrapper: "mb-8 rounded-lg bg-muted/50 p-6",
        title: "mb-3 text-lg font-semibold",
        text: "text-muted-foreground"
      },
      
      actions: {
        wrapper: "mb-8 flex flex-wrap gap-3",
        button: "inline-flex items-center",
        icon: "mr-2 h-4 w-4"
      },
      
      fallback: "rounded-lg bg-muted/30 p-8 text-center text-muted-foreground"
    }
  },

  // Related publications
  related: {
    wrapper: "mt-12",
    title: "mb-6 text-2xl font-bold",
    grid: "grid gap-6 md:grid-cols-2"
  }
};