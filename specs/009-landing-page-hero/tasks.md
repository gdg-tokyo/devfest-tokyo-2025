# Tasks: Landing Page Hero Panel

## Feature Name: Landing Page Hero Panel

## Phase 1: Setup Tasks (Project Initialization)

- ~~**T001**~~: Install `@leenguyen/react-flip-clock-countdown` package.
  - **File**: `package.json`

## Phase 2: Foundational Tasks (Blocking Prerequisites for all User Stories)

- None directly blocking all user stories, as this is a self-contained UI component.

## Phase 3: User Story 1: Display Event Branding, Theme, and Countdown

- **Goal**: As a first-time visitor, I want to clearly see the event logo, theme, and a countdown to the event so I can quickly understand what DevFest Tokyo 2025 is about and when it will happen.
- **Independent Test Criteria**:
  - The "DevFest Tokyo" logo is visible on the landing page.
  - The event theme "Fine your new eyes ~3つの新たな視点に出会える一日~" is displayed.
  - A real-time countdown clock is visible and accurately shows the time until November 22, 2025.
- **Implementation Tasks**:
  - ~~**T002**~~: Create a new React component `HeroPanel.tsx` in `src/features/landing-page/components/`.
    - **File**: `src/features/landing-page/components/HeroPanel.tsx`\* ~~**T003**~~ [P]: Integrate the `devfest25-tokyo-logo-with-gdg-bracket.png` image using `next/image` component within `HeroPanel.tsx`.
  - **File**: `src/features/landing-page/components/HeroPanel.tsx`
- ~~**T004**~~ [P]: Add the event theme text "Fine your new eyes ~3つの新たな視点に出会える一日~" to `HeroPanel.tsx`.
  - **File**: `src/features/landing-page/components/HeroPanel.tsx`
- ~~**T005**~~ [P]: Implement the countdown timer using `react-flip-clock-countdown` within `HeroPanel.tsx`, targeting November 22, 2025.
  - **File**: `src/features/landing-page/components/HeroPanel.tsx`
  - ~~**T006**~~: Apply basic Tailwind CSS styling to `HeroPanel.tsx` for layout and typography, ensuring responsiveness.
    - **File**: `src/features/landing-page/components/HeroPanel.tsx`
  - ~~**T006.1**~~: Ensure semantic HTML and ARIA attributes are used for accessibility within `HeroPanel.tsx` and its interactive elements.
    - **File**: `src/features/landing-page/components/HeroPanel.tsx`
  - ~~**T006.2**~~: Proactively consider and implement performance best practices during the development of `HeroPanel.tsx` to meet the 2-second load time target.
    - **File**: `src/features/landing-page/components/HeroPanel.tsx`

## Phase 4: User Story 2: Registration Call-to-Action

- **Goal**: As a potential attendee, I want to easily find and click a prominent "参加登録" (Register) button to navigate to the event registration page on connpass.
- **Independent Test Criteria**:
  - A red button labeled "参加登録" is visible on the landing page.
  - Clicking the "参加登録" button navigates to `https://gdg-tokyo.connpass.com/event/369416/`.
- **Implementation Tasks**:
  - ~~**T007**~~: Add a button labeled "参加登録" to `HeroPanel.tsx`.
    - **File**: `src/features/landing-page/components/HeroPanel.tsx`
  - ~~**T008**~~: Style the "参加登録" button with a distinct red color using Tailwind CSS.
    - **File**: `src/features/landing-page/components/HeroPanel.tsx`
  - ~~**T009**~~: Link the "参加登録" button to `https://gdg-tokyo.connpass.com/event/369416/` with `target="_blank"` for external navigation.
    - **File**: `src/features/landing-page/components/HeroPanel.tsx`

## Phase 5: User Story 3: Timetable and Talk Directory Navigation

- **Goal**: As a user interested in the event content, I want to see clear call-to-action buttons for "タイムテーブル" (Timetable) and "Talk Directory" so I can explore the sessions and talks.
- **Independent Test Criteria**:
  - A button labeled "タイムテーブル" is visible on the landing page.
  - Clicking the "タイムテーブル" button navigates to `/timetable`.
  - A button labeled "Talk Directory" is visible on the landing page.
  - Clicking the "Talk Directory" button navigates to `/talks`.
- **Implementation Tasks**:
  - ~~**T010**~~: Add a button labeled "タイムテーブル" to `HeroPanel.tsx`.
    - **File**: `src/features/landing-page/components/HeroPanel.tsx`
  - ~~**T011**~~: Style the "タイムテーブル" button with a blue color using Tailwind CSS.
    - **File**: `src/features/landing-page/components/HeroPanel.tsx`
  - ~~**T012**~~: Link the "タイムテーブル" button to `/timetable` using Next.js `Link` component.
    - **File**: `src/features/landing-page/components/HeroPanel.tsx`
  - ~~**T013**~~: Add a button labeled "Talk Directory" to `HeroPanel.tsx`.
    - **File**: `src/features/landing-page/components/HeroPanel.tsx`
  - ~~**T014**~~: Style the "Talk Directory" button with a green color using Tailwind CSS.
    - **File**: `src/features/landing-page/components/HeroPanel.tsx`
  - ~~**T015**~~: Link the "Talk Directory" button to `/talks` using Next.js `Link` component.
    - **File**: `src/features/landing-page/components/HeroPanel.tsx`

## Final Phase: Polish & Cross-Cutting Concerns

- **T016**: Ensure overall responsiveness of the `HeroPanel` component across all breakpoints.
  - **File**: `src/features/landing-page/components/HeroPanel.tsx`
- **T017**: Verify accessibility (keyboard navigation, ARIA attributes) for all interactive elements within `HeroPanel.tsx`.
  - **File**: `src/features/landing-page/components/HeroPanel.tsx`
- ~~**T018**~~: Integrate `HeroPanel.tsx` into the main landing page (`src/app/page.tsx`).
  - **File**: `src/app/page.tsx`
- ~~**T019**~~: Conduct a final performance check for the landing page with the integrated hero panel.
  - **File**: `src/app/page.tsx`

## Dependency Graph (User Story Completion Order)

- User Story 1 -> User Story 2 -> User Story 3 (sequential for logical flow, but components can be developed in parallel)

## Parallel Execution Examples (within a User Story)

- Within User Story 1, T003 (logo), T004 (theme), T005 (countdown) can be developed in parallel.
- Within User Story 3, T010-T012 (Timetable button) and T013-T015 (Talk Directory button) can be developed in parallel.

## Implementation Strategy

- MVP first, delivering User Story 1, then User Story 2, and finally User Story 3. Each user story represents a testable increment.
