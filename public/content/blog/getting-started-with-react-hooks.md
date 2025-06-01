---
id: getting-started-with-react-hooks
title: Getting Started with React Hooks
excerpt: An introduction to React Hooks and how they can simplify your component logic and state management.
date: 2024-03-05
tags: [React, Hooks, JavaScript]
pinned: false
release: false
---

# Getting Started with React Hooks

React Hooks revolutionized how we write React components by allowing us to use state and other React features in functional components.

## What are Hooks?

Hooks are functions that let you "hook into" React state and lifecycle features from functional components. They were introduced in React 16.8.

## The useState Hook

The most commonly used hook is `useState`:

```javascript
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
```

## The useEffect Hook

`useEffect` lets you perform side effects in functional components:

```javascript
import React, { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div>Seconds: {seconds}</div>;
}
```

## Rules of Hooks

1. Only call hooks at the top level
2. Only call hooks from React functions
3. Use the ESLint plugin to enforce these rules

## Custom Hooks

You can create your own hooks to share logic between components:

```javascript
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}
```

React Hooks provide a more direct API to the React concepts you already know, making your code more readable and reusable.
