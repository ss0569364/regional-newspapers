import os
import re
import json

# =============================================================================
# Class to read created JSON Files, transform the data and
# return JSON namelist to check for in geoLocation.py
# ATTENTION: Please run getOSM_Data.py before using this script.
# =============================================================================

def loadLibrariesIntoMasterData():
    fileLibraries = ['parks', 'schools', 'universities', 'hospitals', 'streets']
    masterData = {}
    for entry in fileLibraries:
        with open(os.path.dirname(os.path.abspath(__file__)) + '\\' + entry + '.json') as file:
            fileData = json.load(file)
            masterData[entry] = fileData
    return masterData

def createNamelist(library):
    dataset = loadLibrariesIntoMasterData()
    lenLibrary = len(dataset[library]['elements'])
    names = []
    for i in range(lenLibrary):
        if 'name' in dataset[library]['elements'][i]['tags']:
            if dataset[library]['elements'][i]['tags']['name'] != 'Berlin':
                searchDict = {'searchValue': re.sub('\W', '', dataset[library]['elements'][i]['tags']['name'].lower()), 'realValue': dataset[library]['elements'][i]['tags']['name']}
                names.append(searchDict)
    return names

def createMasterNamelist():
    fileLibraries = ['parks', 'schools', 'universities', 'hospitals', 'streets']
    masterNamelist = {}
    for library in fileLibraries:
        masterNamelist[library] = createNamelist(library)
    return masterNamelist