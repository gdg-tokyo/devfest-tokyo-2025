# Research Findings: Organizer & Partners Section

## JSON Data Structure

- **Decision**: The JSON file will be an array of partner objects. Each partner object will have `name` (string), `url` (string), `logo` (string), and `tier` (string) fields. The `tier` field will be a string matching one of the four categories: "Organizer", "Co-Organizer", "Sponsor", "Supporter".
- **Rationale**: This is a simple and straightforward structure that directly maps to the `Key Entities` defined in the `spec.md`. It allows for easy parsing and iteration.
- **Alternatives considered**: A nested object structure where tiers are keys and values are arrays of partners. Rejected because it adds unnecessary complexity for a flat list of partners.

## Logo Sizing (Consistent Height)

- **Decision**: Logos within each tier will be rendered with a consistent maximum height, and their width will scale proportionally. Different tiers may have different maximum heights to visually differentiate them (e.g., Organizers larger than Supporters). The exact pixel values for max-height will be determined during UI implementation, but the principle is to use `max-height` and `width: auto` within a flexbox or grid container.
- **Rationale**: Using `max-height` with `width: auto` ensures logos maintain their aspect ratio while fitting within a defined vertical space, preventing distortion. Allowing different heights per tier provides visual hierarchy.
- **Alternatives considered**:
  - Fixed width and height: Rejected because it can distort logos with varying aspect ratios.
  - Fixed width and auto height: Rejected because it can lead to inconsistent vertical spacing between logos.

## Hover Effect (Hover Highlighting)

- **Decision**: On hover, partner logos will exhibit a subtle scaling effect (e.g., `scale(1.05)`) and a slight shadow (`box-shadow`). A smooth transition will be applied for a polished user experience.
- **Rationale**: A subtle scale and shadow are common, visually appealing, and non-intrusive hover effects that clearly indicate interactivity without being distracting.
- **Alternatives considered**:
  - Changing background color: Rejected as it might clash with logo colors or the overall design.
  - Border change: Rejected as it can cause layout shifts.
