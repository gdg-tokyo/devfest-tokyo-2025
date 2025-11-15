import re
from typing import Dict, List, Optional, Tuple

from markdown_to_json.data_model.session_chair import (
    SessionChair,
    SessionChairCommunity,
)
from markdown_to_json.data_model.speaker import Speaker
from markdown_to_json.parsers.markdown_utils import markdown_to_safe_html
from markdown_to_json.parsers.parser_utils import (
    _generate_hash_id,
)
from markdown_to_json.parsers.speaker_parser import (
    parse_speaker_from_subheading_content,
)


def parse_session_chair_from_content(
    content: str,
    session_slug: str,
    file_path: str,
    docs_base_path: str,
) -> Tuple[Optional[SessionChair], Dict[str, Speaker]]:
    """
    Parses session chair community and individual chair information from markdown content.
    Returns a SessionChair object and a map of Speaker objects.
    """
    session_chair_community_match = re.search(
        r"## Session Chair Community\n\n### (?P<community_name>[^\n]+)\n\n(?P<community_description>[^#]+?)(?=\n\n## Session Chair|\Z)",
        content,
        re.DOTALL,
    )

    session_chair_match = re.search(
        r"## Session Chair\n\n(?P<chairs_content>.*)", content, re.DOTALL
    )

    if not session_chair_community_match and not session_chair_match:
        return None, {}

    community_name: Optional[str] = None
    community_description: Optional[str] = None
    community_url: Optional[str] = None
    community_logo_url: Optional[str] = None

    if session_chair_community_match:
        community_name = session_chair_community_match.group("community_name").strip()
        community_description_raw = session_chair_community_match.group(
            "community_description"
        ).strip()

        # Extract logo first
        logo_match = re.search(
            r"!\[community_logo\]\((?P<logo_url>[^)]+)\)", community_description_raw
        )
        if logo_match:
            community_logo_url = logo_match.group("logo_url")
            community_description_raw = re.sub(
                r"!\[community_logo\]\([^)]+\)", "", community_description_raw
            ).strip()

        # Then extract URL
        url_match = re.search(r"https?://[^\s/$.?#].[^\s]*", community_description_raw)
        if url_match:
            community_url = url_match.group(0)
            community_description_raw = community_description_raw.replace(
                community_url, ""
            ).strip()

        community_description = markdown_to_safe_html(community_description_raw)

    chairs_content: str = (
        session_chair_match.group("chairs_content").strip()
        if session_chair_match
        else ""
    )

    chair_speakers: List[Speaker] = []
    all_parsed_speakers: Dict[str, Speaker] = {}

    # Split chairs_content by "### " to get individual speaker sections
    speaker_sections = re.split(r"(?=### [^\n]+)", chairs_content)
    speaker_sections = [s.strip() for s in speaker_sections if s.strip()]

    for section in speaker_sections:
        speakers_data, _ = parse_speaker_from_subheading_content(
            section, file_path, docs_base_path
        )
        if speakers_data:
            chair_speakers.extend(speakers_data)
            for speaker in speakers_data:
                all_parsed_speakers[speaker.id] = speaker

    # The logic for returning None, {} should be based on whether a SessionChair can be meaningfully created.
    # If there's no community name and no chair speakers, then it's truly empty.
    if not community_name and not chair_speakers:
        return None, {}

    # Create SessionChairCommunity only if a name was found
    session_chair_community_obj: Optional[SessionChairCommunity] = None
    if community_name:
        session_chair_community_obj = SessionChairCommunity(
            name=community_name,
            description=community_description if community_description else "",
            url=community_url,
            logo_url=community_logo_url,
        )

    # New ID generation logic
    session_chair_slug = f"{session_slug}-chair"
    session_chair_id = _generate_hash_id(session_chair_slug)

    session_chair = SessionChair(
        id=session_chair_id,
        community=session_chair_community_obj,
        chairs=chair_speakers,
    )

    return session_chair, all_parsed_speakers
