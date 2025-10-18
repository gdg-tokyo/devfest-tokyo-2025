# Quickstart: Data Schema Refactoring

This document provides a quick overview of the new data schema and how to use it.

## Data Structure

The data is now split into three separate JSON files in the `src/data` directory:

- `speakers.json`: Contains an array of speaker objects.
- `talks.json`: Contains an array of talk objects.
- `sessions.json`: Contains an array of session objects.

Refer to the `data-model.md` file for the detailed schema of each entity.

## Data Parsing

The `src/lib/data-parser.ts` file has been updated to read from the new data files and join the data. The `getSessions` function now returns an array of fully populated session objects, with the talk and speaker data embedded.

## Usage

When you need to access the session data in your components, you should continue to use the `getSessions` function from `src/lib/data-parser.ts`. This function will provide the data in the same format as before the refactoring, so no changes should be needed in the components that consume the data.

If you need to access the raw data for speakers, talks, or sessions, you can import the JSON files directly from the `src/data` directory.
