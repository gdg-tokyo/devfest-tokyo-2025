const DOMPurify = {
  sanitize: (html, config) => {
    let cleaned = html

    // Remove script tags and their content
    cleaned = cleaned.replace(
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      ''
    )
    // Remove all other HTML tags
    cleaned = cleaned.replace(/<[^>]*>/g, '')
    // Decode &amp;
    cleaned = cleaned.replace(/&amp;/g, '&')
    // Replace multiple spaces/newlines with a single space and trim
    cleaned = cleaned.replace(/\s+/g, ' ').trim()

    return cleaned
  },
}

module.exports = DOMPurify
