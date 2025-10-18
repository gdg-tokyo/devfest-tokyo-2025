# Data Model: Talk Directory Page

- **Feature Branch**: `005-talk-directory-page`
- **Created**: October 14, 2025

## Existing Entities Consumed

The Talks Page feature will primarily consume and display data from the following existing entities, as defined in `src/types/index.ts` and sourced from `src/data/sessions.json`.

### Session

Represents a single session at the DevFest. Key attributes relevant to the Talks Page include:

- `id`: Unique identifier for the session.
- `title`: The main title of the session.
- `longDescription`: A detailed description of the session.
- `level`: The target skill level of the session (e.g., 'Beginner', 'Intermediate', 'Advanced'). Used for filtering.
- `perspective`: The learning perspective of the session (e.g., 'Introduction', 'Experience', 'Challenge'). Used for filtering.
- `talks`: An array of `Talk` entities associated with this session.
- `time_start`: The start time of the session.
- `time_end`: The end time of the session.
- `track`: The track or room where the session takes place.

### Talk

Represents an individual presentation within a session. Key attributes relevant to the Talks Page include:

- `id`: Unique identifier for the talk.
- `title`: The title of the talk.
- `abstract`: A brief summary of the talk. Used for keyword search.
- `speakers`: An array of `Speaker` entities presenting this talk.

### Speaker

Represents a speaker presenting one or more talks. Key attributes relevant to the Talks Page include:

- `id`: Unique identifier for the speaker.
- `name`: The name of the speaker. Used for keyword search.
- `bio`: A short biography of the speaker.
- `photoUrl`: URL to the speaker's photo or avatar. Handled with CSS fallback if null.
- `socialLinks`: An array of social media links for the speaker.

## Conceptual Entities (UI State)

### Filter

Represents the current state of the user's filtering and search criteria on the Talks Page. This is a client-side UI state and not a persisted data entity.

- `keyword`: Free-text search string, applied against session title, talk abstract, and speaker names.
- `levels`: Array of selected skill levels.
- `perspectives`: Array of selected learning perspectives.
- `techTags`: Array of selected technical tags.
