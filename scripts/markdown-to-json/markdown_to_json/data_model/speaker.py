import attrs


@attrs.define
class Speaker:
    """Represents a speaker at the DevFest event."""

    id: str
    name: str
    bio: str
    photo_url: str
    job: str
    twitter_handle: str
