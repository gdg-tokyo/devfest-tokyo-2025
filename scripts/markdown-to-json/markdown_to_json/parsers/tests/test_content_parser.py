from unittest.mock import mock_open, patch

from markdown_to_json.parsers.content_parser import _parse_talk


def test_parse_talk_removes_images_from_abstract():
    markdown_content = """---
time_start: "10:00"
time_end: "10:50"
track: "Track A"
---

# My Talk Title

This is the abstract.

Here is an image that should be removed:
![other_image](https://example.com/other.jpg)

And here is a talk thumbnail:
![talk_thumbnail](https://example.com/thumbnail.jpg)
"""
    with patch("builtins.open", mock_open(read_data=markdown_content)):
        talk, _ = _parse_talk(
            "dummy/path/file.md", "talk-id", "Track A", "talk-slug"
        )

    assert talk is not None
    assert "<img" not in talk.abstract
    assert talk.thumbnail_url == "https://example.com/thumbnail.jpg"