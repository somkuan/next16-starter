# AGENTS.md

This file contains guidelines and commands for agentic coding agents working in this Next.js 16 repository.

## Project Overview

This is a Next.js 16 application using:
- React 19 with TypeScript
- Tailwind CSS v4 with shadcn/ui components
- App Router architecture
- Cache Components enabled
- ESLint with Next.js configuration

## Build & Development Commands

### Core Commands
- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Testing
This project currently has no test framework configured. If adding tests:
- Consider Jest + React Testing Library for unit tests
- Consider Playwright for E2E tests
- Add test scripts to package.json as needed

## Code Style Guidelines

### Import Organization
```typescript
// 1. React/Next.js imports (type imports first)
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Suspense } from "react";

// 2. Third-party library imports
import { cva } from "class-variance-authority";
import { clsx } from "clsx";

// 3. Local imports (use @/ path alias)
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Course } from "@/lib/types";
```

### TypeScript Configuration
- Strict mode enabled
- Path alias: `@/*` maps to root directory
- JSX: `react-jsx` (no React import needed for JSX)
- Target: ES2017

### Component Patterns

#### Functional Components
```typescript
// Use arrow functions for components
export default function ComponentName({
  prop,
  optionalProp = "default",
}: {
  prop: string;
  optionalProp?: string;
}) {
  return <div>{prop}</div>;
}
```

#### Async Components (Server Components)
```typescript
export default async function AsyncComponent() {
  const data = await fetchData();
  
  return (
    <div>
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```

#### shadcn/ui Component Pattern
```typescript
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const componentVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "default-classes",
        secondary: "secondary-classes",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface ComponentProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof componentVariants> {
  asChild?: boolean;
}

function Component({
  className,
  variant,
  ...props
}: ComponentProps) {
  return (
    <div
      className={cn(componentVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Component, componentVariants };
```

### File Naming Conventions
- Components: `PascalCase.tsx` (e.g., `AppCourseList.tsx`)
- Utilities: `camelCase.ts` (e.g., `utils.ts`)
- Types: `camelCase.ts` (e.g., `types.ts`)
- Services: `camelCase.ts` (e.g., `course-service.ts`)
- Pages: `page.tsx` (App Router convention)
- Layouts: `layout.tsx` (App Router convention)

### Directory Structure
```
app/
├── layout.tsx
├── page.tsx
├── globals.css
└── [route]/
    └── page.tsx

components/
├── ui/           # shadcn/ui components
└── ComponentName.tsx

lib/
├── types.ts      # TypeScript interfaces
└── utils.ts      # Utility functions

services/
└── service-name.ts
```

### Styling Guidelines
- Use Tailwind CSS classes
- Leverage `cn()` utility for conditional classes
- Follow shadcn/ui patterns for component variants
- Use CSS variables for theming (configured in globals.css)

### Error Handling
```typescript
// Service layer error handling
export async function fetchData(): Promise<Data[]> {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
```

### State Management
- Use React Server Components by default
- Use `useState` for client-side state
- Use `Suspense` boundaries for loading states
- Consider React Context for global state

### Performance Guidelines
- Cache Components mode is enabled
- Use `use cache` directive for static data
- Implement proper loading states with `loading.tsx`
- Optimize images with Next.js Image component

### Linting & Type Safety
- ESLint configuration extends Next.js recommended rules
- TypeScript strict mode enabled
- Always run `npm run lint` before committing
- Fix all TypeScript errors before considering code complete

## Development Workflow

1. **Before making changes**: Run `npm run lint` to ensure clean state
2. **After implementing features**: Test in development server
3. **Before committing**: Run `npm run lint` and fix any issues
4. **For production**: Run `npm run build` to verify production readiness

## Key Dependencies

### UI Framework
- Next.js 16.1.1 (App Router)
- React 19.2.0
- Tailwind CSS v4

### Component Library
- shadcn/ui (New York style)
- Radix UI primitives
- Lucide React icons

### Utilities
- `clsx` for conditional classes
- `tailwind-merge` for Tailwind class merging
- `class-variance-authority` for component variants

## Notes

- This project uses Cache Components (experimental feature in Next.js 16)
- Path aliases are configured (`@/` for root)
- No test framework is currently set up
- ESLint is configured for Next.js best practices