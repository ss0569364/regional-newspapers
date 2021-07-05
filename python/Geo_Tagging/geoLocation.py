import re
import getNamelist
import pymongo #pip install pymongo
from geopy.geocoders import Nominatim #pip install geopy
from nltk.tokenize import word_tokenize #pip install nltk

# =============================================================================
# This class generates a namelist and calls all entries from the database with null Geolocations.
# Strings will be checked against namelist with hospitals, parks, schools, universities, streets
# > if entry in list start geolocating
# > else set Geolocation to Undefind to prevent redundant checks
# =============================================================================

data = getNamelist.createMasterNamelist()
myClient = pymongo.MongoClient("mongodb://localhost:27017/")
myDB = myClient["USWS"]

# Method that generates a connection to the given mongoDB collection parameter
# that iterates over the entries and runs the double check method to see if a library entry
# is within the string.
def startGeolocation(dbCOL, titleID, descriptionID):
    myCol = myDB[dbCOL]
    libraries = ['hospitals', 'parks', 'schools', 'universities', 'streets']
    entriesWithoutDistrict = myCol.find({"GeoLAT": None})
    for entry in entriesWithoutDistrict:
        for library in libraries:
            searchVar = checkStringInNamelist(library, re.sub('\W', '', entry[titleID].lower()))
            if searchVar == None:
                searchVar = checkStringInNamelist(library, re.sub('\W', '', entry[descriptionID].lower()))
            if searchVar != None:
                if dualCheckEntry(searchVar, entry[titleID]) == True or dualCheckEntry(searchVar, entry[descriptionID]) == True:
                    if len(entry['District'].split(',')) < 2:
                        print('! ! ! Entry found ! ! !')
                        print('Library: ' + library)
                        print('Entry: ' + searchVar)
                        if dualCheckEntry(searchVar, entry[titleID]) == True:
                            print('Found in text: ' + entry[titleID])
                        else:
                            print('Found in text: ' + entry[descriptionID])
                        searchText = searchVar + ',' + entry['District'] + ', Berlin'
                        print('Sending searchrequest: ' + searchText + ' to geoLocator')
                        coordinates = getGeolocation(searchText)
                        if coordinates != None:
                            updateQuery = { "Link": entry["Link"]}
                            updateValue = { "$set": { "GeoLAT": coordinates.latitude, "GeoLNG": coordinates.longitude}}
                            myCol.update_one(updateQuery, updateValue)
                            print('Database entry updated')
            else:
                updateQuery = { "Link": entry["Link"]}
                updateValue = { "$set": { "GeoLAT": 'Undefined', "GeoLNG": 'Undefined'}}
                myCol.update_one(updateQuery, updateValue)
                    
# Iterares the library to look if a library entry is in the string parameter
def checkStringInNamelist(library, string):
    checkSet = data[library]
    lenCheckSet = len(checkSet)
    searchValue = None
    for i in range(lenCheckSet):
        if data[library][i]['searchValue'] in string:
            searchValue = data[library][i]['realValue']
            break
    return searchValue

# Initiate geoLocator and locate search string
def getGeolocation(search):
    geolocator = Nominatim(user_agent="bla")
    geoCoordinates = geolocator.geocode(search)
    return geoCoordinates

# Method that tokenizes sentences to words to check if street is in sentence
# dualCheckEntry hinders buggy streetnames like Weg E (becoming wege) to start a geolocation
def dualCheckEntry(realValue, unchangedEntry):
    searchValue = word_tokenize(realValue)
    searchList = word_tokenize(unchangedEntry)
    if (is_a_in_x(searchValue, searchList)):
        return True
    return False
    
# Code Snippet from https://stackoverflow.com/questions/36016174/how-to-check-if-a-list-is-in-another-list-with-the-same-order-python
# Checks if list A [tokenized street] is in list X [tokenized sentence]
def is_a_in_x(A, X):
  for i in range(len(X) - len(A) + 1):
    if A == X[i:i+len(A)]: return True
  return False

# Prepared method to geoLocate newsarticles and print materials
def runMe():
    startGeolocation('RssFeed', 'Headline', 'Description')
    startGeolocation('Drucksachen', 'Headline', 'Description')
    
runMe()
