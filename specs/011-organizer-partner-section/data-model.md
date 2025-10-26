# Data Model: Organizer & Partners Section

## Entity: Partner

Represents an organization supporting the event, displayed in the "Organizers & Partners" section.

### Attributes

- **`name`** (string, required): The official name of the partner.
  - **Validation**: Must be a non-empty string.
- **`url`** (string, required): The URL to the partner's official website.
  - **Validation**: Must be a valid URL format (e.g., starts with `http://` or `https://`).
- **`logo`** (string, required): The relative path to the partner's logo image, expected to be under `public/images/organizers-and-partners/`.
  - **Validation**: Must be a non-empty string, ideally a path to an image file (e.g., `/images/organizers-and-partners/partner-logo.png`).
- **`tier`** (string, required): The category of partnership.
  - **Validation**: Must be one of the following values: "Organizer", "Co-Organizer", "Sponsor", "Supporter".

### Relationships

- None (standalone entity within this feature).

## Data Source

The data will be stored in a local JSON file, `src/data/partners.json` (for production) and `src/data/partners.dev.json` (for development dummy data).

### Example `partners.json` structure:

```json
[
  {
    "name": "GDG Tokyo",
    "url": "https://gdg.community.dev/gdg-tokyo/",
    "logo": "/images/organizers-and-partners/gdg-logo-24-color.png",
    "tier": "Organizer"
  },
  {
    "name": "東京国際工科専門職大学 (IPUT)",
    "url": "https://www.iput.ac.jp/",
    "logo": "/images/organizers-and-partners/iput-logo.png",
    "tier": "Co-Organizer"
  },
  {
    "name": "Google",
    "url": "https://about.google/",
    "logo": "/images/organizers-and-partners/google-logo.png",
    "tier": "Sponsor"
  },
  {
    "name": "Example Supporter",
    "url": "https://example.com/supporter",
    "logo": "/images/organizers-and-partners/example-supporter-logo.png",
    "tier": "Supporter"
  }
]
```
