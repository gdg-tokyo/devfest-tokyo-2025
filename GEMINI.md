# DevFest Tokyo 2025 Web Site

## Project Overview

The core concept of this Next.js application leveraging a DevFest Brand Guide-compliant design, is to create a high-performance, single-page portal optimized for the DevFest Tokyo 2025 attendees. Its primary objective is to facilitate seamless session discovery and selection by providing a blazing-fast, client-side filtering system that allows users to categorize talks instantly by skill level, learning perspective, and technical tags. The architecture prioritizes speed via Static Site Generation (SSG) from local Markdown files, ensuring that attendees can efficiently navigate the interactive timetable, view detailed session content, and easily complete the crucial task of registering via the official connpass event page.

## Event Page

https://gdg-tokyo.connpass.com/event/369416/

## Disctionary

- `talk`: A single presentation.
- `session`: A set of presentations related to the same topic.

## DevFest Tokyo 2025 Web Style Guide

This section outlines the key styling conventions and components used across the DevFest Tokyo 2025 website, derived from the current implementation and `tailwind.config.ts`.

### Colors

- **Google Brand Colors**: `google-blue-500`, `google-red-500`, `google-yellow-500`, `google-green-500`
- **Halftone Colors**: `halftone-blue`, `halftone-yellow`, `halftone-red`, `halftone-green`
- **GDG Pastel Colors**: `gdg-pastel-blue`, `gdg-pastel-yellow`, `gdg-pastel-red`, `gdg-pastel-green`
- **Neutrals**: `off-white` (`#f0f0f0`), `black-02` (`#1e1e1e`)

### Typography

- **Primary Font**: `google-sans` (used for general text, headings)
- **Monospace Font**: `roboto-mono` (used for time labels, code-like elements)

### Component Styling

- **Default Background**: The entire website uses `bg-off-white` (`#f0f0f0`) as its default background color.

- **Panels/Cards (General)**:

  - **Shape**: `rounded-lg`
  - **Border**: `border-2 border-gray-800` (e.g., Session Cards, Timetable Track Headers)

- **Chips (Labels)**:

  - **Size**: `text-xxs px-1 py-0` (extra small text with minimal padding)
  - **Shape**: `rounded-full` (pill shape)
  - **Border**: `border border-black` (for outlined style)
  - **Text Color**: `text-gray-800` (for better contrast with pastel backgrounds)

  - **Level Chips Color Mapping**:

    - Beginner: `bg-gdg-pastel-blue`
    - Intermediate: `bg-gdg-pastel-green`
    - Advanced: `bg-gdg-pastel-red`

  - **Perspective Chips Color Mapping**: (Note: Perspective filter has been removed, but colors are defined for consistency if re-introduced)
    - Introduction: `bg-google-blue-500`
    - Experience: `bg-google-green-500`
    - Challenge: `bg-google-red-500`

### Icons

- **Speakers**: Represented by a person icon (SVG).
- **Time**: Represented by a clock icon (SVG).

---

# Application Architecture (Next.js)

This architecture design emphasizes decoupling the core business logic from the Next.js/React framework to ensure scalability and maintainability.

## 1. Guiding Principle: Separation of Concerns

- **Domain Layer (Business Logic):** Pure TypeScript logic, independent of React components or hooks. Focuses on the "what" (the application's core functionality).
- **Presentation Layer (Framework Logic):** Handles UI rendering, routing, and state management using Next.js and React. Focuses on the "how" (the presentation).

## 2. Directory Structure (`src/`)

| Directory            | Purpose                                                                                                                                                                      |
| :------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/`               | Next.js App Router entry points (pages, layouts, middleware, route handlers). Orchestrates the top-level views.                                                              |
| `features/`          | **Feature-based grouping.** Contains all related logic (components, hooks, business logic, API calls) specific to a single, major feature (e.g., `user`, `post`, `billing`). |
| `components/`        | Reusable, general-purpose UI components. Should be independent of specific features and align with **Presentational** component patterns.                                    |
| `lib/`               | Utility functions, external service configurations (e.g., API clients, authentication setup, logger).                                                                        |
| `hooks/`             | Reusable custom hooks that are not tied to a single feature.                                                                                                                 |
| `types/`             | Shared TypeScript types, interfaces, and enums used across the application.                                                                                                  |
| `domain/` (Optional) | Directory for housing pure, framework-agnostic core business entities and logic (if separated from `features/`).                                                             |

## 3. Component & Feature Division

- **Feature Modules (`features/`):** Components within these modules are typically **Container** components. They handle data fetching, manage feature-specific state, and connect the UI to the Data/Domain layers.
- **UI Components (`components/`):** These are **Presentational** components. They are pure, receive all necessary data via props, and contain minimal to no business logic, focusing purely on rendering the UI (e.g., following **Atomic Design** principles).
- **Pages/Layouts (`app/`):** The highest level of the Presentation Layer. They are thin, focusing primarily on composing feature modules and UI components to form complete screens.

---

# devfest-tokyo-2025-web Development Guidelines

Auto-generated from all feature plans. Last updated: 2025-10-13

## Active Technologies

- Local JSON files (`sessions.json` for sessions/talks, `speakers.json` for speakers) (004-session-page-the)
- Local JSON file (`sessions.json` for all session, talk, and speaker data) (004-session-page-the)

- Local JSON file (003-time-table-page)
- TypeScript 5.x + Next.js, React, Tailwind CSS (003-time-table-page)

- TypeScrip + Next.js, React, Tailwind CSS (001-landing-page)
- `TypeScript 5.x` + `Next.js`, `React`, `Tailwind CSS` (001-landing-page)
- `File system (JSON)` (001-landing-page)
- `TypeScript 5.x` + `Next.js`, `React`, `Tailwind CSS`, `framer-motion` (002-devfest-style)

## Project Structure

```
src/
tests/
```

## Commands

# Add commands for TypeScrip

## Code Style

TypeScrip: Follow standard conventions

## Recent Changes

- 004-session-page-the: Added TypeScript 5.x + Next.js, React, Tailwind CSS
- 004-session-page-the: Added TypeScript 5.x + Next.js, React, Tailwind CSS

- 003-time-table-page: Added TypeScript 5.x + Next.js, React, Tailwind CSS

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
