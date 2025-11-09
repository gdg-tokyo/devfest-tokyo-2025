'use client'

import { useState, useEffect } from 'react'
import type { FC } from 'react'
import sanitizeHtml from 'sanitize-html'

type Props = { html: string }

const HtmlContent: FC<Props> = ({ html }) => {
  const [sanitizedHtml, setSanitizedHtml] = useState('')

  useEffect(() => {
    setSanitizedHtml(
      sanitizeHtml(html, {
        allowedTags: [
          'p',
          'ul',
          'ol',
          'li',
          'a',
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
        ],
        allowedAttributes: {
          a: ['href', 'target'],
        },
      })
    )
  }, [html])

  if (typeof window === 'undefined') {
    return <article className="prose max-w-none"></article>
  }

  return (
    <article
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  )
}

export default HtmlContent
