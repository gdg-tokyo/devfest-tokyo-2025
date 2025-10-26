# Research: Event Overview Section

**Purpose**: To document the research and decisions made for the technical implementation of the Event Overview Section.

## 1. Data Storage

- **Decision**: Event data (date, time, location, registration URL) will be stored in a local JSON file.
- **Rationale**: The data is static and does not require a complex database. A local JSON file is simple to create, manage, and can be easily imported into the Next.js application. This aligns with the project's existing data management for other static content.
- **Alternatives considered**: Hardcoding the data directly in the component. This was rejected because it makes the data harder to update and manage, especially if the same information is needed elsewhere.

## 2. Iconography

- **Decision**: Material Icons will be used for the calendar, map pin, and ticket icons.
- **Rationale**: The project already has Material Icons installed and in use. Using the existing library ensures consistency and avoids adding unnecessary dependencies.
- **Specific Icons**:
  - Calendar: `<CalendarToday />`
  - Map Pin: `<LocationOn />`
  - Ticket: `<ConfirmationNumber />`
- **Alternatives considered**: Using custom SVG icons. This was rejected as it would require extra design work and would be inconsistent with the established icon style.

## 3. Design and Layout (from Reference Site)

- **Analysis**: The reference site (`https://2025.kotlinfest.dev/`) presents the event overview information in a clean, simple, and effective manner. It uses a card-based layout with distinct sections for each piece of information.
- **Decision**: A similar card-based design will be adopted. Each of the three key pieces of information (Date/Time, Location, Registration) will be presented in its own card or visually distinct area within a larger container. The cards will follow the `Panels/Cards (General)` style guide, having `rounded-lg` and `border-2 border-gray-800`. The cards will also have equal height.
- **Rationale**: The reference design is effective and aligns with the project's aesthetic of being "stylish but pop." The new styling requirements will ensure a consistent and visually appealing design across the application.
