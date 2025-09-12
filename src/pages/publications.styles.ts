// Publications page style classes

export const publicationsStyles = {
  // Loading state
  loading: {
    container: "container px-4 py-12 md:px-6 md:py-16 lg:py-24",
    wrapper: "mx-auto max-w-5xl",
    content: "flex flex-col items-center justify-center space-y-6",
    iconWrapper: "relative",
    icon: "h-16 w-16 text-primary animate-pulse",
    textWrapper: "text-center space-y-2",
    title: "text-2xl font-semibold",
    message: "text-muted-foreground"
  },

  // Main container
  container: "container px-4 py-12 md:px-6 md:py-16 lg:py-24",
  
  // Header
  header: {
    wrapper: "mb-10 text-center",
    title: "text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl",
    description: "mx-auto mt-3 max-w-2xl text-muted-foreground sm:text-lg"
  },

  // Search and filters
  filters: {
    wrapper: "mb-8 space-y-4",
    searchWrapper: "relative",
    searchIcon: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground",
    searchInput: "w-full pl-10 pr-10",
    clearButton: "absolute right-2 top-1/2 -translate-y-1/2",
    clearIcon: "h-4 w-4",
    
    filterGroup: {
      wrapper: "grid gap-4 md:grid-cols-2",
      
      tagFilter: {
        wrapper: "flex items-center gap-2",
        label: "text-sm font-medium whitespace-nowrap",
        selectWrapper: "flex-1",
        clearButton: ""
      },
      
      yearFilter: {
        wrapper: "flex items-center gap-2",
        label: "text-sm font-medium whitespace-nowrap",
        selectWrapper: "flex-1",
        clearButton: ""
      }
    },
    
    activeFilters: {
      wrapper: "flex flex-wrap items-center gap-2",
      tag: "inline-flex items-center gap-1 rounded-full border bg-primary/10 px-3 py-1 text-sm",
      removeButton: "ml-1 rounded-full hover:bg-primary/20",
      removeIcon: "h-3 w-3"
    }
  },

  // Publications grid
  grid: {
    container: "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
    
    card: {
      wrapper: "group relative overflow-hidden rounded-lg border bg-card p-6 transition-all hover:shadow-lg",
      link: "absolute inset-0 z-10",
      badge: "mb-3 inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary",
      title: "mb-2 text-lg font-bold group-hover:text-primary",
      
      authors: {
        wrapper: "mb-2 text-sm text-muted-foreground",
        list: "line-clamp-1"
      },
      
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
        wrapper: "relative z-20 flex items-center gap-2",
        button: "",
        icon: "mr-1 h-3 w-3"
      }
    }
  },

  // Empty state
  empty: {
    container: "py-12 text-center",
    icon: "mx-auto h-12 w-12 text-muted-foreground/50",
    title: "mt-4 text-lg font-semibold",
    message: "mt-2 text-sm text-muted-foreground",
    button: "mt-4"
  }
};