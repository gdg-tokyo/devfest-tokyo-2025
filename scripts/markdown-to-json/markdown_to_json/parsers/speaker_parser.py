import re

import markdown
from bs4 import BeautifulSoup

from markdown_to_json.data_model.speaker import Speaker
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
    Parses speaker bio (sanitized HTML), photo URL, job, and Twitter handle from the speaker bio markdown.
    The bio is considered all content before '#### metadata'.
    """
    html = markdown.markdown(speaker_bio_markdown)
    soup = BeautifulSoup(html, "html.parser")

    photo_url = ""
    # Find photo URL - it's expected to be an image tag
    img_tag = soup.find("img")
    if img_tag and "src" in img_tag.attrs:
        photo_url = img_tag["src"]
        img_tag.extract()  # Remove the image tag from the soup so it's not part of the bio

    # Remove any remaining image tags from the soup
    for img in soup.find_all("img"):
        img.extract()

    # Find #### metadata equivalent in HTML (h4 tag with "metadata" text)
    metadata_h4 = None
    for h4 in soup.find_all("h4"):
        if h4.get_text(strip=True) == "metadata":
            metadata_h4 = h4
            break

    bio_html_elements = []
    # Iterate through siblings before the metadata_h4
    current_element = soup.find(
        lambda tag: tag.name
    )  # Find the first tag in the remaining soup
    while current_element:
        if current_element == metadata_h4:
            break
        bio_html_elements.append(current_element)
        current_element = current_element.find_next_sibling()

    # bio_html = "".join(bio_html_elements).strip() # Strip any leading/trailing whitespace
    # bio_text = f"<div>{bio_html}</div>" # Wrap the bio HTML in a div
    # Wrap the collected HTML elements in a <div> tag
    bio_html = soup.new_tag("div")
    for node in bio_html_elements:
        bio_html.append(node.extract())
    bio_text = str(bio_html)

    return bio_text, photo_url
