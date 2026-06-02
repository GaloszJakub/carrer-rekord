from __future__ import annotations

from typing import TypedDict
from urllib.parse import urljoin

import requests
from bs4 import BeautifulSoup

CAREER_URL = "https://www.rekord.com.pl/kariera/"
JOB_LINK_PREFIXES = ("praca", "/kariera/praca")


class JobOffer(TypedDict):
    title: str
    url: str
    location: str


def scrape_job_offers() -> list[JobOffer]:
    response = requests.get(CAREER_URL, timeout=20)
    response.raise_for_status()

    soup = BeautifulSoup(response.text, "html.parser")
    offers: list[JobOffer] = []
    seen_urls: set[str] = set()

    for link in soup.find_all("a", href=True):
        href = str(link["href"]).strip()
        if not any(href.startswith(pfx) for pfx in JOB_LINK_PREFIXES):
            continue
        if not href.endswith(".html"):
            continue

        full_url = urljoin(CAREER_URL, href)
        if full_url in seen_urls:
            continue
        seen_urls.add(full_url)

        h5_tag = link.find("h5")
        title = h5_tag.get_text(strip=True) if h5_tag else link.get_text(strip=True)

        p_tag = link.find("p")
        location = p_tag.get_text(strip=True) if p_tag else ""

        offers.append(
            {
                "title": title,
                "url": full_url,
                "location": location,
            }
        )

    return offers
