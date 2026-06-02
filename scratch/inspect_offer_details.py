import requests
from bs4 import BeautifulSoup

url = "https://www.rekord.com.pl/kariera/praca1.html"
res = requests.get(url, timeout=20)
# Ensure correct decoding since Polish characters are used
res.encoding = 'utf-8' 
soup = BeautifulSoup(res.text, "html.parser")

print("--- TEXT ---")
print(soup.get_text(separator=" \n ", strip=True)[:2000])
