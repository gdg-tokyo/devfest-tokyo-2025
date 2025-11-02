import { initializeApp, getApps, getApp, FirebaseOptions } from "firebase/app";

function initializeFirebase(firebaseConfig: FirebaseOptions) {
  if (!getApps().length) {
    const app = initializeApp(firebaseConfig);
    return { app };
  } else {
    const app = getApp();
    return { app };
  }
}

export { initializeFirebase };
