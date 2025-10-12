import { Session } from "@/types";
import sessionsData from '../data/sessions.json';

export function getSessions(): Session[] {
  return sessionsData;
}
