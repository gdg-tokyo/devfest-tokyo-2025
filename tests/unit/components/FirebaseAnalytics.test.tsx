import React from 'react'
import { render } from '@testing-library/react'
import FirebaseAnalytics from '@/components/FirebaseAnalytics'
import { initializeFirebase } from '@/lib/firebase'

jest.mock('@/lib/firebase', () => ({
  initializeFirebase: jest.fn(),
}))

describe('FirebaseAnalytics', () => {
  // Mock environment variables for Firebase initialization
  const mockEnv = {
    NEXT_PUBLIC_FIREBASE_API_KEY: 'test-api-key',
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: 'test-auth-domain',
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: 'test-project-id',
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: 'test-storage-bucket',
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: 'test-messaging-sender-id',
    NEXT_PUBLIC_FIREBASE_APP_ID: 'test-app-id',
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: 'test-measurement-id',
  }

  beforeAll(() => {
    for (const key in mockEnv) {
      process.env[key] = mockEnv[key as keyof typeof mockEnv]
    }
  })

  afterAll(() => {
    for (const key in mockEnv) {
      delete process.env[key]
    }
  })

  it('should render without crashing and call initializeFirebase', () => {
    const { container } = render(<FirebaseAnalytics />)
    expect(container).toBeInTheDocument()
    expect(initializeFirebase).toHaveBeenCalled()
  })
})
