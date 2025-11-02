/**
 * Prepends a leading slash to a given path if it doesn't have one.
 *
 * Behavior:
 * - If the path starts with "http://" or "https://", it is treated as an external URL and returned as-is.
 * - Otherwise, it ensures the path starts with a leading slash.
 *
 * Examples:
 *   withRepoBasePath('images/foo.png')
 *     → '/images/foo.png'
 *
 *   withRepoBasePath('/images/foo.png')
 *     → '/images/foo.png'
 *
 *   withRepoBasePath('https://example.com/foo.png')
 *     → 'https://example.com/foo.png'         (always unchanged)
 */
export const withRepoBasePath = (path: string): string => {
  // 1. Return as-is if the input is already an external URL
  if (/^https?:\/\//i.test(path)) {
    return path
  }

  // 2. Normalize leading slash
  return path.startsWith('/') ? path : `/${path}`
}
