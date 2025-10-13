# Tasks: Session Page

**Input**: Design documents from `/specs/004-session-page-the/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The feature specification does not explicitly request tests or a TDD approach. Therefore, specific test tasks are not included in the implementation phases below, but overall validation is covered in the final phase.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions
- Paths shown below assume single project structure as defined in `plan.md`.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure for the feature.

- [ ] T001 [P] Configure Next.js route for Session Page in `src/app/timetable/[sessionId]/page.tsx`
- [ ] T002 [P] Create initial placeholder component for Session Page in `src/app/timetable/[sessionId]/page.tsx`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Define core data structures and update the data source.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T003 [US1, US3] Update `src/types/index.ts` with `Session`, `Talk`, and `Speaker` TypeScript interfaces based on `data-model.md`.
- [ ] T004 [US1, US3] Update `src/data/sessions.json` to include embedded `Talk` and `Speaker` data as per `data-model.md`. Ensure sample data is representative.

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 & 2 - Display Session Details (P1) 🎯 MVP

**Goal**: As an attendee, I want to view the detailed information of a specific talk (title, long description, skill level, learning perspective) so that I can decide if it aligns with my interests and learning goals and quickly assess its suitability for me.

**Independent Test**: Navigate to a Session Page route (e.g., `/timetable/session-id-123`) and verify that the session title, long description, skill level, and learning perspective are correctly displayed for the selected session.

### Implementation for User Story 1 & 2

- [ ] T005 [US1, US2] Create `src/features/timetable/components/SessionDetail.tsx` component to display session title, long description, level, and perspective.
- [ ] T006 [US1, US2] Implement data fetching logic within `src/app/timetable/[sessionId]/page.tsx` to retrieve session data from `sessions.json` based on `sessionId`.
- [ ] T007 [US1, US2] Integrate `SessionDetail.tsx` into `src/app/timetable/[sessionId]/page.tsx` and pass fetched session data as props.
- [ ] T008 [US1, US2] Apply styling to `SessionDetail.tsx` to ensure clear visual emphasis on level and perspective labels, adhering to brand guidelines.

**Checkpoint**: At this point, the Session Page should display core session details correctly.

---

## Phase 4: User Story 3 - Display Presenter Profile (P1)

**Goal**: As an attendee, I want to learn more about the speaker(s) of a talk, including their biography and social links, to understand their expertise and background.

**Independent Test**: On a Session Page, verify that the profile card(s) for all associated speakers are displayed, including their photo, biography, and clickable social media links.

### Implementation for User Story 3

- [ ] T009 [US3] Create `src/components/common/SpeakerCard.tsx` component to display a speaker's photo, name, biography, and social links.
- [ ] T010 [US3] Modify `src/features/timetable/components/SessionDetail.tsx` to iterate through the embedded speaker data for each talk and render `SpeakerCard.tsx` for each speaker.
- [ ] T011 [US3] Ensure social media links in `SpeakerCard.tsx` are correctly formatted and clickable.

**Checkpoint**: The Session Page should now display both session details and presenter profiles.

---

## Phase 5: User Story 4 - Navigation (P1)

**Goal**: As an attendee, I want to access the session details seamlessly from the Timetable, without losing my context of the overall schedule.

**Independent Test**: From the Timetable page, click on any session card and verify that it navigates to the corresponding dedicated Session Page route, displaying the correct session details.

### Implementation for User Story 4

- [ ] T012 [US4] Modify the existing session card component (likely in `src/features/timetable/components/SessionCard.tsx` or similar) to include a link (`<Link href="...">`) that navigates to the dedicated Session Page route (`/timetable/[sessionId]`).
- [ ] T013 [US4] Ensure the `sessionId` is correctly passed in the navigation link.

**Checkpoint**: Users can now navigate from the Timetable to the Session Page.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final improvements, styling, responsiveness, and overall validation.

- [ ] T014 [P] Ensure overall responsiveness of the Session Page across various screen sizes (mobile, tablet, desktop).
- [ ] T015 [P] Review and apply DevFest Tokyo 2025 brand guidelines for consistent styling across the Session Page.
- [ ] T016 [P] Conduct accessibility audit (WCAG 2.1 AA) and implement necessary adjustments.
- [ ] T017 [P] Perform performance testing to ensure the page loads within 2 seconds.
- [ ] T018 Code cleanup, refactoring, and add necessary comments.
- [ ] T019 Final validation of all functional and non-functional requirements against the `spec.md`.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories.
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion.
  - User stories can then proceed in parallel (if staffed) or sequentially in priority order.
- **Polish (Phase 6)**: Depends on all desired user stories being complete.

### User Story Dependencies

- **User Story 1 & 2 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories.
- **User Story 3 (P1)**: Can start after Foundational (Phase 2) - Depends on `SessionDetail.tsx` being able to receive and process speaker data.
- **User Story 4 (P1)**: Can start after Foundational (Phase 2) - Depends on the Session Page route being functional.

### Within Each User Story

- Models/Types before data fetching/component implementation.
- Components before integration into pages.

### Parallel Opportunities

- Tasks marked [P] can run in parallel.
- Once the Foundational phase completes, different user story phases can be worked on in parallel by different team members.

---

## Parallel Example: User Story 1 & 2

```bash
# Foundational tasks (T003, T004) must be completed first.

# Parallel implementation of components:
Task: "T005 [US1, US2] Create src/features/timetable/components/SessionDetail.tsx component..."
Task: "T006 [US1, US2] Implement data fetching logic within src/app/timetable/[sessionId]/page.tsx..."
```

---

## Implementation Strategy

### MVP First (User Story 1 & 2)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 & 2
4. **STOP and VALIDATE**: Test User Story 1 & 2 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 & 2 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 3 → Test independently → Deploy/Demo
4. Add User Story 4 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 & 2
   - Developer B: User Story 3
   - Developer C: User Story 4
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
