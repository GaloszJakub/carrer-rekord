from __future__ import annotations

from typing import TypedDict
from urllib.parse import urljoin

import requests
from bs4 import BeautifulSoup, Tag

CAREER_URL = "https://www.rekord.com.pl/kariera/"
JOB_LINK_PREFIX = "/kariera/praca"


class JobOffer(TypedDict):
    title: str
    url: str
    location: str


def _extract_location(link: Tag) -> str:
    next_text = link.next_sibling
    if next_text is None:
        return ""
    location = str(next_text).strip(" \t\r\n-")
    return location


def scrape_job_offers() -> list[JobOffer]:
    response = requests.get(CAREER_URL, timeout=20)
    response.raise_for_status()

    soup = BeautifulSoup(response.text, "html.parser")
    offers: list[JobOffer] = []
    seen_urls: set[str] = set()

    for link in soup.find_all("a", href=True):
        href = str(link["href"]).strip()
        if not href.startswith(JOB_LINK_PREFIX):
            continue
        if not href.endswith(".html"):
            continue

        full_url = urljoin(CAREER_URL, href)
        if full_url in seen_urls:
            continue
        seen_urls.add(full_url)

        title = link.get_text(strip=True)
        location = _extract_location(link)
        offers.append(
            {
                "title": title,
                "url": full_url,
                "location": location,
            }
        )

    return offers
