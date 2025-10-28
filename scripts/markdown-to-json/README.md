# Python Markdown to JSON Parser

This document outlines the specification for the Python-based Markdown to JSON parser, reimplementing the functionality originally described in `docs/scripts/parse-content.md`.

## How to use?

To use the CLI tool, navigate to the `scripts/markdown-to-json` directory and run:

```bash
# Run this command only once in the beginning.
uv pip install -e .

# Command
uv run markdown-parser [OPTIONS]

# Convert markdowns under ./docs/web/prod/
uv run markdown-parser --docs-base-path ../../docs/web --output-base-path ../../src/data/
```

Note: Running `uv run markdown-parser` directly might not work due to `uv`'s packaging behavior for local projects. Use the `python -m` approach instead.

Options:

- `--docs-base-path`: Path to the docs directory (default: `docs/web`).
- `--output-base-path`: Path to the output data directory (default: `src/data`).

---

## Development Rules

### Dependencies

- python >= 3.13
- beautifulsoup4 for manuplating HTML DOM
- markdown for converting Markdown file to HTML
- click
- attrs and cattrs for dataclass
- pytest

### Style Guide

- Follow [Google Python Style Guide](https://google.github.io/styleguide/pyguide.html)
- Use ruff as a formatter and linter.
- "Type hints" are mandatory.
- Very simple docstring is mandatory but "Arguments" and "Returns" sections are not necessary.

---

## Tools Specification

### Directory Structure

```text
- src/
  - bin/ ... CLI command
    - parse_content.py
  - data_model/
    - session.py
    - talk.py
    - speaker.py
  - parsers/
    - html_parser.py
    - content_parser.py
```

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
