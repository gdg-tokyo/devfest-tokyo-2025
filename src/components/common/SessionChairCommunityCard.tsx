import HtmlContent from '@/components/common/HtmlContent'
import { withRepoBasePath } from '@/lib/url-utils'
import { SessionChairCommunity } from '@/types'
import PersonIcon from '@mui/icons-material/Person'
import Image from 'next/image'
import React from 'react'

interface SessionChairCommunityCardProps {
  community: SessionChairCommunity
}

const SessionChairCommunityCard: React.FC<SessionChairCommunityCardProps> = ({
  community,
}) => {
  return (
    <div className="border-2 border-gray-800 rounded-lg p-4 bg-white shadow-md">
      {/* Mobile View */}
      <div className="flex flex-col md:hidden">
        <div className="flex items-center mb-4">
          {community.logo_url ? (
            <Image
              src={withRepoBasePath(community.logo_url)}
              alt={community.name}
              width={96}
              height={96}
              className="w-24 h-24 rounded-lg mr-4"
            />
          ) : (
            <div className="w-24 h-24 rounded-lg mr-4 bg-gray-200 flex items-center justify-center">
              <PersonIcon style={{ fontSize: 64 }} data-testid="PersonIcon" />
            </div>
          )}
          <div>
            <h3 className="text-4xl font-bold">{community.name}</h3>
          </div>
        </div>
        <HtmlContent html={community.description} />
        {community.url && (
          <a
            href={community.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-google-blue-500 hover:underline mt-2 inline-block"
          >
            Visit Community
          </a>
        )}
      </div>

      {/* PC/Tablet View */}
      <div className="hidden md:flex">
        {community.logo_url && (
          <div className="w-2/12 flex justify-center items-start p-4">
            <Image
              src={withRepoBasePath(community.logo_url)}
              alt={community.name}
              width={200}
              height={200}
              objectFit="contain"
              className="w-full h-auto rounded-lg"
            />
          </div>
        )}
        <div className="w-10/12 p-4">
          <h3 className="text-4xl font-bold">{community.name}</h3>
          <HtmlContent html={community.description} />
          {community.url && (
            <a
              href={community.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-google-blue-500 hover:underline mt-2 inline-block"
            >
              Visit Community
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default SessionChairCommunityCard
