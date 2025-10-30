import TalkDetail from '@/features/talk/components/TalkDetail'
import { getTalkById, getTalks } from '@/lib/data-parser'
import { withRepoBasePath } from '@/lib/url-utils'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const allTalks = getTalks()
  return allTalks.map((talk) => ({
    talkId: talk.id,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { talkId: string }
}): Promise<Metadata> {
  const talkData = getTalkById(params.talkId)

  if (!talkData) {
    return {
      title: 'Talk not found',
    }
  }

  const { talk } = talkData

  return {
    title: talk.title,
    description: talk.abstract,
    openGraph: {
      title: talk.title,
      description: talk.abstract,
      type: 'article',
      url: withRepoBasePath(`/talks/${talk.id}`),
      images: [
        {
          url: withRepoBasePath('/images/devfest-tokyo-2025-logo.png'),
          width: 800,
          height: 600,
          alt: 'DevFest Tokyo 2025',
        },
      ],
    },
  }
}

export default function TalkPage({ params }: { params: { talkId: string } }) {
  const talkData = getTalkById(params.talkId)

  if (!talkData) {
    notFound()
  }

  const { talk, speakers } = talkData

  return (
    <div className="container mx-auto px-4 lg:px-8 max-w-screen-md lg:max-w-screen-xl p-4">
      <TalkDetail talk={talk} speakers={speakers} />
    </div>
  )
}
