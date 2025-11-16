import pytest
import hashlib

from markdown_to_json.parsers.session_chair_parser import (
    parse_session_chair_from_content,
)


@pytest.fixture
def sample_session_chair_content():
    return """
## Session Chair Community

### MLOpsコミュニティ

機械学習/AI/LLM技術を実用化する方法の理解を深める技術コミュニティです。毎月MLOpsに関する勉強会を開催しています！

https://mlops.connpass.com/

![community_logo](https://pbs.twimg.com/profile_images/1370267966298681347/sBjkDhjQ.jpg)

## Session Chair

### 澁井雄介 さん / 株式会社LayerX R&Dデータ検索基盤チームマネージャー

MLOps、データ、インフラ、バックエンド、リサーチエンジニア、テックセールス、ネコ2匹の飼い主。本業のLayerXでは生成AIの実用化を中心に、R&Dとデータ検索基盤チームのマネージャーをしています。著書『機械学習システムデザインパターン』、『機械学習システム構築実践ガイド』、共著『事例でわかるMLOps』。

![speaker](https://storage.googleapis.com/studio-cms-assets/projects/4BqNgv7Lar/s-330x334_webp_8a73d10e-5dda-4409-aa56-7ad09ac32e45.webp)
"""


@pytest.fixture
def sample_session_chair_content_no_community_url_logo():
    return """
## Session Chair Community

### Test Community

This is a test community description.

## Session Chair

### Test Speaker さん / Test Job

Test Speaker Bio.
"""


@pytest.fixture
def sample_session_chair_content_no_community():
    return """
## Session Chair

### Test Speaker さん / Test Job

Test Speaker Bio.
"""


@pytest.fixture
def sample_session_chair_content_no_chair():
    return """
## Session Chair Community

### Test Community

This is a test community description.
"""


def test_parse_session_chair_from_content_full(sample_session_chair_content):
    session_slug = "test-session-id"
    session_chair, speakers_map = parse_session_chair_from_content(
        sample_session_chair_content, session_slug, "dummy/path/file.md"
    )

    expected_session_chair_id = hashlib.sha256(
        f"{session_slug}-chair".encode("utf-8")
    ).hexdigest()[:8]

    assert session_chair is not None
    assert session_chair.id == expected_session_chair_id
    assert session_chair.community is not None
    assert session_chair.community.name == "MLOpsコミュニティ"
    assert (
        "機械学習/AI/LLM技術を実用化する方法の理解を深める技術コミュニティです。毎月MLOpsに関する勉強会を開催しています！"
        in session_chair.community.description
    )
    assert session_chair.community.url == "https://mlops.connpass.com/"
    assert (
        session_chair.community.logo_url
        == "https://pbs.twimg.com/profile_images/1370267966298681347/sBjkDhjQ.jpg"
    )
    assert len(session_chair.chairs) == 1
    assert session_chair.chairs[0].name == "澁井雄介"
    assert (
        session_chair.chairs[0].job
        == "株式会社LayerX R&Dデータ検索基盤チームマネージャー"
    )
    assert len(speakers_map) == 1
    expected_speaker_id = "f8ac9233"  # Corrected hash for 澁井雄介
    assert expected_speaker_id in speakers_map


def test_parse_session_chair_from_content_no_community_url_logo(
    sample_session_chair_content_no_community_url_logo,
):
    session_slug = "test-session-id-2"
    session_chair, speakers_map = parse_session_chair_from_content(
        sample_session_chair_content_no_community_url_logo,
        session_slug,
        "dummy/path/file.md",
    )

    expected_session_chair_id = hashlib.sha256(
        f"{session_slug}-chair".encode("utf-8")
    ).hexdigest()[:8]

    assert session_chair is not None
    assert session_chair.id == expected_session_chair_id
    assert session_chair.community is not None
    assert session_chair.community.name == "Test Community"
    assert (
        session_chair.community.description
        == "<div><p>This is a test community description.</p></div>"
    )
    assert session_chair.community.url is None
    assert session_chair.community.logo_url is None
    assert len(session_chair.chairs) == 1
    assert session_chair.chairs[0].name == "Test Speaker"
    assert session_chair.chairs[0].job == "Test Job"
    assert len(speakers_map) == 1


def test_parse_session_chair_from_content_no_community(
    sample_session_chair_content_no_community,
):
    session_slug = "test-session-id-3"
    session_chair, speakers_map = parse_session_chair_from_content(
        sample_session_chair_content_no_community,
        session_slug,
        "dummy/path/file.md",
    )

    expected_session_chair_id = hashlib.sha256(
        f"{session_slug}-chair".encode("utf-8")
    ).hexdigest()[:8]

    assert session_chair is not None
    assert session_chair.id == expected_session_chair_id
    assert session_chair.community is None  # Expect community to be None
    assert len(session_chair.chairs) == 1
    assert session_chair.chairs[0].name == "Test Speaker"
    assert session_chair.chairs[0].job == "Test Job"
    assert len(speakers_map) == 1


def test_parse_session_chair_from_content_no_chair(
    sample_session_chair_content_no_chair,
):
    session_slug = "test-session-id-4"
    session_chair, speakers_map = parse_session_chair_from_content(
        sample_session_chair_content_no_chair,
        session_slug,
        "dummy/path/file.md",
    )

    expected_session_chair_id = hashlib.sha256(
        f"{session_slug}-chair".encode("utf-8")
    ).hexdigest()[:8]

    assert session_chair is not None  # Expect a SessionChair object
    assert session_chair.id == expected_session_chair_id
    assert session_chair.community is not None
    assert session_chair.community.name == "Test Community"
    assert len(session_chair.chairs) == 0  # Expect chairs to be empty list
    assert not speakers_map  # No speakers should be added if no chairs parsed


def test_parse_session_chair_from_content_empty():
    session_slug = "test-session-id-5"
    session_chair, speakers_map = parse_session_chair_from_content(
        "Some random content", session_slug, "dummy/path/file.md"
    )

    assert session_chair is None
    assert not speakers_map
