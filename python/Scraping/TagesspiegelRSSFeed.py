import re
import requests
from bs4 import BeautifulSoup #pip install beautifulsoup4
import pymongo #pip install pymongo

# =============================================================================
# This class scraped the Rss Feed from tagesspiegel.de, saves them
# into a local mongoDB and then iterates over each district site
# to locate which district is affected by the scraped newsarticle.
# =============================================================================

rssFeedUrl = 'https://www.tagesspiegel.de/contentexport/feed/berlin'
myClient = pymongo.MongoClient("mongodb://localhost:27017/")
myDB = myClient["USWS"]
myCol = myDB["RssFeed"]

# Method to clean the scraped strings from html tags
def cleanHtml(text):
    cleanr = re.compile('<.*?>')
    cleantext = re.sub(cleanr, '', text)
    return cleantext

# Method to request the tagesspiegel RSS Feed Newspage 
def scrapeRSS():
    page = requests.get(rssFeedUrl).content
    soup = BeautifulSoup(page, 'lxml-xml')
    rssFeed = soup.find_all('item')
    for feed in rssFeed:
        pictureLink = None
        if (feed.find('enclosure') != None and 'url' in str(feed.find('enclosure'))):
            pictureLink = str(feed.find('enclosure'))[str(feed.find('enclosure')).index('url')+5:str(feed.find('enclosure')).index('.jpg')]
        mongoDict = {
            "Headline": cleanHtml(str(feed.find('title'))),
            "Link": cleanHtml(str(feed.find('link'))),
            "Description": cleanHtml(str(feed.find('description'))),
            "pubDate": cleanHtml(str(feed.find('pubDate'))),
            "District": None,
            "GeoLAT": None,
            "GeoLNG": None,
            "picLink": pictureLink
            }
        if myCol.count_documents({"Headline": cleanHtml(str(feed.find('title')))}) < 1:
            myCol.insert_one(mongoDict)
    
# Method that updates the Districts for the mongoDB entries
def defineDistrict():
    entriesWithoutDistrict = myCol.find({"District": None}, {"Link": 1})
    for entry in entriesWithoutDistrict:
        updateQuery = { "Link": entry["Link"]}
        updateValue = { "$set": { "District": getDistrict(entry["Link"])}}
        myCol.update_one(updateQuery, updateValue)
    
# Method that checks which district is affected by the scraped news
def getDistrict(givenLink):
    district = 'Berlin'
    bezirke = ['Charlottenburg-Wilmersdorf', 'Friedrichshain-Kreuzberg', 'Lichtenberg', 'Marzahn-Hellersdorf', 'Mitte', 'Neukoelln', 'Pankow', 
          'Reinickendorf', 'Spandau', 'Steglitz-Zehlendorf', 'Tempelhof-Schoeneberg', 'Treptow-Koepenick']
    tagesspiegelURL = 'https://www.tagesspiegel.de/berlin/bezirke/'
    for bezirk in bezirke:
        url = tagesspiegelURL + bezirk
        page = requests.get(url).content
        soup = BeautifulSoup(page, 'lxml')
        listings = soup.find_all('li', attrs={'class': 'hcf-teaser hcf-left'})
        for listing in listings:
            for header in listing.find_all('h2'):
                for link in header.find_all('a'):
                    newsLink = 'https://www.tagesspiegel.de' + link.attrs['href']
                    if newsLink == givenLink:
                        if district == 'Berlin':
                            district = bezirk
                        else:
                            district = district + ', ' + bezirk
                        break;
        listings = soup.find_all('li', attrs={'class': 'hcf-teaser hcf-left hcf-last'})
        for listing in listings:
            for header in listing.find_all('h2'):
                for link in header.find_all('a'):
                    newsLink = 'https://www.tagesspiegel.de' + link.attrs['href']
                    if newsLink == givenLink:
                        if district == 'Berlin':
                            district = bezirk
                        else:
                            district = district + ', ' + bezirk 
                        break
    return district

def runMe():
    scrapeRSS()
    defineDistrict()

runMe()