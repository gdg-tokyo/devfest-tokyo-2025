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

### [X] T004: [US1] Implement UI and Data Fetching

- **Description**: Implement the UI for the Event Overview component and fetch data from the `event.json` file.
- **File**: `src/features/landing-page/components/EventOverview.tsx`
- **Depends on**: T003
- **Instructions**:
  - Import the data from `src/data/dev/event.json`.
  - Use Material Icons for the icons (`CalendarToday`, `LocationOn`, `ConfirmationNumber`).
  - Display the date, time, location, address, and a registration link.

### [X] T005: [US1] Style the Component

- **Description**: Apply styling to the Event Overview component using Tailwind CSS.
- **File**: `src/features/landing-page/components/EventOverview.tsx`
- **Depends on**: T004
- **Instructions**:
  - Use a three-column layout for the three info boxes.
  - Ensure the component is responsive and matches the design from `research.md`.

### [X] T008: [US1] Update Card Styling

- **Description**: Update the styling of the info cards to follow the `Panels/Cards (General)` style guide and have equal height.
- **File**: `src/features/landing-page/components/EventOverview.tsx`
- **Depends on**: T005
- **Instructions**:
  - Add `rounded-lg` and `border-2 border-gray-800` to the card elements.
  - Ensure the cards have equal height when placed side-by-side.

### [X] T009: [US1] Remove Heading

- **Description**: Remove the "Event Overview" heading from the component.
- **File**: `src/features/landing-page/components/EventOverview.tsx`
- **Depends on**: T008
- **Instructions**:
  - Remove the `h2` element containing the "Event Overview" text.

### T006: [US1] Integrate Component into Landing Page

- **Description**: Integrate the `EventOverview` component into the main landing page.
- **File**: `src/app/page.tsx`
- **Depends on**: T009
- **Instructions**:
  - Import and render the `EventOverview` component.
  - Place it below the existing welcome message section.

### T007: [US1] Write E2E Test for Event Overview Section

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
        T002 --> T003 --> T004 --> T005 --> T008 --> T009 --> T006 --> T007
    end
    Phase 1 --> Phase 2
```

## Parallel Execution

- **Phase 1** can be done in parallel with the setup of the component file in **Phase 2**.

- Within **Phase 2**, the tasks are sequential as they build upon each other, following a TDD approach.

## Implementation Strategy

- The MVP is the completion of all tasks for User Story 1.
- The feature will be delivered in a single increment, with tests written before implementation.
