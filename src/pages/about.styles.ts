// About page style classes organized for better maintainability

export const aboutStyles = {
  // Main Container
  container: "container px-4 py-12 md:px-6 md:py-16 lg:py-24",
  wrapper: "mx-auto max-w-4xl",
  
  // Header Section
  header: {
    wrapper: "space-y-2 text-center",
    title: "text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl",
    subtitle: "mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400"
  },
  
  // Profile Section
  profile: {
    grid: "mt-12 grid gap-8 md:grid-cols-2 md:items-start",
    imageWrapper: "aspect-square overflow-hidden rounded-xl border",
    imageContainer: "h-full w-full flex items-center justify-center bg-muted",
    imageContent: "flex items-center justify-center h-full w-full bg-gradient-to-br from-primary/20 to-secondary text-6xl font-bold text-primary",
    contentWrapper: "flex flex-col justify-center",
    name: "text-2xl font-bold",
    bio: "mt-4 text-muted-foreground whitespace-pre-line",
    buttons: "mt-6 flex flex-wrap gap-3",
    buttonIcon: "mr-2 h-4 w-4"
  },
  
  // Section Separator
  separator: "my-12",
  
  // Tech Stack Section
  techStack: {
    section: "space-y-8",
    title: "text-2xl font-bold",
    grid: "grid gap-6 sm:grid-cols-2 md:grid-cols-3",
    card: "rounded-lg border p-6",
    cardTitle: "font-bold text-lg mb-4",
    badges: "flex flex-wrap gap-2"
  },
  
  // Education Section
  education: {
    section: "space-y-8",
    title: "text-2xl font-bold",
    card: "rounded-lg border p-6",
    cardHeader: "flex flex-wrap items-start justify-between gap-2",
    degree: "font-bold",
    institution: "text-muted-foreground",
    period: "",
    description: "mt-4 text-muted-foreground"
  },
  
  // Open Source Section
  openSource: {
    section: "space-y-8",
    title: "text-2xl font-bold",
    grid: "grid gap-6 sm:grid-cols-2",
    card: "rounded-lg border p-6",
    cardTitle: "font-bold text-lg",
    cardDescription: "mt-2 text-muted-foreground",
    link: "inline-flex items-center",
    linkIcon: "ml-1 h-3 w-3"
  }
};