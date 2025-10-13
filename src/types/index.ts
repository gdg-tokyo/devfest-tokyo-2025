export interface SocialLink {
  platform: string;
  url: string;
}

export interface Speaker {
  id: string;
  name: string;
  bio: string;
  photoUrl: string;
  socialLinks: SocialLink[];
}

export interface Talk {
  id: string;
  title: string;
  abstract: string;
  speakers: Speaker[];
}

export interface Session {
  id: string;
  title: string;
  longDescription: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
  perspective?: 'Introduction' | 'Experience' | 'Challenge';
  talks: Talk[];
  time_start: string;
  time_end: string;
  track: string; // Added
}