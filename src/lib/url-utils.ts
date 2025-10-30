/**
 * Adds the GitHub Pages repository base path to a given asset path.
 *
 * Behavior:
 * - If the path starts with "http://" or "https://", it is treated as an external URL and returned as-is.
 * - Otherwise, it prepends the repository base path (e.g., "/devfest-tokyo-2025")
 *   when the build is for GitHub Pages (`NEXT_PUBLIC_GITHUB_PAGES=true`).
 *
 * Examples:
 *   withRepoBasePath('/images/foo.png')
 *     → '/devfest-tokyo-2025/images/foo.png'  (in production)
 *     → '/images/foo.png'                     (in local development)
 *
 *   withRepoBasePath('https://example.com/foo.png')
 *     → 'https://example.com/foo.png'         (always unchanged)
 *
 * This helper is useful when hosting a Next.js static export on GitHub Pages
 * under a repository-specific subpath.
 */
export const withRepoBasePath = (path: string): string => {
  // 1. Return as-is if the input is already an external URL
  if (/^https?:\/\//i.test(path)) {
    return path
  }

  // 2. Determine base path for GitHub Pages
  const base =
    process.env.NEXT_PUBLIC_GITHUB_PAGES === 'true'
      ? `/${process.env.NEXT_PUBLIC_REPO_NAME}`
      : ''

  // 3. Normalize leading slash and concatenate
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${base}${normalized}`
}
