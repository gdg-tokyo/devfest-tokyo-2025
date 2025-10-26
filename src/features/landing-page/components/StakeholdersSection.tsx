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
    <section className="py-12 bg-off-white">
      <div className="container mx-auto px-4">
        {groupedStakeholders.map((group) => (
          <div key={group.type} className="mb-12 last:mb-0">
            <h3 className="text-2xl font-semibold text-center mb-6">
              {group.heading}
            </h3>
            <div className="flex flex-wrap justify-center gap-8">
              {group.items.map((stakeholder) => (
                <a
                  key={stakeholder.name}
                  href={stakeholder.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="justify-self-center max-w-xs w-full flex flex-col items-center justify-center p-4 rounded-lg hover:shadow-lg transition-shadow duration-300 bg-transparent"
                >
                  <p className="text-xl text-gray-800 mb-2 text-center w-full">
                    {stakeholder.name}
                  </p>
                  {stakeholder.logoUrl && (
                    <div className="relative w-full h-32 flex items-center justify-center">
                      <Image
                        src={stakeholder.logoUrl}
                        alt={stakeholder.name}
                        fill
                        style={{ objectFit: 'contain' }}
                        className="p-1"
                      />
                    </div>
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
