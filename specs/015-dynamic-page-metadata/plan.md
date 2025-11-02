# Implementation Plan: Dynamic Page Metadata Generation

- **Branch**: `015-dynamic-page-metadata` | **Date**: 2025-11-02 | **Spec**: /specs/015-dynamic-page-metadata/spec.md
- **Input**: Feature specification from `/specs/015-dynamic-page-metadata/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

This plan outlines the implementation of dynamic page metadata generation for the DevFest Tokyo 2025 website, leveraging Next.js Metadata API for per-page title and description management. It includes a site-wide default description fallback and emphasizes minimal, type-safe code without external dependencies, aiming to improve SEO.

## Technical Context

- **Language/Version**: TypeScript 5.x

- **Primary Dependencies**: Next.js (App Router), React

- **Storage**: N/A (metadata derived from existing data or hardcoded)

- **Testing**: Jest (for unit/integration), Playwright (for E2E)

- **Target Platform**: Web (Next.js application)

- **Project Type**: Web application

- **Performance Goals**: Dynamic metadata generation should not introduce noticeable latency to page load times. Server-side rendering ensures metadata is available instantly.

- **Constraints**: Adherence to Next.js App Router conventions for metadata, minimal external dependencies.

- **Scale/Scope**: Applies to all pages within the DevFest Tokyo 2025 website.

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

- **Participant-Centric Information**: Yes, by improving SEO, participants can more easily find relevant content.

- **Brand Compliance**: Yes, the plan ensures consistent site naming and descriptions, contributing to brand consistency.

- **Responsive Design (Mobile-First)**: Yes, the metadata generation is independent of the UI rendering and will support all responsive layouts.

- **Modern Tech Stack**: Yes, the plan explicitly uses Next.js (App Router) and TypeScript, aligning with the modern tech stack principle.

- **Firebase Hosting Deployment**: Yes, Next.js static export capabilities (which are compatible with App Router metadata) are suitable for Firebase Hosting deployment.

## Project Structure

### Documentation (this feature)

```

specs/015-dynamic-page-metadata/

├── plan.md              # This file (/speckit.plan command output)

├── research.md          # Phase 0 output (/speckit.plan command)

├── data-model.md        # Phase 1 output (/speckit.plan command)

├── quickstart.md        # Phase 1 output (/speckit.plan command)

├── contracts/           # Phase 1 output (/speckit.plan command)

└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)

```

### Source Code (repository root)

```

src/

├── app/

│   ├── layout.tsx

│   └── blog/[slug]/page.tsx (example)

├── lib/

│   ├── site.ts

│   └── seo.ts

└── ... (existing structure)

```

**Structure Decision**: The feature will integrate into the existing Next.js App Router structure, adding new utility files in `src/lib/` and modifying `app/layout.tsx` as well as individual page files.

## Complexity Tracking

_No violations detected._

## Phase 0: Outline & Research

No specific research tasks are identified as the user has provided a detailed implementation plan.

## Phase 1: Design & Contracts

### data-model.md

```markdown
# Data Model: Dynamic Page Metadata Generation

## Entities

### SITE Configuration

Represents site-wide metadata defaults.

| Field | Type | Description |

|-------------------|----------|-------------------------------------------|

| `name` | `string` | The name of the site (e.g., "DevFest Tokyo 2025"). |

| `defaultTitle` | `string` | The default title for pages. |

| `defaultDescription` | `string` | The default description for pages. |

| `url` | `string` | The base URL of the site. |

### PageMetaInput

Input structure for building page-specific metadata.

| Field | Type | Description |

|-------------------|----------|-------------------------------------------|

| `path` | `string?`| The canonical path of the page (e.g., "/blog/hello"). |

| `title` | `string?`| The specific title for the page. If omitted, `SITE.defaultTitle` is used. |

| `description` | `string?`| The specific description for the page. If omitted, `SITE.defaultDescription` is used. |

## Relationships

- `PageMetaInput` uses `SITE Configuration` for default values.

- Individual Next.js pages will provide `PageMetaInput` to the `buildMetadata` function.

## Validation Rules

- `SITE.url` should be a valid URL.

- `PageMetaInput.path` should be a valid relative path or absolute URL.
```

### contracts/

No explicit API contracts (REST/GraphQL) are generated as this feature primarily involves client-side/server-side rendering of meta tags within a Next.js application, not external API interactions. The `buildMetadata` function acts as an internal contract for metadata generation.

### quickstart.md

````markdown
### quickstart.md

````markdown
# Quickstart: Dynamic Page Metadata Generation

This guide provides a quick overview of how to implement dynamic page metadata using the Next.js App Router and the provided utility functions.

## 1. Define Site-Wide Defaults (`lib/site.ts`)

Create `src/lib/site.ts` to define your site's name, default title, default description, and base URL.

```typescript
export const SITE = {
  name: 'GDG DevFest Tokyo 2025',

  defaultTitle: 'GDG DevFest Tokyo 2025 - Find your new eyes',

  defaultDescription:
    'The official website for DevFest Tokyo 2025. Building Safe, Secure and Scalable Solutions with AI and Cloud.',

  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
}
```
````
````

## 2. Create Metadata Utility (`lib/seo.ts`)

Create `src/lib/seo.ts` with the `buildMetadata` function. This function takes page-specific inputs and combines them with site defaults to generate a `Metadata` object compatible with Next.js.

```typescript
import type { Metadata } from 'next'

import { SITE } from './site'

export type PageMetaInput = {
  path?: string // e.g., "/blog/hello"

  title?: string // if omitted, layout defaultTitle is used

  description?: string // if omitted, falls back to SITE.defaultDescription
}

const abs = (p?: string) =>
  !p ? undefined : p.startsWith('http') ? p : new URL(p, SITE.url).toString()

export function buildMetadata(input: PageMetaInput = {}): Metadata {
  const path = input.path ?? '/'

  const title = input.title // layout template applies if string

  const description = input.description ?? SITE.defaultDescription

  return {
    metadataBase: new URL(SITE.url),

    title: title, // uses layout's template when provided

    description,

    alternates: { canonical: abs(path) },
  }
}
```

## 3. Configure Root Layout (`app/layout.tsx`)

Update `src/app/layout.tsx` to use the site-wide defaults for the root `Metadata` object. This sets up the `title` template and default description.

```typescript

import type { Metadata } from "next";

import { SITE } from "@/lib/site";



export const metadata: Metadata = {

  title: {

    default: SITE.defaultTitle,

    template: `%s | ${SITE.name}`,

  },

  description: SITE.defaultDescription,

  metadataBase: new URL(SITE.url),

};



export default function RootLayout({ children }: { children: React.ReactNode }) {

  return <html lang="ja"><body>{children}</body></html>;

}

```

## 4. Implement Dynamic Metadata in Pages

For any page that requires dynamic metadata, import `buildMetadata` and use it within an `async function generateMetadata({ params }: Props): Promise<Metadata>`.

**Example: `app/timetable/page.tsx`**

```typescript

import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";



export async function generateMetadata(): Promise<Metadata> {

  return buildMetadata({

    path: `/timetable`,

    title: `Timetable - ${SITE.name}`,

  });

}



export default function TimetablePage() {

  return <h1>Timetable</h1>;

}

```

**Example: `app/talks/page.tsx`**

```typescript

import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";



export async function generateMetadata(): Promise<Metadata> {

  return buildMetadata({

    path: `/talks`,

    title: `Talks - ${SITE.name}`,

  });

}



export default function TalksPage() {

  return <h1>Talks</h1>;

}

```

**Example: `app/talks/[slug]/page.tsx`**

```typescript

import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { buildMetadata } from "@/lib/seo";

import { SITE } from "@/lib/site";



type Props = { params: { slug: string } };



async function getTalk(slug: string) {

  // Replace with real fetch logic to get talk data

  // Example: fetch from a JSON file or API

  const talks = [

    { slug: "talk-1", title: "Introduction to Next.js", speaker: "John Doe" },

    { slug: "talk-2", title: "Advanced React Patterns", speaker: "Jane Smith" },

  ];

  return talks.find(talk => talk.slug === slug);

}



export async function generateMetadata({ params }: Props): Promise<Metadata> {

  const talk = await getTalk(params.slug);

  if (!talk) return buildMetadata({ path: `/talks/${params.slug}` });

  return buildMetadata({

    path: `/talks/${talk.slug}`,

    title: `${talk.title} (by ${talk.speaker}) - ${SITE.name}`,

  });

}



export default async function TalkDetailPage({ params }: Props) {

  const talk = await getTalk(params.slug);

  if (!talk) notFound();

  return <article className="prose mx-auto"><h1>{talk.title}</h1><p>Speaker: {talk.speaker}</p></article>;

}

```

**Example: `app/sessions/[slug]/page.tsx`**

```typescript

import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { buildMetadata } from "@/lib/seo";

import { SITE } from "@/lib/site";



type Props = { params: { slug: string } };



async function getSession(slug: string) {

  // Replace with real fetch logic to get session data

  // Example: fetch from a JSON file or API

  const sessions = [

    { slug: "session-1", title: "Web Development Track" },

    { slug: "session-2", title: "Machine Learning Track" },

  ];

  return sessions.find(session => session.slug === slug);

}



export async function generateMetadata({ params }: Props): Promise<Metadata> {

  const session = await getSession(params.slug);

  if (!session) return buildMetadata({ path: `/sessions/${params.slug}` });

  return buildMetadata({

    path: `/sessions/${session.slug}`,

    title: `${session.title} - ${SITE.name}`,

  });

}



export default async function SessionDetailPage({ params }: Props) {

  const session = await getSession(params.slug);

  if (!session) notFound();

  return <article className="prose mx-auto"><h1>{session.title}</h1></article>;

}

```

## Acceptance Criteria

- When a page sets `title` only: `<title>` becomes `"${pageTitle} | Your Site Name"`, and the description falls back to the site default.

- When a page sets both `title` and `description`: both override the defaults correctly.

- When a page sets neither `title` nor `description`: the layout defaults (site default title and description) apply.

- The `canonical` URL resolves to an absolute URL via `metadataBase`.
