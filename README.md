# Task Management System

A modern, responsive team task management system built with React and TypeScript. The application allows teams to create, organize, filter, sort, update, and track tasks efficiently across desktop, tablet, and mobile devices.

## Live Demo

**Live Demo:** `https://your-deployment-url.com`

**Repository:** `https://github.com/YOUR_USERNAME/team-task-management-system`

---

## Overview

TaskFlow is a frontend-focused task management application developed as part of a practical frontend assessment.

The application focuses on:

* Clean and responsive UI
* Reusable React components
* Type-safe development with TypeScript
* Search, filtering, sorting, and pagination
* URL-based task view state
* Server-state management with TanStack Query
* Client/UI state management with Zustand
* Accessible interactions
* Responsive mobile task presentation
* Realistic mock data
* API-ready architecture

---

## Screenshots

### Desktop — 1280px

![Desktop Screenshot](./public/screenshots/desktop.png)

### Tablet — 768px

![Tablet Screenshot](./public/screenshots/tablet.png)

### Mobile — 375px

![Mobile Screenshot](./public/screenshots/mobile.png)

### Mobile Filter Sheet

![Mobile Filter Sheet](./public/screenshots/mobile-filter.png)

### Create Task Dialog

![Create Task Dialog](./public/screenshots/create-task.png)

### Error State

![Error State](./public/screenshots/error-state.png)

### Empty State

![Empty State](./public/screenshots/empty-state.png)

---

## Features

### Task Management

* Create tasks
* View task details
* Edit tasks
* Delete tasks
* Update task status
* Assign tasks to team members
* Set task priority
* Set task due dates

### Search

Tasks can be searched by:

* Task title
* Description
* Owner name

### Filtering

Tasks can be filtered by:

* Status
* Priority
* Owner

### Sorting

Tasks can be sorted by relevant task fields with:

* Ascending order
* Descending order

### Pagination

The task list supports pagination with configurable page size.

### Dashboard Summary

The dashboard displays:

* Total tasks
* In-progress tasks
* Overdue tasks
* Unassigned tasks

### Responsive Design

The application is designed for:

* Mobile — 375px
* Tablet — 768px
* Desktop — 1280px+

On mobile devices, the desktop table is transformed into a mobile-friendly task card/list layout instead of relying on horizontal scrolling.

### UI States

The application includes:

* Loading state
* Skeleton loading
* Error state
* Retry functionality
* Empty state
* Filtered-empty state
* Hover states
* Focus states
* Disabled states

---

## Tech Stack

* **React**
* **TypeScript**
* **Vite**
* **TanStack Query**
* **Zustand**
* **React Router**
* **Tailwind CSS**
* **Radix UI**
* **Lucide React**

---

## Architecture

The application uses a layered architecture that separates UI, server state, and API communication.

```text
UI Components
      ↓
TanStack Query
      ↓
taskApi
      ↓
┌─────────────────────┐
│                     │
↓                     ↓
mockTaskApi        Real API
│                     │
Mock Data          HTTP Backend
```

The UI does not directly communicate with the mock implementation or backend.

Instead, all task operations go through `taskApi`.

This allows the application to work with mock data during development while remaining ready for a real backend.

---

## API Abstraction

The application checks the `VITE_API_URL` environment variable.

### Mock API

When no API URL is configured:

```env
VITE_API_URL=
```

the application automatically uses the local mock API.

```text
Frontend
   ↓
React Query
   ↓
taskApi
   ↓
mockTaskApi
   ↓
Mock Task Data
```

### Real API

When a backend URL is configured:

```env
VITE_API_URL=https://your-api.com
```

the application communicates with the real backend.

```text
Frontend
   ↓
React Query
   ↓
taskApi
   ↓
HTTP API
   ↓
Backend
```

The UI does not need to change when switching between mock and real API implementations.

---

## API Methods

| Method               | Purpose                                          | HTTP Equivalent           |
| -------------------- | ------------------------------------------------ | ------------------------- |
| `getTasks()`         | Get tasks with filtering, sorting and pagination | `GET /tasks`              |
| `getTask(id)`        | Get a single task                                | `GET /tasks/:id`          |
| `createTask()`       | Create a task                                    | `POST /tasks`             |
| `updateTask()`       | Update a task                                    | `PUT /tasks/:id`          |
| `updateTaskStatus()` | Update task status                               | `PATCH /tasks/:id/status` |
| `deleteTask(id)`     | Delete a task                                    | `DELETE /tasks/:id`       |

The mock API follows the same interface as the expected backend API.

---

## State Management

### TanStack Query

TanStack Query is responsible for server state including:

* Task lists
* Task details
* Creating tasks
* Updating tasks
* Updating task status
* Deleting tasks
* Loading states
* Error states
* Query invalidation
* Refetching

### Zustand

Zustand is used for client-side UI state such as:

* Dialog state
* Mobile filter sheet state
* Selected task
* Temporary UI interactions

### URL Query Parameters

Search, filtering, sorting, and pagination are stored in URL query parameters.

Example:

```text
/tasks?search=payment&status=in_progress&priority=urgent&sort=dueDate&order=asc&page=2
```

This makes the current task view:

* Shareable
* Refresh-safe
* Browser-navigation friendly

---

## Project Structure

```text
src/
├── components/
│   ├── tasks/
│   ├── ui/
│   └── layout/
│
├── hooks/
│
├── pages/
│
├── services/
│   ├── taskApi.ts
│   └── mockTaskApi.ts
│
├── store/
│
├── types/
│
├── lib/
│
├── App.tsx
└── main.tsx

public/
└── screenshots/
    ├── desktop.png
    ├── tablet.png
    ├── mobile.png
    ├── mobile-filter.png
    ├── create-task.png
    ├── error-state.png
    └── empty-state.png
```

---

## Getting Started

### Prerequisites

* Node.js 20+
* npm, pnpm, or yarn

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/team-task-management-system.git
```

```bash
cd team-task-management-system
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file:

```env
VITE_API_URL=
```

Leave the value empty to use the mock API.

To connect a real backend:

```env
VITE_API_URL=https://your-api.com
```

### Run Development Server

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## Mock Data

The application includes approximately 250 realistic task records.

The mock dataset intentionally contains different scenarios such as:

* Different task statuses
* Different priorities
* Assigned tasks
* Unassigned tasks
* Missing descriptions
* Missing due dates
* Long task titles
* Long owner names
* Overdue tasks
* Tasks due today
* Future due dates

This helps test the UI against realistic data and edge cases rather than only ideal content.

---

## Responsive Behaviour

### Desktop

The desktop layout displays tasks in a structured table:

```text
Task | Owner | Status | Priority | Due Date | Actions
```

### Tablet

The layout adapts spacing, controls, and content density for tablet-sized screens.

### Mobile

The desktop table is replaced with a mobile-friendly task list/card layout.

The mobile interface also provides a dedicated filter sheet for search and filtering controls.

No horizontal scrolling is required to use the main task list on mobile.

---

## Accessibility

Accessibility was considered throughout the interface.

The application includes:

* Keyboard-friendly controls
* Visible focus states
* Semantic HTML where appropriate
* Accessible dialogs
* Accessible form controls
* Appropriate touch target sizes
* Responsive layouts
* Sufficient visual contrast
* Clear interactive states

---

## Error Handling

The application provides a retryable error state when task loading fails.

Example:

```text
Couldn't load tasks.

Please check your connection and try again.

[ Try again ]
```

For development purposes, API errors can be simulated using:

```js
localStorage.setItem("simulate-api-error", "true")
```

Reload the application to display the error state.

To disable the simulated error:

```js
localStorage.removeItem("simulate-api-error")
```

Then use the **Try again** action.

---

## Design Decisions

### Frontend-First Approach

The assessment primarily focuses on frontend implementation, so the application works completely with mock data without requiring a backend.

The API abstraction makes it possible to connect a real backend later without rewriting the UI.

### URL as Source of Truth

Search, filtering, sorting, and pagination are stored in the URL rather than Zustand because they represent the current task view.

### Separate Server and UI State

TanStack Query manages server state, while Zustand handles local UI state.

This prevents unnecessary global state and keeps responsibilities clear.

### Realistic Edge Cases

The mock dataset intentionally contains long text, missing values, overdue tasks, unassigned tasks, and different date scenarios to test UI resilience.

---

## AI Usage

AI tools were used during development as an implementation and problem-solving assistant.

I remained responsible for:

* Project structure and architecture decisions
* UI/UX decisions
* Technology selection
* Reviewing generated code
* Refactoring implementations
* Testing functionality
* Handling edge cases
* Making final implementation decisions

AI-generated suggestions were reviewed, adapted, and tested to fit the application's requirements.

---

## Scope

The implementation focuses on the core requirements of the task management system.

The following features were intentionally kept outside the current scope:

* Authentication
* Role and permission management
* Notifications
* Comments
* File uploads
* Calendar views
* Billing
* Real-time collaboration
* Complex workflow automation

These features can be added independently in a production environment.

---

## Future Improvements

Potential future improvements include:

* Real backend integration
* Authentication and authorization
* Database persistence
* Optimistic updates
* Real-time task updates
* Advanced permissions
* Automated testing
* Audit history
* Drag-and-drop task organization
* CI/CD pipeline

---

## License

This project was created for a frontend practical assessment.
