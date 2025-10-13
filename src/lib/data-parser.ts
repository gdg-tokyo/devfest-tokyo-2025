import { Session, Talk, Speaker } from "@/types";
import initialSessionsData from '../data/sessions.json';

// Helper to generate a simple unique ID
const generateUniqueId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export function getSessions(): Session[] {
  // Deep clone to avoid modifying the original imported data
  const sessions: Session[] = JSON.parse(JSON.stringify(initialSessionsData));

  return sessions.map(session => {
    if (!session.id) {
      session.id = `session-${generateUniqueId()}`;
    }

    session.talks = session.talks.map(talk => {
      if (!talk.id) {
        talk.id = `talk-${generateUniqueId()}`;
      }

      talk.speakers = talk.speakers.map(speaker => {
        if (!speaker.id) {
          speaker.id = `speaker-${generateUniqueId()}`;
        }
        return speaker;
      });
      return talk;
    });
    return session;
  });
}