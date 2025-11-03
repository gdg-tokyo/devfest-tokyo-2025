# Latest Learnings

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
