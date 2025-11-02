# Data Model: Dynamic Page Metadata Generation

## Entities

### SITE Configuration

Represents site-wide metadata defaults.

| Field | Type | Description |
| --- | --- | --- |
| `name` | `string` | The name of the site (e.g., "DevFest Tokyo 2025"). |
| `defaultTitle` | `string` | The default title for pages. |
| `defaultDescription` | `string` | The default description for pages. |
| `url` | `string` | The base URL of the site. |

### PageMetaInput

Input structure for building page-specific metadata.

| Field | Type | Description |
| --- | --- | --- |
| `path` | `string?` | The canonical path of the page (e.g., "/blog/hello"). |
| `title` | `string?` | The specific title for the page. If omitted, `SITE.defaultTitle` is used. |
| `description` | `string?` | The specific description for the page. If omitted, `SITE.defaultDescription` is used. |

## Relationships

- `PageMetaInput` uses `SITE Configuration` for default values.
- Individual Next.js pages will provide `PageMetaInput` to the `buildMetadata` function.

## Validation Rules

- `SITE.url` should be a valid URL.
- `PageMetaInput.path` should be a valid relative path or absolute URL.
