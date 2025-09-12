// Publication card component style classes

export const publicationCardStyles = {
  card: {
    wrapper: "group relative rounded-lg border bg-card p-6 transition-all hover:shadow-lg",
    
    header: {
      wrapper: "mb-3 flex items-start justify-between",
      title: "text-lg font-bold group-hover:text-primary",
      badge: "inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary"
    },
    
    authors: "mb-2 text-sm text-muted-foreground line-clamp-1",
    
    meta: {
      wrapper: "mb-3 flex flex-wrap gap-2 text-xs text-muted-foreground",
      conference: "font-medium",
      year: ""
    },
    
    abstract: "mb-4 line-clamp-3 text-sm text-muted-foreground",
    
    tags: {
      wrapper: "mb-4 flex flex-wrap gap-2",
      tag: "rounded-full border px-2.5 py-0.5 text-xs"
    },
    
    actions: {
      wrapper: "flex items-center gap-2",
      button: "",
      icon: "mr-1 h-3 w-3"
    }
  }
};