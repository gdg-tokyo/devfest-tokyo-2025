# Feature: Landing Page Stakeholders Section - Tasks

This document outlines the tasks required to implement the "Landing Page Stakeholders Section" feature, organized by user story and priority.

## Feature Name

Landing Page Stakeholders Section

## Goal

Display key stakeholders (organizers, partners) on the landing page, with easily updatable data.

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS

## Libraries

None explicitly mentioned beyond the core tech stack.

## Project Structure

- `src/features/landing-page/components/StakeholdersSection.tsx`
- `src/data/prod/stakeholders.json`
- `src/data/dev/stakeholders.json`
- `src/types/stakeholders.ts`
- `src/lib/data-parser.ts`

---

## Phase 1: Setup Tasks

No specific setup tasks are required beyond the existing project setup.

---

## Phase 2: Foundational Tasks

These tasks are prerequisites that must be completed before any user story implementation can begin.

- **T001 [Foundational]**: Define TypeScript types for `Stakeholder` in `src/types/stakeholders.ts`.
  - **File**: `src/types/stakeholders.ts`
- **T002 [Foundational]**: Create placeholder `stakeholders.json` files for development and production environments.
  - **Files**: `src/data/dev/stakeholders.json`, `src/data/prod/stakeholders.json`
- **T003 [Foundational]**: Implement a utility function in `src/lib/data-parser.ts` to load and parse stakeholder data from the appropriate JSON file based on the environment.
  - **File**: `src/lib/data-parser.ts`

---

## Phase 3: User Story 1 (P1: Display Stakeholders)

**Story Goal**: As a participant, I want to see a dedicated "Organizers and Partners" section on the landing page so I can easily identify the key entities behind DevFest Tokyo 2025.

**Independent Test Criteria**:

- The "Organizers and Partners" section is rendered on the landing page.
- It displays the names and logos of organizers and partners.
- The section is responsive and visually appealing across different screen sizes.

- **T004 [US1]**: Create the `StakeholdersSection` React component in `src/features/landing-page/components/StakeholdersSection.tsx`.
  - **File**: `src/features/landing-page/components/StakeholdersSection.tsx`
- **T005 [US1]**: Within `StakeholdersSection.tsx`, import and use the data parsing utility (`src/lib/data-parser.ts`) to fetch stakeholder data.
  - **File**: `src/features/landing-page/components/StakeholdersSection.tsx`
- **T006 [US1]**: Render the stakeholder logos and names within the `StakeholdersSection` component, distinguishing between organizers and partners.
  - **File**: `src/features/landing-page/components/StakeholdersSection.tsx`
- **T007 [US1]**: Apply Tailwind CSS classes to `StakeholdersSection` to ensure a responsive and visually appealing layout, including proper spacing and alignment for logos and names.
  - **File**: `src/features/landing-page/components/StakeholdersSection.tsx`
- **T008 [US1]**: Integrate the `StakeholdersSection` component into the main landing page (`src/app/page.tsx`).
  - **File**: `src/app/page.tsx`

---

## Final Phase: Polish & Cross-Cutting Concerns

- **T010 [Polish]**: Add unit tests for the `Stakeholder` types and the data parsing utility (`src/lib/data-parser.ts`).
  - **File**: `tests/unit/lib/data-parser.test.ts` (new file)
- **T011 [Polish]**: Add unit tests for the `StakeholdersSection` component to ensure it renders correctly with mock data.
  - **File**: `tests/unit/features/landing-page/components/StakeholdersSection.test.tsx` (new file)
- **T012 [Polish]**: Add an E2E test using Playwright to verify the visibility and content of the "Organizers and Partners" section on the landing page.
  - **File**: `tests/e2e/landing-page-stakeholders.spec.ts` (new file)

---

## Dependencies

The user stories are largely independent after the foundational tasks are complete.

- Foundational Tasks -> US1 -> US2 (verification)
- Foundational Tasks -> Polish & Cross-Cutting Concerns

## Parallel Execution Examples

**After Foundational Tasks (T001-T003) are complete:**

- **Scenario 1: Parallel development of US1 and tests**
  - Developer A: Works on T004, T005, T006, T007, T008 (US1 implementation)
  - Developer B: Works on T010, T011, T012 (Tests)

## Implementation Strategy

The implementation will follow an MVP-first approach, focusing on delivering the core functionality of displaying stakeholders (US1) as quickly as possible. Subsequent tasks will focus on ensuring data updatability (US2) and comprehensive testing.

---

## Summary

- **Total Task Count**: 12
- **Tasks per User Story**:
  - Foundational Tasks: 3
  - US1 (Display Stakeholders): 5
  - US2 (Updatable Data): 1 (verification)
  - Polish & Cross-Cutting Concerns: 3
- **Parallel Opportunities Identified**: Yes, after foundational tasks, US1 implementation and testing can be done in parallel.
- **Independent Test Criteria for each Story**: Clearly defined in each user story section.
- **Suggested MVP Scope**: User Story 1 (Display Stakeholders) - Tasks T001-T008.
