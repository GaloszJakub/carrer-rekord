import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

urls = [
    "https://www.rekord.com.pl/kariera/praca1.html",
    "https://www.rekord.com.pl/kariera/praca2.html",
    "https://www.rekord.com.pl/kariera/praca5.html"
]

for url in urls:
    print(f"================ {url} ================")
    res = requests.get(url, timeout=20)
    res.encoding = 'utf-8'
    soup = BeautifulSoup(res.text, "html.parser")
    
    # Let's extract:
    # 1. Description (any <h6> text that is before the first h3)
    desc_parts = []
    for h6 in soup.find_all("h6"):
        # check if it is before h3 by looking at the page layout or parent
        # actually, just get all h6 text before any h3 is found
        desc_parts.append(h6.get_text(strip=True))
    description = "\n".join(desc_parts).strip()
    
    print("DESCRIPTION:", description[:400])
    
    # 2. Key-value sections under h3
    sections = {}
    for h3 in soup.find_all("h3"):
        header_text = h3.get_text(strip=True)
        sibling = h3.next_sibling
        while sibling and not sibling.name:
            sibling = sibling.next_sibling
        if sibling and sibling.name == "ul":
            items = [li.get_text(strip=True) for li in sibling.find_all("li")]
            sections[header_text] = items
            
    for k, v in sections.items():
        print(f"SECTION [{k}]: {v}")
