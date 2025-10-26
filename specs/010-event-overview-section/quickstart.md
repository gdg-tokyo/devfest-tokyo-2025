# Quickstart: Event Overview Section

**Purpose**: To provide a high-level implementation guide for developers.

## 1. Create the Data File

- Create a new JSON file at `src/data/dev/event.json`.
- Populate it with the data defined in `data-model.md`.

```json
{
  "eventOverview": {
    "date": "November 22, 2025",
    "time": "10:00 - 18:00",
    "location": "ベルサール渋谷ファースト",
    "address": "東京都渋谷区東1-2-20 住友不動産渋谷ファーストタワー2F",
    "registrationUrl": "https://gdg-tokyo.connpass.com/event/369416/"
  }
}
```

## 2. Create the Component

- Create a new React component at `src/features/landing-page/components/EventOverview.tsx`.
- This component will be responsible for fetching the data from `src/data/dev/event.json` and rendering the overview section.

## 3. Component Logic

- Import the event data from the JSON file.
- Use Material Icons for the icons (`CalendarToday`, `LocationOn`, `ConfirmationNumber`).
- Use Tailwind CSS for styling, following the design principles from `research.md` and the reference site.
- The component should be a client component (`'use client'`) if any interactivity is added, but can be a server component if it only displays data.

## 4. Integration

- Import and render the `EventOverview` component in the main landing page file (`src/app/page.tsx`).
- Place it below the existing welcome message section.

## 5. Styling

- Create a container with a card-based layout.
- Each of the three items (Date/Time, Location, Registration) should be in its own card-like element.
- The cards must follow the `Panels/Cards (General)` style guide (`rounded-lg`, `border-2 border-gray-800`).
- The cards must have equal height.
- Ensure the component is responsive and looks good on all screen sizes.
- Use the brand colors and typography defined in the project's constitution.
