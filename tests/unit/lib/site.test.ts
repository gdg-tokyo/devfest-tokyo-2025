import { SITE } from '@/lib/site';

describe('SITE configuration', () => {
  it('should have the correct name', () => {
    expect(SITE.name).toBe('GDG DevFest Tokyo 2025');
  });

  it('should have the correct defaultTitle', () => {
    expect(SITE.defaultTitle).toBe('GDG DevFest Tokyo 2025 - Find your new eyes');
  });

  it('should have the correct defaultDescription', () => {
    expect(SITE.defaultDescription).toBe('The official website for DevFest Tokyo 2025. Building Safe, Secure and Scalable Solutions with AI and Cloud.');
  });

  it('should have a valid URL', () => {
    expect(SITE.url).toMatch(/^https?:\/\/[^\s$.?#].[^\s]*$/i);
  });
});
