# Tasks for Time Table Page

**Branch**: `003-time-table-page` | **Date**: 2025-10-13 | **Spec**: /specs/003-time-table-page/spec.md

This document outlines the actionable, dependency-ordered tasks for implementing the Time Table Page feature.

## Phase 1: Setup Tasks (Project Initialization)

- ~~**T001**~~: Set up the Time Table Page route and basic layout in `src/app/timetable/page.tsx`.
  - **File**: `src/app/timetable/page.tsx`

## Phase 2: Foundational Tasks (Blocking Prerequisites)

- ~~**T002**~~: Create the `sessions.json` asset in `src/data/` based on `data-model.md`.
  - **File**: `src/data/sessions.json`
- ~~**T003**~~: Implement a utility to load and parse `sessions.json`.
  - **File**: `src/lib/data-parser.ts` (example path, adjust as needed)

## Phase 3: User Story: View the event timetable at a glance (US1)

**Goal**: Attendees can quickly understand the schedule and available sessions.

**Independent Test Criteria**:

- The Time Table Page loads successfully.
- All sessions from `sessions.json` are displayed on the page.
- Session cards show essential information (title, speaker, time, track, room number).

- ~~**T004 (US1)**~~: Create a `SessionCard` component to display essential session information.
  - **File**: `src/components/timetable/SessionCard.tsx`
- ~~**T005 (US1)**~~: Implement the `TimetableGrid` component for desktop view, displaying sessions in a grid layout.
  - **File**: `src/components/timetable/TimetableGrid.tsx`
- ~~**T006 (US1)**~~: Integrate `TimetableGrid` into the Time Table Page to display all sessions.
  - **File**: `src/app/timetable/page.tsx`
- ~~**T007 (US1)**~~: Implement basic styling for `SessionCard` and `TimetableGrid` adhering to DevFest brand guide typography and color scheme.
  - **File**: `src/components/timetable/SessionCard.tsx`, `src/components/timetable/TimetableGrid.tsx`, `src/styles/globals.css`
- ~~**T021 (US1)**~~: Write unit tests for `SessionCard` component.
  - **File**: `tests/unit/components/timetable/SessionCard.test.tsx`
- ~~**T022 (US1)**~~: Write unit tests for `TimetableGrid` component.
  - **File**: `tests/unit/components/timetable/TimetableGrid.test.tsx`

## Phase 4: User Story: Timetable easy to navigate on both desktop and mobile devices (US6)

**Goal**: Attendees can plan their schedule regardless of the device they're using.

**Independent Test Criteria**:

- On desktop, the grid view is displayed.
- On mobile, the grid view adapts to a smaller screen and remains usable.
- Session cards adapt correctly to both desktop and mobile layouts.

- ~~**T009 (US6)**~~: Implement responsive logic in `src/app/timetable/page.tsx` to ensure the `TimetableGrid` is responsive.
  - **File**: `src/app/timetable/page.tsx`
- ~~**T010 (US6)**~~: Ensure `SessionCard` is responsive and adapts well to the grid view on all screen sizes.
  - **File**: `src/components/timetable/SessionCard.tsx`

## Phase 5: User Story: Filter sessions by skill level, learning perspective, and technical tags (US2, US3, US4)

**Goal**: Attendees can find talks relevant to their expertise, focus on content of interest, and locate sessions on specific topics.

**Independent Test Criteria**:

- A filtering system is present at the top of the page.
- Users can filter by skill level, learning perspective, and technical tags using chips.
- Users can filter by keyword using a search bar.
- Filtering actions instantly update the displayed sessions without a page reload.
- Filtered-out sessions are grayed out and non-interactive.

- ~~**T011 (US2, US3, US4)**~~: Create a `FilterSystem` component with UI elements for keyword search, skill level, learning perspective, and technical tags.
  - **File**: `src/components/timetable/FilterSystem.tsx`
- ~~**T012 (US2, US3, US4)**~~: Implement client-side filtering logic within the `FilterSystem` component to filter sessions based on selected criteria.
  - **File**: `src/components/timetable/FilterSystem.tsx`
- ~~**T013 (US2, US3, US4)**~~: Integrate `FilterSystem` into `src/app/timetable/page.tsx` and connect it to the session display logic.
  - **File**: `src/app/timetable/page.tsx`
- ~~**T014 (US2, US3, US4)**~~: Ensure filtering actions instantly update the displayed sessions, graying out non-matching sessions.
  - **File**: `src/app/timetable/page.tsx`
- ~~**T024 (US2, US3, US4)**~~: Write unit tests for `FilterSystem` component.
  - **File**: `tests/unit/components/timetable/FilterSystem.test.tsx`

## Phase 6: User Story: See session details clearly on each card & visually appealing and consistent with branding (US5, US7)

**Goal**: Session cards are clear, visually appealing, and consistent with event branding.

**Independent Test Criteria**:

- Session cards adhere to DevFest brand guide typography and color scheme.
- Skill level and learning perspective labels are highlighted with distinct colors.
- The overall visual design aligns with the provided screenshot.

- ~~**T015 (US5, US7)**~~: Refine `SessionCard` styling to utilize distinct colors for skill level and learning perspective labels, adhering to the DevFest brand guide.
  - **File**: `src/components/timetable/SessionCard.tsx`, `src/styles/globals.css`
- ~~**T016 (US5, US7)**~~: Ensure overall visual design of the timetable page aligns with the provided screenshot (`@.reference/screenshot/time_table_1.png`).
  - **File**: `src/app/timetable/page.tsx`, `src/components/timetable/TimetableGrid.tsx`, `src/components/timetable/SessionCard.tsx`, `src/styles/globals.css`
- ~~**T026 (US5, US7)**~~: Implement styling for time slot indicators to have no background color as per FR1.7.
  - **File**: `src/styles/globals.css`
- ~~**T027 (US5, US7)**~~: Create and style track header cards with rounded corners, black border, and half-tone Google brand colors as per FR1.8.
  - **File**: `src/components/timetable/TimetableGrid.tsx`, `src/styles/globals.css`

## Phase 7: Polish & Cross-Cutting Concerns

- ~~**T017**~~: Implement the overlay message card for data unavailability (FR1.5).
  - **File**: `src/app/timetable/page.tsx`, `src/components/common/OverlayMessageCard.tsx` (example path, adjust as needed)
- ~~**T018**~~: Ensure WCAG 2.1 AA accessibility standards are met, focusing on color contrast and keyboard navigation.
  - **File**: `src/app/timetable/page.tsx`, `src/components/timetable/FilterSystem.tsx`, `src/components/timetable/SessionCard.tsx`, `src/styles/globals.css`
- ~~**T019**~~: Optimize the page for performance (page load < 2s, filter within 15s).
  - **File**: `src/app/timetable/page.tsx`, `src/components/timetable/TimetableGrid.tsx`, `src/components/timetable/FilterSystem.tsx`
- ~~**T020**~~: Implement navigation links from the landing page and header to the Time Table Page.
  - **File**: `src/app/page.tsx` (landing page), `src/components/Navbar.tsx` (example path, adjust as needed)
- ~~**T025 (E2E)**~~: Write end-to-end tests for the Time Table Page covering display, filtering, and responsiveness.
  - **File**: `tests/e2e/timetable.spec.ts`

## Dependencies (User Story Completion Order)

All user stories are designed to be largely independent, allowing for parallel development. However, foundational tasks must be completed first.

- Phase 1: Setup Tasks
- Phase 2: Foundational Tasks
- Phase 3: User Story 1 (View timetable at a glance)
- Phase 4: User Story 6 (Timetable easy to navigate on desktop and mobile)
- Phase 5: User Story 2, 3, 4 (Filter sessions)
- Phase 6: User Story 5, 7 (Session card details and branding)
- Phase 7: Polish & Cross-Cutting Concerns

## Parallel Execution Examples

- **Within Phase 3 (US1)**: T004 (SessionCard) and T005 (TimetableGrid) can be developed in parallel after T001-T003 are complete.
- **Across Phases**: Once foundational tasks (Phase 1 & 2) are complete, different developers could work on Phase 3, 4, 5, and 6 concurrently, with integration happening in Phase 7.

## Implementation Strategy

This feature will be developed using an incremental delivery approach, focusing on delivering a Minimum Viable Product (MVP) first, which includes the core functionality of displaying the timetable and basic responsiveness. Subsequent increments will add filtering capabilities, refined visual branding, and cross-cutting concerns like accessibility and performance optimization.

**MVP Scope**: User Story 1 (View the event timetable at a glance) and User Story 6 (Timetable easy to navigate on both desktop and mobile devices).
