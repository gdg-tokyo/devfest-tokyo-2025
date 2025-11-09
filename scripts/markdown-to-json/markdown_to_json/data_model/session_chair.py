import attrs
from typing import List, Optional

from .speaker import Speaker


@attrs.define
class SessionChairCommunity:
    """Represents the community associated with a session chair."""

    name: str
    description: str
    url: Optional[str] = None
    logo_url: Optional[str] = None


@attrs.define
class SessionChair:
    """Represents a session chair, including community and individual chairs."""

    id: str
    community: Optional[SessionChairCommunity] = None
    chairs: List[Speaker] = attrs.field(factory=list)
