# Quickstart: Organizer & Partners Section

This guide provides instructions to quickly set up and run the "Organizers & Partners" section in your local development environment.

## Prerequisites

- Node.js (LTS version)
- npm (comes with Node.js)
- Git

## Setup

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd devfest-tokyo-2025-web
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Dummy Data for Development:** The dummy data for development is located at `src/data/partners.dev.json`. This file is pre-generated for testing purposes.

4.  **Run the Development Server:**

    ```bash
    npm run dev
    ```

5.  **Access the Feature:** Open your browser and navigate to `http://localhost:3000` (or the port indicated by `npm run dev`). The "Organizers & Partners" section will be visible on the landing page, populated with dummy data.

## Data Management

- **Production Data**: Edit `src/data/partners.json` to manage the actual organizer and partner information for the production build.
- **Development Data**: The dummy data for development is located at `src/data/partners.dev.json`. You can directly edit this file to customize the dummy data for local development and testing.
