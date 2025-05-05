import { BlogPost } from "@/types/blog";

export const blogPosts: BlogPost[] = [
  {
    id: "understanding-javascript-closures",
    title: "Understanding JavaScript Closures",
    date: "2025-05-01",
    excerpt: "A deep dive into closures and lexical scope in JavaScript.",
    tags: ["JavaScript", "Functional Programming"],
    pinned: true,
    release: true,
    content: `
# Understanding JavaScript Closures

A closure is the combination of a function bundled together with references to its surrounding state (the lexical environment). In other words, a closure gives you access to an outer function's scope from an inner function.

## Basic Example

\`\`\`javascript
function createCounter() {
  let count = 0;
  
  return function() {
    count += 1;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
\`\`\`

In this example, the inner function has access to the \`count\` variable defined in the outer function, even after the outer function has returned. This is a closure.

## Why are Closures Useful?

Closures are useful for:

- Data encapsulation
- Creating factory functions
- Implementing the module pattern
- Managing callbacks and event handlers

## Practical Use Cases

### Private Variables

\`\`\`javascript
function createBankAccount(initialBalance) {
  let balance = initialBalance;
  
  return {
    deposit: function(amount) {
      balance += amount;
      return balance;
    },
    withdraw: function(amount) {
      if (amount > balance) {
        return 'Insufficient funds';
      }
      balance -= amount;
      return balance;
    },
    getBalance: function() {
      return balance;
    }
  };
}

const account = createBankAccount(100);
account.deposit(50); // 150
account.withdraw(70); // 80
account.getBalance(); // 80
\`\`\`

### Memoization

\`\`\`javascript
function memoize(fn) {
  const cache = {};
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache[key]) {
      console.log('Fetching from cache');
      return cache[key];
    }
    
    console.log('Calculating result');
    const result = fn.apply(this, args);
    cache[key] = result;
    
    return result;
  };
}

const expensiveCalculation = (n) => {
  console.log('Performing expensive calculation');
  return n * n;
};

const memoizedCalculation = memoize(expensiveCalculation);

memoizedCalculation(10); // Calculating result, returns 100
memoizedCalculation(10); // Fetching from cache, returns 100
\`\`\`

## Common Gotchas

### Loop Variables in Closures

A common mistake is to use closures inside loops:

\`\`\`javascript
// Problematic code
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);
  }, 1000);
}
// Logs "3" three times

// Fixed with let (block scoping)
for (let i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);
  }, 1000);
}
// Logs 0, 1, 2

// Fixed with IIFE (for older browsers)
for (var i = 0; i < 3; i++) {
  (function(index) {
    setTimeout(function() {
      console.log(index);
    }, 1000);
  })(i);
}
// Logs 0, 1, 2
\`\`\`

## Memory Considerations

Closures can lead to memory leaks if not handled properly, especially in long-running applications. It's important to be mindful of the references being maintained by your closures.

## Conclusion

Closures are a powerful feature of JavaScript that enable elegant patterns and solutions. Understanding how they work will make you a more effective JavaScript developer.
`,
  },
  {
    id: "getting-started-with-react-hooks",
    title: "Getting Started with React Hooks",
    date: "2025-04-20",
    excerpt: "Learn how to use React Hooks to manage state and side effects in functional components.",
    tags: ["React", "JavaScript", "Web Development"],
    content: `
# Getting Started with React Hooks

React Hooks were introduced in React 16.8 as a way to use state and other React features without writing a class. They allow you to "hook into" React state and lifecycle features from function components.

## The Problem Hooks Solve

Before hooks, you had to convert a function component to a class component whenever you needed:

- State management
- Lifecycle methods
- Access to context
- Refs

This led to complex components and difficulty in reusing stateful logic between components.

## Basic Hooks

### useState

The \`useState\` hook lets you add state to functional components:

\`\`\`jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

### useEffect

The \`useEffect\` hook lets you perform side effects in function components:

\`\`\`jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = \`You clicked \${count} times\`;
    
    // Cleanup function (similar to componentWillUnmount)
    return () => {
      document.title = 'React App';
    };
  }, [count]); // Only re-run if count changes

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

### useContext

The \`useContext\` hook accepts a context object and returns the current context value:

\`\`\`jsx
import React, { useContext } from 'react';

const ThemeContext = React.createContext('light');

function ThemedButton() {
  const theme = useContext(ThemeContext);
  
  return <button className={theme}>Themed Button</button>;
}
\`\`\`

## Additional Hooks

- \`useReducer\`: An alternative to useState for complex state logic
- \`useCallback\`: Returns a memoized callback function
- \`useMemo\`: Returns a memoized value
- \`useRef\`: Returns a mutable ref object
- \`useLayoutEffect\`: Similar to useEffect, but fires synchronously
- \`useDebugValue\`: Used for custom hooks debugging

## Building Custom Hooks

Custom hooks let you extract component logic into reusable functions:

\`\`\`jsx
import { useState, useEffect } from 'react';

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty array means run once on mount

  return windowSize;
}

// Usage
function MyComponent() {
  const size = useWindowSize();
  return (
    <div>
      Window width: {size.width}, height: {size.height}
    </div>
  );
}
\`\`\`

## Rules of Hooks

1. Only call hooks at the top level (not inside loops, conditions, or nested functions)
2. Only call hooks from React function components or custom hooks

## Conclusion

React Hooks provide a more direct API to React concepts like props, state, context, refs, and lifecycle. They enable you to write cleaner, more reusable code with functional components.

If you're coming from class components, hooks might take some getting used to, but they ultimately lead to more maintainable React applications.
`,
  },
  {
    id: "building-responsive-layouts-with-tailwind-css",
    title: "Building Responsive Layouts with Tailwind CSS",
    date: "2025-04-10",
    excerpt: "Learn how to create fully responsive web layouts using Tailwind CSS utility classes.",
    tags: ["CSS", "Tailwind", "Web Development"],
    pinned: true,
    content: `
# Building Responsive Layouts with Tailwind CSS

Tailwind CSS is a utility-first CSS framework that enables rapid UI development through composable utility classes. One of its strongest features is its responsive design system, which makes building adaptive layouts straightforward and intuitive.

## Responsive Design Fundamentals

Before diving into Tailwind's approach, let's review responsive design principles:

1. **Fluid layouts**: Using relative units instead of fixed pixels
2. **Media queries**: Applying different styles at different viewport sizes
3. **Flexible images**: Ensuring media scales appropriately
4. **Mobile-first approach**: Designing for mobile devices first, then progressively enhancing for larger screens

## Tailwind's Breakpoint System

Tailwind includes five default breakpoints:

- \`sm\`: 640px and up
- \`md\`: 768px and up
- \`lg\`: 1024px and up
- \`xl\`: 1280px and up
- \`2xl\`: 1536px and up

Using these breakpoints is simple—just prefix any utility with the breakpoint name:

\`\`\`html
<div class="w-full md:w-1/2 lg:w-1/3">
  <!-- Full width on mobile, half on medium, third on large -->
</div>
\`\`\`

## Mobile-First Approach

Tailwind follows a mobile-first approach, meaning unprefixed utilities apply to all screen sizes, while prefixed ones override them at the specified breakpoint and up:

\`\`\`html
<!-- This text will be center-aligned on mobile and left-aligned from medium screens up -->
<p class="text-center md:text-left">Responsive text alignment</p>
\`\`\`

## Responsive Layout Examples

### Responsive Navigation

\`\`\`html
<nav class="bg-white p-4">
  <div class="flex flex-col md:flex-row md:justify-between md:items-center">
    <!-- Logo -->
    <div class="flex justify-between items-center">
      <div class="text-xl font-bold">My Site</div>
      <button class="md:hidden">
        <!-- Mobile menu button -->
        Menu
      </button>
    </div>
    
    <!-- Navigation links -->
    <div class="hidden md:flex space-x-4">
      <a href="#" class="hover:text-blue-500">Home</a>
      <a href="#" class="hover:text-blue-500">About</a>
      <a href="#" class="hover:text-blue-500">Services</a>
      <a href="#" class="hover:text-blue-500">Contact</a>
    </div>
  </div>
</nav>
\`\`\`

### Responsive Grid Layout

\`\`\`html
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  <div class="bg-blue-500 p-4 text-white">Item 1</div>
  <div class="bg-blue-500 p-4 text-white">Item 2</div>
  <div class="bg-blue-500 p-4 text-white">Item 3</div>
  <div class="bg-blue-500 p-4 text-white">Item 4</div>
  <!-- More items... -->
</div>
\`\`\`

### Card Layout with Responsive Spacing

\`\`\`html
<div class="p-4 md:p-8">
  <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
    <div class="md:flex">
      <div class="md:shrink-0">
        <img class="h-48 w-full object-cover md:h-full md:w-48" src="image.jpg" alt="Card image">
      </div>
      <div class="p-8">
        <h2 class="text-xl font-bold">Card Title</h2>
        <p class="mt-2 text-gray-500">This is a responsive card layout that stacks on mobile and displays side-by-side on medium screens and up.</p>
      </div>
    </div>
  </div>
</div>
\`\`\`

## Customizing Breakpoints

While Tailwind's default breakpoints work well for most projects, you can customize them in your \`tailwind.config.js\`:

\`\`\`javascript
module.exports = {
  theme: {
    screens: {
      'mobile': '375px',
      'tablet': '640px',
      'laptop': '1024px',
      'desktop': '1280px',
      'widescreen': '1536px',
    },
  },
}
\`\`\`

## Responsive Design Best Practices with Tailwind

1. **Start mobile-first**: Write base utilities for mobile, then override with larger breakpoint prefixes
2. **Use container class**: The \`container\` class helps maintain consistent widths across different screen sizes
3. **Limit media query use**: Let Tailwind handle media queries through its responsive prefix system
4. **Test on real devices**: Always test your responsive designs on actual devices, not just browser resizing
5. **Use Flexbox and Grid**: Leverage Tailwind's flex and grid utilities for robust layouts

## Conclusion

Tailwind CSS provides a powerful and intuitive way to build responsive layouts without writing custom media queries. By understanding its mobile-first approach and effectively using its responsive utility prefixes, you can create websites that look great on any device size with minimal effort.

The utility-first approach might seem verbose at first, but the clarity and consistency it brings to responsive design workflows often leads to faster development and more maintainable code.
`,
  },
  {
    id: "typescript-tips-for-react-developers",
    title: "TypeScript Tips for React Developers",
    date: "2025-03-25",
    excerpt: "Practical TypeScript tips and best practices for React applications.",
    tags: ["TypeScript", "React", "JavaScript"],
    release: true,
    content: `
# TypeScript Tips for React Developers

TypeScript has become an essential tool for building robust React applications. It adds static typing to JavaScript, providing better tooling, earlier error detection, and improved developer experience. This post covers practical TypeScript tips specifically for React developers.

## Prop Types with TypeScript

Instead of using PropTypes, TypeScript gives us stronger type checking for component props:

\`\`\`tsx
// Basic props interface
interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean; // Optional prop
  variant: 'primary' | 'secondary' | 'tertiary'; // Union type
}

const Button: React.FC<ButtonProps> = ({ 
  text, 
  onClick, 
  disabled = false,  // Default value 
  variant 
}) => {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={\`button button-\${variant}\`}
    >
      {text}
    </button>
  );
};
\`\`\`

## Children Props

TypeScript allows you to be explicit about children props:

\`\`\`tsx
// For components that require children
interface CardProps {
  title: string;
  children: React.ReactNode; // Any valid React child
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="card-content">{children}</div>
    </div>
  );
};
\`\`\`

## Event Handlers

TypeScript helps with correctly typing event handlers:

\`\`\`tsx
// Input change handler
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setInputValue(e.target.value);
};

// Form submit handler
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  // Form submission logic
};

// Mouse event
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  // Click handling logic
};
\`\`\`

## Typing Hooks

### useState

\`\`\`tsx
// Basic state
const [count, setCount] = useState<number>(0);

// Complex state
interface User {
  id: string;
  name: string;
  email: string;
}

const [user, setUser] = useState<User | null>(null);
\`\`\`

### useRef

\`\`\`tsx
// DOM element ref
const inputRef = useRef<HTMLInputElement>(null);

// Mutable value ref that doesn't trigger re-renders
const previousValueRef = useRef<string | undefined>(undefined);
\`\`\`

### useReducer

\`\`\`tsx
interface State {
  count: number;
  isLoading: boolean;
  error: string | null;
}

type Action = 
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

// Usage
const initialState: State = { count: 0, isLoading: false, error: null };
const [state, dispatch] = useReducer(reducer, initialState);
\`\`\`

## Generic Components

Creating reusable, type-safe generic components:

\`\`\`tsx
// A generic list component
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

// Usage
interface User {
  id: string;
  name: string;
}

const users: User[] = [
  { id: '1', name: 'Alice' },
  { id: '2', name: 'Bob' }
];

<List
  items={users}
  renderItem={(user) => <span>{user.name}</span>}
/>
\`\`\`

## Type Guards for Conditional Rendering

TypeScript type guards help with conditional rendering:

\`\`\`tsx
interface AdminUser {
  id: string;
  name: string;
  role: 'admin';
  permissions: string[];
}

interface RegularUser {
  id: string;
  name: string;
  role: 'user';
}

type User = AdminUser | RegularUser;

function isAdmin(user: User): user is AdminUser {
  return user.role === 'admin';
}

function UserInfo({ user }: { user: User }) {
  return (
    <div>
      <h2>{user.name}</h2>
      {isAdmin(user) && (
        <div className="admin-panel">
          <h3>Admin Permissions</h3>
          <ul>
            {user.permissions.map(permission => (
              <li key={permission}>{permission}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
\`\`\`

## Custom Type Utilities

Create your own utility types for common patterns:

\`\`\`tsx
// Make certain properties required
type RequiredProps<T, K extends keyof T> = T & {
  [P in K]-?: T[P];
};

// Make certain properties optional
type OptionalProps<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
\`\`\`

## Typed API Requests with React Query

\`\`\`tsx
interface Post {
  id: number;
  title: string;
  body: string;
}

function usePosts() {
  return useQuery<Post[], Error>({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await fetch('https://api.example.com/posts');
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    }
  });
}
\`\`\`

## Component as Props

Safely type components passed as props:

\`\`\`tsx
interface LayoutProps {
  header: React.ComponentType;
  sidebar: React.ComponentType;
  content: React.ComponentType;
  footer: React.ComponentType;
}

function Layout({ header: Header, sidebar: Sidebar, content: Content, footer: Footer }: LayoutProps) {
  return (
    <div className="layout">
      <Header />
      <div className="main">
        <Sidebar />
        <Content />
      </div>
      <Footer />
    </div>
  );
}
\`\`\`

## Conclusion

TypeScript adds significant value to React development by catching errors early, improving developer experience through better autocompletion, and making code more self-documenting. These tips should help you write more robust React applications with TypeScript.

Remember that TypeScript is a tool to help you, not a hindrance. Sometimes it makes sense to use more permissive types like \`any\` or \`unknown\` in specific situations, but try to keep your codebase as type-safe as reasonable.
`,
  },
  {
    id: "advanced-git-techniques",
    title: "Advanced Git Techniques for Developers",
    date: "2025-03-15",
    excerpt: "Level up your Git skills with these advanced techniques and workflows.",
    tags: ["Git", "DevOps", "Productivity"],
    content: `
# Advanced Git Techniques for Developers

Git is a powerful tool that offers much more than just the basic \`add\`, \`commit\`, \`push\`, and \`pull\` commands. This post explores some advanced Git techniques that can help you become more efficient and effective with version control.

## Interactive Rebasing

Interactive rebasing allows you to modify your commit history by reordering, editing, squashing, or dropping commits:

\`\`\`bash
# Interactively rebase the last 5 commits
git rebase -i HEAD~5
\`\`\`

During an interactive rebase, you'll see a list of commits with commands:

\`\`\`
pick a1b2c3d First commit message
pick e4f5g6h Second commit message
pick i7j8k9l Third commit message
\`\`\`

Available commands:

- \`pick\`: Use the commit
- \`reword\`: Use the commit, but edit the commit message
- \`edit\`: Use the commit, but stop for amending
- \`squash\`: Use the commit, but meld into previous commit
- \`fixup\`: Like squash, but discard the commit's message
- \`drop\`: Remove the commit

## Cherry-Picking

Cherry-picking allows you to apply specific commits from one branch to another:

\`\`\`bash
# Apply the commit with hash a1b2c3d to the current branch
git cherry-pick a1b2c3d

# Cherry-pick a range of commits
git cherry-pick a1b2c3d..e4f5g6h
\`\`\`

## Advanced Branching Strategies

### Git Flow

Git Flow is a branching model with five types of branches:

1. **master**: Production-ready code
2. **develop**: Integration branch for features
3. **feature/**: New features, branched from develop
4. **release/**: Preparing for a release, branched from develop
5. **hotfix/**: Quick fixes to production, branched from master

### GitHub Flow

A simpler alternative with just two main branch types:

1. **main**: Always deployable
2. **feature/**: Changes, branched from main

### Trunk-Based Development

Everyone commits to a single branch (trunk/main) with feature toggles to hide in-progress work.

## Stashing

Save changes without committing:

\`\`\`bash
# Save changes with a description
git stash save "Work in progress for feature X"

# List stashes
git stash list

# Apply the most recent stash
git stash apply

# Apply a specific stash
git stash apply stash@{2}

# Apply stash and remove it from stash list
git stash pop

# Create a branch from a stash
git stash branch new-branch stash@{1}

# Remove all stashes
git stash clear
\`\`\`

## Reflog: Your Safety Net

Git reflog tracks when the tips of branches are updated:

\`\`\`bash
# View reflog
git reflog

# Restore to a previous state using reflog
git reset --hard HEAD@{2}
\`\`\`

## Bisecting to Find Bugs

Git bisect helps find the commit that introduced a bug:

\`\`\`bash
# Start bisect
git bisect start

# Mark the current version as bad
git bisect bad

# Mark a known good version
git bisect good v1.0

# Git will checkout a commit between good and bad
# Test the code and mark it
git bisect good  # or git bisect bad

# When the bad commit is found, reset bisect
git bisect reset
\`\`\`

## Submodules and Subtrees

### Submodules

Include other Git repositories within your repository:

\`\`\`bash
# Add a submodule
git submodule add https://github.com/username/repo.git path/to/submodule

# Initialize and update all submodules
git submodule update --init --recursive

# Pull all changes for submodules
git submodule update --remote
\`\`\`

### Subtrees

Merge and manage the history of another project within yours:

\`\`\`bash
# Add a subtree
git subtree add --prefix=path/to/dir remote-name branch --squash

# Update a subtree
git subtree pull --prefix=path/to/dir remote-name branch --squash

# Push changes to the subtree remote
git subtree push --prefix=path/to/dir remote-name branch
\`\`\`

## Advanced Git Configuration

### Aliases

Create shortcuts for common commands:

\`\`\`bash
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual '!gitk'
\`\`\`

### Custom Hooks

Git hooks let you run custom scripts at certain points:

- \`pre-commit\`: Run before a commit is created
- \`commit-msg\`: Validate commit messages
- \`pre-push\`: Run before pushing
- \`post-merge\`: Run after a merge or pull

Example \`pre-commit\` hook to run linting:

\`\`\`bash
#!/bin/sh
npm run lint
\`\`\`

## Worktrees

Manage multiple working copies of a single repository:

\`\`\`bash
# Create a new worktree
git worktree add ../path-to-worktree branch-name

# List worktrees
git worktree list

# Remove a worktree
git worktree remove ../path-to-worktree
\`\`\`

## Sparse Checkout

Check out only parts of a repository:

\`\`\`bash
# Enable sparse checkout
git config core.sparseCheckout true

# Specify which directories to check out
echo "path/to/directory/*" >> .git/info/sparse-checkout

# Update the working directory
git read-tree -mu HEAD
\`\`\`

## Conclusion

These advanced Git techniques can dramatically improve your workflow, help you recover from mistakes, and manage complex projects more effectively. As with any powerful tool, it's important to understand these features before using them in critical situations.

Remember that while Git makes it hard to truly lose work, some of these operations can be destructive if misused. Always ensure you understand what a command will do before running it, especially when it modifies history.
`,
  },
];
