// Main navigation component style classes

export const mainNavStyles = {
  // Header
  header: "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
  
  // Container
  container: "container flex h-16 items-center px-4 md:px-6",
  
  // Logo/Brand
  brand: {
    link: "flex items-center gap-2 font-semibold",
    avatar: "h-8 w-8",
    avatarFallback: "bg-primary text-primary-foreground text-xs",
    name: "hidden sm:inline-block"
  },
  
  // Desktop Navigation
  desktop: {
    nav: "hidden md:flex md:flex-1 md:items-center md:justify-center",
    list: "flex gap-6",
    link: {
      base: "text-sm font-medium transition-colors hover:text-primary",
      inactive: "text-muted-foreground",
      active: "text-foreground"
    }
  },
  
  // Search
  search: {
    wrapper: "ml-auto mr-4 hidden lg:block",
    container: "relative w-64",
    inputWrapper: "relative",
    icon: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground",
    input: "w-full pl-10 pr-4 py-2 text-sm",
    
    // Search results dropdown
    results: {
      wrapper: "absolute top-full mt-2 w-full rounded-md border bg-popover p-2 shadow-lg",
      empty: "p-4 text-center text-sm text-muted-foreground",
      
      section: {
        wrapper: "mb-4 last:mb-0",
        title: "mb-2 px-2 text-xs font-semibold text-muted-foreground",
        list: "space-y-1",
        
        item: {
          link: "flex items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-muted",
          title: "font-medium",
          type: "text-xs text-muted-foreground"
        }
      }
    }
  },
  
  // Actions
  actions: {
    wrapper: "ml-auto flex items-center gap-2",
    contactButton: "hidden sm:inline-flex"
  },
  
  // Mobile menu
  mobile: {
    trigger: "inline-flex md:hidden",
    triggerIcon: "h-5 w-5",
    
    // Sheet/Drawer
    sheet: {
      content: "flex flex-col",
      
      header: {
        wrapper: "flex items-center gap-2 px-4 py-6 border-b",
        avatar: "h-10 w-10",
        avatarFallback: "bg-primary text-primary-foreground",
        name: "text-lg font-semibold"
      },
      
      nav: {
        wrapper: "flex-1 px-4 py-6",
        list: "space-y-4",
        link: {
          base: "flex items-center text-lg font-medium transition-colors hover:text-primary",
          inactive: "text-muted-foreground",
          active: "text-foreground"
        }
      },
      
      search: {
        wrapper: "px-4 pb-4",
        inputWrapper: "relative",
        icon: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground",
        input: "w-full pl-10 pr-4"
      },
      
      actions: {
        wrapper: "border-t px-4 py-4",
        contactButton: "w-full"
      }
    }
  }
};