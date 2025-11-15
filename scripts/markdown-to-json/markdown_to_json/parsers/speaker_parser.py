import re
from typing import List, Tuple

import markdown
from bs4 import BeautifulSoup, NavigableString

from markdown_to_json.data_model.speaker import Speaker
from markdown_to_json.parsers.parser_utils import (
    generate_speaker_id,
    resolve_image_path,
)


def parse_speaker_from_content(
    content: str, file_path: str, docs_base_path: str
) -> Tuple[List[Speaker], List[str]]:
    """Parses multiple speaker information from markdown content by converting it to HTML."""
    html = markdown.markdown(content)
    soup = BeautifulSoup(html, "html.parser")

    speakers_data = []
    speaker_ids = []

    speaker_h2 = soup.find("h2", string="Speaker")
    if not speaker_h2:
        return [], []

    for sibling in speaker_h2.find_next_siblings():
        if sibling.name == "h3":
            speaker_heading = sibling.get_text(strip=True)
            speaker_name, final_twitter_handle, final_job = _parse_speaker_heading(
                speaker_heading
            )

            bio_elements = []
            photo_url = ""
            for bio_sibling in sibling.find_next_siblings():
                if bio_sibling.name == "h3":
                    break

                img_tag = bio_sibling.find("img", alt="speaker")
                if bio_sibling.name == "p" and img_tag:
                    raw_photo_url = img_tag.get("src", "")
                    photo_url = resolve_image_path(raw_photo_url, file_path)
                else:
                    bio_elements.append(str(bio_sibling))

            bio_html = f"<div>{''.join(bio_elements)}</div>"

            # Remove all image tags from bio_html
            bio_soup = BeautifulSoup(bio_html, "html.parser")
            for img_tag in bio_soup.find_all("img"):
                img_tag.decompose()
            bio_html = str(bio_soup)

            speaker_id = generate_speaker_id(final_twitter_handle, speaker_name)

            speaker = Speaker(
                id=speaker_id,
                name=speaker_name,
                bio=bio_html,
                photo_url=photo_url,
                job=final_job if final_job else "",
                twitter_handle=final_twitter_handle if final_twitter_handle else "",
            )
            speakers_data.append(speaker)
            speaker_ids.append(speaker_id)

    return speakers_data, speaker_ids


def parse_speaker_from_subheading_content(
    content: str, file_path: str, docs_base_path: str
) -> Tuple[List[Speaker], List[str]]:
    """
    Parses speaker information from markdown content where the speaker section
    starts with a subheading (e.g., '### Speaker Name').
    Returns a list containing a single speaker.
    """
    html = markdown.markdown(content)
    soup = BeautifulSoup(html, "html.parser")

    speakers_data = []
    speaker_ids = []

    h3_tag = soup.find("h3")
    if not h3_tag:
        return [], []

    speaker_heading = h3_tag.get_text(strip=True)
    speaker_name, final_twitter_handle, final_job = _parse_speaker_heading(
        speaker_heading
    )

    bio_elements = []
    photo_url = ""
    for bio_sibling in h3_tag.find_next_siblings():
        if bio_sibling.name == "h3":
            break

        img_tag = bio_sibling.find("img", alt="speaker")
        if bio_sibling.name == "p" and img_tag:
            raw_photo_url = img_tag.get("src", "")
            photo_url = resolve_image_path(raw_photo_url, file_path)
        else:
            bio_elements.append(str(bio_sibling))

    bio_html = f"<div>{''.join(bio_elements)}</div>"

    # Remove all image tags from bio_html
    bio_soup = BeautifulSoup(bio_html, "html.parser")
    for img_tag in bio_soup.find_all("img"):
        img_tag.decompose()
    bio_html = str(bio_soup)

    speaker_id = generate_speaker_id(final_twitter_handle, speaker_name)

    speaker = Speaker(
        id=speaker_id,
        name=speaker_name,
        bio=bio_html,
        photo_url=photo_url,
        job=final_job if final_job else "",
        twitter_handle=final_twitter_handle if final_twitter_handle else "",
    )
    speakers_data.append(speaker)
    speaker_ids.append(speaker_id)

    return speakers_data, speaker_ids


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
        # Replace escaped underscores with regular underscores
        twitter_handle = twitter_handle.replace(r"\_", "_")
        speaker_name = speaker_name.replace(x_handle_match.group(0), "").strip()

    job_match = re.search(r"/\s*(.+)", speaker_name)
    if job_match:
        job = job_match.group(1).strip()
        speaker_name = speaker_name.replace(job_match.group(0), "").strip()

    speaker_name = speaker_name.replace("さん", "").strip()

    return speaker_name, twitter_handle, job
