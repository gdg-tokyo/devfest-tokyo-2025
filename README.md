# DevFest Tokyo 2025 Web Site

This project is a Next.js application for [GDG DevFest Tokyo 2025](https://gdg-tokyo.connpass.com/event/369416/).

## Docs

- [Style Guide](./docs/web/style-guide.md)

## Project Overview

This Next.js application serves as the official website for GDG DevFest Tokyo 2025. Its primary goal is to provide attendees with a high-performance, single-page portal for seamless session discovery and selection. Key features include a client-side filtering system for talks by skill level, learning perspective, and technical tags, detailed session content, and easy registration via connpass. The site is built with a focus on speed using Static Site Generation (SSG) from local Markdown files.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.x or later (LTS recommended)
- **npm**: v9.x or later (comes with Node.js)

## Contribution

For detailed development guidelines, including Git conventions and methodologies, please refer to [CONTRIBUTING.md](./CONTRIBUTING.md).

## Getting Started

### Installation

```bash
npm install
npx playwright install --with-deps --no-shell
```

### Development Server

```bash
# To run the development server with **development data**:
npm run dev

# To run the development server with **production data**:
npm run dev:prod
```

NOTE: By default, the server runs with production data if `DEVFEST_TOKYO_2025_TARGET_ENV` is not set or set to `PROD`.

## Build Website

### Build Website Contents

The website content (sessions, talks, speakers) is generated from Markdown files located in the [`docs/web/prod/`](./docs/web/prod/) directory. A script parses these Markdown files, validates them against Zod schemas, and outputs JSON files to [`docs/web/prod/`](./docs/web/prod/).

To generate the content:

```bash
npm run build:content
```

This command should be run whenever there are changes to the Markdown content in `docs/web/prod/`.

### Build Next.js Website

```bash
# Build website with DEV data
npm run build

# Build website with PROD data
npm run build:prod
```

### Running Tests

```bash
# To run all unit/integration tests:
npm run test

# To run E2E tests:
npx playwright test
```
