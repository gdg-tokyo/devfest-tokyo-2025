import { SITE } from '@/lib/site';

describe('SITE configuration', () => {
  it('should have the correct name', () => {
    expect(SITE.name).toBe('Google Developer Group - DevFest Tokyo 2025');
  });

  it('should have the correct defaultTitle', () => {
    expect(SITE.defaultTitle).toBe('GDG DevFest Tokyo 2025');
  });

  it('should have the correct defaultDescription', () => {
    expect(SITE.defaultDescription).toBe('Google Developer Group - DevFest Tokyo 2025 の公式サイトです。セッションやその他イベントに関する情報をお届けします。');
  });

  it('should have a valid URL', () => {
    expect(SITE.url).toMatch(/^https?:\/\/[^\s$.?#].[^\s]*$/i);
  });
});
