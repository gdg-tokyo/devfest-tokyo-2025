# Feature Specification: Event Overview Section

- **Feature Branch**: `010-event-overview-section`
- **Created**: 2025-10-25
- **Status**: Draft
- **Input**: User description: "event overview section The overview section comes after the welcome message section. User can see three information in a well-organized design with icon: (1) Date and time of the event [calendar icon], (2) Place [map pin icon], (3) Registration method [ticket icon]. Reference will be this site https://2025.kotlinfest.dev/."

## Clarifications

### Session 2025-10-25

- Q: How should the event data (date, location, registration URL) be managed? → A: Store data in a local JSON file (e.g., `src/data/event.json`)
- Q: What should happen if the registration URL is invalid or missing? → A: Show the registration button anyway (leads to a 404)

## User Scenarios & Testing _(mandatory)_

### User Story 1 - View Event Overview (Priority: P1)

As a potential attendee visiting the website, I want to quickly see the key event details (date, time, location, and how to register) in a clear and visually appealing way on the landing page, so that I can decide if I am interested in attending.

#### Why this priority

This is the most critical information for a potential attendee. Displaying it prominently on the landing page is essential for driving registrations and ensuring users have the basic information they need.

#### Independent Test

The landing page can be loaded, and the event overview section can be visually inspected to confirm that the date, time, location, and registration link are present and correct. This can be tested without any other features being implemented.

#### Acceptance Scenarios

1.  **Given** a user navigates to the landing page, **When** the page loads, **Then** a section with event details is visible below the main welcome message.
2.  **Given** the section with event details is visible, **When** the user inspects it, **Then** it MUST display the event date and time, the event location, and a link or button for registration.
3.  **Given** the registration link/button is visible, **When** the user clicks on it, **Then** they are redirected to the official connpass event page (https://gdg-tokyo.connpass.com/event/369416/).

### Edge Cases

- What happens if the connpass link is broken or changes? The link should be easily configurable.
- How does the layout adapt to different screen sizes (mobile, tablet, desktop)? The design should be responsive.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: The system MUST display an event overview section on the landing page, positioned after the main welcome message area.
- **FR-002**: The section MUST display the event date and time, accompanied by a calendar icon. The date MUST be in Japanese format (e.g., `2025年11月22日 (土)`) and the time MUST be `12:00 - 18:00`.
- **FR-003**: The section MUST display the event venue name and address, accompanied by a map pin icon. The venue name MUST be in a normal font, and the address in a weaker grey font, with a small space between them. Both MUST be in Japanese.
- **FR-004**: The section MUST include a registration panel with the title "参加方法" and the description "外部イベントページ (connpass.com) から参加登録をお願いします。", followed by a call-to-action button. The button MUST link to the specified connpass event page, display an external link icon, and be a global common UI component. The button MUST be displayed even if the URL is invalid.
- **FR-005**: The design of the section SHOULD be inspired by the layout and style of the reference site (https://2025.kotlinfest.dev/), ensuring a clean and well-organized presentation.
- **FR-006**: The info cards within the section MUST follow the 'Panels/Cards (General)' style guide (rounded-lg, border-2 border-gray-800). On PC and Tablet views, cards MUST have equal height. On mobile view, card heights MAY be variable and shrink to content size.
- **FR-007**: The Event Overview section MUST NOT have a heading.
- **FR-008**: The Event Overview section MUST have a background color of `bg-off-white`.
- **FR-009**: The event overview section MUST display cards in a 3-column grid layout on PC and Tablet views.
- **FR-010**: The event overview section MUST display cards in a 1-column stacked layout on mobile view.
- **FR-011**: Within each card, the content MUST be split into a 1:3 ratio, with the icon on the left (1 part) and the text content (title, description, button) on the right (3 parts).
- **FR-012**: Icons within the cards MUST be visually prominent and sized appropriately for mobile readability (e.g., `w-12 h-12`).
- **FR-013**: The "参加登録" button within the registration card MUST be a smaller size (e.g., `text-sm px-3 py-1`) for mobile view.
- **FR-014**: The cards and their internal content MUST have reduced padding and margins to maintain a compact and simple appearance, especially on mobile.

### Key Entities _(include if feature involves data)_

- **EventDetails**: Represents the core information for the event, sourced from a local JSON file (e.g., `src/data/event.json`).
  - **Attributes**:
    - `dateTime`: The date and time of the event.
    - `location`: The physical address or name of the venue, e.g., "ベルサール渋谷ファースト".
    - `address`: The full address of the venue in Japanese.
    - `registrationUrl`: The URL for the event registration page.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: 100% of first-time visitors to the landing page are presented with the event date, location, and a registration link without needing to scroll or navigate away.
- **SC-002**: A user can navigate from the landing page to the registration page in a single click.
- **SC-003**: The visual presentation of the event overview information achieves a user satisfaction score of at least 8/10 from stakeholder review, based on its clarity and alignment with the reference design.
