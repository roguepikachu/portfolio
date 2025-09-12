// Blog post card component style classes

export const blogPostCardStyles = {
  card: {
    wrapper: "group relative overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg",
    link: "absolute inset-0 z-10",
    content: "p-6",
    
    badges: {
      wrapper: "mb-3 flex items-center gap-2",
      pinned: "inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary",
      new: "inline-flex items-center rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-semibold text-green-600 dark:text-green-400",
      icon: "mr-1 h-3 w-3"
    },
    
    title: "mb-2 text-xl font-bold group-hover:text-primary",
    excerpt: "mb-4 line-clamp-2 text-sm text-muted-foreground",
    
    tags: {
      wrapper: "mb-4 flex flex-wrap gap-2",
      tag: "rounded-full border px-2.5 py-0.5 text-xs"
    },
    
    footer: {
      wrapper: "flex items-center justify-between text-xs text-muted-foreground",
      author: "flex items-center gap-2",
      avatar: "h-6 w-6 rounded-full",
      avatarFallback: "text-xs",
      
      meta: {
        wrapper: "flex items-center gap-3",
        date: "",
        readTime: "flex items-center gap-1",
        icon: "h-3 w-3"
      }
    }
  }
};