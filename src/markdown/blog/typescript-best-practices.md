# TypeScript Best Practices for 2024

TypeScript continues to gain adoption among JavaScript developers, and with good reason. Its type system helps catch errors during development rather than runtime, improves IDE support, and serves as living documentation. Here are the most important best practices for TypeScript in 2024.

## Use Strict Mode

Always enable strict mode in your tsconfig.json:

```json
{
  "compilerOptions": {
    "strict": true,
    // other options...
  }
}
```

This enables a suite of strict type checking options that will help you catch more errors during compilation.

## Leverage Type Inference

TypeScript's type inference is powerful. Don't add types when they can be inferred:

```typescript
// Unnecessary explicit typing
const count: number = 5;

// Let TypeScript infer the type
const count = 5;
```

However, always add return types to functions for better documentation and to catch errors if the implementation changes:

```typescript
// Good practice
function calculateTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.price, 0);
}
```

## Use TypeScript's Utility Types

TypeScript provides several utility types that can save you time and make your code more maintainable:

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  address: {
    street: string;
    city: string;
    country: string;
  };
}

// Create a type with only some properties
type UserBasicInfo = Pick<User, 'id' | 'name'>;

// Make all properties optional
type PartialUser = Partial<User>;

// Create a read-only version
type ReadOnlyUser = Readonly<User>;

// Extract the type of the address property
type Address = User['address'];
```

## Discriminated Unions for Complex State

When modeling state that can be in different forms, use discriminated unions:

```typescript
type AsyncState<T> = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

function renderContent<T>(state: AsyncState<T>) {
  switch (state.status) {
    case 'idle':
      return <div>Start search</div>;
    case 'loading':
      return <div>Loading...</div>;
    case 'success':
      return <div>Data: {JSON.stringify(state.data)}</div>;
    case 'error':
      return <div>Error: {state.error.message}</div>;
  }
}
```

## Use `unknown` Instead of `any`

When you don't know the type of a value, use `unknown` instead of `any`:

```typescript
// Not ideal - bypasses type checking
function processData(data: any) {
  data.nonExistentMethod(); // No error
}

// Better - forces type checking
function processData(data: unknown) {
  if (typeof data === 'string') {
    // TypeScript knows data is a string here
    return data.toUpperCase();
  }
  
  if (Array.isArray(data)) {
    // TypeScript knows data is an array here
    return data.length;
  }
  
  throw new Error('Unsupported data type');
}
```

## Consider the `satisfies` Operator

Introduced in TypeScript 4.9, the `satisfies` operator lets you verify that a value matches a type without changing the inferred type:

```typescript
type RGB = [red: number, green: number, blue: number];
type Color = RGB | string;

// Without satisfies
const palette: Record<string, Color> = {
  red: [255, 0, 0],
  green: "#00ff00",
};
// palette.red[0] gives an error because TypeScript thinks it could be a string

// With satisfies
const palette = {
  red: [255, 0, 0],
  green: "#00ff00",
} satisfies Record<string, Color>;
// Now palette.red[0] works because TypeScript knows red is a tuple
```

## Use Template Literal Types for Enhanced String Typing

Template literal types allow you to create more specific string types:

```typescript
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type Endpoint = '/users' | '/posts' | '/comments';
type ApiRoute = `${HttpMethod} ${Endpoint}`;

// ApiRoute is now: 'GET /users' | 'GET /posts' | ...etc

function fetchApi(route: ApiRoute) {
  // Implementation
}

fetchApi('GET /users'); // Valid
fetchApi('PATCH /users'); // Error: Argument of type '"PATCH /users"' is not assignable to parameter of type 'ApiRoute'
```

## Conclusion

TypeScript continues to evolve with each release, bringing powerful new features that help developers write safer, more maintainable code. By following these best practices, you'll maximize the benefits of TypeScript while avoiding common pitfalls.

Remember that TypeScript is a tool to help you and your team. Use strictness where it adds value, but don't hesitate to use escape hatches like type assertions when necessary, particularly when working with external libraries that aren't well-typed.
