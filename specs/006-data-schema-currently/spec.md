# Feature Specification: Data Schema Refactoring

**Feature Branch**: `006-data-schema-currently` **Created**: 2025-10-18 **Status**: Draft **Input**: User description: "data schema Currently the data is stored as a JSON and it is defined in @@specs/003-time-table-page/data-model.md I want to split this data into three entity/table: session, talk, speaker for easier management. Can you do it for me?"

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Simplified Data Management (Priority: P1)

As a data manager, I want to manage speakers, talks, and session schedules as separate entities so that I can easily add, update, and delete each type of data without affecting the others. For example, I want to be able to add a new speaker without having to edit a talk or session file.

**Why this priority**: This is the core motivation for the refactoring. It will improve the data management workflow, reduce the risk of errors, and make the system more maintainable.

**Independent Test**: A new speaker can be added to the system, and this speaker can then be associated with a new or existing talk. This should not require any changes to the session data.

**Acceptance Scenarios**:

1.  **Given** the new data structure, **When** a data manager adds a new speaker to the `speakers` data store, **Then** the new speaker is available to be linked to talks.
2.  **Given** the new data structure, **When** a data manager adds a new talk to the `talks` data store and links it to existing speakers, **Then** the new talk is created with the correct speaker associations.
3.  **Given** the new data structure, **When** a data manager creates a new session in the `sessions` data store and links it to an existing talk, **Then** the new session appears on the timetable with the correct talk information.

### User Story 2 - Improved Developer Experience (Priority: P2)

As a developer, I want to query the data for speakers, talks, and sessions separately so that I can build features more efficiently and maintain the codebase more easily. This will allow for more targeted data fetching and reduce the complexity of the data parsing logic.

**Why this priority**: This will improve the developer experience, leading to faster development cycles and a more robust application.

**Independent Test**: A developer can fetch a list of all speakers without fetching any talk or session data.

**Acceptance Scenarios**:

1.  **Given** the new data structure, **When** a developer queries the `speakers` data store, **Then** they receive a list of all speakers.
2.  **Given** the new data structure, **When** a developer queries the `talks` data store for a specific talk, **Then** they receive the talk data along with the IDs of the associated speakers.
3.  **Given** the new data structure, **When** a developer queries the `sessions` data store, **Then** they receive a list of all sessions with the ID of the associated talk.

## Clarifications

### Session 2025-10-18

- Q: When a Talk is deleted, what should happen to Sessions that reference it? → A: Cascading Delete: Delete the sessions as well.
- Q: If a `speaker_id` in a talk record does not correspond to an existing speaker, how should this be handled? → A: A but display the dummy "unknown" speaker instead of null.
- Q: To what extent should components that consume session data, like `SessionCard`, be refactored? → A: Full refactoring: Refactor the components to improve their structure and readability.

### Edge Cases

- What happens if a `talk_id` in a session record does not correspond to an existing talk? The system should handle this gracefully, for example by logging an error and not displaying the session.
- What happens if a `speaker_id` in a talk record does not correspond to an existing speaker? The system should log an error and display the talk with a dummy "unknown" speaker.
- How are speaker/talk deletions handled? If a speaker is deleted, their ID should be removed from all talks that reference them. If a talk is deleted, all sessions that reference it should also be deleted (cascading delete).

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: The system MUST provide three separate data stores for `Speaker`, `Talk`, and `Session` entities.
- **FR-002**: The `Talk` entity MUST have a many-to-many relationship with the `Speaker` entity, managed through a list of speaker IDs in the `Talk` entity.
- **FR-003**: The `Session` entity MUST have a one-to-one relationship with the `Talk` entity, managed through a talk ID in the `Session` entity.
- **FR-004**: The data access layer of the application MUST be updated to read from and combine data from the new data stores.
- **FR-005**: The existing functionality of the timetable page, including filtering and session details, MUST be maintained.
- **FR-006**: All components that consume session data (e.g., `SessionCard`) MUST be refactored to improve their structure and readability.

### Key Entities _(include if feature involves data)_

- **Speaker**: Represents a person presenting at the event.
  - `id`: `string` (Unique identifier)
  - `name`: `string`
  - `icon_url`: `string`
  - `title`: `string` (Optional)
  - `bio`: `string` (Optional)
  - `twitter_handle`: `string` (Optional)
- **Talk**: Represents a single presentation or workshop.
  - `id`: `string` (Unique identifier)
  - `title`: `string`
  - `description_short`: `string` (Optional)
  - `description_long`: `string`
  - `speaker_ids`: `string[]` (Array of Speaker IDs)
  - `tech_tags`: `string[]` (Optional)
  - `level`: `string` (Optional)
  - `perspective`: `string` (Optional)
  - `is_keynote`: `boolean` (Optional)
- **Session**: Represents the scheduling of a talk in a specific room and time.
  - `id`: `string` (Unique identifier)
  - `talk_id`: `string` (Foreign key to Talk)
  - `track`: `string`
  - `time_start`: `string`
  - `time_end`: `string`
  - `room`: `string`

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: The data for speakers, talks, and sessions can be managed in separate files or database tables.
- **SC-002**: The new data structure is documented in a `data-model.md` file within the feature directory.
- **SC-003**: The application's timetable page loads and functions correctly with the new data structure, with no regressions in functionality.
- **SC-004**: The time required for a data manager to add a new speaker and associate them with a talk is reduced by at least 50% compared to the previous single-JSON approach.
