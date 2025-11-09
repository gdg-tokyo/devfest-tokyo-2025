export interface Session {
  id: string
  talk_ids: string[]
  track: string
  time_start: string
  time_end: string
  title: string
  level: string[]
  tech_tags: string[]
  description: string
  perspective: string[]
  thumbnail_url?: string
  session_chair_id?: string
}

export interface Speaker {
  id: string
  name: string
  bio: string
  photo_url: string
  job: string
  twitter_handle: string
}

export interface Talk {
  id: string
  title: string
  abstract: string
  time_start: string
  time_end: string
  track: string
  speaker_ids: string[]
  tech_tags: string[]
  level: ('Beginner' | 'Intermediate' | 'Advanced')[]
  perspective: ('Introduction' | 'Experience' | 'Challenge')[]
  thumbnail_url?: string
}

export interface Stakeholder {
  name: string
  logoUrl?: string
  type: 'organizer' | 'co-organizer' | 'sponsor' | 'partner'
  link: string
  priority?: number
}

export interface SessionChairCommunity {
  name: string
  description: string
  url?: string
  logo_url?: string
}

export interface SessionChair {
  id: string
  community?: SessionChairCommunity
  chairs: Speaker[]
}
