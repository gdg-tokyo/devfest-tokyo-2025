import { notFound } from 'next/navigation'
import { getSessions, OldSession } from '@/lib/data-parser'
import SessionDetail from '@/features/session/components/SessionDetail'

interface SessionPageProps {
  params: {
    sessionId: string
  }
}

const getSessionById = (sessionId: string): OldSession | undefined => {
  const allSessions = getSessions()
  return allSessions.find((session) => session.id === sessionId)
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
