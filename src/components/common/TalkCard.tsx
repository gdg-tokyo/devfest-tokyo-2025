import { Session, Talk } from '@/types';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import Link from 'next/link';
import React from 'react';

interface TalkCardProps {
  talk: Talk;
  sessionId: string;
  session: Session;
}

const getLevelColor = (level?: 'Beginner' | 'Intermediate' | 'Advanced') => {
  switch (level) {
    case 'Beginner': return 'bg-gdg-pastel-blue';
    case 'Intermediate': return 'bg-gdg-pastel-green';
    case 'Advanced': return 'bg-gdg-pastel-red';
    default: return 'bg-gray-200';
  }
};

const TalkCard: React.FC<TalkCardProps> = ({ talk, sessionId, session }) => {
  const speakerNames = talk.speakers.map(speaker => speaker.name).join(', ');
  const timeStart = session?.time_start || 'N/A';
  const timeEnd = session?.time_end || 'N/A';

  return (
    <Link href={`/talks?sessionId=${sessionId}`} passHref legacyBehavior>
      <div className="border-2 border-gray-800 rounded-lg p-4 bg-white shadow-md flex flex-col justify-between min-h-[200px] cursor-pointer hover:shadow-lg transition-shadow duration-200"> {/* Added flex-col and justify-between */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{talk.title}</h3>
          <p className="text-gray-600 text-sm">{talk.abstract}</p>
        </div>

              <div className="mt-4">
                <div className="text-sm text-gray-600 mb-1 flex items-center">
                  <PersonIcon className="mr-1" />
                  <span>{speakerNames}</span>
                </div>
                <div className="text-sm text-gray-600 mb-1 flex items-center">
                  <AccessTimeIcon className="mr-1" />
                  <span>{timeStart} - {timeEnd}</span>
                </div>

                <div className="flex flex-wrap gap-1 mt-2">
                  {session?.level && (
                    <span key={session.level} className={`text-xs px-1 py-0 rounded-full border border-black ${getLevelColor(session.level)} text-gray-800`}>
                      {session.level}
                    </span>
                  )}
                </div>
              </div>      </div>
    </Link>
  );
};

export default TalkCard;
