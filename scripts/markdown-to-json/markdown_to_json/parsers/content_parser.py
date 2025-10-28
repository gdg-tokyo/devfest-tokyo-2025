import os
from typing import Dict, List, Tuple

import frontmatter

from markdown_to_json.data_model.session import Session
from markdown_to_json.data_model.speaker import Speaker
from markdown_to_json.data_model.talk import Talk
from markdown_to_json.parsers.parser_utils import (
    extract_title_and_description,
    generate_session_id,
    generate_talk_id,
    extract_slug,
)
from markdown_to_json.parsers.speaker_parser import parse_speaker_from_content


def parse_sessions_and_talks(
    docs_base_path: str,
) -> Tuple[List[Session], List[Talk], Dict[str, Speaker]]:
    """Parses all session and talk markdown files and extracts data."""
    sessions_data = []
    talks_data = []
    speakers_map = {}

    docs_prod_path = os.path.join(docs_base_path, "prod", "sessions")
    session_folders = sorted([f.name for f in os.scandir(docs_prod_path) if f.is_dir()])

    for session_folder in session_folders:
        session_folder_path = os.path.join(docs_prod_path, session_folder)
        session_id = generate_session_id(session_folder)
        session_slug = extract_slug(session_folder, "session")

        session_entry = _parse_session(session_folder_path, session_id, session_slug)
        if session_entry:
            sessions_data.append(session_entry)

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

            talk_entry, speaker_data = _parse_talk(
                talk_file_path,
                talk_id,
                session_entry.track if session_entry else "Unknown Track",
                talk_slug,
            )

            if talk_entry:
                talks_data.append(talk_entry)
                if session_entry:
                    session_entry.talk_ids.append(talk_id)

            if speaker_data and speaker_data.id not in speakers_map:
                speakers_map[speaker_data.id] = speaker_data

    return sessions_data, talks_data, speakers_map


def _parse_session(session_folder_path, session_id, session_slug) -> Session | None:
    """Parses a single session markdown file and returns a Session object."""
    session_readme_path = os.path.join(session_folder_path, "README.md")
    if not os.path.exists(session_readme_path):
        return None

    with open(session_readme_path, "r", encoding="utf-8") as f:
        post = frontmatter.load(f)

    title, description = extract_title_and_description(post.content).values()

    return Session(
        id=session_id,
        slug=session_slug,
        talk_ids=[],
        track=post.metadata.get("track", "Unknown Track"),
        time_start=post.metadata.get("time_start", "00:00"),
        time_end=post.metadata.get("time_end", "00:00"),
        title=title,
        level=post.metadata.get("level", []),
        tech_tags=post.metadata.get("tech_tags", []),
        description=description,
        perspective=post.metadata.get("perspective", []),
    )


def _parse_talk(
    talk_file_path, talk_id, session_track, talk_slug
) -> Tuple[Talk | None, Speaker | None]:
    """Parses a single talk markdown file and returns a Talk object and Speaker object."""
    with open(talk_file_path, "r", encoding="utf-8") as f:
        post = frontmatter.load(f)

    title, abstract = extract_title_and_description(post.content).values()

    speaker_data, speaker_ids = parse_speaker_from_content(post.content)

    talk_entry = Talk(
        id=talk_id,
        slug=talk_slug,
        title=title,
        abstract=abstract,
        time_start=post.metadata.get("time_start", "00:00"),
        time_end=post.metadata.get("time_end", "00:00"),
        track=post.metadata.get("track", session_track),
        speaker_ids=speaker_ids,
        tech_tags=post.metadata.get("tech_tags", []),
        level=post.metadata.get("level", []),
        perspective=post.metadata.get("perspective", []),
    )

    return talk_entry, speaker_data
