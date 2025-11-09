'use client'
import { useMemo } from 'react'
import sanitizeHtml from 'sanitize-html'

type Props = { html: string }

export default function HtmlContent({ html }: Props) {
  const sanitized = useMemo(
    () =>
      sanitizeHtml(html, {
        allowedTags: [
          'p',
          'ul',
          'ol',
          'li',
          'a',
          'img',
          'pre',
          'code',
          'table',
          'thead',
          'tbody',
          'tr',
          'th',
          'td',
          'strong',
          'em',
          'blockquote',
          'br',
          'hr',
          'h1',
          'h2',
          'h3',
        ],
        allowedAttributes: {
          a: ['href', 'target', 'rel'],
          img: [
            'src',
            'alt',
            'title',
            'width',
            'height',
            'loading',
            'decoding',
          ],
          code: ['class'],
          span: ['class'],
        },
        allowedSchemes: ['http', 'https', 'mailto', 'tel'],
      }),
    [html]
  )

  return (
    <article
      className="prose prose-zinc dark:prose-invert max-w-none text-black-02"
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  )
}
