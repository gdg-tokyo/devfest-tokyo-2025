export const getLevelColor = (
  level?: 'Beginner' | 'Intermediate' | 'Advanced'
) => {
  switch (level) {
    case 'Beginner':
      return 'bg-gdg-pastel-blue'
    case 'Intermediate':
      return 'bg-gdg-pastel-green'
    case 'Advanced':
      return 'bg-gdg-pastel-red'
    default:
      return 'bg-gray-200'
  }
}

export const getPerspectiveColor = (
  perspective?: 'Introduction' | 'Experience' | 'Challenge'
) => {
  switch (perspective) {
    case 'Introduction':
      return 'bg-google-blue-500 text-white'
    case 'Experience':
      return 'bg-google-green-500 text-white'
    case 'Challenge':
      return 'bg-google-red-500 text-white'
    default:
      return 'bg-gray-200'
  }
}

export const getTrackColor = (track?: string) => {
  let normalizedTrack = track;

  if (normalizedTrack === 'Hands-on Studio') {
    normalizedTrack = 'Track D'; // Map display name back to internal track name for color logic
  } else if (normalizedTrack && normalizedTrack.length === 1) {
    // If it's a single letter, prepend "Track " to match existing cases
    normalizedTrack = `Track ${normalizedTrack}`;
  }

  switch (normalizedTrack) {
    case 'Track A':
      return 'bg-gdg-pastel-red'
    case 'Track B':
      return 'bg-gdg-pastel-blue'
    case 'Track C':
      return 'bg-gdg-pastel-green'
    case 'Track D':
      return 'bg-gdg-pastel-yellow'
    default:
      return 'bg-gray-200'
  }
}

export const getTrackDisplayName = (track: string) => {
  if (track === 'Track D') {
    return 'Hands-on Studio'
  }
  return track
}
