# Implementation Plan: Dynamic Page Metadata Generation

- **Branch**: `015-dynamic-page-metadata` | **Date**: 2025-11-02 | **Spec**: /specs/015-dynamic-page-metadata/spec.md
- **Input**: Feature specification from `/specs/015-dynamic-page-metadata/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

This plan outlines the implementation of dynamic page metadata generation for the DevFest Tokyo 2025 website, leveraging Next.js Metadata API for per-page title, description, and Open Graph (OGP) / Twitter Card management. It includes site-wide default fallbacks for description and OG image, and emphasizes minimal, type-safe code without external dependencies, aiming to improve SEO and social media shareability.

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
| --- | --- | --- |
| `name` | `string` | The name of the site (e.g., "DevFest Tokyo 2025"). |
| `defaultTitle` | `string` | The default title for pages. |
| `defaultDescription` | `string` | The default description for pages. |
| `url` | `string` | The base URL of the site. |
| `defaultOgImage` | `string` | Default Open Graph image path (e.g., "/images/og/default-og.png"). |
| `locale` | `string` | Default locale for Open Graph tags (e.g., "ja_JP"). |
| `twitter` | `{ site?: string; creator?: string; }` | Twitter site and creator handles. |

### PageMetaInput

Input structure for building page-specific metadata.

| Field | Type | Description |
| --- | --- | --- | --- | --- | --- |
| `path` | `string?` | The canonical path of the page (e.g., "/blog/hello"). |
| `title` | `string?` | The specific title for the page. If omitted, `layout` template is used. |
| `description` | `string?` | The specific description for the page. If omitted, `SITE.defaultDescription` is used. |
| `ogImage` | `string?` | Open Graph image path (relative or absolute). If omitted, `SITE.defaultOgImage` is used. |
| `type` | `"website" | "article" | "profile" | "book"?` | Open Graph type. Defaults to "website". |
| `noindex` | `boolean?` | Whether to prevent indexing of the page. Defaults to `false`. |
| `imageAlt` | `string?` | Alt text for the Open Graph image. |

## Relationships

- `PageMetaInput` uses `SITE Configuration` for default values.
- Individual Next.js pages will provide `PageMetaInput` to the `buildMetadata` function.

## Validation Rules

- `SITE.url` should be a valid URL.
- `PageMetaInput.path` should be a valid relative path or absolute URL.
- `ogImage` should be a valid image URL or path.
```

### contracts/

No explicit API contracts (REST/GraphQL) are generated as this feature primarily involves client-side/server-side rendering of meta tags within a Next.js application, not external API interactions. The `buildMetadata` function acts as an internal contract for metadata generation.

### quickstart.md

`````markdown
### quickstart.md

````markdown
# Quickstart: Dynamic Page Metadata Generation

This guide provides a quick overview of how to implement dynamic page metadata using the Next.js App Router and the provided utility functions.

## 1. Define Site-Wide Defaults (`lib/site.ts`)

Create `src/lib/site.ts` to define your site's name, default title, default description, base URL, default OG image, locale, and Twitter handles.

```typescript
// src/lib/site.ts
export const SITE = {
  name: "Your Site",
  defaultTitle: "Your default title",
  defaultDescription: "Your default site description.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  * OGP images should be 1200x630 / PNG or JPEG / < 5MB recommended
  locale: "ja_JP",
  twitter: {
    site: " @your_account",    // if available
    creator: " @your_account", // if available
  },
};
```

## 2. Create Metadata Utility (`lib/seo.ts`)

Create `src/lib/seo.ts` with the `buildMetadata` function. This function takes page-specific inputs and combines them with site defaults to generate a `Metadata` object compatible with Next.js, including OGP and Twitter Card data.

```typescript
// src/lib/seo.ts
import type { Metadata } from 'next'
import { SITE } from './site'
import { withRepoBasePath } from ' @/lib/url-utils'

export type PageMetaInput = {
  path?: string // e.g., "/blog/hello"
  title?: string // layout template applied
  description?: string // SITE.defaultDescription if omitted
  ogImage?: string // Relative/absolute OK. SITE.defaultOgImage if unspecified
  type?: 'website' | 'article' | 'profile' | 'book'
  noindex?: boolean
  imageAlt?: string // Alt text for OG image (optional)
}

const abs = (p?: string) => {
  if (!p) return undefined
  if (p.startsWith('http')) return p
  return new URL(p, SITE.url).toString()
}

// Image path is made absolute after considering repo prefix
const resolveOgImage = (p?: string) => {
  const raw = p ?? SITE.defaultOgImage
  const withPrefix = withRepoBasePath(raw)
  return abs(withPrefix)
}

export function buildMetadata(input: PageMetaInput = {}): Metadata {
  const {
    path = '/',
    title,
    description,
    ogImage,
    type = 'website',
    noindex = false,
    imageAlt,
  } = input

  const desc = description ?? SITE.defaultDescription
  const urlAbs = abs(path)
  const imageAbs = resolveOgImage(ogImage)
  const ogImageObj = imageAbs
    ? [
        {
          url: imageAbs,
          width: 1200,
          height: 630,
          alt: imageAlt ?? title ?? SITE.name,
        },
      ]
    : undefined

  return {
    metadataBase: new URL(SITE.url),
    title, // layout template applied
    description: desc,
    alternates: { canonical: urlAbs },
    robots: noindex
      ? { index: false, follow: false, nocache: true }
      : { index: true, follow: true },

    openGraph: {
      type,
      url: urlAbs,
      siteName: SITE.name,
      title, // Optional but explicitly stated
      description: desc,
      images: ogImageObj,
      locale: SITE.locale,
    },

    twitter: {
      card: 'summary_large_image',
      site: SITE.twitter.site,
      creator: SITE.twitter.creator,
      title,
      description: desc,
      images: imageAbs ? [imageAbs] : undefined,
    },
  }
}
```

## 3. Configure Root Layout (`app/layout.tsx`)

Update `src/app/layout.tsx` to use the site-wide defaults for the root `Metadata` object. This sets up the `title` template and default description.

```typescript
// src/app/layout.tsx is fine as is (just confirm)
// Default title.template / description / metadataBase already set
// Using withRepoBasePath() for icons.icon is also OK
// Thereafter, OGP/Twitter will be complete by simply calling buildMetadata() from generateMetadata() on each page
```

## 4. Implement Dynamic Metadata in Pages

For any page that requires dynamic metadata, import `buildMetadata` and use it within an `async function generateMetadata({ params }: Props): Promise<Metadata>`.

**Example: `src/app/blog/[slug]/page.tsx`**

```typescript
// src/app/blog/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from " @/lib/seo";

type Props = { params: { slug: string } };

async function getPost(slug: string) {
  // Replace with actual implementation
  return {
    slug,
    title: `Post: ${slug}`,
    description: "This is the post description", // Fallback to site common if not present
    ogImage: `/images/og/posts/${slug}.png`,     // Fallback to site common if not present
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return buildMetadata({ path: `/blog/${params.slug}`, noindex: true });

  return buildMetadata({
    path: `/blog/${post.slug}`,
    title: post.title,
    description: post.description, // SITE.defaultDescription if undefined
    ogImage: post.ogImage,         // SITE.defaultOgImage if undefined
    type: "article",
    imageAlt: post.title,
  });
}

export default async function Page({ params }: Props) {
  const post = await getPost(params.slug);
  if (!post) notFound();
  return <article className="prose mx-auto"><h1>{post.title}</h1></article>;
}
```
````

## Acceptance Criteria

- When a page sets `title` only: `<title>` becomes `"${pageTitle} | Your Site Name"`, and the description falls back to the site default.

- When a page sets both `title` and `description`: both override the defaults correctly.

- When a page sets neither `title` nor `description`: the layout defaults (site default title and description) apply.

- The `canonical` URL resolves to an absolute URL via `metadataBase`.

```

```
`````
