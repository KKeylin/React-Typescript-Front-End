# Task Manager App

A focused task management app built with React, TypeScript, and modern tooling.

## Stack
React · TypeScript · Vite · Tailwind CSS · shadcn/ui · ESLint

## Features
- Create, edit, and delete tasks with inline editing
- Priority levels, due dates with overdue highlighting  
- Local persistence via localStorage
- Responsive layout with resilient handling of long content

## Architecture
- `modules/tasks/model/` — types + localStorage repository (pure functions)
- `modules/tasks/hooks/` — `useTasks` as React adapter
- `modules/tasks/ui/` — TaskCard, TaskForm, TasksSection components
- Page layer — thin composition, zero business logic

## Key decisions
- Dates stored as `YYYY-MM-DD` to avoid UTC timezone drift
- `min-w-0` + `minmax(0,1fr)` grid to prevent layout blowups on long titles
- Stable callbacks via `useCallback`, `React.memo` where it actually helps

## What's next
- Filters (All / Active / Completed / Overdue) and sorting
- Unit tests for the repository layer
- Import/export JSON
