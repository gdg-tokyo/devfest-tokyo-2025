import hashlib
import re

import markdown
from bs4 import BeautifulSoup


def _generate_hash_id(text: str) -> str:
    """Generates a 32-bit (8 hex characters) SHA-256 hash from the given text."""
    return hashlib.sha256(text.encode("utf-8")).hexdigest()[:8]


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
    return {"title": title, "description": str(description_node)}


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
