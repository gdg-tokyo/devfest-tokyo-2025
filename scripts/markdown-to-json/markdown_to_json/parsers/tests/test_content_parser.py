import os

import pytest

from markdown_to_json.parsers.content_parser import parse_sessions_and_talks


def test_parse_sessions_and_talks(setup_test_data):
    base_path = setup_test_data
    docs_base_path = os.path.join(base_path, "docs", "web")

    sessions, talks, speakers_map = parse_sessions_and_talks(docs_base_path)

    assert len(sessions) == 2
    assert sessions[0].id == "cae9d3b2"
    assert sessions[0].slug == "keynote"
    assert sessions[1].id == "35295c86"
    assert sessions[1].slug == "deep-dive"

    assert len(talks) == 4
    assert talks[0].id == "6b86b273"
    assert talks[0].slug == "1"
    assert talks[1].id == "d4735e3a"
    assert talks[1].slug == "2"
    assert talks[2].id == "4e074085"
    assert talks[2].slug == "3"
    assert talks[3].id == "4b227777"
    assert talks[3].slug == "4"

    speakers = list(speakers_map.values())
    assert len(speakers) == 3
    print(speakers)
    assert any(s.id == "01332c87" for s in speakers)
    assert any(s.id == "ef61a579" for s in speakers)
    assert any(s.id == "1d9126fc" for s in speakers)


def test_parse_session_with_multi_paragraph_description(setup_test_data):
    base_path = setup_test_data
    docs_base_path = os.path.join(base_path, "docs", "web")

    # Create a temporary markdown file for the test within the test data structure
    test_session_dir = os.path.join(
        docs_base_path, "prod", "sessions", "99-test-session"
    )
    os.makedirs(test_session_dir, exist_ok=True)
    test_session_path = os.path.join(test_session_dir, "README.md")
    test_session_content = """# Test Session Title

This is the first paragraph of the description.

It can span multiple lines.

- Item 1
- Item 2

This is another paragraph.
"""
    with open(test_session_path, "w") as f:
        f.write(test_session_content)

    sessions, _, _ = parse_sessions_and_talks(docs_base_path)

    # Find the test session
    test_session = next((s for s in sessions if s.slug == "test-session"), None)
    assert test_session is not None

    expected_description = """<div><p>This is the first paragraph of the description.</p><p>It can span multiple lines.</p><ul>
<li>Item 1</li>
<li>Item 2</li>
</ul><p>This is another paragraph.</p></div>"""
    assert test_session.description == expected_description


def test_parse_talk_with_multi_paragraph_abstract(setup_test_data):
    base_path = setup_test_data
    docs_base_path = os.path.join(base_path, "docs", "web")

    # Create a temporary markdown file for the talk within the test data structure
    test_session_dir = os.path.join(
        docs_base_path, "prod", "sessions", "98-test-talk-session"
    )
    os.makedirs(test_session_dir, exist_ok=True)
    test_talk_path = os.path.join(test_session_dir, "talk-test-abstract.md")
    test_talk_content = """# Test Talk Title

This is the first paragraph of the abstract.

It can span multiple lines.

- Abstract Item 1
- Abstract Item 2

This is another abstract paragraph.

## Speaker

### Test Speaker

Test Speaker Bio.
"""
    with open(test_talk_path, "w") as f:
        f.write(test_talk_content)

    _, talks, _ = parse_sessions_and_talks(docs_base_path)

    # Find the test talk
    test_talk = next((t for t in talks if t.slug == "test-abstract"), None)
    assert test_talk is not None

    expected_abstract = """<div><p>This is the first paragraph of the abstract.</p><p>It can span multiple lines.</p><ul>
<li>Abstract Item 1</li>
<li>Abstract Item 2</li>
</ul><p>This is another abstract paragraph.</p></div>"""
    assert test_talk.abstract == expected_abstract
