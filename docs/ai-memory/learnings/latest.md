# Latest Learnings

## 2025-11-09 00:00

### KNOWLEDGE OUTSIDE CODE BASE

- PR #35: The decision to explicitly document GitHub MCP tool usage in `AGENTS.md` was driven by repeated errors in identifying the correct repository and user name during previous interactions. This aims to improve the agent's reliability and reduce future errors.

### INTERNAL MODULE DEPENDENCY

- PR #38: When fixing a bug, it's important to identify and fix the root cause (in this case, in the data parser `src/lib/data-parser.ts`) in addition to the symptom (in the UI component).
- PR #36: To support dynamic OG images, `thumbnail_url?: string` was added to both `Session` and `Talk` interfaces in `src/types/index.ts`, and `src/lib/data-parser.ts` was updated to handle this new field.

### PR REVIEW ASPECT

- PR #38: When a component's test file already exists, it's better to modify the existing file rather than creating a new one to avoid conflicts.
- PR #36: During unit testing of `src/lib/seo.ts`, it was discovered that `withRepoBasePath` was always being called, even for absolute URLs. The `resolveOgImage` function was refactored to conditionally call `withRepoBasePath` only for relative paths, and the test was adjusted accordingly.
- PR #35: The requirement for full relative paths in learning notes was added to improve the traceability and usefulness of documented learnings for future code modifications.

## 2025-11-03 00:00

### KNOWLEDGE OUTSIDE CODE BASE

- PR #34: Next.js App Router requires `generateMetadata` functions for Client Components to be in Server Component files (e.g., `src/app/**/*.tsx`) for proper metadata generation.
- PR #33: Consistent environment variable configuration across all CI/CD stages (build, test, deploy) is critical to prevent failures. Dummy values can be used for non-deployment workflows.
- PR #32: Adopting GTM provides flexibility and centralized tag management for tracking, allowing easier updates without code changes.
- PR #26: Migrating to Firebase Hosting can streamline deployment and remove complexities associated with repository subpaths (e.g., GitHub Pages `basePath`).

### PR REVIEW ASPECT

- PR #34: Unit tests are crucial for identifying and resolving issues related to expected values and import paths during development, especially for new utility functions.
- PR #32: Comprehensive updates to specification documents are crucial to ensure documentation accurately reflects implemented changes and new technical approaches.
- PR #28: For E2E tests, use specific selectors (e.g., `data-testid`) to avoid ambiguity. For responsive designs, `toHaveCSS` can be more reliable than `toBeVisible()` in Playwright.
- PR #29: Proactively implement build checks (e.g., `.github/workflows/build-check.yml`) and use matrix strategies in CI workflows to catch build and test failures across different environments (PROD/DEV) early.

### EXTERNAL DEPENDENCY

- PR #30: When integrating third-party scripts in Next.js, prefer official libraries like `@next/third-parties/google` for optimized loading and automatic tracking.

### INTERNAL MODULE DEPENDENCY

- PR #29: Centralize data enrichment and normalization within a single function (e.g., `_loadData` in `src/lib/data-parser.ts`) to ensure consistent data typing across the application and prevent build errors.

---
