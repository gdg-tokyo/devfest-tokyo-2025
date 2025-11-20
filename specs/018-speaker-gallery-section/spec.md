# Specification: Speaker Icon Gallery Section

This specification outlines the requirements for a new "Speaker Icon Gallery" section to be displayed on the website's landing page.

## 1. Overview

The "Speaker Icon Gallery" will showcase the icons of all speakers and session chairs participating in the event. This section will provide attendees with a quick visual overview of the people involved in DevFest Tokyo 2025.

### Components Defined in this Spec

- `SpeakerGallery`

## 2. Data Model

The component will utilize the existing data entities defined in the project:

- **`Speaker`**: Sourced from `src/data/{env}/speakers.json`.
- **`Session`**: Sourced from `src/data/{env}/sessions.json`, which contains `session_chair_id`.
- **`SessionChair`**: Sourced from `src/data/{env}/session-chairs.json`.

The data loading process will be as follows:

1.  Load all speakers from `speakers.json`.
2.  Load all session chairs from `session-chairs.json`.
3.  Combine both lists.
4.  Remove any duplicate entries based on the speaker's `id`.
5.  Sort the combined list alphabetically by the speaker's `name`.

## 3. Component Design: `SpeakerGallery`

### 3.1. Layout and Responsiveness

The gallery will be a single section on the landing page with a title (e.g., "Speakers & Session Chairs"). The speaker icons will be displayed in a grid with the following responsive behavior:

- **Mobile (default)**: The grid will display **up to 4** speaker icons per row.
- **Tablet (`md:` breakpoint)**: The grid will display **up to 8** speaker icons per row.
- **Desktop (`lg:` breakpoint)**: The grid will display **up to 8** speaker icons per row.

The icons should be centered within the section.

### 3.2. Icon Styling

- Each speaker icon will be a circular image (`rounded-full`).
- The images should be of a consistent size.
- A subtle hover effect (e.g., slight zoom or a border) can be applied to enhance interactivity.

### 3.3. Behavior

- Each speaker icon will be a clickable link. If the speaker has a Twitter (X) handle, clicking their icon will open their X profile in a new tab.
- If a speaker does not have a Twitter (X) handle, the icon will not be clickable.
- Initially, the icons will be purely visual.
- In the future, clicking on a speaker's icon could navigate to their detailed profile page or open a modal with their bio. This functionality is not in the scope of the initial implementation.

## 4. Placement

The `SpeakerGallery` component will be added to the main landing page, located at `src/app/page.tsx`. It should be placed after the "Event Overview" section and before the "Stakeholders" section.
