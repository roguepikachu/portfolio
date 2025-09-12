// Comment section component style classes

export const commentSectionStyles = {
  container: "space-y-6",
  
  header: {
    wrapper: "flex items-center justify-between",
    title: "text-xl font-bold",
    count: "text-sm text-muted-foreground"
  },
  
  form: {
    wrapper: "space-y-4",
    textarea: "min-h-[100px] resize-none",
    actions: "flex justify-end",
    submitButton: {
      base: "",
      loading: "cursor-not-allowed opacity-50"
    }
  },
  
  signInPrompt: {
    wrapper: "rounded-lg border border-dashed p-6 text-center",
    text: "text-muted-foreground",
    button: "mt-2"
  },
  
  comments: {
    loading: "py-8 text-center text-muted-foreground",
    empty: "py-8 text-center text-muted-foreground",
    list: "space-y-4"
  }
};