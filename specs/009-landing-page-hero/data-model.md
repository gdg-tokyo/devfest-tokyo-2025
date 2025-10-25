## Data Model: Landing Page Hero Panel

### Countdown Component Properties

This defines the input properties for the countdown timer component.

- **`targetDate`**: `Date` or `string` (ISO 8601 format)
  - **Description**: The date and time to which the countdown will count down. This will be November 22, 2025, for the DevFest Tokyo 2025 event.
  - **Validation**: Must be a valid future date.

### Button Properties

This defines the properties for the call-to-action buttons.

- **`label`**: `string`
  - **Description**: The text displayed on the button (e.g., "参加登録", "タイムテーブル").
- **`href`**: `string`
  - **Description**: The URL the button navigates to.
- **`isExternal`**: `boolean`
  - **Description**: Indicates if the link is external (e.g., connpass) or internal (e.g., timetable page). Defaults to `false`.
- **`color`**: `string` (e.g., 'red', 'blue', 'green')
  - **Description**: The primary color for the button's styling, adhering to brand guidelines.
