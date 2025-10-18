import { notFound } from 'next/navigation'
import { getSessions } from '@/lib/data-parser'
import { Session } from '@/types'
import SessionDetail from '@/features/session/components/SessionDetail'

interface SessionPageProps {
  params: {
    sessionId: string
  }
}

const getSessionById = (sessionId: string): Session | undefined => {
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
