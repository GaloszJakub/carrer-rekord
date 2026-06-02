import requests
from bs4 import BeautifulSoup

url = "https://www.rekord.com.pl/kariera/praca1.html"
res = requests.get(url, timeout=20)
res.encoding = 'utf-8' 
soup = BeautifulSoup(res.text, "html.parser")

# Let's print out some HTML blocks to inspect the tags
for header in soup.find_all(["h2", "h3", "h4", "h5", "strong"]):
    text = header.get_text(strip=True)
    if not text:
        continue
    print(f"[{header.name}]: {text}")
    # Print the next sibling or parent structure
    sibling = header.next_sibling
    while sibling and not sibling.name:
        sibling = sibling.next_sibling
    if sibling:
        print(f"  -> Next tag: <{sibling.name}>, content: {sibling.get_text(strip=True)[:100]}...")
