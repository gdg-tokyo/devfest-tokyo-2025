# Tasks: Event Overview Section

**Feature**: Event Overview Section

This document outlines the tasks required to implement the Event Overview Section feature, including unit and E2E tests.

## Phase 1: Setup

### [X] T001: Create Event Data File

- **Description**: Create the `event.json` file to store the event overview data.
- **File**: `src/data/dev/event.json`
- **Instructions**: Populate the file with the data specified in `data-model.md`.

## Phase 2: User Story 1 - View Event Overview

- **Goal**: As a potential attendee, I want to quickly see the key event details (date, time, location, and how to register) on the landing page.
- **Independent Test**: The landing page can be loaded and the event overview section can be visually inspected to confirm the information is present and correct.

### [X] T002: [US1] Write Unit Test for Event Overview Component

- **Description**: Create a unit test for the `EventOverview` component.
- **File**: `tests/unit/features/landing-page/components/EventOverview.test.tsx`
- **Instructions**:
  - Mock the data from `event.json`.
  - Render the `EventOverview` component with the mock data.
  - Assert that the component renders the date, time, location, address, and registration link correctly.

### [X] T003: [US1] Create Event Overview Component

- **Description**: Create the `EventOverview.tsx` React component.
- **File**: `src/features/landing-page/components/EventOverview.tsx`
- **Depends on**: T002
- **Instructions**: This component will be responsible for rendering the event overview section.

### [X] T013: [US1] Implement Event Overview Section

- **Description**: Implement the event overview section, including date, time, location, address, and registration panel with the specified styling and content.
- **File**: `src/features/landing-page/components/EventOverview.tsx`
- **Depends on**: T003
- **Instructions**:
  - Ensure the section has a background color of `bg-off-white`.
  - Display the date in Japanese format (e.g., `2025年11月22日 (土)`) and the time as `12:00 - 18:00`.
  - Display the venue name in a normal font, and the address in a weaker grey font, with a small space between them.
  - Update the registration panel title to "参加方法" and add the description "外部イベントページ (connpass.com) から参加登録をお願いします。" below it.
  - Ensure the info cards follow the 'Panels/Cards (General)' style guide (rounded-lg, border-2 border-gray-800) and have equal height.
  - Ensure the section does not have a heading.

### T014: [US1] Create Global Common UI Component for Registration Button

- **Description**: Create a reusable `RegistrationButton` component that includes the specified styling and an external link icon.
- **File**: `src/components/common/RegistrationButton.tsx`
- **Depends on**: T013
- **Instructions**:
  - Create a new React component `RegistrationButton.tsx`.
  - Implement the button with the provided styling and an external link icon.
  - It should accept `href` and `children` as props.

### T015: [US1] Replace Existing Registration Buttons and Add Icon

- **Description**: Replace all existing registration buttons in the website with the new `RegistrationButton` component and ensure the external link icon is displayed.
- **File**: `src/features/landing-page/components/EventOverview.tsx`, `src/app/page.tsx` (and potentially others)
- **Depends on**: T014
- **Instructions**:
  - Replace the `<a>` tag in `EventOverview.tsx` with `<RegistrationButton>`. (This is the only place where the button is used in this feature)
  - Add the external link icon next to the button text.

### T016: [US1] Remove Duplicated Overview Component

- **Description**: Remove the duplicated `Overview.tsx` component from `src/features/landing-page/`.
- **File**: `src/features/landing-page/Overview.tsx`
- **Depends on**: T015
- **Instructions**:
  - Delete the file `src/features/landing-page/Overview.tsx`.

### T006: [US1] Integrate Component into Landing Page

- **Description**: Integrate the `EventOverview` component into the main landing page.
- **File**: `src/app/page.tsx`
- **Depends on**: T016
- **Instructions**:
  - Import and render the `EventOverview` component.
  - Place it below the existing welcome message section.

### [I] T007: [US1] Write E2E Test for Event Overview Section

- **Description**: Create an E2E test for the event overview section.
- **File**: `tests/e2e/event-overview.spec.ts`
- **Depends on**: T006
- **Instructions**:
  - Navigate to the landing page.
  - Verify that the event overview section is visible.
  - Check that the date, time, location, and address are displayed correctly.
  - Click the registration link and verify that it navigates to the correct connpass URL.

## Dependencies

```mermaid
graph TD
    subgraph Phase 1
        T001
    end
    subgraph Phase 2
        T002 --> T003 --> T013 --> T014 --> T015 --> T016 --> T006 --> T007
    end
    Phase 1 --> Phase 2
```

## Parallel Execution

- **Phase 1** can be done in parallel with the setup of the component file in **Phase 2**.

- Within **Phase 2**, the tasks are sequential as they build upon each other, following a TDD approach.

## Implementation Strategy

- The MVP is the completion of all tasks for User Story 1.
- The feature will be delivered in a single increment, with tests written before implementation.
