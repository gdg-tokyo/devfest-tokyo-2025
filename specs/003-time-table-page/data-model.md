# Data Model: Time Table Page

This document defines the data model for the Time Table Page, primarily focusing on the structure of session data that will be consumed by the application. This model is based on the existing `specs/001-landing-page/data-model.md` and extended with specific attributes relevant to the Time Table Page's filtering and display requirements.

## 1. Session Entity

Represents an individual talk or workshop at the event.

| Field Name | Data Type | Required | Description | Rationale |
| :-- | :-- | :-- | :-- | :-- |
| **`id`** | `string` | Yes | A unique identifier for the session. | Key for React list rendering and internal linking. |
| **`title`** | `string` | Yes | The title of the session/talk. | Primary display information on session cards. |
| **`description_short`** | `string` | No | A concise, one or two-sentence summary of the talk. | Used for quick display on the Session Card/Tile View. |
| **`description_long`** | `string` | Yes | The full, detailed description of the talk (derived from the Markdown body). | Used in the Session Detail Modal/Page (if implemented). |
| **`speaker_names`** | `string[]` | Yes | An array of speaker names (e.g., `["Taro Yamada", "Hanako Sato"]`). | Required for display on the Timetable and Session Card. |
| **`speaker_profiles`** | `object[]` | Yes | An array of objects containing speaker details. See Speaker Profile Schema below. | Used for the detailed speaker information in the Session Detail Modal. |
| **`track`** | `string` | Yes | The room or track name (e.g., "Web & Frontend", "Google Cloud"). | Used for the horizontal axis of the Timetable Grid and filtering. |
| **`time_start`** | `string` | Yes | The start time of the session (e.g., "10:00"). | Used for the vertical axis and display on the Timetable. |
| **`time_end`** | `string` | Yes | The end time of the session (e.g., "10:50"). | Used for calculating session duration and Timetable layout. |
| **`tech_tags`** | `string[]` | No | An array of related technologies or topics (e.g., `["Next.js", "Flutter", "AI"]`). | Core field for client-side filtering. |
| **`level`** | `string` | No | The target skill level (e.g., "Beginner", "Intermediate", "Advanced"). | Core field for client-side filtering. |
| **`perspective`** | `string` | No | The learning perspective (e.g., "Introduction", "Experience", "Challenge"). | Core field for client-side filtering. |
| **`is_keynote`** | `boolean` | No | Flag indicating if this is a keynote or special session. | Optional: Allows special styling on the timetable. |
| **`room`** | `string` | Yes | The physical room where the session takes place. | Essential information for session cards (FR3.5). |

## 2. Speaker Profile Schema

The `speaker_profiles` field within the Session entity contains an array of objects, where each object has the following structure:

| Field Name | Data Type | Required | Description |
| :-- | :-- | :-- | :-- |
| `name` | `string` | Yes | Speaker's full name. |
| `icon_url` | `string` | Yes | A URL to the speaker's icon image. |
| `title` | `string` | No | Speaker's job title or position. |
| `bio` | `string` | No | A short biography of the speaker. |
| `twitter_handle` | `string` | No | Speaker's Twitter username (without the @). |

## 3. Filtering Criteria

These are the attributes used for client-side filtering on the Time Table Page:

- **Skill Level**: `level` attribute of the Session entity (values: "Beginner", "Intermediate", "Advanced").
- **Learning Perspective**: `perspective` attribute of the Session entity (values: "Introduction", "Experience", "Challenge").
- **Technical Tags**: `tech_tags` attribute of the Session entity (array of strings).
- **Keyword Search**: Free text search across `title`, `description_short`, `description_long`, and `speaker_names` attributes.
