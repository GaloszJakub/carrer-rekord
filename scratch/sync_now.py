import sys
import os
sys.path.append('my-scraper')
from scraper import scrape_job_offers
from supabase import create_client
from datetime import datetime, timezone
import getpass

def run_sync(supabase, offers, now_iso, current_urls, payload):
    if payload:
        print("Synchronizowanie ofert w bazie danych (Upsert)...")
        supabase.table("job_offers").upsert(payload, on_conflict="url").execute()
        
        print("Aktualizacja statusów ofert...")
        supabase.table("job_offers").update({"is_active": True, "scraped_at": now_iso}).in_(
            "url", current_urls
        ).execute()
        
        print("Dezaktywacja nieaktualnych ogłoszeń...")
        supabase.table("job_offers").update({"is_active": False}).not_.in_("url", current_urls).execute()
    else:
        print("Brak pobranych ofert. Wszystkie ogłoszenia w bazie oznaczam jako nieaktywne...")
        supabase.table("job_offers").update({"is_active": False}).eq("is_active", True).execute()

def main():
    supabase_url = 'https://tlidjpnumdiiwevqcyau.supabase.co'
    supabase_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsaWRqcG51bWRpaXdldnFjeWF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwNjE0NzIsImV4cCI6MjA4MTYzNzQ3Mn0.8L9738UghIY7a8l0EZDAtwUrdlSgwdYLZlkJRyc9Pwk'
    
    print("Rozpoczynanie scrapowania ofert pracy...")
    try:
        offers = scrape_job_offers()
        print(f"Pomyślnie pobrano {len(offers)} ofert.")
    except Exception as e:
        print(f"Błąd podczas pobierania danych ze strony: {e}")
        sys.exit(1)
        
    now_iso = datetime.now(timezone.utc).isoformat()
    current_urls = [offer["url"] for offer in offers]
    
    payload = [
        {
            "title": offer["title"],
            "url": offer["url"],
            "location": offer["location"],
            "description": offer["description"],
            "responsibilities": offer["responsibilities"],
            "requirements": offer["requirements"],
            "nice_to_have": offer["nice_to_have"],
            "benefits": offer["benefits"],
            "tech_stack": offer["tech_stack"],
            "tags": offer["tags"],
            "contract": offer["contract"],
            "salary": offer["salary"],
            "apply_url": offer["apply_url"],
            "scraped_at": now_iso,
            "is_active": True,
        }
        for offer in offers
    ]
    
    # 1. Próba wykonania bez logowania (zakładając wyłączone RLS lub obecność service_key)
    service_key = os.environ.get("SUPABASE_SERVICE_KEY")
    if service_key:
        print("Wykryto SUPABASE_SERVICE_KEY w środowisku. Używam klucza serwisowego.")
        supabase = create_client(supabase_url, service_key)
        try:
            run_sync(supabase, offers, now_iso, current_urls, payload)
            print("\nSynchronizacja zakończona pomyślnie!")
            return
        except Exception as err:
            print(f"Błąd zapisu z kluczem serwisowym: {err}")
            sys.exit(1)
            
    # Próba anonimowa
    print("Próba zapisu anonimowego (bez logowania)...")
    supabase = create_client(supabase_url, supabase_key)
    try:
        run_sync(supabase, offers, now_iso, current_urls, payload)
        print("\nSynchronizacja zakończona pomyślnie (bez podawania haseł)!")
        return
    except Exception as err:
        err_msg = str(err)
        if "row-level security" in err_msg or "42501" in err_msg:
            print("\nBrak uprawnień (Zabezpieczenia RLS są włączone na tabeli w Supabase).")
            print("Możesz rozwiązać to na dwa sposoby:")
            print(" Opcja A: Zaloguj się danymi administratora portalu poniżej.")
            print(" Opcja B: Wyłącz reguły bezpieczeństwa w panelu Supabase, aby móc zapisać dane bez logowania.")
            print("          W tym celu przejdź do Supabase SQL Editor i wykonaj polecenie:")
            print("          ALTER TABLE job_offers DISABLE ROW LEVEL SECURITY;")
            print("          A następnie uruchom ten skrypt ponownie.\n")
            
            # Wymuszenie logowania
            email = input("Podaj email administratora: ").strip()
            password = getpass.getpass("Podaj hasło: ")
            
            try:
                print("Autoryzacja w Supabase...")
                supabase.auth.sign_in_with_password({"email": email, "password": password})
                print("Autoryzacja powiodła się! Ponawianie zapisu...")
                run_sync(supabase, offers, now_iso, current_urls, payload)
                print("\nSynchronizacja zakończona pomyślnie!")
            except Exception as auth_err:
                print(f"Błąd autoryzacji lub zapisu: {auth_err}")
                sys.exit(1)
        else:
            print(f"Inny błąd bazy danych: {err}")
            sys.exit(1)

if __name__ == '__main__':
    main()
