
"use client";



import React, { useState, useMemo } from 'react';

import { getSessions } from '@/lib/data-parser';

import TalkCard from '@/components/common/TalkCard';

import FilterSystem from '@/components/common/FilterSystem';

import SessionModal from '@/components/common/SessionModal';

import { Session, Talk } from '@/types';

import { useRouter, useSearchParams } from 'next/navigation';



interface TalkWithSessionInfo extends Talk {







            sessionLevel?: 'Beginner' | 'Intermediate' | 'Advanced';







            sessionPerspective?: 'Introduction' | 'Experience' | 'Challenge';







            sessionId: string; // Add sessionId to the extended Talk interface







            session: Session; // Add the full session object







            techTags: string[]; // Add techTags to the extended Talk interface







      }







const TalksPage = () => {



  const router = useRouter();



  const searchParams = useSearchParams();



  const modalSessionId = searchParams.get('sessionId');







  const allSessions = getSessions();



  const [keyword, setKeyword] = useState<string>('');



  



              const [selectedLevels, setSelectedLevels] = useState<string[]>([]);



  



        const [selectedTechTags, setSelectedTechTags] = useState<string[]>([]);







  const allTalks: TalkWithSessionInfo[] = useMemo(() => {



    return allSessions.flatMap(session => session.talks.map(talk => ({



      ...talk,



      sessionLevel: session.level,



      sessionPerspective: session.perspective,



      sessionId: session.id,



      session: session, // Assign the full session object here



      



                  techTags: talk.tags || [], // Assign techTags from talk.tags



      



                  })));



  }, [allSessions]);







  const filteredTalks = useMemo(() => {



    return allTalks.filter(talk => {



      const matchesKeyword = keyword === '' ||



        talk.title.toLowerCase().includes(keyword.toLowerCase()) ||



        talk.abstract.toLowerCase().includes(keyword.toLowerCase()) ||



        talk.speakers.some(speaker => speaker.name.toLowerCase().includes(keyword.toLowerCase()));







      const matchesLevel = selectedLevels.length === 0 ||



        (talk.sessionLevel && selectedLevels.includes(talk.sessionLevel));







      







      const matchesTechTags = selectedTechTags.length === 0 ||
        talk.techTags.some(tag => selectedTechTags.includes(tag));

      return matchesKeyword && matchesLevel && matchesTechTags;



    });



  }, [allTalks, keyword, selectedLevels, selectedTechTags]);







  const selectedSession = useMemo(() => {



    return allSessions.find(session => session.id === modalSessionId) || null;



  }, [allSessions, modalSessionId]);







  const handleCloseModal = () => {



    router.push('/talks', { scroll: false });



  };







  return (



    <div className="container mx-auto p-4">



      <h1 className="text-3xl font-bold mb-6">Talks Page</h1>



                        <FilterSystem



            



                          onFilterChange={({ levels, keyword, techTags }) => {



            



                            setSelectedLevels(levels);



            



                            setKeyword(keyword);



            



                            setSelectedTechTags(techTags);



            



                          }}



            



                          availableLevels={Array.from(new Set(allSessions.map(session => session.level))).filter(Boolean) as string[]}



            



                          availableTechTags={Array.from(new Set(allSessions.flatMap(session => session.talks.flatMap(talk => talk.tags || [])))).filter(Boolean) as string[]}



            



                        />



      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">



        {filteredTalks.length > 0 ? (



          filteredTalks.map((talk) => (



            <TalkCard key={talk.id} talk={talk} sessionId={talk.sessionId} session={talk.session} />



          ))



        ) : (



          <p className="col-span-full text-center text-gray-600">No talks found matching your criteria.</p>



        )}



      </div>



      <SessionModal session={selectedSession} onClose={handleCloseModal} />



    </div>



  );



};







export default TalksPage;




