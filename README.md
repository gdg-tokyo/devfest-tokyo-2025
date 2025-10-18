# DevFest Tokyo 2025 Web Site

This project is a Next.js application for the DevFest Tokyo 2025 event.

## Getting Started

### Development Server

To run the development server with **development data**:

```bash
DEVFEST_TOKYO_2025_TARGET_ENV=DEV npm run dev
```

To run the development server with **production data**:

```bash
npm run dev
```

(By default, the server runs with production data if `DEVFEST_TOKYO_2025_TARGET_ENV` is not set or set to `PROD`.)

### Running Tests

To run all unit/integration tests:

```bash
npm run test
```

To run E2E tests:

```bash
npx playwright test
```

To run tests with **development data**:

```bash
NEXT_PUBLIC_DEVFEST_TOKYO_2025_TARGET_ENV=DEV npm run test
```
