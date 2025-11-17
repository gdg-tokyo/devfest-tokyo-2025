# Plan: Add SessionCard to Talk Detail Page

This plan outlines the steps to add a `SessionCard` component to the talk detail page, allowing users to easily navigate to the session containing the talk.

## 1. Update Data Model

- **File:** `src/types/index.ts`
- **Action:** Add an optional `session_id` field to the `Talk` interface. This will store the ID of the session that contains the talk.

```typescript
export interface Talk {
  id: string
  session_id?: string // Add this line
  title: string
  // ... other fields
}
```

## 2. Enhance Markdown Parser

- **File:** `scripts/markdown-to-json/markdown_to_json/parser.py`
- **Action:** Modify the parser to associate talks with their parent session.
  1. After parsing all sessions and talks, create a `talk_id -> session_id` map by iterating through the sessions.
  2. Iterate through the parsed talks and add the `session_id` to each talk record using the map.

## 3. Update Talk Detail Page Component

- **File:** `src/features/talk/components/TalkDetail.tsx`
- **Action:**
  1. Import `SessionCard` from `@/features/timetable/components/SessionCard.tsx`.
  2. Import `getSessions` from `@/lib/data-parser`.
  3. In the `TalkDetail` component, retrieve the `session` object by using the `talk.session_id` to find it in the list of all sessions from `getSessions()`.
  4. Conditionally render the `SessionCard` component below the "Speakers" section if a session is found.

## 4. Testing

- **Manual Testing:**
  1. Run the application and navigate to a talk detail page for a talk that is part of a session.
  2. Verify that the `SessionCard` for the correct session is displayed.
  3. Verify that clicking the `SessionCard` navigates to the correct session detail page.
  4. Verify that for a talk not in a session (if any), the `SessionCard` is not displayed.
- **Automated Testing (Optional but Recommended):**
  - Update any relevant unit or E2E tests for the `TalkDetail` component to account for the new `SessionCard`.

## 5. Enhance SessionCard Component

- **File:** `src/features/timetable/components/SessionCard.tsx`
- **Action:**
  1.  Add new optional props to `SessionCardProps`:
      - `showAbstract?: boolean`
      - `showThumbnail?: boolean`
  2.  Update the component to conditionally render the session's description (`session.description`) if `showAbstract` is true. The description should be rendered as HTML content.
  3.  Update the component to conditionally render the session's thumbnail image (`session.thumbnail_url`) on the right side of the card if `showThumbnail` is true and a thumbnail URL exists.
  4.  Adjust the card's layout to a two-column grid when the thumbnail is displayed, with the thumbnail on the right and the text content on the left.

## 6. Update TalkDetail Component

- **File:** `src/features/talk/components/TalkDetail.tsx`
- **Action:**
  1.  When rendering the `SessionCard`, pass the new props to enable the new features:
      ```jsx
      <SessionCard
        session={...}
        showAbstract={true}
        showThumbnail={true}
      />
      ```

## 7. Testing (Update)

- **Manual Testing:**
  1.  Navigate to a talk detail page.
  2.  Verify that the `SessionCard` now displays the session abstract and the session thumbnail if it exists.
  3.  Verify the layout of the `SessionCard` is correct with the new elements.
  4.  Navigate to the timetable page and verify that the `SessionCard`s there have not changed (i.e., they do not show the abstract or thumbnail).
