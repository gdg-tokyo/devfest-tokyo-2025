# Research: Data Schema Refactoring

**Decision**: The nested data structure in `sessions.json` will be flattened into three separate entities: `sessions`, `talks`, and `speakers`.

**Rationale**: The current nested structure makes it difficult to manage the data. For example, to update a speaker's bio, one would have to find the correct session and talk to find the speaker. By flattening the structure, each entity can be managed independently, which simplifies data management and reduces the risk of errors.

**Alternatives considered**: Keeping the nested structure but providing better data management tools was considered. However, this would add unnecessary complexity to the project. A relational database was also considered, but for the scale of this project, JSON files are sufficient and simpler to manage.
