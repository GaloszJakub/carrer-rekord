from __future__ import annotations

import os
from datetime import UTC, datetime
from typing import Any

from fastapi import FastAPI, Header, HTTPException
from supabase import Client, create_client

from scraper import JobOffer, scrape_job_offers

app = FastAPI(title="Rekord Career Scraper")


# SQL schema to run manually in Supabase:
# CREATE TABLE job_offers (
#   id uuid primary key default gen_random_uuid(),
#   title text not null,
#   url text unique not null,
#   location text,
#   scraped_at timestamptz default now(),
#   is_active boolean default true
# );


def _required_env(name: str) -> str:
    value = os.environ.get(name)
    if not value:
        raise RuntimeError(f"Missing required environment variable: {name}")
    return value


def _get_supabase() -> Client:
    return create_client(
        _required_env("SUPABASE_URL"),
        _required_env("SUPABASE_SERVICE_KEY"),
    )


@app.api_route("/api/scrape", methods=["GET", "POST"])
def scrape_and_sync(
    x_scrape_key: str | None = Header(default=None, alias="X-Scrape-Key"),
    authorization: str | None = Header(default=None, alias="Authorization"),
) -> dict[str, Any]:
    scrape_secret = os.environ.get("SCRAPE_SECRET")
    cron_secret = os.environ.get("CRON_SECRET")

    if not scrape_secret and not cron_secret:
        raise HTTPException(
            status_code=500,
            detail="Missing environment variables: SCRAPE_SECRET or CRON_SECRET must be set",
        )

    is_authorized = False
    if scrape_secret and x_scrape_key == scrape_secret:
        is_authorized = True
    elif cron_secret and authorization == f"Bearer {cron_secret}":
        is_authorized = True

    if not is_authorized:
        raise HTTPException(status_code=401, detail="Unauthorized")

    try:
        offers: list[JobOffer] = scrape_job_offers()
        now_iso = datetime.now(UTC).isoformat()
        current_urls = [offer["url"] for offer in offers]

        payload = [
            {
                "title": offer["title"],
                "url": offer["url"],
                "location": offer["location"],
                "scraped_at": now_iso,
                "is_active": True,
            }
            for offer in offers
        ]

        supabase = _get_supabase()
        if payload:
            supabase.table("job_offers").upsert(payload, on_conflict="url").execute()

            supabase.table("job_offers").update({"is_active": True, "scraped_at": now_iso}).in_(
                "url", current_urls
            ).execute()

            supabase.table("job_offers").update({"is_active": False}).not_.in_("url", current_urls).execute()
        else:
            supabase.table("job_offers").update({"is_active": False}).neq("id", "").execute()

        return {"synced": len(offers), "offers": offers}
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc
