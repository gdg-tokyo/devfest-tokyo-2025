# Feature Specification: Time Table Page

## 1. Overview

This document outlines the specification for the "Time Table Page," a central, high-fidelity component of the DevFest Tokyo 2025 website. Its primary purpose is to provide attendees with a rapid and efficient way to discover and select sessions, enabling them to plan their conference day effectively. The page will feature an interactive timetable with client-side filtering capabilities and visually distinct session cards, adhering to the DevFest brand guide.

## 2. User Stories

- **As an attendee, I want to view the event timetable at a glance** so that I can quickly understand the schedule and available sessions.
- **As an attendee, I want to filter sessions by skill level (Beginner/Intermediate/Advanced)** so that I can find talks relevant to my expertise.
- **As an attendee, I want to filter sessions by learning perspective (Introduction/Experience/Challenge)** so that I can focus on the type of content I'm interested in.
- **As an attendee, I want to filter sessions by technical tags** so that I can easily locate sessions on specific topics.
- **As an attendee, I want to see session details clearly on each card** so that I can make informed decisions about which sessions to attend.
- **As an attendee, I want the timetable to be easy to navigate on both desktop and mobile devices** so that I can plan my schedule regardless of the device I'm using.
- **As an attendee, I want the session cards to be visually appealing and consistent with the event branding** so that the overall experience is cohesive and professional.

## 3. Functional Requirements

### 3.1. Timetable Display

- **FR1.1**: The system SHALL display a timetable of all event sessions.
- **FR1.2**: On desktop, the timetable SHALL utilize a grid layout with time slots arranged vertically and tracks arranged horizontally.
- **FR1.4**: Each session entry in the timetable SHALL be represented by a session card.
- **FR1.5**: If session data is not available, the system SHALL display an overlay message card indicating data unavailability.
- **FR1.6**: The visual design of the timetable page SHALL align with the provided screenshot (`@.reference/screenshot/time_table_1.png`) for overall layout and aesthetic.
- **FR1.7**: The time slot indicators (e.g., "11:30") in the vertical axis of the timetable SHALL be displayed as plain text without a background color.
- **FR1.8**: Each track column in the timetable grid SHALL have a header.
  - **FR1.8.1**: The track header SHALL be a card with rounded corners and a black border.
  - **FR1.8.2**: The background color of the track header card SHALL be a half-tone shade of Google's brand colors (e.g., red for Track A, blue for Track B, green for Track C, yellow for Track D).

### 3.2. Client-Side Filtering

- **FR2.1**: The system SHALL provide a mandatory client-side filtering system at the top of the timetable page, as depicted in the reference screenshot (`@.reference/screenshot/time_table_1.png`).
- **FR2.2**: The filtering system SHALL allow users to filter sessions by skill level ("Beginner," "Intermediate," "Advanced") using selectable chips.
- **FR2.3**: The filtering system SHALL allow users to filter sessions by learning perspective ("Introduction," "Experience," "Challenge") using selectable chips.
- **FR2.4**: The filtering system SHALL allow users to filter sessions by technical tags using selectable chips.
- **FR2.5**: Filtering actions SHALL instantly update the displayed sessions without a page reload.
- **FR2.6**: When filters are applied, sessions that do not match the criteria SHALL be visually de-emphasized (e.g., grayed out) and made non-interactive (i.e., click actions disabled). Matched sessions SHALL remain fully visible and interactive.
- **FR2.7**: The filtering system SHALL include a free keyword search bar.
  - **FR2.7.1**: The keyword search SHALL filter sessions by matching text in the session's `title`, `description_short`, `description_long`, and `speaker_names`.

### 3.3. Session Card Presentation

- **FR3.1**: Each session card SHALL adhere strictly to the DevFest brand guide's typography.
- **FR3.2**: Each session card SHALL adhere strictly to the DevFest brand guide's color scheme, extending to tags/labels and track headers.
- **FR3.3**: Session cards SHALL utilize distinct colors to visually emphasize the skill level label.
- **FR3.4**: Session cards SHALL utilize distinct colors to visually emphasize the learning perspective label.
  - **FR3.5**: Session cards SHALL display essential session information (e.g., title, speaker, time, track, room number).

## 4. Non-Functional Requirements

- **NFR4.1 - Performance**: The timetable page, including filtering, SHALL load and respond to user interactions rapidly, aiming for a smooth user experience.
- **NFR4.2 - Usability**: The filtering system and timetable navigation SHALL be intuitive and easy to use for all attendees.
  - **NFR4.3 - Accessibility**: The page SHALL be accessible to users with disabilities, adhering to WCAG 2.1 AA standards (specifically color contrast for text and interactive elements, and keyboard navigation for all controls).\* **NFR4.4 - Responsiveness**: The grid layout SHALL be responsive and adapt to smaller screen sizes, ensuring readability and usability on mobile devices without switching to a list view.
- **NFR4.5 - Security**: The page SHALL not require any access control as all information displayed is public. Data integrity SHALL be maintained for the JSON data source.

## 5. Success Criteria

- **SC5.1**: 90% of attendees can successfully locate a session using the filtering system within 15 seconds.
- **SC5.2**: The page load time for the timetable, including all session data, is under 2 seconds on a typical broadband connection.
- **SC5.3**: User feedback surveys indicate an 85% satisfaction rate with the ease of use and visual clarity of the timetable page.
- **SC5.4**: The filtering system accurately displays relevant sessions for 100% of valid filter combinations.

## 6. Assumptions

- The event is expected to have up to 50 sessions, 5 tracks, and 10 time slots.
- Session data will be available as a JSON asset within this repository, following the schema defined in `specs/001-landing-page/data-model.md`.
- The DevFest brand guide, including typography and color scheme details, is readily available and clearly defined.
- The website's overall navigation will provide a clear path to the Time Table Page, accessible from the landing page and the main header navigation.

## 7. Clarifications

### Session 2025-10-14

- Q: What specific essential session information should be displayed on the session card? → A: The session card will display the `title`, `speaker_names`, `time_start`, `time_end`, `track`, and `room`.
- Q: What specific WCAG 2.1 AA guidelines are most critical for this page? → A: The most critical guidelines are: ensuring text has a contrast ratio of at least 4.5:1, all interactive elements are keyboard accessible with visible focus indicators, and appropriate ARIA attributes are used for custom components.

### Session 2025-10-13

- Q: Are there any specific features or functionalities that are explicitly out of scope for the initial release of the Time Table Page? → A: No explicit out-of-scope features are needed at this time; focus on core functionality.
- Q: What is the expected maximum number of sessions, tracks, and time slots for the event? → A: Up to 50 sessions, 5 tracks, and 10 time slots.
- Q: How should the page behave if no sessions are available or if no sessions match the applied filters? → A: No specific handling required at this stage of specification.
- Q: Are there any specific security or privacy considerations for the Time Table Page, such as data protection or access control? → A: No need for access control. The info on this pages is open to public. The data will be stored as a JSON file.
- Q: How should the page handle potential failures or unavailability of the session data source (e.g., local Markdown files)? → A: Include the data JSON in this repo as an asset. If data is not available, show an overlay message card saying the data is not available.
- Q: Will the time table page look similar to the one in this image `@.reference/screenshot/time_table_1.png`? → A: Yes, the visual design of the time table page will be similar to the provided image, serving as a primary visual reference.
- Q: Will the time table page be added and there is a link from the landing page and header? → A: Yes, the Time Table Page will be accessible via a link from the landing page and the main header navigation.
- Q: What is the color for each tags/labels or the track header? → A: The colors for tags/labels and track headers will adhere to the DevFest brand guide's color palette, utilizing distinct colors to visually emphasize their categories as per the brand guide.

## 9. Key Entities

- **Session**: Represents an individual talk or workshop at the event.
  - Attributes: Title, Speaker(s), Time Slot, Track, Skill Level, Learning Perspective, Technical Tags, Description, Room.
- **Skill Level**: Categorization of session difficulty (Beginner, Intermediate, Advanced).
- **Learning Perspective**: Categorization of session focus (Introduction, Experience, Challenge).
- **Technical Tag**: Keywords describing the technical content of a session.

## 9. User Scenarios & Testing

### 9.1. Scenario: Filtering Sessions by Skill Level

- **Given**: An attendee is on the Time Table Page.
- **When**: The attendee clicks on the "Intermediate" skill level chip.
- **Then**: Sessions not marked as "Intermediate" are grayed out and non-interactive, while "Intermediate" sessions remain fully visible.

### 9.2. Scenario: Viewing Timetable on Mobile

- **Given**: An attendee accesses the Time Table Page on a mobile device.
- **When**: The page loads.
- **Then**: The timetable is displayed in a responsive grid layout, and all filtering options are accessible.

### 9.3. Scenario: Session Card Visuals

- **Given**: An attendee views a session card.
- **When**: The session card is displayed.
- **Then**: The card's typography and colors adhere to the DevFest brand guide, and the skill level and learning perspective labels are highlighted with distinct colors.

### 9.4. Scenario: Rapid Session Selection

- **Given**: An attendee is on the Time Table Page and applies multiple filters (e.g., "Advanced" skill, "Experience" perspective, "Machine Learning" tag).
- **When**: The filters are applied.
- **Then**: The timetable instantly updates to show only sessions matching all criteria, allowing the attendee to quickly identify relevant talks.

### 9.5. Scenario: Filtering by Keyword Search

- **Given**: An attendee is on the Time Table Page.
- **When**: The attendee types "Next.js" into the keyword search bar.
- **Then**: Sessions that do not contain "Next.js" in their title, description, or speaker names are grayed out and non-interactive, while matching sessions remain fully visible.
