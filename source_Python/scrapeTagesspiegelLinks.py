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
URL = 'https://www.berlin.de/ba-marzahn-hellersdorf/politik-und-verwaltung/bezirksverordnetenversammlung/online/vo040.asp'

# Methode welche die Headlines, Links und dazugehörigen Bezirke scraped und in die jeweiligen Listen schreibt
def scrapeTagesspiegelLinks():
    for i in range(len(bezirke)):
        url = tagesspiegelURL + bezirke[i]
        page = requests.get(url).content
        soup = BeautifulSoup(page, 'lxml')
        listings = soup.find_all('li', attrs={'class': 'hcf-teaser hcf-left'})
        for listing in listings:
            for header in listing.find_all('h2'):
                for headline in header.find_all('span', attrs={'class': 'hcf-headline'}):
                    ueberschrift = headline.get_text()
                    headlines.append(ueberschrift)
                for link in header.find_all('a'):
                    newsLink = link.attrs['href']
                    if newsLink.startswith('https'):
                        links.append(newsLink)
                    else:
                        links.append((tagesspiegelLinkRef + newsLink))   
                    curDistrict.append(bezirke[i])
        
        listings = soup.find_all('li', attrs={'class': 'hcf-teaser hcf-left hcf-last'})
        for listing in listings:
            for header in listing.find_all('h2'):
                for headline in header.find_all('span', attrs={'class': 'hcf-headline'}):
                    ueberschrift = headline.get_text()
                    headlines.append(ueberschrift)
                for link in header.find_all('a'):
                    newsLink = link.attrs['href']
                    if newsLink.startswith('https'):
                        links.append(newsLink)
                    else:
                        links.append((tagesspiegelLinkRef + newsLink))
                    curDistrict.append(bezirke[i])

# Methode zur Erstellung des DataFrames aus den Listen Headlines, Links und Districts.
# Des Weiteren werden Headline Dubletten ermittelt und zusammengefasst.
# Gibt das erstellte und bearbeitete DataFrame zurück.
def createDataFrame():
    df = pd.DataFrame()
    df['Headline'] = headlines
    df['Link'] = links
    df['District'] = curDistrict
    
    duplicateDF = df[df.duplicated(subset = 'Headline', keep = False)]
    duplicateDF = duplicateDF.sort_values(by='Headline')
    duplicateDF = duplicateDF.reset_index()
    df = df.drop_duplicates(subset = 'Headline', keep = False)
    
    for i in range(len(duplicateDF)):
        if i == 0:
            testHeadline = duplicateDF['Headline'][i]
            headlineIndex = i
        if i > 1:
            if testHeadline == duplicateDF['Headline'][i]:
                duplicateDF['District'][headlineIndex] = duplicateDF['District'][headlineIndex] + ', ' + duplicateDF['District'][i] 
            if testHeadline != duplicateDF['Headline'][i]:
                testHeadline = duplicateDF['Headline'][i]
                headlineIndex = i
            
    duplicateDF = duplicateDF.drop_duplicates(subset='Headline', keep='first')
    duplicateDF = duplicateDF.reset_index()
    duplicateDF = duplicateDF.drop(['level_0', 'index'], axis = 1)
    df = df.append(duplicateDF)
    df = df.reset_index(drop=True)
    
    return df

# Methode zum Aufbau einer Verbindung zur lokalen MongoDB.
# Die Daten des übergebenen DataFrames werden in ein Dict geschrieben und dann in die MongoDB übertragen.
# Hierbei wird geprüft, ob es die Headline schon gibt.
def mongoDB(dataFrame):
    myClient = pymongo.MongoClient("mongodb://localhost:27017/")
    myDB = myClient["USWS"]
    myCol = myDB["NewsLinks"]
        
    for i in range(len(dataFrame)):
        dictOneLine = {
            "Headline": str(dataFrame["Headline"][i]),
            "Link": str(dataFrame["Link"][i]),
            "District": str(dataFrame["District"][i]),
            "Scraped": False
            }
        if '/mediacenter/' not in dataFrame["Link"][i]:
            if myCol.count_documents({"Headline": dataFrame["Headline"][i]}) < 1:
                myCol.insert_one(dictOneLine)
 
#Ausführung der Methoden
scrapeTagesspiegelLinks()
mongoDB(createDataFrame())
