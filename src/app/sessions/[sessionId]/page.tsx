import { notFound } from 'next/navigation'
import { getSessions } from '@/lib/data-parser'
import { Session } from '@/types'
import SessionDetail from '@/features/session/components/SessionDetail'
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { SITE } from '@/lib/site'

export async function generateStaticParams() {
  const allSessions = getSessions()
  return allSessions.map((session) => ({
    sessionId: session.id,
  }))
}

interface SessionPageProps {
  params: {
    sessionId: string
  }
}

const getSessionById = (sessionId: string): Session | undefined => {
  const allSessions = getSessions()
  return allSessions.find((session) => session.id === sessionId)
}

export async function generateMetadata({
  params,
}: {
  params: { sessionId: string }
}): Promise<Metadata> {
  const session = getSessionById(params.sessionId)

  if (!session) {
    return buildMetadata({ path: `/sessions/${params.sessionId}` })
  }

  return buildMetadata({
    path: `/sessions/${session.id}`,
    title: `${session.title} - ${SITE.name}`,
    description: session.description,
    ogImage: session.thumbnail_url,
  })
}

export default function SessionPage({ params }: SessionPageProps) {
  const { sessionId } = params
  const session = getSessionById(sessionId)

  if (!session) {
    notFound()
  }

  return (
    <div className="container mx-auto p-4">
      <SessionDetail session={session} />
    </div>
  )
}
