# Data Model: Responsive Layout Rule

This feature primarily deals with the presentation layer and does not introduce complex data models or persistent entities. The key entities are conceptual and relate to how content is displayed and perceived by the user across different device types.

## Entities

### Website Content

- **Description**: Represents all the visual and interactive elements that make up the website's pages. This includes text, images, videos, forms, buttons, and any other UI components.
- **Attributes (Conceptual)**:
  - `type`: (e.g., text, image, component, interactive element)
  - `size`: (e.g., dimensions, font size, responsive scaling properties)
  - `position`: (e.g., placement within the layout, alignment)
  - `interactivity`: (e.g., clickable, hoverable, input field)
- **Relationships**: Content elements are composed within a `Layout` and rendered within a `Viewport`.

### Layout

- **Description**: Defines the structural arrangement of `Website Content` on a page. This feature introduces three distinct layout configurations based on the `Viewport` size: single-column (mobile), two-column (tablet), and three-column (PC).
- **Attributes (Conceptual)**:
  - `columnCount`: (e.g., 1 for mobile, 2 for tablet, 3 for PC)
  - `breakpoint`: (e.g., the screen width threshold at which the layout changes)
  - `alignment`: (e.g., horizontal centering of content)
  - `spacing`: (e.g., gaps between columns and content elements)
- **Relationships**: A `Layout` is applied to `Website Content` based on the characteristics of the `Viewport`.

### Viewport

- **Description**: Represents the visible area of the web page within the user's browser window or device screen. The dimensions of the `Viewport` dictate which `Layout` configuration is applied.
- **Attributes (Conceptual)**:
  - `width`: (e.g., the current width of the browser window in pixels)
  - `height`: (e.g., the current height of the browser window in pixels)
  - `deviceType`: (derived from width, e.g., mobile, tablet, PC)
- **Relationships**: The `Viewport`'s `width` determines the active `Layout` for the `Website Content`.
