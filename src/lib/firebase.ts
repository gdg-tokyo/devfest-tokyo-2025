import { initializeApp, getApps, getApp, FirebaseOptions } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

function initializeFirebase(firebaseConfig: FirebaseOptions) {
  if (!getApps().length) {
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    return { app, analytics };
  } else {
    const app = getApp();
    const analytics = getAnalytics(app);
    return { app, analytics };
  }
}

export { initializeFirebase };
