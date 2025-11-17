import os
import re
from pathlib import Path
from typing import Dict, List, Tuple

import frontmatter
from bs4 import BeautifulSoup

from markdown_to_json.data_model.session import Session
from markdown_to_json.data_model.session_chair import (
    SessionChair,
)  # Import new data models
from markdown_to_json.data_model.speaker import Speaker
from markdown_to_json.data_model.talk import Talk
from markdown_to_json.parsers.markdown_utils import markdown_to_safe_html
from markdown_to_json.parsers.parser_utils import (
    extract_slug,
    extract_title_and_description,
    generate_session_id,
    generate_talk_id,
    remove_session_chair_content,  # Import new function
    resolve_image_path,
)
from markdown_to_json.parsers.session_chair_parser import (
    parse_session_chair_from_content,
)  # Import new parser
from markdown_to_json.parsers.speaker_parser import parse_speaker_from_content


def _extract_thumbnail_url(
    content: str, file_path: str, alt_text: str
) -> str | None:
    """Extracts the thumbnail URL from markdown content and converts it to a public path."""
    match = re.search(rf"!\[{alt_text}\]\((?P<url>[^)]+)\)", content)
    if match:
        raw_url = match.group("url")
        return resolve_image_path(raw_url, file_path)
    return None


def parse_sessions_and_talks(
    docs_base_path: str,
) -> Tuple[
    List[Session], List[Talk], Dict[str, Speaker], Dict[str, SessionChair]
]:  # Add SessionChair to return type
    """Parses all session and talk markdown files and extracts data."""
    sessions_data = []
    talks_data = []
    speakers_map = {}
    session_chairs_map = {}  # New map for session chairs

    docs_prod_path = os.path.join(docs_base_path, "prod", "sessions")
    session_folders = sorted([f.name for f in os.scandir(docs_prod_path) if f.is_dir()])

    for session_folder in session_folders:
        session_folder_path = os.path.join(docs_prod_path, session_folder)
        session_id = generate_session_id(session_folder)
        session_slug = extract_slug(session_folder, "session")

        session_entry, session_chair_entry, chair_speakers_map = _parse_session(
            session_folder_path, session_id, session_slug
        )  # Modify call to _parse_session
        if session_entry:
            sessions_data.append(session_entry)
            if session_chair_entry:
                session_chairs_map[session_chair_entry.id] = session_chair_entry

        talk_files = sorted(
            [
                f.name
                for f in os.scandir(session_folder_path)
                if f.is_file() and f.name.startswith("talk-") and f.name.endswith(".md")
            ]
        )
        for talk_file in talk_files:
            talk_file_path = os.path.join(session_folder_path, talk_file)
            talk_id = generate_talk_id(session_id, talk_file)
            talk_slug = extract_slug(talk_file, "talk")

            talk_entry, speakers_data = _parse_talk(
                talk_file_path,
                talk_id,
                session_id,
                session_entry.track if session_entry else "Unknown Track",
                talk_slug,
            )

            if talk_entry:
                talks_data.append(talk_entry)
                if session_entry:
                    session_entry.talk_ids.append(talk_id)

            if speakers_data:
                for speaker in speakers_data:
                    if speaker.id not in speakers_map:
                        speakers_map[speaker.id] = speaker

    return (
        sessions_data,
        talks_data,
        speakers_map,
        session_chairs_map,
    )  # Return session_chairs_map


def _parse_session(
    session_folder_path, session_id, session_slug
) -> Tuple[Session | None, SessionChair | None, Dict[str, Speaker]]:
    """Parses a single session markdown file and returns a Session object, SessionChair object, and chair speakers."""
    session_readme_path = os.path.join(session_folder_path, "README.md")
    if not os.path.exists(session_readme_path):
        return None, None, {}

    with open(session_readme_path, "r", encoding="utf-8") as f:
        post = frontmatter.load(f)

    # First, parse session chair content from the original markdown
    session_chair_entry, chair_speakers_map = parse_session_chair_from_content(
        post.content, session_slug, session_readme_path
    )

    # Then, remove session chair content before extracting the main description
    cleaned_content = remove_session_chair_content(post.content)
    title, description_html = extract_title_and_description(cleaned_content).values()

    # Remove session_thumbnail image tag from description_html
    description_soup = BeautifulSoup(description_html, "html.parser")
    for img_tag in description_soup.find_all("img", alt="session_thumbnail"):
        img_tag.decompose()
    description_html = str(description_soup)

    thumbnail_url = _extract_thumbnail_url(
        post.content, session_readme_path, "session_thumbnail"
    )

    session_entry = Session(
        id=session_id,
        slug=session_slug,
        talk_ids=[],
        track=post.metadata.get("track", "Unknown Track"),
        time_start=post.metadata.get("time_start", "00:00"),
        time_end=post.metadata.get("time_end", "00:00"),
        title=title,
        level=post.metadata.get("level", []),
        tech_tags=post.metadata.get("tech_tags", []),
        description=description_html,
        perspective=post.metadata.get("perspective", []),
        thumbnail_url=thumbnail_url,
        session_chair_id=session_chair_entry.id if session_chair_entry else None,
    )

    return session_entry, session_chair_entry, chair_speakers_map


def _parse_talk(
    talk_file_path, talk_id, session_id, session_track, talk_slug
) -> Tuple[Talk | None, List[Speaker]]:
    """Parses a single talk markdown file and returns a Talk object and a list of Speaker objects."""
    with open(talk_file_path, "r", encoding="utf-8") as f:
        post = frontmatter.load(f)

    title, abstract_html = extract_title_and_description(post.content).values()

    # Remove all image tags from abstract_html
    abstract_soup = BeautifulSoup(abstract_html, "html.parser")
    for img_tag in abstract_soup.find_all("img"):
        img_tag.decompose()
    abstract_html = str(abstract_soup)

    speakers_data, speaker_ids = parse_speaker_from_content(
        post.content, talk_file_path
    )
    thumbnail_url = _extract_thumbnail_url(
        post.content, talk_file_path, "talk_thumbnail"
    )

    talk_entry = Talk(
        id=talk_id,
        slug=talk_slug,
        session_id=session_id,
        title=title,
        abstract=abstract_html,
        time_start=post.metadata.get("time_start", "00:00"),
        time_end=post.metadata.get("time_end", "00:00"),
        track=post.metadata.get("track", session_track),
        speaker_ids=speaker_ids,
        tech_tags=post.metadata.get("tech_tags", []),
        level=post.metadata.get("level", []),
        perspective=post.metadata.get("perspective", []),
        thumbnail_url=thumbnail_url,
    )

    return talk_entry, speakers_data
