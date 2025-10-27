from typing import List

import attrs


@attrs.define
class Talk:
    """Represents a talk within a session at the DevFest event."""

    id: str
    slug: str
    title: str
    abstract: str
    time_start: str
    time_end: str
    track: str
    speaker_ids: List[str]
    tech_tags: List[str]
    level: List[str]
    perspective: List[str]
