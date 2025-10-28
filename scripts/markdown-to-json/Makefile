
.PHONY: tests
tests:
	uv run pytest -v .

.PHONY: format
format:
	uv run ruff format markdown_to_json

.PHONY: linter
linter:
	uv run ruff linter markdown_to_json
