import TalkDetail from '@/features/talk/components/TalkDetail'
import { getTalkById, getTalks } from '@/lib/data-parser'
import { withRepoBasePath } from '@/lib/url-utils'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildMetadata } from '@/lib/seo'
import { SITE } from '@/lib/site'

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
    return buildMetadata({ path: `/talks/${params.talkId}` })
  }

  const { talk, speakers } = talkData

  const speakerNames = speakers.map((speaker) => speaker.name).join(', ')

  return buildMetadata({
    path: `/talks/${talk.id}`,
    title: `${talk.title} (by ${speakerNames}) - ${SITE.name}`,
    description: talk.abstract,
  })
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
