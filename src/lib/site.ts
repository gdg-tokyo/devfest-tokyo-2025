export const SITE = {
  name: "Google Developer Group - DevFest Tokyo 2025",
  defaultTitle: "GDG DevFest Tokyo 2025",
  defaultDescription:
    "Google Developer Group - DevFest Tokyo 2025 の公式サイトです。セッションやその他イベントに関する情報をお届けします。",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  defaultOgImage: "/images/pr/gdg-devfest-2025-main-banner-v2-small.jpg", // Recommended 1200x630
  locale: "ja_JP",
  twitter: {
    site: "@gdgtokyo",    // if available
    creator: "@gdgtokyo", // if available
  },
};
