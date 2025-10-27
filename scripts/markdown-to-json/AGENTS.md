# Lessons Learned

# 2025-10-29

- Python module loading and caching can lead to extremely subtle and persistent bugs in test environments, especially when refactoring core logic.
- Debugging such issues requires meticulous isolation, aggressive cache clearing, and sometimes even restructuring code to force re-evaluation of modules.
- Explicitly importing modules (e.g., `import module_name` instead of `from module_name import function`) can sometimes mitigate unexpected behavior in test environments.
- When facing persistent, inexplicable test failures related to module behavior, consider the possibility of an environment-level caching problem.

# 2025-10-28

- Iterative refactoring improves readability and testability.
- Deterministic file processing is crucial for reliable tests.
- `conftest.py` effectively manages shared Pytest fixtures.
- `attrs` and `cattrs` provide robust data modeling and serialization.
- `click` simplifies building intuitive command-line interfaces.
- Understanding `uv`'s packaging behavior is key for local project development, especially for entry points and module discovery.
- Careful `git` management (frequent status checks, precise staging, `git reset` for recovery) is essential during complex refactoring.
- Docstring adoption enhances code clarity and maintainability.

# How to Test

To run the tests for the `markdown-to-json` script, navigate to the `scripts/markdown-to-json` directory and execute the following command:

```bash
make tests
```
