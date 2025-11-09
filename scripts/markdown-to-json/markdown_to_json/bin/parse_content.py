import json
import os
from typing import List

import cattrs
import click

from markdown_to_json.data_model.session import Session
from markdown_to_json.data_model.session_chair import SessionChair
from markdown_to_json.data_model.speaker import Speaker
from markdown_to_json.data_model.talk import Talk
from markdown_to_json.parsers.content_parser import parse_sessions_and_talks


@click.command()
@click.option(
    "--docs-base-path", default="docs/web", help="Path to the docs directory."
)
@click.option(
    "--output-base-path", default="src/data", help="Path to the output data directory."
)
def main(docs_base_path: str, output_base_path: str):
    """Parses markdown content and generates JSON data for sessions, talks, and speakers."""
    sessions_data, talks_data, speakers_map, session_chairs_map = (
        parse_sessions_and_talks(docs_base_path)
    )  # Receive session_chairs_map

    speakers_data = list(speakers_map.values())
    session_chairs_data = list(session_chairs_map.values())  # Convert map to list

    _write_output_files(
        output_base_path, sessions_data, talks_data, speakers_data, session_chairs_data
    )  # Pass session_chairs_data
    print("Content parsing complete and JSON files generated successfully.")


def _write_output_files(
    output_base_path: str,
    sessions_data: List[Session],
    talks_data: List[Talk],
    speakers_data: List[Speaker],
    session_chairs_data: List[SessionChair],  # Add session_chairs_data parameter
):
    """Writes the parsed session, talk, and speaker data to JSON files."""
    output_dir = os.path.join(output_base_path, "prod")
    os.makedirs(output_dir, exist_ok=True)

    converter = cattrs.Converter()

    with open(os.path.join(output_dir, "sessions.json"), "w", encoding="utf-8") as f:
        json.dump(converter.unstructure(sessions_data), f, indent=2, ensure_ascii=False)
    with open(os.path.join(output_dir, "talks.json"), "w", encoding="utf-8") as f:
        json.dump(converter.unstructure(talks_data), f, indent=2, ensure_ascii=False)
    with open(os.path.join(output_dir, "speakers.json"), "w", encoding="utf-8") as f:
        json.dump(converter.unstructure(speakers_data), f, indent=2, ensure_ascii=False)
    with open(
        os.path.join(output_dir, "session-chairs.json"), "w", encoding="utf-8"
    ) as f:  # Write session-chairs.json
        json.dump(
            converter.unstructure(session_chairs_data), f, indent=2, ensure_ascii=False
        )


if __name__ == "__main__":
    main()
