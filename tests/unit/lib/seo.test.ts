import { buildMetadata, PageMetaInput, stripHtmlTags } from '@/lib/seo';
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

describe('stripHtmlTags', () => {
  it('should remove all HTML tags from a string and normalize whitespace', () => {
    const htmlString = '<p>Hello <strong>world</strong>!</p><a href="#">Link</a>';
    expect(stripHtmlTags(htmlString)).toBe('Hello world!Link');
  });

  it('should handle self-closing tags and normalize whitespace', () => {
    const htmlString = 'Text with <br/>a line break<hr>';
    expect(stripHtmlTags(htmlString)).toBe('Text with a line break');
  });

  it('should handle multiple spaces and newlines around tags and normalize whitespace', () => {
    const htmlString = '<p>  Line 1  </p>\n<p>Line 2</p>';
    expect(stripHtmlTags(htmlString)).toBe('Line 1 Line 2'); // Normalized whitespace
  });

  it('should return the same string if no HTML tags are present and normalize whitespace', () => {
    const plainText = '  This is plain text.  ';
    expect(stripHtmlTags(plainText)).toBe('This is plain text.'); // Trimmed
  });

  it('should handle empty string', () => {
    expect(stripHtmlTags('')).toBe('');
  });

  it('should handle complex HTML structures and normalize whitespace', () => {
    const complexHtml = `
      <div>
        <h1>Title</h1>
        <p>Some text with a <a href="#">link</a> and <em>emphasis</em>.</p>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>
      </div>
    `;
    expect(stripHtmlTags(complexHtml)).toBe('Title Some text with a link and emphasis. Item 1 Item 2'); // Normalized whitespace
  });
});

describe('buildMetadata with HTML stripping', () => {
  it('should strip HTML tags from description for OpenGraph and Twitter metadata', () => {
    const htmlDescription = '<p>This is a <strong>test</strong> description with <a href="#">HTML</a> tags.</p>';
    const expectedDescription = 'This is a test description with HTML tags.';
    const metadata = buildMetadata({ description: htmlDescription });

    expect(metadata.description).toBe(expectedDescription);
    expect(metadata.openGraph?.description).toBe(expectedDescription);
    expect(metadata.twitter?.description).toBe(expectedDescription);
  });
});
