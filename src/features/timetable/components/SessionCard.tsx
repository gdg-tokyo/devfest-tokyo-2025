import React from 'react';
import { Session, SpeakerProfile } from '@/types'; // Import interfaces from src/types

interface SessionCardProps {
  session: Session;
  isGrayedOut?: boolean;
}

const getLevelColor = (level: 'Beginner' | 'Intermediate' | 'Advanced') => {
  switch (level) {
    case 'Beginner':
      return 'bg-gdg-pastel-blue';
    case 'Intermediate':
      return 'bg-gdg-pastel-green';
    case 'Advanced':
      return 'bg-gdg-pastel-red';
    default:
      return 'bg-gray-200';
  }
};

const PersonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l3 3a1 1 0 001.414-1.414L11 10.586V7z" clipRule="evenodd" />
  </svg>
);

const SessionCard: React.FC<SessionCardProps> = ({ session, isGrayedOut }) => {
  return (
    <div className={`bg-white rounded-lg p-4 mb-4 border-2 border-gray-800 font-google-sans ${isGrayedOut ? 'opacity-30' : ''}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{session.title}</h3>
      <div className="text-sm text-gray-600 mb-1 flex items-center">
        <PersonIcon />
        <span>{session.speaker_names.join(', ')}</span>
      </div>
      <div className="text-sm text-gray-600 mb-1 flex items-center">
        <ClockIcon />
        <span>{session.time_start} - {session.time_end}</span>
      </div>

      <div className="flex flex-wrap gap-1 mt-2">
        {session.level && session.level.map(l => (
          <span key={l} className={`text-xs px-1 py-0 rounded-full border border-black ${getLevelColor(l)} text-gray-800`}>
            {l}
          </span>
        ))}
        {session.tech_tags && session.tech_tags.slice(0, 2).map((tag) => (
          <span key={tag} className="text-xs px-1 py-0 rounded-full border border-black text-gray-800">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SessionCard;


