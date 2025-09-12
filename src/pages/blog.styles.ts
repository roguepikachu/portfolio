// Blog page style classes

export const blogStyles = {
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
  wrapper: "mx-auto max-w-6xl",
  
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
    
    tagFilter: {
      wrapper: "flex flex-col gap-4 sm:flex-row sm:items-center",
      label: "text-sm font-medium",
      selectWrapper: "flex-1",
      clearButton: "px-3"
    },
    
    selectedTags: {
      wrapper: "flex flex-wrap gap-2",
      label: "text-sm font-medium text-muted-foreground",
      tags: "flex flex-wrap gap-2",
      tag: "inline-flex items-center gap-1 rounded-full border bg-primary/10 px-3 py-1 text-sm",
      removeButton: "ml-1 rounded-full hover:bg-primary/20",
      removeIcon: "h-3 w-3"
    }
  },

  // Blog grid
  grid: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",

  // Empty state
  empty: {
    container: "py-12 text-center",
    icon: "mx-auto h-12 w-12 text-muted-foreground/50",
    title: "mt-4 text-lg font-semibold",
    message: "mt-2 text-sm text-muted-foreground",
    clearButton: "mt-4"
  }
};