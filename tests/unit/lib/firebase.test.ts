import { initializeFirebase } from '@/lib/firebase';
import { initializeApp, getApps, getApp } from 'firebase/app';

jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
  getApps: jest.fn(() => []),
  getApp: jest.fn(),
}));

describe('Firebase Initialization', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize Firebase app when no apps are initialized', () => {
    const mockApp = {};
    (initializeApp as jest.Mock).mockReturnValue(mockApp);
    const firebaseConfig = {
      apiKey: 'test-api-key',
      authDomain: 'test-auth-domain',
      projectId: 'test-project-id',
      storageBucket: 'test-storage-bucket',
      messagingSenderId: 'test-messaging-sender-id',
      appId: 'test-app-id',
      measurementId: 'test-measurement-id',
    };

    initializeFirebase(firebaseConfig);

    expect(getApps).toHaveBeenCalled();
    expect(initializeApp).toHaveBeenCalledWith(firebaseConfig);
  });

  it('should get existing Firebase app when apps are already initialized', () => {
    const mockApp = {};
    (getApps as jest.Mock).mockReturnValue([mockApp]);
    (getApp as jest.Mock).mockReturnValue(mockApp);
    const firebaseConfig = {};

    initializeFirebase(firebaseConfig);

    expect(getApps).toHaveBeenCalled();
    expect(initializeApp).not.toHaveBeenCalled();
    expect(getApp).toHaveBeenCalled();
  });
});
