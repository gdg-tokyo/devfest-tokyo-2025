# DevFest Tokyo 2025 Web Site

## Term Definition

- `DevFest`: The world's largest community-driven tech conference, bringing together passionate developers from around the globe. Hosted annually by Google Developer Groups, DevFest offers a unique opportunity to explore developer tools, learn from Google and Google Developer Experts, and connect with fellow developers. The global theme for DevFest this year is "Building Safe, Secure and Scalable Solutions with AI and Cloud" and the local theme is "Find your new eyes" (eyes ~= perspective).
- `GDG DevFest Tokyo 2025`: The official name of this event.
- `GDG Tokyo` or `Google Developer Groups Tokyo`: Google Developers Group (GDG) Tokyo is a group of people who are interested in Google technology mainly and share information. GDG stands for Google Developers Groups and is a platform offered by Google Developers to support community-run developer groups
- `talk`: A single presentation or a hands-on session.
- `session`: A set of presentations related to the same topic.
- `connpass`: A evemt management platform. This site is used for participant registration for this event.

---

## Project Overview

The core concept of this Next.js application leveraging a DevFest Brand Guide-compliant design, is to create a high-performance, single-page portal optimized for the DevFest Tokyo 2025 attendees. Its primary objective is to facilitate seamless session discovery and selection by providing a blazing-fast, client-side filtering system that allows users to categorize talks instantly by skill level, learning perspective, and technical tags. The architecture prioritizes speed via Static Site Generation (SSG) from local Markdown files, ensuring that attendees can efficiently navigate the interactive timetable, view detailed session content, and easily complete the crucial task of registering via the official connpass event page.

### Event Overview of DevFest Tokyo 2025

DevFest is a developer event held worldwide by the Google Developer Group (GDG) community. In Tokyo, it's a community event where you can learn the latest information and practical know-how on various technologies such as Android, Google Cloud, Web, Firebase, Machine Learning (ML), Flutter, and Go, all in one day. This year marks the 10th time it will be held, on Saturday, November 22nd, at Bellesalle Shibuya First.

#### Event Page (connpass)

Users must complete registration here to participate.

https://gdg-tokyo.connpass.com/event/369416/

#### Target Participatts

- People who are interested in the Google Technologies or AI
- Engineers (Junior to Senior), Stundents in Japan (especially in Tokyo)
- Japanese speakers

### Expected Users of this Web Site

##### Participants (参加者)

Attendees of this event. By viewing this website, participants can learn how to register, the event's content and timetable, and what they can learn. DevFest Tokyo 2025 features a large number of sessions running concurrently across 4 tracks, with many talks. Since the connpass event page doesn't clearly indicate what topics will be covered, this site allows attendees to find topics of interest to them. They can also view detailed information for each session and talk.

##### Organizers (Operations Team / Speakers)

DevFest Tokyo features a vast amount of content, making it challenging for individual participants to find content that matches their interests and skill levels. Additionally, finding content on connpass can be difficult. This website allows us to convey more information to participants in a user-friendly format. It also helps in guiding participants to event registration and effectively communicating other important announcements to them.

---

## Development Guideline

### Coding Style Guidelines

TODO: 使用言語ごとのスタイルガイド（PEP8, ESLint/Prettier など）、命名規則、コメント方針、Lint/Formatter ルールを記載すること。

#### Next.js

This architecture design emphasizes decoupling the core business logic from the Next.js/React framework to ensure scalability and maintainability.

##### Guiding Principle: Separation of Concerns

- **Domain Layer (Business Logic):** Pure TypeScript logic, independent of React components or hooks. Focuses on the "what" (the application's core functionality).
- **Presentation Layer (Framework Logic):** Handles UI rendering, routing, and state management using Next.js and React. Focuses on the "how" (the presentation).

##### Directory Structure (`src/`)

| Directory            | Purpose                                                                                                                                                                      |
| :------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/`               | Next.js App Router entry points (pages, layouts, middleware, route handlers). Orchestrates the top-level views.                                                              |
| `features/`          | **Feature-based grouping.** Contains all related logic (components, hooks, business logic, API calls) specific to a single, major feature (e.g., `user`, `post`, `billing`). |
| `components/`        | Reusable, general-purpose UI components. Should be independent of specific features and align with **Presentational** component patterns.                                    |
| `lib/`               | Utility functions, external service configurations (e.g., API clients, authentication setup, logger).                                                                        |
| `hooks/`             | Reusable custom hooks that are not tied to a single feature.                                                                                                                 |
| `types/`             | Shared TypeScript types, interfaces, and enums used across the application.                                                                                                  |
| `domain/` (Optional) | Directory for housing pure, framework-agnostic core business entities and logic (if separated from `features/`).                                                             |

##### Component & Feature Division

- **Feature Modules (`features/`):** Components within these modules are typically **Container** components. They handle data fetching, manage feature-specific state, and connect the UI to the Data/Domain layers.
- **UI Components (`components/`):** These are **Presentational** components. They are pure, receive all necessary data via props, and contain minimal to no business logic, focusing purely on rendering the UI (e.g., following **Atomic Design** principles).
- **Pages/Layouts (`app/`):** The highest level of the Presentation Layer. They are thin, focusing primarily on composing feature modules and UI components to form complete screens.

### Security considerations

TODO: API キーや認証情報の扱い方、依存関係の脆弱性管理、通信方式、入力値検証の必須ルールなどを記載すること。

### Build & Test

TODO: セットアップ手順、ビルドコマンド、テスト実行方法、CI/CD でのチェック内容を記載すること。

### Knowledge & Library

- 実装前に`Context7 MCP Server`を利用し、`resolve-library-id` → `get-library-docs` で関連ライブラリ（例：`/upstash/context7`）の最新情報を取得する。

### Maintenance policy

- 会話の中で繰り返し指示されたことがある場合は反映を検討すること
- 冗長だったり、圧縮の余地がある箇所を検討すること
- 簡潔でありながら密度の濃い文書にすること

---

## UI Design Guide

This section outlines the key styling conventions and components used across the DevFest Tokyo 2025 website.

### Colors

- **Google Brand Colors**: `google-blue-500`, `google-red-500`, `google-yellow-500`, `google-green-500`
- **Halftone Colors**: `halftone-blue`, `halftone-yellow`, `halftone-red`, `halftone-green`
- **GDG Pastel Colors**: `gdg-pastel-blue`, `gdg-pastel-yellow`, `gdg-pastel-red`, `gdg-pastel-green`
- **Neutrals**: `off-white` (`#f0f0f0`), `black-02` (`#1e1e1e`)

### Typography

- **Primary Font**: `google-sans` (used for general text, headings)
- **Monospace Font**: `roboto-mono` (used for time labels, code-like elements)

### Component Styling

#### **Background**

The entire website uses `bg-off-white` (`#f0f0f0`) as its default background color.

#### **Panels/Cards (General)**

- **Shape**: `rounded-lg`
- **Border**: `border-2 border-gray-800` (e.g., Session Cards, Timetable Track Headers)

#### **Chips (Labels)**

- **Size**: `text-xxs px-1 py-0` (extra small text with minimal padding)
- **Shape**: `rounded-full` (pill shape)
- **Border**: `border border-black` (for outlined style)
- **Text Color**: `text-gray-800` (for better contrast with pastel backgrounds)

#### **Color Mapping for Tag/Chips**

Level Label:

- Beginner: `bg-gdg-pastel-blue`
- Intermediate: `bg-gdg-pastel-green`
- Advanced: `bg-gdg-pastel-red`

Perspective Labels:

- Introduction: `bg-google-blue-500`
- Experience: `bg-google-green-500`
- Challenge: `bg-google-red-500`

### Icons

- The material icons are installed. Select it from there.

---

# Memory for Spec-Kit

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

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
