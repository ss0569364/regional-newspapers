from selenium import webdriver #pip install selenium
import pymongo #pip install pymongo

# =============================================================================
# This class scrapes the first page of the "Drucksachen" Site from each district office
# and writes the information into a local mongoDB.
# ATTENTION:
#   1. If not already done, please download the chromedriver.exe
#   2. Please change the Path in Line 18 to the correct location of your chromedriver.exe
# =============================================================================

# Method that calls each of the 12 district office websites to scrape the tables
# and all necessary data for further scraping
def getDistrictOfficeNews():
    dataList = []
    relevantTds = [2,4,5,6]
    districts = ['charlottenburg-wilmersdorf', 'marzahn-hellersdorf', 'mitte', 'reinickendorf', 'pankow', 'spandau', 'lichtenberg', 'friedrichshain-kreuzberg', 'treptow-koepenick', 'neukoelln', 'tempelhof-schoeneberg', 'steglitz-zehlendorf']
    driver = webdriver.Chrome('C:\\Users\\Crimu\\Desktop\\Studium\\6. Semester\\USWS\\chromedriver.exe')
    for district in districts:
        if district == 'charlottenburg-wilmersdorf':
            driver.get('https://www.berlin.de/ba-' + district + '/politik/bezirksverordnetenversammlung/online/vo040.asp')
        else:
            driver.get('https://www.berlin.de/ba-' + district + '/politik-und-verwaltung/bezirksverordnetenversammlung/online/vo040.asp')
        for i in range(2, 32):
            myDict = {}
            myDict['Scraped'] = False
            myDict['District'] = district
            for entry in relevantTds:
                information = driver.find_elements_by_xpath('//*[@id="rismain_raw"]/table/tbody/tr[' + str(i) + ']/td[' + str(entry) + ']')[0]
                if entry == 2:
                    myDict['Headline'] = information.text
                    link = driver.find_elements_by_xpath('//*[@id="rismain_raw"]/table/tbody/tr[' + str(i) + ']/td[' + str(entry) + ']/a')[0]
                    myDict['Link'] = link.get_attribute('href')
                elif entry == 4:
                    myDict['Initiator'] = information.text
                elif entry == 5:
                    myDict['pubDate'] = information.text
                elif entry == 6:
                    myDict['Art'] = information.text
            dataList.append(myDict)
    return dataList

# Method to write the generated dataList from getDistrictOfficeNews
# into the local mongoDB
def saveOfficeNewsToMongoDb():
    myClient = pymongo.MongoClient("mongodb://localhost:27017/")
    myDB = myClient["USWS"]
    myCol = myDB["drucksachenLinks"]
    dataList = getDistrictOfficeNews()
    for entry in dataList:
        if myCol.count_documents({"Headline": entry['Headline']}) < 1:
            myCol.insert_one(entry)

saveOfficeNewsToMongoDb()

