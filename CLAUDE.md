# Claude Development Guidelines

This file contains development guidelines and conventions for the npm-stats-api project.

## Package Management

- **Always use `pnpm`** instead of npm for package management
- Use `pnpm add` for dependencies and `pnpm add -D` for dev dependencies
- Run scripts with `pnpm run <script>` or `pnpm <script>`

## TypeScript Guidelines

### Type Definitions
- **Use `type` instead of `interface`** for all type definitions
- Keep type definitions in the main `index.d.ts` file or create separate `.d.ts` files for complex types

```typescript
// ✅ Good
type StatType = Promise<{
  statusCode: number;
  body: {
    downloads: number;
    start: string;
    end: string;
    package: string;
  };
}>;

// ❌ Avoid
interface StatInterface {
  // ...
}
```

### Avoid `any` Type
- **Avoid `any` type at all costs**
- Use specific types, union types, or generic types instead
- If absolutely necessary, use `unknown` and type assertions with proper validation

```typescript
// ✅ Good
type SuperagentError = {
  message: string;
  status?: number;
  response?: {
    error: {
      path: string;
      text: string;
    };
  };
  [key: string]: unknown; // Use unknown instead of any
};

// ❌ Avoid
constructor(err: any) {
  // ...
}
```

## Testing Guidelines

### Testable Code Principles
- Write **pure functions** whenever possible
- Extract business logic from I/O operations
- Use dependency injection for external dependencies
- Keep functions small and focused on single responsibilities

```typescript
// ✅ Good - Testable function
export const buildUrl = (baseUrl: string, pkg: string, start: string, end: string): string => {
  return `${baseUrl}/downloads/point/${start}:${end}/${pkg}`;
};

// ✅ Good - Configurable timeouts
export const createRequestConfig = (timeouts?: { response: number; deadline: number }) => {
  return timeouts || TIMEOUT_CONFIG;
};
```

### Test Structure
- Use descriptive test names that explain the behavior
- Group related tests using `describe` blocks
- Test both success and error scenarios
- Use mocks for external dependencies (like superagent)

## Build and Development

### Common Commands
```bash
# Install dependencies
pnpm install

# Development build with watch
pnpm dev

# Production build
pnpm build

# Run tests
pnpm test

# Format code
pnpm format
```

### Build Configuration
- TypeScript source files are in `src/`
- Build output goes to `index.js` (CommonJS format)
- Type definitions are in `index.d.ts`
- Use Rollup for bundling with TypeScript and Babel plugins

## Code Style

### Imports
- Use ES modules syntax in TypeScript source files
- Group imports: external libraries first, then internal modules
- Use explicit file extensions in import paths when necessary

### Error Handling
- Create custom exception classes with proper typing
- Always handle both network errors and API errors
- Provide meaningful error messages and status codes

### Constants
- Extract magic numbers and strings into named constants
- Use `const assertions` where appropriate
- Group related constants in configuration objects

```typescript
// ✅ Good
const TIMEOUT_CONFIG = {
  response: 3 * 1000,
  deadline: 5 * 1000,
} as const;
```

## Project Structure

```
src/
├── index.ts              # Main entry point
└── lib/
    ├── npm.ts           # Core API functions
    ├── request.ts       # HTTP request handling
    └── npmException.ts  # Custom error types
test/
└── npm.test.ts          # Test suite
```

## Dependencies

### Production Dependencies
- `core-js`: Modern JavaScript polyfills
- `superagent`: HTTP client library

### Development Dependencies
- TypeScript for type checking
- Rollup for bundling
- Jest for testing
- Prettier for code formatting
- Husky for git hooks