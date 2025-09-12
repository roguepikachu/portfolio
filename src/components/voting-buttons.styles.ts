// Voting buttons component style classes

export const votingButtonsStyles = {
  container: "flex items-center gap-4 rounded-full border bg-card px-4 py-2",
  
  button: {
    base: "group relative rounded-full p-2 transition-colors",
    default: "hover:bg-muted",
    active: "text-primary",
    disabled: "cursor-not-allowed opacity-50"
  },
  
  icon: {
    base: "h-5 w-5 transition-transform",
    hover: "group-hover:scale-110",
    active: "scale-110"
  },
  
  count: "min-w-[2rem] text-center font-medium"
};