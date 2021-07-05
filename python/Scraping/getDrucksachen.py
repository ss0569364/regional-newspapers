from selenium import webdriver #pip install selenium
import pymongo #pip install pymongo

# =============================================================================
# This class reads the mongoDB drucksachenLinks collection to iterate over the links,
# open them in Selenium and then scrape the relevant textpassage.
# ATTENTION:
#   1. If not already done, please download the chromedriver.exe
#   2. Please change the Path in Line 16 to the correct location of your chromedriver.exe
# =============================================================================

# Method to read mongoDB entries from drucksachenLinks where Scraped == False
# and then iterate over the links to call readDistrictOfficeNews
def scrapeMongoEntries():
    driver = webdriver.Chrome('C:\\Users\\Crimu\\Desktop\\Studium\\6. Semester\\USWS\\chromedriver.exe')
    myClient = pymongo.MongoClient("mongodb://localhost:27017/")
    myDB = myClient["USWS"]
    myCOL = myDB["drucksachenLinks"]
    unscrapedEntries = myCOL.find({"Scraped": False}, {"Link": 1, "pubDate": 1, "Headline": 1, "District": 1})
    for entry in unscrapedEntries:
        myDict = readDistrictOfficeNews(driver, entry['Headline'], entry['pubDate'], entry['District'], entry['Link'])
        if myDict != None:
            myDict['GeoLAT'] = None
            myDict['GeoLNG'] = None
            saved = saveToMongoDB(myDict)
            if saved == True:
                updateQuery = {"Headline": entry["Headline"]}
                updateValue = { "$set": { "Scraped": True }}
                myCOL.update_one(updateQuery, updateValue)

# Method to read the text from the print material and write it into a Dict
def readDistrictOfficeNews(driver, title, date, district, link):
    myDict = {}
    driver.get(link)
    try:
        text = driver.find_elements_by_xpath('//*[@id="rismain_raw"]/table/tbody/tr[2]/td[2]/div')[0]
        myDict['Headline'] = title
        myDict['pubDate'] = date
        myDict['District'] = district
        myDict['Link'] = link
        myDict['Description'] = text.text
    except IndexError:
        print("Entry could not be scraped.\nPlease check manually")
        print("Error occured @: " + title)
        print("For manual scraping visit: " + link)
        return None
    return myDict

# Method to save the saveDict Parameter in mongoDB
def saveToMongoDB(saveDict):
    myClient = pymongo.MongoClient("mongodb://localhost:27017/")
    myDB = myClient["USWS"]
    myCol = myDB["Drucksachen"]
    if myCol.count_documents({"Headline": saveDict['Headline']}) < 1:
            myCol.insert_one(saveDict)
            return True

scrapeMongoEntries()
    
