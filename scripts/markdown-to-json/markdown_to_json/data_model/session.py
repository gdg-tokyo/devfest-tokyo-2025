from typing import List

import attrs


@attrs.define
class Session:
    """Represents a session at the DevFest event."""

    id: str
    slug: str
    talk_ids: List[str]
    track: str
    time_start: str
    time_end: str
    title: str
    level: List[str]
    tech_tags: List[str]
    description: str
    perspective: List[str]
