# Quickstart: Dynamic Page Metadata Generation

This guide provides a quick overview of how to implement dynamic page metadata using the Next.js App Router and the provided utility functions.

## 1. Define Site-Wide Defaults (`lib/site.ts`)

Create `src/lib/site.ts` to define your site's name, default title, default description, and base URL.

```typescript
export const SITE = {
  name: 'DevFest Tokyo 2025',
  defaultTitle: 'DevFest Tokyo 2025 - Find your new eyes',
  defaultDescription:
    'The official website for DevFest Tokyo 2025. Building Safe, Secure and Scalable Solutions with AI and Cloud.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
}
```

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

**Example (`app/blog/[slug]/page.tsx`):**

```typescript
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";

type Props = { params: { slug: string } };

async function getPost(slug: string) {
  // Replace with real fetch logic to get post data
  return {
    slug,
    title: `Post: ${slug}`,
    // description: (optional) if omitted -> site default is used
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return buildMetadata({ path: `/blog/${params.slug}` }); // default desc
  return buildMetadata({
    path: `/blog/${post.slug}`,
    title: post.title,
    description: post.description, // undefined -> fallback to site default
  });
}

export default async function Page({ params }: Props) {
  const post = await getPost(params.slug);
  if (!post) notFound();
  return <article className="prose mx-auto"><h1>{post.title}</h1></article>;
}
```

## Acceptance Criteria

- When a page sets `title` only: `<title>` becomes `"${pageTitle} | Your Site Name"`, and the description falls back to the site default.
- When a page sets both `title` and `description`: both override the defaults correctly.
- When a page sets neither `title` nor `description`: the layout defaults (site default title and description) apply.
- The `canonical` URL resolves to an absolute URL via `metadataBase`.
