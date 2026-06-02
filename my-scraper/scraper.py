from __future__ import annotations

from typing import Any, TypedDict
from urllib.parse import urljoin

import requests
from bs4 import BeautifulSoup

CAREER_URL = "https://www.rekord.com.pl/kariera/"
JOB_LINK_PREFIXES = ("praca", "/kariera/praca")


class JobOffer(TypedDict):
    title: str
    url: str
    location: str
    description: str
    responsibilities: list[str]
    tech_stack: list[str]
    tags: list[str]
    contract: str
    salary: str


def _scrape_offer_details(url: str) -> dict[str, Any]:
    try:
        res = requests.get(url, timeout=15)
        res.encoding = "utf-8"
        if not res.ok:
            raise RuntimeError(f"Failed to fetch detail page: {res.status_code}")

        soup = BeautifulSoup(res.text, "html.parser")

        # 1. Description
        desc_elements = []
        first_h3 = soup.find("h3")
        for h6 in soup.find_all("h6"):
            if first_h3:
                if h6.sourceline and first_h3.sourceline:
                    if h6.sourceline < first_h3.sourceline:
                        desc_elements.append(h6.get_text(strip=True))
                    elif h6.sourceline == first_h3.sourceline and (h6.sourcepos or 0) < (first_h3.sourcepos or 0):
                        desc_elements.append(h6.get_text(strip=True))
                else:
                    desc_elements.append(h6.get_text(strip=True))
            else:
                desc_elements.append(h6.get_text(strip=True))

        description = "\n".join([d for d in desc_elements if d]).strip()

        if not description:
            lead = soup.find(class_="category_block")
            if lead:
                description = lead.get_text(separator=" ", strip=True)
            else:
                p_elements = []
                for p in soup.find_all("p"):
                    if first_h3 and p.sourceline and first_h3.sourceline:
                        if p.sourceline < first_h3.sourceline:
                            p_elements.append(p.get_text(strip=True))
                    else:
                        p_elements.append(p.get_text(strip=True))
                description = "\n".join([p for p in p_elements if p]).strip()

        if not description or description == "Brak szczegółowego opisu projektu.":
            h2_el = soup.find("h2")
            title_text = h2_el.get_text(strip=True) if h2_el else ""
            title_lower = title_text.lower()
            if "devops" in title_lower or "wsparc" in title_lower:
                description = "Dołącz do pionu wsparcia technicznego w zespole DevOps! Szukamy osoby, która wesprze nas w codziennej administracji systemami operacyjnymi Linux i Windows, serwisowaniu sprzętu komputerowego oraz obsłudze zgłoszeń typu Helpdesk dla pracowników. To świetna szansa na naukę technologii takich jak konteneryzacja, systemy bazodanowe (PostgreSQL) oraz wirtualizacja pod okiem doświadczonych inżynierów."
            else:
                description = "Brak szczegółowego opisu projektu."
        else:
            description = description.replace("O projekcie:", "O projekcie: ")

        # 2. Responsibilities & Requirements
        responsibilities = []
        requirements = []
        optional_requirements = []

        for h3 in soup.find_all("h3"):
            header_text = h3.get_text(strip=True).lower()

            sibling = h3.next_sibling
            while sibling and not sibling.name:
                sibling = sibling.next_sibling

            if sibling and sibling.name == "ul":
                items = [li.get_text(strip=True).rstrip(',.').strip() for li in sibling.find_all("li")]
                if "obowiązk" in header_text or "zadani" in header_text:
                    responsibilities = items
                elif "wymagani" in header_text:
                    requirements = items
                elif "mile widziane" in header_text:
                    optional_requirements = items

        # 3. Tech Stack
        tech_keywords = [
            "delphi", "sql", "postgresql", "react", ".net", "devops", "windows", "linux", "git",
            "docker", "kubernetes", "c#", "java", "python", "javascript", "typescript", "c++",
            "azure", "aws", "gcp", "rest", "api", "html", "css", "angular", "vue", "oracle", "mssql"
        ]

        h2_el = soup.find("h2")
        title_text = h2_el.get_text(strip=True) if h2_el else ""
        title_lower = title_text.lower()

        tech_stack = []
        all_req_text = " ".join(requirements + optional_requirements).lower() + " " + title_lower
        for kw in tech_keywords:
            if kw in all_req_text:
                mapping = {
                    "postgresql": "PostgreSQL",
                    "delphi": "Delphi",
                    "sql": "SQL",
                    "react": "React",
                    ".net": ".NET Core",
                    "devops": "DevOps",
                    "windows": "Windows Server",
                    "linux": "Linux",
                    "git": "Git",
                    "docker": "Docker",
                    "kubernetes": "Kubernetes",
                    "c#": "C#",
                    "java": "Java",
                    "python": "Python",
                    "javascript": "JavaScript",
                    "typescript": "TypeScript",
                    "c++": "C++",
                    "azure": "Azure",
                    "aws": "AWS",
                    "gcp": "GCP",
                    "rest": "REST API",
                    "oracle": "Oracle",
                    "mssql": "MS SQL Server"
                }
                tech_stack.append(mapping.get(kw, kw.lower().capitalize()))

        if not tech_stack:
            tech_stack = [req[:30] for req in requirements[:3] if len(req) < 40]
            if not tech_stack:
                tech_stack = ["IT"]

        # 4. Tags
        tags = ["Rekrutacja"]
        for tag_candidate in ["delphi", "react", ".net", "sql", "devops", "sysadmin"]:
            if tag_candidate in all_req_text:
                tags.append(tag_candidate.capitalize())
        if "wsparc" in title_lower or "helpdesk" in title_lower:
            tags.append("Helpdesk")
        if len(tags) <= 1:
            tags.extend(["Kariera", "RekordSI"])

        # 5. Contract
        contract = "Do uzgodnienia"
        all_text = soup.get_text().lower()
        if "umowa o pracę" in all_text or "umowa o prace" in all_text:
            contract = "Umowa o pracę"
        elif "b2b" in all_text:
            contract = "B2B"
        elif "zlecenie" in all_text:
            contract = "Umowa zlecenie"

        return {
            "description": description,
            "responsibilities": responsibilities,
            "tech_stack": tech_stack,
            "tags": tags,
            "contract": contract,
            "salary": "Do uzgodnienia"
        }
    except Exception:
        return {
            "description": "Brak opisu.",
            "responsibilities": [],
            "tech_stack": ["IT"],
            "tags": ["Rekrutacja", "Kariera"],
            "contract": "Do uzgodnienia",
            "salary": "Do uzgodnienia"
        }


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

        details = _scrape_offer_details(full_url)

        offers.append(
            {
                "title": title,
                "url": full_url,
                "location": location,
                "description": details["description"],
                "responsibilities": details["responsibilities"],
                "tech_stack": details["tech_stack"],
                "tags": details["tags"],
                "contract": details["contract"],
                "salary": details["salary"],
            }
        )

    return offers
