// Home page style classes organized for better maintainability

export const homeStyles = {
  // Loading Section
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

  // Main Container
  main: "flex flex-col min-h-screen",

  // Hero Section
  hero: {
    section: "flex-1 flex items-center relative overflow-hidden",
    container: "container px-4 md:px-6 space-y-10 py-16 md:py-24",
    grid: "grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]",
    content: "flex flex-col justify-center space-y-4",
    textWrapper: "space-y-2",
    title: "text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none",
    bio: "max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400 whitespace-pre-line",
    buttons: "flex flex-col sm:flex-row gap-2",
    button: "inline-flex items-center",
    buttonIcon: "mr-2 h-4 w-4",
    imageWrapper: "flex items-center justify-center",
    // Decorative background - handled separately due to complexity
    decorativeBg: "absolute inset-0 -z-10 bg-[radial-gradient(rgba(var(--primary-rgb),0.06)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"
  },

  // Talks Section
  talks: {
    section: "py-16 bg-gradient-to-br from-primary/5 to-secondary/5",
    container: "container px-4 md:px-6",
    header: "text-center mb-12",
    title: "text-2xl font-bold tracking-tight sm:text-3xl mb-4",
    description: "text-muted-foreground max-w-2xl mx-auto",
    grid: "grid gap-8 lg:grid-cols-2 items-start",
    column: "space-y-6",
    
    // Talk Card
    card: {
      wrapper: "group cursor-pointer",
      inner: "relative overflow-hidden rounded-xl border bg-card shadow-lg hover:shadow-xl transition-all duration-300 p-6",
      badgeWrapper: "absolute top-4 right-4",
      badge: "inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary",
      content: "space-y-4",
      header: "flex items-center gap-3",
      iconCircle: "w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center",
      icon: "w-6 h-6 text-primary-foreground",
      title: "font-semibold text-lg",
      subtitle: "text-muted-foreground text-sm",
      description: "text-muted-foreground",
      videoWrapper: "aspect-video rounded-lg overflow-hidden",
      video: "w-full h-full",
      button: "w-full",
      buttonInner: "inline-flex items-center justify-center",
      buttonIcon: "ml-2 h-4 w-4"
    },
    
    // Coming Soon Card
    comingSoon: {
      card: "relative overflow-hidden rounded-xl border bg-card/50 shadow-sm p-6",
      header: "flex items-center justify-between mb-4",
      title: "font-semibold",
      badge: "inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground",
      text: "text-muted-foreground text-sm"
    }
  },

  // Blog Section
  blog: {
    section: "py-16",
    container: "container px-4 md:px-6",
    header: "flex flex-col md:flex-row justify-between items-center gap-4 mb-10",
    titleWrapper: "",
    title: "text-2xl font-bold tracking-tight sm:text-3xl",
    description: "text-muted-foreground",
    viewAllButton: "inline-flex items-center",
    viewAllIcon: "ml-2 h-4 w-4",
    grid: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
  },

  // Publications Section
  publications: {
    section: "py-16 bg-muted/30",
    container: "container px-4 md:px-6",
    header: "flex flex-col md:flex-row justify-between items-center gap-4 mb-10",
    titleWrapper: "",
    title: "text-2xl font-bold tracking-tight sm:text-3xl",
    description: "text-muted-foreground",
    viewAllButton: "inline-flex items-center",
    viewAllIcon: "ml-2 h-4 w-4",
    grid: "grid grid-cols-1 md:grid-cols-2 gap-6"
  },

  // Projects Section
  projects: {
    section: "bg-muted/50 py-16",
    container: "container px-4 md:px-6",
    header: "flex flex-col md:flex-row justify-between items-center gap-4 mb-10",
    titleWrapper: "",
    title: "text-2xl font-bold tracking-tight sm:text-3xl",
    description: "text-muted-foreground",
    viewAllButton: "inline-flex items-center",
    viewAllIcon: "ml-2 h-4 w-4",
    grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
    
    // Project Card
    card: {
      wrapper: "group rounded-lg border bg-card shadow-sm hover:shadow-md",
      inner: "p-6 flex flex-col h-full",
      badge: "inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary mb-4 self-start",
      title: "text-xl font-bold mb-2 hover:text-primary",
      description: "text-muted-foreground text-sm flex-grow",
      tags: "mt-4 flex flex-wrap gap-2",
      tag: "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
      actions: "flex items-center gap-3 mt-4 pt-4 border-t",
      actionIcon: "mr-1 h-3 w-3"
    }
  }
};