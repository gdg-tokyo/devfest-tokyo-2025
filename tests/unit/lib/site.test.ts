import { SITE } from '@/lib/site';

describe('SITE configuration', () => {
  it('should have correct name', () => {
    expect(SITE.name).toBe('Google Developer Group - DevFest Tokyo 2025');
  });

  it('should have correct defaultTitle', () => {
    expect(SITE.defaultTitle).toBe('GDG DevFest Tokyo 2025');
  });

  it('should have correct defaultDescription', () => {
    expect(SITE.defaultDescription).toBe(
      'Google Developer Group - DevFest Tokyo 2025 の公式サイトです。セッションやその他イベントに関する情報をお届けします。'
    );
  });

  it('should have a valid URL', () => {
    expect(SITE.url).toMatch(/^https?:\/\/.+/);
  });

  it('should have defaultOgImage defined', () => {
    expect(SITE.defaultOgImage).toBe('/images/pr/gdg-devfest-2025-main-banner-compressed.jpg');
  });

  it('should have locale set to ja_JP', () => {
    expect(SITE.locale).toBe('ja_JP');
  });

  it('should have twitter site and creator defined', () => {
    expect(SITE.twitter).toBeDefined();
    expect(SITE.twitter.site).toBe('@gdgtokyo');
    expect(SITE.twitter.creator).toBe('@gdgtokyo');
  });
});
