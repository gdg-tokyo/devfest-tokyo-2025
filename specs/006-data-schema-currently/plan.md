# Implementation Plan: Data Schema Refactoring

- **Branch**: `006-data-schema-currently` | **Date**: 2025-10-18 | **Spec**: [./spec.md](./spec.md)
- **Input**: Feature specification from `/specs/006-data-schema-currently/spec.md`

## Summary

The primary goal of this feature is to refactor the existing data structure. Currently, all data is stored in a single `sessions.json` file. This will be split into three separate files: `sessions.json`, `talks.json`, and `speakers.json`. This will simplify data management and improve the developer experience. Additionally, this feature will introduce environment-specific data sets for development (`dev`) and production (`prod`), controlled by the `DEVFEST_TOKYO_2025_TARGET_ENV` environment variable. The existing data parsing logic in `src/lib/data-parser.ts` will be updated to read from these new files and join the data.

## Technical Context

- **Language/Version**: TypeScript
- **Primary Dependencies**: Next.js, React
- **Storage**: JSON files
- **Testing**: Jest
- **Target Platform**: Web (GitHub Pages)
- **Project Type**: Web application
- **Performance Goals**: N/A
- **Constraints**: The existing functionality of the timetable page must be maintained.
- **Scale/Scope**: The refactoring will affect the data layer and the components that consume the data.

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

- **Participant-Centric Information**: Yes, this refactoring will make it easier to manage the data, which will indirectly improve the quality of the information provided to participants.
- **Brand Compliance**: Yes, this is a technical refactoring and does not affect the UI.
- **Responsive Design (Mobile-First)**: Yes, this is a technical refactoring and does not affect the UI.
- **Modern Tech Stack**: Yes, the project uses Next.js and TypeScript.
- **GitHub Pages Deployment**: Yes, this refactoring will not affect the deployment process.

## Project Structure

### Documentation (this feature)

```
specs/006-data-schema-currently/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```
# Single project
src/
├── data/
│   ├── dev/
│   │   ├── sessions.json
│   │   ├── talks.json
│   │   └── speakers.json
│   └── prod/
│       ├── sessions.json
│       ├── talks.json
│       └── speakers.json
├── lib/
│   └── data-parser.ts
└── types/
    └── index.ts
```

**Structure Decision**: The project is a single web application. The main changes will be in the `src/data` directory, which will now be split into `dev` and `prod` subdirectories. The `src/lib/data-parser.ts` will be updated to handle the new data structure and environment-specific loading.

## Implementation Phases

The implementation will be divided into the following phases:

1.  **Phase 1: Foundational Tasks**: Set up the new data files and migrate the existing data.
2.  **Phase 2: User Story 1 - Simplified Data Management**: Verify that the new data structure works as expected.
3.  **Phase 3: User Story 2 - Improved Developer Experience**: Add tests for the new data structure.
4.  **Phase 4: Polish & Integration**: Refactor components and clean up the project.
5.  **Phase 5: User Story 3 - Environment-specific Data**: Implement the logic for loading data based on the environment variable.

## Complexity Tracking

N/A
