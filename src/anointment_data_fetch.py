"""
this program fetch the *game data from https://poedb.tw/us/
copyright belongs to them and Grinding Gear Games

the output of this program will be "anointment.json"

Since the anointment rarely changes, this program will only run once per season.
"""

import requests
import json
from bs4 import BeautifulSoup


url = "https://poedb.tw/us/Amulets"
response = requests.get(url)


# if the get request success
if response.status_code == 200:
    soup = BeautifulSoup(response.content, "html.parser")
    div = soup.find("div", id="AnointUniqueAmulets")
    # if find the desired div
    if div is not None:
        # parse the context in the div into a list like:
        # ['  Clear  Clear  Clear  Alacrity ', '  Clear  Clear  Sepia  Beef ', ...]
        div_text = div.get_text().replace("Unique", " ").replace("Amulets", " ").replace("Oil", " ").strip().split(",")[2:]
        
        # a list that would hold serveral dictionary, where each dictionary is one annoitment
        res = []
        
        for item in div_text:
            item = item.strip()
            oil1, oil2, oil3, *name = item.split(maxsplit=3)
            
            item_dict = {
                'name': name,
                'oils': [oil1, oil2, oil3]
            }
        
            res.append(item_dict)
        
        with open("data/anointment.json", "w") as f:
            json.dump(res, f, indent=4)
    else:
        print("Div not found")
# if the request failed
else:
    print(f"Error: {response.status_code}")
