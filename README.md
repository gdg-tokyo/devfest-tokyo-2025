# DevFest Tokyo 2025 Web Site

This project is a Next.js application for GDG DevFest Tokyo 2025 event.

## Docs

- [Style Guide](./docs/web/style-guide.md)

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
