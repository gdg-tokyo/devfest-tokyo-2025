# [scripts/parse-content.ts](../scripts/parse-content.md)

## Purpose

The primary goal of this script is to read Markdown files containing information about sessions, talks, and speakers, parse them, and generate structured JSON files. These JSON files are then used by the Next.js application to dynamically render content, ensuring that the website's data is easily maintainable and scalable.

## Input

The script reads from the `docs/web/prod/sessions/` directory. The expected structure is as follows:

- Each session is represented by a directory (e.g., `session-1-keynote/`).
- Inside each session directory, there should be:
  - A `README.md` file describing the session.
  - One or more `talk-*.md` files, each representing a talk within that session.

## Output

The script generates the following JSON files in the `src/data/prod/` directory:

- `sessions.json`: An array of session objects.
- `talks.json`: An array of talk objects.
- `speakers.json`: An array of speaker objects.

## Data Models

The script uses Zod schemas to define and validate the structure of the data.

- **Session**: Contains information about a session, including its ID, track, time, title, description, and associated talk IDs.
- **Talk**: Contains details about a talk, such as its ID, title, abstract, time, track, speaker IDs, and technical tags.
- **Speaker**: Holds information about a speaker, including their ID, name, bio, photo URL, job title, and Twitter handle.

## Parsing Logic

1.  **Session Parsing**:
    - For each directory in `docs/web/prod/sessions/`, the script reads the `README.md` file.
    - It extracts the session's metadata (track, time, etc.) from the frontmatter.
    - The H1 heading is used as the session title, and the first paragraph as the description.

2.  **Talk Parsing**:
    - The script reads all `talk-*.md` files within each session directory.
    - It extracts the talk's metadata from the frontmatter.
    - The H1 heading is treated as the talk title, and the first paragraph as the abstract.

3.  **Speaker Parsing**:
    - Within each talk's Markdown, the script looks for a `## Speaker` section.
    - It parses the speaker's name, Twitter handle, and job from the `###` heading.
    - The speaker's bio is extracted from the content following the heading.
    - A `#### metadata` section can be used to provide more structured information (job, twitter_handle).
    - The speaker's photo is extracted from an image tag `![]()`.

## ID Generation

- **Session ID**: Generated from the session's folder name (e.g., `session-1-keynote` becomes `s1`).
- **Talk ID**: A combination of the session ID and the talk file name (e.g., `s1-t1`).
- **Speaker ID**: The speaker's Twitter handle is used as the ID. If a Twitter handle is not available, a slugified version of the speaker's name is used as a fallback.
