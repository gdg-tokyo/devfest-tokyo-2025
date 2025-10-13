import React from 'react';
import { Talk, Speaker, SocialLink } from '@/types';
import Image from 'next/image';

interface TalkCardProps {
  talk: Talk;
}

const SocialLinkIcon: React.FC<{ platform: string; url: string }> = ({ platform, url }) => {
  let IconComponent: React.FC<{ className?: string }> | null = null;
  let ariaLabel = '';

  switch (platform.toLowerCase()) {
    case 'twitter':
      IconComponent = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17-18 11.6 2.2.1 4.4-.6 6-2 1.1-.5 2.2-1.8 3.4-3 1.2-1.3 1.9-2.5 2.5-3.6C17.1 10.6 18.7 8 22 4z"/></svg>;
      ariaLabel = 'Twitter profile';
      break;
    case 'linkedin':
      IconComponent = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>;
      ariaLabel = 'LinkedIn profile';
      break;
    case 'github':
      IconComponent = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.44-.78-3.5.25-1.15.25-2.39 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.11 0 2.35 0 3.5A5.403 5.403 0 0 0 4 12c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>;
      ariaLabel = 'GitHub profile';
      break;
    default:
      return null;
  }

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel} className="text-gray-600 hover:text-gray-900">
      {IconComponent && <IconComponent className="w-5 h-5" />}
    </a>
  );
};

const TalkCard: React.FC<TalkCardProps> = ({ talk }) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="border-2 border-gray-800 rounded-lg p-4 bg-white shadow-md flex flex-col justify-between min-h-[200px]"> {/* Added flex-col and justify-between */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{talk.title}</h3>
        <p className="text-gray-600 text-sm">{talk.abstract}</p>
      </div>

      {talk.speakers && talk.speakers.length > 0 && (
        <div className="mt-4 flex justify-end items-end space-x-2"> {/* Changed to flex and justify-end */}
          {talk.speakers.map((speaker: Speaker) => (
            <div key={speaker.id} className="flex flex-col items-center">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300 bg-gray-200 flex items-center justify-center">
                {speaker.photoUrl ? (
                  <Image
                    src={speaker.photoUrl}
                    alt={speaker.name}
                    layout="fill"
                    objectFit="cover"
                  />
                ) : (
                  <span className="text-xl font-bold text-gray-600">
                    {getInitials(speaker.name)}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-700 mt-1">{speaker.name}</p>
              {speaker.socialLinks && speaker.socialLinks.length > 0 && (
                <div className="flex space-x-1 mt-1">
                  {speaker.socialLinks.map((link: SocialLink) => (
                    <SocialLinkIcon key={link.platform} platform={link.platform} url={link.url} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TalkCard;