## 2025-11-16 00:00

### INTERNAL MODULE DEPENDENCY

- The `HtmlContent` component (`src/components/common/HtmlContent.tsx`) renders a `div` when `stripHtmlTags` is true and an `article` when false. This distinction is crucial for E2E test locators.

### PR REVIEW ASPECT

- When testing CSS properties like `webkitLineClamp` in E2E tests, it's crucial to target the _exact_ DOM element where the property is applied. Generic locators or assumptions about DOM structure can lead to brittle tests.
- Using `data-testid` attributes is a highly effective practice for creating stable and unambiguous E2E tests, especially when dealing with components that dynamically render different HTML elements or when CSS classes might not be unique enough.
- Do not prematurely revert code that makes tests pass, even if it seems like a "temporary" measure, until the underlying reason for its necessity is fully understood.

# Latest Learnings

## 2025-11-15 18:00

### INTERNAL MODULE DEPENDENCY

- PR #XX: To correctly differentiate between speaker photos and talk thumbnails, the parser must be updated to check the `alt` attribute of `<img>` tags. For example, speaker photos should be identified by `alt="speaker"` and talk thumbnails by `alt="talk_thumbnail"`.
- PR #XX: To ensure clean, image-free content in speaker bios and talk abstracts, the parser should be updated to remove all `<img>` tags from the final HTML output.
- PR #XX: The `resolve_image_path` function should be robust enough to handle different types of image paths, including absolute paths (starting with `/`), relative paths, and external URLs. This ensures that all images are correctly resolved to their public paths.

### PR REVIEW ASPECT

- PR #XX: Following a Test-Driven Development (TDD) approach by first writing or updating tests that fail, and then fixing the implementation to make them pass, is a valuable best practice for ensuring code quality and preventing regressions.

## 2025-11-15 00:00

### INTERNAL MODULE DEPENDENCY

- PR #60: Correcting a bug in a data processing script (`markdown-to-json`) is a more precise and effective solution than attempting to alter a broad tool configuration like Prettier to work around it. Specifically, handling escaped characters (`\_`) directly in the parser for Twitter handles was the right approach.
- PR #57: When parsing complex structured text (like Markdown with special sections), it's robust to create dedicated pre-processing functions (e.g., `remove_session_chair_content`) to clean and isolate the target content before the main parsing step.

### PR REVIEW ASPECT

- PR #57: Extracting repeated UI logic into dedicated, reusable components (e.g., `src/components/common/SpeakerDetailCard.tsx`) improves modularity, standardizes appearance, and simplifies maintenance, adhering to the DRY principle.
- PR #57: When fixing a data parsing bug, add a specific unit test that validates the fix to prevent future regressions. For example, a test was added to ensure session chair content was properly excluded from the session description.

### EXTERNAL DEPENDENCY

- PR #56: When using the Tailwind CSS Typography plugin, if the default text color (e.g., from `prose-zinc`) has poor contrast with the site's background, you can override it by applying a specific text color utility (e.g., `text-black-02`) directly to the `article` element that has the `prose` class.
- PR #55: The `@tailwindcss/typography` plugin is an effective way to apply consistent and attractive default styling to blocks of HTML generated from Markdown, saving the effort of writing extensive custom CSS.

### SECURITY NOTES

- PR #55: To prevent XSS vulnerabilities and improve performance, convert and sanitize user-generated Markdown into HTML on the server-side (e.g., during a build step with Python's `bleach` library) before sending it to the frontend. This provides pre-sanitized content to the client.

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
- PR #46: When fixing a bug, first update the tests to reflect the new requirements and confirm they fail as expected. Then, fix the implementation to make the tests pass. This is a fundamental principle of Test-Driven Development (TDD).
- PR #46: Test files should be named with the `.test.tsx` extension to be picked up by the Jest test runner, and mock data used in tests should be complete and reflect the actual data structure to avoid unexpected test failures.
- PR #46: When a test is failing, it's important to use debugging tools like `screen.debug()` and `console.log` to inspect the rendered output and the state of the component, and to check the test file name and the Jest configuration if the test is not being picked up by the test runner.

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
