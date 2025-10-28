# AGENTS Memory

## Specification Index

### Landing Page [001-landing-page](./001-landing-page)

This specification outlines the requirements for the main landing page of the DevFest Tokyo 2025 website. It includes the overall structure, featuring a primary navigation bar, a hero section, a welcome message, and an event overview. The design is guided by provided visual mockups, and the page is expected to be responsive and performant.

#### Components Defined in this Spec

- Application Nav Bar
- Welcome Message Section

### DevFest Style [002-devfest-style](./002-devfest-style)

This specification details the visual design and styling guidelines for the website, ensuring alignment with the official DevFest brand. It defines the color palette, typography, and component styles, such as the use of rounded, bordered boxes for content. The spec also mandates a themed background for the hero section and adherence to the DevFest design guide for a consistent and professional appearance.

#### Components Defined in this Spec

- Styled Navigation Bar
- Styled Welcome Message Box
- Hero Section Background

### Time Table Page [003-time-table-page](./003-time-table-page)

This specification describes the Time Table page, which allows attendees to view the event schedule. It includes features for filtering sessions by skill level, technical tags, and keywords. The page is designed to be responsive, with different layouts for mobile, tablet, and desktop. Session information is presented in cards, and the overall design adheres to the DevFest brand guide.

#### Components Defined in this Spec

- Timetable Display
- Client-Side Filtering System
- Session Card

### Session Page [004-session-page-concept](./004-session-page-concept)

This specification defines the Session Page, which provides detailed information about a single talk. It displays the session's title, a long description, skill level, and learning perspective, along with a profile card for the speaker(s). The page is accessible from the Timetable and maintains a consistent visual style with the rest of the application.

#### Components Defined in this Spec

- Session Detail Display
- Presenter Profile Display

### Talk Directory Page [005-talk-directory-page](./005-talk-directory-page)

This specification outlines the Talk Directory Page, a central hub for attendees to discover and explore all available talks. It provides a comprehensive, filterable view of all sessions, allowing users to quickly find content that matches their interests and skill level. Users can search by keyword and filter by Level, Perspective, and Tech Tags.

#### Components Defined in this Spec

- Talk Directory Grid
- Talk Filtering System
- Talk Card

### Data Schema Refactoring [006-data-schema-policy](./006-data-schema-policy)

This specification details the refactoring of the data schema. The original single JSON data source is split into three separate entities: `Session`, `Talk`, and `Speaker`. This change is intended to simplify data management and improve the developer experience. The specification also introduces environment-specific datasets for development and production.

#### Data Entities Defined in this Spec

- Speaker Data Entity
- Talk Data Entity
- Session Data Entity

### Talk Page [007-talk-page-concept](./007-talk-page-concept)

This specification describes the dedicated Talk Page, which provides detailed information about a single talk. The page will display the talk's title, abstract, time, track, and speaker information in a two-panel layout. It also includes requirements for Open Graph (OGP) meta tags for social media sharing and navigation buttons to other relevant pages.

#### Components Defined in this Spec

- Talk Details Panel
- Speaker Details Panel
- Action Buttons

### App Header Design [008-app-nav-header](./008-app-nav-header)

This specification details the design and functionality of the application's main navigation header. It requires the header to display the GDG Tokyo logo and name, provide navigation links to the Timetable and Talk Directory pages, and include a prominent call-to-action button for event registration. The header must be responsive, collapsing into a hamburger menu on smaller screens.

#### Components Defined in this Spec

- Application Header
- Navigation Links
- Registration Button
- Hamburger Menu

### Landing Page Hero Section [009-landing-page-hero-section](./009-landing-page-hero-section)

This specification defines the hero section of the landing page. It will display the event logo, theme, and a countdown timer. It also includes prominent call-to-action buttons for event registration, and for navigating to the timetable and talk directory pages. The hero section will also feature a subtle background animation.

#### Components Defined in this Spec

- Hero Panel
- Event Countdown Clock
- Call-to-Action Buttons

### Event Overview Section [010-event-overview-section](./010-event-overview-section)

This specification defines the Event Overview section on the landing page. This section will display key event details: date and time, location, and registration information. Each piece of information will be presented in a card with an accompanying icon, and the design will be inspired by a reference website.

#### Components Defined in this Spec

- Event Overview Section
- Information Cards (Date, Place, Registration)
- Registration Button

### Landing Page Stakeholders Section [011-landing-page-stakeholders-section](./011-landing-page-stakeholders-section)

This specification defines the "Stakeholders" section on the landing page. It will display logos of event partners in four groups: Organizer, Co-Organizer, Sponsor, and Supporter. The data will be sourced from a JSON file. The layout will be a responsive grid with lazy-loading images and hover effects.

#### Components Defined in this Spec

- Stakeholders Section
- Stakeholder Logo Grid

### Responsive Layout Rule [013-responsive-layout-rule](./013-responsive-layout-rule)

This specification defines the responsive layout rules for the website, supporting three tiers: mobile, tablet, and PC. It outlines how content should adapt to different screen widths, including single-column layouts for mobile and multi-column layouts for tablets and PCs, ensuring a consistent and optimal viewing experience across devices.

#### Components Defined in this Spec

- Responsive Layout System
