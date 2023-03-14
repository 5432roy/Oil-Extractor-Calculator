"""
this program fetch the *game data from https://poedb.tw/us/
copyright belongs to them and Grinding Gear Games

*game data means:
the information of each anointment with corresponding oils combination
"""

import requests
import json
from bs4 import BeautifulSoup


url = "https://poedb.tw/us/Amulets"
response = requests.get(url)

if response.status_code == 200:
    soup = BeautifulSoup(response.content, "html.parser")
    div = soup.find("div", id="AnointUniqueAmulets")
    if div is not None:
        div_text = div.get_text().replace("Unique", " ").replace("Amulets", " ").replace("Oil", " ").strip().split(",")[2:]
        #print(div_text)
        with open("data.json", "w") as f:
            json.dump(div_text, f, indent=4)
    else:
        print("Div not found")
else:
    print(f"Error: {response.status_code}")
