# Plan for Speaker Gallery Section

This plan outlines the steps to implement the "Speaker Icon Gallery" on the landing page.

1.  **Create the Speaker Gallery component:**
    - Create a new component file: `src/features/landing-page/components/SpeakerGallery.tsx`.
    - This component will be responsible for fetching all speakers and session chairs, combining them, removing duplicates, and sorting them alphabetically by name.
    - It will render the speaker icons in a responsive grid.

2.  **Implement the responsive grid:**
    - Use Tailwind CSS to create a grid that displays up to 8 icons per row on tablet/desktop (`md:` and `lg:` breakpoints).
    - The grid should display up to 4 icons per row on mobile devices.

3.  **Style the speaker icons:**
    - Each icon will be a circular image.
    - On hover, the icon can have a subtle zoom effect.

4.  **Integrate the component into the landing page:**
    - Add the new `SpeakerGallery` component to `src/app/page.tsx`.
    - Ensure the data is passed correctly to the component.

5.  **Add tests:**
    - Create a unit test for the `SpeakerGallery` component to verify that it renders the correct number of speakers and that they are sorted correctly.
    - Create an E2E test to check the responsive behavior of the grid.
