from markdown_to_json.parsers.speaker_parser import parse_speaker_from_content


def test_parse_speaker_from_content_basic():
    markdown_content = """
## Speaker

### Jane Doe (@janedoe) / Google AI Lead

This is Jane's bio.

It has multiple paragraphs.

![speaker](https://example.com/jane.jpg)
"""
    speakers, speaker_ids = parse_speaker_from_content(
        markdown_content, "dummy/path/file.md", "dummy/path"
    )

    assert len(speakers) == 1
    speaker = speakers[0]
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


def test_parse_multiple_speakers_from_content():
    markdown_content = """
## Speaker

### 砂川優治 さん / 名古屋国際工科専門職大学 学生

名古屋国際工科専門職大学 工科学部 情報工学科 IoTシステムコース３年の砂川優治（Yuji Sunagawa）です。８年間ブラジルに住んでいた経験と、今学んでいる情報技術を活用して、多文化共生に貢献する方法を模索しています。

![speaker](/images/speakers/yuji-sunagawa.jpg)

### sota さん / 名古屋国際工科専門職大学 学生

学生で就活中なので、いいご縁があるといいなと思っています！

![speaker](https://i.ibb.co/vCKnT0BJ/987-D4-D73-A2-E7-4-C1-D-985-A-F48-A25-C2228-D.png)
"""
    speakers, speaker_ids = parse_speaker_from_content(
        markdown_content, "dummy/path/file.md", "dummy/path"
    )

    assert len(speakers) == 2
    assert len(speaker_ids) == 2

    # Test first speaker
    speaker1 = speakers[0]
    assert speaker1.name == "砂川優治"
    assert speaker1.job == "名古屋国際工科専門職大学 学生"
    assert speaker1.photo_url == "/images/speakers/yuji-sunagawa.jpg"
    assert speaker_ids[0] == "4a82c45d"

    # Test second speaker
    speaker2 = speakers[1]
    assert speaker2.name == "sota"
    assert speaker2.job == "名古屋国際工科専門職大学 学生"
    assert (
        speaker2.photo_url
        == "https://i.ibb.co/vCKnT0BJ/987-D4-D73-A2-E7-4-C1-D-985-A-F48-A25-C2228-D.png"
    )
    assert speaker_ids[1] == "a7d6d8cd"


def test_parse_speaker_from_content_with_other_images():
    markdown_content = """
## Speaker

### John Doe

This is John's bio.

Here is an image that is not a speaker photo:
![other_image](https://example.com/other.jpg)

And here is the actual speaker photo:
![speaker](https://example.com/john.jpg)

And another image to ignore:
![another_image](https://example.com/another.jpg)
"""
    speakers, speaker_ids = parse_speaker_from_content(
        markdown_content, "dummy/path/file.md", "dummy/path"
    )

    assert len(speakers) == 1
    speaker = speakers[0]
    assert speaker.name == "John Doe"
    assert speaker.photo_url == "https://example.com/john.jpg"
    assert "<img" not in speaker.bio


def test_parse_speaker_from_content_no_photo():
    markdown_content = """
## Speaker

### John Smith (@john_smith) / Web Perf Guru

John's bio without a photo.

"""
    speakers, speaker_ids = parse_speaker_from_content(
        markdown_content, "dummy/path/file.md", "dummy/path"
    )

    assert len(speakers) == 1
    speaker = speakers[0]
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
    speakers, speaker_ids = parse_speaker_from_content(
        markdown_content, "dummy/path/file.md", "dummy/path"
    )

    assert len(speakers) == 1
    speaker = speakers[0]
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
    speakers, speaker_ids = parse_speaker_from_content(
        markdown_content, "dummy/path/file.md", "dummy/path"
    )

    assert speakers == []
    assert speaker_ids == []
