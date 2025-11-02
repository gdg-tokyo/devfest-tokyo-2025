import type { Metadata } from 'next';
import { SITE } from './site';

export type PageMetaInput = {
  path?: string;        // e.g., "/blog/hello"
  title?: string;       // if omitted, layout defaultTitle is used
  description?: string; // if omitted, falls back to SITE.defaultDescription
};

const abs = (p?: string) =>
  !p ? undefined : p.startsWith("http") ? p : new URL(p, SITE.url).toString();

export function buildMetadata(input: PageMetaInput = {}): Metadata {
  const path = input.path ?? "/";
  const title = input.title; // layout template applies if string
  const description = input.description ?? SITE.defaultDescription;

  return {
    metadataBase: new URL(SITE.url),
    title: title, // uses layout's template when provided
    description,
    alternates: { canonical: abs(path) },
  };
}
