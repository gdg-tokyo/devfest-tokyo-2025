import { buildMetadata, PageMetaInput } from '@/lib/seo';
import { SITE } from '@/lib/site';
import { withRepoBasePath } from '@/lib/url-utils';

// Mock withRepoBasePath for consistent testing
jest.mock('@/lib/url-utils', () => ({
  withRepoBasePath: jest.fn((path) => `/repo-prefix${path}`),
}));

describe('buildMetadata', () => {
  const defaultInput: PageMetaInput = {
    path: '/',
    title: 'Test Title',
    description: 'Test Description',
    ogImage: '/test-og-image.png',
    type: 'website',
    noindex: false,
    imageAlt: 'Test Image Alt',
  };

  beforeEach(() => {
    // Reset mocks before each test
    (withRepoBasePath as jest.Mock).mockClear();
  });

  it('should build metadata with all provided inputs', () => {
    const metadata = buildMetadata(defaultInput);

    expect(metadata.metadataBase).toEqual(new URL(SITE.url));
    expect(metadata.title).toBe(defaultInput.title);
    expect(metadata.description).toBe(defaultInput.description);
    expect(metadata.alternates?.canonical).toBe(new URL(defaultInput.path!, SITE.url).toString());
    expect(metadata.robots).toEqual({ index: true, follow: true });

    expect(metadata.openGraph?.type).toBe(defaultInput.type);
    expect(metadata.openGraph?.url).toBe(new URL(defaultInput.path!, SITE.url).toString());
    expect(metadata.openGraph?.siteName).toBe(SITE.name);
    expect(metadata.openGraph?.title).toBe(defaultInput.title);
    expect(metadata.openGraph?.description).toBe(defaultInput.description);
    expect(metadata.openGraph?.images?.[0]?.url).toBe(new URL(withRepoBasePath(defaultInput.ogImage!), SITE.url).toString());
    expect(metadata.openGraph?.images?.[0]?.width).toBe(1200);
    expect(metadata.openGraph?.images?.[0]?.height).toBe(630);
    expect(metadata.openGraph?.images?.[0]?.alt).toBe(defaultInput.imageAlt);
    expect(metadata.openGraph?.locale).toBe(SITE.locale);

    expect(metadata.twitter?.card).toBe('summary_large_image');
    expect(metadata.twitter?.site).toBe(SITE.twitter.site);
    expect(metadata.twitter?.creator).toBe(SITE.twitter.creator);
    expect(metadata.twitter?.title).toBe(defaultInput.title);
    expect(metadata.twitter?.description).toBe(defaultInput.description);
    expect(metadata.twitter?.images?.[0]).toBe(new URL(withRepoBasePath(defaultInput.ogImage!), SITE.url).toString());
  });

  it('should use default values when inputs are omitted', () => {
    const metadata = buildMetadata({});

    expect(metadata.metadataBase).toEqual(new URL(SITE.url));
    expect(metadata.title).toBeUndefined(); // layout template applies
    expect(metadata.description).toBe(SITE.defaultDescription);
    expect(metadata.alternates?.canonical).toBe(new URL('/', SITE.url).toString());
    expect(metadata.robots).toEqual({ index: true, follow: true });

    expect(metadata.openGraph?.type).toBe('website');
    expect(metadata.openGraph?.url).toBe(new URL('/', SITE.url).toString());
    expect(metadata.openGraph?.siteName).toBe(SITE.name);
    expect(metadata.openGraph?.title).toBeUndefined();
    expect(metadata.openGraph?.description).toBe(SITE.defaultDescription);
    expect(metadata.openGraph?.images?.[0]?.url).toBe(new URL(withRepoBasePath(SITE.defaultOgImage), SITE.url).toString());
    expect(metadata.openGraph?.images?.[0]?.alt).toBe(SITE.name); // Fallback to SITE.name
    expect(metadata.openGraph?.locale).toBe(SITE.locale);

    expect(metadata.twitter?.card).toBe('summary_large_image');
    expect(metadata.twitter?.site).toBe(SITE.twitter.site);
    expect(metadata.twitter?.creator).toBe(SITE.twitter.creator);
    expect(metadata.twitter?.title).toBeUndefined();
    expect(metadata.twitter?.description).toBe(SITE.defaultDescription);
    expect(metadata.twitter?.images?.[0]).toBe(new URL(withRepoBasePath(SITE.defaultOgImage), SITE.url).toString());
  });

  it('should handle noindex correctly', () => {
    const metadata = buildMetadata({ noindex: true });
    expect(metadata.robots).toEqual({ index: false, follow: false, nocache: true });
  });

  it('should handle absolute ogImage URL', () => {
    const absoluteOgImageUrl = 'https://example.com/absolute-og-image.png';
    const metadata = buildMetadata({ ogImage: absoluteOgImageUrl });

    expect(withRepoBasePath).not.toHaveBeenCalled(); // Should not call withRepoBasePath for absolute URLs
    expect(metadata.openGraph?.images?.[0]?.url).toBe(absoluteOgImageUrl);
    expect(metadata.twitter?.images?.[0]).toBe(absoluteOgImageUrl);
  });

  it('should use title for imageAlt if imageAlt is not provided', () => {
    const metadata = buildMetadata({ title: 'Page Title', ogImage: '/image.png' });
    expect(metadata.openGraph?.images?.[0]?.alt).toBe('Page Title');
  });

  it('should use SITE.name for imageAlt if title and imageAlt are not provided', () => {
    const metadata = buildMetadata({ ogImage: '/image.png' });
    expect(metadata.openGraph?.images?.[0]?.alt).toBe(SITE.name);
  });
});
