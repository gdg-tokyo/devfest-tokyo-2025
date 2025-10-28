import json
import os

from click.testing import CliRunner

from markdown_to_json.bin.parse_content import main


def test_main_creates_json_files(setup_test_data):
    base_path = setup_test_data
    docs_base_path = os.path.join(base_path, "docs", "web")
    output_base_path = os.path.join(base_path, "src", "data")

    runner = CliRunner()
    result = runner.invoke(
        main,
        [
            "--docs-base-path",
            docs_base_path,
            "--output-base-path",
            output_base_path,
        ],
    )

    assert result.exit_code == 0
    assert "Content parsing complete" in result.output

    sessions_json_path = os.path.join(output_base_path, "prod", "sessions.json")
    talks_json_path = os.path.join(output_base_path, "prod", "talks.json")
    speakers_json_path = os.path.join(output_base_path, "prod", "speakers.json")

    assert os.path.exists(sessions_json_path)
    assert os.path.exists(talks_json_path)
    assert os.path.exists(speakers_json_path)

    with open(sessions_json_path, "r") as f:
        sessions = json.load(f)
    assert len(sessions) == 2

    with open(talks_json_path, "r") as f:
        talks = json.load(f)
    assert len(talks) == 4

    with open(speakers_json_path, "r") as f:
        speakers = json.load(f)
    assert len(speakers) == 3
