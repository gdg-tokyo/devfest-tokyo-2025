# Research: Google Analytics Integration

## Objective

Determine the best method for integrating Google Analytics 4 (GA4) into the existing Next.js application.

## Methods Considered

1.  **`@next/third-parties` Library**:
    - **Description**: The official Vercel library for integrating third-party scripts like Google Analytics.
    - **Pros**: Simple, optimized for Next.js, and handles script loading efficiently.
    - **Cons**: Less flexible if the application needs to use other Firebase services.

2.  **Manual Script Injection**:
    - **Description**: Manually adding the Google Analytics `gtag.js` script to the Next.js application.
    - **Pros**: Full control over the implementation.
    - **Cons**: Verbose and requires manual handling of page view events on route changes.

3.  **Firebase SDK**:
    - **Description**: Using the official Firebase Web SDK to initialize Google Analytics.
    - **Pros**: The recommended approach when the application is already using Firebase for other features (like Hosting). It provides a unified way to manage all Firebase services.
    - **Cons**: Slightly more setup than the `@next/third-parties` library if only Analytics is needed.

## Decision

**Chosen Method**: Firebase SDK

## Rationale

The project is already configured for deployment to Firebase Hosting. Using the Firebase SDK for Analytics provides a cohesive and integrated approach. It simplifies the overall architecture by managing all Firebase-related initializations in one place, which is beneficial for future scalability and maintenance if other Firebase services (like Firestore or Authentication) are added later. This aligns with the project's existing infrastructure choices.

## Alternatives Considered

- **`@next/third-parties`**: Rejected because a more integrated Firebase approach is desired.
- **Manual Script Injection**: Rejected due to complexity.
