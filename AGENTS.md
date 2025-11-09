# DevFest Tokyo 2025 Web Site

## Term Definition

- `DevFest`: The world's largest community-driven tech conference, bringing together passionate developers from around the globe. Hosted annually by Google Developer Groups, DevFest offers a unique opportunity to explore developer tools, learn from Google and Google Developer Experts, and connect with fellow developers. The global theme for DevFest this year is "Building Safe, Secure and Scalable Solutions with AI and Cloud" and the local theme is "Find your new eyes" (eyes ~= perspective).
- `GDG DevFest Tokyo 2025`: The official name of this event.
- `GDG Tokyo` or `Google Developer Groups Tokyo`: Google Developers Group (GDG) Tokyo is a group of people who are interested in Google technology mainly and share information. GDG stands for Google Developers Groups and is a platform offered by Google Developers to support community-run developer groups
- `talk`: A single presentation or a hands-on session.
- `session`: A set of presentations related to the same topic.
- `connpass`: A evemt management platform. This site is used for participant registration for this event.

---

## Project Overview

The core concept of this Next.js application leveraging a DevFest Brand Guide-compliant design, is to create a high-performance, single-page portal optimized for the DevFest Tokyo 2025 attendees. Its primary objective is to facilitate seamless session discovery and selection by providing a blazing-fast, client-side filtering system that allows users to categorize talks instantly by skill level, learning perspective, and technical tags. The architecture prioritizes speed via Static Site Generation (SSG) from local Markdown files, ensuring that attendees can efficiently navigate the interactive timetable, view detailed session content, and easily complete the crucial task of registering via the official connpass event page.

### Event Overview of DevFest Tokyo 2025

DevFest is a developer event held worldwide by the Google Developer Group (GDG) community. In Tokyo, it's a community event where you can learn the latest information and practical know-how on various technologies such as Android, Google Cloud, Web, Firebase, Machine Learning (ML), Flutter, and Go, all in one day. This year marks the 10th time it will be held, on Saturday, November 22nd, at Bellesalle Shibuya First.

#### Event Page (connpass)

Users must complete registration here to participate.

https://gdg-tokyo.connpass.com/event/369416/

#### Target Participatts

- People who are interested in the Google Technologies or AI
- Engineers (Junior to Senior), Stundents in Japan (especially in Tokyo)
- Japanese speakers

### Expected Users of this Web Site

##### Participants (参加者)

Attendees of this event. By viewing this website, participants can learn how to register, the event's content and timetable, and what they can learn. DevFest Tokyo 2025 features a large number of sessions running concurrently across 4 tracks, with many talks. Since the connpass event page doesn't clearly indicate what topics will be covered, this site allows attendees to find topics of interest to them. They can also view detailed information for each session and talk.

##### Organizers (Operations Team / Speakers)

DevFest Tokyo features a vast amount of content, making it challenging for individual participants to find content that matches their interests and skill levels. Additionally, finding content on connpass can be difficult. This website allows us to convey more information to participants in a user-friendly format. It also helps in guiding participants to event registration and effectively communicating other important announcements to them.

---

## Development Guideline

### General

- Main language is **English** for this repository and development, and **Japanese** for the website contents.

### Coding Style Guidelines & Development Process

This project enforces a consistent coding style and follows specific development methodologies to ensure quality and clarity.

#### Development Methodology

- **Specification-Driven Development (SDD)**: All new features and modifications must be developed following an SDD approach, utilizing the `speck-kit` toolchain. This ensures that development is aligned with pre-defined specifications.
- **Test-Driven Development (TDD)**: Core implementation should be carried out using TDD principles, as advocated by Kent Beck and Takuto Wada. This involves writing tests before writing the implementation code to satisfy them.
- **Communication**: At every stage of both SDD and TDD, it is mandatory to communicate proactively with the user to resolve any ambiguities. All questions must be clarified before concluding a stage and proceeding to the next.

#### Git

##### Branch Naming Rules

- Use **lowercase with hyphens**.
- Format:
  - Types: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `perf`, `ci`

  ```text
  <type>/<short-description>
  ```

Examples:

- `feat/add-login-page`
- `fix/update-dockerfile`
- `chore/cleanup-readme`

##### Commit Message Rules

- Use **present tense** and **imperative mood** (e.g., “Add feature” not “Added feature”).
- Format:

  ```text
  <type>: <oneline summary>
  ```

Examples:

- `feat: add user authentication`
- `fix: correct GPU memory calculation`
- `chore: update dependencies`

##### Commit Rules

- DON'T commit files in `spec/` folder except `spec.md`, `plan.md`, and `data-model.md`.

#### Static Code Style

- **Language**: TypeScript
- **Linting**: ESLint with the `eslint-config-next` configuration. This provides the recommended linting rules for Next.js projects.
- **Formatting**: While Prettier is not explicitly configured via a `.prettierrc` file, its conventions are generally followed. Adhere to the existing code's formatting.
- **Naming Conventions**:
  - **Components**: `PascalCase` (e.g., `Navbar.tsx`, `TimetableGrid`).
  - **Files/Modules (non-component)**: `kebab-case` (e.g., `data-parser.ts`).
  - **Variables/Functions**: `camelCase` (e.g., `getSessions`).
  - **Types/Interfaces**: `PascalCase` (e.g., `interface Session`).
- **Comments**: Add comments primarily to explain the _why_ behind complex or non-obvious code, not the _what_.
- **Lint/Formatter Commands**:
  - To run the linter, use `npm run lint`.

- **Pre-commit Hooks**:
  - This project uses `husky` and `lint-staged` to manage pre-commit hooks.
  - The pre-commit hook is configured to run `npx lint-staged` before each commit.
  - `lint-staged` is configured in `package.json` to run the following on staged files:
    - `prettier --write` on `*.{js,jsx,ts,tsx,json,css,md}` files to format the code.
    - `next lint --fix` on `*.{ts,tsx}` files to lint the code and fix issues.
  - This setup ensures that all committed code is formatted and linted according to the project's standards.
  - The ESLint configuration includes the `eol-last` rule, which ensures that all files end with a newline character.

#### Next.js Project

This architecture design emphasizes decoupling the core business logic from the Next.js/React framework to ensure scalability and maintainability.

##### Guiding Principle: Separation of Concerns

- **Domain Layer (Business Logic):** Pure TypeScript logic, independent of React components or hooks. Focuses on the "what" (the application's core functionality).
- **Presentation Layer (Framework Logic):** Handles UI rendering, routing, and state management using Next.js and React. Focuses on the "how" (the presentation).

##### Directory Structure (`src/`)

| Directory | Purpose |
| :-- | :-- |
| `app/` | Next.js App Router entry points (pages, layouts, middleware, route handlers). Orchestrates the top-level views. |
| `features/` | **Feature-based grouping.** Contains all related logic (components, hooks, business logic, API calls) specific to a single, major feature (e.g., `user`, `post`, `billing`). |
| `components/` | Reusable, general-purpose UI components. Should be independent of specific features and align with **Presentational** component patterns. |
| `lib/` | Utility functions, external service configurations (e.g., API clients, authentication setup, logger). |
| `hooks/` | Reusable custom hooks that are not tied to a single feature. |
| `types/` | Shared TypeScript types, interfaces, and enums used across the application. |
| `domain/` (Optional) | Directory for housing pure, framework-agnostic core business entities and logic (if separated from `features/`). |

##### Component & Feature Division

- **Feature Modules (`features/`):** Components within these modules are typically **Container** components. They handle data fetching, manage feature-specific state, and connect the UI to the Data/Domain layers.
- **UI Components (`components/`):** These are **Presentational** components. They are pure, receive all necessary data via props, and contain minimal to no business logic, focusing purely on rendering the UI (e.g., following **Atomic Design** principles).
- **Pages/Layouts (`app/`):** The highest level of the Presentation Layer. They are thin, focusing primarily on composing feature modules and UI components to form complete screens.

##### Build & Test

- **Setup**:
  1. Clone the repository.
  2. Install dependencies: `npm install`
- **Development Server**:
  - To run the development server, use: `npm run dev`
- **Build Command**:
  - To create a production-ready build, use: `npm run build`
- **Testing**:
  - The project uses Jest for unit/integration testing and Playwright for E2E testing.
  - To run all unit/integration tests, use: `npm run test`
  - To run E2E tests, use: `npx playwright test`
- **CI/CD Checks**:
  - While a CI/CD pipeline is not yet configured, any pull request or merge to the main branch should successfully pass the following checks:
    1. `npm run lint` (Linting) - Run in `static-checks.yml`
    2. `npm run test` (Unit/Integration Testing) - Run in `tests.yml`
    3. `npx playwright test` (E2E Testing) - Run in `tests.yml`
    4. `npm run build` (Build) - Run in `tests.yml`

### Security considerations

- **API Keys & Credentials**: This project currently does not use external APIs, so there are no API keys or credentials to manage. If external APIs are integrated in the future, store keys in environment variables (`.env.local`) and access them via `process.env`. Do not commit `.env.local` to the repository.
- **Dependency Vulnerability Management**: Regularly check for vulnerabilities in dependencies by running `npm audit`. Address any high or critical vulnerabilities promptly.
- **Communication**: All communication is handled by Next.js during the static site generation process and client-side navigation. Ensure the production deployment uses HTTPS.
- **Input Validation**: The site is currently static and does not accept user input. If forms or interactive elements are added, all user-supplied data must be validated and sanitized on the client-side before use to prevent XSS attacks.

### Knowledge & Library

- Before implementation, use `Context7 MCP Server` to `resolve-library-id` → `get-library-docs` to retrieve the latest information on related libraries (e.g., `/upstash/context7`).
- **[IMPORTANT]** Common business logic or style-related logic should be placed under `src/lib/` to be reused across the application. For example, the color utility functions for level, perspective, and track tags have been centralized in `src/lib/style-utils.ts`.
- Meticulousness in Cross-Platform UI Changes: An oversight in applying a styling change (button color) consistently across both desktop and mobile views emphasized the importance of thoroughness in UI development.
- Leveraging GitHub CLI for Workflow Automation: Successfully using gh pr create to automate the Pull Request creation process showcased the efficiency gains from integrating CLI tools into the development workflow.
- Wrap the URL with `withRepoBasePath()` (from `@/lib/url-utils`) to add the website base path to a given asset path.
- Deployment target is firebase hosting.

### GitHub MCP Tools

When interacting with GitHub repositories, leverage the available GitHub MCP tools for efficient and reliable operations.

- **Verify Repository Information:** Always start by confirming the correct repository owner and name. Use `git remote -v` to retrieve the remote URL and parse the owner and repository name from it. This ensures that subsequent GitHub operations target the correct repository.
- **Tool Selection:** Choose the appropriate GitHub MCP tool for your task. For example:
  - `list_pull_requests`: To list pull requests (e.g., open, closed, merged).
  - `create_pull_request`: To create a new pull request.
  - `get_file_contents`: To read the content of a file in a repository.
  - `create_or_update_file`: To create or update a file in a repository.
  - `push_files`: To push multiple files in a single commit.
- **Error Handling:** If a GitHub tool call fails, especially due to repository or permission issues, immediately re-verify the repository details using `git remote -v`.
- **Transparency:** Explicitly state the repository owner and name being used for GitHub operations to ensure clarity and allow for early correction if needed.

### Maintenance policy

- Consider incorporating feedback that has been repeatedly instructed during conversations.
- Review sections for redundancy or opportunities for conciseness.
- Aim for documents that are concise yet dense with information.

---

## UI Design Guide

Import @docs/web/style-guide.md

---

## AI Agent Memory Bank

### Active Memory Bank

- Import @specs/AGENTS.md
- Import @docs/ai-memory/learnings/AGENTS.md
- Import @docs/ai-memory/learnings/latest.md

### Agent Rules

- DON'T use `$ npm run dev` for debug. If you want to check it, ask user to launch the dev server manually.
  - If the chrome-dev-tool MCP is available, use it to investigate the error.
  - If not, ask user to copy & paste the error message and etc.
