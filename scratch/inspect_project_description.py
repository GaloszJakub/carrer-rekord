import requests
from bs4 import BeautifulSoup

url = "https://www.rekord.com.pl/kariera/praca1.html"
res = requests.get(url, timeout=20)
res.encoding = 'utf-8' 
soup = BeautifulSoup(res.text, "html.parser")

# Find the text "O projekcie"
for tag in soup.find_all(text=True):
    if "O projekcie" in tag:
        parent = tag.parent
        print(f"Parent tag: <{parent.name}>, content: {parent}")
        # Print surrounding siblings
        print("--- SIBLINGS ---")
        for sib in parent.next_siblings:
            if sib.name:
                print(f"<{sib.name}>: {sib.get_text(strip=True)[:200]}")
