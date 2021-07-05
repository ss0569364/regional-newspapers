import re
import spacy
import random
from libraries import getNamelist
from nltk.tokenize import word_tokenize, sent_tokenize #pip install nltk
import pymongo #pip install pymongo
from string import digits
from tqdm import tqdm
from spacy.tokens import DocBin

data = getNamelist.createMasterNamelist()
myClient = pymongo.MongoClient("mongodb://localhost:27017/")
myDB = myClient["USWS"]

def generateRandomDatasets():
    spacyFiles = []
    dataset = getDataMongo() + getDataTxt()
    create = ['./train.spacy', './evaluation.spacy']
    libraries = ['hospitals', 'schools', 'universities', 'parks', 'schools']
    for spacyFile in create:
        spacyEntries = []
        random.shuffle(dataset)
        for library in libraries:
            for i in range(len(dataset)):
                searchVar = checkStringInNamelist(library, re.sub('\W', '', dataset[i].lower()))
                if searchVar != None and dualCheckEntry(searchVar, dataset[i]) == True:
                    spacyEntries.append(generateTrainTuple(searchVar, dataset[i], library))
        spacyFiles.append(spacyEntries)
    return spacyFiles
                    
def getDataMongo():
    database_sentences = []
    databases = ['RssFeed', 'Drucksachen']
    for database in databases:
        myCol = myDB[database]
        dbEntries = myCol.find({})
        for entry in dbEntries:
            database_sentences.append(entry['Headline'])
            for part in sent_tokenize(entry['Description']):
                database_sentences.append(part)
    return database_sentences
        
## CREDIT KAGGLE DATASET: https://www.kaggle.com/rtatman/3-million-german-sentences?select=deu_news_2015_3M-sentences.txt
def getDataTxt():
    cleared_sentences = []
    with open('deu_news_2015_3M-sentences.txt', 'r', encoding='utf-8') as f:
        content = f.readlines()
    random.shuffle(content)
    for i in range(0,10000):
        cleared_sentences.append(content[i].lstrip(digits).lstrip())
    return cleared_sentences

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

def dualCheckEntry(realValue, unchangedEntry):
    searchValue = word_tokenize(realValue)
    searchList = word_tokenize(unchangedEntry)
    if (is_a_in_x(searchValue, searchList)):
        return True
    return False

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

def generateTrainTuple(searchvalue, sentence, library):
    if sentence != None:
        entityDict = getEntityInformation(searchvalue, sentence, library)
        trainTuple = (sentence, entityDict)
        return trainTuple
    return None

def generateSpacyFiles(training_data):
    filenames = ['./train.spacy', './evaluation.spacy']
    for i in range(len(filenames)):
        nlp = spacy.blank('de') # load a new spacy model
        db = DocBin() # create a DocBin object
        for text, annot in tqdm(training_data[i]): # data in previous format
            doc = nlp.make_doc(text) # create doc object from text
            ents = []
            for start, end, label in annot["entities"]: # add character indexes
                span = doc.char_span(start, end, label=label, alignment_mode="contract")
                if span is None:
                    print("Skipping entity")
                else:
                    ents.append(span)
        doc.ents = ents # label the text with the ents
        db.add(doc)
        db.to_disk(filenames[i]) # save the docbin object

generateSpacyFiles(generateRandomDatasets())