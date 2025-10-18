# Data Model: Data Schema Refactoring

This document defines the data model for the refactored data schema. The data is split into three entities: `Speaker`, `Talk`, and `Session`.

## 1. Speaker Entity (`speakers.json`)

Represents a person presenting at the event.

| Field Name | Data Type | Required | Description |
| :-- | :-- | :-- | :-- |
| `id` | `string` | Yes | Unique identifier for the speaker. |
| `name` | `string` | Yes | Speaker's full name. |
| `icon_url` | `string` | Yes | A URL to the speaker's icon image. |
| `job` | `string` | No | Speaker's job title or position. |
| `bio` | `string` | No | A short biography of the speaker. |
| `twitter_handle` | `string` | No | Speaker's Twitter username (without the @). |

## 2. Talk Entity (`talks.json`)

Represents a single presentation or workshop.

| Field Name | Data Type | Required | Description |
| :-- | :-- | :-- | :-- |
| `id` | `string` | Yes | Unique identifier for the talk. |
| `title` | `string` | Yes | The title of the talk. |
| `abstract` | `string` | Yes | The full, detailed description of the talk. |
| `speaker_ids` | `string[]` | Yes | An array of speaker IDs. |
| `tech_tags` | `string[]` | No | An array of related technologies or topics. |
| `level` | `string` | No | The target skill level (e.g., "Beginner", "Intermediate", "Advanced"). |
| `perspective` | `string` | No | The learning perspective (e.g., "Introduction", "Experience", "Challenge"). |
| `is_keynote` | `boolean` | No | Flag indicating if this is a keynote or special session. |

## 3. Session Entity (`sessions.json`)

Represents the scheduling of a talk in a specific room and time.

| Field Name | Data Type | Required | Description |
| :-- | :-- | :-- | :-- |
| `id` | `string` | Yes | A unique identifier for the session. |
| `talk_ids` | `string[]` | Yes | Foreign keys to the Talk entities. |
| `track` | `string` | Yes | The room or track name. |
| `time_start` | `string` | Yes | The start time of the session. |
| `time_end` | `string` | Yes | The end time of the session. |
| `room` | `string` | Yes | The physical room where the session takes place. |
| `title` | `string` | Yes | The title of the session. |
| `level` | `string[]` | No | The target skill level(s) (e.g., "Beginner", "Intermediate", "Advanced"). |
| `tech_tags` | `string[]` | No | An array of related technologies or topics. |
| `description` | `string` | No | A detailed description of the session. |
