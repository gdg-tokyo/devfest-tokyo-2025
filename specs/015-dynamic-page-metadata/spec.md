# Specification: Dynamic Page Metadata Generation

## 1. Overview

This specification outlines the requirements for implementing dynamic page metadata generation across the DevFest Tokyo 2025 website. The primary goal is to enable unique and descriptive page titles and meta descriptions for each page, improving search engine optimization (SEO). Currently, all pages share the same title and description, hindering effective analysis and discoverability.

## 2. User Personas

- **Marketing Team/SEO Specialist**: Responsible for optimizing website visibility in search engines. Requires the ability to define and verify unique metadata for each page.
- **Developer**: Responsible for implementing and maintaining the website. Requires a flexible and efficient solution for managing dynamic metadata.
- **End User**: Benefits from more informative browser tabs and accurate search engine results.

## 3. User Scenarios

- **Scenario 1: SEO Optimization for Landing Page**
  - **Given** the marketing team wants to optimize the landing page for specific keywords.
  - **When** a search engine crawls the landing page.
  - **Then** the landing page's `<title>` tag and `<meta name="description">` tag are unique and contain the specified keywords, improving its search ranking.

- **Scenario 2: Dynamic Talk Page Metadata**
  - **Given** a user navigates to a specific talk detail page.
  - **When** the page loads.
  - **Then** the browser tab displays the talk's title, and the page's meta description accurately summarizes the talk's content.

## 4. Functional Requirements

- **FR1: Default Metadata Configuration**
  - The system SHALL allow defining a default page title and meta description that applies to all pages unless explicitly overridden.
- **FR2: Page-Specific Metadata Override**
  - The system SHALL provide a mechanism to override the default page title and meta description for individual pages (e.g., landing page, timetable page, talk detail pages).
- **FR3: Dynamic Metadata Generation**
  - The system SHALL dynamically generate page titles and meta descriptions based on the content of the current page (e.g., talk title, speaker name, session abstract).
- **FR5: Server-Side Rendering (SSR) for Metadata**
  - All page metadata (title, meta description) SHALL be rendered on the server-side to ensure it is available to search engine crawlers and social media bots.
- **FR6: Data Source Integration**
  - The system SHALL integrate with existing data sources (e.g., `sessions.json`, `speakers.json`, or Markdown files) to extract relevant information for dynamic metadata generation.

- **FR7: Dynamic Page Title Formats**
  - The system SHALL generate page titles for specific routes as follows:
    - `/`: "GDG DevFest Tokyo 2025"
    - `timetable/`: "Timetable - GDG DevFest Tokyo 2025"
    - `talks/`: "Talks - GDG DevFest Tokyo 2025"
    - `talks/*/`: "{Talk Title} (by {speaker name}) - GDG DevFest Tokyo 2025"
    - `sessions/*/`: "{Session Title} - GDG DevFest Tokyo 2025"

- **FR8: Common Open Graph Metadata**
  - The system SHALL generate standard Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`, `og:site_name`) for all pages.
  - The system SHALL set the locale for OG tags to `ja_JP`.
  - The system SHALL use a default OG image (`SITE.defaultOgImage`) with dimensions 1200x630 pixels as a fallback when a page-specific image is not provided.
  - The system SHALL use `SITE.defaultDescription` as a fallback for `og:description` if a page-specific description is not provided.

- **FR9: SNS-Specific Metadata**
  - For Facebook, LinkedIn, and Slack, the system SHALL set `og:type` to "website" by default and "article" for talk/session detail pages.
  - For X (Twitter), the system SHALL generate Twitter-specific tags (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`). `twitter:card` SHALL be set to `summary_large_image`.

- **FR10: Absolute URL Generation for OGP**
  - All metadata URLs (e.g., `og:image`, `og:url`, canonical link) SHALL be generated as absolute URLs.
  - The system SHALL use a configured `metadataBase` and a `withRepoBasePath()` utility to correctly resolve paths, especially for deployments in a repository subdirectory (e.g., GitHub Pages).

- **FR11: Page-Level OGP Override**
  - The system SHALL provide a mechanism for individual pages to override default Open Graph metadata, including `title`, `description`, `ogImage`, `type` ("article", etc.), and `noindex` by passing them to a `buildMetadata()` function.
  - If page-specific values are not provided, the system SHALL fallback to:
    - `title`: The template from the layout.
    - `description`: `SITE.defaultDescription`.
    - `ogImage`: `SITE.defaultOgImage`.

## 5. Non-Functional Requirements

- **NFR1: Performance**
  - The dynamic metadata generation process SHALL not introduce noticeable latency to page load times.
- **NFR2: Maintainability**
  - The solution for managing and generating metadata SHALL be easy to understand, modify, and extend by developers.
- **NFR3: SEO Compliance**
  - The generated metadata SHALL adhere to current SEO best practices for titles and descriptions, including Open Graph and Twitter Card specifications.

## 6. Success Criteria

- **SC1: Unique Page Titles**
  - Each distinct page on the website (e.g., `/`, `/timetable`, `/talks/[slug]`, `/sessions/[slug]`) displays a unique and descriptive title in the browser tab.
- **SC2: Unique Meta Descriptions**
  - Each distinct page on the website has a unique and descriptive `<meta name="description">` tag in its HTML source.
- **SC3: Social Media Shareability**
  - When a page is shared on Facebook, LinkedIn, Slack, or X (Twitter), the correct title, description, and image are displayed.
- **SC5: SEO Score**
  - The website's Lighthouse SEO score for key pages (landing, timetable, talk detail) is 90 or higher after implementation.

## 7. Assumptions

- The necessary metadata content (e.g., talk titles, speaker names, session abstracts, default site name) will be available within the existing data models or can be easily derived.
- The project will continue to use Next.js for server-side rendering capabilities.
- `SITE.defaultDescription` and `SITE.defaultOgImage` will be defined and accessible.
- The `withRepoBasePath()` utility will be available for URL normalization.

## 8. Out of Scope

- A dedicated content management system (CMS) or user interface for non-technical users to manage metadata. Metadata will be managed programmatically or via data files.
- Internationalization (i18n) of metadata beyond setting the `og:locale` to `ja_JP`. All metadata content will initially be in Japanese.
- Dynamic generation of other meta tags (e.g., `keywords`, `author`) not explicitly covered by SEO or OGP requirements.

## 9. Key Entities

- **Page**: Any distinct URL on the website (e.g., Landing Page, Timetable Page, Talk Detail Page, Session Detail Page).
- **Metadata**: Information associated with a page, including title, meta description, Open Graph properties, and Twitter Card properties.
- **Talk/Session**: Existing data entities that will provide content for dynamic metadata generation.
- **Speaker**: Existing data entity that may provide content for dynamic metadata generation (e.g., speaker name in talk title).
