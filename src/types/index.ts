export interface Session {
  id: string
  talk_ids: string[]
  track: string
  time_start: string
  time_end: string
  room: string
  title: string
  level: string[]
  tech_tags: string[]
  description: string
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
}
