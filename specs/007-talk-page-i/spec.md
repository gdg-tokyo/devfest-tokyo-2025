# Feature Specification: Talk Page

- **Feature Branch**: `007-talk-page-i`
- **Created**: 2025-10-18
- **Status**: Draft
- **Input**: User description: "talk page: I want to add a single page for each talk. In the session page and talk directory, there is a talk card. When they are clicked, currently the dialog appears and show the session details. But want to link this to the new talk image. In the single talk page, user can see (1) talk title, (2) talk abstract, (3) time and track, and (4) speaker information. User can understand the expected talk contents deeply. Also, when the user paste the link to the talk page in X, the link is expanded and user can see the session title and picture if it's available (this is called OGP)."

## Clarifications

### Session 2025-10-18

- Q: When a user sees a speaker's name on the talk page, should it be a simple text label, or should it be a clickable link that navigates to a dedicated page for that speaker? → A: No link, just text.
- Q: What format should be used for the time attribute of a talk? → A: Use `time_start` and `time_end` attributes as strings in "HH:MM" format, the same as `TalkCard` and `SessionCard`.

## User Scenarios & Testing _(mandatory)_

### User Story 1 - View Talk Details (Priority: P1)

As a potential attendee, I want to view a dedicated page for a specific talk so that I can get all the details about it in a clear and organized layout. The page should be divided into two main sections: one for the talk details and one for the speaker details.

#### Why this priority

This is the core functionality of the feature. It allows users to get detailed information about a talk, which is essential for them to decide if they want to attend it. A clear and organized layout improves the user experience.

#### Independent Test

This can be tested by navigating to a talk's URL and verifying that all the required information is displayed correctly in the new two-panel layout.

#### Acceptance Scenarios

1.  **Given** a user is on the session page or talk directory, **When** they click on a talk card, **Then** they are navigated to the dedicated page for that talk.
2.  **Given** a user is on a talk page, **When** the page loads, **Then** the talk details (title, abstract, time, track, level, perspective, and tech tags) and speaker information (photo, name, job, bio, and X/Twitter handle) are all visible in a two-panel layout.
3.  **Given** a speaker does not have a photo, **When** the talk page loads, **Then** a fallback icon is displayed in a square with rounded corners.

---

### User Story 2 - Share Talk on Social Media (Priority: P2)

As a user, I want to share a link to a talk page on social media and have it display a rich preview (OGP) so that the shared link is more engaging and informative.

#### Why this priority

This enhances the user experience and promotes the event by making shared links more attractive.

#### Independent Test

This can be tested by pasting a talk page URL into a social media platform's post composer and verifying that a rich preview with a title, description, and image is generated.

#### Acceptance Scenarios

1.  **Given** a user has a URL for a talk page, **When** they paste it into a social media platform that supports OGP, **Then** a preview card is displayed with the talk's title, a brief description, and an image.

---

### User Story 3 - Navigate from Talk Page (Priority: P3)

As a user, after viewing a talk page, I want to be able to easily navigate to other relevant pages, such as the event registration page, the timetable, or the talk directory.

#### Why this priority

This improves the user flow and makes it easier for users to take the next step after getting the information they need from the talk page.

#### Independent Test

This can be tested by clicking the action buttons on the talk page and verifying that they navigate to the correct pages.

#### Acceptance Scenarios

1.  **Given** a user is on a talk page, **When** they click the "今すぐ参加登録" button, **Then** they are navigated to the connpass event page in a new tab.
2.  **Given** a user is on a talk page, **When** they click the "タイムテーブルに戻る" button, **Then** they are navigated to the timetable page.
3.  **Given** a user is on a talk page, **When** they click the "トーク一覧に戻る" button, **Then** they are navigated to the talk directory page.

---

### Edge Cases

- What happens when a user tries to access a talk page with an invalid or non-existent talk ID? The system should display a standard "404 Not Found" page.
- What happens if a talk does not have a specific image for OGP? The system should use a default event-related image.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: The system MUST provide a unique URL for each talk.
- **FR-002**: The talk page MUST display the talk's title, abstract, time, track, level, perspective, tech tags, and speaker information (name as text, bio, photo, job, and X/Twitter handle).
- **FR-003**: Clicking on a talk card from the session or talk directory pages MUST navigate the user to the corresponding talk page.
- **FR-004**: The talk page MUST include OGP meta tags (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`).
- **FR-005**: The system MUST return a 404 error page if a requested talk ID does not exist.
- **FR-006**: The talk page MUST have a two-panel layout for talk and speaker details.
- **FR-007**: The talk page MUST display a fallback icon if a speaker's photo is not available.
- **FR-008**: The talk page MUST have action buttons to navigate to the connpass event page, the timetable page, and the talk directory page.

### Key Entities _(include if feature involves data)_

- **Talk**: Represents a single presentation. Attributes include:
  - `id`: Unique identifier.
  - `title`: The title of the talk.
  - `abstract`: A detailed description of the talk's content.
  - `time_start`: The scheduled start time in "HH:MM" format.
  - `time_end`: The scheduled end time in "HH:MM" format.
  - `track`: The conference track the talk belongs to.
  - `speaker_ids`: A list of IDs corresponding to the speakers of the talk.
  - `tech_tags`: A list of strings representing the tech tags of the talk.
  - `level`: An array of strings representing the level of the talk.
  - `perspective`: An array of strings representing the perspective of the talk.
- **Speaker**: Represents a speaker. Attributes include:
  - `id`: Unique identifier.
  - `name`: The speaker's full name.
  - `bio`: A short biography of the speaker.
  - `photo_url`: A URL to the speaker's profile picture.
  - `job`: The speaker's job title.
  - `twitter_handle`: The speaker's X/Twitter handle.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: 100% of talk cards in the application link to a valid talk page.
- **SC-002**: Talk pages achieve a 95% or higher score on Lighthouse performance audits.
- **SC-003**: When a talk page URL is shared, OGP previews render correctly on major social media platforms (X, Facebook, LinkedIn) in 99% of cases.
- **SC-004**: The bounce rate for talk pages is below 40%, indicating users are engaging with the content.
