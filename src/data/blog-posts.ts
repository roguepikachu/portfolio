
import { BlogPost } from '@/types/blog';
import { loadBlogPosts } from '@/utils/markdown-loader';

// Fallback data in case no markdown files are found
export const fallbackBlogPosts: BlogPost[] = [
  {
    id: "understanding-javascript-closures",
    title: "Understanding JavaScript Closures",
    date: "2023-05-01",
    excerpt: "A deep dive into closures and lexical scope in JavaScript.",
    tags: ["JavaScript", "Functional Programming"],
    pinned: true,
    release: true,
    content: `
# Understanding JavaScript Closures

A closure is the combination of a function bundled together with references to its surrounding state (the lexical environment).

In JavaScript, closures are created every time a function is created, at function creation time. To use a closure, define a function inside another function and expose it, either by returning it or passing it to another function.

## Why Closures Matter

Closures are useful because they let you associate data with a function that operates on that data. This has obvious parallels to object-oriented programming, where objects allow you to associate data with methods.

\`\`\`javascript
function createCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  }
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
\`\`\`

In this example, the inner function has access to the \`count\` variable defined in the outer function, even after the outer function has finished executing.
    `
  },
  {
    id: "getting-started-with-react-hooks",
    title: "Getting Started with React Hooks",
    date: "2023-04-20",
    excerpt: "Learn how to use React Hooks to manage state and side effects in functional components.",
    tags: ["React", "JavaScript", "Web Development"],
    pinned: false,
    release: true,
    content: `# Getting Started with React Hooks

## Introduction
React Hooks were introduced in React 16.8 to allow developers to use state and other React features without writing a class.

## Why Hooks?
Hooks solve several problems in React:
- They let you reuse stateful logic between components without changing your component hierarchy
- They let you split one component into smaller functions based on related pieces
- They let you use React features without classes

## Common Hooks

### useState
The useState hook lets you add state to functional components:

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
The useEffect hook lets you perform side effects in functional components:

\`\`\`jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`You clicked \${count} times\`;
  });

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
    `
  },
  {
    id: "typescript-best-practices",
    title: "TypeScript Best Practices for Large-Scale Applications",
    date: "2023-03-15",
    excerpt: "Discover how to structure and maintain large TypeScript codebases with best practices and patterns.",
    tags: ["TypeScript", "Software Architecture", "Best Practices"],
    pinned: false,
    release: true,
    content: `# TypeScript Best Practices for Large-Scale Applications

## Introduction
TypeScript has become the language of choice for developing large-scale JavaScript applications. Its static typing system helps catch errors early and improves developer productivity.

## Key Best Practices

### 1. Define Strict Type Checking
Enable strict type checking in your tsconfig.json:

\`\`\`json
{
  "compilerOptions": {
    "strict": true
  }
}
\`\`\`

### 2. Use Interfaces for Object Shapes
Define clear interfaces for your data structures:

\`\`\`typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
}

function getUserDetails(user: User): string {
  return \`\${user.name} (\${user.email})\`;
}
\`\`\`

### 3. Leverage Union Types
Use union types to represent values that can be one of several types:

\`\`\`typescript
type Status = 'pending' | 'fulfilled' | 'rejected';

function handleStatus(status: Status) {
  switch (status) {
    case 'pending':
      return 'Loading...';
    case 'fulfilled':
      return 'Success!';
    case 'rejected':
      return 'Error!';
  }
}
\`\`\`

### 4. Organize Code with Namespaces or Modules
Structure your code to avoid global namespace pollution:

\`\`\`typescript
// Use ES modules (preferred)
export interface User {
  // ...
}

// Or namespaces (for global libraries)
namespace MyApp {
  export interface User {
    // ...
  }
}
\`\`\`

### 5. Generic Components
Create reusable components with generics:

\`\`\`typescript
function createState<T>(initial: T): [() => T, (newValue: T) => void] {
  let value = initial;
  return [
    () => value,
    (newValue: T) => { value = newValue; }
  ];
}

const [getCount, setCount] = createState(0);
\`\`\`
    `
  },
  {
    id: "tailwind-css-tips",
    title: "10 Tailwind CSS Tips to Supercharge Your Workflow",
    date: "2023-02-28",
    excerpt: "Level up your Tailwind CSS skills with these practical tips and tricks for faster development.",
    tags: ["CSS", "Tailwind", "Web Development"],
    pinned: false,
    release: true,
    content: `# 10 Tailwind CSS Tips to Supercharge Your Workflow

## Introduction
Tailwind CSS has revolutionized the way we write CSS by providing utility-first classes. Here are 10 tips to help you use it more effectively.

## 1. Use the JIT Mode
Tailwind's Just-in-Time mode generates styles on-demand, resulting in smaller CSS files and enabling arbitrary values.

\`\`\`js
// tailwind.config.js
module.exports = {
  mode: 'jit',
  // ...
}
\`\`\`

## 2. Create Component Classes with @apply
Extract repeated utility patterns into custom CSS classes:

\`\`\`css
@layer components {
  .btn-primary {
    @apply py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600;
  }
}
\`\`\`

## 3. Use the Group Modifier for Parent-Child Interactions
Easily handle hover states on parent elements:

\`\`\`html
<div class="group hover:bg-blue-100 p-4">
  <h3>Title</h3>
  <p class="text-gray-500 group-hover:text-blue-500">This text changes color when the parent is hovered.</p>
</div>
\`\`\`

## 4. Responsive Design with Breakpoint Prefixes
Apply styles at specific breakpoints:

\`\`\`html
<div class="text-sm md:text-base lg:text-lg">
  This text resizes at different screen sizes.
</div>
\`\`\`

## 5. Dark Mode Support
Enable dark mode in your config and use dark: prefix:

\`\`\`html
<div class="bg-white text-black dark:bg-gray-800 dark:text-white">
  Dark mode compatible content.
</div>
\`\`\`

## 6. Use the Space Between Utilities
Add consistent spacing between child elements:

\`\`\`html
<div class="space-y-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
\`\`\`

## 7. Aspect Ratio Utilities
Maintain aspect ratios for responsive elements:

\`\`\`html
<div class="aspect-w-16 aspect-h-9">
  <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ"></iframe>
</div>
\`\`\`

## 8. Line Clamp for Text Truncation
Limit text to a specific number of lines:

\`\`\`html
<p class="line-clamp-3">
  This text will be truncated after three lines...
</p>
\`\`\`

## 9. Use Ring Utilities for Focus States
Create accessible focus indicators:

\`\`\`html
<button class="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
  Button with custom focus state
</button>
\`\`\`

## 10. Extend the Default Theme
Customize colors, spacing, etc. to match your brand:

\`\`\`js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#f7fafc',
          DEFAULT: '#1a202c',
          dark: '#0d121b',
        },
      },
    },
  },
}
\`\`\`
    `
  }
];

// Load posts from markdown files
export const blogPosts = loadBlogPosts();

// If no markdown files are found, use the fallback data
if (blogPosts.length === 0) {
  console.log('No markdown blog posts found, using fallback data');
  blogPosts.push(...fallbackBlogPosts);
}
