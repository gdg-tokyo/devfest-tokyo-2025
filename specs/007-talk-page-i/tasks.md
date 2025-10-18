# Tasks: Talk Page

- **Input**: Design documents from `/specs/007-talk-page-i/`
- **Prerequisites**: plan.md, spec.md, data-model.md
- **Tests**: Not explicitly requested in the feature specification.
- **Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Phase 1: Foundational (Blocking Prerequisites)

### Purpose: Core data loading and type updates that MUST be complete before ANY user story can be implemented.

- [x] T001 [US1] Update `types/index.ts` to include `Talk` and `Speaker` types as defined in `data-model.md`.
- [x] T002 [US1] Update `lib/data-parser.ts` to parse `talks.json` and `speakers.json` and provide a function `getTalkById(id: string)`.

### Checkpoint

Foundation ready - user story implementation can now begin.

---

## Phase 2: User Story 1 - View Talk Details (Priority: P1) 🎯 MVP

### Goal

As a potential attendee, I want to view a dedicated page for a specific talk so that I can get all the details about it, including the title, abstract, time, track, and speaker information.

### Independent Test

This can be tested by navigating to a talk's URL and verifying that all the required information is displayed correctly.

### Implementation for User Story 1

- [x] T003 [P] [US1] Create a new file `src/features/talk/components/TalkDetail.tsx` and implement a component that displays all the details of a talk.
- [x] T004 [US1] Create the dynamic route `src/app/talks/[talkId]/page.tsx`. This page should fetch the talk data using `getTalkById` and render the `TalkDetail` component.
- [x] T005 [US1] Update the `Link` component in `src/components/common/TalkCard.tsx` to navigate to the new talk page URL (e.g., `/talks/[talkId]`).

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently.

---

## Phase 3: User Story 2 - Share Talk on Social Media (Priority: P2)

### Goal for User Story 2

As a user, I want to share a link to a talk page on social media and have it display a rich preview (OGP) so that the shared link is more engaging and informative.

### Independent Test for User Story 2

This can be tested by pasting a talk page URL into a social media platform's post composer and verifying that a rich preview with a title, description, and image is generated.

### Implementation for User Story 2

- [x] T006 [US2] In `src/app/talks/[talkId]/page.tsx`, add the necessary OGP meta tags (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`) to the page `head`.

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Foundational (Phase 1)**: Must be completed before any other phase.
- **User Story 1 (Phase 2)**: Depends on the completion of the Foundational phase.
- **User Story 2 (Phase 3)**: Depends on the completion of User Story 1, as it modifies the same page component.

### Parallel Opportunities

- T003 can be worked on in parallel with T004 to some extent, but the final integration will depend on both being complete.

## Implementation Strategy

### MVP First (User Story 1 Only)

1.  Complete Phase 1: Foundational.
2.  Complete Phase 2: User Story 1.
3.  **STOP and VALIDATE**: Test User Story 1 independently.

### Incremental Delivery

1.  Complete Foundational phase.
2.  Add User Story 1 → Test independently → MVP is ready.
3.  Add User Story 2 → Test independently.
