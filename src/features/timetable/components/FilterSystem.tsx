import React from 'react'
import { getLevelColor } from '@/lib/style-utils'

interface FilterSystemProps {
  onFilterChange: (filters: { levels: string[]; keyword: string }) => void
  availableLevels: string[]
}

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-gray-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
)

const FilterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-gray-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V19l-4 2v-5.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
    />
  </svg>
)

const FilterSystem: React.FC<FilterSystemProps> = ({
  onFilterChange,
  availableLevels,
}) => {
  const [selectedLevels, setSelectedLevels] = React.useState<string[]>([])
  const [keyword, setKeyword] = React.useState<string>('')

  React.useEffect(() => {
    onFilterChange({
      levels: selectedLevels,
      keyword: keyword,
    })
  }, [selectedLevels, keyword, onFilterChange])

  const handleLevelChange = (level: string) => {
    setSelectedLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    )
  }

  return (
    <div
      className="mb-6 font-google-sans text-black-02"
      data-testid="filter-system"
    >
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon />
        </div>
        <input
          type="text"
          placeholder="Search sessions, speakers, or tags..."
          className="w-full p-3 pl-12 border border-gray-300 rounded-full"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <FilterIcon />
          <span className="ml-2 text-sm font-medium text-gray-700">Levels</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {availableLevels.map((level) => (
            <span
              key={level}
              className={`cursor-pointer px-3 py-1 rounded-full text-sm ${selectedLevels.includes(level) ? getLevelColor(level as 'Beginner' | 'Intermediate' | 'Advanced') + ' text-white' : 'bg-gray-200 text-gray-800'}`}
              onClick={() => handleLevelChange(level)}
            >
              {level}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FilterSystem
