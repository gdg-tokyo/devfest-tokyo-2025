import React from 'react'
import { render } from '@testing-library/react'
import FirebaseAnalytics from '@/components/FirebaseAnalytics'
import { initializeFirebase } from '@/lib/firebase'

jest.mock('@/lib/firebase', () => ({
  initializeFirebase: jest.fn(),
}))

describe('FirebaseAnalytics', () => {
  it('should render without crashing and call initializeFirebase', () => {
    const { container } = render(<FirebaseAnalytics />)
    expect(container).toBeInTheDocument()
    expect(initializeFirebase).toHaveBeenCalled()
  })
})
