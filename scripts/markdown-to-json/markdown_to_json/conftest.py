import pytest

DUMMY_SESSION_MARKDOWN_TEXT = """
---
track: "A"
time_start: "09:00"
time_end: "10:00"
level: ["Beginner", "Intermediate"]
tech_tags: ["AI", "Cloud"]
perspective: ["Introduction"]
---
# Keynote Session

This is the description for the keynote session.
"""

DUMMY_TALK_MARKDOWN_TEXT = """
---
time_start: "09:05"
time_end: "09:45"
track: "A"
tech_tags: ["AI", "Machine Learning"]
level: "Advanced"
perspective: "Challenge"
---
# The Future of AI

This talk will explore the exciting future of Artificial Intelligence.

## Speaker

### Jane Doe (@janedoe) / Google AI Lead

Jane Doe is a leading expert in AI at Google.

#### metadata
- job: Google AI Lead
- twitter_handle: janedoe
"""

DUMMY_SESSION_2_MARKDOWN_TEXT = """
---
track: "B"
time_start: "10:00"
time_end: "11:00"
level: ["Intermediate"]
tech_tags: ["Web", "Performance"]
perspective: ["Experience"]
---
# Deep Dive into Web Performance

A session about web performance.
"""

DUMMY_TALK_2_MARKDOWN_TEXT = """
---
time_start: "10:05"
time_end: "10:45"
track: "B"
tech_tags: ["Web Vitals"]
level: "Intermediate"
perspective: "Experience"
---
# Core Web Vitals in Practice

Practical tips for improving Core Web Vitals.

## Speaker

### John Smith (@john_smith) / Web Perf Guru

John is a web performance enthusiast.

#### metadata
- job: Web Perf Guru
- twitter_handle: john_smith
"""

DUMMY_TALK_3_MARKDOWN_TEXT = """
---
time_start: "11:00"
time_end: "11:45"
track: "A"
tech_tags: ["Go"]
level: "Beginner"
perspective: "Introduction"
---
# Getting Started with Go

An introductory talk on the Go programming language.

## Speaker

### Bob Williams (@bob_williams) / Go Developer

Bob loves Go.

#### metadata
- job: Go Developer
- twitter_handle: bob_williams
"""

DUMMY_TALK_4_MARKDOWN_TEXT = """
---
time_start: "11:00"
time_end: "11:45"
track: "B"
tech_tags: ["AI", "Ethics"]
level: "Advanced"
perspective: "Challenge"
---
# AI Ethics

A talk about the ethical implications of AI.

## Speaker

### Jane Doe (@janedoe) / Google AI Lead

Jane Doe is a leading expert in AI at Google.

#### metadata
- job: Google AI Lead
- twitter_handle: janedoe
"""


@pytest.fixture
def setup_test_data(tmp_path):
    # Create a temporary directory for input Markdown files
    input_dir = tmp_path / "docs" / "web" / "prod" / "sessions"
    input_dir.mkdir(parents=True)

    # --- Session 01-keynote ---
    session1_dir = input_dir / "01-keynote"
    session1_dir.mkdir()
    (session1_dir / "README.md").write_text(DUMMY_SESSION_MARKDOWN_TEXT)
    (session1_dir / "talk-1.md").write_text(DUMMY_TALK_MARKDOWN_TEXT)
    (session1_dir / "talk-2.md").write_text(DUMMY_TALK_2_MARKDOWN_TEXT)

    # --- Session 02-deep-dive ---
    session2_dir = input_dir / "02-deep-dive"
    session2_dir.mkdir()
    (session2_dir / "README.md").write_text(DUMMY_SESSION_2_MARKDOWN_TEXT)
    (session2_dir / "talk-3.md").write_text(DUMMY_TALK_3_MARKDOWN_TEXT)
    (session2_dir / "talk-4.md").write_text(DUMMY_TALK_4_MARKDOWN_TEXT)

    yield str(tmp_path)
