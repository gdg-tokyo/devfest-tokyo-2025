import FilterSystem from '@/components/common/FilterSystem'
import { render, screen } from '@testing-library/react'

// Mock icons to simplify testing
const MockSearchIcon = () => <div data-testid="SearchIcon" />
jest.mock('@mui/icons-material/Search', () => ({
  __esModule: true,
  default: MockSearchIcon,
}))

const MockFilterIcon = () => <div data-testid="FilterIcon" />
jest.mock('@mui/icons-material/FilterList', () => ({
  __esModule: true,
  default: MockFilterIcon,
}))

describe('FilterSystem - Responsive Layout', () => {
  const mockOnFilterChange = jest.fn()
  const mockAvailableLevels = ['Beginner', 'Intermediate']
  const mockAvailableTechTags = ['React', 'Vue.js']

  it('should apply responsive classes to Levels filter section', () => {
    render(
      <FilterSystem
        onFilterChange={mockOnFilterChange}
        availableLevels={mockAvailableLevels}
        availableTechTags={mockAvailableTechTags}
      />
    )

    const levelsSection = screen.getByTestId('levels-filter-section')
    expect(levelsSection).toHaveClass('flex-col')
    expect(levelsSection).toHaveClass('md:flex-row')
  })

  it('should apply responsive classes to Tech Tags filter section', () => {
    render(
      <FilterSystem
        onFilterChange={mockOnFilterChange}
        availableLevels={mockAvailableLevels}
        availableTechTags={mockAvailableTechTags}
      />
    )

    const techTagsSection = screen.getByTestId('tech-tags-filter-section')
    expect(techTagsSection).toHaveClass('flex-col')
    expect(techTagsSection).toHaveClass('md:flex-row')
  })
})
