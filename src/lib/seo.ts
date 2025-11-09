import type { Metadata } from 'next'
import { SITE } from './site'
import { withRepoBasePath } from '@/lib/url-utils'

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
  // Only apply withRepoBasePath if the raw path is not already an absolute URL
  const processedPath = raw.startsWith('http') ? raw : withRepoBasePath(raw);
  return abs(processedPath)
}

export function stripHtmlTags(htmlString: string): string {
  // Remove HTML tags
  let strippedString = htmlString.replace(/<[^>]*>/g, '');
  // Replace multiple spaces/newlines with a single space and trim
  strippedString = strippedString.replace(/\s+/g, ' ').trim();
  return strippedString;
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

  // Strip HTML tags from the description before using it
  const processedDescription = description ? stripHtmlTags(description) : undefined;
  const desc = processedDescription ?? SITE.defaultDescription
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
