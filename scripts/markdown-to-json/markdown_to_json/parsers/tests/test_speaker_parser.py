from markdown_to_json.parsers.speaker_parser import parse_speaker_from_content


def test_parse_speaker_from_content_basic():
    markdown_content = """
## Speaker

### Jane Doe (@janedoe) / Google AI Lead

This is Jane's bio.

It has multiple paragraphs.

![speaker](https://example.com/jane.jpg)
"""
    speaker, speaker_ids = parse_speaker_from_content(markdown_content)

    assert speaker is not None
    assert speaker.id == "01332c87"  # Hash of "Jane Doe"
    assert speaker.name == "Jane Doe"
    assert (
        speaker.bio
        == "<div><p>This is Jane's bio.</p><p>It has multiple paragraphs.</p></div>"
    )
    assert speaker.photo_url == "https://example.com/jane.jpg"
    assert speaker.job == "Google AI Lead"
    assert speaker.twitter_handle == "janedoe"
    assert speaker_ids == ["01332c87"]


def test_parse_speaker_from_content_no_photo():
    markdown_content = """
## Speaker

### John Smith (@john_smith) / Web Perf Guru

John's bio without a photo.

"""
    speaker, speaker_ids = parse_speaker_from_content(markdown_content)

    assert speaker is not None
    assert speaker.id == "ef61a579"  # Hash of "John Smith"
    assert speaker.name == "John Smith"
    assert speaker.bio == "<div><p>John's bio without a photo.</p></div>"
    assert speaker.photo_url == ""
    assert speaker.job == "Web Perf Guru"
    assert speaker.twitter_handle == "john_smith"
    assert speaker_ids == ["ef61a579"]


def test_parse_speaker_from_content_no_metadata():
    markdown_content = """
## Speaker

### Bob Williams

Bob's bio with no extra metadata.
"""
    speaker, speaker_ids = parse_speaker_from_content(markdown_content)

    assert speaker is not None
    assert speaker.id == "1d9126fc"  # Hash of "Bob Williams"
    assert speaker.name == "Bob Williams"
    assert speaker.bio == "<div><p>Bob's bio with no extra metadata.</p></div>"
    assert speaker.photo_url == ""
    assert speaker.job == ""
    assert speaker.twitter_handle == ""
    assert speaker_ids == ["1d9126fc"]


def test_parse_speaker_from_content_no_speaker_section():
    markdown_content = """
# My Talk

This is a talk without a speaker section.
"""
    speaker, speaker_ids = parse_speaker_from_content(markdown_content)

    assert speaker is None
    assert speaker_ids == []
