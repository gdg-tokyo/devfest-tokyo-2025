# Contributing to DevFest Tokyo 2025 Web Site

We welcome contributions to the DevFest Tokyo 2025 website! To ensure a smooth and collaborative development process, please follow these guidelines.

## Development Workflow

This project adheres to specific development methodologies and Git conventions to ensure consistency and quality.

### Git Conventions

- **Branch Naming**: Use lowercase with hyphens, following the format `<type>/<short-description>` (e.g., `feat/add-login-page`, `fix/update-dockerfile`).
- **Commit Messages**: Use present tense and imperative mood, following the format `<type>: <short summary>` (e.g., `feat: add user authentication`, `fix: correct GPU memory calculation`).

### Recommended Development Methodology

- **Specification-Driven Development (SDD)**: All new features and modifications must be developed following an SDD approach, utilizing the `speck-kit` toolchain. This ensures that development is aligned with pre-defined specifications.
- **Test-Driven Development (TDD)**: Core implementation should be carried out using TDD principles, as advocated by Kent Beck and Takuto Wada. This involves writing tests before writing the implementation code to satisfy them.

## Code Style & Quality

- **Language**: TypeScript
- **Linting**: ESLint with `eslint-config-next`. Run `npm run lint` to check for issues and `npm run lint -- --fix` to automatically fix them.
- **Formatting**: Prettier is used for code formatting. Run `npm run format` to format all files. Pre-commit hooks (`husky` and `lint-staged`) ensure that code is automatically formatted and linted before each commit.
- **Naming Conventions**:
  - **Components**: `PascalCase` (e.g., `Navbar.tsx`)
  - **Files/Modules (non-component)**: `kebab-case` (e.g., `data-parser.ts`)
  - **Variables/Functions**: `camelCase` (e.g., `getSessions`)
  - **Types/Interfaces**: `PascalCase` (e.g., `interface Session`)

## Directory Structure (`src/`)

- `app/`: Next.js App Router entry points (pages, layouts, middleware, route handlers). Orchestrates top-level views.
- `features/`: Feature-based grouping. Contains all related logic (components, hooks, business logic, API calls) specific to a single, major feature.
- `components/`: Reusable, general-purpose UI components. Independent of specific features, focusing purely on rendering.
- `lib/`: Utility functions, external service configurations (e.g., API clients, authentication setup, logger).
- `hooks/`: Reusable custom hooks not tied to a single feature.
- `types/`: Shared TypeScript types, interfaces and enums used across the application.

---

## **Specification-Driven Development (SDD)**

All new features and modifications are developed following an SDD approach, utilizing the `speck-kit` toolchain. This ensures that development is aligned with pre-defined specifications.

- **Adding New Features**:
  - `/speckit.specify`: Define the initial specification for the new feature.
  - `/speckit.clarify`: Refine and clarify any ambiguities in the specification.
  - `/speckit.plan`: Create a detailed plan for implementing the feature.
  - `/speckit.tasks`: Break down the plan into actionable tasks.
  - `/speckit.analyze`: Analyze the current state and potential impacts of the feature.
  - `/speckit.implement`: Implement the feature based on the approved plan and tasks.
- **Updating Existing Specifications**:
  - Manually update `spec.md` and `plan.md` (or use agents)
  - `/speckit.clarify`: Refine and clarify any ambiguities in the updated specification.
  - `/speckit.analyze`: Analyze the current state and potential impacts of the updated specification.
  - `/speckit.tasks`: Break down the plan into actionable tasks.
  - `/speckit.implement`: Implement changes based on the updated specification and tasks.
- **Test-Driven Development (TDD)**: Core implementations are carried out using TDD principles.
- **Communication**: Proactive communication is mandatory at every stage to resolve ambiguities.
