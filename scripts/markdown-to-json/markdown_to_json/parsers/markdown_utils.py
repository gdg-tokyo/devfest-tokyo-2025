import markdown
import bleach
import re

def markdown_to_safe_html(md_text: str, keep_img_tag: bool = False) -> str:
    # Convert Markdown to HTML
    html = markdown.markdown(
        md_text,
        extensions=[
            "extra",       # Tables, lists, etc.
            "fenced_code", # ```code``` block support
            "codehilite",  # For syntax highlighting (optional)
            "sane_lists",  # Improved list syntax
        ],
        output_format="html5"
    )

    # Explicitly specify allowed tags and attributes
    allowed_tags = [
        "p", "ul", "ol", "li", "a", "pre", "code", "table",
        "thead", "tbody", "tr", "th", "td", "strong", "em", "blockquote"
    ]
    if keep_img_tag:
        allowed_tags.append("img")

    allowed_attrs = {
        "a": ["href", "title"],
        "img": ["src", "alt", "title", "width", "height"],
        "code": ["class"],  # Allow classes added by codehilite
    }

    # Sanitize safely with bleach
    safe_html = bleach.clean(
        html,
        tags=allowed_tags,
        attributes=allowed_attrs,
        strip=True  # Remove disallowed tags
    ).replace('\n', '')
    
    # Remove empty paragraph tags
    safe_html = re.sub(r'<p>\s*</p>', '', safe_html)

    return f"<div>{safe_html}</div>"
