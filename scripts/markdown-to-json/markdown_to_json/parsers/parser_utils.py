import hashlib
import re
from pathlib import Path

import markdown
from bs4 import BeautifulSoup

_REPO_ROOT_DIR = Path(__file__).parents[4].resolve()

def _generate_hash_id(text: str) -> str:
    """Generates a 32-bit (8 hex characters) SHA-256 hash from the given text."""
    return hashlib.sha256(text.encode("utf-8")).hexdigest()[:8]


def resolve_image_path(raw_url: str, file_path: str) -> str:
    """Resolves a raw image URL to a public path."""
    if raw_url.startswith("http://") or raw_url.startswith("https://"):
        return raw_url

    # If the raw_url is already root-relative, return it as is.
    if raw_url.startswith("/"):
        return raw_url

    # Path is relative to the markdown file.
    file_dir = Path(file_path).parent.resolve()

    # Check if the raw_url is trying to reference the top-level public directory
    # by going up directories and then into 'public/'
    if "public/" in raw_url and "../" in raw_url:
        # Extract the part of the path after 'public/'
        public_index = raw_url.find("public/")
        path_after_public = raw_url[public_index + len("public/"):]
        resolved_image_path = (_REPO_ROOT_DIR / "public" / path_after_public).resolve()
    else:
        resolved_image_path = (file_dir / raw_url).resolve()

    public_dir = _REPO_ROOT_DIR / "public"

    try:
        relative_to_public = resolved_image_path.relative_to(public_dir)
        return "/" + str(relative_to_public)
    except ValueError:
        # Fallback to original raw_url if it cannot be resolved to public
        return raw_url

def extract_title_and_description(markdown_content: str) -> dict:
    """
    Extracts the title (H1) and description (sanitized HTML) from markdown content.
    - Text before H1 is ignored.
    - H1 is required; a ValueError is raised if not found.
    - Description includes all HTML content after H1 and before "## Speaker", wrapped in a <div>.
    """
    html = markdown.markdown(markdown_content)
    soup = BeautifulSoup(html, "html.parser")

    # Extract title
    title = ""
    h1_tag = soup.find("h1")
    if not h1_tag:
        raise ValueError("H1 title not found in markdown content.")
    title = h1_tag.get_text(strip=True)

    # Extract description
    description_html_elements = []
    current_sibling = h1_tag.find_next_sibling()
    # Find the "## Speaker" equivalent in HTML (h2 tag with "Speaker" text)
    speaker_h2 = None
    for h2 in soup.find_all("h2"):
        if h2.get_text(strip=True) == "Speaker":
            speaker_h2 = h2
            break
    while current_sibling:
        if current_sibling == speaker_h2:
            break
        description_html_elements.append(current_sibling)
        current_sibling = current_sibling.find_next_sibling()
    # Wrap the collected HTML elements in a <div> tag
    description_node = soup.new_tag("div")
    for node in description_html_elements:
        description_node.append(node.extract())
    return {"title": title, "description": str(description_node).replace("\n", "")}


def remove_session_chair_content(markdown_content: str) -> str:
    """
    Removes the '## Session Chair Community' and '## Session Chair' sections
    and all content following them from the markdown content.
    """
    # Find the first occurrence of either "## Session Chair Community" or "## Session Chair"
    match = re.search(r"## Session Chair (Community|)", markdown_content)
    if match:
        # Return content before the match
        return markdown_content[: match.start()].strip()
    return markdown_content


def extract_slug(name: str, type: str) -> str:
    """Extracts a slug from a folder or file name based on its type."""
    if type == "session":
        match = re.match(r"^\d+-(.+)", name)
        if match:
            return match.group(1)
    elif type == "talk":
        base_name = name.replace(".md", "")
        match = re.match(r"talk-(.+)", base_name)
        if match:
            return match.group(1)
        return base_name
    return name


def generate_session_id(folder_name: str) -> str:
    """Generates a session ID from a folder name by hashing its slug."""
    session_slug = extract_slug(folder_name, "session")
    print(
        f"generate_session_id: folder_name={folder_name}, extracted_slug={session_slug}"
    )
    return hashlib.sha256(session_slug.encode("utf-8")).hexdigest()[:8]


def generate_talk_id(session_id: str, talk_file_name: str) -> str:
    """Generates a talk ID from a talk file name by hashing its slug."""
    talk_slug = extract_slug(talk_file_name, "talk")
    return _generate_hash_id(talk_slug)


def generate_speaker_id(x_handle: str | None, name: str) -> str:
    """Generates a speaker ID based on the speaker's name by hashing it."""
    return _generate_hash_id(name)
