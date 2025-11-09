import pytest

from markdown_to_json.parsers import parser_utils


def test_extract_title_and_description_basic():
    markdown_content = """
# My Title

This is the first paragraph.

This is the second paragraph.
"""
    result = parser_utils.extract_title_and_description(markdown_content)
    assert result["title"] == "My Title"
    assert (
        result["description"]
        == "<div><p>This is the first paragraph.</p><p>This is the second paragraph.</p></div>"
    )


def test_extract_title_and_description_no_h1():
    markdown_content = """
This is the first paragraph.

This is the second paragraph.
"""
    with pytest.raises(ValueError, match="H1 title not found in markdown content."):
        parser_utils.extract_title_and_description(markdown_content)


def test_extract_title_and_description_no_paragraph():
    markdown_content = """
# My Title
"""
    result = parser_utils.extract_title_and_description(markdown_content)
    assert result["title"] == "My Title"
    assert result["description"] == "<div></div>"


def test_extract_title_and_description_empty_content():
    markdown_content = """
"""
    with pytest.raises(ValueError, match="H1 title not found in markdown content."):
        parser_utils.extract_title_and_description(markdown_content)


def test_extract_title_and_description_with_speaker_section():
    markdown_content = """
# My Title

This is the description.
It should end before the speaker section.

## Speaker

Speaker details here.
"""
    result = parser_utils.extract_title_and_description(markdown_content)
    assert result["title"] == "My Title"
    assert (
        result["description"]
        == "<div><p>This is the description.\nIt should end before the speaker section.</p></div>"
    )


# --- generate_session_id Tests ---
def test_generate_session_id_valid_format():
    assert parser_utils.generate_session_id("01-keynote") == "cae9d3b2"


def test_generate_session_id_fallback():
    assert parser_utils.generate_session_id("invalid-folder") == "b01e5f44"


# --- generate_talk_id Tests ---
def test_generate_talk_id_valid_format():
    assert parser_utils.generate_talk_id("s1", "talk-1.md") == "6b86b273"
    assert parser_utils.generate_talk_id("s5", "talk-10.md") == "4a44dc15"


def test_generate_talk_id_fallback():
    assert parser_utils.generate_talk_id("s1", "my-talk.md") == "d1358ab9"
    assert parser_utils.generate_talk_id("s1", "talk.md") == "ce7611e7"


# --- generate_speaker_id Tests ---
def test_generate_speaker_id_hashing_name():
    assert parser_utils.generate_speaker_id("janedoe", "Jane Doe") == "01332c87"
    assert parser_utils.generate_speaker_id(None, "John Smith") == "ef61a579"
    assert parser_utils.generate_speaker_id("bobw", "Bob Williams") == "1d9126fc"
    assert parser_utils.generate_speaker_id(None, "日本語の名前") == "cffe4e53"


def test_generate_speaker_id_empty_name():
    assert parser_utils.generate_speaker_id(None, "") == "e3b0c442"
    assert parser_utils.generate_speaker_id("", "") == "e3b0c442"


# --- extract_slug Tests ---
def test_extract_slug_session():
    assert parser_utils.extract_slug("01-keynote", "session") == "keynote"
    assert parser_utils.extract_slug("invalid-folder", "session") == "invalid-folder"


def test_extract_slug_talk():
    assert parser_utils.extract_slug("talk-1.md", "talk") == "1"
    assert parser_utils.extract_slug("my-talk.md", "talk") == "my-talk"
    assert parser_utils.extract_slug("talk.md", "talk") == "talk"
