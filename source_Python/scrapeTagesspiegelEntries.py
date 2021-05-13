import pandas as pd
import pymongo #pip install pymongo
import requests
from bs4 import BeautifulSoup
from time import sleep
from datetime import date

today = date.today()
d1 = today.strftime("%d.%m.%y")

def scrapeNews(client, database, link):
    text = ''
    headline = ''
    worked = True
    myCol = database["News"]
    try:
        page = requests.get(link).content
    except requests.exceptions.ConnectionError:
        requests.status_code = "Connection refused"
        worked = False 
    soup = BeautifulSoup(page, 'lxml')
    if link.startswith('https://leute'):
        listings = soup.find_all('section', attrs= {'class': 't1-macher t1-snippet-content'})
        for listing in listings:
            for header in listing.find('h3', attrs = {'class': 'tl-h1'}):
                headline = header.get_text()
            for body in listing.find('div', attrs = {'class': 'col-xs-12 col-sm-8'}):
                text = body.get_text()
    else:
        listings = soup.find_all('div', attrs= { 'class': 'ts-area ts-article-area'})
        for listing in listings:
                for header in listing.find_all('h1', attrs = { 'class': 'ts-title'}):
                    headline = header.get_text()
                for body in listing.find_all('div', attrs = { 'class': 'ts-article-body'}):
                    text = text + body.get_text()
    mongoDict = {
        "Headline": headline,
        "Text": text,
        "Scrape Date": d1,
        "GeoLAT": None,
        "GeoLNG": None        
        }
    if myCol.count_documents({"Headline": headline}) < 1:
        myCol.insert_one(mongoDict)
    return worked

def getMongoEntries():
    myClient = pymongo.MongoClient("mongodb://localhost:27017/")
    myDB = myClient["USWS"]
    myCOL = myDB["NewsLinks"]
    unscrapedEntries = myCOL.find({"Scraped": False}, {"Headline": 1, "Link": 1, "District" : 1, "Scraped": 1})
    
    for x in unscrapedEntries:
        sleep(30)
        if scrapeNews(myClient, myDB, x["Link"]) == True:
             updateQuery = { "Headline": x["Headline"]}
             updateValue = { "$set": { "Scraped": True }}
             myCOL.update_one(updateQuery, updateValue)
        
getMongoEntries()


        
     
        
        
        
        
        