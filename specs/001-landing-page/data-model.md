# Data Model: Landing Page

This page will display a timetable of sessions. The data for these sessions will be stored in a JSON file with the following schema.

## Session Schema

| Field Name              | Data Type  | Required | Description                                                                        | Rationale                                                              |
| :---------------------- | :--------- | :------- | :--------------------------------------------------------------------------------- | :--------------------------------------------------------------------- |
| **`id`**                | `string`   | Yes      | A unique identifier for the session.                                               | Key for React list rendering and internal linking.                     |
| **`title`**             | `string`   | Yes      | The title of the session/talk.                                                     | Primary display information.                                           |
| **`description_short`** | `string`   | No       | A concise, one or two-sentence summary of the talk.                                | Used for quick display on the Session Card/Tile View.                  |
| **`description_long`**  | `string`   | Yes      | The full, detailed description of the talk (derived from the Markdown body).       | Used in the Session Detail Modal/Page.                                 |
| **`speaker_names`**     | `string[]` | Yes      | An array of speaker names (e.g., `["Taro Yamada", "Hanako Sato"]`).                | Required for display on the Timetable and Session Card.                |
| **`speaker_profiles`**  | `object[]` | Yes      | An array of objects containing speaker details. See Speaker Profile Schema below.  | Used for the detailed speaker information in the Session Detail Modal. |
| **`track`**             | `string`   | Yes      | The room or track name (e.g., "Web & Frontend", "Google Cloud").                   | Used for the horizontal axis of the Timetable Grid.                    |
| **`time_start`**        | `string`   | Yes      | The start time of the session (e.g., "10:00").                                     | Used for the vertical axis and display on the Timetable.               |
| **`time_end`**          | `string`   | Yes      | The end time of the session (e.g., "10:50").                                       | Used for calculating session duration and Timetable layout.            |
| **`tech_tags`**         | `string[]` | No       | An array of related technologies or topics (e.g., `["Next.js", "Flutter", "AI"]`). | **Core field for Search/Filtering (FR-003).**                          |
| **`level`**             | `string`   | No       | The target skill level (e.g., "Beginner", "Intermediate", "Advanced").             | **Core field for Search/Filtering (FR-003).**                          |
| **`perspective`**       | `string`   | No       | The learning perspective (e.g., "Introduction", "Experience", "Challenge").        | **Core field for Search/Filtering (FR-003).**                          |
| **`is_keynote`**        | `boolean`  | No       | Flag indicating if this is a keynote or special session.                           | Optional: Allows special styling on the timetable.                     |

## Speaker Profile Schema

The `speaker_profiles` field contains an array of objects, where each object has the following structure:

| Field Name       | Data Type | Required | Description                                 |
| :--------------- | :-------- | :------- | :------------------------------------------ |
| `name`           | `string`  | Yes      | Speaker's full name.                        |
| `icon_url`       | `string`  | Yes      | A URL to the speaker's icon image.          |
| `title`          | `string`  | No       | Speaker's job title or position.            |
| `bio`            | `string`  | No       | A short biography of the speaker.           |
| `twitter_handle` | `string`  | No       | Speaker's Twitter username (without the @). |
