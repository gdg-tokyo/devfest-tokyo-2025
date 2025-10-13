
'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import TimetableGrid from '@/features/timetable/components/TimetableGrid';
import FilterSystem from '@/features/timetable/components/FilterSystem';
import OverlayMessageCard from '@/components/common/OverlayMessageCard';
import { getSessions } from '@/lib/data-parser';
import { Session, SpeakerProfile } from '@/types';

const TimetablePage = () => {
  const allSessions: Session[] = getSessions();

  const [filters, setFilters] = useState<{ levels: string[]; keyword: string }>({ levels: [], keyword: '' });
  const [showNoDataMessage, setShowNoDataMessage] = useState(false);

  useEffect(() => {
    if (allSessions.length === 0) {
      setShowNoDataMessage(true);
    } else {
      setShowNoDataMessage(false);
    }
  }, [allSessions]);

  const handleFilterChange = useCallback((newFilters: { levels: string[]; keyword: string }) => {
    setFilters(newFilters);
  }, []);

  const hasMatchingSessions = useMemo(() => {
    return allSessions.some(session => {
      const levelMatch = filters.levels.length === 0 || (session.level && session.level.some(l => filters.levels.includes(l)));
      const keywordMatch = !filters.keyword ||
        session.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||
        (session.description_short && session.description_short.toLowerCase().includes(filters.keyword.toLowerCase())) ||
        session.description_long.toLowerCase().includes(filters.keyword.toLowerCase()) ||
        session.speaker_names.some(name => name.toLowerCase().includes(filters.keyword.toLowerCase()));
      return levelMatch && keywordMatch;
    });
  }, [allSessions, filters]);

  const availableLevels = useMemo(() => {
    const levels = allSessions.flatMap(s => s.level || []);
    return Array.from(new Set(levels));
  }, [allSessions]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Event Timetable</h1>
      <FilterSystem
        onFilterChange={handleFilterChange}
        availableLevels={availableLevels}
      />
      {allSessions.length > 0 ? (
        hasMatchingSessions ? (
          <TimetableGrid sessions={allSessions} filters={filters} />
        ) : (
          <p>No sessions available matching your criteria.</p>
        )
      ) : (
        <p>No sessions available.</p>
      )}
      <OverlayMessageCard
        message="Session data is not available. Please try again later."
        isVisible={showNoDataMessage}
      />
    </div>
  );
};

export default TimetablePage;
