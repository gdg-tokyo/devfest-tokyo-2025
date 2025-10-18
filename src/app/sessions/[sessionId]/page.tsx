import { notFound } from 'next/navigation'
import sessionsData from '@/data/sessions.json'
import { Session } from '@/types'
import SessionDetail from '@/features/session/components/SessionDetail'

interface SessionPageProps {
  params: {
    sessionId: string
  }
}

const getSessionById = (sessionId: string): Session | undefined => {
  return sessionsData.find((session) => session.id === sessionId)
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
