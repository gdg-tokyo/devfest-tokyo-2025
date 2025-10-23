# Quickstart: App Header Design

This document outlines the steps to quickly set up and view the implemented App Header Design feature.

## Prerequisites

- Node.js (version 18 or higher)
- npm (version 9 or higher)
- Git

## Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/gdg-tokyo/devfest-tokyo-2025-web.git
    cd devfest-tokyo-2025-web
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Checkout the feature branch:**
    ```bash
    git checkout 008-app-nav-header
    ```

## Running the Application

1.  **Start the development server:**
    ```bash
    npm run dev
    ```

2.  **Access the application:**
    Open your web browser and navigate to `http://localhost:3000`.

## Verifying the Header

Once the application is running, the new header design should be visible on all pages.

-   **Desktop View:**
    -   Verify the GDG Tokyo logo and "Google Developer Group Tokyo" text on the left.
    -   Verify the "Timetable" and "Talk Directory" navigation links.
    -   Verify the "参加登録" button on the far right.
    -   Test hover states for navigation links and the registration button (color change).

-   **Mobile View:**
    -   Resize your browser window to a mobile size or use browser developer tools to simulate a mobile device.
    -   Verify the hamburger menu is present.
    -   Click the hamburger menu and verify that the dropdown menu appears directly below the header, revealing the "Timetable" and "Talk Directory" links.

-   **JavaScript Disabled (Optional):**
    -   Disable JavaScript in your browser settings.
    -   Refresh the page and verify that the navigation links and the "参加登録" button still function as basic HTML links.
