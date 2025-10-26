import { getStakeholders } from '@/lib/data-parser'
import { Stakeholder } from '@/types'
import Image from 'next/image'
import React from 'react'

const StakeholdersSection: React.FC = () => {
  const stakeholders = getStakeholders()

  if (stakeholders.length === 0) {
    return null // Don't render anything if no stakeholders
  }

  const categories: Array<Stakeholder['type']> = [
    'organizer',
    'co-organizer',
    'sponsor',
    'partner',
  ]

  const categoryHeadings: Record<Stakeholder['type'], string> = {
    organizer: '主催',
    'co-organizer': '共催',
    sponsor: '協賛',
    partner: '協力',
  }

  const groupedStakeholders = categories
    .map((type) => ({
      type,
      heading: categoryHeadings[type],
      items: stakeholders.filter((s) => s.type === type),
    }))
    .filter((group) => group.items.length > 0)

  return (
    <section className="container mx-auto px-4 lg:px-8 max-w-screen-md lg:max-w-screen-xl py-12 bg-off-white">
      <div>
        {groupedStakeholders.map((group) => (
          <div key={group.type} className="mb-8 last:mb-0">
            <h3 className="text-2xl font-semibold text-center mb-2">
              {group.heading}
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {group.items.map((stakeholder) => (
                <a
                  key={stakeholder.name}
                  href={stakeholder.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-2 rounded-lg hover:shadow-lg transition-shadow duration-300 bg-transparent w-full max-w-sm"
                >
                  {stakeholder.logoUrl ? (
                    <div className="relative w-full h-32 flex items-center justify-center">
                      <Image
                        src={stakeholder.logoUrl}
                        alt={stakeholder.name}
                        fill
                        style={{ objectFit: 'contain' }}
                        className="p-1"
                      />
                    </div>
                  ) : (
                    <p className="font-bold text-xl text-gray-800 text-center w-full">
                      {stakeholder.name}
                    </p>
                  )}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default StakeholdersSection
