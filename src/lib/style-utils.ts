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
  switch (track) {
    case 'A':
      return 'bg-halftone-blue'
    case 'B':
      return 'bg-halftone-yellow'
    case 'C':
      return 'bg-halftone-red'
    case 'D':
      return 'bg-halftone-green'
    default:
      return 'bg-gray-200'
  }
}
