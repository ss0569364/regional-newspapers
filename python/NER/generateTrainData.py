from nltk.tokenize import word_tokenize, sent_tokenize #pip install nltk
import re
import libraries.getNamelist
import pymongo #pip install pymongo

data = libraries.getNamelist.createMasterNamelist()

myClient = pymongo.MongoClient("mongodb://localhost:27017/")
myDB = myClient["USWS"]

def generateTrainData():
    print('GENERATING TRAINING_DATA - PLEASE WAIT')
    TRAIN_DATA = []
    libraries = ['hospitals', 'parks', 'schools', 'universities', 'streets']
    databases = ['RssFeed', 'Drucksachen']
    for database in databases:
        myCol = myDB[database]
        dbEntries = myCol.find({})
        for entry in dbEntries:
            for library in libraries:
                searchVar = checkStringInNamelist(library, re.sub('\W', '', entry['Headline'].lower()))
                if searchVar == None:
                    searchVar = checkStringInNamelist(library, re.sub('\W', '', entry['Description'].lower()))
                if searchVar != None:
                    if dualCheckEntry(searchVar, entry['Headline']) == True or dualCheckEntry(searchVar, entry['Description']) == True:
                        if dualCheckEntry(searchVar, entry['Headline']) == True:
                            TRAIN_DATA.append(generateTrainTuple(searchVar, entry['Headline'], library))
                        elif dualCheckEntry(searchVar, entry['Description']) == True:
                            TRAIN_DATA.append(generateTrainTuple(searchVar, entry['Description'], library))
    print('TRAINING_DATA GENERATED')
    return TRAIN_DATA
  
def locateNeededSentence(searchvalue, text):
    sentences = sent_tokenize(text)
    for sentence in sentences:
        if dualCheckEntry(searchvalue, sentence) == True:
            return sentence
    return None
            
def getEntityInformation(searchvalue, sentence, library):
    startPos = sentence.find(searchvalue)
    endPos = startPos + len(searchvalue)
    if library == 'universities':
        library = 'UNIVERSITY'
    else:
        library = library[:-1].upper()
    entityTuple = (startPos, endPos, library)
    entityDict = {'entities': [entityTuple]}
    return entityDict    

def generateTrainTuple(searchvalue, text, library):
    sentence = locateNeededSentence(searchvalue, text)
    if sentence != None:
        entityDict = getEntityInformation(searchvalue, sentence, library)
        trainTuple = (sentence, entityDict)
        return trainTuple
    return None

def dualCheckEntry(realValue, unchangedEntry):
    searchValue = word_tokenize(realValue)
    searchList = word_tokenize(unchangedEntry)
    if (is_a_in_x(searchValue, searchList)):
        return True
    return False

def checkStringInNamelist(library, string):
    checkSet = data[library]
    lenCheckSet = len(checkSet)
    searchValue = None
    for i in range(lenCheckSet):
        if data[library][i]['searchValue'] in string:
            searchValue = data[library][i]['realValue']
            break
    return searchValue

def is_a_in_x(A, X):
  for i in range(len(X) - len(A) + 1):
    if A == X[i:i+len(A)]: return True
  return False

