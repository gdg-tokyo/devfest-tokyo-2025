import type { Metadata } from 'next';
import { SITE } from './site';

export type PageMetaInput = {
  path?: string;        // e.g., "/blog/hello"
  title?: string;       // if omitted, layout defaultTitle is used
  description?: string; // if omitted, falls back to SITE.defaultDescription
};

const abs = (p?: string) => {
  if (p === undefined) return undefined;
  if (p === '') return new URL(SITE.url).toString(); // Treat empty string as root, with trailing slash
  if (p.startsWith("http")) return p;
  return new URL(p, SITE.url).toString();
};


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
