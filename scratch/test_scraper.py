import sys
sys.path.append('my-scraper')
from scraper import scrape_job_offers
import json

def main():
    try:
        offers = scrape_job_offers()
        print(f"Scraped {len(offers)} offers successfully!")
        for o in offers:
            print("\n==============================")
            print(f"Title: {o['title']}")
            print(f"URL: {o['url']}")
            print(f"Location: {o['location']}")
            print(f"Contract: {o['contract']}")
            print(f"Tags: {o['tags']}")
            print(f"Tech Stack: {o['tech_stack']}")
            print(f"Description (excerpt): {o['description'][:150]}...")
            print("Responsibilities:")
            for r in o['responsibilities']:
                print(f"  - {r}")
            print("Requirements:")
            for req in o['requirements']:
                print(f"  - {req}")
            print("Nice to have:")
            for nice in o['nice_to_have']:
                print(f"  - {nice}")
            print("Benefits:")
            for b in o['benefits']:
                print(f"  - {b}")
    except Exception as e:
        print("Error during scraping:", e)

if __name__ == '__main__':
    main()
