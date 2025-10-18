# Data Model: Session Page

## 1. Entities

### Session

Represents a single session at the DevFest Tokyo 2025 event. It contains details about the session itself and embeds its associated talks.

- **Attributes:**
  - `id`: Unique identifier (string)
  - `title`: Title of the session (string)
  - `longDescription`: Detailed description of the session, potentially in Markdown format (string)
  - `level`: Skill level (e.g., 'Beginner', 'Intermediate', 'Advanced') (string)
  - `perspective`: Learning perspective (e.g., 'Introduction', 'Experience', 'Challenge') (string)
  - `talks`: Array of embedded `Talk` objects (array of objects)

### Talk

Represents a single presentation within a session. A session can have one or more talks. It embeds its associated speakers.

- **Attributes:**
  - `id`: Unique identifier (string)
  - `title`: Presentation title (string)
  - `abstract`: Short description of this presentation (string)
  - `speakers`: Array of embedded `Speaker` objects (array of objects)

### Speaker

Represents a speaker presenting at the event. Contains biographical information and links to their social media profiles.

- **Attributes:**
  - `id`: Unique identifier (string)
  - `name`: Speaker's full name (string)
  - `bio`: Speaker's biography (string)
  - `photoUrl`: URL to speaker's photo (string)
  - `socialLinks`: Array of social media links (e.g., Twitter, LinkedIn, GitHub) (array of objects, each with `platform` and `url`)

## 2. Relationships

- **Session to Talk:** A Session embeds one or more Talks.
- **Talk to Speaker:** A Talk embeds one or more Speakers.

## 3. Data Storage

- **`sessions.json`**: A single JSON file that will contain an array of Session objects. Each Session object will embed its associated Talk objects, and each Talk object will embed its associated Speaker objects.
