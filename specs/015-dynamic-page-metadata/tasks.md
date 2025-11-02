# Tasks: Dynamic Page Metadata Generation

- **Branch**: `015-dynamic-page-metadata` | **Date**: 2025-11-02 | **Plan**: /specs/015-dynamic-page-metadata/plan.md
- **Feature**: Dynamic Page Metadata Generation

## Pre-requisite

- [ ] T000: Rename `src/app/layput.tsx` to `src/app/layout.tsx`. This is crucial for Next.js Metadata API to function correctly.

## Phase 1: Setup

**Goal**: Establish the foundational structure for metadata management.

- [ ] T001: Create `src/lib/site.ts` with `SITE` configuration, including `defaultOgImage`, `locale`, and `twitter` fields. (P)
  - **File**: `src/lib/site.ts`
  - **Content**: As defined in `quickstart.md` section 1.
- [ ] T002: Create `src/lib/seo.ts` with `PageMetaInput` type and `buildMetadata` function, extended to support OGP and Twitter Card metadata. (P)
  - **File**: `src/lib/seo.ts`
  - **Content**: As defined in `quickstart.md` section 2.

## Phase 2: Foundational Configuration

**Goal**: Implement site-wide default metadata in the root layout.

- [ ] T003: Verify `app/layout.tsx` is correctly configured for site-wide default title, description, and `metadataBase`, and that `icons.icon` uses `withRepoBasePath()`. (P)
  - **File**: `src/app/layout.tsx`
  - **Content**: As defined in `quickstart.md` section 3.

## Phase 3: User Story 1: SEO Optimization for Landing Page

**Goal**: Ensure the landing page has unique and descriptive metadata.

**Independent Test Criteria**: The landing page (`/`) displays a unique and descriptive title, meta description, and correct OGP/Twitter Card metadata in the browser tab and HTML source.

- [x] T004: Apply dynamic metadata to the landing page (`app/page.tsx`).
  - **File**: `src/app/page.tsx`
  - **Action**: Import `buildMetadata` and use it within `generateMetadata` to set a specific title and description for the landing page.

## Phase 4: User Story 2: Dynamic Talk Page Metadata

**Goal**: Implement dynamic metadata for timetable, talks list, individual talk, and individual session pages with specific title formats.

**Independent Test Criteria**: The timetable, talks list, individual talk, and individual session pages display correct dynamic titles, meta descriptions, and OGP/Twitter Card metadata according to FR7, FR8, FR9, FR10, and FR11.

- [x] T005: Implement dynamic metadata for `app/timetable/page.tsx`.
  - **File**: `src/app/timetable/page.tsx`
  - **Action**: Import `buildMetadata` and `SITE`, use `generateMetadata` to set title to "Timetable - GDG DevFest Tokyo 2025".
- [x] T006: Implement dynamic metadata for `app/talks/page.tsx`.
  - **File**: `src/app/talks/page.tsx`
  - **Action**: Import `buildMetadata` and `SITE`, use `generateMetadata` to set title to "Talks - GDG DevFest Tokyo 2025".
- [x] T007: Implement dynamic metadata for `app/talks/[slug]/page.tsx`.
  - **File**: `src/app/talks/[slug]/page.tsx`
  - **Action**: Import `buildMetadata` and `SITE`, fetch talk data, use `generateMetadata` to set title to "{Talk Title} (by {speaker name}) - GDG DevFest Tokyo 2025".
- [x] T008: Implement dynamic metadata for `app/sessions/[slug]/page.tsx`.
  - **File**: `src/app/sessions/[slug]/page.tsx`
  - **Action**: Import `buildMetadata` and `SITE`, fetch session data, use `generateMetadata` to set title to "{Session Title} - GDG DevFest Tokyo 2025".

## Final Phase: Polish & Cross-Cutting Concerns

**Goal**: Ensure overall quality and adherence to non-functional requirements.

- [x] T009: Verify performance (NFR1) by checking page load times and metadata rendering speed.
- [x] T010: Review code for maintainability (NFR2) and adherence to project coding standards.
- [x] T011: Conduct SEO compliance check (NFR3) using tools like Lighthouse for key pages.

## Phase 5: Unit Testing

**Goal**: Ensure the dynamic page metadata generation logic is robust and correct through unit tests.

**Independent Test Criteria**: All unit tests pass, and code coverage for metadata-related files is high (e.g., >90%).

- [ ] T012: Create unit tests for `src/lib/site.ts`.
  - **File**: `tests/unit/lib/site.test.ts`
  - **Action**: Verify `SITE` object properties, including `defaultOgImage`, `locale`, and `twitter`.
- [ ] T013: Create unit tests for `src/lib/seo.ts`.
  - **File**: `tests/unit/lib/seo.test.ts`
  - **Action**: Test `buildMetadata` function with various inputs (title/description/ogImage/type/noindex/imageAlt present, absent, path variations), verifying correct OGP and Twitter Card metadata generation.
- [x] T014: Create unit tests for `src/app/layout.tsx`'s `metadata` export.
  - **File**: `tests/unit/app/layout.test.ts`
  - **Action**: Verify `metadata` export uses `SITE` defaults and template.
- [x] T015: Create unit tests for `src/app/page.tsx`'s `generateMetadata`.
  - **File**: `tests/unit/app/page.test.ts`
  - **Action**: Verify correct metadata is generated for the landing page.
- [x] T016: Create unit tests for `src/app/timetable/page.tsx`'s `generateMetadata`.
  - **File**: `tests/unit/app/timetable/page.test.ts`
  - **Action**: Verify correct metadata is generated for the timetable page.
- [x] T017: Create unit tests for `src/app/talks/page.tsx`'s `generateMetadata`.
  - **File**: `tests/unit/app/talks/page.test.ts`
  - **Action**: Verify correct metadata is generated for the talks list page.
- [x] T018: Create unit tests for `src/app/talks/[talkId]/page.tsx`'s `generateMetadata`.
  - **File**: `tests/unit/app/talks/[talkId]/page.test.ts`
  - **Action**: Mock `getTalkById`, verify correct metadata with dynamic title format.
- [x] T019: Create unit tests for `src/app/sessions/[sessionId]/page.tsx`'s `generateMetadata`.
  - **File**: `tests/unit/app/sessions/[sessionId]/page.test.ts`
  - **Action**: Mock `getSessionById`, verify correct metadata with dynamic title format.

## Acceptance Criteria (AC)

- [ ] AC1: When only `title` is specified: `<title>` is `"${title} | ${SITE.name}"`, `description` is `SITE.defaultDescription`, and OG/Twitter output matches these values.
- [ ] AC2: When `title` + `description` are specified: Both are output as page-specific values (OG/Twitter also match).
- [ ] AC3: When `ogImage` is not specified: `SITE.defaultOgImage` is used (absolute path via `withRepoBasePath`).
- [ ] AC4: Verify tags using `curl -sL <page> | grep -iE 'og:|twitter:'`.
- [ ] AC5: Title, description, and image are displayed correctly in X/Facebook/LinkedIn/Slack previews.
- [ ] AC6: Images are displayed correctly even in environments requiring `assetPrefix` (e.g., GitHub Pages).

## Operational Notes

- OGP images should be 1200x630 pixels (PNG or JPEG, < 5MB recommended).
- Social media platforms have strong caching: use their debuggers to re-fetch updated metadata (X Card Validator, Facebook Sharing Debugger, LinkedIn Post Inspector, Slack).
- `NEXT_PUBLIC_SITE_URL` must be set for both Preview/Prod environments (required for absolute URL generation).
- Article pages should use `type: "article"` for appropriate metadata.
