import re

from markdown_to_json.data_model.speaker import Speaker
from markdown_to_json.parsers.markdown_utils import markdown_to_safe_html
from markdown_to_json.parsers.parser_utils import generate_speaker_id


def parse_speaker_from_content(content: str):
    """Parses speaker information from markdown content."""
    speaker_section_match = re.search(
        r"## Speaker\n\n### (.+?)\n\n([\s\S]+?)(?=\n##|$)", content
    )
    if not speaker_section_match:
        return None, []

    speaker_heading = speaker_section_match.group(1).strip()
    speaker_bio_markdown = speaker_section_match.group(2).strip()
    speaker_name, final_twitter_handle, final_job = _parse_speaker_heading(
        speaker_heading
    )
    speaker_bio_text, photo_url = _parse_speaker_bio(speaker_bio_markdown)

    speaker_id = generate_speaker_id(final_twitter_handle, speaker_name)

    speaker_data = Speaker(
        id=speaker_id,
        name=speaker_name,
        bio=speaker_bio_text,
        photo_url=photo_url,
        job=final_job if final_job else "",
        twitter_handle=final_twitter_handle if final_twitter_handle else "",
    )

    return speaker_data, [speaker_id]


def parse_speaker_from_subheading_content(content: str):
    """
    Parses speaker information from markdown content where the speaker section
    starts with a subheading (e.g., '### Speaker Name').
    """
    speaker_section_match = re.search(
        r"### (?P<speaker_heading>[^\n]+)\n\n(?P<speaker_bio_markdown>[\s\S]+)", content
    )
    if not speaker_section_match:
        return None, []

    speaker_heading = speaker_section_match.group("speaker_heading").strip()
    speaker_bio_markdown = speaker_section_match.group("speaker_bio_markdown").strip()

    speaker_name, final_twitter_handle, final_job = _parse_speaker_heading(
        speaker_heading
    )
    speaker_bio_text, photo_url = _parse_speaker_bio(speaker_bio_markdown)

    speaker_id = generate_speaker_id(final_twitter_handle, speaker_name)

    speaker_data = Speaker(
        id=speaker_id,
        name=speaker_name,
        bio=speaker_bio_text,
        photo_url=photo_url,
        job=final_job if final_job else "",
        twitter_handle=final_twitter_handle if final_twitter_handle else "",
    )

    return speaker_data, [speaker_id]


def _parse_speaker_heading(speaker_heading: str):
    """Parses speaker name, Twitter handle, and job from the speaker heading."""
    speaker_name = speaker_heading
    twitter_handle = None
    job = None

    is_url = speaker_heading.startswith("http://") or speaker_heading.startswith(
        "https://"
    )
    if is_url:
        return "TBA Speaker", None, None

    x_handle_match = re.search(r"\(@(.+?)\)", speaker_heading)
    if x_handle_match:
        twitter_handle = x_handle_match.group(1)
        speaker_name = speaker_name.replace(x_handle_match.group(0), "").strip()

    job_match = re.search(r"/\s*(.+)", speaker_name)
    if job_match:
        job = job_match.group(1).strip()
        speaker_name = speaker_name.replace(job_match.group(0), "").strip()

    speaker_name = speaker_name.replace("さん", "").strip()

    return speaker_name, twitter_handle, job


def _parse_speaker_bio(speaker_bio_markdown: str):
    """
    Parses speaker bio (sanitized HTML) and photo URL from the speaker bio markdown.
    """
    photo_url = ""
    # Extract photo URL using regex from the raw markdown
    img_match = re.search(r"!\[.*?\]\((?P<url>[^)]+)\)", speaker_bio_markdown)
    if img_match:
        photo_url = img_match.group("url")
        # Remove the image markdown from the bio markdown so it's not part of the bio HTML
        speaker_bio_markdown = re.sub(
            r"!\[.*?\]\((?P<url>[^)]+)\)", "", speaker_bio_markdown, count=1
        )

    # Convert the remaining markdown to safe HTML
    bio_html = markdown_to_safe_html(speaker_bio_markdown)

    return bio_html, photo_url
