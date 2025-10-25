# Data Model: Event Overview

**Purpose**: To define the data structure for the event overview information.

## Entity: `EventOverview`

This entity holds the key details for the event that are displayed in the overview section.

### Fields

| Field Name | Type | Description | Example |
| --- | --- | --- | --- |
| `date` | string | The date of the event. | "November 22, 2025" |
| `time` | string | The time of the event. | "10:00 - 18:00" |
| `location` | string | The name of the event venue. | "ベルサール渋谷ファースト" |
| `address` | string | The full address of the venue in Japanese. | "東京都渋谷区東1-2-20 住友不動産渋谷ファーストタワー2F" |
| `registrationUrl` | string | The URL for the official event registration page. | "https://gdg-tokyo.connpass.com/event/369416/" |

### Validation Rules

- All fields are required.
- `registrationUrl` must be a valid URL.

### JSON Representation

```json
{
  "eventOverview": {
    "date": "November 22, 2025",
    "time": "10:00 - 18:00",
    "location": "ベルサール渋谷ファースト",
    "address": "東京都渋谷区東1-2-20 住友不動産渋谷ファーストタワー2F",
    "registrationUrl": "https://gdg-tokyo.connpass.com/event/369416/"
  }
}
```
