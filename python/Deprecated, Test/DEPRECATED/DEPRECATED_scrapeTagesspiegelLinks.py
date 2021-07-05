import pandas as pd
import pymongo #pip install pymongo
import requests
from bs4 import BeautifulSoup

bezirke = ['Charlottenburg-Wilmersdorf', 'Friedrichshain-Kreuzberg', 'Lichtenberg', 'Marzahn-Hellersdorf', 'Mitte', 'Neukoelln', 'Pankow', 
           'Reinickendorf', 'Spandau', 'Steglitz-Zehlendorf', 'Tempelhof-Schoeneberg', 'Treptow-Koepenick']
tagesspiegelURL = 'https://www.tagesspiegel.de/berlin/bezirke/' #+bezirk
tagesspiegelLinkRef = 'https://www.tagesspiegel.de'
headlines = []
links = []
curDistrict = []


# Methode welche die Headlines, Links und dazugehörigen Bezirke scraped und in die jeweiligen Listen schreibt
def scrapeTagesspiegelLinks():
    for i in range(len(bezirke)):
        url = tagesspiegelURL + bezirke[i]
        page = requests.get(url).content
        soup = BeautifulSoup(page, 'lxml')
        listings = soup.find_all('li', attrs={'class': 'hcf-teaser hcf-left'})
        for listing in listings:
            print(listing)
            
scrapeTagesspiegelLinks()