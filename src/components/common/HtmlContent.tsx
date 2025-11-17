'use client'
import clsx from 'clsx'
import { useMemo } from 'react'
import sanitizeHtml from 'sanitize-html'

type Props = {
  html: string
  className?: string
  stripHtmlTags?: boolean
  'data-testid'?: string
}

export default function HtmlContent({
  html,
  className,
  stripHtmlTags,
  'data-testid': dataTestId,
}: Props) {
  const sanitized = useMemo(() => {
    if (stripHtmlTags) {
      return sanitizeHtml(html, {
        allowedTags: [],
        allowedAttributes: {},
      })
    } else {
      return sanitizeHtml(html, {
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
      })
    }
  }, [html, stripHtmlTags])

  if (stripHtmlTags) {
    return (
      <div
        className={clsx(className)}
        dangerouslySetInnerHTML={{ __html: sanitized }}
        data-testid={dataTestId}
      />
    )
  }

  return (
    <article
      className={clsx('prose prose-zinc max-w-none text-black-02', className)}
      dangerouslySetInnerHTML={{ __html: sanitized }}
      data-testid={dataTestId}
    />
  )
}
