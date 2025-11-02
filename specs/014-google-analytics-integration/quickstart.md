# Quickstart: Google Analytics Integration

This document provides the necessary steps to configure and enable the Google Analytics integration in a local development environment.

## Prerequisites

- A Firebase project must be created and a web app must be registered within it.
- Google Analytics must be enabled for the Firebase project.

## Configuration

1.  **Create an environment file**:
    - In the root of the project, create a new file named `.env.local` if it does not already exist.

2.  **Add the Firebase Configuration**:
    - Open the `.env.local` file and add your full Firebase web app configuration, with each key prefixed by `NEXT_PUBLIC_`:

    ```
    NEXT_PUBLIC_FIREBASE_API_KEY="..."
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="..."
    NEXT_PUBLIC_FIREBASE_PROJECT_ID="..."
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="..."
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="..."
    NEXT_PUBLIC_FIREBASE_APP_ID="..."
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="..."
    ```

## Verification

1.  **Run the application** locally (`npm run dev`).
2.  **Open the website** in your browser.
3.  **Navigate** to a few different pages.
4.  **Check the Google Analytics dashboard**:
    - Log in to your Google Analytics account.
    - Go to the "Realtime" report.
    - You should see your activity (page views) appearing in the report within a few moments.

**Note**: Ad blockers or browser privacy settings may prevent the Google Analytics script from loading, which will block data from being sent. If you are not seeing data, try disabling any ad blockers for the local development site.
