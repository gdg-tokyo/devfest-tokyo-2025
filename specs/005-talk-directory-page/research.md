# Research Findings: Talk Directory Page

**Feature Branch**: `005-talk-directory-page`
**Created**: October 14, 2025

## R-001: Client-side Filtering Techniques in React/Next.js

**Decision**: Implement client-side filtering using `Array.prototype.filter()` and `String.prototype.includes()` for keyword search, combined with direct comparison for Level, Perspective, and Tech Tags.

**Rationale**: For up to 50 sessions and 100 talks, this approach offers sufficient performance and simplicity. It avoids the overhead of more complex solutions like dedicated search libraries or server-side filtering for this scale. Performance can be further optimized using `useMemo` for filtered results to prevent unnecessary re-renders.

**Alternatives Considered**:
-   **Dedicated search libraries (e.g., Fuse.js, Lunr.js)**: Overkill for the specified data volume, adds unnecessary bundle size and complexity.
-   **Server-side filtering**: Not applicable as the requirement is for client-side filtering and data is loaded upfront.

## R-002: Next.js Modal Patterns for State Preservation

**Decision**: Implement the Session Page modal using a combination of a client-side modal component (e.g., a custom React component or a headless UI library like Headless UI) and Next.js dynamic routes with shallow routing for URL state preservation.

**Rationale**: A client-side modal provides a smooth user experience. Shallow routing allows updating the URL without re-running data fetching methods, preserving the Talks Page's state (filters, scroll position). The modal can be triggered by a `Link` component to the session page route, with the session ID as a parameter, and then rendered conditionally based on the URL parameter.

**Alternatives Considered**:
-   **Full page navigation**: Does not preserve the Talks Page's state, leading to a disjointed user experience.
-   **Context API or Redux for modal state**: While viable, shallow routing offers a more direct and URL-driven approach for this specific use case.

## R-003: WAI-ARIA Guidelines for Accessible Components

**Decision**: Adhere to WAI-ARIA guidelines for interactive elements (search input, filter controls, session cards) and modal dialogs. This includes using appropriate ARIA roles, states, and properties, and ensuring keyboard navigability.

**Rationale**: Basic accessibility is a requirement. WAI-ARIA provides the necessary guidance to make interactive components usable for individuals with disabilities, particularly those using assistive technologies. Semantic HTML will be prioritized, with ARIA used to enhance where native semantics are insufficient.

**Alternatives Considered**:
-   **No specific accessibility guidelines**: Would fail to meet the basic accessibility requirement.
-   **Full WCAG 2.1 AA compliance**: While ideal, the current requirement is for basic accessibility, and full compliance can be a significant effort. Focusing on WAI-ARIA for interactive elements covers the most critical aspects for basic accessibility.
