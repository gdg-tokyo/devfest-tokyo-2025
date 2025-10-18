import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import FilterSystem from '@/features/timetable/components/FilterSystem'

describe('FilterSystem', () => {
  const mockOnFilterChange = jest.fn()
  const availableLevels = ['Beginner', 'Intermediate', 'Advanced']

  beforeEach(() => {
    mockOnFilterChange.mockClear()
  })

  it('renders all filter sections', () => {
    render(
      <FilterSystem
        onFilterChange={mockOnFilterChange}
        availableLevels={availableLevels}
      />
    )

    expect(
      screen.getByPlaceholderText('Search sessions, speakers, or tags...')
    ).toBeInTheDocument()
    expect(screen.getByText('Levels')).toBeInTheDocument()
  })

  it('calls onFilterChange when keyword is typed', () => {
    render(
      <FilterSystem
        onFilterChange={mockOnFilterChange}
        availableLevels={availableLevels}
      />
    )

    fireEvent.change(
      screen.getByPlaceholderText('Search sessions, speakers, or tags...'),
      { target: { value: 'test' } }
    )
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      levels: [],
      keyword: 'test',
    })
  })

  it('calls onFilterChange when a skill level chip is clicked', () => {
    render(
      <FilterSystem
        onFilterChange={mockOnFilterChange}
        availableLevels={availableLevels}
      />
    )

    fireEvent.click(screen.getByText('Intermediate'))
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      levels: ['Intermediate'],
      keyword: '',
    })

    fireEvent.click(screen.getByText('Advanced'))
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      levels: ['Intermediate', 'Advanced'],
      keyword: '',
    })
  })

  it('removes a skill level when clicked again', () => {
    render(
      <FilterSystem
        onFilterChange={mockOnFilterChange}
        availableLevels={availableLevels}
      />
    )

    fireEvent.click(screen.getByText('Intermediate'))
    fireEvent.click(screen.getByText('Intermediate')) // Click again to deselect
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      levels: [],
      keyword: '',
    })
  })
})
