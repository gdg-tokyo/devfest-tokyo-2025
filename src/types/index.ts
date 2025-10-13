export interface SpeakerProfile {
  name: string;
  icon_url: string;
  title?: string;
  bio?: string;
  twitter_handle?: string;
}

export interface Session {
  id: string;
  title: string;
  description_short?: string;
  description_long: string;
  speaker_names: string[];
  speaker_profiles: SpeakerProfile[];
  track: string;
  time_start: string;
  time_end: string;
  tech_tags?: string[];
  level?: ('Beginner' | 'Intermediate' | 'Advanced')[];
  perspective?: ('Introduction' | 'Experience' | 'Challenge')[];
  is_keynote?: boolean;
}
