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
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']), // Allow common tags and img
        allowedAttributes: {
          ...sanitizeHtml.defaults.allowedAttributes,
          img: ['src', 'alt', 'width', 'height'], // Allow src, alt, width, height for img
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
