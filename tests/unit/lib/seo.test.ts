import { buildMetadata, PageMetaInput } from '@/lib/seo';
import { SITE } from '@/lib/site';
import type { Metadata } from 'next';

describe('buildMetadata', () => {
  const defaultMetadataBase = new URL(SITE.url);

  it('should return default metadata when no input is provided', () => {
    const result = buildMetadata();
    expect(result.metadataBase).toEqual(defaultMetadataBase);
    expect(result.title).toBeUndefined(); // template handles default title
    expect(result.description).toBe(SITE.defaultDescription);
    expect(result.alternates?.canonical).toBe(defaultMetadataBase.toString());
  });

  it('should use provided title and description', () => {
    const input: PageMetaInput = {
      path: '/test-path',
      title: 'Test Title',
      description: 'Test Description',
    };
    const result = buildMetadata(input);
    expect(result.metadataBase).toEqual(defaultMetadataBase);
    expect(result.title).toBe('Test Title');
    expect(result.description).toBe('Test Description');
    expect(result.alternates?.canonical).toBe(`${SITE.url}/test-path`);
  });

  it('should fall back to default description if not provided', () => {
    const input: PageMetaInput = {
      path: '/another-path',
      title: 'Another Title',
    };
    const result = buildMetadata(input);
    expect(result.metadataBase).toEqual(defaultMetadataBase);
    expect(result.title).toBe('Another Title');
    expect(result.description).toBe(SITE.defaultDescription);
    expect(result.alternates?.canonical).toBe(`${SITE.url}/another-path`);
  });

  it('should handle absolute path in input', () => {
    const absolutePath = 'https://example.com/absolute';
    const input: PageMetaInput = {
      path: absolutePath,
      title: 'Absolute Path Title',
    };
    const result = buildMetadata(input);
    expect(result.alternates?.canonical).toBe(absolutePath);
  });

  it('should handle empty path in input', () => {
    const input: PageMetaInput = {
      path: '',
      title: 'Empty Path Title',
    };
    const result = buildMetadata(input);
    expect(result.alternates?.canonical).toBe(defaultMetadataBase.toString());
  });
});
