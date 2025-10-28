'use client'

import { useState, useEffect } from 'react'
import type { FC } from 'react'

type Props = { html: string }

const HtmlContent: FC<Props> = ({ html }) => {
  const [sanitizedHtml, setSanitizedHtml] = useState('')

  useEffect(() => {
    const sanitize = async () => {
      const DOMPurify = (await import('isomorphic-dompurify')).default
      setSanitizedHtml(
        DOMPurify.sanitize(html, { USE_PROFILES: { html: true } })
      )
    }
    sanitize()
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
