import React from 'react'
import { getStakeholders } from '@/lib/data-parser'
import Image from 'next/image'

const StakeholdersSection: React.FC = () => {
  const stakeholders = getStakeholders()
  const organizers = stakeholders.filter((s) => s.type === 'organizer')
  const partners = stakeholders.filter((s) => s.type === 'partner')

  if (stakeholders.length === 0) {
    return null // Don't render anything if no stakeholders
  }

  return (
    <section className="py-12 bg-off-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Organizers and Partners
        </h2>

        {organizers.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-center mb-6">
              Organizers
            </h3>
            <div className="flex flex-wrap justify-center gap-8">
              {organizers.map((org) => (
                <a
                  key={org.name}
                  href={org.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white"
                >
                  <p className="text-lg font-medium text-gray-800 mb-2">
                    {org.name}
                  </p>
                  {org.logoUrl && (
                    <Image
                      src={org.logoUrl}
                      alt={org.name}
                      width={100}
                      height={100}
                      className="object-contain h-24 w-24"
                    />
                  )}
                </a>
              ))}
            </div>
          </div>
        )}

        {partners.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold text-center mb-6">
              Partners
            </h3>
            <div className="flex flex-wrap justify-center gap-8">
              {partners.map((partner) => (
                <a
                  key={partner.name}
                  href={partner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white"
                >
                  <p className="text-lg font-medium text-gray-800 mb-2">
                    {partner.name}
                  </p>
                  {partner.logoUrl && (
                    <Image
                      src={partner.logoUrl}
                      alt={partner.name}
                      width={100}
                      height={100}
                      className="object-contain h-24 w-24"
                    />
                  )}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default StakeholdersSection
