// Profile slideshow component style classes

export const profileSlideshowStyles = {
  container: "relative w-full max-w-md",
  
  slideshow: {
    wrapper: "relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20",
    
    slide: {
      base: "absolute inset-0 transition-opacity duration-1000",
      active: "opacity-100",
      inactive: "opacity-0"
    },
    
    image: "h-full w-full object-cover",
    
    overlay: {
      wrapper: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent",
      
      caption: {
        wrapper: "absolute bottom-0 left-0 right-0 p-6 text-white",
        text: "text-lg font-semibold",
        date: "text-sm opacity-90"
      }
    }
  },
  
  indicators: {
    wrapper: "absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2",
    
    dot: {
      base: "h-2 w-2 rounded-full transition-all",
      active: "w-6 bg-white",
      inactive: "bg-white/50"
    }
  },
  
  controls: {
    button: {
      base: "absolute top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 backdrop-blur-sm transition-all hover:bg-white/30",
      prev: "left-4",
      next: "right-4"
    },
    
    icon: "h-5 w-5 text-white"
  },
  
  status: {
    wrapper: "absolute top-4 right-4 rounded-full bg-white/20 px-3 py-1 backdrop-blur-sm",
    text: "text-xs text-white"
  }
};