# devfest-tokyo-2025 Development Guidelines

Auto-generated from all feature plans. Last updated: 2025-10-18

## Active Technologies

- Markdown files (`docs/prod/`) parsed into JSON (`src/data/prod/`) (Content Generation)
- Local JSON files (`sessions.json` for sessions/talks, `speakers.json` for speakers) (004-session-page-the)
- Local JSON file (`sessions.json` for all session, talk, and speaker data) (004-session-page-the)

- Local JSON file (003-time-table-page)
- TypeScript 5.x + Next.js, React, Tailwind CSS (003-time-table-page)

- TypeScrip + Next.js, React, Tailwind CSS (001-landing-page)
- `TypeScript 5.x` + `Next.js`, `React`, `Tailwind CSS` (001-landing-page)
- `File system (JSON)` (001-landing-page)
- `TypeScript 5.x` + `Next.js`, `React`, `Tailwind CSS`, `framer-motion` (002-devfest-style)
- (006-data-schema-currently)

## Project Structure

```
src/
tests/
```

## Commands

- `npm run build:content`: Parses Markdown content from `docs/prod/` and generates JSON data in `src/data/prod/`.

# Add commands for

## Code Style

TypeScrip: Follow standard conventions

## Recent Changes

- 004-session-page-the: Added TypeScript 5.x + Next.js, React, Tailwind CSS
- 006-data-schema-currently: Added
- 008-app-nav-header: Implemented App Header Design

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
