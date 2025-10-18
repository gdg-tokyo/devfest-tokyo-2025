# Data Model: Talk Page

This data model is based on the key entities defined in the feature specification.

## Entities

### Talk

Represents a single presentation.

**Attributes**:

- `id` (string, required): Unique identifier for the talk.
- `title` (string, required): The title of the talk.
- `abstract` (string, required): A detailed description of the talk's content.
- `time_start` (string, required): The scheduled start time in "HH:MM" format.
- `time_end` (string, required): The scheduled end time in "HH:MM" format.
- `track` (string, required): The conference track the talk belongs to.
- `speaker_ids` (array of strings, required): A list of IDs corresponding to the speakers of the talk.

### Speaker

Represents a speaker.

**Attributes**:

- `id` (string, required): Unique identifier for the speaker.
- `name` (string, required): The speaker's full name.
- `bio` (string, required): A short biography of the speaker.
- `photo_url` (string, required): A URL to the speaker's profile picture.

## Relationships

- A `Talk` can have one or more `Speakers`.
- A `Speaker` can be associated with multiple `Talks`.

This relationship is managed through the `speaker_ids` attribute in the `Talk` entity.
