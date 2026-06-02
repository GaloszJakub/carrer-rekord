# FastAPI Rekord scraper (Vercel + Supabase)

Projekt scrapuje oferty pracy z `https://www.rekord.com.pl/kariera/` i synchronizuje je do Supabase.

## Struktura

```
my-scraper/
├── api/
│   └── index.py
├── scraper.py
├── main.py
├── requirements.txt
└── vercel.json
```

## Wymagane zmienne środowiskowe

- `SUPABASE_URL`
- `SUPABASE_SERVICE_KEY`
- `SCRAPE_SECRET`

## Supabase (manual SQL)

Wykonaj w SQL Editor:

```sql
CREATE TABLE job_offers (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  url text unique not null,
  location text,
  scraped_at timestamptz default now(),
  is_active boolean default true
);
```

## Lokalnie

1. `pip install -r requirements.txt`
2. Ustaw env vars.
3. `uvicorn main:app --reload`
4. Wywołaj:
   `POST /api/scrape` z nagłówkiem `X-Scrape-Key: <SCRAPE_SECRET>`

### Test endpointu (curl)

Lokalnie:

```bash
curl -X POST "http://127.0.0.1:8000/api/scrape" \
  -H "X-Scrape-Key: YOUR_SCRAPE_SECRET"
```

Na Vercel:

```bash
curl -X POST "https://YOUR-PROJECT.vercel.app/api/scrape" \
  -H "X-Scrape-Key: YOUR_SCRAPE_SECRET"
```

Przykładowa odpowiedź:

```json
{
  "synced": 3,
  "offers": [
    {
      "title": "Programista .NET",
      "url": "https://www.rekord.com.pl/kariera/praca1.html",
      "location": "Bielsko-Biała"
    }
  ]
}
```

## Deployment na Vercel

1. Zaimportuj projekt w Vercel i wybierz katalog `my-scraper` jako **Root Directory** w ustawieniach projektu.
2. Dodaj wymagane zmienne środowiskowe w panelu Vercel (`SUPABASE_URL`, `SUPABASE_SERVICE_KEY`, `SCRAPE_SECRET`).
3. Wykonaj wdrożenie (np. przez integrację z Git lub za pomocą Vercel CLI).
4. Vercel automatycznie skonfiguruje zadanie Cron na podstawie pliku `vercel.json`. Będzie ono wysyłać żądanie `GET /api/scrape` codziennie o godzinie `08:00 UTC`. Bezpieczeństwo jest zapewnione przez automatyczną weryfikację nagłówka `Authorization: Bearer <CRON_SECRET>` wstrzykiwanego przez Vercel.
