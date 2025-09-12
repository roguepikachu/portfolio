// BlogPost page style classes

export const blogPostStyles = {
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
    wrapper: "",
    
    header: {
      wrapper: "mb-8",
      badges: "mb-4 flex flex-wrap gap-2",
      badge: {
        pinned: "inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary",
        new: "inline-flex items-center rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-600 dark:text-green-400",
        icon: "mr-1 h-3 w-3"
      },
      title: "mb-2 text-3xl font-bold tracking-tight sm:text-4xl",
      meta: {
        wrapper: "flex flex-wrap items-center gap-4 text-sm text-muted-foreground",
        author: "flex items-center gap-2",
        avatar: "h-8 w-8 rounded-full bg-primary/10",
        avatarFallback: "text-xs",
        date: "",
        readTime: "flex items-center gap-1",
        icon: "h-3 w-3"
      },
      tags: {
        wrapper: "mt-4 flex flex-wrap gap-2",
        tag: "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs"
      }
    },
    
    content: {
      wrapper: "prose prose-gray dark:prose-invert max-w-none",
      styles: `
        prose-headings:scroll-mt-20
        prose-h1:text-3xl
        prose-h2:text-2xl
        prose-h3:text-xl
        prose-a:text-primary
        prose-a:no-underline
        prose-a:hover:underline
        prose-img:rounded-lg
        prose-pre:bg-muted
        prose-code:rounded
        prose-code:bg-muted
        prose-code:px-1
        prose-code:py-0.5
        prose-code:before:content-['']
        prose-code:after:content-['']
      `
    }
  },

  // Share section
  share: {
    wrapper: "my-8 border-y py-6",
    label: "mb-3 text-sm font-medium",
    buttons: "flex flex-wrap gap-3",
    button: "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm hover:bg-muted",
    icon: "h-4 w-4",
    copyButton: {
      base: "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm",
      default: "hover:bg-muted",
      copied: "border-green-500 bg-green-500/10 text-green-600 dark:text-green-400"
    }
  },

  // Voting section
  voting: {
    wrapper: "my-8 flex justify-center"
  },

  // Navigation
  navigation: {
    wrapper: "my-12 grid gap-4 sm:grid-cols-2",
    link: {
      wrapper: "group relative overflow-hidden rounded-lg border p-4 hover:shadow-md",
      label: "text-xs text-muted-foreground",
      title: "mt-1 font-semibold group-hover:text-primary"
    }
  },

  // Related posts
  related: {
    wrapper: "my-12",
    title: "mb-6 text-2xl font-bold",
    grid: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
  },

  // Comments
  comments: {
    wrapper: "my-12"
  }
};